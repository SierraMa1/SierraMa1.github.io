// src/app/api/chat/route.js
import { GoogleGenerativeAI } from '@google/generative-ai';

// Esta línea nos dirá si la clave se está cargando
console.log("API ROUTE: Cargando clave de API:", process.env.GOOGLE_API_KEY ? `...${process.env.GOOGLE_API_KEY.slice(-4)}` : "NO ENCONTRADA");

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || '');

export async function POST(req) {
  try {
    const { messages } = await req.json();
    
    // Usaremos el modelo más estándar para máxima compatibilidad
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    let history = messages.slice(0, -1).map(m => ({
      role: m.role === 'user' ? 'user' : 'model',
      parts: [{ text: m.content }],
    }));

    if (history.length > 0 && history[0].role !== 'user') {
      history = [];
    }

    const lastUserMessage = messages[messages.length - 1].content;
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
    return new Response(JSON.stringify({ error: "No se pudo conectar con la IA." }), { status: 500 });
  }
}