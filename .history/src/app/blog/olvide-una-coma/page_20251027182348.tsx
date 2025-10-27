import Link from 'next/link';
import { ArrowLeft, Lightbulb, AlertTriangle, Coffee } from 'lucide-react';

export default function MissingCommaArticle() {
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
          Horas perdidas por una coma (y otros clásicos)
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
          El código no funcionaba. No había errores en la consola. Reinicié el servidor. Borré la caché. Y todo era por un simple carácter mal puesto.
        </p>
        <div className="flex flex-wrap gap-2 mb-8">
          <span className="text-xs font-medium bg-yellow-100 dark:bg-yellow-900/50 text-yellow-700 dark:text-yellow-300 px-2.5 py-0.5 rounded-full">Humor</span>
          <span className="text-xs font-medium bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-300 px-2.5 py-0.5 rounded-full">Debug</span>
          <span className="text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2.5 py-0.5 rounded-full">DevLife</span>
        </div>

        {/* --- Cuerpo del Artículo --- */}
        <article className="prose prose-lg lg:prose-xl dark:prose-invert max-w-none prose-h2:font-bold prose-h2:text-violet-600 prose-a:text-violet-600 prose-code:text-violet-700 prose-code:bg-violet-50 dark:prose-code:bg-violet-900/50 dark:prose-code:text-violet-300">
          
          <h2>El Problema (Para Todos)</h2>
          <p>
            Esto nos ha pasado a todos. Tienes un código que *debería* funcionar. Lógicamente, es perfecto. No hay errores rojos en la consola, la aplicación arranca... pero simplemente no hace lo que esperas.
          </p>
          <p>
            En mi caso, fue creando esta misma sección de blog. Añadí un artículo, cree su archivo, lo enlacé... y al hacer clic: <strong>Error 404 - Página no encontrada</strong>.
          </p>
          <p>
            Empezó la locura: ¿Está mal la caché del servidor? (<code>rm -rf .next</code>). ¿Es Turbopack? (<code>npm run dev</code> sin turbopack). ¿Está mal la ruta en el componente Link? Revisé todo 10 veces. Todo parecía correcto.
          </p>
          
          <div className="flex items-center gap-4 p-4 bg-yellow-50 dark:bg-yellow-900/30 border border-yellow-200 dark:border-yellow-700 rounded-lg">
            <Coffee className="h-8 w-8 text-yellow-600 flex-shrink-0" />
            <p className="text-base m-0"><strong>El sentimiento:</strong> "He probado todo. No tiene sentido. ¿Quizás es un bug de Next.js? ¿De React? No puede ser mi código..."</p>
          </div>

          <h2>La Solución (La Coma)</h2>
          <p>
            Después de horas de frustración, volví a mirar el nombre de la carpeta que había creado. Y ahí estaba.
          </p>
          <p>
            El nombre de mi carpeta era: <code>arreglando-el-bug-de-swiper,</code>
          </p>
          <p>
            Una coma. Una simple coma al final del nombre de la carpeta. Un error de "typo" al crearla.
          </p>
          <p>
            El sistema de archivos la incluía en el nombre, pero el sistema de rutas de Next.js (lógicamente) no la esperaba. El enlace en mi componente (`/arreglando-el-bug-de-swiper`) no coincidía con el nombre real de la carpeta (`/arreglando-el-bug-de-swiper,`), y por eso daba 404.
          </p>
          <p>
            Quité la coma. Refresqué la página. Funcionó al instante.
          </p>

          <h2>La Lección Aprendida</h2>
          <div className="flex items-start gap-4 p-4 bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-700 rounded-lg">
            <Lightbulb className="h-8 w-8 text-blue-600 flex-shrink-0" />
            <p className="text-base m-0">
              <strong>El 99% de las veces, el error es tuyo (y es una tontería).</strong> Antes de culpar a la caché, al framework o a Turbopack, asume que has cometido el error más simple posible. Un typo, una coma, un <code>;</code> que falta, un <code>==</code> en lugar de <code>===</code>. Es la navaja de Ockham de la programación.
            </p>
          </div>

        </article>
      </div>
    </main>
  );
}
