'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Github, ExternalLink, ArrowRight } from 'lucide-react'

 export const projects = [
  {
    id: 1,
    title: "Clínica Casasnovas",
    description: "Solución Web completa para clínica dental con sistema de citas y gestión de pacientes.",
    image: "/Clinica.jpg",
    github: "https://github.com/SierraMa1/ClinicaCasasnovas",
    demo: "https://www.clinicacasasnovas.com/",
    technologies: ["Vue.js", "Tailwind CSS", "Node.js", "Express.js"]
  },
  {
    id: 2,
    title: "ElectricFinder",
    description: "Plataforma Web para conectar usuarios con electricistas, con acceso fácil y transparente.",
    image: "/electricfinder.jpeg",
    github: "https://github.com/SierraMa1/ProyectoCFGS/",
    demo: "https://electricfinder-example.com",
    technologies: ["React.js", "MySQL", "Tailwind CSS", "Node.js+Express","Postman", "Figma","Canva","Docker","TablePlus",]
  },
];


export default function ProjectsSection() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  }

  return (
    <div className="min-h-screen bg-[#F5F5F0] py-8 px-4 sm:py-12 sm:px-6 lg:py-16 lg:px-8 3xl:py-24 3xl:px-16 relative">
     

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="container mx-auto"
      >
        <h1 className="text-2xl sm:text-3xl lg:text-4xl 3xl:text-5xl font-bold text-center text-[#333] mb-8 lg:mb-12">
          Mis Proyectos
        </h1>
  
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6 sm:gap-8 lg:gap-10 3xl:gap-12"
        >
          {projects.map((project) => (
            <motion.div
              key={project.id}
              variants={item}
              className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative h-40 sm:h-48 lg:h-52 xl:h-56 3xl:h-64 overflow-hidden group">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-contain transition-transform duration-300 group-hover:scale-110"
                />
              </div>

              {/* Detalles del Proyecto */}
              <div className="p-4 sm:p-5 lg:p-6 xl:p-6 3xl:p-6">
                <h3 className="text-lg sm:text-xl lg:text-xl xl:text-2xl 3xl:text-2xl font-semibold text-[#333] mb-2 xl:mb-3">
                  {project.title}
                </h3>
                <p className="text-sm sm:text-base lg:text-base xl:text-lg 3xl:text-lg text-[#666] mb-3 xl:mb-4">
                  {project.description}
                </p>

                {/* Tecnologías */}
                <div className="flex flex-wrap gap-2 mb-3 xl:mb-4">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 text-xs sm:text-sm lg:text-sm xl:text-base bg-[#A78BFA] text-white rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Botones */}
                <div className="flex justify-between items-center">
                  <div className="flex gap-2">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center px-3 py-2 text-xs sm:text-sm lg:text-sm xl:text-base bg-[#333] text-white rounded-lg hover:bg-[#444] transition-colors"
                    >
                      <Github size={18} className="mr-2" />
                      GitHub
                    </a>
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center px-3 py-2 text-xs sm:text-sm lg:text-sm xl:text-base bg-[#A78BFA] text-white rounded-lg hover:bg-[#9061F9] transition-colors"
                    >
                      <ExternalLink size={18} className="mr-2" />
                      Demo
                    </a>
                  </div>

                  <Link
                    href={`/projects/${project.id}`}
                    className="inline-flex items-center text-[#A78BFA] hover:text-[#9061F9] transition-colors px-2"
                  >
                    Ver más
                    <ArrowRight size={16} className="ml-1" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  )
}
