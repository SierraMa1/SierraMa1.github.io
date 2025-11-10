// components/Chatbot.js (La versión funcional con tu botón)
'use client'
import { useState, useEffect } from 'react';
import Script from 'next/script'; 
import { MessageCircle, X } from 'lucide-react'; 

const BOTPRESS_IP = process.env.NEXT_PUBLIC_BOTPRESS_IP || "localhost"; 

const botpressConfig = {
    hostUrl: `http://localhost:3000`, // Para el túnel SSH
    botId: "mariadevsierra-bot",
    disableFloatingButton: false, // Mantenemos en false para ver el botón de Botpress
};

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isBotReady, setIsBotReady] = useState(false); // Estado para la lógica
  
  // Lógica de Sincronización de Carga
  useEffect(() => {
    // Esto asegura que el botón se habilite cuando el script de Botpress cargue
    const handleBotReady = () => { setIsBotReady(true); };
    window.addEventListener('webchat:ready', handleBotReady);
    
    // Fallback: Si el script ya cargó, lo marcamos como listo
    if (typeof window !== 'undefined' && window.botpressWebChat && window.botpressWebChat.sendEvent) {
      setIsBotReady(true);
    }

    return () => {
      window.removeEventListener('webchat:ready', handleBotReady);
    };
  }, []);

  const toggleBotpressChat = () => {
    // Si el bot está listo, llama a la API para abrir/cerrar
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
      <Script id="bp-config" strategy="beforeInteractive">
        {`window.botpressWebChat = ${JSON.stringify(botpressConfig)};`}
      </Script>
      <Script 
        src={`http://localhost:3000/assets/modules/channel-web/inject.js`}
        strategy="afterInteractive" 
      />

      {/* Aquí, Botpress ya inyectó SU BOTÓN morado. */}
      {/* Si quieres usar TU BOTÓN (el que tiene el diseño de lucide-react):
        1. Debes cambiar disableFloatingButton a TRUE en la configuración de arriba.
        2. Y luego incluir tu botón personalizado aquí:
        
        <button
            onClick={toggleBotpressChat}
            disabled={!isBotReady} // Mantenlo para evitar errores de clic
            // ... (el resto de las clases de tu botón)
        >
            {isOpen ? <X size={28} /> : <MessageCircle size={28} />}
        </button> 
      */}
      
    </>
  );
}