'use client'

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Search, Github, Linkedin } from 'lucide-react';
import { cn } from "@/lib/utils";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!hasMounted) {
    return <header className="sticky top-0 z-50 w-full bg-white text-black h-[72px] border-b border-gray-200"></header>;
  }

  return (
    <header className={cn(
      "sticky top-0 z-50 w-full transition-shadow duration-300 bg-white text-black",
      scrolled ? "shadow-md" : ""
    )}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          
          <Link href="/" className="text-xl font-bold text-violet-600">
            MariaSierraDev
          </Link>

          {/* Menú de Navegación (Centrado) */}
          <nav className="hidden md:flex flex-grow justify-center">
            <ul className="flex items-center space-x-8">
              <li><Link href="/#inicio" className="text-gray-700 hover:text-violet-600 transition-colors">Inicio</Link></li>
              <li><Link href="/#proyectos" className="text-gray-700 hover:text-violet-600 transition-colors">Proyectos</Link></li>
              <li><Link href="/#sobre-mi" className="text-gray-700 hover:text-violet-600 transition-colors">Sobre Mí</Link></li>
            </ul>
          </nav>

          {/* Iconos, Búsqueda y Contacto (Derecha) */}
          <div className="hidden md:flex items-center space-x-5">
            <a href="https://github.com/SierraMa1" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-violet-600 transition-colors"><Github size={22} /></a>
            <a href="https://www.linkedin.com/in/Mar%C3%ADaSierraS%C3%A1nchez/" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-violet-600 transition-colors"><Linkedin size={22} /></a>
            
            <div className="relative">
              <input type="text" placeholder="Buscar..." className="w-32 rounded-full border border-gray-300 bg-gray-100 py-1.5 pl-4 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500" />
              <Search size={18} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>

            <Link href="/#contacto" className="rounded-md border border-gray-800 px-4 py-1.5 text-sm font-semibold text-gray-800 transition-colors hover:bg-gray-800 hover:text-white">
              Contacto
            </Link>
          </div>
          
          {/* Botón del menú móvil */}
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden text-black" aria-label="Toggle menu">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Menú desplegable para móvil */}
      {isMenuOpen && (
        <nav className="md:hidden bg-white p-4">
          <ul className="flex flex-col space-y-4">
            <li><Link href="/#inicio" onClick={() => setIsMenuOpen(false)} className="hover:text-violet-600">Inicio</Link></li>
            <li><Link href="/#proyectos" onClick={() => setIsMenuOpen(false)} className="hover:text-violet-600">Proyectos</Link></li>
            <li><Link href="/#sobre-mi" onClick={() => setIsMenuOpen(false)} className="hover:text-violet-600">Sobre Mí</Link></li>
            <li><Link href="/#contacto" onClick={() => setIsMenuOpen(false)} className="hover:text-violet-600">Contacto</Link></li>
          </ul>
        </nav>
      )}
    </header>
  );
}