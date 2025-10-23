// src/app/projects/[id]/page.tsx
import { Metadata } from 'next';
import { projectsData } from '@/data/projects';
import ProjectDetailsClient from './ProjectDetailsClient';
import { notFound } from 'next/navigation';


type PageProps = {
  params: { id: string };
  // searchParams?: { [key: string]: string | string[] | undefined }; // Descomenta si usas searchParams
};

/*export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
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

export default function ProjectPage({ params }: PageProps) {
  const { id } = params;
  const project = getProjectById(id);

  if (!project) {
    notFound();
  }

  return <ProjectDetailsClient project={project} />;
}