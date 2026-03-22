import type { RecursoLandingContent } from '@/components/recursos/RecursoLandingPage';

export const agriculturaRecursoContent: RecursoLandingContent = {
  eyebrow: 'Agricultura y sector rural',
  heroTitle: 'Dejar de ver la tecnología como una imposición y usarla para ahorrar recursos',
  heroSub:
    'La guía para el agricultor que quiere controlar su explotación desde el móvil y reducir costes sin complicarse la vida.',
  bookingUrl: 'https://calendar.app.google/gwr2H7gugV3Kri3FA',
  topCtaDescription: 'Auditoría gratuita: análisis de ahorro y recursos para tu explotación',
  checklistSection: {
    eyebrow: 'Por dónde empezar',
    title: '5 pasos de tecnología simple para ver el ahorro en tu próxima cosecha',
    intro: 'Sin invertir en sistemas caros ni en formación interminable.',
  },
  checklist: [
    {
      num: '01',
      title: 'Identifica qué te está costando más',
      text: 'Elige dos procesos manuales donde estás perdiendo dinero: riego, dosificación de fertilizante, registro de cosecha. Empieza por ahí.',
    },
    {
      num: '02',
      title: 'Un sensor IoT, una variable clave',
      text: 'No hace falta instrumentalizar toda la explotación. Un sensor de humedad del suelo en la parcela crítica ya te da información de valor.',
    },
    {
      num: '03',
      title: 'Dashboard simple: rojo o verde',
      text: 'Un panel mínimo que te diga si ese dato está bien o mal. Sin gráficas complejas, sin datos que no entiendes.',
    },
    {
      num: '04',
      title: 'Protocolo de acción inmediata',
      text: 'Define qué haces cuando el sensor te avisa. La tecnología sin protocolo no sirve de nada.',
    },
    {
      num: '05',
      title: 'Mide el ahorro en la primera cosecha',
      text: 'Calcula cuánto has ahorrado en agua o fertilizante. Ese número es tu ROI real y la prueba de que funciona.',
    },
  ],
  phasesSection: {
    eyebrow: 'El proceso',
    title: 'Automatización agrícola en 4 fases',
    intro: 'La tecnología tiene que ser una herramienta de rentabilidad, no una complicación nueva.',
  },
  phases: [
    {
      num: '01',
      title: 'Diagnóstico de ahorro',
      text: 'Identificamos qué recurso te está generando la mayor pérdida: agua, fertilizante o energía. Ponemos números al problema antes de tocar nada.',
    },
    {
      num: '02',
      title: 'MVP IoT accesible desde móvil',
      text: 'Diseñamos un sistema de medición y visualización mínimo viable que funcione desde el teléfono, en el campo, con buena o mala cobertura.',
    },
    {
      num: '03',
      title: 'Ejecución adaptada al campo',
      text: 'Desarrollamos soluciones (web progresiva o dashboard) que funcionan con baja conectividad y que no requieren ser informático para usarlas.',
    },
    {
      num: '04',
      title: 'Medición del ROI',
      text: 'Definimos las métricas para cuantificar el ahorro real en recursos por hectárea o por ciclo de cultivo.',
    },
  ],
  bottomCtaDescription: 'La tecnología no es un gasto. Hablemos de tu plan de ahorro.',
};
