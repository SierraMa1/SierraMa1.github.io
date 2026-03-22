'use client';

import { useEffect, useRef, useState } from 'react';
import { useSite } from '@/context/SiteContext';
import { translations } from '@/i18n/translations';

// Iconos fijos (no cambian con el idioma)
const otrosNegociosIcons = ['🏪', '⚖️', '🏗️', '🌿', '🏥', '📦'];

export default function SoftwareSection() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const { lang } = useSite();
  const t = translations[lang].software;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="software"
      className="w-full relative overflow-hidden py-28 px-4"
      style={{ background: 'linear-gradient(135deg, #0d0016 0%, #1a0a2e 40%, #0a0a1a 100%)' }}
    >
      {/* Decoración de fondo */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-violet-700/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-blue-700/8 blur-[100px] pointer-events-none" />

      <div className="mx-auto max-w-6xl relative z-10" ref={ref}>

        {/* Badge */}
        <div className={`mb-6 flex justify-center transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <span className="inline-flex items-center gap-2 rounded-full border border-violet-500/40 bg-violet-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-violet-300">
            {t.badge}
          </span>
        </div>

        {/* Titular */}
        <div className={`mb-6 text-center transition-all duration-700 delay-100 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight mb-4">
            {t.headline}
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-blue-400">
              {t.headlineAccent}
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed mt-5">
            {t.sub}
          </p>
        </div>

        {/* Divider */}
        <div className={`my-14 flex items-center gap-6 transition-all duration-700 delay-200 ${visible ? 'opacity-100' : 'opacity-0'}`}>
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-violet-500/40 to-transparent" />
          <span className="text-violet-400 text-sm font-semibold uppercase tracking-widest">{t.specialization}</span>
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-violet-500/40 to-transparent" />
        </div>

        {/* Bloque clínicas dentales */}
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16 transition-all duration-700 delay-300 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>

          {/* Texto izquierda */}
          <div className="flex flex-col justify-center">
            <div className="flex items-center gap-3 mb-5">
              <span className="text-4xl">🦷</span>
              <h3 className="text-2xl font-bold text-white">{t.dentalTitle}</h3>
            </div>
            <p className="text-gray-400 leading-relaxed mb-6">
              {t.dentalDesc} <strong className="text-white">{t.dentalStrong}</strong>
            </p>
            <p className="text-violet-300 text-sm font-medium italic">
              {t.dentalQuote}
            </p>
          </div>

          {/* Features derecha */}
          <div className="rounded-2xl border border-violet-500/20 bg-white/[0.03] p-7 backdrop-blur-sm">
            <p className="text-xs font-bold uppercase tracking-widest text-violet-400 mb-5">{t.featuresLabel}</p>
            <ul className="space-y-3">
              {t.features.map((f, i) => (
                <li key={i} className="flex items-center gap-3 text-gray-300 text-sm">
                  <span className="flex-shrink-0 h-5 w-5 rounded-full bg-violet-500/20 flex items-center justify-center">
                    <svg className="h-3 w-3 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Otros negocios */}
        <div className={`transition-all duration-700 delay-400 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="text-center text-sm font-semibold uppercase tracking-widest text-gray-500 mb-7">
            {t.othersLabel}
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {t.otherNegocios.map((label, i) => (
              <div
                key={i}
                className="flex flex-col items-center gap-2 rounded-xl border border-white/5 bg-white/[0.03] p-4 hover:border-violet-500/30 hover:bg-violet-500/5 transition-all duration-200"
              >
                <span className="text-2xl">{otrosNegociosIcons[i]}</span>
                <span className="text-gray-400 text-xs text-center font-medium">{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className={`mt-14 text-center transition-all duration-700 delay-500 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <a
            href="/#contacto"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-600 to-violet-500 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 hover:-translate-y-0.5 transition-all duration-200"
          >
            {t.cta}
          </a>
          <p className="mt-3 text-gray-500 text-sm">{t.ctaNote}</p>
        </div>

      </div>
    </section>
  );
}
