// components/Chatbot.js (o Chatbot.tsx)
'use client'
import { useState } from 'react';
import Script from 'next/script'; 
import { MessageCircle, X } from 'lucide-react'; 

// Las variables se leen del .env.local. Usamos '|| "default_value"' por si fallan.
const BOTPRESS_IP = process.env.NEXT_PUBLIC_BOTPRESS_IP || "localhost"; 
const BOTPRESS_BOT_ID = process.env.NEXT_PUBLIC_BOTPRESS_ID || "default-bot"; 

// --- CONFIGURACIÓN DE BOTPRESS ---
const botpressConfig = {
  hostUrl: `https://electricfinder.es`, 
  botId: BOTPRESS_BOT_ID,

    // CLAVE: Ocultar el botón flotante por defecto de Botpress
    disableFloatingButton: true,
    
    
    containerWidth: '400px', 
    layout: 'floating',
};
// ---------------------------------

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  
  const toggleBotpressChat = () => {
    if (typeof window !== 'undefined' && window.botpressWebChat) {
      if (isOpen) {
        window.botpressWebChat.sendEvent({ type: 'hide' });
      } else {
        window.botpressWebChat.sendEvent({ type: 'show' });
      }
      setIsOpen(!isOpen); 
    }
  };
  
  return (
    <>
      {/* SCRIPT DE CONFIGURACIÓN (Antes de cargar el inyector) */}
      <Script id="bp-config" strategy="beforeInteractive">
        {`window.botpressWebChat = ${JSON.stringify(botpressConfig)};`}
      </Script>

      {/* SCRIPT DE INYECCIÓN (Carga el cerebro de Botpress) */}
      // components/Chatbot.js (Líneas 43-46 aproximadamente)

/* SCRIPT DE INYECCIÓN (Carga el cerebro de Botpress) */
<Script 
    // CLAVE: Usamos HTTPS y la ruta /botpress/ que Nginx manejará:
    src={`https://electricfinder.es/botpress/assets/modules/channel-web/inject.js`}
    strategy="afterInteractive" // Cambiado de lazyOnload para mayor fiabilidad
/>


      {/* TU BOTÓN Y DISEÑO ORIGINAL */}
      <button
        onClick={toggleBotpressChat}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-violet-600 text-white shadow-lg transition-all hover:scale-110"
        aria-label={isOpen ? "Cerrar chat" : "Abrir chat"}
      >
        {isOpen ? <X size={28} /> : <MessageCircle size={28} />}
      </button>
    </>
  );
}