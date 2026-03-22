'use client';

import { useEffect, useRef, useState } from 'react';
import { useSite } from '@/context/SiteContext';
import { translations } from '@/i18n/translations';

function FAQItem({ pregunta, respuesta, index }: { pregunta: string; respuesta: string; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={`rounded-xl overflow-hidden transition-all duration-200 border ${
        open
          ? 'border-violet-500/40 bg-violet-950/30'
          : 'border-white/8 bg-white/[0.03] hover:border-violet-500/25 hover:bg-white/[0.05]'
      }`}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
        aria-expanded={open}
      >
        <span className="flex items-start gap-3">
          <span className="flex-shrink-0 mt-0.5 text-sm font-black text-violet-400/60 w-6">
            {String(index + 1).padStart(2, '0')}
          </span>
          <span className={`font-semibold text-base leading-snug transition-colors duration-200 ${open ? 'text-violet-300' : 'text-white'}`}>
            {pregunta}
          </span>
        </span>
        <span className={`flex-shrink-0 h-7 w-7 rounded-full flex items-center justify-center transition-all duration-200 ${
          open ? 'bg-violet-600 rotate-45' : 'bg-white/10'
        }`}>
          <svg className={`h-3.5 w-3.5 transition-colors ${open ? 'text-white' : 'text-gray-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
        </span>
      </button>

      <div className={`transition-all duration-300 overflow-hidden ${open ? 'max-h-60 pb-5' : 'max-h-0'}`}>
        <p className="px-6 pl-14 text-gray-400 leading-relaxed text-sm">{respuesta}</p>
      </div>
    </div>
  );
}

export default function FAQSection() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const { lang } = useSite();
  const t = translations[lang].faq;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="faq" className="w-full bg-[#0a0a0f] py-24 px-4 relative overflow-hidden">
      {/* Decoración de fondo */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] rounded-full bg-violet-900/10 blur-[100px] pointer-events-none" />

      <div className="mx-auto max-w-3xl relative z-10" ref={ref}>

        {/* Cabecera */}
        <div className={`mb-12 text-center transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="text-sm font-semibold uppercase tracking-widest text-violet-400 mb-3">
            {t.eyebrow}
          </p>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-blue-400">
              {t.headline}
            </span>
          </h2>
          <p className="text-gray-400 text-lg leading-relaxed">
            {t.sub}
          </p>
        </div>

        {/* Acordeón */}
        <div className={`space-y-3 transition-all duration-700 delay-200 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          {t.items.map((faq, i) => (
            <FAQItem key={i} pregunta={faq.pregunta} respuesta={faq.respuesta} index={i} />
          ))}
        </div>

        {/* Footer del FAQ */}
        <div className={`mt-10 text-center transition-all duration-700 delay-500 ${visible ? 'opacity-100' : 'opacity-0'}`}>
          <p className="text-gray-500 text-sm">
            {t.footerText}{' '}
            <a href="/#contacto" className="text-violet-400 font-semibold hover:text-violet-300 transition-colors">
              {t.footerLinkText}
            </a>
          </p>
        </div>

      </div>
    </section>
  );
}
