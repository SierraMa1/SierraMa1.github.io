
import React from 'react';

// Pequeños componentes para los iconos para mantener el código principal limpio
const StrategyIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
);

const BusinessIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m-1 4h1m6-4h1m-1 4h1m-1-4h1m-1-4h1" />
  </svg>
);

const CodeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
  </svg>
);


// Defino los datos de las tarjetas de servicios
const services = [
  {
    icon: <StrategyIcon />,
    title: "Consultoría de Transformación Digital",
    description: "Analizo a fondo tus procesos, cultura y tecnología para diseñar una hoja de ruta estratégica y viable. Ayudo a equipos directivos a tomar decisiones informadas para optimizar y hacer crecer el negocio."
  },
  {
    icon: <BusinessIcon />,
    title: "Digitalización Integral para PYMES",
    description: "Voy más allá de una simple web. Digitalizo flujos de trabajo completos, implemento herramientas de gestión a medida y capacito a tu equipo para asegurar una transición tecnológica exitosa y sin fricciones."
  },
  {
    icon: <CodeIcon />,
    title: "Desarrollo de Producto Digital",
    description: "Materializo ideas en productos funcionales. Construyo aplicaciones web, plataformas y MVPs utilizando tecnologías modernas como React y Node.js, con un enfoque 100% centrado en el usuario."
  }
];

// El componente principal que exportaremos
const Solutions = () => {
  return (
    <section id="solutions" className="py-20 bg-gray-50 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Cabecera de la sección */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-base font-semibold leading-7 text-blue-600">Mis Servicios</p>
          <h2 className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Conectando Estrategia y Tecnología
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Mi doble visión como estratega y desarrolladora me permite ofrecer soluciones integrales que generan un impacto real.
          </p>
        </div>

        {/* Grid con las tarjetas de servicio */}
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            {services.map((service) => (
              <div key={service.title} className="flex flex-col p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                  <div className="flex-none rounded-lg bg-blue-600 p-3 text-white">
                    {service.icon}
                  </div>
                  {service.title}
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">{service.description}</p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
};

export default Solutions;