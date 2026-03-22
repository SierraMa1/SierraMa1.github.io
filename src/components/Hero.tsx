'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useSite } from '@/context/SiteContext';
import { translations } from '@/i18n/translations';

type SlideConfig = {
  accentBorder: string;
  accentText: string;
  accentBg: string;
  accentDot: string;
  primaryHref: string;
  primaryIsExternal: boolean;
  secondaryHref: string;
};

const slideConfig: SlideConfig[] = [
  {
    accentBorder: 'border-yellow-400',
    accentText: 'text-yellow-400',
    accentBg: 'bg-yellow-400',
    accentDot: 'bg-yellow-400',
    primaryHref: 'https://www.youtube.com/@TecnologiaFacilConMaria',
    primaryIsExternal: true,
    secondaryHref: '/#sobre-mi',
  },
  {
    accentBorder: 'border-emerald-400',
    accentText: 'text-emerald-400',
    accentBg: 'bg-emerald-400',
    accentDot: 'bg-emerald-400',
    primaryHref: '/#servicios',
    primaryIsExternal: false,
    secondaryHref: '/#proyectos',
  },
  {
    accentBorder: 'border-blue-400',
    accentText: 'text-blue-400',
    accentBg: 'bg-blue-400',
    accentDot: 'bg-blue-400',
    primaryHref: '/#proyectos',
    primaryIsExternal: false,
    secondaryHref: '/#contacto',
  },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [visible, setVisible] = useState(true);
  const [animating, setAnimating] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const { lang } = useSite();
  const t = translations[lang].hero;

  const goTo = (index: number) => {
    if (animating || index === current) return;
    setAnimating(true);
    setVisible(false);
    setTimeout(() => {
      setCurrent(index);
      setVisible(true);
      setAnimating(false);
    }, 350);
  };

  const next = () => goTo((current + 1) % slideConfig.length);
  const prev = () => goTo((current - 1 + slideConfig.length) % slideConfig.length);

  useEffect(() => {
    timerRef.current = setInterval(next, 6000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- reiniciar timer al cambiar slide; `next` usa `current`
  }, [current]);

  const cfg = slideConfig[current];
  const slide = t.slides[current];

  return (
    <section id="inicio" className="relative h-screen min-h-[600px] w-full overflow-hidden bg-[#0a0a0f]">
      <div className="absolute inset-0 z-0">
        <video autoPlay loop muted playsInline className="h-full w-full object-cover opacity-75 blur-[2px] scale-105">
          <source src="/background-video1.mp4" type="video/mp4" />
        </video>
      </div>

      <div className="absolute inset-0 z-[1] bg-black/45" />

      <a
        href="https://www.youtube.com/@TecnologiaFacilConMaria"
        target="_blank"
        rel="noopener noreferrer"
        className="absolute right-6 top-6 z-20 flex items-center gap-3 rounded border border-white/10 bg-white/5 px-4 py-2.5 no-underline backdrop-blur-md transition-all duration-200 hover:-translate-y-0.5 hover:bg-white/10"
        aria-label="Canal de YouTube: Tecnología fácil con María"
      >
        <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded bg-red-600">
          <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-white" xmlns="http://www.w3.org/2000/svg">
            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
          </svg>
        </div>
        <div className="flex flex-col">
          <span className="text-[0.6rem] uppercase tracking-widest text-white/50">{t.channelLabel}</span>
          <span className="whitespace-nowrap text-[0.82rem] font-medium text-white">{t.channelName}</span>
        </div>
      </a>

      <button
        type="button"
        onClick={prev}
        aria-label={t.prevAriaLabel}
        className="absolute left-4 top-1/2 z-20 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full border border-white/30 bg-black/20 text-white/80 backdrop-blur-sm transition-all duration-200 hover:border-white/70 hover:bg-black/40 hover:text-white md:left-6 text-xl"
      >
        ‹
      </button>

      <button
        type="button"
        onClick={next}
        aria-label={t.nextAriaLabel}
        className="absolute right-4 top-1/2 z-20 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full border border-white/30 bg-black/20 text-white/80 backdrop-blur-sm transition-all duration-200 hover:border-white/70 hover:bg-black/40 hover:text-white md:right-6 text-xl"
      >
        ›
      </button>

      <div className="relative z-10 flex h-full w-full flex-col items-center justify-center px-16 md:px-24 text-center">
        <div
          className={`mb-7 inline-flex w-fit items-center gap-2 rounded-sm border px-3 py-1.5 text-[0.65rem] font-medium uppercase tracking-[0.15em] transition-all duration-500 ${cfg.accentBorder} ${cfg.accentText} ${visible ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0'}`}
          style={{ transitionDelay: visible ? '80ms' : '0ms' }}
        >
          {slide.tag}
        </div>

        <h1
          className={`mb-6 max-w-4xl font-serif text-[clamp(2.4rem,6vw,5rem)] font-black leading-[1.05] text-white transition-all duration-500 ${visible ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'}`}
          style={{ transitionDelay: visible ? '180ms' : '0ms' }}
        >
          {slide.headline[0]}
          <br />
          <span className={cfg.accentText}>{slide.headline[1]}</span>
        </h1>

        <p
          className={`mb-10 max-w-2xl text-[clamp(0.95rem,1.8vw,1.1rem)] font-light leading-relaxed text-white/80 transition-all duration-500 ${visible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
          style={{ transitionDelay: visible ? '280ms' : '0ms' }}
        >
          {slide.sub}
        </p>

        <div
          className={`flex flex-wrap items-center justify-center gap-4 transition-all duration-500 ${visible ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0'}`}
          style={{ transitionDelay: visible ? '380ms' : '0ms' }}
        >
          {cfg.primaryIsExternal ? (
            <a
              href={cfg.primaryHref}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-2 rounded-full px-8 py-3 text-sm font-semibold text-[#0a0a0f] shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:brightness-110 ${cfg.accentBg}`}
            >
              {slide.primaryLabel}
            </a>
          ) : (
            <Link
              href={cfg.primaryHref}
              className={`inline-flex items-center gap-2 rounded-full px-8 py-3 text-sm font-semibold text-[#0a0a0f] shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:brightness-110 ${cfg.accentBg}`}
            >
              {slide.primaryLabel}
            </Link>
          )}

          <Link
            href={cfg.secondaryHref}
            className="inline-flex items-center gap-2 rounded-full border border-white/40 px-8 py-3 text-sm font-medium text-white transition-all duration-200 hover:-translate-y-0.5 hover:border-white hover:bg-white/10"
          >
            {slide.secondaryLabel}
          </Link>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2.5" role="tablist">
        {slideConfig.map((s, i) => (
          <button
            key={s.primaryHref}
            type="button"
            onClick={() => goTo(i)}
            role="tab"
            aria-selected={i === current}
            aria-label={`Slide ${i + 1}`}
            className={`h-1.5 cursor-pointer rounded-full border-none transition-all duration-300 ${i === current ? `w-8 ${cfg.accentDot}` : 'w-2 bg-white/40'}`}
          />
        ))}
      </div>

      <a
        href="#problema"
        aria-label="Scroll hacia abajo"
        className="absolute bottom-8 right-8 z-10 flex flex-col items-center gap-1 text-white/40 hover:text-white/70 transition-colors duration-200"
        style={{ animation: 'scrollBounce 2s ease-in-out infinite' }}
      >
        <span className="text-[0.6rem] uppercase tracking-[0.15em] font-medium">{t.scrollLabel}</span>
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </a>

      <style>{`
        @keyframes scrollBounce {
          0%, 100% { transform: translateY(0); }
          50%       { transform: translateY(6px); }
        }
      `}</style>
    </section>
  );
}
