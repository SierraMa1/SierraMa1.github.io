import { NextResponse } from 'next/server';

// SOLUCIÓN PARA GITHUB PAGES:
// Esto le dice a Next.js que trate esta ruta como estática durante el 'output: export'.
// La API no funcionará en GitHub Pages, pero el build (la compilación) SÍ funcionará.
export const dynamic = 'force-static';


export async function GET() {
  return NextResponse.json({ 
    mensaje: "¡Felicidades! Has encontrado el secreto. ¡Menciona el código 'REACT-2025'!",
    pista: "Esta API funciona perfectamente en un hosting de Node.js (como Vercel), pero no en un hosting estático (como GitHub Pages)."
  });
}
