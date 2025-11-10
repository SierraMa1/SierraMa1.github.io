// src/components/ChatbotButton.jsx (VERSIÓN CORREGIDA Y LIMPIA)
'use client'
import { useState } from 'react';
import Script from 'next/script'; 
import { MessageCircle, X } from 'lucide-react'; 

export default function ChatbotButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [isBotReady, setIsBotReady] = useState(false);

  // Variables de configuración de Botpress
  const BOTPRESS_ID = process.env.NEXT_PUBLIC_BOTPRESS_ID || "default-bot";
  const BOTPRESS_IP = process.env.NEXT_PUBLIC_BOTPRESS_IP || 'localhost';
  const BOTPRESS_PORT = process.env.NEXT_PUBLIC_BOTPRESS_PORT || '3000';
  const BOTPRESS_PATH = process.env.NEXT_PUBLIC_BOTPRESS_PATH || ''; // Ruta adicional si existe
  
  // Construir URLs (soporta tanto localhost como IPs remotas)
  const BOTPRESS_HOST = `http://${BOTPRESS_IP}:${BOTPRESS_PORT}${BOTPRESS_PATH}`;
  const SCRIPT_SRC = `${BOTPRESS_HOST}/assets/modules/channel-web/inject.js`;
  
  // Log de configuración para debugging
  console.log('🔧 Configuración Botpress:', {
    ip: BOTPRESS_IP,
    port: BOTPRESS_PORT,
    path: BOTPRESS_PATH,
    host: BOTPRESS_HOST,
    scriptSrc: SCRIPT_SRC,
    botId: BOTPRESS_ID
  });

  // Inicializar Botpress cuando el script se cargue
  const handleScriptLoad = () => {
    console.log('✅ Script de Botpress cargado');
    
    if (window.botpressWebChat) {
      try {
        window.botpressWebChat.init({
          hostUrl: BOTPRESS_HOST,
          botId: BOTPRESS_ID,
          hideWidget: true, // Ocultar el widget flotante de Botpress
          containerWidth: '400px',
          layoutWidth: '400px',
          showConversationsButton: false,
          enableReset: true,
          enableTranscriptDownload: false,
          className: 'webchatIframe',
          showCloseButton: true,
          botName: 'Asistente',
          botAvatarUrl: null,
          // Configuración adicional para forzar visibilidad
          stylesheet: 'https://webchat-styler-css.botpress.app/prod/code/d5a24c70-9e05-41bb-8c37-ea68312e6bca/v0/style.css',
        });

        setIsBotReady(true);
        console.log('✅ Botpress inicializado correctamente');
        console.log('🔍 Métodos disponibles:', Object.keys(window.botpressWebChat));
      } catch (error) {
        console.error('❌ Error al inicializar Botpress:', error);
      }
    } else {
      console.error('❌ window.botpressWebChat no está disponible');
    }
  };

  // Detectar errores de carga del script
  const handleScriptError = (error) => {
    console.error('❌ Error al cargar el script de Botpress:', error);
    console.error('URL intentada:', SCRIPT_SRC);
    console.error('Verifica que Botpress esté corriendo en:', BOTPRESS_HOST);
  };

  // Toggle del chat
  const toggleBotpressChat = () => {
    if (!isBotReady || !window.botpressWebChat) {
      console.error("❌ Botpress no está listo");
      return;
    }

    try {
      // Método principal: mergeConfig para forzar visibilidad
      if (isOpen) {
        window.botpressWebChat.mergeConfig({ hideWidget: true });
        setIsOpen(false);
        console.log('🔽 Chat cerrado');
      } else {
        window.botpressWebChat.mergeConfig({ hideWidget: false });
        window.botpressWebChat.sendEvent({ type: 'show' });
        setIsOpen(true);
        console.log('🔼 Chat abierto');
      }
    } catch (error) {
      console.error('❌ Error al togglear el chat:', error);
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