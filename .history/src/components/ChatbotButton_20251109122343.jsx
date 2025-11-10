// src/components/ChatbotButton.jsx (CON PROXY LOCAL)
'use client'
import { useState, useEffect } from 'react';
import Script from 'next/script'; 
import { MessageCircle, X } from 'lucide-react'; 

export default function ChatbotButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [isBotReady, setIsBotReady] = useState(false);

  // Configuración - Ahora usamos rutas locales gracias al proxy
  const BOTPRESS_ID = process.env.NEXT_PUBLIC_BOTPRESS_ID || "mariasierradev-bot";
  const BOTPRESS_HOST = typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3001';
  const SCRIPT_SRC = `${BOTPRESS_HOST}/assets/modules/channel-web/inject.js`;
  
  console.log('🔧 Configuración Botpress:', {
    botId: BOTPRESS_ID,
    host: BOTPRESS_HOST,
    scriptSrc: SCRIPT_SRC
  });

  // Inicializar Botpress cuando el script se cargue
  const handleScriptLoad = () => {
    console.log('✅ Script de Botpress cargado');
    
    if (window.botpressWebChat) {
      try {
        window.botpressWebChat.init({
          hostUrl: BOTPRESS_HOST, // Ahora apunta a localhost gracias al proxy
          botId: BOTPRESS_ID,
          hideWidget: true,
          containerWidth: '400px',
          layoutWidth: '400px',
          showConversationsButton: false,
          enableReset: true,
          showCloseButton: true,
          botName: 'Asistente',
        });

        setIsBotReady(true);
        console.log('✅ Botpress inicializado correctamente');
      } catch (error) {
        console.error('❌ Error al inicializar Botpress:', error);
      }
    }
  };

  const handleScriptError = (error) => {
    console.error('❌ Error al cargar el script:', error);
    console.error('Verifica que next.config.js tenga los rewrites configurados');
  };

  // Toggle del chat
  const toggleBotpressChat = () => {
    if (!isBotReady || !window.botpressWebChat) {
      console.error("❌ Botpress no está listo");
      return;
    }

    try {
      if (isOpen) {
        window.botpressWebChat.sendEvent({ type: 'hide' });
        setIsOpen(false);
        console.log('🔽 Chat cerrado');
      } else {
        window.botpressWebChat.sendEvent({ type: 'show' });
        setIsOpen(true);
        console.log('🔼 Chat abierto');
      }
    } catch (error) {
      console.error('❌ Error al togglear el chat:', error);
    }
  };

  // Asegurar que el iframe sea visible con CSS
  useEffect(() => {
    if (isBotReady) {
      // Buscar el iframe de Botpress
      const iframe = document.querySelector('#bp-web-widget');
      if (iframe) {
        if (isOpen) {
          // Forzar visibilidad con estilos importantes
          iframe.style.display = 'block';
          iframe.style.visibility = 'visible';
          iframe.style.opacity = '1';
          iframe.style.position = 'fixed';
          iframe.style.bottom = '80px';
          iframe.style.right = '20px';
          iframe.style.zIndex = '9999';
          iframe.style.width = '400px';
          iframe.style.height = '600px';
          iframe.style.maxHeight = 'calc(100vh - 100px)';
          iframe.style.border = '0';
          iframe.style.borderRadius = '12px';
          iframe.style.boxShadow = '0 10px 30px rgba(0,0,0,0.3)';
          console.log('✅ Iframe visible y posicionado');
        } else {
          iframe.style.display = 'none';
          console.log('🔽 Iframe oculto');
        }
      } else {
        console.error('❌ No se encontró el iframe #bp-web-widget');
      }
    }
  }, [isOpen, isBotReady]);

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