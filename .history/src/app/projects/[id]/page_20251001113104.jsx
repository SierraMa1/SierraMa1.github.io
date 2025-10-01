

import { projectsData } from '@/data/projects'; 

export function generateStaticParams() {
  return projectsData.map((project) => ({
    id: project.id.toString(), 
  }));
}




import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Github, ExternalLink, ArrowLeft, Zap, Target, PackageCheck } from 'lucide-react';

function getProjectById(id) {
  return projectsData.find((project) => project.id === parseInt(id));
}

export default function ProjectPage() {
  const params = useParams();
  const project = getProjectById(params.id);

  const handlePrivateLinkClick = (e) => {
    e.preventDefault();
    alert("Estos datos no son mostrados por privacidad de la consultoría.");
  };

  if (!project) {
    return (
      <div className="flex h-screen items-center justify-center">
        <h1 className="text-2xl font-bold">Proyecto no encontrado</h1>
      </div>
    );
  }

  const linkClassName = "inline-flex items-center justify-center px-5 py-2.5 text-base rounded-lg transition-colors font-semibold";
  const githubClassName = `${linkClassName} bg-gray-800 text-white hover:bg-gray-900`;
  const demoClassName = `${linkClassName} bg-violet-600 text-white hover:bg-violet-700`;

  return (
    <div className="bg-white py-12">
      <div className="container mx-auto max-w-4xl px-4">
        
        <Link href="/#proyectos" className="mb-8 inline-flex items-center text-violet-600 hover:text-violet-800 font-semibold transition-colors">
          <ArrowLeft size={18} className="mr-2" />
          Volver a todos los proyectos
        </Link>

        <h1 className="mb-2 text-4xl font-bold text-gray-900">{project.title}</h1>
        
        <div className="relative mb-8 h-96 w-full overflow-hidden rounded-lg shadow-lg mt-6">
          <Image src={project.image} alt={`Imagen de ${project.title}`} fill className="object-cover" />
        </div>
        
        {project.detailedDescription && (
          <div className="space-y-10">
            <div>
              <h2 className="flex items-center text-2xl font-semibold text-gray-800 mb-4">
                <Zap size={24} className="mr-3 text-violet-600" /> Contexto del Proyecto
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed">{project.detailedDescription.contexto}</p>
            </div>
            <div>
              <h2 className="flex items-center text-2xl font-semibold text-gray-800 mb-4">
                <Target size={24} className="mr-3 text-violet-600" /> Retos Principales
              </h2>
              <ul className="list-disc list-inside space-y-2 text-lg text-gray-700">
                {project.detailedDescription.retos.map((reto, index) => (
                  <li key={index}>{reto}</li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="flex items-center text-2xl font-semibold text-gray-800 mb-4">
                <PackageCheck size={24} className="mr-3 text-violet-600" /> Soluciones Propuestas
              </h2>
              <ul className="list-disc list-inside space-y-2 text-lg text-gray-700">
                {project.detailedDescription.soluciones.map((solucion, index) => (
                  <li key={index}>{solucion}</li>
                ))}
              </ul>
            </div>
          </div>
        )}

        <div className="mt-12 pt-8 border-t border-gray-200">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Tecnologías y Enlaces</h2>
            <div className="flex flex-wrap gap-3 mb-6">
                {project.technologies.map((tech) => (
                    <span key={tech} className="rounded-full bg-violet-100 px-4 py-2 text-sm font-medium text-violet-800">{tech}</span>
                ))}
            </div>
            <div className="flex gap-4">
                {project.github === 'private' ? (
                  <button onClick={handlePrivateLinkClick} className={githubClassName}>
                    <Github size={18} className="mr-2" />
                    Ver en GitHub
                  </button>
                ) : (
                  <a href={project.github} target="_blank" rel="noopener noreferrer" className={githubClassName}>
                    <Github size={18} className="mr-2" />
                    Ver en GitHub
                  </a>
                )}
                {project.demo === 'private' ? (
                  <button onClick={handlePrivateLinkClick} className={demoClassName}>
                    <ExternalLink size={18} className="mr-2" />
                    Ver Demo
                  </button>
                ) : (
                  <a href={project.demo} target="_blank" rel="noopener noreferrer" className={demoClassName}>
                    <ExternalLink size={18} className="mr-2" />
                    Ver Demo
                  </a>
                )}
            </div>
        </div>

      </div>
    </div>
  );
}