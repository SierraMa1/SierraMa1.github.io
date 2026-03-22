'use client';

import Link from 'next/link';
import { useSite } from '@/context/SiteContext';
import { translations } from '@/i18n/translations';

const resourceLinks = [
  { link: '/recursos/clinicas', accent: 'border-blue-500',    numColor: 'text-blue-500'    },
  { link: '/recursos/agricultura', accent: 'border-emerald-500', numColor: 'text-emerald-500' },
  { link: '/recursos/tech',     accent: 'border-violet-500',  numColor: 'text-violet-500'  },
  { link: '/recursos/general',  accent: 'border-amber-400',   numColor: 'text-amber-500'   },
];

export default function ResourceHubSection() {
  const { lang } = useSite();
  const t = translations[lang].recursos;

  const ctaLabel = lang === 'es' ? 'Ver checklist y auditoría gratuita' : 'View free checklist & audit';

  return (
    <section id="recursos" className="w-full bg-white py-24 px-4">
      <div className="mx-auto max-w-6xl">

        {/* Cabecera */}
        <div className="mb-16 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-violet-600 mb-3">
            {t.eyebrow}
          </p>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-500 to-blue-500">
              {t.headline}
            </span>
          </h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto leading-relaxed">
            {t.sub}
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {t.items.map((r, idx) => {
            const style = resourceLinks[idx];
            return (
              <Link
                key={r.num}
                href={style.link}
                className={`group relative rounded-2xl border-l-4 border-gray-100 bg-gray-50 p-8 transition-all duration-200 hover:bg-white hover:shadow-lg hover:-translate-y-0.5 ${style.accent}`}
              >
                {/* Número */}
                <p className={`text-xs font-bold tracking-widest mb-3 ${style.numColor}`}>{r.num}</p>

                {/* Tag sector */}
                <span className="inline-block rounded-full border border-gray-200 bg-white px-3 py-0.5 text-xs font-medium text-gray-500 mb-4">
                  {r.tag}
                </span>

                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-gray-800 transition-colors">
                  {r.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-5">
                  {r.subtitle}
                </p>

                <span className="inline-flex items-center gap-2 text-sm font-semibold text-gray-700 group-hover:text-violet-600 transition-colors">
                  {ctaLabel}
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </Link>
            );
          })}
        </div>

      </div>
    </section>
  );
}
