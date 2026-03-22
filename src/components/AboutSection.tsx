'use client';

import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { useSite } from '@/context/SiteContext';
import { translations } from '@/i18n/translations';
import { aboutSectionContent, timeAgoFromDate } from '@/i18n/aboutSectionContent';
import { Star, GitFork, GitCommit } from 'lucide-react';

interface Repo {
  id: number;
  name: string;
  html_url: string;
  description: string;
  pushed_at: string;
  stargazers_count: number;
  forks_count: number;
}

export default function AboutSection() {
  const { lang } = useSite();
  const t = translations[lang].sobreMi;
  const c = aboutSectionContent[lang];

  const [latestRepo, setLatestRepo] = useState<Repo | null>(null);
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(false);
  const [mostrarTodaExp, setMostrarTodaExp] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.05 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    async function fetchLatestRepo() {
      try {
        const response = await fetch('https://api.github.com/users/SierraMa1/repos?sort=pushed&per_page=1');
        if (!response.ok) throw new Error('GitHub API error');
        const data: Repo[] = await response.json();
        if (data.length > 0) setLatestRepo(data[0]);
      } catch (error) {
        console.error('Error cargando datos de GitHub:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchLatestRepo();
  }, []);

  const expVisible = mostrarTodaExp ? c.experiencia : c.experiencia.slice(0, 5);

  return (
    <section id="sobre-mi" className="w-full bg-white py-24 px-4">
      <div className="mx-auto max-w-6xl" ref={ref}>

        {/* ── Cabecera ── */}
        <div className={`mb-16 text-center transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="text-sm font-semibold uppercase tracking-widest text-violet-600 mb-3">{t.eyebrow}</p>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-500 to-blue-500">
              {t.headline}
            </span>
          </h2>
          <p className="text-gray-500 text-lg leading-relaxed max-w-2xl mx-auto">
            {t.sub}
          </p>
        </div>

        {/* ── Foto + intro + stats ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-start mb-20">

          {/* Foto */}
          <div className={`flex flex-col items-center gap-6 transition-all duration-700 ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
            <div className="relative w-72 h-72 md:w-80 md:h-80 rounded-2xl overflow-hidden shadow-2xl shadow-violet-500/10 border border-gray-100">
              <Image
                src="/traje.jpeg"
                alt={c.photoAlt}
                fill
                sizes="(max-width: 768px) 18rem, 20rem"
                className="object-cover object-top"
              />
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-sm rounded-full px-4 py-1.5 shadow-lg border border-gray-100">
                <p className="text-xs font-bold text-gray-800 whitespace-nowrap">{c.photoBadge}</p>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-3 w-full max-w-sm">
              {c.stats.map((s, i) => (
                <div
                  key={i}
                  className="rounded-xl border border-gray-100 bg-gray-50 p-4 text-center"
                  style={{ opacity: visible ? 1 : 0, transition: `opacity 0.6s ${i * 100 + 300}ms` }}
                >
                  <p className="text-lg font-black text-gray-900">{s.valor}</p>
                  <p className="text-xs text-gray-500 leading-tight mt-0.5">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Texto + GitHub */}
          <div className={`transition-all duration-700 delay-200 ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
            <p className="text-violet-600 font-semibold text-lg mb-2">{c.introSubtitle}</p>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">{c.introTitle}</h3>

            <div className="space-y-4 text-gray-600 leading-relaxed mb-8">
              <p>{c.introP1}</p>
              <p>{c.introP2}</p>
              <p>{c.introP3}</p>
              <p>{c.introP4}</p>
              <p>{c.introP5}</p>
              <p className="font-semibold text-gray-800 italic border-l-4 border-violet-400 pl-4 whitespace-pre-line">
                &ldquo;{c.introQuote}&rdquo;
              </p>
            </div>

            {/* GitHub widget */}
            <div className="rounded-xl border border-gray-200 bg-gray-50 p-5 mb-6">
              <h4 className="mb-3 text-sm font-semibold text-gray-800 flex items-center gap-2">
                <GitCommit size={16} className="text-violet-600" />
                {c.githubActivityTitle}
              </h4>
              {loading && <div className="h-16 animate-pulse rounded-lg bg-gray-200" />}
              {!loading && latestRepo && (
                <div>
                  <a href={latestRepo.html_url} target="_blank" rel="noopener noreferrer"
                    className="font-bold text-gray-900 hover:text-violet-700 transition-colors text-sm">
                    {latestRepo.name}
                  </a>
                  <p className="text-xs text-gray-500 mb-2 truncate mt-0.5">
                    {latestRepo.description || <span className="italic">{c.githubNoDescription}</span>}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span>
                      {c.githubLastPushPrefix} {timeAgoFromDate(latestRepo.pushed_at, lang)}
                    </span>
                    <span className="flex items-center gap-1"><Star size={12} /> {latestRepo.stargazers_count}</span>
                    <span className="flex items-center gap-1"><GitFork size={12} /> {latestRepo.forks_count}</span>
                  </div>
                </div>
              )}
              {!loading && !latestRepo && (
                <p className="text-xs text-gray-500">{c.githubLoadError}</p>
              )}
            </div>

            <a
              href="/#contacto"
              className="inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-violet-600 to-violet-500 px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 hover:-translate-y-0.5 transition-all duration-200"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              {c.ctaContact}
            </a>
          </div>
        </div>

        {/* ── Stack tecnológico por categorías ── */}
        <div className={`mb-20 transition-all duration-700 delay-200 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="text-sm font-semibold uppercase tracking-widest text-violet-600 mb-3 text-center">{c.stackEyebrow}</p>
          <h3 className="text-3xl font-bold text-gray-900 mb-10 text-center">{t.stackTitle}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {c.stackCategorias.map((cat, i) => (
              <div
                key={i}
                className="rounded-xl border border-gray-100 bg-gray-50 p-6"
                style={{ opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(12px)', transition: `opacity 0.6s ${i * 100 + 300}ms, transform 0.6s ${i * 100 + 300}ms` }}
              >
                <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">{cat.categoria}</p>
                <div className="flex flex-wrap gap-2">
                  {cat.herramientas.map((tag) => (
                    tag.startsWith('+')
                      ? <span key={tag} className="rounded-full border border-dashed border-gray-300 px-3 py-1 text-xs font-medium text-gray-400 italic">{tag}</span>
                      : <span key={tag} className={`rounded-full border px-3 py-1 text-xs font-medium ${cat.color}`}>{tag}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Lo que combino ── */}
        <div className={`mb-20 transition-all duration-700 delay-300 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="text-sm font-semibold uppercase tracking-widest text-violet-600 mb-3 text-center">{c.combineEyebrow}</p>
          <h3 className="text-3xl font-bold text-gray-900 mb-10 text-center">{t.loQueCombino}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {c.loQueCombino.map((item, i) => (
              <div
                key={i}
                className="rounded-xl border border-gray-100 bg-gray-50 p-6 hover:border-violet-200 hover:bg-violet-50/30 transition-all duration-200 group"
                style={{ opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(16px)', transition: `opacity 0.6s ${i * 80 + 400}ms, transform 0.6s ${i * 80 + 400}ms` }}
              >
                <p className="text-xs font-bold text-violet-400 mb-3 tracking-widest">{item.num}</p>
                <p className="font-bold text-gray-900 text-sm mb-2 group-hover:text-violet-700 transition-colors">{item.titulo}</p>
                <p className="text-gray-500 text-xs leading-relaxed">{item.texto}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Trayectoria profesional ── */}
        <div className={`mb-20 transition-all duration-700 delay-400 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="text-sm font-semibold uppercase tracking-widest text-violet-600 mb-3 text-center">{c.expEyebrow}</p>
          <h3 className="text-3xl font-bold text-gray-900 mb-10 text-center">{c.timelineTitle}</h3>

          <div className="relative">
            {/* Línea vertical */}
            <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-gradient-to-b from-violet-200 via-blue-200 to-teal-200 hidden sm:block" />

            <div className="space-y-6">
              {expVisible.map((exp, i) => (
                <div
                  key={i}
                  className="relative sm:pl-16"
                  style={{ opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateX(-16px)', transition: `opacity 0.6s ${i * 100 + 500}ms, transform 0.6s ${i * 100 + 500}ms` }}
                >
                  {/* Punto en la línea */}
                  <div className={`absolute left-3 top-5 w-4 h-4 rounded-full ${exp.color} shadow-md hidden sm:block`} />

                  <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm hover:shadow-md hover:border-gray-200 transition-all duration-200">
                    <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <p className="font-bold text-gray-900 text-sm">{exp.rol}</p>
                          {exp.badge && (
                            <span className="rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold px-2 py-0.5">
                              {exp.badge}
                            </span>
                          )}
                        </div>
                        <p className={`text-sm font-semibold ${exp.textColor}`}>{exp.empresa}</p>
                      </div>
                      <span className="text-xs font-medium text-gray-400 bg-gray-50 border border-gray-100 rounded-full px-3 py-1 whitespace-nowrap">
                        {exp.periodo}
                      </span>
                    </div>
                    <p className="text-gray-500 text-xs leading-relaxed">{exp.descripcion}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Botón ver más / menos */}
            {c.experiencia.length > 5 && (
              <div className="mt-6 text-center">
                <button
                  type="button"
                  onClick={() => setMostrarTodaExp(!mostrarTodaExp)}
                  className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-6 py-2.5 text-sm font-semibold text-gray-600 hover:border-violet-300 hover:text-violet-700 transition-all duration-200 shadow-sm"
                >
                  {mostrarTodaExp ? (
                    <>
                      {c.mostrarMenos} <span>↑</span>
                    </>
                  ) : (
                    <>
                      {c.verTrayectoriaCompleta} <span>↓</span>
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* ── Formación & Certificaciones ── */}
        <div className={`transition-all duration-700 delay-500 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="text-sm font-semibold uppercase tracking-widest text-violet-600 mb-3 text-center">{t.formacionEyebrow}</p>
          <h3 className="text-3xl font-bold mb-8 text-center">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-500 to-blue-500">
              {t.formacionHeadline}
            </span>
          </h3>

          {/* Pills interactivas */}
          <div className="flex flex-wrap gap-3 justify-center max-w-3xl mx-auto mb-6">
            {c.certificaciones.map((cert, i) => (
              <div
                key={i}
                className="group relative cursor-default px-4 py-2.5 rounded-full border border-violet-200/60 bg-white
                           hover:border-violet-400 hover:shadow-lg hover:shadow-violet-500/20
                           hover:-translate-y-0.5 transition-all duration-300"
                style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(12px)', transition: `opacity 0.5s ${i * 100 + 600}ms, transform 0.5s ${i * 100 + 600}ms, box-shadow 0.3s, border-color 0.3s` }}
              >
                {/* Gradiente de fondo en hover */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-violet-50 to-blue-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative text-sm font-medium text-gray-700 group-hover:text-violet-700 transition-colors duration-300 leading-snug">
                  {cert}
                </span>
              </div>
            ))}
          </div>

          {/* Badge especial: 42 The Network */}
          <div className="flex justify-center">
            <div
              className="inline-flex items-center gap-3 px-5 py-3 rounded-2xl border border-violet-300/50
                         bg-gradient-to-r from-violet-50 to-blue-50 hover:border-violet-400
                         hover:shadow-md hover:shadow-violet-500/15 transition-all duration-300 cursor-default"
              style={{ opacity: visible ? 1 : 0, transition: 'opacity 0.5s 1200ms' }}
            >
              <span className="flex-shrink-0 w-8 h-8 rounded-full bg-black flex items-center justify-center">
                <span className="text-white text-xs font-black">42</span>
              </span>
              <div className="text-left">
                <p className="text-xs font-bold text-violet-700 uppercase tracking-widest leading-none mb-0.5">{t.comunidadLabel}</p>
                <p className="text-sm font-medium text-gray-700">{t.comunidadText}</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
