// (Versión para depurar)
'use client'

import { useState, useEffect } from 'react';
import ProjectCard from './ProjectCard';
import { projectsData } from '@/data/projects';

export default function ProjectsSection() {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  return (
    <section id="proyectos" className="w-full bg-white py-20">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="text-4xl font-bold text-gray-900">Mis Proyectos</h2>
          <p className="mt-2 text-lg text-gray-600">
            Una selección de mis trabajos más recientes.
          </p>
        </div>
        <div>
          {hasMounted && projectsData.map((project) => (
            <ProjectCard
              key={project.id}
              id={project.id}
              title={project.title}
            />
          ))}
        </div>
      </div>
    </section>
  );
}