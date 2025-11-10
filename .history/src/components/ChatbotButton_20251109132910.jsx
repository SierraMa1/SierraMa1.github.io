// src/components/ChatbotButton.jsx (CONEXIÓN USANDO EL PROXY DE NEXT.JS)
'use client'
import { useState, useEffect } from 'react';
import Script from 'next/script'; 
import { MessageCircle, X } from 'lucide-react'; 

export default function ChatbotButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [isBotReady, setIsBotReady] = useState(false);

  // Configuración - Conexión directa al servidor Botpress
 
  const BOTPRESS_ID = process.env.NEXT_PUBLIC_BOTPRESS_ID || "mariasierradev-bot";
  const BOTPRESS_HOST = '/api/botpress'; 
  const SCRIPT_SRC = `${BOTPRESS_HOST}/assets/modules/channel-web/inject.js`;
  
  console.log('🔧 Configuración Botpress (usando proxy):', {
    botId: BOTPRESS_ID,
    host: BOTPRESS_HOST,
    scriptSrc: SCRIPT_SRC
  });

  // Inicializar Botpress cuando el script se cargue
  const handleScriptLoad = () => {
    console.log('✅ Script de Botpress cargado(Proxy');
    
    if (window.botpressWebChat) {
      try {
        // Inicializar con el widget VISIBLE por defecto
        window.botpressWebChat.init({
          hostUrl: BOTPRESS_HOST,
          botId: BOTPRESS_ID,
          hideWidget: false,
          showPoweredBy: false,
          botName: 'Asistente Virtual',
          botConversationDescription: '¿En qué puedo ayudarte?',
          locale: 'es',
          // Forzar que use la URL completa del host
          useSessionStorage: false,
          enableConversationDeletion: true,
        });

        setIsBotReady(true);
        console.log('✅ Botpress inicializado correctamente');
        console.log('🔗 Host URL:', BOTPRESS_HOST);
        
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
      const widgetContainer = document.querySelector('#bp-web-widget');
      const iframe = document.querySelector('#bp-widget');
      
      if (widgetContainer) {
        if (isOpen) {
          // Forzar estilos para que sea visible y flotante
          widgetContainer.style.display = 'block';
          widgetContainer.style.visibility = 'visible';
          widgetContainer.style.opacity = '1';
          widgetContainer.style.position = 'fixed';
          widgetContainer.style.bottom = '20px'; // Distancia desde el fondo
          widgetContainer.style.right = '90px'; // A la izquierda del botón
          widgetContainer.style.zIndex = '9999';
          widgetContainer.style.width = '400px';
          widgetContainer.style.height = '650px'; // Altura fija del contenedor
          widgetContainer.style.maxHeight = 'calc(100vh - 40px)';
          
          if (iframe) {
            iframe.style.display = 'block';
            iframe.style.visibility = 'visible';
            iframe.style.width = '100%';
            iframe.style.height = '100%'; // Ocupar todo el contenedor
          }
          
          console.log('📱 Widget y iframe visibles y posicionados');
        } else {
          widgetContainer.style.display = 'none';
          console.log('📱 Widget oculto');
        }
      } else {
        console.error('❌ No se encontró #bp-web-widget');
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
      
      {/* CSS para controlar el widget de Botpress */}
      <style jsx global>{`
        #bp-web-widget {
          z-index: 9999 !important;
        }
        /* Ocultar el botón flotante por defecto de Botpress */
        #bp-web-widget > div:first-child {
          display: none !important;
        }
        /* Asegurar que el iframe sea visible cuando esté abierto */
        #bp-widget {
          border: none !important;
          border-radius: 12px !important;
          box-shadow: 0 10px 30px rgba(0,0,0,0.3) !important;
        }
      `}</style>
    </>
  );
}