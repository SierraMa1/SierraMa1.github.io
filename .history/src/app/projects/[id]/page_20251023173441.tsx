// src/app/projects/[id]/page.tsx

// 1. NO importes 'PageProps' de 'next'. Esa línea debe desaparecer.
import { Metadata } from 'next';
import { projectsData } from '@/data/projects';
import ProjectDetailsClient from './ProjectDetailsClient';
import { notFound } from 'next/navigation';

// 2. Definimos 'PageProps' AQUÍ MISMO, con la forma correcta.
// Esto "pisará" cualquier tipo fantasma que esté dando problemas.
type PageProps = {
  params: { id: string };
  // searchParams?: { [key: string]: string | string[] | undefined }; // Descomenta si usas searchParams
};

// 3. Tu función generateMetadata (ya estaba bien)
// Nota: Esta función NO usa el tipo PageProps de arriba, tiene su propia definición
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

// 4. Tu función generateStaticParams (ya estaba bien)
export async function generateStaticParams() {
  return projectsData.map((project) => ({
    id: project.id.toString(),
  }));
}

// 5. Tu función getProjectById (ya estaba bien)
function getProjectById(id: string) {
  return projectsData.find((project) => project.id === parseInt(id));
}

// 6. TU PÁGINA, usando el tipo 'PageProps' que definimos en el paso 2
export default function ProjectPage({ params }: PageProps) {
  const { id } = params;
  const project = getProjectById(id);

  if (!project) {
    notFound();
  }

  return <ProjectDetailsClient project={project} />;
}