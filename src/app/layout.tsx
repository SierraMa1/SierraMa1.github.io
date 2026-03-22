// app/layout.tsx
import type { Metadata } from 'next';
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { GoogleTagManager } from '@next/third-parties/google';
import ChatbotButton from "@/components/ChatbotButton";
import ScrollProgressBar from "@/components/ScrollProgressBar";
import CursorGlow from "@/components/CursorGlow";
import { SiteProvider } from "@/context/SiteContext";
import { SITE_URL } from '@/constants/links';

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;

const BASE_URL = SITE_URL;

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    template: '%s | María Sierra Sánchez',
    default: 'María Sierra Sánchez — Transformación Digital, IA y Desarrollo Web para PYMEs',
  },
  description:
    'Consultora de transformación digital, docente ejecutiva en IA y desarrolladora full-stack especializada en PYMEs, autónomos y sector sanitario. Málaga con impacto nacional.',
  keywords: [
    'transformación digital PYMES',
    'consultoría IA empresas',
    'formación inteligencia artificial',
    'desarrolladora web Málaga',
    'automatización negocios',
    'full stack developer',
    'Next.js Vue.js React',
    'docente IA UCJC EOI',
    'digitalización clínicas dentales',
    'innovación rural',
    'María Sierra Sánchez',
  ],
  authors: [{ name: 'María Sierra Sánchez', url: BASE_URL }],
  creator: 'María Sierra Sánchez',
  publisher: 'María Sierra Sánchez',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: BASE_URL,
  },
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    url: BASE_URL,
    siteName: 'María Sierra Sánchez',
    title: 'María Sierra Sánchez — Transformación Digital, IA y Desarrollo Web para PYMEs',
    description:
      'Consultora de transformación digital, docente ejecutiva en IA y desarrolladora full-stack. Ayudo a PYMEs, autónomos y clínicas a digitalizarse con resultados reales.',
    images: [
      {
        url: '/traje.jpeg',
        width: 1200,
        height: 630,
        alt: 'María Sierra Sánchez — Consultora de Transformación Digital e IA',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'María Sierra Sánchez — Transformación Digital, IA y Desarrollo Web',
    description:
      'Consultora de transformación digital, docente ejecutiva en IA y desarrolladora full-stack para PYMEs y autónomos.',
    images: ['/traje.jpeg'],
    creator: '@mariasierrasanchez',
  },
  category: 'technology',
};

// JSON-LD structured data — Person + WebSite schema
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      '@id': `${BASE_URL}/#person`,
      name: 'María Sierra Sánchez',
      url: BASE_URL,
      image: `${BASE_URL}/traje.jpeg`,
      jobTitle: 'Consultora de Transformación Digital, Docente en IA y Desarrolladora Full-Stack',
      description:
        'Especializada en transformación digital para PYMEs, autónomos y sector sanitario. Docente ejecutiva en UCJC y EOI. Desarrolladora full-stack con React, Vue.js, Node.js y Supabase.',
      knowsAbout: [
        'Inteligencia Artificial aplicada a negocios',
        'Transformación Digital',
        'Desarrollo Web Full-Stack',
        'Automatización de procesos',
        'Formación ejecutiva en IA',
        'React',
        'Vue.js',
        'Next.js',
        'Node.js',
      ],
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Málaga',
        addressRegion: 'Andalucía',
        addressCountry: 'ES',
      },
      sameAs: [
        'https://www.linkedin.com/in/mariasierrasanchez',
        'https://github.com/SierraMa1',
        'https://www.youtube.com/@TecnologiaFacilConMaria',
      ],
      email: 'mariasierrasanchez1990@gmail.com',
    },
    {
      '@type': 'WebSite',
      '@id': `${BASE_URL}/#website`,
      url: BASE_URL,
      name: 'María Sierra Sánchez',
      description:
        'Web personal de María Sierra Sánchez, consultora de transformación digital, docente ejecutiva en IA y desarrolladora full-stack especializada en PYMEs.',
      author: { '@id': `${BASE_URL}/#person` },
      inLanguage: 'es-ES',
    },
    {
      '@type': 'ProfessionalService',
      '@id': `${BASE_URL}/#service`,
      name: 'Consultoría de Transformación Digital e IA — María Sierra Sánchez',
      url: BASE_URL,
      description:
        'Servicios de consultoría en IA, formación ejecutiva, desarrollo web full-stack y mentoría de emprendimiento digital para PYMEs, autónomos y territorios rurales.',
      provider: { '@id': `${BASE_URL}/#person` },
      areaServed: {
        '@type': 'Country',
        name: 'España',
      },
      serviceType: [
        'Consultoría de Transformación Digital',
        'Formación en Inteligencia Artificial',
        'Desarrollo Web Full-Stack',
        'Mentoría de Emprendimiento Rural',
      ],
    },
  ],
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className="!scroll-smooth">
      {GTM_ID && <GoogleTagManager gtmId={GTM_ID} />}
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="flex flex-col min-h-screen bg-white antialiased">
        {/* SiteProvider envuelve toda la app para que cualquier componente
            pueda acceder al idioma y al tema mediante useSite() */}
        <SiteProvider>
          {/* Barra de progreso de scroll — global */}
          <ScrollProgressBar />
          {/* Halo del cursor — solo desktop, decorativo */}
          <CursorGlow />
          <Header />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
          <ChatbotButton />
        </SiteProvider>
      </body>
    </html>
  );
}
