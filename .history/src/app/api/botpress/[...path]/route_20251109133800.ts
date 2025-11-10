import { NextRequest, NextResponse } from 'next/server';

const BOTPRESS_URL = 'http://217.154.181.135:3000';
// Definimos el prefijo de nuestro proxy
const PROXY_PREFIX = '/api/botpress/';

/**
 * Función auxiliar para extraer el path real de la petición.
 * Ej: de "/api/botpress/assets/modules/inject.js"
 * devuelve "assets/modules/inject.js"
 */
function getBotpressPath(request: NextRequest): string | null {
  const fullPath = request.nextUrl.pathname;
  
  if (fullPath.startsWith(PROXY_PREFIX)) {
    // Devuelve la parte de la URL que va *después* del prefijo
    return fullPath.substring(PROXY_PREFIX.length);
  }
  
  console.error(`ERROR: La ruta ${fullPath} no comienza con ${PROXY_PREFIX}`);
  return null;
}

export async function GET(request: NextRequest) {
  // Ya no usamos 'context', usamos la request
  const path = getBotpressPath(request);
  
  if (path === null) {
    return NextResponse.json({ error: 'Error al procesar la ruta del proxy (path nulo)' }, { status: 500 });
  }

  const searchParams = request.nextUrl.searchParams.toString();
  const url = `${BOTPRESS_URL}/${path}${searchParams ? `?${searchParams}` : ''}`;

  console.log(`PROXY GET: ${url}`); // Log para ver la URL final

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
  // Ya no usamos 'context', usamos la request
  const path = getBotpressPath(request);

  if (path === null) {
    return NextResponse.json({ error: 'Error al procesar la ruta del proxy (path nulo)' }, { status: 500 });
  }

  const url = `${BOTPRESS_URL}/${path}`;
  const body = await request.text();

  console.log(`PROXY POST: ${url}`); // Log para ver la URL final

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