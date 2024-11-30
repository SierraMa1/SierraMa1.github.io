'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Github, ExternalLink } from 'lucide-react';
import { useRouter } from 'next/navigation'; // Solo usamos esta fuente
import { projects } from '../../components/ProjectsSection'; // Ajusta la ruta según sea necesario
import { use } from 'react';


export default function ProjectDetail({ params }) {
  // Resolver `params` con React.use()
  const { id } = use(params);

  const project = projects.find(p => p.id === parseInt(id, 10));

  if (!project) {
    return <div>Proyecto no encontrado</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-16">
      <div className="container mx-auto px-4">
        <Link href="/ProjectsSection" className="inline-flex items-center text-purple-600 hover:text-purple-700 mb-8">
          <ArrowLeft className="mr-2" size={20} />
          Volver a proyectos
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl overflow-hidden shadow-xl"
        >
          <div className="relative h-96">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-contain"
            />
          </div>

          <div className="p-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{project.title}</h1>
            <p className="text-xl text-gray-600 mb-8">{project.description}</p>

            {/* Características principales */}
            {project.features && (
              <>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Características principales</h2>
                <ul className="list-disc pl-6 mb-8">
                  {project.features.map((feature, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="text-gray-600 mb-2"
                    >
                      {feature}
                    </motion.li>
                  ))}
                </ul>
              </>
            )}

            {/* Tecnologías utilizadas */}
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Tecnologías utilizadas</h2>
            <div className="flex flex-wrap gap-4 mb-8">
              {project.technologies.map((tech, index) => (
                <motion.div
                  key={tech}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex flex-col items-center"
                >
                  <span className={`px-4 py-2 rounded-full text-white bg-blue-500`}>
                    {tech}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* Enlaces */}
            <div className="flex justify-center space-x-4">
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
              >
                <Github size={20} className="mr-2" />
                Ver en GitHub
              </a>
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                <ExternalLink size={20} className="mr-2" />
                Ver Demo
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
