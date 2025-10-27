// src/app/api/chat/route.js
import { GoogleGenerativeAI } from '@google/generative-ai';

// Esta línea nos dirá si la clave se está cargando en la terminal del servidor
console.log("API ROUTE: Cargando clave de API:", process.env.GOOGLE_API_KEY ? `...${process.env.GOOGLE_API_KEY.slice(-4)}` : "NO ENCONTRADA");

// Asegurarnos de que si la clave no existe, lanzamos un error claro
if (!process.env.GOOGLE_API_KEY) {
  console.error("Error Crítico: La variable de entorno GOOGLE_API_KEY no está definida.");
}

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || '');

export async function POST(req) {
  try {
    const { messages } = await req.json();
    
    // Usamos un modelo más moderno y rápido: gemini-2.5-flash
    // Si prefieres usar 'gemini-pro', simplemente cambia esta línea.
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash-preview-09-2025' });

    // --- INICIO DE LA CORRECCIÓN DEL HISTORIAL ---
    
    // 1. Obtenemos todos los mensajes EXCEPTO el último (que es el que vamos a enviar)
    const allMessages = messages.slice(0, -1);

    // 2. Buscamos el índice del PRIMER mensaje del usuario.
    // La API de Google requiere que el historial SIEMPRE empiece con un mensaje de 'user'.
    const firstUserMsgIndex = allMessages.findIndex(m => m.role === 'user');

    // 3. Si no hay ningún mensaje de usuario en el historial (ej. solo el saludo inicial),
    // usamos un array vacío. Si hay, cortamos el historial desde ese primer mensaje.
    const validHistoryMessages = firstUserMsgIndex === -1 
      ? [] 
      : allMessages.slice(firstUserMsgIndex);

    // 4. Mapeamos los mensajes válidos al formato de la API
    const history = validHistoryMessages.map(m => ({
      role: m.role === 'user' ? 'user' : 'model',
      parts: [{ text: m.content }],
    }));
    
    // --- FIN DE LA CORRECCIÓN DEL HISTORIAL ---

    // El último mensaje del usuario (este no cambia)
    const lastUserMessage = messages[messages.length - 1].content;

    // Iniciamos el chat CON el historial (ahora corregido)
    const chat = model.startChat({ history });
    
    const result = await chat.sendMessage(lastUserMessage);
    const response = await result.response;
    const text = response.text();

    return new Response(JSON.stringify({ response: text }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    // Esto imprimirá el error real en tu terminal de `pnpm run dev`
    console.error("Error detallado en /api/chat:", error);
    
    // Devolvemos un error más específico al frontend
    return new Response(JSON.stringify({ 
      error: "No se pudo conectar con la IA. Revisa la consola del servidor para más detalles." 
    }), { status: 500 });
  }
}