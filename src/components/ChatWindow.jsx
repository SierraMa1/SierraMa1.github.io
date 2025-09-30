
'use client'
import { X, Send } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

export default function ChatWindow({ isOpen, onClose }) {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: '¡Hola! Soy el asistente virtual de María. ¿En qué puedo ayudarte?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (input.trim() === '' || isLoading) return;
    const userMessage = { role: 'user', content: input };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages }),
      });
      if (!response.ok) throw new Error('Respuesta del servidor no fue OK');
      const data = await response.json();
      const botMessage = { role: 'assistant', content: data.response };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error("Error al contactar la API:", error);
      const errorMessage = { role: 'assistant', content: 'Lo siento, he tenido un problema para responder.Estoy preparandome para darte las mejores respuestas sobre mí. Inténtalo de nuevo más tarde.' };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-24 right-6 z-50 w-80 h-96 rounded-lg bg-white shadow-xl flex flex-col">
      <div className="flex items-center justify-between p-3 bg-violet-600 text-white rounded-t-lg">
        <h3 className="font-semibold">Asistente Virtual</h3>
        <button onClick={onClose} className="hover:bg-violet-700 p-1 rounded-full"><X size={20} /></button>
      </div>
      <div className="flex-grow p-4 overflow-y-auto">
        <div className="flex flex-col space-y-3">
          {messages.map((msg, index) => (
            <div key={index} className={`p-2 rounded-lg max-w-[85%] whitespace-pre-wrap ${msg.role === 'assistant' ? 'bg-gray-200 self-start' : 'bg-violet-500 text-white self-end'}`}>
              {msg.content}
            </div>
          ))}
          {isLoading && <div className="p-2 rounded-lg max-w-[85%] bg-gray-200 self-start"><span className="animate-pulse">...</span></div>}
          <div ref={messagesEndRef} />
        </div>
      </div>
      <form onSubmit={handleSubmit} className="p-3 border-t border-gray-200 flex items-center space-x-2">
        <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Escribe tu pregunta..." disabled={isLoading} className="w-full rounded-md border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 disabled:bg-gray-100" />
        <button type="submit" disabled={isLoading} className="p-2 rounded-full bg-violet-600 text-white hover:bg-violet-700 disabled:bg-violet-300">
          <Send size={20} />
        </button>
      </form>
    </div>
  );
}