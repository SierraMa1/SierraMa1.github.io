
import { projectsData } from '@/data/projects';
import ProjectDetailsClient from './ProjectDetailsClient'; 
// 2. La función de servidor
export async function generateStaticParams() {
  return projectsData.map((project) => ({
    id: project.id.toString(),
  }));
}

// función para obtener datos
function getProjectById(id) {
  return projectsData.find((project) => project.id === parseInt(id));
}

// Componente principal de la página. Es ASÍNCRONO.
export default async function ProjectPage({ params }) {
  // Obtiene los datos en el servidor
  const project = getProjectById(params.id);

  // Renderiza el componente de cliente y le pasa los datos como un prop
  return <ProjectDetailsClient project={project} />;
}