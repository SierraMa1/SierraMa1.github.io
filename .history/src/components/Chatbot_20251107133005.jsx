// components/Chatbot.js (o Chatbot.tsx)
'use client'
import { useState, useEffect } from 'react'; // Necesitamos useEffect para la inicialización
import Script from 'next/script'; // Importamos Script de Next.js
import { MessageCircle, X } from 'lucide-react'; 

// La IP real de tu servidor IONOS. ¡AJUSTA ESTA IP!
const BOTPRESS_IP = "2"; 
const BOTPRESS_BOT_ID = "mariadevsierra-bot"; // Asegúrate de que este sea el ID de tu bot

// --- CONFIGURACIÓN DE BOTPRESS ---
const botpressConfig = {
    // Definición de host y botId
    hostUrl: `http://${BOTPRESS_IP}:3000`,
    botId: BOTPRESS_BOT_ID,
    
    // **CLAVE: Ocultar el botón flotante por defecto de Botpress**
    disableFloatingButton: true,
    
    // Ajustes adicionales si los necesitas
    containerWidth: '400px',
    layout: 'floating',
};
// ---------------------------------


export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  
  // Función para abrir/cerrar el widget de Botpress.
  const toggleBotpressChat = () => {
    if (typeof window !== 'undefined' && window.botpressWebChat) {
      if (isOpen) {
        // Cierra el chat
        window.botpressWebChat.sendEvent({ type: 'hide' });
      } else {
        // Abre el chat
        window.botpressWebChat.sendEvent({ type: 'show' });
      }
      setIsOpen(!isOpen); // Actualiza el estado para cambiar el icono
    }
  };

  // 1. ELIMINAMOS ELIMINAMOS TU COMPONENTE ChatWindow
  // <ChatWindow isOpen={isOpen} onClose={() => setIsOpen(false)} />
  
  return (
    <>
      {/* 2. SCRIPT DE CONFIGURACIÓN (Antes de cargar el inyector) */}
      <Script id="bp-config" strategy="beforeInteractive">
        {`window.botpressWebChat = ${JSON.stringify(botpressConfig)};`}
      </Script>

      {/* 3. SCRIPT DE INYECCIÓN (Carga el cerebro de Botpress) */}
      <Script 
        src={`http://${BOTPRESS_IP}:3000/assets/modules/channel-web/inject.js`}
        strategy="lazyOnload"
      />

      {/* 4. TU BOTÓN Y DISEÑO ORIGINAL */}
      <button
        onClick={toggleBotpressChat} // Usamos la nueva función que llama a Botpress
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-violet-600 text-white shadow-lg transition-all hover:scale-110"
        aria-label={isOpen ? "Cerrar chat" : "Abrir chat"}
      >
        {isOpen ? <X size={28} /> : <MessageCircle size={28} />}
      </button>
    </>
  );
}