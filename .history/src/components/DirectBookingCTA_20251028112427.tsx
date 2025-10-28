import React from 'react';

interface DirectBookingCTAProps {
  // URL de su Calendly o Booking. Lo pasará como prop para reutilizar.
  bookingUrl: string;
  // Texto que describe el servicio (personalizado por nicho)
  serviceDescription: string;
}

const DirectBookingCTA: React.FC<DirectBookingCTAProps> = ({ bookingUrl, serviceDescription }) => {
  return (
    <div className="bg-blue-600 text-white p-8 rounded-lg shadow-xl my-12 text-center">
      <h2 className="text-3xl font-bold mb-4">
        {serviceDescription}
      </h2>
      <p className="mb-6 text-lg">
        Analicemos su flujo de trabajo y le daremos el primer paso técnico en 15 minutos, sin compromiso.
      </p>
      
      <a
        href={bookingUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block bg-white text-blue-600 font-extrabold py-3 px-8 rounded-full text-xl hover:bg-gray-100 transition duration-300 transform hover:scale-105"
      >
        AGENDA TU AUDITORÍA ESTRATÉGICA GRATUITA (15 Min.)
      </a>
    </div>
  );
};

export default DirectBookingCTA;