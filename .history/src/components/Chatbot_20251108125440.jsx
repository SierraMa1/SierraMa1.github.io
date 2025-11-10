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
  hostUrl: `http://217.154.181.135:3000/`, // ¡CLAVE! HTTPS y dominio completo
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
  // Escucha el evento de inicialización de Botpress
  /*useEffect(() => {
    const handleBotReady = () => {
      console.log('Botpress WebChat está listo.');
      setIsBotReady(true);
    };

    // Si ya existe (página cargó rápidamente), lo marcamos como listo
    if (typeof window !== 'undefined' && window.botpressWebChat && window.botpressWebChat.sendEvent) {
      setIsBotReady(true);
      return;
    }
    */
    // 1. Esperamos el evento 'webchat:ready'
    window.addEventListener('webchat:ready', handleBotReady);
    
    // 2. Intentamos inicializarlo manualmente si han pasado 3 segundos (FALLBACK)
    // Esto ayuda en entornos locales donde el evento puede fallar
    const timeout = setTimeout(() => {
        if (typeof window !== 'undefined' && window.botpressWebChat) {
             console.log("Forzando inicialización de Botpress.");
             setIsBotReady(true);
        }
    }, 3000); // 3 segundos de espera

    // Limpieza de listeners y timeout
    return () => {
      window.removeEventListener('webchat:ready', handleBotReady);
      clearTimeout(timeout);
    };
  }, []);return () => {
    window.removeEventListener('webchat:ready', handleBotReady);
    clearTimeout(timeout);
  };
// Si estás usando useEffect, DEBE terminar aquí:
}, [];

  // 4. LÓGICA DEL BOTÓN PERSONALIZADO
  /*const toggleBotpressChat = () => {
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
  */
  return (
    <>
      {/* 1. SCRIPT DE CONFIGURACIÓN (hostUrl a tu IP) */}
      <Script id="bp-config" strategy="beforeInteractive">
        {`window.botpressWebChat = ${JSON.stringify(botpressConfig)};`}
      </Script>

      {/* 2. SCRIPT DE INYECCIÓN (Apunta a la IP del VPS) */}
      <Script 
        src={`http://${BOTPRESS_IP}:3000/assets/modules/channel-web/inject.js`}
        strategy="afterInteractive" 
      />

      {/* 3. ¡ELIMINA TU BOTÓN PERSONALIZADO! */}
      {/* <button onClick={...}>...</button> */}
      {/* Y verifica si el botón morado de Botpress (el que ves) funciona. */}

    </>
  );