import React from 'react';
import Link from 'next/link';

const ResourceHubSection: React.FC = () => {
  const resources = [
    { 
      title: "Clínicas Dentales", 
      subtitle: "Deja de perder tiempo en gestión manual. Encuentra tu Roadmap de automatización.", 
      link: "/recursos/clinicas", 
      bgColor: "bg-blue-100", 
      textColor: "text-blue-800" 
    },
    { 
      title: "Agricultura PYME", 
      subtitle: "Ahorra recursos. Convierte las imposiciones tecnológicas en eficiencia real.", 
      link: "/recursos/agricultura", 
      bgColor: "bg-green-100", 
      textColor: "text-green-800" 
    },
    { 
      title: "Empresas Tecnológicas", 
      subtitle: "Identifica y elimina la Deuda Técnica que frena tu Time-to-Market.", 
      link: "/recursos/tech", 
      bgColor: "bg-purple-100", 
      textColor: "text-purple-800" 
    },
    { 
      title: "Otros Sectores & Proyectos Especiales", 
      subtitle: "Su problema es de procesos. Aplique la visión Full Stack a cualquier industria.", 
      link: "/recursos/general", 
      bgColor: "bg-yellow-100", 
      textColor: "text-yellow-800" 
    },
  ];

  return (
    <section id="recursos" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-4">
           Encuentra tu Roadmap
        </h2>
        <p className="text-xl text-center text-gray-600 mb-12">
          Mi visión dual (negocio y tecnología) se aplica a tu sector.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {resources.map((resource, index) => (
            <Link key={index} href={resource.link} className={`block p-6 rounded-xl shadow-lg hover:shadow-2xl transition duration-300 ${resource.bgColor}`}>
                <h3 className={`text-2xl font-bold mb-2 ${resource.textColor}`}>
                  {resource.title}
                </h3>
                <p className="text-gray-700 mb-4">{resource.subtitle}</p>
                <span className="text-sm font-semibold underline">
                  Ver Checklist y Auditoría Gratuita →
                </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ResourceHubSection;