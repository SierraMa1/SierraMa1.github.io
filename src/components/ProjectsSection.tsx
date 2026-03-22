'use client'

import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import { projectsData } from '@/data/projects';
import Link from 'next/link';
import ProjectCarouselCard from './ProjectCarouselCard';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useSite } from '@/context/SiteContext';
import { translations } from '@/i18n/translations';

import 'swiper/css';
import 'swiper/css/effect-coverflow';

export default function ProjectsSection() {
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);

  const { lang } = useSite();
  const t = translations[lang].proyectos;

  return (
    <section id="proyectos" className="w-full bg-[#0a0a0f] py-24 px-4 overflow-hidden">
      <div className="mx-auto max-w-6xl">

        <div className="flex flex-col lg:flex-row lg:gap-16 items-start">

          {/* Columna texto */}
          <div className="lg:w-1/3 mb-12 lg:mb-0 flex-shrink-0">
            <p className="text-sm font-semibold uppercase tracking-widest text-violet-400 mb-3">{t.eyebrow}</p>
            <h2 className="text-4xl font-bold mb-4 leading-tight">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-blue-400">
                {t.headline}
              </span>
            </h2>
            <p className="text-gray-400 text-base leading-relaxed mb-8">
              {t.sub}
            </p>
            <Link
              href="/#contacto"
              className="inline-flex items-center gap-2 rounded-full bg-violet-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-violet-500/20 hover:bg-violet-500 hover:-translate-y-0.5 transition-all duration-200"
            >
              {t.ctaLabel}
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>

          {/* Carrusel */}
          <div className="lg:w-2/3 w-full">
            <Swiper
              onSwiper={(swiper: SwiperType) => setSwiperInstance(swiper)}
              modules={[EffectCoverflow]}
              effect="coverflow"
              centeredSlides={true}
              loop={false}
              slidesPerView="auto"
              coverflowEffect={{ rotate: 40, stretch: 0, depth: 90, modifier: 1, slideShadows: true }}
              className="!overflow-visible"
            >
              {projectsData.map((project) => (
                <SwiperSlide key={project.id} className="!w-64 md:!w-72">
                  <ProjectCarouselCard project={project} />
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Controles */}
            <div className="mt-8 flex items-center gap-3 justify-center">
              <button
                onClick={() => swiperInstance?.slidePrev()}
                aria-label={lang === 'es' ? 'Proyecto anterior' : 'Previous project'}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-gray-400 hover:border-violet-500/50 hover:text-violet-400 transition-all duration-200"
              >
                <ArrowLeft size={18} />
              </button>
              <button
                onClick={() => swiperInstance?.slideNext()}
                aria-label={lang === 'es' ? 'Proyecto siguiente' : 'Next project'}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-gray-400 hover:border-violet-500/50 hover:text-violet-400 transition-all duration-200"
              >
                <ArrowRight size={18} />
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
