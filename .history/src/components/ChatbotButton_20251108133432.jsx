// src/components/ChatbotButton.jsx
'use client'
import { useState, useEffect } from 'react';
import Script from 'next/script'; 
import { MessageCircle, X } from 'lucide-react'; 
import Head from 'next/head';

// Variables para Producción (Usadas en hostUrl para el proxy)
const BOTPRESS_IP = process.env.NEXT_PUBLIC_BOTPRESS_IP;
const BOTPRESS_ID = process.env.NEXT_PUBLIC_BOTPRESS_ID;

// Determina si estamos en desarrollo local (para usar el túnel SSH)
const isDevelopment = typeof window !== 'undefined' && window.location.hostname === 'localhost';

const botpressConfig = {
    // Usamos el túnel SSH para la conexión local. En producción, el hostUrl será HTTPS.
    hostUrl: isDevelopment ? `http://localhost:3000` : `https://electricfinder.es`, 
    botId: BOTPRESS_ID || "default-bot",
    disableFloatingButton: true, // Ocultamos el botón de Botpress
    // ...
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
    <Head>
        {/* Usamos Head y script estándar para inyectar la variable ANTES de la hidratación */}
        <script 
          dangerouslySetInnerHTML={{
            __html: `window.botpressWebChat = ${JSON.stringify(botpressConfig)};`,
          }}
        />
      </Head>
      {/* 1. SCRIPTS DE INYECCIÓN (Solo se cargan si no hay error de red) */}
      <Script id="bp-config" strategy="beforeInteractive">
        {`window.botpressWebChat = ${JSON.stringify(botpressConfig)};`}
      </Script>
      <Script 
        // CLAVE: Usamos localhost:3000 con HTTP, que el túnel SSH redirige
        src={isDevelopment 
             ? `http://217.154.181.135:3000//assets/modules/channel-web/inject.js` 
             : `https://electricfinder.es/botpress/assets/modules/channel-web/inject.js`}
        strategy="afterInteractive" 
      />
      <Script 
        src={isDevelopment ? `http://localhost:3000/assets/modules/channel-web/inject.js` : `https://electricfinder.es/botpress/assets/modules/channel-web/inject.js`}
        strategy="afterInteractive" 
      />

      {/* 2. TU BOTÓN DE DISEÑO PERSONALIZADO */}
      <button
        onClick={toggleBotpressChat} // Llama a la función que abre Botpress
        disabled={!isBotReady && !isDevelopment} // Deshabilitar solo si no está listo
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-violet-600 text-white shadow-lg transition-transform hover:scale-110"
        aria-label={isOpen ? "Cerrar chat" : "Abrir chat"}
      >
        {isOpen ? <X size={28} /> : <MessageCircle size={28} />}
      </button>
    </>
  );
}