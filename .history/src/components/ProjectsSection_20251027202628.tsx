'use client'

import { useState, useEffect } from 'react'; // AÑADIDO: useEffect
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow } from 'swiper/modules';
import { projectsData } from '@/data/projects';
import Link from 'next/link';
import ProjectCarouselCard from './ProjectCarouselCard';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { cn } from "@/lib/utils";


import 'swiper/css';
import 'swiper/css/effect-coverflow';


// 2. Definimos las propiedades que acepta el componente (incluyendo el término de búsqueda)
interface ProjectsSectionProps {
  searchTerm: string | undefined;
}


export default function ProjectsSection( searchTerm : ProjectsSectionProps) {
  // CREAMOS UN ESTADO PARA GUARDAR LA INSTANCIA DE SWIPER
  const [swiperInstance, setSwiperInstance] = useState<any>(null); // Usamos 'any' para evitar errores de TypeScript en Swiper

  // CREAMOS FUNCIONES PARA CONTROLAR EL CARRUSEL MANUALMENTE
  const handlePrev = () => {
    if (swiperInstance) swiperInstance.slidePrev();
  };

  const handleNext = () => {
    if (swiperInstance) swiperInstance.slideNext();
  };

  // 1. LÓGICA DE FILTRADO
  const normalizedSearchTerm = searchTerm ? searchTerm.toLowerCase() : '';

  const filteredProjects = projectsData.filter(project => {
    // Si no hay término de búsqueda, mostramos todos
    if (!normalizedSearchTerm) return true;

    // Comprobamos si el término coincide en título, descripción o tags
    const titleMatch = project.title.toLowerCase().includes(normalizedSearchTerm);
    const descriptionMatch = project.description.toLowerCase().includes(normalizedSearchTerm);
    
    // Filtramos los tags si existen
    const tagsMatch = project.tags
        ? project.tags.some(tag => tag.toLowerCase().includes(normalizedSearchTerm))
        : false;

    return titleMatch || descriptionMatch || tagsMatch;
  });

  // --- SOLUCIÓN: FORZAR LA ACTUALIZACIÓN DE SWIPER ---
  useEffect(() => {
    if (swiperInstance && filteredProjects.length > 0) {
      // 1. Actualiza el estado de Swiper con los nuevos slides
      swiperInstance.update();
      // 2. Asegúrate de empezar en el primer slide
      swiperInstance.slideTo(0);
    }
  }, [filteredProjects.length, swiperInstance]); // Depende de la cantidad de proyectos filtrados
  // ----------------------------------------------------


  return (
    <section id="proyectos" className={cn(
        "w-full bg-gray-50 py-20 lg:py-24 overflow-hidden",
        // Si hay búsqueda y no hay resultados, ocultamos la sección
        filteredProjects.length === 0 && searchTerm ? "hidden" : ""
    )}>
      <div className="container mx-auto px-4">
        
        <div className="flex flex-col lg:flex-row lg:gap-16">

          <div className="lg:w-1/3 mb-12 lg:mb-0 flex-shrink-0">
            {/* Si estamos en modo búsqueda, no mostramos el texto de introducción */}
            {!searchTerm && (
                <>
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
                </>
            )}
            
            {/* Mensaje de resultados para la búsqueda */}
            {searchTerm && (
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    Resultados de Proyectos
                </h2>
            )}
          </div>

          <div className="lg:w-2/3">
            
            {/* 3. MANEJO DE RESULTADOS */}
            {filteredProjects.length > 0 ? (
                <>
                    <Swiper
                      //  USAMOS onSwiper PARA CAPTURAR LA INSTANCIA DE SWIPER
                      onSwiper={(swiper: any) => setSwiperInstance(swiper)}
                      modules={[EffectCoverflow]} 
                      effect={'coverflow'}
                      centeredSlides={true}
                      loop={false} // Lo hemos dejado en false para evitar el warning
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
                      {filteredProjects.map((project) => ( // Usamos los proyectos filtrados
                        <SwiperSlide key={project.id} className="!w-64 md:!w-72">
                          <ProjectCarouselCard project={project} />
                        </SwiperSlide>
                      ))}
                    </Swiper>

                    {/* Controles del Carrusel */}
                    <div className="mt-8 flex justify-center gap-4">
                      <button onClick={handlePrev} className="flex h-12 w-12 items-center justify-center rounded-full border border-gray-300 bg-white text-gray-700 transition hover:bg-gray-100" aria-label="Anterior">
                        <ArrowLeft size={24} />
                      </button>
                      <button onClick={handleNext} className="flex h-12 w-12 items-center justify-center rounded-full border border-gray-300 bg-white text-gray-700 transition hover:bg-gray-100" aria-label="Siguiente">
                        <ArrowRight size={24} />
                      </button>
                    </div>
                </>
            ) : (
                // Mensaje si no hay resultados en la búsqueda
                <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 lg:h-full flex items-center justify-center">
                    <p className="text-gray-600 italic">No se encontraron proyectos con el término "{searchTerm}".</p>
                </div>
            )}
          </div>
          
        </div>
      </div>
    </section>
  );
}