// src/components/ChatbotButton.jsx (VERSIÓN FINAL LIMPIA)
'use client'
import { useState, useEffect } from 'react';
import Script from 'next/script'; 
import { MessageCircle, X } from 'lucide-react'; 

// Variables de Entorno
const BOTPRESS_ID = process.env.NEXT_PUBLIC_BOTPRESS_ID || "default-bot"; 

// 1. Determina la URL de Conexión (Limpiando la lógica)
const isDevelopment = typeof window !== 'undefined' && window.location.hostname === 'localhost';

const BASE_HOST = isDevelopment 
    ? `http://localhost:3000` // Desarrollo: Túnel SSH
    : `https://electricfinder.es`; // Producción: Dominio HTTPS (Nginx)

const SCRIPT_SRC = isDevelopment 
    ? `${BASE_HOST}/assets/modules/channel-web/inject.js` // Ruta directa para el túnel SSH
    : `${BASE_HOST}/botpress/assets/modules/channel-web/inject.js`; // Ruta del Proxy Nginx


const botpressConfig = {
    hostUrl: BASE_HOST,
    botId: BOTPRESS_ID,
    disableFloatingButton: true, // Ocultamos el botón de Botpress
    containerWidth: '400px', 
    layout: 'floating',
};

export default function ChatbotButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [isBotReady, setIsBotReady] = useState(false);

  // Lógica de Sincronización de Carga (Sin cambios)
  useEffect(() => {
    const handleBotReady = () => { setIsBotReady(true); };
    window.addEventListener('webchat:ready', handleBotReady);
    if (typeof window !== 'undefined' && window.botpressWebChat && window.botpressWebChat.sendEvent) {
      setIsBotReady(true);
    }
    return () => { window.removeEventListener('webchat:ready', handleBotReady); };
  }, []);

  // LÓGICA PARA ABRIR/CERRAR BOTPRESS
  const toggleBotpressChat = () => {
    if (isBotReady && window.botpressWebChat) {
      if (isOpen) {
        window.botpressWebChat.sendEvent({ type: 'hide' });
      } else {
        window.botpressWebChat.sendEvent({ type: 'show' });
      }
      setIsOpen(!isOpen);
    } else {
      console.error("Botpress no está listo para recibir comandos.");
    }
  };

  return (
    <>
   
      
      {/* 2. INYECCIÓN DEL SCRIPT (Usamos la URL calculada arriba) */}
      <Script 
        src={SCRIPT_SRC} // Usa la URL de desarrollo O producción
        strategy="afterInteractive" 
      />

      {/* 3. TU BOTÓN DE DISEÑO PERSONALIZADO */}
      <button
        onClick={toggleBotpressChat} 
        disabled={!isBotReady} // Solo si Botpress está listo
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-violet-600 text-white shadow-lg transition-transform hover:scale-110"
        aria-label={isOpen ? "Cerrar chat" : "Abrir chat"}
      >
        {isOpen ? <X size={28} /> : <MessageCircle size={28} />}
      </button>
    </>
  );
}