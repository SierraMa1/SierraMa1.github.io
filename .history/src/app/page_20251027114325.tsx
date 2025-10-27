//* app/page.tsx
import Hero from '@/components/Hero';
import ProjectsSection from '@/components/ProjectsSection';
import AboutSection from '@/components/AboutSection';
import Solutions from '@/components/Solutions';
import PlaygroundSection from '@/components/PlaygroundSection'; // 1. Importamos el nuevo componente

export default function Home() {
  return (
    <>
      <Hero />
      <AboutSection />
      <Solutions />
      <ProjectsSection />
      <PlaygroundSection /> 
    </>
  );
}
