'use client';

import { useState, useEffect, useRef } from 'react';
import Script from 'next/script';
import { MessageCircle, X, Send } from 'lucide-react';
import { CONTACT_EMAIL } from '@/constants/links';

const BOTPRESS_IP = process.env.NEXT_PUBLIC_BOTPRESS_IP || 'localhost';
const BOTPRESS_PORT = process.env.NEXT_PUBLIC_BOTPRESS_PORT || '3000';
const BOTPRESS_ID = process.env.NEXT_PUBLIC_BOTPRESS_ID || 'dev-bot';

const protocol = BOTPRESS_PORT === '443' ? 'https' : 'http';
const portSuffix = BOTPRESS_PORT === '443' || BOTPRESS_PORT === '80' ? '' : `:${BOTPRESS_PORT}`;
const BOTPRESS_HOST = `${protocol}://${BOTPRESS_IP}${portSuffix}`;
const SCRIPT_SRC = `${BOTPRESS_HOST}/assets/modules/channel-web/inject.js`;

const isDev = process.env.NODE_ENV === 'development';

type ChatMessage = { role: 'user' | 'assistant'; content: string };

function FallbackChat({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'assistant', content: '¡Hola! Soy el asistente de María. ¿En qué puedo ayudarte?' },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const endRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;
    const userMsg: ChatMessage = { role: 'user', content: input };
    setMessages((m) => [...m, userMsg]);
    setInput('');
    setLoading(true);
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...messages, userMsg] }),
      });
      const data = (await res.json()) as { response?: string; error?: string };
      setMessages((m) => [
        ...m,
        { role: 'assistant', content: data.response || data.error || 'No pude responder.' },
      ]);
    } catch {
      setMessages((m) => [
        ...m,
        {
          role: 'assistant',
          content: 'Error de conexión. Puedes escribirme a ' + CONTACT_EMAIL,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-24 right-6 z-[9999] w-80 sm:w-96 h-[28rem] rounded-xl bg-white shadow-2xl flex flex-col border border-gray-200">
      <div className="flex items-center justify-between p-3 bg-violet-600 text-white rounded-t-xl">
        <span className="font-semibold">Asistente Virtual</span>
        <button type="button" onClick={onClose} className="p-1 rounded-full hover:bg-violet-700" aria-label="Cerrar">
          <X size={20} />
        </button>
      </div>
      <div className="flex-1 p-4 overflow-y-auto">
        <div className="flex flex-col gap-3">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`p-2 rounded-lg max-w-[85%] whitespace-pre-wrap text-sm ${
                msg.role === 'assistant' ? 'bg-gray-100 text-gray-900 self-start' : 'bg-violet-500 text-white self-end'
              }`}
            >
              {msg.content}
            </div>
          ))}
          {loading && (
            <div className="p-2 rounded-lg max-w-[85%] bg-gray-100 self-start text-sm text-gray-500">Escribiendo...</div>
          )}
          <div ref={endRef} />
        </div>
      </div>
      <form onSubmit={handleSubmit} className="p-3 border-t border-gray-200 flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Escribe tu mensaje..."
          disabled={loading}
          className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 disabled:bg-gray-100"
        />
        <button
          type="submit"
          disabled={loading}
          className="p-2 rounded-lg bg-violet-600 text-white hover:bg-violet-700 disabled:opacity-50"
          aria-label="Enviar"
        >
          <Send size={20} />
        </button>
      </form>
    </div>
  );
}

export default function ChatbotButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [isBotReady, setIsBotReady] = useState(false);
  const [scriptFailed, setScriptFailed] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => {
      if (!isBotReady && !scriptFailed) setScriptFailed(true);
    }, 5000);
    return () => clearTimeout(t);
  }, [isBotReady, scriptFailed]);

  const handleScriptLoad = () => {
    if (typeof window !== 'undefined' && window.botpressWebChat) {
      try {
        window.botpressWebChat.init({
          hostUrl: BOTPRESS_HOST,
          botId: BOTPRESS_ID,
          hideWidget: false,
          showPoweredBy: false,
          botName: 'Asistente Virtual',
          botConversationDescription: '¿En qué puedo ayudarte?',
          locale: 'es',
          useSessionStorage: false,
          enableConversationDeletion: true,
        });
        setIsBotReady(true);
        setTimeout(() => {
          window.botpressWebChat?.sendEvent({ type: 'hide' });
        }, 100);
      } catch (err) {
        if (isDev) console.error('Error al inicializar Botpress:', err instanceof Error ? err.message : err);
        setScriptFailed(true);
      }
    } else {
      setScriptFailed(true);
    }
  };

  const handleScriptError = () => {
    setScriptFailed(true);
    if (isDev) {
      console.warn(
        'No se pudo cargar Botpress. Comprueba que el servidor esté en marcha y que NEXT_PUBLIC_BOTPRESS_* esté configurado. Se usará el chat de respaldo.'
      );
    }
  };

  const toggleChat = () => {
    if (isBotReady && typeof window !== 'undefined' && window.botpressWebChat) {
      try {
        if (isOpen) {
          window.botpressWebChat.sendEvent({ type: 'hide' });
          setIsOpen(false);
        } else {
          window.botpressWebChat.sendEvent({ type: 'show' });
          setIsOpen(true);
        }
      } catch (err) {
        if (isDev) console.error('Error al abrir/cerrar Botpress:', err instanceof Error ? err.message : err);
        setScriptFailed(true);
        setIsOpen(true);
      }
    } else {
      setIsOpen((prev) => !prev);
    }
  };

  useEffect(() => {
    if (!isBotReady || !isOpen) return;
    const widget = document.querySelector('#bp-web-widget') as HTMLElement | null;
    const iframe = document.querySelector('#bp-widget') as HTMLElement | null;
    if (widget) {
      widget.style.display = 'block';
      widget.style.visibility = 'visible';
      widget.style.opacity = '1';
      widget.style.position = 'fixed';
      widget.style.bottom = '20px';
      widget.style.right = '90px';
      widget.style.zIndex = '9999';
      widget.style.width = '400px';
      widget.style.height = '650px';
      widget.style.maxHeight = 'calc(100vh - 40px)';
      if (iframe) {
        iframe.style.display = 'block';
        iframe.style.visibility = 'visible';
        iframe.style.width = '100%';
        iframe.style.height = '100%';
      }
    }
    if (!isOpen && widget) widget.style.display = 'none';
  }, [isOpen, isBotReady]);

  const useFallback = scriptFailed || (!isBotReady && isOpen);
  const buttonEnabled = isBotReady || scriptFailed;

  return (
    <>
      <Script src={SCRIPT_SRC} strategy="afterInteractive" onLoad={handleScriptLoad} onError={handleScriptError} />

      {useFallback && <FallbackChat isOpen={isOpen} onClose={() => setIsOpen(false)} />}

      <button
        type="button"
        onClick={toggleChat}
        disabled={!buttonEnabled}
        className={`fixed bottom-6 right-6 z-[10000] flex h-14 w-14 items-center justify-center rounded-full bg-violet-600 text-white shadow-lg transition-transform hover:scale-110 ${
          !buttonEnabled ? 'opacity-50 cursor-wait' : ''
        }`}
        aria-label={isOpen ? 'Cerrar chat' : 'Abrir chat'}
        title={!buttonEnabled ? 'Cargando chatbot...' : isOpen ? 'Cerrar chat' : 'Abrir chat'}
      >
        {isOpen ? <X size={28} /> : <MessageCircle size={28} />}
      </button>

      <style jsx global>{`
        #bp-web-widget {
          z-index: 9999 !important;
        }
        #bp-web-widget > div:first-child {
          display: none !important;
        }
        #bp-widget {
          border: none !important;
          border-radius: 12px !important;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3) !important;
        }
      `}</style>
    </>
  );
}
