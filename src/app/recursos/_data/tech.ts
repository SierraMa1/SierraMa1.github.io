import type { RecursoLandingContent } from '@/components/recursos/RecursoLandingPage';

export const techRecursoContent: RecursoLandingContent = {
  eyebrow: 'Empresas Tech',
  heroTitle: 'Cómo identificar y eliminar la deuda técnica que frena tu time-to-market',
  heroSub:
    'La guía para CTOs y CEOs que buscan eficiencia real y escalar sin que el código heredado lo impida.',
  bookingUrl: 'https://calendar.app.google/MPc1iHjP7HDUmCgi6',
  topCtaDescription: 'Auditoría estratégica gratuita: revisión de deuda técnica',
  checklistSection: {
    eyebrow: 'Señales de alerta',
    title: 'Si tu empresa cumple 2 o más puntos, la deuda técnica está consumiendo presupuesto',
    intro: 'No es una crítica, es un diagnóstico. La deuda técnica no es mala ingeniería, es el precio de crecer rápido.',
  },
  checklist: [
    {
      num: '01',
      title: 'No puedes migrar sin miedo a romper todo',
      text: 'Si actualizar un framework es un evento de alto riesgo, tu arquitectura tiene deuda técnica acumulada que está frenando el crecimiento.',
    },
    {
      num: '02',
      title: 'No tienes testing automatizado',
      text: 'Sin pruebas unitarias ni E2E, cada cambio en producción es un salto al vacío. El miedo a desplegar es una señal clara.',
    },
    {
      num: '03',
      title: 'Dos equipos, tecnologías incompatibles',
      text: 'Cuando cada equipo resuelve lo mismo de forma diferente, la integración se convierte en el cuello de botella permanente.',
    },
    {
      num: '04',
      title: 'Desarrollo y negocio trabajan en silos',
      text: 'La fricción entre equipos no es un problema de cultura, es un problema de proceso. Y tiene solución técnica y organizativa.',
    },
  ],
  phasesSection: {
    eyebrow: 'El proceso',
    title: 'Optimización en 4 fases',
    intro: 'Fusionamos consultoría de procesos, desarrollo Full Stack y mejora de habilidades para una transformación real y duradera.',
  },
  phases: [
    {
      num: '01',
      title: 'Auditoría 360 de coste y procesos',
      text: 'Cuantificamos cuánto tiempo y dinero te está costando la deuda técnica y la mala comunicación entre equipos. Ponemos cifras antes de proponer nada.',
    },
    {
      num: '02',
      title: 'Roadmap de migración estratégica',
      text: 'Planificamos la refactorización o migración progresiva (microservicios, nuevo stack) sin paralizar la operación actual.',
    },
    {
      num: '03',
      title: 'DevOps y habilitación de equipos',
      text: 'Configuramos flujos CI/CD para automatizar despliegue y testing, mejoramos la comunicación inter-equipo y entrenamos en las metodologías necesarias.',
    },
    {
      num: '04',
      title: 'Métricas de velocidad y eficiencia',
      text: 'Definimos KPIs para medir la eficiencia del equipo, el time-to-market y el impacto en la estabilidad del producto.',
    },
  ],
  bottomCtaDescription: 'Ser tecnológico no es lo mismo que ser eficiente. Hablemos de tu plan de aceleración.',
};
