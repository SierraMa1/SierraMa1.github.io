import Hero from '@/components/Hero';
import ProblemaSection from '@/components/ProblemaSection';
import Servicios from '@/components/Servicios';
import SoftwareSection from '@/components/SoftwareSection';
import AboutSection from '@/components/AboutSection';
import StorytellingSection from '@/components/StorytellingSection';
import YouTubeSection from '@/components/YouTubeSection';
import ProjectsSection from '@/components/ProjectsSection';
import ResourceHubSection from '@/components/ResourceHubSection';
import FAQSection from '@/components/FAQSection';
import CTAFinalSection from '@/components/CTAFinalSection';

export default function Home() {
  return (
    <>
      {/* 1. Hero — impacto inmediato */}
      <Hero />

      {/* 2. Problema — conexión emocional con el visitante */}
      <ProblemaSection />

      {/* 3. Servicios — qué ofrezco */}
      <Servicios />

      {/* 4. Software a medida — gran diferencial */}
      <SoftwareSection />

      {/* 5. Sobre mí — trayectoria, herramientas y GitHub */}
      <AboutSection />

      {/* 6. Storytelling — historia con micrófono animado */}
      <StorytellingSection />

      {/* 7. Canal YouTube — autoridad y confianza */}
      <YouTubeSection />

      {/* 8. Proyectos — prueba técnica real */}
      <ProjectsSection />

      {/* 9. Recursos — guías y materiales por sector */}
      <ResourceHubSection />

      {/* 10. FAQ — eliminar objeciones */}
      <FAQSection />

      {/* 11. CTA Final — conversión */}
      <CTAFinalSection />
    </>
  );
}
