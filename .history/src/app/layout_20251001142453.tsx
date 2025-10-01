
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot"; 

export const metadata = {
  title: {
    template: '%s | María Sierra Sánchez', 
    default: 'Consultoría Digital y Desarrollo Web a Medida', 
  },
  description: 'Transformación digital real para PYMES, desde la estrategia hasta la implementación técnica con React y Node.js.',
};

export default function RootLayout({ children }: { children: React.ReactNode })  {
  return (
    <html lang="es" className="!scroll-smooth">
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