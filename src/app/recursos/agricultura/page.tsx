import type { Metadata } from 'next';
import RecursoLandingPage from '@/components/recursos/RecursoLandingPage';
import { agriculturaRecursoContent } from '@/app/recursos/_data/agricultura';

export const metadata: Metadata = {
  title: 'Roadmap Agricultura 2026 | Tecnología para el campo',
  description:
    'Guía práctica para agricultores y cooperativas: cómo usar la tecnología para ahorrar agua, fertilizante y tiempo sin complicarte la vida.',
};

export default function AgriculturaRoadmapPage() {
  return <RecursoLandingPage content={agriculturaRecursoContent} />;
}
