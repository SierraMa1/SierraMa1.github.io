/import { projectsData } from '@/data/projects';
import ProjectDetailsClient from './ProjectDetailsClient';

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
  // ✅ CAMBIO CLAVE: Resolvemos la promesa de 'params' antes de usarla.
  const resolvedParams = await params;
  
  // Ahora usamos el objeto resuelto para obtener el id.
  const { id } = resolvedParams;
  const project = getProjectById(id);

  return <ProjectDetailsClient project={project} />;
}