
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { GoogleTagManager } from '@next/third-parties/google';
import Script from 'next/script';
import BotpressChat from "@/components/BotpressChat";
export default function Chatbot() {
  return (
    <>
      {/* El componente Script ya está disponible globalmente en el scope de Next.js.
        Reemplaza 217.154.1.200 con tu IP pública REAL de IONOS.
      */}
      <Script 
        src="http://217.154.1.200:3000/assets/modules/channel-web/inject.js" 
        strategy="lazyOnload"
      />
    </>
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
        <Chatbot /> {}
      </body>
    </html>
  );
}