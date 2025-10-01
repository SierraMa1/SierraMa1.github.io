// src/app/projects/[id]/page.jsx

import { Metadata } from 'next'; // NUEVO: Importa Metadata
import { projectsData } from '@/data/projects';
import ProjectDetailsClient from './ProjectDetailsClient';

// NUEVO: Esta es la función para los metadatos
export async function generateMetadata({ params }): Promise<Metadata> {
  const { id } = params;
  const project = getProjectById(id); // Reutilizamos la misma función que ya tienes

  // Medida de seguridad por si no se encuentra el proyecto
  if (!project) {
    return {
      title: 'Proyecto no encontrado',
    };
  }

  return {
    title: `Caso de Estudio: ${project.title}`, // Aquí se crea el título dinámico
    description: project.shortDescription, // También puedes añadir una descripción dinámica
  };
}

export async function generateStaticParams() {
  return projectsData.map((project) => ({
    id: project.id.toString(),
  }));
}

function getProjectById(id) {
  return projectsData.find((project) => project.id === parseInt(id));
}

export default async function ProjectPage({ params }) {
  const { id } = params; // No necesitas hacer 'await params', Next.js lo resuelve.
  const project = getProjectById(id);

  return <ProjectDetailsClient project={project} />;
}