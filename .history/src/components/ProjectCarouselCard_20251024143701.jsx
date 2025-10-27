
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function ProjectCarouselCard({ project }) {
  return (
    <Link 
      href={`/projects/${project.id}`} 
      className="group relative block h-96 w-full overflow-hidden rounded-lg"
    >
      {/* Imagen de fondo */}
      <Image
        src={project.image}
        alt={`Imagen del proyecto ${project.title}`}
        fill
        className="object-cover transition-transform duration-300 group-hover:scale-105"
      />
      
      {/* Capa oscura para legibilidad */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>

      {/* Contenido de texto */}
      <div className="absolute bottom-0 left-0 p-6 text-white">
        <h3 className="mb-2 text-2xl font-bold">
          {project.title}
        </h3>
        <p className="mb-4 text-sm opacity-90">
          {project.description}
        </p>
        <div className="inline-flex items-center font-semibold text-white transition-transform group-hover:translate-x-1">
          Saber más
          <ArrowRight size={16} className="ml-1" />
        </div>
      </div>
    </Link>
  );
}