'use client'; // 1. AÑADIDO: Necesario para usar hooks (useState, useEffect)

import Image from 'next/image';
import { useState, useEffect } from 'react'; // 2. AÑADIDO: Imports para hooks
import { Star, GitFork, GitCommit } from 'lucide-react'; // 3. AÑADIDO: Iconos para el widget

// 4. AÑADIDO: Definimos el tipo de dato que esperamos de la API
interface Repo {
  id: number;
  name: string;
  html_url: string;
  description: string;
  pushed_at: string;
  stargazers_count: number;
  forks_count: number;
}

export default function AboutSection() {
  // 5. AÑADIDO: Estado para guardar el repositorio más reciente
  const [latestRepo, setLatestRepo] = useState<Repo | null>(null);
  const [loading, setLoading] = useState(true);

  // 6. AÑADIDO: Hook para llamar a la API de GitHub al cargar
  useEffect(() => {
    async function fetchLatestRepo() {
      try {
        // Pedimos solo el último repositorio actualizado del usuario 'SierraMa1'
        const response = await fetch('https://api.github.com/users/SierraMa1/repos?sort=pushed&per_page=1');
        if (!response.ok) {
          throw new Error('No se pudo conectar a la API de GitHub');
        }
        const data: Repo[] = await response.json();
        if (data.length > 0) {
          setLatestRepo(data[0]); // Guardamos el primer (y único) repo en el estado
        }
      } catch (error) {
        console.error("Error cargando datos de GitHub:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchLatestRepo();
  }, []); // El array vacío [] asegura que esto solo se ejecute una vez

  // Función para formatear la fecha "hace X tiempo"
  const timeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
    let interval = seconds / 31536000;
    if (interval > 1) return `hace ${Math.floor(interval)} años`;
    interval = seconds / 2592000;
    if (interval > 1) return `hace ${Math.floor(interval)} meses`;
    interval = seconds / 86400;
    if (interval > 1) return `hace ${Math.floor(interval)} días`;
    interval = seconds / 3600;
    if (interval > 1) return `hace ${Math.floor(interval)} horas`;
    interval = seconds / 60;
    if (interval > 1) return `hace ${Math.floor(interval)} minutos`;
    return `hace ${Math.floor(seconds)} segundos`;
  };


  return (
    <section id="sobre-mi" className="w-full bg-white py-20 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 lg:gap-16">
          
          <div className="flex justify-center">
            {/* 7. CORREGIDO: Usamos 'fill' y 'sizes' para arreglar el warning de 'yo.png' */}
            <div className="relative h-64 w-64 md:h-80 md:w-80 rounded-full shadow-lg overflow-hidden">
              <Image
                src="/yo.png"
                alt="Foto de María Sierra Sánchez"
                fill
                sizes="(max-width: 768px) 16rem, 20rem" // (h-64, w-64) o (h-80, w-80)
                className="object-cover"
              />
            </div>
          </div>

          <div className="text-center md:text-left mt-8 md:mt-0">
            <h2 className="mb-4 text-4xl font-bold text-gray-900">
              Hola, soy María
            </h2>
            <p className="mb-6 text-xl text-violet-600 font-semibold">
              Desarrolladora Web y Experta en Transformación Digital
            </p>
            <div className="space-y-4 text-lg text-gray-700">
              <p>
                Con una trayectoria que combina años de experiencia en el sector sanitario y una sólida especialización en desarrollo full-stack, mi pasión es crear soluciones tecnológicas que resuelven problemas de negocio complejos.
              </p>
              <p>
                Aprovecho mi visión dual (negocio y tecnología) para liderar proyectos que automaticen procesos, mejoren la eficiencia y generen un impacto medible.
              </p>
            </div>

            {/* 8. AÑADIDO: El nuevo "Widget de Actividad en Vivo" */}
            <div className="mt-8 rounded-lg border border-gray-200 bg-gray-50 p-6">
              <h4 className="mb-4 text-lg font-semibold text-gray-800 flex items-center">
                <GitCommit size={20} className="mr-2 text-violet-600" />
                Actividad Reciente en GitHub
              </h4>
              {loading && (
                <div className="h-20 animate-pulse rounded-md bg-gray-200"></div>
              )}
              {!loading && latestRepo && (
                <div>
                  <a 
                    href={latestRepo.html_url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="block font-bold text-gray-900 hover:text-violet-700 transition-colors"
                  >
                    {latestRepo.name}
                  </a>
                  <p className="text-sm text-gray-600 mb-2 truncate" title={latestRepo.description}>
                    {latestRepo.description || "Sin descripción"}
                  </p>
                  <p className="text-sm text-gray-500 mb-2">
                    Último push: {timeAgo(latestRepo.pushed_at)}
                  </p>
                  <div className="flex gap-4 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <Star size={14} /> {latestRepo.stargazers_count}
                    </span>
                    <span className="flex items-center gap-1">
                      <GitFork size={14} /> {latestRepo.forks_count}
                    </span>
                  </div>
                </div>
              )}
              {!loading && !latestRepo && (
                <p className="text-sm text-gray-500">No se pudo cargar la actividad de GitHub.</p>
              )}
            </div>
            
            <a
              href="mailto:info@mariasierrasanchez.com"
              className="mt-8 inline-block rounded-md bg-violet-600 px-6 py-3 text-base font-medium text-white shadow-sm transition-colors hover:bg-violet-700"
            >
              Contacta conmigo
            </a>
          </div>
          
        </div>
      </div>
    </section>
  );
}
