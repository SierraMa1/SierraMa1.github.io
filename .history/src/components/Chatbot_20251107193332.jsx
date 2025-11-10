// components/Chatbot.js (o Chatbot.tsx)
'use client'
import { useState, useEffect } from 'react';
import Script from 'next/script'; 
import { MessageCircle, X } from 'lucide-react'; 

// 1. LECTURA DE VARIABLES DE ENTORNO
// Next.js automáticamente lee estas variables del archivo .env.local
const BOTPRESS_IP = process.env.NEXT_PUBLIC_BOTPRESS_IP || "localhost"; 
const BOTPRESS_BOT_ID = process.env.NEXT_PUBLIC_BOTPRESS_ID || "default-bot"; 

// --- 2. CONFIGURACIÓN DE BOTPRESS ---
// Usamos la IP del VPS para conectarnos en desarrollo (HTTP)
// En producción, Nginx se encargará de hacer de proxy con HTTPS
const botpressConfig = {
  // Apuntamos al dominio seguro, que tu navegador conoce
  hostUrl: `https://electricfinder.es`, // ¡CLAVE! HTTPS y dominio completo
  botId: BOTPRESS_BOT_ID,
    
    // Oculta el botón flotante por defecto de Botpress
    disableFloatingButton: true,
    
    // Opciones de estilo
    containerWidth: '400px', 
    layout: 'floating',
};
// ---------------------------------

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isBotReady, setIsBotReady] = useState(false); // Estado para evitar el error 'sendEvent'

  // 3. EFECTO PARA ESCUCHAR CUANDO EL WIDGET DE BOTPRESS ESTÉ LISTO
  useEffect(() => {
    // Función para marcar el bot como listo
    const handleBotReady = () => {
      console.log('Botpress WebChat está listo.');
      setIsBotReady(true);
    };

    // Si Botpress ya cargó completamente, lo marcamos como listo
    if (typeof window !== 'undefined' && window.botpressWebChat && window.botpressWebChat.sendEvent) {
      setIsBotReady(true);
      return;
    }
    
    // Si no ha cargado, esperamos el evento 'webchat:ready'
    window.addEventListener('webchat:ready', handleBotReady);

    // Limpieza del listener
    return () => {
      window.removeEventListener('webchat:ready', handleBotReady);
    };
  }, []);

  // 4. LÓGICA DEL BOTÓN PERSONALIZADO
  const toggleBotpressChat = () => {
    // Solo llama al API de Botpress si sabemos que existe
    if (isBotReady && window.botpressWebChat) {
      if (isOpen) {
        // Enviar evento para OCULTAR
        window.botpressWebChat.sendEvent({ type: 'hide' });
      } else {
        // Enviar evento para MOSTRAR
        window.botpressWebChat.sendEvent({ type: 'show' });
      }
      setIsOpen(!isOpen); // Actualiza el icono
    } else {
      console.error("Botpress no está inicializado. Esperando...");
      // Puedes añadir un indicador de carga aquí si quieres
    }
  };
  
  return (
    <>
      {/* Script de CONFIGURACIÓN (hostUrl seguro: https://electricfinder.es) */}
      <Script id="bp-config" strategy="beforeInteractive">
        {/* Usará hostUrl: https://electricfinder.es */}
        {`window.botpressWebChat = ${JSON.stringify(botpressConfig)};`}
      </Script>

      <Script 
        src={`http://217.154.181.135:3000//assets/modules/channel-web/inject.js`}
        strategy="afterInteractive" 
      />

      {/* 6. TU BOTÓN Y DISEÑO ORIGINAL */}
      <button
        onClick={toggleBotpressChat}
        // Deshabilita el botón mientras el bot no esté listo (isBotReady es false)
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