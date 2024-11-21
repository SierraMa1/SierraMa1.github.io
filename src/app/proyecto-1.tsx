import Image from 'next/image'
import Link from 'next/link'

export default function ClinicaCasasnovas() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-[#333]">Clínica Casasnovas</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <Image
            src="/Clinica.jpg"
            alt="Clínica Casasnovas"
            width={600}
            height={400}
            className="rounded-lg shadow-lg"
          />
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-4 text-[#333]">Descripción del Proyecto</h2>
          <p className="text-[#555] mb-4">
            Desarrollé una solución web completa para la Clínica Casasnovas, mejorando su presencia digital y eficiencia operativa. El proyecto incluyó el diseño y desarrollo de una aplicación web SPA utilizando Vue.js para el frontend y Tailwind CSS para un diseño rápido y personalizado.
          </p>
          <h3 className="text-xl font-semibold mb-2 text-[#333]">Tecnologías Utilizadas</h3>
          <ul className="list-disc list-inside text-[#555] mb-4">
            <li>Vue.js</li>
            <li>Tailwind CSS</li>
            <li>Node.js</li>
            <li>Express.js</li>
          </ul>
          <h3 className="text-xl font-semibold mb-2 text-[#333]">Funcionalidades Principales</h3>
          <ul className="list-disc list-inside text-[#555] mb-4">
            <li>Sistema de citas online</li>
            <li>Acceso a historiales digitales</li>
            <li>Integración con dominio y configuración DNS</li>
          </ul>
          <Link href="/" className="inline-block bg-[#A78BFA] text-white px-6 py-2 rounded-full hover:bg-[#7C3AED] transition-colors">
            Volver a Proyectos
          </Link>
        </div>
      </div>
    </div>
  )
}