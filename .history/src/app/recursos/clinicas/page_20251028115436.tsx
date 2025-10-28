import React from 'react';
import DirectBookingCTA from '@/components/DirectBookingCTA'; 
// Asumiendo que sus estilos globales controlan el layout

// Contenido estático del checklist y el roadmap conciso
const DENTAL_CHECKLIST = [
  "Migre los recordatorios de citas de llamadas a WhatsApp/Email automatizado.",
  "Habilite la reserva y cancelación online con un sistema sincronizado.",
  "Digitalice la ficha de bienvenida y el consentimiento informado (tablet/web).",
  "Implemente un chatbox inteligente en la web para FAQs.",
  "Revise su política de privacidad (LOPD/GDPR) para la gestión de datos.",
];

const ClinicasRoadmapPage: React.FC = () => {
  // Reemplace esta URL con su enlace real de Calendly/Booking para clínicas
  const CALENDLY_URL = "https://calendar.app.google/CSXaPE9KDUxmmrin8"; 

  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <header className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-4">
          Roadmap 2025: Cómo Dejar de Perder 1 Hora Diaria en Gestión y Enfocarse en la Clínica.
        </h1>
        <p className="text-xl text-gray-600">
          La guía gratuita para automatizar su clínica sin dolores de cabeza.
        </p>
      </header>

      {/* CTA de Alto Valor (al inicio) */}
      <DirectBookingCTA 
        bookingUrl={CALENDLY_URL}
        serviceDescription="Auditoría Estratégica Gratuita para Clínicas Dentales"
      />

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-2">
          ✅ Checklist de Implementación Inmediata
        </h2>
        <p className="mb-6 text-lg text-gray-700">
          Empiece hoy mismo con estas 5 acciones que liberarán tiempo a su personal:
        </p>
        <ul className="list-disc list-inside space-y-3 text-lg text-gray-700 pl-4">
          {DENTAL_CHECKLIST.map((item, index) => (
            <li key={index} className="font-medium">{item}</li>
          ))}
        </ul>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-2">
          Resumen del Proceso de Automatización (4 Fases)
        </h2>
        <p className="text-lg text-gray-700">
          La automatización Full Stack debe seguir un camino lógico y seguro. Le mostramos las fases, pero la solución técnica individual la definimos en nuestra reunión:
        </p>
        <ol className="list-decimal list-inside space-y-4 text-lg text-gray-700 pl-4 mt-4">
            <li>
                <strong>Diagnóstico de Flujo:</strong> Identificación precisa de las horas perdidas semanalmente en tareas manuales.
            </li>
            <li>
                <strong>Planificación del MVP:</strong> Diseño de un Portal de Paciente (MVP) que automatice la gestión de citas y documentos.
            </li>
            <li>
                <strong>Ejecución Full Stack:</strong> Integración segura de su web (front-end) con su sistema de gestión (back-end) para sincronización de datos.
            </li>
            <li>
                <strong>Medición del Ahorro:</strong> Definición de KPIs para cuantificar cuánto tiempo y dinero ha ahorrado.
            </li>
        </ol>
      </section>

      {/* CTA de Alto Valor (al final) */}
      <DirectBookingCTA 
        bookingUrl={CALENDLY_URL}
        serviceDescription="Deje de posponer la eficiencia. Hablemos de su Roadmap."
      />
    </div>
  );
};

export default ClinicasRoadmapPage;