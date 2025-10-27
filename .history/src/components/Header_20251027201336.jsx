'use client'

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Search, Github, Linkedin } from 'lucide-react';
import { cn } from "@/lib/utils";

// Definimos los enlaces de navegación con sus IDs de sección
const navItems = [
  { name: 'Inicio', href: '/#inicio' },
  { name: 'Proyectos', href: '/#proyectos' },
  { name: 'Habilidades', href: '/#habilidades' }, // Nueva sección
  { name: 'Playground', href: '/#playground' }, 
  { name: 'Blog', href: '/#blog' }, 
  { name: 'Sobre Mí', href: '/#sobre-mi' },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);
  // Estado para el término de búsqueda
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

  const handleLinkClick = () => {
    setIsMenuOpen(false); 
  };
  
  // AÑADIDO: Función que maneja la búsqueda
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      // Redirigimos a una página de resultados o forzamos la navegación
      // Aquí usamos la función nativa de JS para simular una búsqueda real
      // Redirige a la página principal con el término de búsqueda en la URL
      window.location.href = `/?search=${encodeURIComponent(searchTerm.trim())}`;
    }
  };


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
            <ul className="flex items-center space-x-6">
              {navItems.map((item) => (
                <li key={item.name}>
                  <Link 
                    href={item.href} 
                    className="text-gray-700 hover:text-violet-600 transition-colors text-sm font-medium"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Iconos, Búsqueda y Contacto (Derecha) */}
          <div className="hidden md:flex items-center space-x-5">
            <a href="https://github.com/SierraMa1" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-violet-600 transition-colors" aria-label="GitHub"><Github size={22} /></a>
            <a href="https://www.linkedin.com/in/Mar%C3%ADaSierraS%C3%A1nchez/" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-violet-600 transition-colors" aria-label="LinkedIn"><Linkedin size={22} /></a>
            
            <form onSubmit={handleSearch} className="relative">
              <input 
                type="text" 
                placeholder="Buscar..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-32 rounded-full border border-gray-300 bg-gray-100 py-1.5 pl-4 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500" 
              />
              <button type="submit" className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 p-1" aria-label="Buscar">
                <Search size={18} />
              </button>
            </form>

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

      {/* Menú desplegable para móvil (Ahora usa navItems) */}
      {isMenuOpen && (
        <nav className="md:hidden bg-white p-4 shadow-lg border-t border-gray-100">
          <ul className="flex flex-col space-y-4">
            {navItems.map((item) => (
              <li key={item.name}>
                <Link href={item.href} onClick={handleLinkClick} className="hover:text-violet-600 font-medium block text-gray-800">
                  {item.name}
                </Link>
              </li>
            ))}
            <li>
                <Link href="/#contacto" onClick={handleLinkClick} className="rounded-md border border-violet-600 bg-violet-600 px-4 py-1.5 text-sm font-semibold text-white transition-colors hover:bg-violet-700 block text-center mt-2">
                    Contacto
                </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
