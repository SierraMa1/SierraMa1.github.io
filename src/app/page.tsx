'use client'
import Header from './components/Header'
import HeroSection from './components/HeroSection'
import ProjectsSection from './components/ProjectsSection'
import Footer from './components/Footer'

export default function Home() {
  return (
    <div className="min-h-screen bg-[#F5F5F0]">
      <Header />
      <main className="container mx-auto">
        <HeroSection />
        <ProjectsSection />
      </main>
      <Footer />
    </div>
  )
}