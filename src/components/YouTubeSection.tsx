'use client';

import { useEffect, useRef, useState } from 'react';
import { useSite } from '@/context/SiteContext';
import { translations } from '@/i18n/translations';

export default function YouTubeSection() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const { lang } = useSite();
  const t = translations[lang].youtube;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="youtube" className="w-full bg-gray-50 py-24 px-4">
      <div className="mx-auto max-w-5xl" ref={ref}>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">

          {/* Columna izquierda — texto */}
          <div className={`transition-all duration-700 ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>

            {/* Badge canal */}
            <div className="mb-7 inline-flex items-center gap-3 rounded-full border border-gray-200 bg-white px-4 py-2 shadow-sm">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-red-600 flex-shrink-0">
                <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-white">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </div>
              <span className="text-sm font-semibold text-gray-700">{t.channelName}</span>
            </div>

            <p className="text-sm font-semibold uppercase tracking-widest text-violet-600 mb-3">{t.eyebrow}</p>
            <h2 className="text-4xl md:text-5xl font-bold mb-5 leading-tight">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-500 to-blue-500">
                {t.headline}{' '}{t.headlineAccent}
              </span>
            </h2>
            <p className="text-gray-500 text-lg leading-relaxed mb-10">
              {t.sub}
            </p>

            {/* Tipos de contenido */}
            <div className="mb-10 space-y-5">
              {t.content.map((item, i) => (
                <div
                  key={i}
                  className="flex items-start gap-4"
                  style={{
                    opacity: visible ? 1 : 0,
                    transform: visible ? 'none' : 'translateX(-12px)',
                    transition: `opacity 0.5s ${i * 120 + 300}ms, transform 0.5s ${i * 120 + 300}ms`,
                  }}
                >
                  <div className="flex-shrink-0 mt-1 w-1 h-8 rounded-full bg-gradient-to-b from-violet-500 to-violet-300" />
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">{item.titulo}</p>
                    <p className="text-gray-500 text-sm leading-relaxed">{item.texto}</p>
                  </div>
                </div>
              ))}
            </div>

            <a
              href="https://www.youtube.com/@TecnologiaFacilConMaria"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 rounded-full bg-red-600 px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-red-600/25 hover:bg-red-700 hover:-translate-y-0.5 transition-all duration-200"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4 fill-white flex-shrink-0">
                <path d="M8 5v14l11-7z" />
              </svg>
              {t.ctaLabel}
            </a>
          </div>

          {/* Columna derecha — pantalla decorativa */}
          <div className={`transition-all duration-700 delay-300 ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
            <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-[#0a0a0f] to-[#180a2e] border border-violet-500/15 shadow-2xl shadow-violet-900/20 aspect-video flex items-center justify-center">

              {/* Barra de navegador falsa */}
              <div className="absolute top-0 left-0 right-0 px-4 py-3 flex items-center gap-2 bg-black/30 border-b border-white/5">
                <div className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
                <div className="h-2.5 w-2.5 rounded-full bg-yellow-500/70" />
                <div className="h-2.5 w-2.5 rounded-full bg-green-500/70" />
                <div className="flex-1 h-5 rounded-md bg-white/5 ml-2" />
              </div>

              {/* Fondo degradado */}
              <div className="absolute inset-0 bg-gradient-to-br from-violet-900/20 via-transparent to-blue-900/15" />

              {/* Botón play central */}
              <div className="relative z-10 flex flex-col items-center gap-5">
                <a
                  href="https://www.youtube.com/@TecnologiaFacilConMaria"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Ver canal de YouTube"
                  className="flex h-20 w-20 items-center justify-center rounded-full bg-red-600/90 shadow-2xl shadow-red-600/40 hover:bg-red-600 hover:scale-110 transition-all duration-300"
                >
                  <svg viewBox="0 0 24 24" className="h-9 w-9 fill-white translate-x-0.5">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </a>
                <div className="text-center px-4">
                  <p className="text-white font-semibold text-sm">{t.channelName}</p>
                  <p className="text-gray-500 text-xs mt-0.5">{t.liveLabel}</p>
                </div>
              </div>

              {/* Tags */}
              <div className="absolute bottom-4 left-4 right-4 flex gap-2 flex-wrap justify-center">
                {t.tags.map((tag) => (
                  <span key={tag} className="rounded-full bg-white/6 border border-white/8 px-3 py-1 text-xs text-white/60">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Indicador activo */}
            <div className="mt-4 flex items-center justify-center gap-2 text-gray-400 text-xs">
              <div className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />
              {t.liveLabel}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
