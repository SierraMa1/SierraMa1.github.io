import Image from 'next/image'
import Link from 'next/link'

export default function HeroSection() {
  return (
    <section className="relative bg-cover bg-center bg-no-repeat w-full min-h-[70vh] sm:min-h-[80vh] md:min-h-[90vh] lg:min-h-screen xl:min-h-[90vh] 2xl:min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16" style={{ backgroundImage: "url('/Fondo.png')" }}>
      <div className="bg-white/70 p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12 2xl:p-16 rounded-lg shadow-lg flex flex-col lg:flex-row items-center max-w-7xl w-full 2xl:max-w-[1920px] bg-opacity-10">
        <div className="lg:w-1/3 mb-6 lg:mb-0 lg:mr-8 xl:mr-12 2xl:mr-16">
          <Image
            src="/traje.jpeg"
            alt="María Sierra Sánchez"
            width={300}
            height={300}
            className="rounded-full shadow-lg w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 xl:w-[400px] xl:h-[400px] 2xl:w-[500px] 2xl:h-[500px] object-cover"
          />
        </div>
        <div className="lg:w-2/3 text-center lg:text-left">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold text-[#333] mb-2 sm:mb-4 xl:mb-6">María Sierra Sánchez</h1>
          <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-bold text-[#333] mb-4 sm:mb-6 xl:mb-8">Desarrolladora Web Full Stack</h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl text-[#555] mb-6 sm:mb-8 xl:mb-10">
            Desarrolladora Web Full Stack con una sólida base en tecnologías frontend y backend, y experiencia en la creación de aplicaciones eficientes y centradas en el usuario. Mi enfoque combina habilidades técnicas con una fuerte orientación al cliente, lo que me permite desarrollar soluciones digitales que optimizan la experiencia del usuario.
          </p>
          <Link href="/sobre-mi" className="inline-block bg-[#A78BFA] text-white px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base lg:text-lg xl:text-xl 2xl:text-2xl rounded-full hover:bg-[#7C3AED] transition-colors">
            Sobre mí
          </Link>
        </div>
      </div>
    </section>
  )
}