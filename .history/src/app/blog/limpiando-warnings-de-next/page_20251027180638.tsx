import Link from 'next/link';
import { ArrowLeft, Lightbulb, AlertTriangle } from 'lucide-react';

export default function NextImageArticle() {
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
          Lo que aprendí limpiando warnings de Next.js
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
          De `layout="fill"` a `fill` y `sizes`. Por qué estos cambios aparentemente pequeños son cruciales para el rendimiento y la "calidad de código".
        </p>
        <div className="flex flex-wrap gap-2 mb-8">
          <span className="text-xs font-medium bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 px-2.5 py-0.5 rounded-full">Next.js</span>
          <span className="text-xs font-medium bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300 px-2.5 py-0.5 rounded-full">Optimización</span>
          <span className="text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2.5 py-0.5 rounded-full">Core Web Vitals</span>
        </div>

        {/* --- Cuerpo del Artículo --- */}
        <article className="prose prose-lg lg:prose-xl dark:prose-invert max-w-none prose-h2:font-bold prose-h2:text-violet-600 prose-a:text-violet-600 prose-code:text-violet-700 prose-code:bg-violet-50 dark:prose-code:bg-violet-900/50 dark:prose-code:text-violet-300">
          
          <h2>El Problema (Para el Recruiter)</h2>
          <p>
            Mientras desarrollaba mi portafolio, la web funcionaba perfectamente, pero la "consola de desarrollador" (un panel que los técnicos usamos para depurar) estaba llena de avisos amarillos (<em>warnings</em>).
          </p>
          <p>
            Avisos como <code>legacyBehavior is deprecated...</code> o <code>...missing "sizes" prop</code>. Un cliente o un usuario normal nunca vería esto. Sin embargo, un reclutador técnico o un compañero desarrollador SÍ lo vería, y una consola "sucia" da una imagen de descuido o de "deuda técnica".
          </p>

          <div className="flex items-center gap-4 p-4 bg-yellow-50 dark:bg-yellow-900/30 border border-yellow-200 dark:border-yellow-700 rounded-lg">
            <AlertTriangle className="h-8 w-8 text-yellow-600 flex-shrink-0" />
            <p className="text-base m-0"><strong>El Dilema:</strong> Si la web "funciona", ¿merece la pena dedicar tiempo a arreglar algo que el usuario final no ve?</p>
          </div>

          <h2>La Solución (Para el Desarrollador)</h2>
          <p>
            Decidí investigar cada <em>warning</em>. Next.js no los pone por capricho; los pone porque está intentando ayudarte a mejorar el rendimiento (los Core Web Vitals de Google).
          </p>
          
          <h3>1. Arreglando <code>legacyBehavior</code> en <code>&lt;Link&gt;</code></h3>
          <p>
            El primer warning era por usar la sintaxis antigua de <code>&lt;Link&gt;</code>, que obligaba a poner una etiqueta <code>&lt;a&gt;</code> dentro.
          </p>
          <pre><code>
{`// ANTES (Con warning)
<Link href="/contacto" legacyBehavior>
  <a className="mi-estilo">Contacto</a>
</Link>

// DESPUÉS (Limpio y moderno)
<Link href="/contacto" className="mi-estilo">
  Contacto
</Link>
`}
          </code></pre>
          <p>La nueva sintaxis es más limpia y semántica.</p>

          <h3>2. Arreglando <code>fill</code> y <code>sizes</code> en <code>&lt;Image&gt;</code></h3>
          <p>
            El warning más importante era sobre las imágenes. Usar <code>layout="fill"</code> y <code>objectFit</code> está obsoleto. La nueva sintaxis <code>fill</code> y <code>className="object-cover"</code> es mejor, pero Next.js te "exige" un paso más: la propiedad <code>sizes</code>.
          </p>
          <pre><code>
{`// ANTES (Con warning)
<Image
  src="/mi-foto.png"
  alt="foto"
  layout="fill"
  objectFit="cover"
/>

// DESPUÉS (Optimizado)
<Image
  src="/mi-foto.png"
  alt="foto"
  fill
  className="object-cover"
  sizes="(max-width: 768px) 100vw, 33vw"
/>
`}
          </code></pre>
          <p>
            Esa línea de <code>sizes</code> le dice al navegador: "En pantallas pequeñas (móviles), la imagen ocupará el 100% del ancho; en pantallas grandes, ocupará el 33%". Esto permite a Next.js cargar una imagen mucho más pequeña y ligera en móviles, mejorando drásticamente la velocidad de carga.
          </p>

          <h2>La Lección Aprendida</h2>
          <div className="flex items-start gap-4 p-4 bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-700 rounded-lg">
            <Lightbulb className="h-8 w-8 text-blue-600 flex-shrink-0" />
            <p className="text-base m-0">
              <strong>El código limpio no es solo código que funciona, es código que rinde bien.</strong> Los <em>warnings</em> son "deuda técnica" gratuita que el framework te está señalando. Escucharlos y arreglarlos te ahorra problemas de rendimiento en el futuro.
            </p>
          </div>

        </article>
      </div>
    </main>
  );
}