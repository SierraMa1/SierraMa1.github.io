'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

// Usaremos esta función para obtener la altura de la cabecera, necesaria para el efecto
const clamp = (num: number, min: number, max: number) => Math.max(min, Math.min(num, max));

export default function Hero() {
  const [scrollY, setScrollY] = useState(0);

  // AÑADIDO: Escucha el evento de scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Calcula el efecto:
  // 1. Escala: El video aumenta de tamaño lentamente a medida que se hace scroll.
  //    El valor 1.05 es un zoom suave; 1.0 es el tamaño original.
  const scaleValue = clamp(1 + scrollY * 0.0001, 1, 1.05);
  // 2. Opacidad: La capa oscura se hace ligeramente más oscura al hacer scroll.
  //    Esto mejora el contraste del texto.
  const opacityValue = clamp(0.7 + scrollY * 0.0005, 0.7, 0.9);

  return (
    <section id="inicio" className="relative h-screen w-full overflow-hidden">
      
      {/* --- Contenedor del Video con Efecto de Zoom Suave --- */}
      <div 
        className="absolute inset-0 z-0 transition-transform duration-100 ease-out"
        style={{
          transform: `scale(${scaleValue})`, // Aplicamos el zoom suave
        }}
      >
        {/* Tu Video de Fondo */}
        {/* IMPORTANTE: Asegúrate de que el archivo 'fondo.mp4' está en /public/videos */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
          src="/videos/fondo.mp4" 
          // Si el video no carga, se mostrará esta imagen de fondo (fallback)
          poster="/images/hero-fallback.jpg" 
        >
          Tu navegador no soporta el tag de video.
        </video>
        
        {/* Capa Oscura (overlay) */}
        <div 
          className="absolute inset-0 bg-black transition-opacity duration-100"
          style={{
            opacity: opacityValue // Aplicamos la opacidad dinámica
          }}
        ></div>
      </div>
      {/* --- Fin del Contenedor de Video --- */}


      {/* --- Contenido (Título y Botones) --- */}
      <div className="relative z-10 flex h-full items-center justify-center text-white">
        <div className="text-center px-4 max-w-4xl">
          
          <h1 className="text-5xl md:text-7xl font-extrabold mb-4 leading-tight">
            Desarrolladora Web Full Stack
          </h1>
          <p className="text-xl md:text-2xl font-light mb-8">
            Creando aplicaciones eficientes y centradas en el valor de negocio.
          </p>
          
          <Link href="/#proyectos" className="mt-6 inline-flex items-center justify-center rounded-lg bg-violet-600 px-8 py-3 text-lg font-semibold text-white transition-all duration-300 shadow-lg hover:bg-violet-700 hover:shadow-xl">
            Ver Proyectos
          </Link>
          
        </div>
      </div>
    </section>
  );
}