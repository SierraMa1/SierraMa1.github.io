// src/components/ChatbotButton.jsx (VERSIÓN CORREGIDA)
'use client'
import { useState, useEffect } from 'react';
import Script from 'next/script'; 
import { MessageCircle, X } from 'lucide-react'; 

// Variables de Entorno
const BOTPRESS_ID = process.env.NEXT_PUBLIC_BOTPRESS_ID || "default-bot";
const BOTPRESS_IP = process.env.NEXT_PUBLIC_BOTPRESS_IP || "localhost";
const BOTPRESS_PORT = process.env.NEXT_PUBLIC_BOTPRESS_PORT || "3000"; 

export default function ChatbotButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [isBotReady, setIsBotReady] = useState(false);

  // Construir la URL del servidor Botpress
  const BOTPRESS_IP = process.env.NEXT_PUBLIC_BOTPRESS_IP || 'localhost';
  const BOTPRESS_PORT = process.env.NEXT_PUBLIC_BOTPRESS_PORT || '3000';
  const BOTPRESS_HOST = `http://${BOTPRESS_IP}:${BOTPRESS_PORT}`;
  
  // Script de Botpress
  const SCRIPT_SRC = `${BOTPRESS_HOST}/assets/modules/channel-web/inject.js`;
  
  console.log('🔧 Configuración Botpress:', {
    ip: BOTPRESS_IP,
    port: BOTPRESS_PORT,
    host: BOTPRESS_HOST,
    scriptSrc: SCRIPT_SRC,
    botId: BOTPRESS_ID
  });

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