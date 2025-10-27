import { NextResponse } from 'next/server';

// Esta función se ejecutará cuando alguien visite /api/secreto
export async function GET() {
  
  const data = {
    mensaje: "¡Felicidades! Has encontrado el secreto.",
    pista: "Menciona el código 'REACT-2025' en la entrevista para demostrar tu curiosidad.",
    emoji: "🚀"
  };

  // Devuelvo el mensaje como un JSON
  return NextResponse.json(data);
}
