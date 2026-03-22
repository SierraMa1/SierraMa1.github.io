'use client';

import Link from 'next/link';
import { useSite } from '@/context/SiteContext';
import { translations } from '@/i18n/translations';

// Colores por servicio — no cambian con el idioma
const serviceStyles = [
  { accent: 'border-violet-500',  numColor: 'text-violet-500',  dotBg: 'bg-violet-500',  ctaClass: 'bg-violet-600 hover:bg-violet-700', ctaHref: '/#contacto' },
  { accent: 'border-yellow-400',  numColor: 'text-yellow-500',  dotBg: 'bg-yellow-400',  ctaClass: 'bg-yellow-500 hover:bg-yellow-600',  ctaHref: '/#contacto' },
  { accent: 'border-blue-400',    numColor: 'text-blue-500',    dotBg: 'bg-blue-400',    ctaClass: 'bg-blue-600 hover:bg-blue-700',      ctaHref: '/#contacto' },
  { accent: 'border-emerald-400', numColor: 'text-emerald-500', dotBg: 'bg-emerald-400', ctaClass: 'bg-emerald-600 hover:bg-emerald-700', ctaHref: '/#contacto' },
];

export default function Servicios() {
  const { lang } = useSite();
  const t = translations[lang].servicios;

  return (
    <section id="servicios" className="w-full bg-gray-50 py-24 px-4">
      <div className="mx-auto max-w-6xl">

        {/* Cabecera */}
        <div className="mb-16 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-violet-600 mb-3">
            {t.eyebrow}
          </p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-5">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-500 to-blue-500">
              {t.headline}
            </span>
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto leading-relaxed">
            {t.sub}
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 gap-7 md:grid-cols-2">
          {t.items.map((s, idx) => {
            const style = serviceStyles[idx];
            return (
              <div
                key={s.num}
                className={`flex flex-col rounded-2xl border-l-4 bg-white p-8 shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 ${style.accent}`}
              >
                {/* Número + título */}
                <div className="mb-5">
                  <p className={`text-xs font-bold tracking-widest mb-2 ${style.numColor}`}>{s.num}</p>
                  <h3 className="text-xl font-bold text-gray-900 leading-snug">{s.titulo}</h3>
                </div>

                {/* Descripción */}
                <p className="mb-6 text-gray-600 leading-relaxed text-sm flex-grow">
                  {s.descripcion}
                </p>

                {/* Bullets */}
                <ul className="mb-7 space-y-2.5">
                  {s.bullets.map((b, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-gray-700">
                      <span className={`mt-1 h-1.5 w-1.5 rounded-full flex-shrink-0 ${style.dotBg}`} />
                      {b}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <div>
                  <Link
                    href={style.ctaHref}
                    className={`inline-flex items-center rounded-full px-6 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 ${style.ctaClass}`}
                  >
                    {s.ctaLabel}
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA global */}
        <div className="mt-16 text-center">
          <p className="text-gray-400 mb-4 text-sm">{t.globalCtaHelper}</p>
          <Link
            href="/#contacto"
            className="inline-flex items-center gap-2 rounded-full border-2 border-gray-900 px-8 py-3 text-sm font-bold text-gray-900 transition-all duration-200 hover:bg-gray-900 hover:text-white"
          >
            {t.globalCtaLabel}
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>

      </div>
    </section>
  );
}
