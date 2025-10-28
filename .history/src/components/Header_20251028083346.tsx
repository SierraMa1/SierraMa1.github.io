'use client'

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Search, Github, Linkedin } from 'lucide-react';
import { cn } from "@/lib/utils";

// Lista centralizada de enlaces de navegación (escritorio y móvil)
const navItems = [
  { href: "/#sobre-mi", label: "Sobre Mí" },
  { href: "/#proyectos", label: "Proyectos" },
  { href: "/#habilidades", label: "Habilidades" },
  { href: "/#playground", label: "Playground" },
  { href: "/#blog", label: "Blog" },
  
];

// Definimos las propiedades que acepta el componente (incluyendo el término de búsqueda)
interface HeaderProps {
  searchTerm: string | undefined;
  setSearchTerm: (term: string) => void;
}

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
      // Redirigimos a la página principal con el término de búsqueda en la URL
      window.location.href = `/?search=${encodeURIComponent(searchTerm.trim())}`;
    } else {
        // Si el usuario borra la búsqueda y presiona enter, volvemos al inicio
        window.location.href = `/`;
    }
    setIsMenuOpen(false); // Cierra el menú móvil al buscar
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
            <ul className="flex items-center space-x-8">
              <li><Link href="/" className="text-gray-700 hover:text-violet-600 transition-colors">Inicio</Link></li>
              {/* Renderizamos los navItems definidos arriba */}
              {navItems.map((item) => (
                  <li key={item.href}>
                      <Link 
                          href={item.href} 
                          className="text-gray-700 hover:text-violet-600 transition-colors"
                      >
                          {item.label}
                      </Link>
                  </li>
              ))}
            </ul>
          </nav>

          {/* Iconos, Búsqueda y Contacto (Derecha) */}
          <div className="hidden md:flex items-center space-x-5">
            {/* Redes Sociales */}
            <a href="https://github.com/SierraMa1" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-violet-600 transition-colors"><Github size={22} /></a>
            <a href="https://www.linkedin.com/in/Mar%C3%ADaSierraS%C3%A1nchez/" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-violet-600 transition-colors"><Linkedin size={22} /></a>
            
            {/* Buscador funcional */}
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
            <li><Link href="/" onClick={() => setIsMenuOpen(false)} className="hover:text-violet-600">Inicio</Link></li>
            {/* Renderizamos los navItems definidos arriba */}
             {navItems.map((item) => (
                  <li key={item.href}>
                      <Link 
                          href={item.href} 
                          onClick={() => setIsMenuOpen(false)}
                          className="hover:text-violet-600"
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