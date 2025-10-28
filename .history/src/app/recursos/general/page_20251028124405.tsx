import React from 'react';
import DirectBookingCTA from '@/components/DirectBookingCTA'; 

// ----------------------------------------------------
// 1. CONSTANTES ESPECÍFICAS PARA EL NICHO GENERAL
// ----------------------------------------------------
const GENERAL_CHECKLIST = [
  "Identifique el proceso manual que más le frustra o que tiene el mayor margen de error.",
  "Determine el presupuesto de tiempo y dinero que le cuesta actualmente el proceso (coste de ineficiencia).",
  "Revise si existe una herramienta comercial que resuelva el problema al 100% (casi nunca lo hace).",
  "Defina el objetivo: ¿Necesita automatización de datos, un portal a medida, o integración de sistemas existentes?",
  "Establezca el KPI (métrica) que usará para medir el éxito y el retorno de la inversión del proyecto.",
];

const GOOGLE_CALENDAR_URL_GENERAL = "SU_ENLACE_DE_CALENDAR_GENERAL_AQUI"; 
// ----------------------------------------------------


const GeneralRoadmapPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <header className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
          Roadmap 2025: Consultoría Estratégica y Desarrollo Full Stack para Desafíos Complejos.
        </h1>
        <p className="text-xl text-gray-600">
          Su problema es de ineficiencia de procesos. Mi solución es estratégica y Full Stack, aplicable a cualquier industria.
        </p>
      </header>

      {/* CTA de Alto Valor (al inicio) */}
      <DirectBookingCTA 
        bookingUrl={GOOGLE_CALENDAR_URL_GENERAL}
        serviceDescription="Auditoría Estratégica Gratuita para Proyectos Especiales"
      />

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 border-b pb-2">
          ✅ Checklist para Empezar a Transformar su Proceso
        </h2>
        <p className="mb-6 text-lg text-gray-700">
          Utilice estos 5 puntos para definir si su proceso es candidato a una automatización de alto impacto:
        </p>
        <ul className="list-disc list-inside space-y-3 text-lg text-gray-700 pl-4">
          {GENERAL_CHECKLIST.map((item, index) => (
            <li key={index} className="font-medium">{item}</li>
          ))}
        </ul>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 border-b pb-2">
          Resumen del Proceso 4-Fases (Aplicable a Cualquier Reto)
        </h2>
        <p className="text-lg text-gray-700">
          La metodología es la misma: definir el problema de negocio antes de escribir la primera línea de código:
        </p>
        <ol className="list-decimal list-inside space-y-4 text-lg text-gray-700 pl-4 mt-4">
            <li>
                <strong>Auditoría de Ineficiencia:</strong> Identificación del cuello de botella más costoso y la fuga de tiempo, sin importar su sector.
            </li>
            <li>
                <strong>Roadmap de Solución a Medida:</strong> Planificación de una solución de software a medida o integración Full Stack para resolver el problema de raíz.
            </li>
            <li>
                <strong>Ejecución y Adopción:</strong> Construcción del MVP, despliegue seguro y desarrollo de la estrategia de adopción para su equipo.
            </li>
            <li>
                <strong>Medición y ROI:</strong> Definición de las métricas clave para demostrar el retorno de la inversión y la mejora de la eficiencia.
            </li>
        </ol>
      </section>

      {/* CTA de Alto Valor (al final) */}
      <DirectBookingCTA 
        bookingUrl={GOOGLE_CALENDAR_URL_GENERAL}
        serviceDescription="No está solo. Hablemos de su problema específico en 15 minutos."
      />
    </div>
  );
};

export default GeneralRoadmapPage;