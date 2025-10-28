import React from 'react';
import DirectBookingCTA from '@/components/DirectBookingCTA'; 

// ----------------------------------------------------
// 1. CONSTANTES ESPECÍFICAS PARA EL NICHO DE EMPRESAS TECH
// ----------------------------------------------------
const TECH_CHECKLIST = [
  "No puede migrar a nuevas versiones de frameworks por miedo a romper todo el sistema.",
  "Su plataforma no tiene pruebas automatizadas (Testing Unitario/E2E).",
  "Dos equipos diferentes usan tecnologías incompatibles para el mismo fin.",
  
];

const GOOGLE_CALENDAR_URL = "SU_ENLACE_DE_CALENDAR_PARA_TECH_AQUI"; 


const TechRoadmapPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <header className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
          Roadmap 2025: Cómo Identificar y Eliminar la Deuda Técnica que Frena su Time-to-Market.
        </h1>
        <p className="text-xl text-gray-600">
          La guía para CTOs y CEOs que buscan la eficiencia máxima y escalar sin frenos.
        </p>
      </header>

      {/* CTA de Alto Valor (al inicio) */}
      <DirectBookingCTA 
        bookingUrl={GOOGLE_CALENDAR_URL}
        serviceDescription="Auditoría Estratégica Gratuita: Revisión de Deuda Técnica"
      />

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 border-b pb-2">
          ✅ Checklist de Identificación de Deuda Técnica
        </h2>
        <p className="mb-6 text-lg text-gray-700">
          Si su empresa cumple dos o más puntos, la deuda técnica está consumiendo su presupuesto:
        </p>
        <ul className="list-disc list-inside space-y-3 text-lg text-gray-700 pl-4">
          {TECH_CHECKLIST.map((item, index) => (
            <li key={index} className="font-medium">{item}</li>
          ))}
        </ul>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 border-b pb-2">
          Resumen del Proceso de Optimización (4 Fases)
        </h2>
        <p className="text-lg text-gray-700">
          Fusionamos consultoría de procesos con desarrollo Full Stack para una transformación real:
        </p>
        <ol className="list-decimal list-inside space-y-4 text-lg text-gray-700 pl-4 mt-4">
            <li>
                <strong>Auditoría de Coste:</strong> Cuantificación del tiempo/dinero que la deuda técnica le está costando en horas de mantenimiento.
            </li>
            <li>
                <strong>Roadmap de Migración:</strong> Planificación de la refactorización o migración progresiva (ej. a microservicios) sin paralizar la operación.
            </li>
            <li>
                <strong>Implementación DevOps:</strong> Configuración de flujos CI/CD para automatizar testing y despliegue, reduciendo el Time-to-Market.
            </li>
            <li>
                <strong>Métricas de Velocidad:</strong> Definición de KPIs para medir la eficiencia del equipo y la velocidad del despliegue en tiempo real.
            </li>
        </ol>
      </section>

      {/* CTA de Alto Valor (al final) */}
      <DirectBookingCTA 
        bookingUrl={GOOGLE_CALENDAR_URL}
        serviceDescription="Ser tecnológico no es ser óptimo. Hablemos de su Plan de Aceleración."
      />
    </div>
  );
};

export default TechRoadmapPage;