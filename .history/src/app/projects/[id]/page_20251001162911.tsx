
import { Metadata } from 'next';
import { projectsData } from '@/data/projects';
import ProjectDetailsClient from './ProjectDetailsClient';

//  Definimos un tipo robusto para los props de la página.
type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

//  Usamos el tipo 'Props' aquí.
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = params; // Ya no necesitamos 'await' con los tipos correctos
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
// ✅ AÑADIMOS ESTA LÍNEA PARA DESACTIVAR LA REGLA DE ESLINT
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function ProjectPage({ params }: any) {
  const { id } = params;
  const project = getProjectById(id);

  return <ProjectDetailsClient project={project} />;
}