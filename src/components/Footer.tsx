'use client';

import { useState, useEffect } from 'react';
import { Linkedin, Github, Mail, Copy, Check } from 'lucide-react';
import Image from 'next/image';
import { CONTACT_EMAIL, SOCIAL_LINKS } from '@/constants/links';
import { useSite } from '@/context/SiteContext';
import { translations } from '@/i18n/translations';

export default function Footer() {
  const [isCopied, setIsCopied] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);
  const currentYear = new Date().getFullYear();

  const { lang } = useSite();
  const t = translations[lang].footer;

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const copyToClipboard = async () => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(CONTACT_EMAIL);
      } else {
        const ta = document.createElement('textarea');
        ta.value = CONTACT_EMAIL;
        ta.style.position = 'fixed';
        ta.style.left = '-9999px';
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
      }
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Error al copiar el email: ', err);
    }
  };

  return (
    <footer className="relative w-full border-t border-gray-700">
      <div className="absolute inset-0 z-0">
        <Image
          src="/footer-bg1.png"
          alt="Fondo del footer"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black opacity-60"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-12 text-white">
        <h2 className="text-3xl font-bold mb-8 text-center">{t.hablemos}</h2>

        <div className="flex flex-col md:flex-row justify-center items-center space-y-6 md:space-y-0 md:space-x-10 mb-10">
          <div className="flex items-center space-x-3 font-medium text-gray-200">
            <Mail size={24} />
            <span>{CONTACT_EMAIL}</span>
            {hasMounted && (
              <button
                type="button"
                onClick={copyToClipboard}
                className="p-2 bg-violet-500/30 text-violet-300 rounded-full hover:bg-violet-500/50 transition-colors"
                aria-label={t.copyLabel}
              >
                {isCopied ? <Check size={16} /> : <Copy size={16} />}
              </button>
            )}
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-600 text-center">
          <div className="flex justify-center gap-6 mb-4">
            <a
              href={SOCIAL_LINKS.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin size={28} />
            </a>
            <a
              href={SOCIAL_LINKS.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
              aria-label="GitHub"
            >
              <Github size={28} />
            </a>
          </div>
          <p className="text-sm text-gray-400">
            &copy; {currentYear} María Sierra Sánchez. {t.createdBy}
          </p>
        </div>
      </div>
    </footer>
  );
}
