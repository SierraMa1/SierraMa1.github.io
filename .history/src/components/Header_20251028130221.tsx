'use client'

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Search, Github, Linkedin } from 'lucide-react';
import { cn } from "@/lib/utils"; 

// 1. DEFINICIÓN DE LA INTERFAZ (EL TIPO)
interface NavItemType {
  href: string;
  label: string;
  isPrimary?: boolean; // Propiedad opcional para destacar
}

// Lista centralizada de enlaces de navegación (escritorio y móvil)
const navItems: NavItemType[] = [
  { href: "/#sobre-mi", label: "Sobre Mí" },
  { href: "/#proyectos", label: "Proyectos" },
  { href: "/#habilidades", label: "Habilidades" },
  { href: "/#playground", label: "Playground" },
  { href: "/#blog", label: "Blog" },
];

// Definimos el nuevo elemento con el tipo correcto
const roadmapItem: NavItemType = { 
    href: "/#recursos", 
    label: "Encuentra tu Roadmap", 
    isPrimary: true 
}; 
const updatedNavItems = [roadmapItem, ...navItems]; 

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);
  
  // Lógica de búsqueda
  const [searchTerm, setSearchTerm] = useState('');

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

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      window.location.href = `/?search=${encodeURIComponent(searchTerm.trim())}`;
    } else {
        window.location.href = `/`;
    }
    setIsMenuOpen(false); 
  };

  if (!hasMounted) {
    return <header className="sticky top-0 z-50 w-full bg-white text-black h-[72px] border-b border-gray-200"></header>;
  }

  // Clases base para los enlaces de navegación, aplicando el efecto al HOVER
  const baseNavLinkClasses = "text-gray-700 transition-colors duration-200 hover:text-violet-600 hover:font-bold hover:border-b-2 hover:border-violet-600 pb-1";
  // Clases para el enlace de inicio (si tiene un estilo ligeramente diferente)
  const homeLinkClasses = "text-gray-700 transition-colors duration-200 hover:text-violet-600 hover:font-bold hover:border-b-2 hover:border-violet-600 pb-1";


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

          {/* Menú de Navegación (Centrado - Escritorio) */}
          <nav className="hidden md:flex flex-grow justify-center">
            <ul className="flex items-center space-x-8">
              <li><Link href="/" className={homeLinkClasses}>Inicio</Link></li>
              {updatedNavItems.map((item) => (
                  <li key={item.href}>
                      <Link 
                          href={item.href} 
                          className={baseNavLinkClasses} // Aplicamos las clases base
                      >
                          {item.label}
                      </Link>
                  </li>
              ))}
            </ul>
          </nav>

          {/* Iconos, Búsqueda y Contacto (Derecha) */}
          <div className="hidden md:flex items-center space-x-5">
            <a href="https://github.com/SierraMa1" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-violet-600 transition-colors"><Github size={22} /></a>
            <a href="https://www.linkedin.com/in/Mar%C3%ADaSierraS%C3%A1nchez/" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-violet-600 transition-colors"><Linkedin size={22} /></a>
            
            <form onSubmit={handleSearch} className="relative">
              <input 
                type="text" 
                placeholder="Buscar..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-32 rounded-full border border-gray-300 bg-gray-100 py-1.5 pl-4 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500" 
              />
              <button type="submit" className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-violet-600 transition-colors" aria-label="Buscar">
                <Search size={18} />
              </button>
            </form>

            <Link href="/#contacto" className="rounded-md border border-gray-800 px-4 py-1.5 text-sm font-semibold text-gray-800 transition-colors hover:bg-gray-800 hover:text-white">
              Contacto
            </Link>
          </div>
          
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden text-black" aria-label="Toggle menu">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Menú desplegable para móvil */}
      {isMenuOpen && (
        <nav className="md:hidden bg-white p-4">
          <ul className="flex flex-col space-y-4">
            <li><Link href="/" onClick={() => setIsMenuOpen(false)} className="hover:text-violet-600">Inicio</Link></li>
             {updatedNavItems.map((item) => (
                  <li key={item.href}>
                      <Link 
                          href={item.href} 
                          onClick={() => setIsMenuOpen(false)}
                          // Clases para el menú móvil, sin subrayado permanente
                          className="text-gray-700 hover:text-violet-600 hover:font-bold transition-colors" 
                      >
                          {item.label}
                      </Link>
                  </li>
              ))}
            <li><Link href="/#contacto" onClick={() => setIsMenuOpen(false)} className="hover:text-violet-600">Contacto</Link></li>
          </ul>
        </nav>
      )}
    </header>
  );
}