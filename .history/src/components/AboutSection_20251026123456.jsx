
import Image from 'next/image';

export default function AboutSection() {
  return (
    <section id="sobre-mi" className="w-full bg-white py-20 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 lg:gap-16">
          
          <div className="flex justify-center">
            <div className="relative h-64 w-64 md:h-80 md:w-80">
              <Image
                src="/yo.png"
                alt="Foto de María Sierra Sánchez"
                width={320}
                height={320}
                className="rounded-full object-cover shadow-lg"
              />
            </div>
          </div>

          <div className="text-center md:text-left mt-8 md:mt-0">
            <h2 className="mb-4 text-4xl font-bold text-gray-900">
              Hola, soy María
            </h2>
            <p className="mb-6 text-xl text-violet-600 font-semibold">
              Desarrolladora Web y Experta en Transformación Digital
            </p>
            <div className="space-y-4 text-lg text-gray-700">
              <p>
                Con una trayectoria que combina años de experiencia en el sector sanitario y una sólida especialización en desarrollo full-stack, mi pasión es crear soluciones tecnológicas que resuelven problemas de negocio complejos.
              </p>
              <p>
                Aprovecho mi visión dual (negocio y tecnología) para liderar proyectos que automaticen procesos, mejoren la eficiencia y generen un impacto medible.
              </p>
            </div>
            
          
            <a
              href="mailto:info@mariasierrasanchez.com"
              className="mt-8 inline-block rounded-md bg-violet-600 px-6 py-3 text-base font-medium text-white shadow-sm transition-colors hover:bg-violet-700"
            >
              Contacta conmigo
            </a>
          </div>
          
        </div>
      </div>
    </section>
  );
}