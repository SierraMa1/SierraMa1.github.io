

import { projectsData } from '@/data/projects';
import ProjectDetailsClient from './ProjectDetailsClient';

export async function generateStaticParams() {
  return projectsData.map((project) => ({
    id: project.id.toString(),
  }));
}

// Esta función es síncrona porque solo busca en un array local.
function getProjectById(id) {
  return projectsData.find((project) => project.id === parseInt(id));
}

// El 'async' en el componente de página ya no es necesario.
export default function ProjectPage({ params }) {
  //  Extraemos 'id' del objeto params primero.
  const { id } = params; 
  
  // Luego, pasamos la variable 'id' (ya resuelta) a la función.
  const project = getProjectById(id);

  return <ProjectDetailsClient project={project} />;
}