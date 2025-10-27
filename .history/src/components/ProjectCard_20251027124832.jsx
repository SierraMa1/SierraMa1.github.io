'use client';

import Link from 'next/link';
import Image from 'next/image';
// Import todos los iconos que vamos a necesitar
import { Stethoscope, Lightbulb, BrainCircuit, Target, ArrowRight } from 'lucide-react';

// Mapa para asociar el texto con el componente del icono
const iconMap = {
  Stethoscope,
  Lightbulb,
  BrainCircuit,
  Target,
};

// Componente auxiliar para renderizar el icono correcto
const RenderIcon = ({ name, ...props }) => {
  const IconComponent = iconMap[name];
  if (!IconComponent) return null;
  return <IconComponent {...props} />;
};


// Componente ProjectCard que recibe el objeto 'project' completo
export default function ProjectCard({ project }) {
  return (
    <Link href={`/projects/${project.id}`} className="group mb-8 flex flex-col overflow-hidden rounded-lg border border-gray-200 shadow-sm transition-all hover:shadow-lg md:flex-row">
      
      {/* Columna de la Imagen */}
      <div className="relative h-48 w-full md:h-auto md:w-1/3">
        <Image
          src={project.image}
          alt={`Imagen de ${project.title}`}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Columna del Contenido */}
      <div className="flex flex-1 flex-col justify-between p-6">
        <div>
          <div className="mb-4 flex items-center">
            {/* RenderIcon para mostrar el icono dinámicamente */}
            <div className="mr-4 rounded-full bg-violet-100 p-3">
              <RenderIcon name={project.icon} className="h-6 w-6 text-violet-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">{project.title}</h3>
          </div>
          <p className="mb-4 text-gray-600">{project.description}</p>
        </div>
        <div className="inline-flex items-center font-semibold text-violet-600 transition-transform group-hover:translate-x-1">
          Ver detalles
          <ArrowRight size={16} className="ml-1" />
        </div>
      </div>
    </Link>
  );
}