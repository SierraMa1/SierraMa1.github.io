'use client'

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Linkedin, Youtube, Github, Sun, Moon, Monitor } from 'lucide-react';
import { cn } from "@/lib/utils";
import { SOCIAL_LINKS } from '@/constants/links';
import { useSite } from '@/context/SiteContext';
import { translations } from '@/i18n/translations';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled]     = useState(false);
  const [hasMounted, setHasMounted] = useState(false);

  const { lang, setLang, theme, setTheme } = useSite();
  const t = translations[lang];

  const navItems = [
    { href: '/#servicios',  label: t.nav.services  },
    { href: '/#sobre-mi',   label: t.nav.about      },
    { href: '/#proyectos',  label: t.nav.projects   },
    { href: '/#recursos',   label: t.nav.resources  },
  ];

  useEffect(() => { setHasMounted(true); }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!hasMounted) {
    return <header className="sticky top-0 z-50 w-full bg-white h-16 border-b border-gray-100" />;
  }

  // Colores del header según tema activo
  const isDarkHeader = theme === 'dark';
  const headerBg     = isDarkHeader ? 'bg-[#0a0a0f] border-white/10' : 'bg-white border-gray-100';
  const textColor    = isDarkHeader ? 'text-gray-200' : 'text-gray-600';
  const logoColor    = isDarkHeader ? 'text-white'    : 'text-gray-900';

  return (
    <>
      {/* Barra anuncio YouTube */}
      <div className="w-full bg-[#0a0a0f] py-2 text-center text-xs text-white/70 flex items-center justify-center gap-2 px-4">
        <span className="inline-flex h-4 w-4 items-center justify-center rounded bg-red-600 flex-shrink-0">
          <svg viewBox="0 0 24 24" className="h-2.5 w-2.5 fill-white">
            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
          </svg>
        </span>
        <span className="hidden sm:inline">{t.announcementBar}</span>
        <a
          href="https://www.youtube.com/@TecnologiaFacilConMaria"
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-yellow-400 hover:text-yellow-300 transition-colors"
        >
          {t.announcementLink}
        </a>
      </div>

      <header className={cn(
        'sticky top-0 z-50 w-full transition-all duration-300',
        headerBg,
        scrolled ? 'shadow-sm border-b' : 'border-b'
      )}>
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="flex h-16 items-center justify-between">

            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 flex-shrink-0">
              <span className={`text-base font-bold tracking-tight ${logoColor}`}>
                María Sierra
              </span>
              <span className={`hidden sm:inline-block h-4 w-px ${isDarkHeader ? 'bg-white/20' : 'bg-gray-200'}`} />
              <span className="hidden sm:inline text-xs text-violet-400 font-medium tracking-wide">
                Digital & IA
              </span>
            </Link>

            {/* Nav — escritorio */}
            <nav className="hidden md:flex items-center gap-7">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-sm font-medium hover:text-violet-500 transition-colors duration-150 ${textColor}`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Acciones derecha — escritorio */}
            <div className="hidden md:flex items-center gap-3">

              {/* ── Toggle de idioma ── */}
              <div className="flex items-center rounded-full border border-gray-200 overflow-hidden text-xs font-bold"
                   style={{ borderColor: isDarkHeader ? 'rgba(255,255,255,0.12)' : '' }}>
                <button
                  onClick={() => setLang('es')}
                  className={cn(
                    'px-2.5 py-1.5 transition-colors duration-150',
                    lang === 'es'
                      ? 'bg-violet-600 text-white'
                      : isDarkHeader ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-900'
                  )}
                  aria-label="Cambiar a español"
                >
                  ES
                </button>
                <button
                  onClick={() => setLang('en')}
                  className={cn(
                    'px-2.5 py-1.5 transition-colors duration-150',
                    lang === 'en'
                      ? 'bg-violet-600 text-white'
                      : isDarkHeader ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-900'
                  )}
                  aria-label="Switch to English"
                >
                  EN
                </button>
              </div>

              {/* ── Toggle de tema ── */}
              <div className="flex items-center rounded-full border overflow-hidden"
                   style={{ borderColor: isDarkHeader ? 'rgba(255,255,255,0.12)' : '#e5e7eb' }}>
                {/* Auto (mixto) */}
                <button
                  onClick={() => setTheme('auto')}
                  title="Automático (mixto)"
                  className={cn(
                    'flex h-7 w-7 items-center justify-center transition-colors duration-150',
                    theme === 'auto'
                      ? 'bg-violet-600 text-white'
                      : isDarkHeader ? 'text-gray-400 hover:text-white' : 'text-gray-400 hover:text-gray-700'
                  )}
                >
                  <Monitor size={13} />
                </button>
                {/* Claro */}
                <button
                  onClick={() => setTheme('light')}
                  title="Todo claro"
                  className={cn(
                    'flex h-7 w-7 items-center justify-center transition-colors duration-150',
                    theme === 'light'
                      ? 'bg-violet-600 text-white'
                      : isDarkHeader ? 'text-gray-400 hover:text-white' : 'text-gray-400 hover:text-gray-700'
                  )}
                >
                  <Sun size={13} />
                </button>
                {/* Oscuro */}
                <button
                  onClick={() => setTheme('dark')}
                  title="Todo oscuro"
                  className={cn(
                    'flex h-7 w-7 items-center justify-center transition-colors duration-150',
                    theme === 'dark'
                      ? 'bg-violet-600 text-white'
                      : isDarkHeader ? 'text-gray-400 hover:text-white' : 'text-gray-400 hover:text-gray-700'
                  )}
                >
                  <Moon size={13} />
                </button>
              </div>

              {/* Socials */}
              <a href="https://www.youtube.com/@TecnologiaFacilConMaria" target="_blank" rel="noopener noreferrer"
                className={`relative transition-colors ${isDarkHeader ? 'text-gray-400 hover:text-red-500' : 'text-gray-400 hover:text-red-600'}`} aria-label="YouTube">
                <Youtube size={20} />
                <span className="absolute -top-0.5 -right-0.5 h-1.5 w-1.5 rounded-full bg-red-500" />
              </a>
              <a href={SOCIAL_LINKS.github} target="_blank" rel="noopener noreferrer"
                className={`transition-colors ${isDarkHeader ? 'text-gray-400 hover:text-white' : 'text-gray-400 hover:text-gray-900'}`} aria-label="GitHub">
                <Github size={20} />
              </a>
              <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noopener noreferrer"
                className={`transition-colors ${isDarkHeader ? 'text-gray-400 hover:text-blue-400' : 'text-gray-400 hover:text-blue-600'}`} aria-label="LinkedIn">
                <Linkedin size={20} />
              </a>

              <Link
                href="/#contacto"
                className="rounded-full bg-violet-600 px-4 py-1.5 text-xs font-bold text-white hover:bg-violet-700 transition-colors"
              >
                {t.nav.cta}
              </Link>
            </div>

            {/* Hamburguesa — móvil */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`md:hidden p-1 ${isDarkHeader ? 'text-gray-300' : 'text-gray-600'} hover:text-violet-500`}
              aria-label="Abrir menú"
            >
              {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Menú móvil */}
        {isMenuOpen && (
          <div className={`md:hidden border-t px-4 py-5 ${isDarkHeader ? 'bg-[#0a0a0f] border-white/10' : 'bg-white border-gray-100'}`}>
            <nav className="flex flex-col gap-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`text-sm font-medium hover:text-violet-500 transition-colors ${isDarkHeader ? 'text-gray-300' : 'text-gray-700'}`}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/#contacto"
                onClick={() => setIsMenuOpen(false)}
                className={`text-sm font-medium hover:text-violet-500 transition-colors ${isDarkHeader ? 'text-gray-300' : 'text-gray-700'}`}
              >
                {t.nav.contact}
              </Link>
            </nav>

            {/* Toggles móvil */}
            <div className="mt-4 flex items-center gap-3">
              {/* Idioma */}
              <div className="flex items-center rounded-full border border-gray-200 overflow-hidden text-xs font-bold"
                   style={{ borderColor: isDarkHeader ? 'rgba(255,255,255,0.12)' : '' }}>
                <button onClick={() => setLang('es')}
                  className={cn('px-3 py-1.5 transition-colors', lang === 'es' ? 'bg-violet-600 text-white' : isDarkHeader ? 'text-gray-400' : 'text-gray-500')}>
                  ES
                </button>
                <button onClick={() => setLang('en')}
                  className={cn('px-3 py-1.5 transition-colors', lang === 'en' ? 'bg-violet-600 text-white' : isDarkHeader ? 'text-gray-400' : 'text-gray-500')}>
                  EN
                </button>
              </div>

              {/* Tema */}
              <div className="flex items-center rounded-full border overflow-hidden"
                   style={{ borderColor: isDarkHeader ? 'rgba(255,255,255,0.12)' : '#e5e7eb' }}>
                <button onClick={() => setTheme('auto')} title="Auto"
                  className={cn('flex h-8 w-8 items-center justify-center transition-colors', theme === 'auto' ? 'bg-violet-600 text-white' : isDarkHeader ? 'text-gray-400' : 'text-gray-400')}>
                  <Monitor size={14} />
                </button>
                <button onClick={() => setTheme('light')} title="Claro"
                  className={cn('flex h-8 w-8 items-center justify-center transition-colors', theme === 'light' ? 'bg-violet-600 text-white' : isDarkHeader ? 'text-gray-400' : 'text-gray-400')}>
                  <Sun size={14} />
                </button>
                <button onClick={() => setTheme('dark')} title="Oscuro"
                  className={cn('flex h-8 w-8 items-center justify-center transition-colors', theme === 'dark' ? 'bg-violet-600 text-white' : isDarkHeader ? 'text-gray-400' : 'text-gray-400')}>
                  <Moon size={14} />
                </button>
              </div>
            </div>

            <div className={`mt-5 flex items-center gap-4 pt-4 border-t ${isDarkHeader ? 'border-white/10' : 'border-gray-100'}`}>
              <a href={SOCIAL_LINKS.github} target="_blank" rel="noopener noreferrer"
                className={`transition-colors ${isDarkHeader ? 'text-gray-400 hover:text-white' : 'text-gray-400 hover:text-gray-900'}`} aria-label="GitHub">
                <Github size={20} />
              </a>
              <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noopener noreferrer"
                className={`transition-colors ${isDarkHeader ? 'text-gray-400 hover:text-blue-400' : 'text-gray-400 hover:text-blue-600'}`} aria-label="LinkedIn">
                <Linkedin size={20} />
              </a>
              <a
                href="https://www.youtube.com/@TecnologiaFacilConMaria"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMenuOpen(false)}
                className="ml-auto inline-flex items-center gap-2 rounded-full bg-red-600 px-4 py-1.5 text-xs font-bold text-white hover:bg-red-700 transition-colors"
              >
                <Youtube size={14} />
                {lang === 'es' ? 'Canal YouTube' : 'YouTube Channel'}
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
