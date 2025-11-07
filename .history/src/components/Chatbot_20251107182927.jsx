// components/Chatbot.js (o Chatbot.tsx)
'use client'
import { useState, useEffect } from 'react'; // ¡Añadimos useEffect!
import Script from 'next/script'; 
import { MessageCircle, X } from 'lucide-react'; 

// Variables (sin cambios)
const BOTPRESS_IP = process.env.NEXT_PUBLIC_BOTPRESS_IP || "localhost"; 
const BOTPRESS_BOT_ID = process.env.NEXT_PUBLIC_BOTPRESS_ID || "default-bot"; 

// CONFIGURACIÓN DE BOTPRESS (sin cambios)
const botpressConfig = {
    // CLAVE: En local, DEBE ser HTTP si no usas un proxy local
    hostUrl: `http://localhost:3000`, // Usamos localhost para desarrollo
    botId: BOTPRESS_BOT_ID,
    disableFloatingButton: true,
    containerWidth: '400px', 
    layout: 'floating',
};

// ** Importante: La función sendEvent se añadirá dinámicamente **

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isBotReady, setIsBotReady] = useState(false); // Nuevo estado

  // Escucha el evento de inicialización de Botpress
  useEffect(() => {
    // Si Botpress ya cargó, lo marcamos como listo
    if (window.botpressWebChat && window.botpressWebChat.sendEvent) {
      setIsBotReady(true);
      return;
    }
    
    // Si no ha cargado, esperamos el evento 'webchat:ready'
    window.addEventListener('webchat:ready', () => {
      console.log('Botpress WebChat está listo.');
      setIsBotReady(true);
    });

    // Limpieza del listener
    return () => {
      window.removeEventListener('webchat:ready', () => {});
    };
  }, []);

  const toggleBotpressChat = () => {
    // 🛑 CLAVE: Solo intenta llamar a sendEvent si el bot está marcado como listo
    if (isBotReady && window.botpressWebChat) {
      if (isOpen) {
        window.botpressWebChat.sendEvent({ type: 'hide' });
      } else {
        window.botpressWebChat.sendEvent({ type: 'show' });
      }
      setIsOpen(!isOpen); 
    } else {
      // Si aún no está listo, puedes registrar un mensaje o simplemente ignorar el clic.
      console.error("Botpress no está inicializado. Esperando...");
    }
  };
  
  return (
    <>
      {/* SCRIPT DE CONFIGURACIÓN */}
      <Script id="bp-config" strategy="beforeInteractive">
        {`window.botpressWebChat = ${JSON.stringify(botpressConfig)};`}
      </Script>

      {/* SCRIPT DE INYECCIÓN (En local, usa localhost:3000 si Botpress corre local) */}
      <Script 
        src={`http://localhost:3000/assets/modules/channel-web/inject.js`} // CAMBIADO A LOCALHOST PARA DESARROLLO
        strategy="afterInteractive" 
      />

      {/* TU BOTÓN PERSONALIZADO */}
      <button
        onClick={toggleBotpressChat}
        // Deshabilita el botón si el bot no está listo
        disabled={!isBotReady} 
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-violet-600 text-white shadow-lg transition-all hover:scale-110"
        aria-label={isOpen ? "Cerrar chat" : "Abrir chat"}
      >
        {/* Tu icono local */}
        {isOpen ? <X size={28} /> : <MessageCircle size={28} />}
      </button>
    </>
  );
}