// components/Chatbot.js
'use client'
import Script from 'next/script'; 
import { useState } from 'react'; // Necesario aunque no lo usemos, para mantener la estructura de Next/React

// Asegúrate de que las variables de entorno están en tu .env.local
const BOTPRESS_IP = process.env.NEXT_PUBLIC_BOTPRESS_IP || "localhost"; 
const BOTPRESS_BOT_ID = process.env.NEXT_PUBLIC_BOTPRESS_ID || "default-bot"; 

const botpressConfig = {
    // Usamos la IP + HTTP para desarrollo local (para que pueda cargar el script)
    hostUrl: `http://217.154.181.135:3000/`, 
    botId: BOTPRESS_BOT_ID,
    
    // Configuramos para que MUESTRE su botón predeterminado de Botpress
    disableFloatingButton: false, 
};

export default function Chatbot() {
  return (
    <>
      {/* 1. SCRIPT DE CONFIGURACIÓN */}
      <Script id="bp-config" strategy="beforeInteractive">
        {`window.botpressWebChat = ${JSON.stringify(botpressConfig)};`}
      </Script>

      {/* 2. SCRIPT DE INYECCIÓN (Apunta a la IP del VPS) */}
      <Script 
        src={`http://217.154.181.135:3000//assets/modules/channel-web/inject.js`}
        strategy="afterInteractive" 
      />
      
      {/* No hay botón personalizado; Botpress mostrará su botón por defecto. */}
    </>
  );
}