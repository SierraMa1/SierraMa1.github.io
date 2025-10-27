// src/app/api/chat/route.js
import { GoogleGenerativeAI } from '@google/generative-ai';
import fs from 'fs'; // Importamos el File System de Node.js
import path from 'path'; // Importamos 'path' para crear rutas de archivo

// --- 1. CARGAMOS TU BASE DE CONOCIMIENTO ---
// Leemos tu información UNA SOLA VEZ cuando el servidor se inicia.
let miInfo = '';
try {
  // Construimos la ruta al archivo 'mi-info.txt'
  // process.cwd() apunta a la raíz de tu proyecto Next.js
  const infoPath = path.join(process.cwd(), 'src/app/api/chat/mi-info.txt');
  miInfo = fs.readFileSync(infoPath, 'utf-8');
  console.log("Base de conocimiento 'mi-info.txt' cargada correctamente.");
} catch (error) {
  console.error("Error Crítico: No se pudo leer 'mi-info.txt'.", error);
  miInfo = "Error: No se pudo cargar la información de contexto.";
}
// ---------------------------------------------

// --- 2. CONFIGURACIÓN DE GEMINI ---
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || '');

// Corrección: Usamos un nombre de modelo real y estable.
// 'gemini-1.5-flash-latest' es perfecto para esto.
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });
// ---------------------------------------------


export async function POST(req) {
  try {
    const { messages } = await req.json();
    
    // Obtenemos SOLO la última pregunta del usuario
    const lastUserMessage = messages[messages.length - 1].content;

    // --- 3. CONSTRUIMOS EL PROMPT DE RAG ---
    // Esta es la plantilla mágica.
    const promptTemplate = `
      Eres un asistente virtual para el sitio web de María.
      Tu única tarea es responder a la pregunta del usuario basándote ESTRICTAMENTE en el siguiente contexto.
      No inventes nada. Si la respuesta no está en el contexto, di "Lo siento, no tengo esa información sobre María".
      Responde de forma amable y directa.

      --- CONTEXTO SOBRE MARÍA ---
      ${miInfo}
      --- FIN DEL CONTEXTO ---

      PREGUNTA DEL USUARIO:
      "${lastUserMessage}"
    `;
    // ---------------------------------------

    // --- 4. LLAMAMOS A LA API (MÉTODO SIMPLE) ---
    // Usamos generateContent en lugar de startChat.
    // No necesitamos historial, solo el prompt que acabamos de construir.
    const result = await model.generateContent(promptTemplate);
    const response = await result.response;
    const text = response.text();
    
    // -----------------------------------------

    return new Response(JSON.stringify({ response: text }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error("Error detallado en /api/chat:", error);
    return new Response(JSON.stringify({ 
      error: "No se pudo conectar con la IA. Revisa la consola del servidor." 
    }), { status: 500 });
  }
}