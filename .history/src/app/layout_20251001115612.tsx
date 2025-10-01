
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot"; 

export const metadata = {
  title: "María Sierra Sánchez | Desarrolladora Web",
  description: "Portfolio de María Sierra Sánchez, Desarrolladora Web Full Stack.",
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