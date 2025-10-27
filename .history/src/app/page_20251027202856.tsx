import Hero from '@/components/Hero';
import ProjectsSection from '@/components/ProjectsSection';
import AboutSection from '@/components/AboutSection';
import Solutions from '@/components/Solutions';
import PlaygroundSection from '@/components/PlaygroundSection'; 
import SkillSection from '@/components/SkillSection'; 
import BlogSection from '@/components/BlogSection'; 

// Definimos los tipos de las propiedades esperadas por Next.js
interface HomeProps {
  searchParams: {
    search?: string; // El término de búsqueda opcional
  };
}

// 1. La función Home ahora acepta las propiedades (Props)
export default function Home({ searchParams }: HomeProps) {
  
  // 2. Extraemos el término de búsqueda de la URL
  const searchTerm = searchParams.search;

  // 3. Lógica para mostrar solo los resultados si hay un término de búsqueda
  if (searchTerm) {
    return (
      <main className="min-h-screen pt-20 bg-gray-50 dark:bg-black">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white mb-8">
            Resultados para "{searchTerm}"
          </h1>
          {/* Mostramos solo las secciones que filtran */}
          <ProjectsSection searchTerm={searchTerm} />
          <BlogSection searchTerm={searchTerm} />
        </div>
      </main>
    );
  }


  // 4. Si no hay término de búsqueda, mostramos el layout completo normal
  return (
    <>
      <Hero />
      <AboutSection />
      <Solutions />
      <ProjectsSection searchTerm={searchTerm} /> {/* Pasamos el searchTerm vacío */}
      <SkillSection searchTerm={searchTerm} /> 
      <PlaygroundSection searchTerm={searchTerm} /> 
      <BlogSection searchTerm={searchTerm} /> 
    </>
  );
}