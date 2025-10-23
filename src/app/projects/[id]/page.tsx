// src/app/projects/[id]/page.tsx

import { Metadata } from 'next';
import { projectsData } from '@/data/projects';
import ProjectDetailsClient from './ProjectDetailsClient';

type PageParams = {
  id: string;
};

export function generateMetadata({ params }: { params: PageParams }): Promise<Metadata> {
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

export function generateStaticParams() {
  return projectsData.map((project) => ({
    id: project.id.toString(),
  }));
}

function getProjectById(id: string) {
  return projectsData.find((project) => project.id === parseInt(id));
}

export default function ProjectPage({ params }: { params: PageParams }) {
  const { id } = params;
  const project = getProjectById(id);

  return <ProjectDetailsClient project={project} />;
}