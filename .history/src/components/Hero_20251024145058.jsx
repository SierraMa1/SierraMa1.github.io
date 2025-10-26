
'use client'

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import Link from 'next/link';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function Hero() {
  return (
    <section id="inicio" className="relative h-screen w-full overflow-hidden">
      
      {/* --- Contenedor del Vídeo de Fondo --- */}
      <div className="absolute inset-0 z-0">
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
        <div className="absolute inset-0 bg-black opacity-50"></div>
      </div>

      {/* --- Carrusel --- */}
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        loop={true}
        navigation
        pagination={{ clickable: true }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        effect="slide" 
        className="h-full w-full relative z-10"
      >
        {/* --- Slide 1: Desarrolladora Web --- */}
        <SwiperSlide>
          <div className="flex h-full w-full flex-col items-center justify-center text-center text-white p-4 px-8 md:px-4">
            <h1 className="text-4xl md:text-6xl font-bold drop-shadow-lg">Desarrolladora Web Full Stack y Consultora de Transformación Digital</h1>
            <p className="mt-4 text-lg md:text-xl max-w-2xl drop-shadow-md">Creando aplicaciones eficientes y centradas en el usuario.</p>
            <Link href="/#proyectos" className="mt-8 rounded-full bg-violet-600 px-8 py-3 text-lg font-semibold transition hover:bg-violet-700 shadow-lg">
              Ver Proyectos
            </Link>
          </div>
        </SwiperSlide>

        {/* --- Slide 2: Transformación Digital --- */}
        <SwiperSlide>
          <div className="flex h-full w-full flex-col items-center justify-center text-center text-white p-4 px-8 md:px-">
            <h1 className="text-4xl md:text-6xl font-bold drop-shadow-lg">Experta en Transformación Digital</h1>
            <p className="mt-4 text-lg md:text-xl max-w-2xl drop-shadow-md">Alineando tecnología y negocio para generar un impacto medible.</p>
            <Link href="/#sobre-mi" className="mt-8 rounded-full bg-transparent border-2 border-white px-8 py-3 text-lg font-semibold transition hover:bg-white hover:text-black shadow-lg">
              Saber Más
            </Link>
          </div>
        </SwiperSlide>
      </Swiper>
    </section>
  );
}