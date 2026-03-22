'use client';

import { useEffect, useRef, useState } from 'react';
import { useSite } from '@/context/SiteContext';
import { translations } from '@/i18n/translations';

const cardAccents = [
  { accent: 'border-violet-400/40', numColor: 'text-violet-400' },
  { accent: 'border-blue-400/40',   numColor: 'text-blue-400'   },
  { accent: 'border-emerald-400/40', numColor: 'text-emerald-400' },
];

export default function ProblemaSection() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const { lang } = useSite();
  const t = translations[lang].problema;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="problema" className="w-full bg-[#0a0a0f] py-24 px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-violet-950/8 to-transparent pointer-events-none" />

      <div className="mx-auto max-w-5xl" ref={ref}>

        {/* Cabecera */}
        <div className={`mb-16 text-center transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="text-sm font-semibold uppercase tracking-widest text-violet-400 mb-4">
            {t.eyebrow}
          </p>
          <h2 className="text-4xl md:text-5xl font-bold mb-5 leading-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-blue-400">
              {t.headline}
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto leading-relaxed">
            {t.sub}
          </p>
        </div>

        {/* Tarjetas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {t.cards.map((p, i) => (
            <div
              key={i}
              className={`relative rounded-2xl border bg-white/4 ${cardAccents[i].accent} p-8
                          transition-all duration-700 hover:bg-white/6 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
              style={{ transitionDelay: `${i * 150}ms` }}
            >
              <p className={`text-5xl font-black mb-5 leading-none select-none ${cardAccents[i].numColor} opacity-40`}>
                0{i + 1}
              </p>
              <p className="text-white font-semibold text-base leading-snug mb-4 italic">
                {p.titulo}
              </p>
              <p className="text-gray-400 text-sm leading-relaxed">{p.texto}</p>
            </div>
          ))}
        </div>

        {/* Resolución */}
        <div className={`mt-14 text-center transition-all duration-700 delay-500 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-block rounded-2xl border border-violet-500/25 bg-violet-500/8 px-8 py-5 max-w-2xl">
            <p className="text-white text-xl font-semibold leading-snug">
              {lang === 'es'
                ? <>Convierto la tecnología en algo que <span className="text-violet-400">entiendes, que usas y que te funciona.</span></>
                : <>I turn technology into something you <span className="text-violet-400">understand, use and that works for you.</span></>
              }
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
