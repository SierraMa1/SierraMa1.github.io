'use client';

import React, { useState, useEffect } from 'react';
// Importamos SÓLO 'projectsData', que sí existe
import { projectsData } from '@/data/projects'; 
import Link from 'next/link';
import { ArrowRight, Code, Database, Layout } from 'lucide-react';

// Habilidades y los "tags" de proyecto que activan
const skills = [
  { 
    name: 'Frontend', 
    icon: <Layout size={20} />,
    projects: ['React', 'Next.js', 'Tailwind', 'Swiper'] // Tags de proyectos
  },
  { 
    name: 'Backend', 
    icon: <Code size={20} />,
    projects: ['Node.js', 'API', 'TypeScript'] // Tags de proyectos
  },
  { 
    name: 'Datos y Estrategia', 
    icon: <Database size={20} />,
    projects: ['Consultoría', 'Estrategia', 'Negocio', 'Optimización'] // Tags de proyectos
  },
];

// --- Sub-componente para la tarjeta de proyecto ---
//  Uso 'any' ya que no tengo el tipo Project
function ProjectLinkCard({ project }: { project: any }) {
  return (
    <Link 
      href={`/projects/${project.id}`} 
      className="block p-4 bg-white dark:bg-gray-700 rounded-lg shadow-md hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors border border-gray-200 dark:border-gray-600"
    >
      <h4 className="font-bold text-violet-600 dark:text-violet-400">{project.title}</h4>
      <p className="text-sm text-gray-600 dark:text-gray-300">{project.description}</p>
    </Link>
  );
}

// --- Componente Principal ---
export default function SkillSection() {
  const [selectedSkill, setSelectedSkill] = useState(skills[0]); // Selecciona 'Frontend' por defecto
  
  // Uso 'any[]' en lugar de 'Project[]'
  const [allProjects, setAllProjects] = useState<any[]>([]);

  useEffect(() => {
    // Uso 'any[]'
    setAllProjects(projectsData as any[]);
  }, []);

  // Filtra los proyectos que coinciden con los tags de la habilidad seleccionada
  // Añado "project.tags &&" para asegurarnos de que el proyecto tiene tags antes de filtrarlos
  const highlightedProjects = allProjects.filter(project => 
    project.tags && selectedSkill.projects.some(skillTag => project.tags.includes(skillTag))
  );

  return (
    <section id="habilidades" className="w-full bg-gray-50 dark:bg-black py-20 lg:py-24">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-extrabold text-center text-gray-900 dark:text-white mb-4">
          Habilidades en Acción
        </h2>
        <p className="text-lg text-center text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto">
          Mis habilidades conectadas a proyectos reales. Haz clic en una habilidad para ver los proyectos donde la he aplicado.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Columna 1: Lista de Habilidades */}
          <div className="lg:col-span-1">
            <div className="flex flex-col gap-4">
              {skills.map((skill) => (
                <button
                  key={skill.name}
                  onClick={() => setSelectedSkill(skill)}
                  className={`
                    p-6 rounded-lg text-left transition-all duration-300 w-full border-2
                    ${selectedSkill.name === skill.name 
                      ? 'bg-violet-50 dark:bg-violet-900/50 border-violet-500 shadow-lg' 
                      : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
                    }
                  `}
                >
                  <div className="flex items-center gap-4">
                    <span className={`
                      flex-shrink-0 p-3 rounded-full
                      ${selectedSkill.name === skill.name 
                        ? 'bg-violet-600 text-white' 
                        : 'bg-gray-100 dark:bg-gray-700 text-violet-600 dark:text-violet-400'
                      }
                    `}>
                      {skill.icon}
                    </span>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">{skill.name}</h3>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Columna 2: Proyectos Destacados */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 min-h-[300px]">
              <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
                Proyectos con <span className="text-violet-600">{selectedSkill.name}</span>
              </h3>
              {highlightedProjects.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {highlightedProjects.map((project) => (
                    <ProjectLinkCard key={project.id} project={project} />
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 dark:text-gray-400">
                  No hay proyectos etiquetados con esta habilidad todavía.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}