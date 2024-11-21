import Image from 'next/image'
import Link from 'next/link'

const projects = [
  {
    id: 1,
    name: "Clínica Casasnovas",
    description: "Solución Web completa.",
    image: "/Clinica.jpg",
    technologies: ["Vue.js", "Tailwind CSS", "Node.js", "Express.js"]
  },
  {
    id: 2,
    name: "ElectricFinder",
    description: "Plataforma Web para conectar usuarios con electricistas, con acceso fácil y transparente.",
    image: "/proyecto2.jpg",
    technologies: ["React.js", "Node.js", "MySQL", "Tailwind CSS", "Supabase", "Postman", "Figma"]
  },
  {
    id: 3,
    name: "Proyecto 3",
    description: "Descripción breve del proyecto 3.",
    image: "/proyecto3.jpg",
    technologies: ["HTML5", "CSS3", "JavaScript", "PHP"]
  },
  {
    id: 4,
    name: "Proyecto 4",
    description: "Descripción breve del proyecto 4.",
    image: "/proyecto4.jpg",
    technologies: ["React.js", "Express.js", "MongoDB", "Docker"]
  }
]

export default function ProjectsSection() {
  return (
    <section id='projects' className="mt-12 px-4 sm:px-6 lg:px-8 xl:px-12">
      <h2 className="text-2xl font-bold mb-6 text-[#333] text-center">
        Mis Proyectos
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
        {projects.map((project) => (
          <div
            key={project.id}
            className="bg-white border border-gray-200 rounded-lg p-4 shadow-xl flex flex-col justify-between"
          >
            <Image
              src={project.image}
              alt={`proyecto- ${project.id}`}
              width={300}
              height={200}
              className="w-full h-40 object-cover rounded-lg mb-4"
            />
            <h3 className="text-xl font-semibold mb-2 text-[#333]">
              {project.name}
            </h3>
            <p className="text-[#555] mb-4">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              {project.technologies.map((tech, index) => (
                <span key={index} className="bg-[#A78BFA] text-white text-xs px-2 py-1 rounded-full">
                  {tech}
                </span>
              ))}
            </div>
            <Link
              href={`/proyecto-${project.id}`}
              className="text-[#A78BFA] hover:text-[#7C3AED] transition-colors"
            >
              Ver más →
            </Link>
          </div>
        ))}
      </div>
    </section>
  )
}