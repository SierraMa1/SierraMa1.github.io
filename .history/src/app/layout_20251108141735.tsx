
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { GoogleTagManager } from '@next/third-parties/google';
import Script from 'next/script';
import ChatbotButton from "@/components/ChatbotButton";
import { GoogleTagManager } from '@next/third-parties/google';
import Script from 'next/script';

const BOTPRESS_ID = "mariadevsierra-bot"; // Usar el ID literal o de la variable de entorno
const botpressConfig = {
    hostUrl: `https://electricfinder.es`, // CLAVE: Host final seguro
    botId: BOTPRESS_ID,
    disableFloatingButton: false, 
    containerWidth: '400px', 
    layout: 'floating',
};


export default async function RootLayout({ children }: { children: React.ReactNode })  {
  return (
    <html lang="es" className="!scroll-smooth">
      {/* 1. INYECTAR LA CONFIGURACIÓN ANTES DE TODO */}
      <Script id="bp-config-global" strategy="beforeInteractive" 
        dangerouslySetInnerHTML={{
            __html: `window.botpressWebChat = ${JSON.stringify(botpressConfig)};`,
        }}
      />
      
      <GoogleTagManager gtmId="GTM-M757BHQP" />
      <body className="flex flex-col min-h-screen bg-white">
        {/* ... (Header, main, Footer) ... */}
        <ChatbotButton /> {/* <-- El componente solo se encarga de llamar al script */}
      </body>
    </html>
  );
}

export const metadata = {
  title: {
    template: '%s | María Sierra Sánchez', 
    default: 'Consultoría Digital y Desarrollo Web a Medida', 
  },
  description: 'Transformación digital real para PYMES, desde la estrategia hasta la implementación técnica con React y Node.js.',
};

export default async function RootLayout({ children }: { children: React.ReactNode })  {
  return (
    <html lang="es" className="!scroll-smooth">
      <GoogleTagManager gtmId="GTM-M757BHQP" />
      <body className="flex flex-col min-h-screen bg-white">
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
        <ChatbotButton />
      </body>
    </html>
  );
}