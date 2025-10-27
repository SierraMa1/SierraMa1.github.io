'use client';

import React, { useState } from 'react';
// Importamos los datos de tus proyectos (asegúrate de que la ruta sea correcta)
import { projectsData, type Project } from '@/data/projects'; 
import Link from 'next/link';
import { ArrowRight, Code, Database, Layout } from 'lucide-react';

// Definimos las habilidades que queremos mostrar y su "tag" (etiqueta)
// Este "tag" debe coincidir con las tecnologías que tienes en tu projectsData
const skills = [
  { name: 'React', tag: 'React', icon: <Layout size={20} /> },
  { name: 'Next.js', tag: 'Next.js', icon: <Layout size={20} /> },
  { name: 'Tailwind CSS', tag: 'Tailwind CSS', icon: <Layout size={20} /> },
  { name: 'Node.js', tag: 'Node.js', icon: <Database size={20} /> },
  { name: 'TypeScript', tag: 'TypeScript', icon: <Code size={20} /> },
  { name: 'Figma', tag: 'Figma', icon: <Layout size={20} /> },
];

export default function SkillSection() {
  // Estado para guardar la habilidad seleccionada
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);

  // Filtramos los proyectos que incluyen la habilidad seleccionada
  const filteredProjects = selectedSkill
    ? projectsData.filter(project => 
        project.technologies.includes(selectedSkill)
      )
    : projectsData; // Si no hay nada seleccionado, mostramos todos

  return (
    <section id="habilidades" className="w-full bg-gray-50 dark:bg-black py-20 lg:py-24">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-extrabold text-center text-gray-900 dark:text-white mb-4">
          Habilidades en Acción
        </h2>
        <p className="text-lg text-center text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto">
          Haz clic en una habilidad para ver los proyectos donde la he aplicado.
        </p>

        {/* Contenedor de botones de habilidades */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          <button
            onClick={() => setSelectedSkill(null)} // Botón para mostrar todos
            className={`font-semibold py-2 px-4 rounded-full transition-all duration-300 ${
              selectedSkill === null
                ? 'bg-violet-600 text-white shadow-lg'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            Todos los Proyectos
          </button>
          
          {skills.map((skill) => (
            <button
              key={skill.name}
              onClick={() => setSelectedSkill(skill.tag)}
              className={`flex items-center gap-2 font-semibold py-2 px-4 rounded-full transition-all duration-300 ${
                selectedSkill === skill.tag
                  ? 'bg-violet-600 text-white shadow-lg'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              {skill.icon}
              {skill.name}
            </button>
          ))}
        </div>

        {/* Contenedor de Proyectos Filtrados */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project) => (
              <Link 
                href={`/projects/${project.id}`} 
                key={project.id}
                className="group block bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
              >
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{project.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4 h-20 overflow-hidden">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.slice(0, 4).map((tech) => (
                      <span 
                        key={tech} 
                        className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${
                          selectedSkill === tech
                            ? 'bg-violet-200 text-violet-800' // Resaltado especial
                            : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200'
                        }`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <span className="font-semibold text-violet-600 dark:text-violet-400 flex items-center group-hover:gap-2 transition-all">
                    Ver caso de estudio <ArrowRight size={16} className="ml-1" />
                  </span>
                </div>
              </Link>
            ))
          ) : (
            <p className="text-center text-gray-500 dark:text-gray-400 md:col-span-2 lg:col-span-3">
              Actualmente no hay proyectos que muestren la habilidad "{selectedSkill}".
            </p>
          )}
        </div>

      </div>
    </section>
  );
}
