import { NextResponse } from 'next/server';

// --- ESTA LÍNEA ES LA SOLUCIÓN ---
// Le dice a Next.js que "convierta" esta API en un archivo estático durante el build
export const dynamic = 'force-static';
// ----------------------------------

// Esta función se ejecutará cuando alguien visite /api/secreto
export async function GET() {
  
  try {
    const data = {
      mensaje: "¡Felicidades! Has encontrado el secreto.",
      pista: "Menciona el código 'REACT-2025' en la entrevista para demostrar tu curiosidad.",
      emoji: "🚀"
    };

    // Devolvemos el mensaje como un JSON
    return NextResponse.json(data);

  } catch (error) {
    // Es buena práctica mantener un try...catch por si algo falla
    return new NextResponse(
      JSON.stringify({ error: 'Error al procesar la solicitud' }),
      { status: 500 }
    );
  }
}