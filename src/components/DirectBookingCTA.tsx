import React from 'react';

interface DirectBookingCTAProps {
  bookingUrl: string;
  serviceDescription: string;
}

const DirectBookingCTA: React.FC<DirectBookingCTAProps> = ({ bookingUrl, serviceDescription }) => {
  return (
    <div className="rounded-2xl border border-violet-500/30 bg-violet-950/30 p-10 my-12 text-center">
      <p className="text-sm font-semibold uppercase tracking-widest text-violet-400 mb-3">Sin compromiso · 15 minutos</p>
      <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 leading-tight">
        {serviceDescription}
      </h2>
      <p className="mb-8 text-gray-400 text-base max-w-xl mx-auto leading-relaxed">
        Analizamos tu flujo de trabajo juntos y te doy el primer paso técnico concreto. Gratis, sin presión y sin jerga.
      </p>
      <a
        href={bookingUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 rounded-full bg-violet-600 px-8 py-3.5 text-sm font-bold text-white shadow-lg shadow-violet-500/20 hover:bg-violet-700 hover:-translate-y-0.5 transition-all duration-200"
      >
        Reservar auditoría gratuita
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </a>
    </div>
  );
};

export default DirectBookingCTA;
