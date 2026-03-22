import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

let miInfo = '';
let systemPrompt = '';
try {
  const infoPath = path.join(process.cwd(), 'src/app/api/chat/mi-info.txt');
  miInfo = fs.readFileSync(infoPath, 'utf-8');
  console.log("Base de conocimiento 'mi-info.txt' cargada para Ollama.");

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
  const msg = error instanceof Error ? error.message : String(error);
  console.warn("Advertencia: No se pudo leer 'mi-info.txt'.", msg);
  systemPrompt = 'Eres un asistente virtual para el sitio web de María.';
}

type ChatBody = {
  messages?: { role: string; content: string }[];
};

export async function POST(req: Request) {
  if (process.env.NODE_ENV === 'production') {
    await sleep(500);
    const placeholderMessage =
      'Hola, gracias por tu interés. Este asistente de IA aún se está preparando y estará disponible muy pronto.';
    return NextResponse.json({ response: placeholderMessage });
  }

  try {
    const body = (await req.json()) as ChatBody;
    const messages = body.messages;
    if (!messages?.length) {
      return NextResponse.json({ error: 'Falta el historial de mensajes.' }, { status: 400 });
    }
    const lastUserMessage = messages[messages.length - 1].content;

    const ollamaPayload = {
      model: 'llama3',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: lastUserMessage },
      ],
      stream: false,
    };

    const ollamaUrl = process.env.OLLAMA_URL || 'http://localhost:11434';

    const response = await fetch(`${ollamaUrl}/api/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(ollamaPayload),
    });

    if (!response.ok) {
      throw new Error(`Ollama respondió con error: ${response.status}`);
    }

    const responseData = (await response.json()) as { message?: { content?: string } };
    const botReply = responseData.message?.content ?? '';

    return NextResponse.json({ response: botReply });
  } catch (error) {
    const err = error as Error & { cause?: { code?: string } };
    console.error('Error en modo desarrollo (Ollama):', error);

    if (err.cause && err.cause.code === 'ECONNREFUSED') {
      return NextResponse.json(
        {
          error:
            'Error: No se pudo conectar a Ollama local (http://localhost:11434). ¿Has ejecutado `ollama run llama3` en tu terminal?',
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: 'Error interno del servidor: ' + (error instanceof Error ? error.message : String(error)) },
      { status: 500 }
    );
  }
}
