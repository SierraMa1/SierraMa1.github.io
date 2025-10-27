import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// --- FUNCIÓN DE RETRASO ---
// mensaje temporal
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// --- TU BASE DE CONOCIMIENTO (RAG) ---
// Esto solo para Ollama en modo local
let miInfo = '';
let systemPrompt = '';
try {
  const infoPath = path.join(process.cwd(), 'src/app/api/chat/mi-info.txt');
  miInfo = fs.readFileSync(infoPath, 'utf-8');
  console.log("Base de conocimiento 'mi-info.txt' cargada para Ollama.");

  // Definimos el prompt del sistema que usará Ollama
  systemPrompt = `
    Eres un asistente virtual para el sitio web de María.
    Tu única tarea es responder a la pregunta del usuario basándote ESTRICTAMENTE en el siguiente contexto.
    No inventes nada. Si la respuesta no está en el contexto, di "Lo siento, no tengo esa información sobre María".
    Responde de forma amable y directa.

    --- CONTEXTO SOBRE MARÍA ---
    ${miInfo}
    --- FIN DEL CONTEXTO ---
  `;

} catch (error) {
  console.warn("Advertencia: No se pudo leer 'mi-info.txt'.", error.message);
  // Si el archivo no existe, Ollama funcionará sin contexto RAG
  systemPrompt = "Eres un asistente virtual para el sitio web de María.";
}
// ---------------------------------------------


export async function POST(req) {

  // --- LÓGICA DE PRODUCCIÓN (IONOS) ---
  // Comprueba si el entorno es 'production' (como en Ionos)
  if (process.env.NODE_ENV === 'production') {
    // Simula un pequeño tiempo de "pensamiento"
    await sleep(500);

    // 2. Define el mensaje de "en construcción"
    const placeholderMessage = "Hola, gracias por tu interés. Este asistente de IA aún se está preparando y estará disponible muy pronto.";

    // 3. Responde siempre con ese mensaje
    return NextResponse.json({ response: placeholderMessage });
  }
  // -------------------------------------------


  // --- 3. LÓGICA DE DESARROLLO (TU PC LOCAL CON OLLAMA) ---
  // Si no es 'production', ejecuta la lógica de Ollama
  try {
    const { messages } = await req.json();
    const lastUserMessage = messages[messages.length - 1].content;

    // Preparamos el cuerpo para Ollama, incluyendo el prompt del sistema (RAG)
    const ollamaPayload = {
      model: 'llama3', // El modelo que estás usando
      messages: [
        { role: 'system', content: systemPrompt }, // Tu contexto RAG
        { role: 'user', content: lastUserMessage }
      ],
      stream: false, // Lo dejamos sin streaming para que sea más simple
    };

    // Llamamos a tu Ollama local
    const response = await fetch('http://localhost:11434/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(ollamaPayload),
    });

    if (!response.ok) {
      throw new Error(`Ollama respondió con error: ${response.status}`);
    }

    const responseData = await response.json();
    
    // Extraemos la respuesta (Ollama la devuelve en `message.content`)
    const botReply = responseData.message.content;

    return NextResponse.json({ response: botReply });

  } catch (error) {
    console.error("Error en modo desarrollo (Ollama):", error);

    // Mantenemos el error específico si Ollama no está arrancado
    if (error.cause && error.cause.code === 'ECONNREFUSED') {
      return NextResponse.json(
        { error: 'Error: No se pudo conectar a Ollama local (http://localhost:11434). ¿Has ejecutado `ollama run llama3` en tu terminal?' },
        { status: 500 }
      );
    }

    // Error genérico
    return NextResponse.json(
      { error: 'Error interno del servidor: ' + error.message },
      { status: 500 }
    );
  }
}
