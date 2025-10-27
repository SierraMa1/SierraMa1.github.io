"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";

// 1. DEFINE EL TIPO DE TU OBJETO PROJECT
type Project = {
  id: number;
  title: string;
  image: string;
  description: string;
  detailedDescription: {
    contexto: string;
    retos: string[];
    soluciones: string[];
  };
  results?: {
    metric?: string;
    description: string;
  }[];
  technologies: string[];
};

// 2. APLICA EL TIPO A  PROPS
const ProjectDetailsClient = ({ project }: { project: Project | undefined }) => {
  if (!project) {
    return <div>Proyecto no encontrado.</div>;
  }

  // Extrae la data de tu estructura
  const { detailedDescription, results, technologies } = project;

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 sm:px-8 py-24">
        
        {/* Encabezado */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-6xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
            {project.title}
          </h1>
          <p className="text-xl text-gray-400">Caso de Éxito: Transformación Digital</p>
        </div>

        {/* Imagen Principal */}
        <div className="mb-12 rounded-lg overflow-hidden shadow-2xl">
          <Image
            src={project.image}
            alt={`Imagen de ${project.title}`}
            width={1200}
            height={600}
            className="w-full object-cover"
          />
        </div>

        {/* Sección de Resultados Clave */}
        {results && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center mb-16">
            {results.map((result, index) => (
              <div key={index} className="bg-gray-800 p-6 rounded-lg">
                {result.metric ? (
                  <p className="text-5xl font-bold text-blue-400 mb-2">{result.metric}</p>
                ) : null}
                <p className="text-gray-300">{result.description}</p>
              </div>
            ))}
          </div>
        )}

        {/* Detalle del Caso de Éxito */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">
          {/* Columna Izquierda: Detalles */}
          <div className="lg:col-span-3">
            <div className="mb-10">
              <h2 className="text-3xl font-bold mb-4 border-l-4 border-blue-500 pl-4">Contexto</h2>
              <p className="text-gray-300 leading-relaxed">{detailedDescription.contexto}</p>
            </div>
             <div className="mb-10">
              <h2 className="text-3xl font-bold mb-4 border-l-4 border-blue-500 pl-4">Los Retos</h2>
              <ul className="list-disc list-inside space-y-2 text-gray-300 leading-relaxed">
                {detailedDescription.retos.map((item, index) => <li key={index}>{item}</li>)}
              </ul>
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-4 border-l-4 border-blue-500 pl-4">Las Soluciones</h2>
              <ul className="list-disc list-inside space-y-2 text-gray-300 leading-relaxed">
                {detailedDescription.soluciones.map((item, index) => <li key={index}>{item}</li>)}
              </ul>
            </div>
          </div>
          {/* Columna Derecha: Tecnologías y CTA */}
          <div className="lg:col-span-2 bg-gray-800 p-8 rounded-lg self-start">
            <h3 className="text-2xl font-bold mb-4">Tecnologías Clave</h3>
            <div className="flex flex-wrap gap-3 mb-8">
              {technologies.map((tech, index) => (
                <span key={index} className="bg-gray-700 text-gray-200 px-3 py-1 rounded-full text-sm">
                  {tech}
                </span>
              ))}
            </div>
            <h3 className="text-2xl font-bold mb-4">¿Hablamos de tu proyecto?</h3>
            <p className="text-gray-300 mb-6">
              Descubre cómo mi enfoque estratégico y técnico puede impulsar tu negocio.
            </p>
            <Link href="/#contact" legacyBehavior>
              <a className="inline-block w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-300">
                Contactar Ahora
              </a>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProjectDetailsClient;