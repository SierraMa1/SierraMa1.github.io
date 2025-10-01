// app/page.tsx
import Hero from '@/components/Hero';
import ProjectsSection from '@/components/ProjectsSection';
import AboutSection from '@/components/AboutSection';
mport Solutions from '@/components/Solutions';

export default function Home() {
  return (
    <>
      <Hero />
      <ProjectsSection />
      <AboutSection />
    </>
  );
}