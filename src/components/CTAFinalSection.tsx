'use client';

import { useEffect, useRef, useState } from 'react';
import { useSite } from '@/context/SiteContext';
import { translations } from '@/i18n/translations';

export default function CTAFinalSection() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const { lang } = useSite();
  const t = translations[lang].contacto;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const serviceValues = ['formacion', 'consultoria', 'automatizacion', 'software', 'orientacion'];

  return (
    <section
      id="contacto"
      className="w-full relative overflow-hidden py-28 px-4"
      style={{ background: 'linear-gradient(160deg, #0d0016 0%, #180a2e 50%, #0a0a1a 100%)' }}
    >
      {/* Halo central */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_60%,_rgba(108,63,197,0.12)_0%,_transparent_100%)] pointer-events-none" />
      {/* Línea superior */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500/30 to-transparent" />

      <div className="mx-auto max-w-4xl relative z-10" ref={ref}>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* Columna izquierda — texto + CTA */}
          <div className={`transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>

            <p className="text-sm font-semibold uppercase tracking-widest text-violet-400 mb-4">{t.eyebrow}</p>

            <h2 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight">
              {t.headline}{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-blue-400">
                {t.headlineAccent}
              </span>
              {' '}{t.headlineSuffix}
            </h2>

            <p className="text-gray-400 text-lg leading-relaxed mb-8">
              {t.sub}
            </p>

            {/* CTA principal */}
            <a
              href="mailto:mariasierrasanchez1990@gmail.com?subject=Quiero%20saber%20m%C3%A1s%20sobre%20tus%20servicios"
              className="inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-violet-600 to-violet-500 px-8 py-4 text-base font-bold text-white shadow-xl shadow-violet-500/20 hover:shadow-violet-500/40 hover:-translate-y-0.5 transition-all duration-200 mb-4"
            >
              <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              {t.ctaLabel}
            </a>

            <p className="text-gray-600 text-xs mb-10">{t.ctaNote}</p>

            {/* Pillars */}
            <div className="space-y-4 border-t border-white/8 pt-8">
              {t.pillars.map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="flex-shrink-0 mt-0.5 w-5 h-5 rounded-full bg-violet-500/20 flex items-center justify-center">
                    <svg className="w-2.5 h-2.5 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-white text-sm font-semibold">{item.label}</p>
                    <p className="text-gray-500 text-xs leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Redes */}
            <div className="mt-8 flex items-center gap-5">
              <a href="https://www.youtube.com/@TecnologiaFacilConMaria" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-600 text-xs hover:text-red-400 transition-colors">
                <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current flex-shrink-0">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
                YouTube
              </a>
              <span className="text-gray-700 text-xs">·</span>
              <a href="https://www.linkedin.com/in/mariasierrasanchez" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-600 text-xs hover:text-blue-400 transition-colors">
                <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current flex-shrink-0">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                LinkedIn
              </a>
              <span className="text-gray-700 text-xs">·</span>
              <a href="https://github.com/SierraMa1" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-600 text-xs hover:text-white transition-colors">
                <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current flex-shrink-0">
                  <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                </svg>
                GitHub
              </a>
            </div>
          </div>

          {/* Columna derecha — formulario */}
          <div className={`transition-all duration-700 delay-200 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="rounded-2xl border border-white/8 bg-white/[0.04] backdrop-blur-sm p-8">
              <h3 className="text-white font-bold text-lg mb-1">{t.formTitle}</h3>
              <p className="text-gray-500 text-sm mb-6">{t.formSub}</p>

              <form action="https://formspree.io/f/xpwzqvgj" method="POST" className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-400 mb-1.5">{t.formName}</label>
                    <input type="text" name="nombre" placeholder={t.formNamePH} required
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-gray-600 text-sm focus:border-violet-500/60 focus:outline-none focus:ring-1 focus:ring-violet-500/30 transition-colors" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-400 mb-1.5">{t.formEmail}</label>
                    <input type="email" name="email" placeholder="tu@email.com" required
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-gray-600 text-sm focus:border-violet-500/60 focus:outline-none focus:ring-1 focus:ring-violet-500/30 transition-colors" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1.5">{t.formService}</label>
                  <select name="servicio" defaultValue=""
                    className="w-full rounded-xl border border-white/10 bg-[#1a0a2e] px-4 py-3 text-gray-300 text-sm focus:border-violet-500/60 focus:outline-none focus:ring-1 focus:ring-violet-500/30 transition-colors appearance-none cursor-pointer">
                    <option value="" disabled>{t.formServicePH}</option>
                    {t.services.map((s, i) => (
                      <option key={i} value={serviceValues[i]}>{s}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1.5">
                    {t.formMsg} <span className="text-gray-600">{t.formMsgOpt}</span>
                  </label>
                  <textarea name="mensaje" rows={3} placeholder={t.formMsgPH}
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-gray-600 text-sm focus:border-violet-500/60 focus:outline-none focus:ring-1 focus:ring-violet-500/30 transition-colors resize-none" />
                </div>

                <button type="submit"
                  className="w-full rounded-xl bg-violet-600 py-3.5 text-sm font-bold text-white hover:bg-violet-500 hover:-translate-y-0.5 transition-all duration-200 shadow-lg shadow-violet-500/20">
                  {t.formSubmit}
                </button>
              </form>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
