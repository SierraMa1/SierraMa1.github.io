import Link from 'next/link';
import { ArrowLeft, Lightbulb, AlertTriangle } from 'lucide-react';

export default function SwiperBugArticle() {
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
          El bug de Swiper Loop que casi me vuelve loca
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
          Crónica de una batalla contra un carrusel infinito y cómo un simple warning escondía un problema más profundo.
        </p>
        <div className="flex flex-wrap gap-2 mb-8">
          <span className="text-xs font-medium bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-300 px-2.5 py-0.5 rounded-full">Debug</span>
          <span className="text-xs font-medium bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 px-2.5 py-0.5 rounded-full">React</span>
          <span className="text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2.5 py-0.5 rounded-full">Swiper.js</span>
        </div>

        {/* --- Cuerpo del Artículo --- */}
        {/* Usamos 'prose' de Tailwind para formatear el texto automáticamente */}
        <article className="prose prose-lg lg:prose-xl dark:prose-invert max-w-none prose-h2:font-bold prose-h2:text-violet-600 prose-a:text-violet-600 prose-code:text-violet-700 prose-code:bg-violet-50 dark:prose-code:bg-violet-900/50 dark:prose-code:text-violet-300">
          
          <h2>El Problema (Para el Recruiter)</h2>
          <p>
            En mi portafolio, quería un carrusel de proyectos atractivo y dinámico. La librería Swiper.js es fantástica para esto. Decidí implementar la función <code>loop: true</code> para que el carrusel fuera infinito. Parecía sencillo, pero me topé con un muro: el carrusel se rompía o, peor aún, aparecía un <em>warning</em> en la consola: <code>Swiper Loop Warning: The number of slides is not enough for loop mode...</code>
          </p>
          <p>
            Un visitante normal (como un recruiter) no ve la consola, pero sí ve un carrusel que no funciona bien. Eso proyecta una imagen de falta de atención al detalle. Mi primer instinto fue "desactivar el loop y listo", pero eso era rendirse.
          </p>

          <div className="flex items-center gap-4 p-4 bg-yellow-50 dark:bg-yellow-900/30 border border-yellow-200 dark:border-yellow-700 rounded-lg">
            <AlertTriangle className="h-8 w-8 text-yellow-600 flex-shrink-0" />
            <p className="text-base m-0"><strong>El Dilema:</strong> ¿Ignorar un <em>warning</em> y entregar una funcionalidad a medias, o pararse a entender qué está pasando realmente?</p>
          </div>

          <h2>La Solución (Para el Desarrollador)</h2>
          <p>
            Tras investigar, descubrí cómo funciona el <code>loop</code> de Swiper por dentro. Para crear un bucle "infinito", Swiper necesita <strong>duplicar</strong> tus slides (diapositivas). Si le dices que muestre 3 slides a la vez (<code>slidesPerView: 3</code>), necesita al menos el doble (6 slides en total) para que el efecto funcione sin saltos.
          </p>
          <p>
            Mi portafolio tiene 5 proyectos. No eran suficientes.
          </p>
          <p>
            El problema real era una "condición de carrera" (race condition). Mi componente de React cargaba los 5 proyectos, pero Swiper se inicializaba <strong>antes</strong> de que los proyectos estuvieran listos, veía "0 slides" y fallaba.
          </p>
          <p>
            La solución fue tomar el control del estado. En lugar de dejar que Swiper se inicializara solo, usé el hook <code>useState</code> para guardar la instancia de Swiper y el hook <code>useEffect</code> para detectar cuándo mis datos (los proyectos) estaban cargados. Solo entonces, actualizaba Swiper manualmente.
          </p>
          <pre><code>
{`// Ejemplo simplificado:
const [swiperInstance, setSwiperInstance] = useState(null);
const [projects, setProjects] = useState([]);

// 1. Capturamos la instancia de Swiper
<Swiper onSwiper={setSwiperInstance}>
  ...
</Swiper>

// 2. Cargamos los datos (ej: en otro useEffect)
useEffect(() => {
  setProjects(projectsData);
}, []);

// 3. Cuando los datos cambian, actualizamos Swiper
useEffect(() => {
  if (swiperInstance && projects.length > 0) {
    swiperInstance.update();
  }
}, [swiperInstance, projects]);
`}
          </code></pre>
          <p>
            Al final, decidí que el <code>loop: false</code> era más limpio para un portafolio con 5 proyectos, pero ahora entendía <strong>por qué</strong> fallaba, y eso es lo importante.
          </p>

          <h2>La Lección Aprendida</h2>
          <div className="flex items-start gap-4 p-4 bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-700 rounded-lg">
            <Lightbulb className="h-8 w-8 text-blue-600 flex-shrink-0" />
            <p className="text-base m-0">
              <strong>No ignores los warnings.</strong> Un <em>warning</em> no es un error que rompa la app, pero casi siempre es un síntoma de un problema más profundo. Entender <em>por qué</em> aparece un warning es lo que diferencia a un desarrollador junior de uno senior.
            </p>
          </div>

        </article>
      </div>
    </main>
  );
}
