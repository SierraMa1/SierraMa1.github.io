import React from 'react';
import DirectBookingCTA from '@/components/DirectBookingCTA'; 


// ----------------------------------------------------
// 1. CONSTANTES ESPECÍFICAS PARA EL NICHO DE AGRICULTURA
// ----------------------------------------------------
const AGRICULTURA_CHECKLIST = [
  "Identifique 2 procesos manuales que le hacen perder dinero (Ej: Riego, Dosificación de fertilizante).",
  "Invierta en un sensor IoT para medir una sola variable crítica (Ej: Humedad del suelo).",
  "Desarrolle un dashboard simple (MVP) que muestre solo ese dato en rojo/verde.",
  "Defina un protocolo de acción inmediata basado en esa única métrica.",
  "Mida el ahorro en el primer mes para validar el ROI.",
];

const GOOGLE_CALENDAR_URL = "https://calendar.app.google/gwr2H7gugV3Kri3FA"; 


const AgriculturaRoadmapPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <header className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
          Roadmap 2026: Dejar de Ver la Tecnología como Imposición y Usarla para Ahorrar Recursos.
        </h1>
        <p className="text-xl text-gray-600">
          La guía para el agricultor que quiere controlar su explotación desde el móvil y optimizar sus costes.
        </p>
      </header>

      {/* CTA de Alto Valor (al inicio) */}
      <DirectBookingCTA 
        bookingUrl={GOOGLE_CALENDAR_URL}
        serviceDescription="Auditoría Estratégica Gratuita: Análisis de Ahorro y Recursos"
      />

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 border-b pb-2">
          ✅ Checklist de Implementación Inmediata
        </h2>
        <p className="mb-6 text-lg text-gray-700">
          Empiece a ver el ahorro en su próxima cosecha con estos 5 pasos de tecnología simple:
        </p>
        <ul className="list-disc list-inside space-y-3 text-lg text-gray-700 pl-4">
          {AGRICULTURA_CHECKLIST.map((item, index) => (
            <li key={index} className="font-medium">{item}</li>
          ))}
        </ul>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 border-b pb-2">
          Resumen del Proceso de Automatización Agrícola (4 Fases)
        </h2>
        <p className="text-lg text-gray-700">
          Nuestro proceso asegura que la tecnología sea una herramienta de rentabilidad, no una complicación:
        </p>
        <ol className="list-decimal list-inside space-y-4 text-lg text-gray-700 pl-4 mt-4">
            <li>
                <strong>Diagnóstico de Ahorro:</strong> Identificación del recurso clave que está generando la mayor pérdida (agua, fertilizante, energía).
            </li>
            <li>
                <strong>Planificación del MVP IoT:</strong> Diseño de un sistema de medición y visualización de datos mínimo viable (MVP) y accesible desde móvil.
            </li>
            <li>
                <strong>Ejecución Full Stack:</strong> Desarrollo de soluciones (Web Progresiva / Dashboards) que funcionen con baja conectividad, adaptadas a la realidad del campo.
            </li>
            <li>
                <strong>Medición del ROI:</strong> Definición de métricas para cuantificar el ahorro real en recursos por hectárea o por ciclo.
            </li>
        </ol>
      </section>

      {/* CTA de Alto Valor (al final) */}
      <DirectBookingCTA 
        bookingUrl={GOOGLE_CALENDAR_URL}
        serviceDescription="Deje de ver la tecnología como un gasto. Hablemos de su Plan de Ahorro."
      />
    </div>
  );
};

export default AgriculturaRoadmapPage;