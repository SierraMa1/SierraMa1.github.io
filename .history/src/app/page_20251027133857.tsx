
import Hero from '@/components/Hero';
import ProjectsSection from '@/components/ProjectsSection';
import AboutSection from '@/components/AboutSection';
import Solutions from '@/components/Solutions';
import PlaygroundSection from '@/components/PlaygroundSection'; 
import SkillSection from '@/components/SkillSection'; 

export default function Home() {
  return (
    <>
      <Hero />
      <AboutSection />
      <Solutions />
      <ProjectsSection />
      <SkillSection /> 
      <PlaygroundSection /> 
    </>
  );
}