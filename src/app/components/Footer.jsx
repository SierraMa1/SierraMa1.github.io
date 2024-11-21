'use client'
import { useState } from 'react'
import Image from 'next/image'
import { Linkedin, Github, Mail, Copy, Check } from 'lucide-react'

export default function Footer() {
  const [isCopied, setIsCopied] = useState(false)
  const email = "maria.sierra.sanchez@hotmail.com"

  const copyToClipboard = () => {
    navigator.clipboard.writeText(email).then(() => {
      setIsCopied(true)
      setTimeout(() => setIsCopied(false), 2000)
    })
  }

  return (
    <footer className="mt-12 bg-[#333] text-white">
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-6 text-center">Contacto</h2>
        <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-8 mb-8">
          <a href="https://www.linkedin.com/in/Mar%C3%ADaSierraS%C3%A1nchez/" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 hover:text-[#A78BFA] transition-colors">
            <Linkedin size={24} />
            <span>LinkedIn</span>
          </a>
          <a href="https://github.com/SierraMa1" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 hover:text-[#A78BFA] transition-colors">
            <Github size={24} />
            <span>GitHub</span>
          </a>
          <div className="flex items-center space-x-2">
            <Mail size={24} />
            <span className="hidden sm:inline">{email}</span>
            <span className="sm:hidden">Email</span>
            <button
              onClick={copyToClipboard}
              className="ml-2 p-1 bg-[#A78BFA] text-white rounded-full hover:bg-[#7C3AED] transition-colors"
              aria-label="Copiar correo electrónico"
            >
              {isCopied ? <Check size={16} /> : <Copy size={16} />}
            </button>
          </div>
        </div>
      </div>
      <div className="w-full h-20 sm:h-32 md:h-40 lg:h-48 xl:h-56 2xl:h-72 relative overflow-hidden">
        <Image
          src="/FullStack1.png"
          alt="Footer image"
          layout="fill"
          objectFit="cover"
          objectPosition="center-top"
          className="w-full h-full"
          priority
        />
      </div>
    </footer>
  )
}