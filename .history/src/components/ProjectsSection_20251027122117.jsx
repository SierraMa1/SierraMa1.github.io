'use client'

import { useState } from 'react'; 
// Hacemos un apaño para que Swiper funcione bien con el tipo
import { Swiper as SwiperClass } from 'swiper/types';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow } from 'swiper/modules';
import { projectsData } from '@/data/projects';
import Link from 'next/link';
import ProjectCarouselCard from './ProjectCarouselCard';
import { ArrowLeft, ArrowRight } from 'lucide-react';

import 'swiper/css';
//import 'swiper/css/navigation';
import 'swiper/css/effect-coverflow';

export default function ProjectsSection() {
  // CREAMOS UN ESTADO PARA GUARDAR LA INSTANCIA DE SWIPER
  // Usamos el tipo importado para que TypeScript esté contento
  const [swiperInstance, setSwiperInstance] = useState<SwiperClass | null>(null);

  // CREAMOS FUNCIONES PARA CONTROLAR EL CARRUSEL MANUALMENTE
  const handlePrev = () => {
    if (swiperInstance) swiperInstance.slidePrev();
  };

  const handleNext = () => {
    if (swiperInstance) swiperInstance.slideNext();
  };

  return (
    <section id="proyectos" className="w-full bg-gray-50 py-20 lg:py-24 overflow-hidden">
      <div className="container mx-auto px-4">
        
        <div className="flex flex-col lg:flex-row lg:gap-16">

          <div className="lg:w-1/3 mb-12 lg:mb-0 flex-shrink-0">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Mis Proyectos
            </h2>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              Como desarrolladora web y experta en transformación digital, mi objetivo es diseñar e implementar soluciones tecnológicas que resuelvan problemas de negocio complejos y mejoren la eficiencia.
            </p>
            <Link 
              href="/#contacto" 
              className="inline-block rounded-md bg-violet-600 px-6 py-3 text-base font-medium text-white shadow-sm transition-colors hover:bg-violet-700"
            >
              Contacta conmigo
            </Link>
          </div>

          <div className="lg:w-2/3">
            <Swiper
              //  USAMOS onSwiper PARA CAPTURAR LA INSTANCIA DE SWIPER
              onSwiper={(swiper) => setSwiperInstance(swiper)}
              modules={[EffectCoverflow]} // Quitamos Navigation porque lo controlamos manualmente
              effect={'coverflow'}
              centeredSlides={true}
              loop={false} // 1. CORREGIDO: Cambiado a 'false' para eliminar el warning
              slidesPerView={'auto'}
              coverflowEffect={{
                rotate: 50,
                stretch: 0,
                depth: 100,
                modifier: 1,
                slideShadows: true,
              }}
              className="!overflow-visible"
            >
              {projectsData.map((project) => (
                <SwiperSlide key={project.id} className="!w-64 md:!w-72">
                  <ProjectCarouselCard project={project} />
                </SwiperSlide>
              ))}
            </Swiper>

            {/* AÑADIMOS onClick A LOS BOTONES PARA LLAMAR A NUESTRAS FUNCIONES */}
            <div className="mt-8 flex justify-center gap-4">
              <button onClick={handlePrev} className="flex h-12 w-12 items-center justify-center rounded-full border border-gray-300 bg-white text-gray-700 transition hover:bg-gray-100">
                <ArrowLeft size={24} />
              </button>
              <button onClick={handleNext} className="flex h-12 w-12 items-center justify-center rounded-full border border-gray-300 bg-white text-gray-700 transition hover:bg-gray-100">
                <ArrowRight size={24} />
              </button>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
