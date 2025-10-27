// Importamos 'NextResponse' para las respuestas de la API de Next.js
import { NextResponse } from 'next/server';
// Importamos 'fs' y 'path' para leer tu archivo de información
import fs from 'fs';
import path from 'path';

// --- 1. CARGAMOS TU BASE DE CONOCIMIENTO (Igual que antes) ---
// Leemos tu información UNA SOLA VEZ cuando el servidor se inicia.
let miInfo = '';
try {
  // Construimos la ruta al archivo 'mi-info.txt'
  const infoPath = path.join(process.cwd(), 'src/app/api/chat/mi-info.txt');
  miInfo = fs.readFileSync(infoPath, 'utf-8');
  console.log("Base de conocimiento 'mi-info.txt' cargada correctamente.");
} catch (error) {
  console.error("Error Crítico: No se pudo leer 'mi-info.txt'.", error);
  miInfo = "Error: No se pudo cargar la información de contexto.";
}
// ---------------------------------------------

// --- NO NECESITAMOS CONFIGURACIÓN DE GOOGLE ---
// (Eliminamos const genAI = ... y const model = ...)
// ---------------------------------------------


export async function POST(req) {
  try {
    // Obtenemos la pregunta del usuario desde el frontend
    // (Asumimos que sigue enviando un objeto 'messages')
    const { messages } = await req.json();
    const lastUserMessage = messages[messages.length - 1].content;

    // --- 3. CONSTRUIMOS EL PROMPT DE RAG (Igual que antes) ---
    // Esta es la plantilla que le da el contexto al modelo local.
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

    // --- 4. LLAMAMOS A LA API LOCAL DE OLLAMA ---
    // En lugar de llamar a Google, llamamos a tu PC en localhost:11434
    const ollamaResponse = await fetch('http://localhost:11434/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama3', // Asegúrate de tener este modelo (ejecuta 'ollama run llama3')
        messages: [
          // ¡IMPORTANTE! Enviamos el promptTemplate completo como el mensaje del usuario
          { role: 'user', content: promptTemplate }
        ],
        stream: false, // Queremos la respuesta completa
      }),
    });

    if (!ollamaResponse.ok) {
      // Si Ollama da un error, lo mostramos en la consola del servidor
      const errorText = await ollamaResponse.text();
      console.error("Error desde Ollama:", errorText);
      throw new Error(`Ollama respondió con error: ${ollamaResponse.status}`);
    }

    const ollamaData = await ollamaResponse.json();
    const botReply = ollamaData.message.content;
    
    // -----------------------------------------

    // Respondemos al frontend con el mismo formato que esperaba de Google
    // (Un objeto con una clave 'response')
    return NextResponse.json({ response: botReply });

  } catch (error) {
    console.error("Error detallado en /api/chat:", error);

    // Error específico si Ollama no está corriendo
    if (error.cause && error.cause.code === 'ECONNREFUSED') {
      console.error("--- ¡ERROR! No se pudo conectar a Ollama. ¿Está Ollama ejecutándose? ---");
      return NextResponse.json(
        { error: 'No se pudo conectar al modelo de IA local (Ollama). Asegúrate de que está en ejecución.' },
        { status: 500 }
      );
    }
    
    // Error genérico
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
