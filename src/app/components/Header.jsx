'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X, ChevronDown, Github, Linkedin } from 'lucide-react'
import { cn } from "@/lib/utils"
import ProjectsSection from '../components/ProjectsSection';

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [visibleWords, setVisibleWords] = useState([]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const words = ['Sierra ', 'Sánchez'];
    words.forEach((word, index) => {
      setTimeout(() => {
        setVisibleWords((prev) => [...prev, word]);
      }, index * 1000); // Aparece cada segundo
    });
  }, []);

  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth',
    });
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center">
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: "url('/Fondo.png')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        >
          <div className="absolute inset-0 bg-black/50" />
        </div>

        <div className="container mx-auto px-4 py-8 z-10">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-12">
            <div className="w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 xl:w-[400px] xl:h-[400px] 2xl:w-[500px] 2xl:h-[500px] relative flex-shrink-0">
              <Image
                src="/traje.jpeg"
                alt="María"
                fill
                className="rounded-full object-cover shadow-lg py-2"
                priority
              />
            </div>
            
            <div className="max-w-full md:max-w-2xl text-center md:text-left">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                María {visibleWords.map((word, index) => (
                  <span key={index} className="transition-opacity duration-600">
                    {word}
                    {index < visibleWords.length - 1}
                  </span>
                ))}
              </h1>
              <h2 className="text-xl md:text-3xl lg:text-4xl font-semibold text-gray-300 mb-6 sm:text-base">
  Desarrolladora Web Full Stack
</h2>
<p className="text-base md:text-xl lg:text-2xl text-gray-200 mb-8 leading-relaxed sm:text-sm">
  Desarrolladora Web Full Stack con una sólida base en tecnologías frontend y backend, y experiencia en la creación de aplicaciones eficientes y centradas en el usuario. Mi enfoque combina habilidades técnicas con una fuerte orientación al cliente, lo que me permite desarrollar soluciones digitales que optimizan la experiencia del usuario.
</p>
              <Link
                href="/sobre-mi"
                className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-[#A78BFA] text-white hover:bg-[#9061F9] transition-colors text-base sm:text-lg mb-8"
              >
                Sobre mí
              </Link>

          

              <div className=" bottom-0 left-0 right-0 w-full flex justify-center md:justify-end space-x-6">
              <div className="flex space-x-6">
                <a 
                  href="https://github.com/SierraMa1" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-white hover:text-[#A78BFA] transition-colors"
                >
                  <Github size={32} />
                </a>
                <a 
                  href="https://www.linkedin.com/in/Mar%C3%ADaSierraS%C3%A1nchez/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-white hover:text-[#A78BFA] transition-colors"
                >
                  <Linkedin size={32} />
                </a>
              </div>
              </div>
            </div>
          </div>
        </div>

        <button
  onClick={scrollToContent}
  className="absolute bottom-16 left-1/2 transform -translate-x-1/2 animate-bounce rounded-full p-2 bg-white/10 hover:bg-white/20 transition-colors hidden md:block"
  aria-label="Scroll to content"
>
  <ChevronDown size={42} />
</button>
      </section>

      {/* Navigation */}
      <header className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled ? "bg-black/90 shadow-lg" : "bg-transparent",
  "max-w-screen-3xl mx-auto"
      )}>
        <div className="container mx-auto px-0">
          <div className="flex justify-between items-center py-4">
            <Link href="/Header" className="text-xl font-bold">
              MariaSierraDev
            </Link>
            
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)} 
              className="md:hidden"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            <nav className={`${isMenuOpen ? 'block' : 'hidden'} md:block absolute md:relative top-full left-0 right-0 bg-black md:bg-transparent md:top-auto`}>
              <ul className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-8 p-4 md:p-0">
                <li>
                  <Link href="/" className="hover:text-[#A78BFA] transition-colors">
                    Inicio
                  </Link>
                </li>
                <li>
                  <Link href="/ProjectsSection" className="hover:text-[#A78BFA] transition-colors">
                    Proyectos
                  </Link>
                </li>
                <li>
                  <Link href="/sobre-mi" className="hover:text-[#A78BFA] transition-colors">
                    Sobre Mí
                  </Link>
                </li>
                <li>
                  <Link href="/contacto" className="hover:text-[#A78BFA] transition-colors">
                    Contacto
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      {/* Content sections would go here */}
    </div>
  )
}