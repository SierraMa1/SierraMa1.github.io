// src/app/projects/[id]/page.tsx

import { Metadata } from 'next';
import { projectsData } from '@/data/projects';
import ProjectDetailsClient from './ProjectDetailsClient';

// 1. Define el tipo de los parámetros para reutilizarlo
type PageParams = {
  id: string;
};

// 2. AÑADE EL TIPO a 'params' aquí
export async function generateMetadata({ params }: { params: PageParams }): Promise<Metadata> {
  const { id } = params;
  const project = getProjectById(id);

  if (!project) {
    return {
      title: 'Proyecto no encontrado',
    };
  }

  return {
    title: `Caso de Estudio: ${project.title}`,
    description: project.shortDescription,
  };
}

// 3. ASEGÚRATE de que 'async' no está aquí (como ya hiciste)
export function generateStaticParams() {
  return projectsData.map((project) => ({
    id: project.id.toString(),
  }));
}

// 4. AÑADE EL TIPO 'string' al 'id'
function getProjectById(id: string) {
  // parseInt() es correcto porque tus IDs en projectsData son números
  return projectsData.find((project) => project.id === parseInt(id));
}

// 5. AÑADE EL TIPO a 'params' en el componente de la página
export default async function ProjectPage({ params }: { params: PageParams }) {
  const { id } = params;
  const project = getProjectById(id);

  return <ProjectDetailsClient project={project} />;
}