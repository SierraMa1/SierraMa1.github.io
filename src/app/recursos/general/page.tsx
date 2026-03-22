import type { Metadata } from 'next';
import RecursoLandingPage from '@/components/recursos/RecursoLandingPage';
import { generalRecursoContent } from '@/app/recursos/_data/general';

export const metadata: Metadata = {
  title: 'Consultoría para cualquier sector | Transformación digital a medida',
  description:
    'Consultoría estratégica y desarrollo Full Stack para empresas de cualquier industria. Definimos el problema de negocio antes de escribir una línea de código.',
};

export default function GeneralRoadmapPage() {
  return <RecursoLandingPage content={generalRecursoContent} />;
}
