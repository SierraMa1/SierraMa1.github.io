// src/components/ChatbotButton.jsx (VERSIÓN CORREGIDA)
'use client'
import { useState, useEffect } from 'react';
import Script from 'next/script'; 
import { MessageCircle, X } from 'lucide-react'; 

// Variables de Entorno
const BOTPRESS_ID = process.env.NEXT_PUBLIC_BOTPRESS_ID || "default-bot"; 

export default function ChatbotButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [isBotReady, setIsBotReady] = useState(false);

  // Determinar si estamos en desarrollo (solo en el cliente)
  const isDevelopment = typeof window !== 'undefined' && window.location.hostname === 'localhost';

  const BASE_HOST = isDevelopment 
    ? 'http://localhost:3000'
    : 'https://electricfinder.es';

  // Script URL - CORRECCIÓN: en producción debe apuntar al proxy de Nginx
  const SCRIPT_SRC = isDevelopment 
    ? `${BASE_HOST}/assets/modules/channel-web/inject.js`
    : `${BASE_HOST}/botpress/assets/modules/channel-web/inject.js`;

  // Inicializar Botpress cuando el script se cargue
  const handleScriptLoad = () => {
    console.log('Script de Botpress cargado');
    
    if (window.botpressWebChat) {
      // IMPORTANTE: Inicializar Botpress con la configuración
      window.botpressWebChat.init({
        hostUrl: BASE_HOST,
        botId: BOTPRESS_ID,
        hideWidget: true, // Ocultar el widget por defecto
        containerWidth: '400px',
        layoutWidth: '400px',
        showConversationsButton: false,
        enableReset: true,
        enableTranscriptDownload: false,
        className: 'webchatIframe',
        // Configuración adicional
        extraStylesheet: '/botpress/assets/custom.css', // Opcional
      });

      setIsBotReady(true);
      console.log('Botpress inicializado correctamente');
    }
  };

  // Detectar errores de carga del script
  const handleScriptError = (error) => {
    console.error('Error al cargar el script de Botpress:', error);
    console.error('URL intentada:', SCRIPT_SRC);
  };

  // Toggle del chat
  const toggleBotpressChat = () => {
    if (!isBotReady || !window.botpressWebChat) {
      console.error("Botpress no está listo");
      return;
    }

    try {
      if (isOpen) {
        window.botpressWebChat.sendEvent({ type: 'hide' });
      } else {
        window.botpressWebChat.sendEvent({ type: 'show' });
      }
      setIsOpen(!isOpen);
    } catch (error) {
      console.error('Error al togglear el chat:', error);
    }
  };

  return (
    <>
      {/* Script de Botpress */}
      <Script 
        src={SCRIPT_SRC}
        strategy="afterInteractive"
        onLoad={handleScriptLoad}
        onError={handleScriptError}
      />

      {/* Botón personalizado */}
      <button
        onClick={toggleBotpressChat} 
        disabled={!isBotReady}
        className={`fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-violet-600 text-white shadow-lg transition-transform hover:scale-110 ${
          !isBotReady ? 'opacity-50 cursor-not-allowed' : ''
        }`}
        aria-label={isOpen ? "Cerrar chat" : "Abrir chat"}
        title={!isBotReady ? "Cargando chatbot..." : (isOpen ? "Cerrar chat" : "Abrir chat")}
      >
        {isOpen ? <X size={28} /> : <MessageCircle size={28} />}
      </button>
    </>
  );
}