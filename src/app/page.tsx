'use client'
import Header from './components/Header'
import ProjectsSection from './components/ProjectsSection'
import Footer from './components/Footer'
import Wave from './components/wave'

export default function Home() {
  return (
    <div className="min-h-screen bg-[#F5F5F0]">
      <Header/>
      <main className="container mx-auto px-4 py-8">
        <ProjectsSection />
      </main>
      <Footer />
    </div>
  )
}