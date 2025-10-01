
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot"; 

export const metadata = {
  title: 'Consultoría Digital para PYMES y Desarrolladora Web | María Sierra Sánchez',
  description: 'Socia estratégica y técnica para la transformación digital de PYMES. Diseño la hoja de ruta y construyo las herramientas a medida para un impacto medible.',
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