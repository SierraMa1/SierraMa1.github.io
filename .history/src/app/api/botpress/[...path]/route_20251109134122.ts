import { NextRequest, NextResponse } from 'next/server';

const BOTPRESS_URL = 'http://217.154.181.135:3000';
const PROXY_PREFIX = '/api/botpress/';

/**
 * Función auxiliar para obtener el path real de la petición.
 * Maneja tanto las peticiones directas al proxy como las reescritas.
 */
function getBotpressPath(request: NextRequest): string {
  const fullPath = request.nextUrl.pathname;

  // Caso 1: Petición directa a nuestro proxy (ej: la carga del <Script>)
  // Petición: /api/botpress/assets/modules/inject.js
  if (fullPath.startsWith(PROXY_PREFIX)) {
    // Devuelve: assets/modules/inject.js
    return fullPath.substring(PROXY_PREFIX.length);
  }

  // Caso 2: Petición reescrita (bug de Turbopack)
  // Petición: /lite/mariasierradev-bot (gracias al rewrite)
  // Petición: /assets/modules/inject.css (gracias al rewrite)
  // Simplemente devolvemos el path sin la barra inicial.
  
  // Devuelve: lite/mariasierradev-bot
  // Devuelve: assets/modules/inject.css
  return fullPath.substring(1);
}

// --- EL RESTO DEL ARCHIVO ES IGUAL PERO LO INCLUYO POR CLARIDAD ---

export async function GET(request: NextRequest) {
  const path = getBotpressPath(request);
  
  if (path === null || path === "") {
    return NextResponse.json({ error: 'Error al procesar la ruta del proxy (path nulo)' }, { status: 500 });
  }

  const searchParams = request.nextUrl.searchParams.toString();
  const url = `${BOTPRESS_URL}/${path}${searchParams ? `?${searchParams}` : ''}`;

  console.log(`PROXY GET (Revisado): ${url}`); // Log para ver la URL final

  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store'
    });

    const data = await response.text();
    
    return new NextResponse(data, {
      status: response.status,
      headers: {
        'Content-Type': response.headers.get('Content-Type') || 'text/html',
        'Access-Control-Allow-Origin': '*',
      },
    });
  } catch (error) {
    console.error('Proxy error (GET):', error);
    return NextResponse.json({ error: 'Proxy failed' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const path = getBotpressPath(request);

  if (path === null || path === "") {
    return NextResponse.json({ error: 'Error al procesar la ruta del proxy (path nulo)' }, { status: 500 });
  }

  const url = `${BOTPRESS_URL}/${path}`;
  const body = await request.text();

  console.log(`PROXY POST (Revisado): ${url}`); // Log para ver la URL final

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body,
      cache: 'no-store'
    });

    const data = await response.text();
    
    return new NextResponse(data, {
      status: response.status,
      headers: {
        'Content-Type': response.headers.get('Content-Type') || 'application/json',
      },
    });
  } catch (error) {
    console.error('Proxy error (POST):', error);
    return NextResponse.json({ error: 'Proxy failed' }, { status: 500 });
  }
}