'use client';

/**
 * SiteContext — gestiona el idioma y el tema de la web.
 *
 * CONCEPTOS QUE APRENDERÁS AQUÍ:
 * ────────────────────────────────
 * 1. React Context: una forma de pasar datos (estado global) a cualquier
 *    componente de la app sin tener que "perforar" props por todos los niveles.
 *    Piensa en él como una "tienda de datos compartida".
 *
 * 2. createContext: crea el contenedor vacío del contexto con valores por defecto.
 *
 * 3. Provider: el componente que envuelve la app y "inyecta" el estado
 *    a todos sus hijos. Cualquier componente dentro del Provider puede
 *    leer ese estado con useContext.
 *
 * 4. useEffect: ejecuta código después de que React pinta el componente.
 *    Lo usamos para leer localStorage (persistencia) y para actualizar
 *    el atributo data-theme del HTML (que activa los estilos CSS).
 *
 * 5. localStorage: almacenamiento del navegador. Persiste entre sesiones.
 *    Aquí guardamos las preferencias del usuario (idioma y tema).
 */

import { createContext, useContext, useEffect, useState } from 'react';

// ── Tipos ────────────────────────────────────────────────────────────────────
export type Lang  = 'es' | 'en';
export type Theme = 'auto' | 'dark' | 'light';

interface SiteContextType {
  lang:     Lang;
  setLang:  (l: Lang)  => void;
  theme:    Theme;
  setTheme: (t: Theme) => void;
}

// ── Contexto con valores por defecto ─────────────────────────────────────────
const SiteContext = createContext<SiteContextType>({
  lang:     'es',
  setLang:  () => {},
  theme:    'auto',
  setTheme: () => {},
});

// ── Provider (envuelve la app en layout.tsx) ──────────────────────────────────
export function SiteProvider({ children }: { children: React.ReactNode }) {
  const [lang,  setLangState]  = useState<Lang>('es');
  const [theme, setThemeState] = useState<Theme>('auto');

  // Leer preferencias guardadas del navegador al montar
  useEffect(() => {
    const savedLang  = localStorage.getItem('site-lang')  as Lang  | null;
    const savedTheme = localStorage.getItem('site-theme') as Theme | null;
    if (savedLang  && ['es', 'en'].includes(savedLang))              setLangState(savedLang);
    if (savedTheme && ['auto', 'dark', 'light'].includes(savedTheme)) setThemeState(savedTheme);
  }, []);

  // Aplicar data-theme al <html> para que los estilos CSS lo detecten
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'auto') {
      root.removeAttribute('data-theme');
    } else {
      root.setAttribute('data-theme', theme);
    }
  }, [theme]);

  // Aplicar lang al <html> para accesibilidad y SEO
  useEffect(() => {
    document.documentElement.lang = lang === 'es' ? 'es' : 'en';
  }, [lang]);

  const setLang = (l: Lang) => {
    setLangState(l);
    localStorage.setItem('site-lang', l);
  };

  const setTheme = (t: Theme) => {
    setThemeState(t);
    localStorage.setItem('site-theme', t);
  };

  return (
    <SiteContext.Provider value={{ lang, setLang, theme, setTheme }}>
      {children}
    </SiteContext.Provider>
  );
}

// ── Hook de acceso rápido ─────────────────────────────────────────────────────
// Cualquier componente puede hacer: const { lang, theme, setLang, setTheme } = useSite();
export const useSite = () => useContext(SiteContext);
