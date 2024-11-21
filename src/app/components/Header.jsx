'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false)
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <header className="bg-[#F5F5F0] shadow-md flex justify-between items-center px-4 py-4">
      <Link href="/" className="text-xl font-bold text-[#333]"></Link>
      <button onClick={toggleMenu} className="md:hidden text-[#333]" aria-label="Toggle menu">
        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
      <nav className={`md:flex space-x-4 ${isMenuOpen ? 'block' : 'hidden'}`}>
        <Link href="/" className="text-[#333] hover:text-[#aa65f0] hover:scale-125 transition-all duration-300 ease-in-out font-semi-bold">
          Inicio
        </Link>
        <Link href="/projects" className="text-[#333] hover:text-[#aa65f0] hover:scale-125 transition-all duration-300 ease-in-out font-semi-bold">
          Proyectos
        </Link>
        <Link href="/sobre-mi" className="text-[#333] hover:text-[#aa65f0] hover:scale-125 transition-all duration-300 ease-in-out font-semi-bold">
          Sobre Mí
        </Link>
        <Link href="/contacto" className="text-[#333] hover:text-[#aa65f0] hover:scale-125 transition-all duration-300 ease-in-out font-semi-bold">
          Contacto
        </Link>
      </nav>
    </header>
  )
}