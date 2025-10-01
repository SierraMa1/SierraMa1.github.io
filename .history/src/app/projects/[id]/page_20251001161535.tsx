// src/app/projects/[id]/page.tsx

import { Metadata } from 'next';
import { projectsData } from '@/data/projects';
import ProjectDetailsClient from './ProjectDetailsClient';

// 1. Definimos un tipo robusto para los props de la página.
type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

// 2. Usamos el tipo 'Props' aquí.
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = params; // Ya no necesitamos 'await' con los tipos correctos
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

export async function generateStaticParams() {
  return projectsData.map((project) => ({
    id: project.id.toString(),
  }));
}

function getProjectById(id: string) {
  return projectsData.find((project) => project.id === parseInt(id));
}

// Usamos el mismo tipo 'Props' también aquí.
export default function ProjectPage({ params }: Props) {
  const { id } = params;
  const project = getProjectById(id);

  return <ProjectDetailsClient project={project} />;
}