'use client'

import { Github, Linkedin, Mail } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }
  return (
    <div className="min-h-screen  bg-gradient-to-b from-[#979499] to-[#f3f0e9]">
      <header className=" bg-slate-900 shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-primary">
          Mi Portafolio
        </Link>
        
        {/* Desktop Menu */}
        <nav className="hidden md:flex space-x-4">
          <Link href="/" className="text-foreground hover:text-primary transition-colors">
            Inicio
          </Link>
          <Link href="/proyectos" className="text-foreground hover:text-primary transition-colors">
            Proyectos
          </Link>
          <Link href="/sobre-mi" className="text-foreground hover:text-primary transition-colors">
            Sobre Mí
          </Link>
          <Link href="/contacto" className="text-foreground hover:text-primary transition-colors">
            Contacto
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button onClick={toggleMenu} className="md:hidden text-foreground">
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <nav className="md:hidden bg-background">
          <div className="container mx-auto px-4 py-2 flex flex-col space-y-2">
            <Link href="/" className="text-foreground hover:text-primary transition-colors" onClick={toggleMenu}>
              Inicio
            </Link>
            <Link href="/proyectos" className="text-foreground hover:text-primary transition-colors" onClick={toggleMenu}>
              Proyectos
            </Link>
            <Link href="/sobre-mi" className="text-foreground hover:text-primary transition-colors" onClick={toggleMenu}>
              Sobre Mí
            </Link>
            <Link href="/contacto" className="text-foreground hover:text-primary transition-colors" onClick={toggleMenu}>
              Contacto
            </Link>
          </div>
        </nav>
      )}
    </header>
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          {/* Sección de introducción */}
          <div className="px-4 py-6 sm:px-0">
            <div className="border-4 border-dashed border-gray-100 rounded-lg p-6 flex flex-col md:flex-row items-center shadow-xl">
              <Image
                src="/traje.jpeg"
                alt="Foto de perfil"
                width={150}
                height={150}
                className="rounded-full mb-2 md:mb-0 md:mr-6 shadow-xl "
              />
              <div>
                <h2 className="text-2xl font-bold mb-2 text-slate-700 text-center">María Sierra Sánchez</h2>
                <p className="text-gray-600 mb-4 text-center">
                  Soy una desarrolladora web apasionada con experiencia en React, Node.js y diseño de interfaces de usuario.
                  Me encanta crear aplicaciones web eficientes y atractivas.
                </p>
              </div>
            </div>
          </div>

          {/* Sección de proyectos */}
          <div className="px-4 py-6 sm:px-0">
            <h2 className="text-2xl font-bold mb-4 text-stone-400 text-center">Mis Proyectos</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ">
              {[1, 2, 3].map((project) => (
                <div key={project} className="border border-gray-200 rounded-lg p-4 shadow-xl">
                  <Image
                    src={`/placeholder.svg?height=200&width=300`}
                    alt={`Proyecto ${project}`}
                    width={300}
                    height={200}
                    className="w-full h-40 object-cover rounded-lg mb-4"
                  />
                  <h3 className="text-lg font-semibold mb-2">Proyecto {project}</h3>
                  <p className="text-gray-600 mb-4">
                    Descripción breve del proyecto y las tecnologías utilizadas.
                  </p>
                  <a
                    href="#"
                    className="text-blue-600 hover:text-blue-800 transition-colors duration-200"
                  >
                    Ver más →
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Sección de contacto */}
          <div className="px-4 py-6 sm:px-0">
            <h2 className="text-2xl font-bold mb-4 text-stone-400">Contacto</h2>
            <div className="flex space-x-4">
              <a href="https://github.com/SierraMa1" className="text-gray-600 hover:text-gray-900">
                <Github className="w-6 h-6" />
              </a>
              <a href="https://www.linkedin.com/in/Mar%C3%ADaSierraS%C3%A1nchez/" className="text-gray-600 hover:text-gray-900">
                <Linkedin className="w-6 h-6" />
              </a>
              <a href="maria.sierra.sanchez@hotmail.com" className="text-gray-600 hover:text-gray-900">
                <Mail className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
