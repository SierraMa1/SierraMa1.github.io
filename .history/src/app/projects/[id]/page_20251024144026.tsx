import { Metadata } from 'next';
import { projectsData } from '@/data/projects';
import ProjectDetailsClient from './ProjectDetailsClient';


type PageParams = {
  id: string;
};


export async function generateMetadata({ params }: { params: Promise<PageParams> }): Promise<Metadata> {
  
  // Primero haz await a params
  const { id } = await params;
  
  const project = getProjectById(id);

  if (!project) {
    return {
      title: 'Proyecto no encontrado',
    };
  }

  return {
    title: `Caso de Estudio: ${project.title}`,
    description: project.description,
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


export default async function ProjectPage({ params }: { params: Promise<PageParams> }) {
  
  // Primero await a params
  const { id } = await params; 

  const project = getProjectById(id);

  return <ProjectDetailsClient project={project} />;
}