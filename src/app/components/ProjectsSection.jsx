'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Github, ExternalLink, ArrowRight } from 'lucide-react'

const projects = [
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
]

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
    <div className="min-h-screen bg-[#F5F5F0] py-16 px-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="container mx-auto"
      >
        <h1 className="text-3xl md:text-4xl font-bold text-center text-[#333] mb-12">
          Mis Proyectos
        </h1>

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-8"
        >
          {projects.map((project) => (
            <motion.div
              key={project.id}
              variants={item}
              className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-900"
            >
              <div className="relative h-48 sm:h-56 lg:h-64 xl:h-72 overflow-hidden group">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                />
              </div>

              <div className="p-6">
                <h3 className="text-lg md:text-xl font-semibold text-[#333] mb-2">{project.title}</h3>
                <p className="text-sm md:text-base text-[#666] mb-4">{project.description}</p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 text-xs md:text-sm bg-[#A78BFA] text-white rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex justify-between items-center">
                  <div className="space-x-2">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center px-3 py-2 text-sm bg-[#333] text-white rounded-lg hover:bg-[#444] transition-colors"
                    >
                      <Github size={18} className="mr-2" />
                      GitHub
                    </a>
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center px-3 py-2 text-sm bg-[#A78BFA] text-white rounded-lg hover:bg-[#9061F9] transition-colors"
                    >
                      <ExternalLink size={18} className="mr-2" />
                      Demo
                    </a>
                  </div>
                  
                  <Link
                    href={`/proyecto/${project.id}`}
                    className="inline-flex items-center text-[#A78BFA] hover:text-[#9061F9] transition-colors"
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
