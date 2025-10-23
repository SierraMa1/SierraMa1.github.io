import { Metadata } from 'next';
import { projectsData } from '@/data/projects';
import ProjectDetailsClient from './ProjectDetailsClient';

// 1. Este tipo es correcto
type PageParams = {
  id: string;
};

// ===================================================
// 2. generateMetadata (CORREGIDO)
// ===================================================
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

// 3. Esta se queda SIN 'async' (está bien)
export function generateStaticParams() {
  return projectsData.map((project) => ({
    id: project.id.toString(),
  }));
}

// 4. Esta se queda SIN 'async' (está bien)
function getProjectById(id: string) {
  return projectsData.find((project) => project.id === parseInt(id));
}

// ===================================================
// 5. ProjectPage (default export) (CORREGIDO)
// ===================================================
export default async function ProjectPage({ params }: { params: Promise<PageParams> }) {
  
  // Primero haz await a params
  const { id } = await params; // <-- Esta era tu línea 56

  const project = getProjectById(id);

  return <ProjectDetailsClient project={project} />;
}