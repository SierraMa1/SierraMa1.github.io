// src/components/BotpressChat.tsx
import Script from 'next/script'; 

export default function BotpressChat() {
  return (
    <Script 
      src="http://[TU IP REAL DE IONOS]:3000/assets/modules/channel-web/inject.js" 
      strategy="lazyOnload"
    />
  );
}