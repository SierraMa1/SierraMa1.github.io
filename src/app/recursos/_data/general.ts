import type { RecursoLandingContent } from '@/components/recursos/RecursoLandingPage';

export const generalRecursoContent: RecursoLandingContent = {
  eyebrow: 'Cualquier sector',
  heroTitle: 'Consultoría estratégica y desarrollo Full Stack para desafíos complejos',
  heroSub:
    'Tu problema es de ineficiencia de procesos. Mi solución es estratégica y técnica, y se puede aplicar a cualquier industria.',
  bookingUrl: 'https://calendar.app.google/eDSdfCBi2ZSNSTfRA',
  topCtaDescription: 'Auditoría estratégica gratuita para proyectos de cualquier sector',
  checklistSection: {
    eyebrow: 'Por dónde empezar',
    title: '5 puntos para saber si tu proceso es candidato a una automatización de alto impacto',
    intro: 'La transformación digital no empieza con tecnología. Empieza definiendo bien el problema.',
  },
  checklist: [
    {
      num: '01',
      title: 'Identifica qué proceso te frustra más',
      text: 'El proceso manual que más te molesta o tiene más margen de error es siempre el mejor candidato para automatizar primero.',
    },
    {
      num: '02',
      title: 'Calcula cuánto te cuesta la ineficiencia',
      text: 'Tiempo perdido por semana multiplicado por el coste hora de tu equipo. Ese número te sorprenderá y justificará cualquier inversión.',
    },
    {
      num: '03',
      title: 'Revisa si ya existe una herramienta comercial',
      text: 'Casi nunca resuelve el problema al 100%, pero conviene saberlo antes de decidir construir algo a medida.',
    },
    {
      num: '04',
      title: 'Define qué tipo de solución necesitas',
      text: '¿Automatización de datos, un portal a medida o integración de sistemas existentes? El objetivo cambia el enfoque completamente.',
    },
    {
      num: '05',
      title: 'Establece el KPI de éxito antes de empezar',
      text: 'Sin una métrica clara, no hay forma de demostrar el retorno. Lo primero que hacemos juntos es definir cómo medimos el éxito.',
    },
  ],
  phasesSection: {
    eyebrow: 'El proceso',
    title: '4 fases aplicables a cualquier reto',
    intro: 'La metodología es la misma: primero entendemos el problema de negocio, luego escribimos el código. No al revés.',
  },
  phases: [
    {
      num: '01',
      title: 'Auditoría de ineficiencia',
      text: 'Identificamos el cuello de botella más costoso y la mayor fuga de tiempo en tu empresa, sin importar el sector ni el tamaño.',
    },
    {
      num: '02',
      title: 'Roadmap de solución a medida',
      text: 'Planificamos una solución de software o integración Full Stack diseñada para resolver el problema de raíz, no para parchear síntomas.',
    },
    {
      num: '03',
      title: 'Ejecución y adopción',
      text: 'Construimos el MVP, hacemos el despliegue de forma segura y desarrollamos la estrategia de adopción para que tu equipo lo use de verdad.',
    },
    {
      num: '04',
      title: 'Medición y ROI',
      text: 'Definimos las métricas clave para demostrar el retorno de la inversión y la mejora de la eficiencia con datos reales.',
    },
  ],
  bottomCtaDescription: 'No estás solo ante esto. Hablemos de tu problema en 15 minutos.',
};
