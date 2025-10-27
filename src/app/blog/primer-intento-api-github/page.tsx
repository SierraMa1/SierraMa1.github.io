import Link from 'next/link';
import { ArrowLeft, Lightbulb, AlertTriangle } from 'lucide-react';

export default function GithubApiArticle() {
  return (
    <main className="w-full bg-white dark:bg-gray-900 py-20 lg:py-24">
      <div className="container mx-auto px-4 max-w-3xl">
        
        {/* --- Botón de Volver --- */}
        <div className="mb-8">
          <Link 
            href="/#blog" // Vuelve a la sección de blog en la home
            className="inline-flex items-center gap-2 text-violet-600 dark:text-violet-400 font-semibold hover:underline"
          >
            <ArrowLeft size={18} />
            Volver a todos los artículos
          </Link>
        </div>

        {/* --- Encabezado del Artículo --- */}
        <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
          Mi primer intento (fallido) con la API de GitHub
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
          Por qué mi "Widget de Actividad en Vivo" funcionaba en mi PC pero se rompía al refrescar mucho la página. La lección sobre el "Rate Limiting".
        </p>
        <div className="flex flex-wrap gap-2 mb-8">
          <span className="text-xs font-medium bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 px-2.5 py-0.5 rounded-full">API</span>
          <span className="text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2.5 py-0.5 rounded-full">GitHub</span>
          <span className="text-xs font-medium bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 px-2.5 py-0.5 rounded-full">useEffect</span>
        </div>

        {/* --- Cuerpo del Artículo --- */}
        <article className="prose prose-lg lg:prose-xl dark:prose-invert max-w-none prose-h2:font-bold prose-h2:text-violet-600 prose-a:text-violet-600 prose-code:text-violet-700 prose-code:bg-violet-50 dark:prose-code:bg-violet-900/50 dark:prose-code:text-violet-300">
          
          <h2>El Problema (Para el Recruiter)</h2>
          <p>
            Quería que mi portafolio se sintiera "vivo". Decidí añadir un "Widget de Actividad Reciente" que mostrara mi último proyecto de GitHub. Parecía simple: llamar a la API pública de GitHub y mostrar el resultado.
          </p>
          <p>
            Lo programé y... ¡funcionó perfecto! Lo subí a mi web, orgullosa. Pero al día siguiente, o a veces después de refrescar la página 5 o 6 veces, el widget aparecía vacío o con un error. Un widget que falla es peor que no tener widget, da una imagen de poca fiabilidad.
          </p>

          <div className="flex items-center gap-4 p-4 bg-yellow-50 dark:bg-yellow-900/30 border border-yellow-200 dark:border-yellow-700 rounded-lg">
            <AlertTriangle className="h-8 w-8 text-yellow-600 flex-shrink-0" />
            <p className="text-base m-0"><strong>El Dilema:</strong> ¿Por qué algo que funciona perfectamente en local falla de forma intermitente en producción? El clásico "en mi máquina sí funciona".</p>
          </div>

          <h2>La Solución (Para el Desarrollador)</h2>
          <p>
            El problema no era mi código, sino mis *suposiciones*. Estaba usando la API de GitHub de forma anónima (sin una clave de API), lo cual está bien para pruebas, pero tiene un límite.
          </p>
          <p>
            Abrí la pestaña "Network" en las herramientas de desarrollador y miré la respuesta de la API de GitHub. En las cabeceras (headers), encontré la respuesta: 
            <code>X-RateLimit-Remaining: 0</code>
          </p>
          <p>
            GitHub te da un límite de 60 peticiones por hora por dirección IP para peticiones no autenticadas. ¡Entre mis pruebas, las recargas de página y el build de la web, estaba agotando ese límite en minutos!
          </p>

          <h3>El dilema del hosting estático</h3>
          <p>
            La solución obvia es "usar una clave de API (autenticarse)", que te da 5.000 peticiones por hora. Pero, ¿dónde pones esa clave?
          </p>
          <p>
            Estoy usando un hosting estático (GitHub Pages), lo que significa que todo mi código <code>React</code> se ejecuta en el navegador del cliente. Si pongo mi clave de API en ese código (en el <code>useEffect</code>), ¡cualquiera podría verla, robarla y usarla!
          </p>
          <pre><code>
{`// ¡PELIGRO! NUNCA HACER ESTO EN EL FRONTEND
useEffect(() => {
  fetch('https://api.github.com/users/SierraMa1/repos', {
    headers: {
      // ¡Mi clave secreta es visible para todo el mundo!
      'Authorization': 'Bearer ghp_MI_CLAVE_SECRETA'
    }
  })
}, []);
`}
          </code></pre>
          <p>
            La solución *real* para esto es migrar a un hosting que soporte backend (como Vercel o Netlify), donde mi *servidor* puede hacer la llamada con la clave secreta y "servir" los datos al frontend.
          </p>
          
          <h2>La Lección Aprendida</h2>
          <div className="flex items-start gap-4 p-4 bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-700 rounded-lg">
            <Lightbulb className="h-8 w-8 text-blue-600 flex-shrink-0" />
            <p className="text-base m-0">
              <strong>Una API no es solo "qué" datos te da, sino "cómo" te los da.</strong> Antes de integrar cualquier API, las primeras líneas de la documentación que hay que leer son las de "Autenticación" y "Límites de Tasa" (Rate Limiting).
            </p>
          </div>

        </article>
      </div>
    </main>
  );
}