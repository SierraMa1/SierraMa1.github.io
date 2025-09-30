
'use client'
import { MessageCircle } from 'lucide-react';

export default function ChatbotButton() {
  const handleClick = () => {
    // Por ahora, solo mostrará una alerta. Más adelante abrirá el chat.
    alert('Próximamente: ¡Un chatbot con IA para responder tus preguntas!');
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-violet-600 text-white shadow-lg transition-transform hover:scale-110"
      aria-label="Abrir chat"
    >
      <MessageCircle size={28} />
    </button>
  );
}