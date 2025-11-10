// src/components/ChatbotButton.jsx (CONEXIÓN DIRECTA SIN PROXY)
'use client'
import { useState, useEffect } from 'react';
import Script from 'next/script'; 
import { MessageCircle, X } from 'lucide-react'; 

export default function ChatbotButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [isBotReady, setIsBotReady] = useState(false);

  // Configuración - Conexión directa al servidor Botpress
  const BOTPRESS_IP = process.env.NEXT_PUBLIC_BOTPRESS_IP || '217.154.181.135';
  const BOTPRESS_PORT = process.env.NEXT_PUBLIC_BOTPRESS_PORT || '3000';
  const BOTPRESS_ID = process.env.NEXT_PUBLIC_BOTPRESS_ID || "mariasierradev-bot";
  const BOTPRESS_HOST = `http://${BOTPRESS_IP}:${BOTPRESS_PORT}`;
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
        // Inicializar con el widget VISIBLE por defecto
        window.botpressWebChat.init({
          hostUrl: BOTPRESS_HOST,
          botId: BOTPRESS_ID,
          hideWidget: false, // Widget visible - Botpress maneja todo
          showPoweredBy: false,
          botName: 'Asistente Virtual',
          botConversationDescription: '¿En qué puedo ayudarte?',
          locale: 'es',
        });

        setIsBotReady(true);
        console.log('✅ Botpress inicializado correctamente');
        
        // Ocultar el widget por defecto al iniciar
        setTimeout(() => {
          if (window.botpressWebChat) {
            window.botpressWebChat.sendEvent({ type: 'hide' });
          }
        }, 100);
        
      } catch (error) {
        console.error('❌ Error al inicializar Botpress:', error);
      }
    }
  };

  const handleScriptError = (error) => {
    console.error('❌ Error al cargar el script:', error);
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

  // Forzar visibilidad del widget cuando cambia el estado
  useEffect(() => {
    if (isBotReady && window.botpressWebChat) {
      const widgetContainer = document.querySelector('#bp-web-widget-container');
      if (widgetContainer) {
        if (isOpen) {
          widgetContainer.style.display = 'block';
          widgetContainer.style.visibility = 'visible';
          widgetContainer.style.opacity = '1';
          console.log('📱 Widget container visible');
        } else {
          widgetContainer.style.display = 'none';
          console.log('📱 Widget container oculto');
        }
      }
    }
  }, [isOpen, isBotReady]);

  return (
    <>
      {/* Script de Botpress - Conexión directa */}
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
        className={`fixed bottom-6 right-6 z-[10000] flex h-14 w-14 items-center justify-center rounded-full bg-violet-600 text-white shadow-lg transition-transform hover:scale-110 ${
          !isBotReady ? 'opacity-50 cursor-not-allowed' : ''
        }`}
        aria-label={isOpen ? "Cerrar chat" : "Abrir chat"}
        title={!isBotReady ? "Cargando chatbot..." : (isOpen ? "Cerrar chat" : "Abrir chat")}
      >
        {isOpen ? <X size={28} /> : <MessageCircle size={28} />}
      </button>
      
      {/* CSS para ocultar el botón por defecto de Botpress */}
      <style jsx global>{`
        #bp-web-widget-container {
          z-index: 9999 !important;
        }
        /* Ocultar el botón flotante por defecto de Botpress */
        #bp-web-widget-container > div > div:first-child {
          display: none !important;
        }
      `}</style>
    </>
  );
}