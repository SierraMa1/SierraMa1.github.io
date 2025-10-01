import { projectsData } from '@/data/projects';
import ProjectDetailsClient from './ProjectDetailsClient';
import { Metadata } from 'next';

export async function generateMetadata({ params }): Promise<Metadata> {
  const resolvedParams = await params;
  const { id } = resolvedParams;
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

// El componente DEBE ser 'async' para poder usar 'await'
export default async function ProjectPage({ params }) {
  //  Resolvemos la promesa de 'params' antes de usarla.
  const resolvedParams = await params;
  
  // Ahora usamos el objeto resuelto para obtener el id.
  const { id } = resolvedParams;
  const project = getProjectById(id);

  return <ProjectDetailsClient project={project} />;
}