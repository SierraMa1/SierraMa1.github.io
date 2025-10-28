'use client'

import Link from 'next/link';

// Eliminamos las importaciones de Swiper si no lo vamos a usar.
// Si deseas mantener el vídeo, mantenemos el componente.

export default function Hero() {
  return (
    <section id="inicio" className="relative h-screen w-full overflow-hidden">
      
      {/* --- Contenedor del Vídeo de Fondo --- */}
      <div className="absolute inset-0 z-0">
        {/* Asegúrate de que este vídeo esté altamente optimizado o considera un cartel estático para mejorar el LCP */}
        <video 
          autoPlay 
          loop 
          muted 
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/background-video1.mp4" type="video/mp4" />
          Tu navegador no soporta la etiqueta de video.
        </video>
        <div className="absolute inset-0 bg-black opacity-60"></div> {/* Aumentamos ligeramente la opacidad para mejor contraste */}
      </div>

      {/* --- Contenido Principal (Estático y Potente) --- */}
      <div className="flex h-full w-full flex-col items-center justify-center text-center text-white p-4 px-8 md:px-4 relative z-10">
        
        {/* Título (H1) centrado en el impacto estratégico */}
        <h1 className="text-4xl md:text-6xl font-extrabold drop-shadow-lg max-w-4xl leading-tight">
          Impulsa la **Reinvención de Negocios** con Estrategia Digital y Ejecución Técnica Impecable.
        </h1>
        
        {/* Subtítulo enfocado en el beneficio/propuesta de valor única */}
        <p className="mt-6 text-xl md:text-2xl max-w-3xl drop-shadow-md font-light">
          Fusiono la consultoría estratégica de alto nivel con el **desarrollo web de élite** para garantizar la **escalabilidad** y la **eficiencia operacional** de tu proyecto.
        </p>
        
        {/* CTA Estratégico (Punto 4) */}
        <Link 
          href="/#contacto" // O la URL a tu formulario de diagnóstico
          className="mt-10 rounded-full bg-violet-600 px-10 py-4 text-xl font-bold transition hover:bg-violet-700 shadow-xl border-2 border-violet-600 hover:border-violet-700"
        >
          Agenda un Diagnóstico Estratégico Gratuito
        </Link>
        
      </div>

    </section>
  );
}