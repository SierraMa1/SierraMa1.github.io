// src/components/ChatbotButton.jsx
'use client'
import { useState, useEffect } from 'react';
import Script from 'next/script'; 
import { MessageCircle, X } from 'lucide-react'; 
import Head from 'next/head'; // Para inyectar variables globales de forma segura

// Variables de Entorno (Se leen automáticamente)
const BOTPRESS_ID = process.env.NEXT_PUBLIC_BOTPRESS_ID || "default-bot"; 
const BOTPRESS_IP = process.env.NEXT_PUBLIC_BOTPRESS_IP || "localhost"; 

// 1. Determina la URL de Conexión (El único lugar donde se decide la URL)
const isDevelopment = typeof window !== 'undefined' && window.location.hostname === 'localhost';

const BASE_HOST = isDevelopment 
    ? `http://localhost:http://217.154.181.135:3000/` // Para desarrollo local (túnel SSH)
    : `https://electricfinder.es`; // Para producción (Nginx/HTTPS)

const SCRIPT_SRC = isDevelopment 
    ? `${BASE_HOST}/assets/modules/channel-web/inject.js` 
    : `${BASE_HOST}/botpress/assets/modules/channel-web/inject.js`; // Usar la ruta del proxy Nginx


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

  // Lógica de Sincronización de Carga
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
      {/* 1. INYECCIÓN DE LA CONFIGURACIÓN (Soluciona error de hidratación) */}
      <Head>
        <script 
          dangerouslySetInnerHTML={{
            __html: `window.botpressWebChat = ${JSON.stringify(botpressConfig)};`,
          }}
        />
      </Head>
      
      {/* 2. INYECCIÓN DEL SCRIPT (Usamos la URL calculada arriba) */}
      <Script 
        src={SCRIPT_SRC} // Usamos la URL calculada
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