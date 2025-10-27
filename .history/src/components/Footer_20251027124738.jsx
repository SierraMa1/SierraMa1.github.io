'use client'

import { useState, useEffect } from 'react';
import { Linkedin, Github, Mail, Copy, Check } from 'lucide-react';
import Image from 'next/image';

export default function Footer() {
  const [isCopied, setIsCopied] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);
  
  const email = "info@mariasierrasanchez.com";
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const copyToClipboard = () => {
    // Usamos document.execCommand('copy') para compatibilidad en iframes
    try {
      const ta = document.createElement('textarea');
      ta.value = email;
      ta.style.position = 'fixed'; // Evita que "salte" la pantalla
      ta.style.left = '-9999px';
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);

      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Error al copiar el email: ', err);
    }
  };

  return (
    <footer id="contacto" className="relative w-full border-t border-gray-700">
      
      {/* --- Fondo con imagen  --- */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/footer-bg1.png" 
          alt="Fondo del footer"
          fill // Reemplaza a layout="fill"
          className="object-cover" // Reemplaza a objectFit="cover"
          //  'quality={80}' HA SIDO ELIMINADO PARA QUITAR EL WARNING
          sizes="100vw" //  Añadido para optimización con 'fill'
        />
        {/* Capa oscura para mejorar el contraste del texto */}
        <div className="absolute inset-0 bg-black opacity-60"></div>
      </div>

      {/* --- Contenido superpuesto --- */}
      <div className="relative z-10 container mx-auto px-4 py-12 text-white">
        <h2 className="text-3xl font-bold mb-8 text-center">
          Hablemos
        </h2>
        
        <div className="flex flex-col md:flex-row justify-center items-center space-y-6 md:space-y-0 md:space-x-10 mb-10">
          <div className="flex items-center space-x-3 font-medium text-gray-200">
            <Mail size={24} />
            <span>{email}</span>
            {hasMounted && (
              <button
                onClick={copyToClipboard}
                className="p-2 bg-violet-500/30 text-violet-300 rounded-full hover:bg-violet-500/50 transition-colors"
                aria-label="Copiar correo electrónico"
              >
                {isCopied ? <Check size={16} /> : <Copy size={16} />}
              </button>
            )}
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-600 text-center">
            <div className="flex justify-center gap-6 mb-4">
                <a href="https://www.linkedin.com/in/Mar%C3%ADaSierraS%C3%A1nchez/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                    <Linkedin size={28} />
                </a>
                <a href="https://github.com/SierraMa1" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                    <Github size={28} />
                </a>
            </div>
          <p className="text-sm text-gray-400">
            &copy; {currentYear} María Sierra Sánchez. Diseñado y desarrollado por mí.
          </p>
        </div>
      </div>
    </footer>
  );
}

