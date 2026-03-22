import type { RecursoLandingContent } from '@/components/recursos/RecursoLandingPage';

export const clinicasRecursoContent: RecursoLandingContent = {
  eyebrow: 'Clínicas Dentales',
  heroTitle: 'Cómo dejar de perder 1 hora diaria en gestión y enfocarte en la clínica',
  heroSub:
    'La guía práctica para automatizar tu clínica sin necesitar saber de tecnología, ni contratar un equipo de IT.',
  bookingUrl: 'https://calendar.app.google/CSXaPE9KDUxmmrin8',
  topCtaDescription: 'Auditoría estratégica gratuita para clínicas dentales',
  checklistSection: {
    eyebrow: 'Por dónde empezar',
    title: '5 acciones que puedes implementar esta semana',
    intro: 'No hace falta transformar todo de golpe. Empieza por aquí y notarás el cambio en días.',
  },
  checklist: [
    {
      num: '01',
      title: 'Recordatorios automáticos',
      text: 'Migra las llamadas manuales a WhatsApp y email automatizados. Tus pacientes lo agradecerán y tu recepcionista también.',
    },
    {
      num: '02',
      title: 'Reserva y cancelación online',
      text: 'Habilita un sistema sincronizado de citas desde la web. Sin llamadas, sin huecos sin cubrir, sin dobles reservas.',
    },
    {
      num: '03',
      title: 'Ficha digital de paciente',
      text: 'Digitaliza el consentimiento informado y la ficha de bienvenida (tablet o web). Adiós a los papeles en recepción.',
    },
    {
      num: '04',
      title: 'Chatbot para FAQs',
      text: 'Implementa un asistente inteligente en tu web que responda preguntas frecuentes fuera de horario.',
    },
    {
      num: '05',
      title: 'Cumplimiento LOPD/GDPR',
      text: 'Revisa tu política de privacidad para la gestión de datos clínicos. Es obligatorio, y hacerlo bien genera confianza.',
    },
  ],
  phasesSection: {
    eyebrow: 'El proceso',
    title: 'Automatización en 4 fases',
    intro: 'La automatización tiene que seguir un camino lógico. Te explico cómo lo hacemos juntos.',
  },
  phases: [
    {
      num: '01',
      title: 'Diagnóstico de flujo',
      text: 'Identificamos con precisión cuántas horas pierde tu equipo cada semana en tareas manuales repetitivas.',
    },
    {
      num: '02',
      title: 'Planificación del MVP',
      text: 'Diseñamos un Portal del Paciente mínimo viable que automatice la gestión de citas y documentos sin romper lo que ya funciona.',
    },
    {
      num: '03',
      title: 'Ejecución Full Stack',
      text: 'Integramos tu web (front-end) con tu sistema de gestión (back-end) de forma segura y sincronizada.',
    },
    {
      num: '04',
      title: 'Medición del ahorro',
      text: 'Definimos los KPIs para que veas en números cuánto tiempo y dinero has recuperado.',
    },
  ],
  bottomCtaDescription: 'Deja de posponerlo. Hablemos de tu roadmap.',
};
