// NO LLEVA 'use client'. Este es el componente de SERVIDOR.

import { projectsData } from '@/data/projects';
import ProjectDetailsClient from './ProjectDetailsClient'; // <-- 1. Importamos el nuevo componente

// 2. La función de servidor se queda aquí
export async function generateStaticParams() {
  return projectsData.map((project) => ({
    id: project.id.toString(),
  }));
}

// 3. La función para obtener datos también se queda aquí
function getProjectById(id) {
  return projectsData.find((project) => project.id === parseInt(id));
}

// 4. Este es el componente principal de la página. Es ASÍNCRONO.
export default async function ProjectPage({ params }) {
  // Obtiene los datos en el servidor
  const project = getProjectById(params.id);

  // Renderiza el componente de cliente y le pasa los datos como un prop
  return <ProjectDetailsClient project={project} />;
}