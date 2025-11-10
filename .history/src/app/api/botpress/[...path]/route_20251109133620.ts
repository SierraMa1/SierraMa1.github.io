import { NextRequest, NextResponse } from 'next/server';

const BOTPRESS_URL = 'http://217.154.181.135:3000';

// Función auxiliar para obtener el path de forma segura
function getPathFromContext(context: { params: { path: string[] } }): string | null {
  console.log('DEBUG: Contexto recibido:', JSON.stringify(context, null, 2));

  if (context && context.params && Array.isArray(context.params.path)) {
    return context.params.path.join('/');
  }
  
  console.error('ERROR: No se pudo encontrar "path" en context.params');
  return null;
}

export async function GET(
  request: NextRequest,
  context: { params: { path: string[] } } // Recibimos el contexto completo
) {
  const path = getPathFromContext(context);
  if (path === null) {
    return NextResponse.json({ error: 'Error al procesar la ruta del proxy' }, { status: 500 });
  }

  const searchParams = request.nextUrl.searchParams.toString();
  const url = `${BOTPRESS_URL}/${path}${searchParams ? `?${searchParams}` : ''}`;

  console.log(`PROXY GET: ${url}`);

  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store' // Añadido para evitar caché en el proxy
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

export async function POST(
  request: NextRequest,
  context: { params: { path: string[] } } // Recibimos el contexto completo
) {
  const path = getPathFromContext(context);
  if (path === null) {
    return NextResponse.json({ error: 'Error al procesar la ruta del proxy' }, { status: 500 });
  }

  const url = `${BOTPRESS_URL}/${path}`;
  const body = await request.text();

  console.log(`PROXY POST: ${url}`);

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body,
      cache: 'no-store' // Añadido para evitar caché en el proxy
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