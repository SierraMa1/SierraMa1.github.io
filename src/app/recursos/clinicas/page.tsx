import type { Metadata } from 'next';
import RecursoLandingPage from '@/components/recursos/RecursoLandingPage';
import { clinicasRecursoContent } from '@/app/recursos/_data/clinicas';

export const metadata: Metadata = {
  title: 'Roadmap Clínicas Dentales 2026 | Automatiza tu clínica',
  description: 'Guía gratuita para clínicas dentales: cómo automatizar citas, recordatorios y documentación sin dolores de cabeza.',
};

export default function ClinicasRoadmapPage() {
  return <RecursoLandingPage content={clinicasRecursoContent} />;
}
