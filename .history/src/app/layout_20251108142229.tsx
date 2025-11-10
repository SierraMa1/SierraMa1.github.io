// app/layout.tsx
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { GoogleTagManager } from '@next/third-parties/google';
import ChatbotButton from "@/components/ChatbotButton"; 


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
        <ChatbotButton /> {/* <-- El componente que tiene el cerebro de Botpress */}
      </body>
    </html>
  );
}