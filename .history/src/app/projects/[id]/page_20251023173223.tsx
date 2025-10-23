// src/app/projects/[id]/page.tsx

import { Metadata } from 'next';
import { projectsData } from '@/data/projects';
import ProjectDetailsClient from './ProjectDetailsClient';
import { notFound } from 'next/navigation';

type Props = {
  params: { id: string };
};

// Se elimina 'type Props' y se pone el tipo directamente en la función.
export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
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

export async function generateStaticParams() {
  return projectsData.map((project) => ({
    id: project.id.toString(),
  }));
}

function getProjectById(id: string) {
  return projectsData.find((project) => project.id === parseInt(id));
}



//  tipo 'Props' en lugar de 'any'
export default function ProjectPage({ params }: Props) {
  const { id } = params;
  const project = getProjectById(id);

  // Comprueba si el proyecto existe
  if (!project) {
    // Si no existe, muestra la página 404 de Next.js
    notFound();
  }

  // Si llegamos aquí, 'project' existe y se lo pasamos al cliente
  return <ProjectDetailsClient project={project} />;
}