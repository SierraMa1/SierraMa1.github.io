import type { Metadata } from 'next';
import RecursoLandingPage from '@/components/recursos/RecursoLandingPage';
import { techRecursoContent } from '@/app/recursos/_data/tech';

export const metadata: Metadata = {
  title: 'Roadmap Empresas Tech 2026 | Elimina la deuda técnica',
  description:
    'Guía para CTOs y CEOs: cómo identificar y eliminar la deuda técnica que frena tu time-to-market y ralentiza a tus equipos.',
};

export default function TechRoadmapPage() {
  return <RecursoLandingPage content={techRecursoContent} />;
}
