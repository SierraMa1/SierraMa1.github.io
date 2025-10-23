// src/app/projects/[id]/page.tsx

import { Metadata } from 'next';
import { projectsData } from '@/data/projects';
import ProjectDetailsClient from './ProjectDetailsClient';

// 1. Define el tipo
type PageParams = {
  id: string;
};

// 2. Esta SÍ es 'async'
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

// 3. Esta NO es 'async' (como ya lo tenías)
export function generateStaticParams() {
  return projectsData.map((project) => ({
    id: project.id.toString(),
  }));
}

// 4. Tipo explícito
function getProjectById(id: string) {
  return projectsData.find((project) => project.id === parseInt(id));
}

// 5. Esta NO es 'async' (AQUÍ ESTÁ EL CAMBIO)
export default function ProjectPage({ params }: { params: PageParams }) {
  const { id } = params;
  const project = getProjectById(id);

  return <ProjectDetailsClient project={project} />;
}