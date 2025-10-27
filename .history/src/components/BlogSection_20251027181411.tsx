import Link from 'next/link';
import { ArrowRight, BookOpen } from 'lucide-react';

// --- Datos de Ejemplo ---
// En un blog real, esto vendría de archivos Markdown (MDX)
const blogPosts = [
  {
    slug: '/blog/arreglando-el-bug-de-swiper',
    title: 'El bug de Swiper Loop que casi me vuelve loca',
    description: 'Crónica de una batalla contra un carrusel infinito y cómo la caché de Swiper me estaba jugando una mala pasada...',
    tags: ['Debug', 'React', 'Swiper'],
  },
  {
    slug: '/blog/limpiando-warnings-de-next',
    title: 'Lo que aprendí limpiando warnings de Next.js Image',
    description: 'De `layout="fill"` a `fill` y `sizes`. Por qué estos cambios aparentemente pequeños son cruciales para el rendimiento.',
    tags: ['Next.js', 'Optimización', 'Core Web Vitals'],
  },
  {
    // ¡AQUÍ ESTABA EL ERROR! He corregido el slug:
    slug: '/blog/primer-intento-api-github', 
    title: 'Mi primer intento (fallido) con la API de GitHub',
    description: 'Por qué mi widget de actividad en vivo no funcionaba y cómo solucioné los problemas de rate-limiting y autenticación.',
    tags: ['API', 'GitHub', 'useEffect'],
  },
];
// -------------------------


export default function BlogSection() {
  return (
    <section id="blog" className="w-full bg-white dark:bg-gray-900 py-20 lg:py-24">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-extrabold text-center text-gray-900 dark:text-white mb-4">
          Lecciones del Teclado
        </h2>
        <p className="text-lg text-center text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto">
          Un portafolio muestra el éxito, pero el trabajo real es resolver problemas. Aquí comparto algunos de mis retos y aprendizajes.
        </p>

        {/* Contenedor de Artículos */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <Link 
              href={post.slug} 
              key={post.title}
              className="group block bg-gray-50 dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
            >
              <div className="p-6">
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.map((tag) => (
                    <span 
                      key={tag} 
                      className="text-xs font-medium bg-violet-100 dark:bg-violet-900/50 text-violet-700 dark:text-violet-300 px-2.5 py-0.5 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{post.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm">
                  {post.description}
                </p>
                <span className="font-semibold text-violet-600 dark:text-violet-400 flex items-center group-hover:gap-2 transition-all">
                  Leer artículo <ArrowRight size={16} className="ml-1" />
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link 
            href="/blog" // Asumimos que tendrás una página de blog principal
            className="inline-flex items-center gap-2 text-lg font-semibold text-gray-700 dark:text-gray-200 hover:text-violet-600 dark:hover:text-violet-400 transition-colors"
          >
            <BookOpen size={20} />
            Ver todos los artículos
          </Link>
        </div>
      </div>
    </section>
  );
}
