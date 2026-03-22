import type { Lang } from '@/context/SiteContext';

export type ExperienciaItem = {
  periodo: string;
  rol: string;
  empresa: string;
  descripcion: string;
  color: string;
  textColor: string;
  badge: string | null;
};

export type StackCategoria = {
  categoria: string;
  color: string;
  herramientas: string[];
};

export type LoQueCombinoItem = { num: string; titulo: string; texto: string };

export type StatItem = { valor: string; label: string };

export const aboutSectionContent: Record<
  Lang,
  {
    introSubtitle: string;
    introTitle: string;
    introP1: string;
    introP2: string;
    introP3: string;
    introP4: string;
    introP5: string;
    introQuote: string;
    photoAlt: string;
    photoBadge: string;
    stats: StatItem[];
    githubActivityTitle: string;
    githubNoDescription: string;
    githubLoadError: string;
    githubLastPushPrefix: string;
    ctaContact: string;
    stackEyebrow: string;
    combineEyebrow: string;
    expEyebrow: string;
    timelineTitle: string;
    verTrayectoriaCompleta: string;
    mostrarMenos: string;
    badgeToday: string;
    experiencia: ExperienciaItem[];
    stackCategorias: StackCategoria[];
    loQueCombino: LoQueCombinoItem[];
    certificaciones: string[];
    timeAgo: {
      years: (n: number) => string;
      months: (n: number) => string;
      days: (n: number) => string;
      hours: (n: number) => string;
      minutes: (n: number) => string;
      seconds: (n: number) => string;
    };
  }
> = {
  es: {
    introSubtitle: 'Desarrolladora Web · Formadora en IA · Consultora Digital',
    introTitle: 'La tecnología como puente, no como barrera',
    introP1:
      'Llevo más de 15 años trabajando en entornos clínicos, desde auxiliar dental hasta técnica de radioterapia en el MD Anderson.',
    introP2:
      'Esa etapa me enseñó algo que ningún bootcamp enseña: cómo funcionan realmente las personas, los procesos y la presión del día a día dentro de un negocio.',
    introP3:
      'Con el tiempo empecé a detectar lo mismo una y otra vez: tareas repetitivas, falta de organización y sistemas poco eficientes que complicaban el trabajo más de lo necesario.',
    introP4:
      'Por eso decidí aprender a programar. No por la tecnología en sí, sino para poder resolver esos problemas.',
    introP5:
      'Hoy combino desarrollo full-stack, inteligencia artificial y formación para ayudar a pymes, autónomos y proyectos a digitalizarse de forma clara, práctica y sin complicaciones.',
    introQuote:
      'Porque no necesitas entender el código.\nNecesitas entender qué puede hacer por ti.',
    photoAlt: 'María Sierra Sánchez — Consultora de Transformación Digital',
    photoBadge: '💜 Málaga · Impacto nacional',
    stats: [
      { valor: '+15 años', label: 'en entornos clínicos y tech' },
      { valor: 'UCJC · EOI', label: 'docencia ejecutiva' },
      { valor: '450+', label: 'personas formadas y asesoradas' },
      { valor: 'Málaga', label: 'con impacto nacional' },
    ],
    githubActivityTitle: 'Actividad reciente en GitHub',
    githubNoDescription: 'Sin descripción',
    githubLoadError: 'No se pudo cargar la actividad.',
    githubLastPushPrefix: 'Último push:',
    ctaContact: 'Contacta conmigo',
    stackEyebrow: 'Herramientas',
    combineEyebrow: 'Mi perfil único',
    expEyebrow: 'Experiencia',
    timelineTitle: 'Trayectoria profesional',
    verTrayectoriaCompleta: 'Ver trayectoria completa',
    mostrarMenos: 'Mostrar menos',
    badgeToday: 'Hoy',
    experiencia: [
      {
        periodo: 'dic 2025 – hoy',
        rol: 'Docente en IA y Transformación Digital',
        empresa: 'Impulso Digital · UCJC · EOI',
        descripcion:
          'Programa ejecutivo "IA para PYMEs: Uso Práctico". Formo a directivos en IA generativa, automatización (Zapier, RPA), análisis de datos (Power BI) y gestión del cambio cultural.',
        color: 'bg-violet-500',
        textColor: 'text-violet-600',
        badge: 'Hoy',
      },
      {
        periodo: 'dic 2025 – hoy',
        rol: 'Formadora de Software y Customer Success',
        empresa: 'TAKTICS (SaaS Construcción)',
        descripcion:
          'Facilito la transformación digital de empresas constructoras mediante formación en Eureka Cloud. Talleres prácticos, adopción digital y soporte a equipos no técnicos.',
        color: 'bg-indigo-500',
        textColor: 'text-indigo-600',
        badge: 'Hoy',
      },
      {
        periodo: 'jun 2025 – hoy',
        rol: 'Consultora de Transformación Digital & Mentora Rural',
        empresa: 'Rural Data',
        descripcion:
          'Diseño hojas de ruta digitales para territorios rurales. Mentoring de emprendimiento, consultoría técnica e innovación con enfoque de sostenibilidad y triple impacto.',
        color: 'bg-emerald-500',
        textColor: 'text-emerald-600',
        badge: 'Hoy',
      },
      {
        periodo: 'sep 2024 – hoy',
        rol: 'Desarrolladora Full Stack · Formación Tecnológica',
        empresa: 'Clínica Dental Casasnovas',
        descripcion:
          'SPA en Vue.js + Tailwind CSS. Sistema interno de gestión dental para tablets. Soporte técnico y formación continua al equipo clínico en digitalización.',
        color: 'bg-cyan-500',
        textColor: 'text-cyan-600',
        badge: 'Hoy',
      },
      {
        periodo: 'jun – sep 2025',
        rol: 'Consultora de Estrategia y Transformación Digital',
        empresa: 'BeSoccer & BeSoccer Pro',
        descripcion:
          'Diagnóstico 360° de madurez digital para plataformas B2C y B2B. Hoja de ruta para superar deuda técnica, integración de CRM, análisis competitivo y Buyer Persona.',
        color: 'bg-orange-500',
        textColor: 'text-orange-600',
        badge: null,
      },
      {
        periodo: 'nov 2025 – feb 2026',
        rol: 'Consultora y Tutora de Emprendimiento',
        empresa: 'Rural Citizen',
        descripcion:
          'Facilitadora del Programa Relevo Rural. Mentoría en planificación estratégica (Ikigai, PESTEL), finanzas, marketing y metodologías ágiles para proyectos rurales.',
        color: 'bg-teal-500',
        textColor: 'text-teal-600',
        badge: null,
      },
      {
        periodo: 'feb – jun 2024',
        rol: 'Desarrolladora Full Stack',
        empresa: 'WAO Global Limited',
        descripcion:
          'Ciclo completo de desarrollo: análisis, diseño, desarrollo, pruebas y despliegue. Backend: Nest.js, Supabase, Express.js, Node.js, Drizzle, Prisma. Frontend: React, Vue.js, Svelte, Qwik, Vite, Tailwind CSS.',
        color: 'bg-pink-500',
        textColor: 'text-pink-600',
        badge: null,
      },
      {
        periodo: '2014 – 2015',
        rol: 'Técnica de Radioterapia',
        empresa: 'MD Anderson Cancer Center · Hospitén',
        descripcion:
          'Especialista en radioterapia oncológica en uno de los centros de referencia en España. Manejo de equipos de alta precisión, planificación de tratamientos y atención a pacientes.',
        color: 'bg-blue-400',
        textColor: 'text-blue-500',
        badge: null,
      },
      {
        periodo: '2006 – 2023',
        rol: 'Higienista · Coordinadora · Directora de Clínica',
        empresa: 'Sector sanitario dental · +15 años',
        descripcion:
          'Trayectoria progresiva por distintas clínicas dentales: desde auxiliar clínica en especialidades (Implantología, Odontopediatría, Cirugía) hasta coordinación de 8 departamentos y dirección operativa. Gestión de agendas, facturación, protocolos de calidad, software clínico, radiología digital y liderazgo de equipos. Esta experiencia fue el catalizador de mi interés por la transformación digital y la automatización de procesos.',
        color: 'bg-gray-400',
        textColor: 'text-gray-500',
        badge: null,
      },
    ],
    stackCategorias: [
      {
        categoria: 'Frontend',
        color: 'bg-violet-50 border-violet-100 text-violet-700',
        herramientas: ['React.js', 'Next.js', 'Vue.js', 'Svelte', 'Qwik', 'TypeScript', 'Tailwind CSS', 'Vite'],
      },
      {
        categoria: 'Backend & BD',
        color: 'bg-blue-50 border-blue-100 text-blue-700',
        herramientas: ['Node.js', 'Nest.js', 'Express.js', 'Supabase', 'MySQL', 'Drizzle', 'Prisma'],
      },
      {
        categoria: 'DevOps & Herramientas Dev',
        color: 'bg-orange-50 border-orange-100 text-orange-700',
        herramientas: ['Docker', 'Git / GitHub', 'Postman', 'Figma', 'Eureka Cloud', 'CI/CD'],
      },
      {
        categoria: 'Asistentes IA',
        color: 'bg-emerald-50 border-emerald-100 text-emerald-700',
        herramientas: ['ChatGPT', 'Claude', 'Gemini', 'Copilot', 'DeepSeek', 'Perplexity', 'Grok', 'Gwen', '+ y más'],
      },
      {
        categoria: 'IA Creativa & Multimedia',
        color: 'bg-fuchsia-50 border-fuchsia-100 text-fuchsia-700',
        herramientas: ['Gamma', 'ElevenLabs', 'Loom', 'Ideogram', 'Adobe Firefly', 'Synthesia', 'Midjourney', 'Suno', 'TTSMaker', '+ y más'],
      },
      {
        categoria: 'Automatización & No-Code',
        color: 'bg-teal-50 border-teal-100 text-teal-700',
        herramientas: ['Make', 'Zapier', 'N8N', 'RPA', 'Power BI', 'Looker Studio', 'Base44', 'Nano Banana', 'Landbot', 'Quipu', 'Google Forms', '+ y más'],
      },
    ],
    loQueCombino: [
      {
        num: '01',
        titulo: '+15 años en entornos clínicos',
        texto: 'Desde higienista hasta técnica de radioterapia. Entiendo el negocio desde dentro, no solo desde la pantalla.',
      },
      {
        num: '02',
        titulo: 'Full-Stack Developer',
        texto: 'Vue, React, Next.js, Node.js, Supabase, Docker, Nest.js, Svelte. Construyo lo que diseño.',
      },
      {
        num: '03',
        titulo: 'IA aplicada a PYMEs',
        texto: 'ChatGPT, Make, n8n, RPA. Automatización real que ahorra horas y genera resultados medibles.',
      },
      {
        num: '04',
        titulo: 'Docencia ejecutiva',
        texto: 'UCJC, EOI, Impulso Digital. Formo a directivos y equipos que nunca han tocado tecnología.',
      },
      {
        num: '05',
        titulo: 'Estrategia y medición',
        texto: 'KPIs, Power BI, roadmaps digitales. Si no se mide, no existe.',
      },
      {
        num: '06',
        titulo: 'Innovación rural',
        texto: 'Rural Data, Rural Citizen. Porque el futuro también se construye desde el territorio.',
      },
    ],
    certificaciones: [
      'Habilitación Docencia FP (SSCE0110)',
      'Generación Digital · Experto en Transformación Digital',
      'Desarrollo de Aplicaciones Web',
      'Emprendimiento Rural y Economía Circular',
      'Nanogrado Agroalimentario · Sector hortofrutícola 4.0',
    ],
    timeAgo: {
      years: (n) => `hace ${n} años`,
      months: (n) => `hace ${n} meses`,
      days: (n) => `hace ${n} días`,
      hours: (n) => `hace ${n} horas`,
      minutes: (n) => `hace ${n} minutos`,
      seconds: (n) => `hace ${n} segundos`,
    },
  },
  en: {
    introSubtitle: 'Web Developer · AI Trainer · Digital Consultant',
    introTitle: 'Technology as a bridge, not a barrier',
    introP1:
      'I have spent more than 15 years working in clinical settings, from dental assistant to radiotherapy technician at MD Anderson.',
    introP2:
      'That stage taught me something no bootcamp teaches: how people, processes and day-to-day pressure really work inside a business.',
    introP3:
      'Over time I kept seeing the same patterns: repetitive tasks, lack of organisation and inefficient systems that made work harder than it needed to be.',
    introP4:
      'That is why I decided to learn to code — not for technology itself, but to be able to solve those problems.',
    introP5:
      'Today I combine full-stack development, artificial intelligence and training to help SMEs, freelancers and projects go digital in a clear, practical way and without unnecessary friction.',
    introQuote:
      "Because you don't need to understand the code.\nYou need to understand what it can do for you.",
    photoAlt: 'María Sierra Sánchez — Digital Transformation Consultant',
    photoBadge: '💜 Málaga · National reach',
    stats: [
      { valor: '+15 years', label: 'in clinical & tech environments' },
      { valor: 'UCJC · EOI', label: 'executive teaching' },
      { valor: '450+', label: 'people trained and advised' },
      { valor: 'Málaga', label: 'with national reach' },
    ],
    githubActivityTitle: 'Recent activity on GitHub',
    githubNoDescription: 'No description',
    githubLoadError: 'Could not load activity.',
    githubLastPushPrefix: 'Last push:',
    ctaContact: 'Get in touch',
    stackEyebrow: 'Tools',
    combineEyebrow: 'What makes my profile unique',
    expEyebrow: 'Experience',
    timelineTitle: 'Career path',
    verTrayectoriaCompleta: 'See full career path',
    mostrarMenos: 'Show less',
    badgeToday: 'Today',
    experiencia: [
      {
        periodo: 'Dec 2025 – present',
        rol: 'AI & Digital Transformation Instructor',
        empresa: 'Impulso Digital · UCJC · EOI',
        descripcion:
          'Executive programme “AI for SMEs: Practical Use”. I train leaders in generative AI, automation (Zapier, RPA), data analysis (Power BI) and cultural change management.',
        color: 'bg-violet-500',
        textColor: 'text-violet-600',
        badge: 'Today',
      },
      {
        periodo: 'Dec 2025 – present',
        rol: 'Software Training & Customer Success',
        empresa: 'TAKTICS (Construction SaaS)',
        descripcion:
          'I support construction companies in digital transformation through Eureka Cloud training. Hands-on workshops, adoption and support for non-technical teams.',
        color: 'bg-indigo-500',
        textColor: 'text-indigo-600',
        badge: 'Today',
      },
      {
        periodo: 'Jun 2025 – present',
        rol: 'Digital Transformation Consultant & Rural Mentor',
        empresa: 'Rural Data',
        descripcion:
          'I design digital roadmaps for rural territories. Entrepreneurship mentoring, technical consulting and innovation with a sustainability and triple-impact focus.',
        color: 'bg-emerald-500',
        textColor: 'text-emerald-600',
        badge: 'Today',
      },
      {
        periodo: 'Sep 2024 – present',
        rol: 'Full Stack Developer · Technology Training',
        empresa: 'Casasnovas Dental Clinic',
        descripcion:
          'Vue.js + Tailwind CSS SPA. Internal dental management system for tablets. Technical support and ongoing training for the clinical team on digitisation.',
        color: 'bg-cyan-500',
        textColor: 'text-cyan-600',
        badge: 'Today',
      },
      {
        periodo: 'Jun – Sep 2025',
        rol: 'Strategy & Digital Transformation Consultant',
        empresa: 'BeSoccer & BeSoccer Pro',
        descripcion:
          '360° digital maturity diagnosis for B2C and B2B platforms. Roadmap to reduce technical debt, CRM integration, competitive analysis and buyer personas.',
        color: 'bg-orange-500',
        textColor: 'text-orange-600',
        badge: null,
      },
      {
        periodo: 'Nov 2025 – Feb 2026',
        rol: 'Consultant & Entrepreneurship Tutor',
        empresa: 'Rural Citizen',
        descripcion:
          'Facilitator of the Relevo Rural programme. Mentoring in strategic planning (Ikigai, PESTEL), finance, marketing and agile methods for rural projects.',
        color: 'bg-teal-500',
        textColor: 'text-teal-600',
        badge: null,
      },
      {
        periodo: 'Feb – Jun 2024',
        rol: 'Full Stack Developer',
        empresa: 'WAO Global Limited',
        descripcion:
          'Full development lifecycle: analysis, design, development, testing and deployment. Backend: Nest.js, Supabase, Express.js, Node.js, Drizzle, Prisma. Frontend: React, Vue.js, Svelte, Qwik, Vite, Tailwind CSS.',
        color: 'bg-pink-500',
        textColor: 'text-pink-600',
        badge: null,
      },
      {
        periodo: '2014 – 2015',
        rol: 'Radiotherapy Technician',
        empresa: 'MD Anderson Cancer Center · Hospitén',
        descripcion:
          'Oncology radiotherapy specialist at one of Spain’s leading centres. High-precision equipment, treatment planning and patient care.',
        color: 'bg-blue-400',
        textColor: 'text-blue-500',
        badge: null,
      },
      {
        periodo: '2006 – 2023',
        rol: 'Hygienist · Coordinator · Clinic Director',
        empresa: 'Dental healthcare sector · +15 years',
        descripcion:
          'Progressive path across dental clinics: from clinical assistant in specialties (implantology, paediatric dentistry, surgery) to coordinating eight departments and operations. Scheduling, billing, quality protocols, clinical software, digital radiology and team leadership. This path sparked my interest in digital transformation and process automation.',
        color: 'bg-gray-400',
        textColor: 'text-gray-500',
        badge: null,
      },
    ],
    stackCategorias: [
      {
        categoria: 'Frontend',
        color: 'bg-violet-50 border-violet-100 text-violet-700',
        herramientas: ['React.js', 'Next.js', 'Vue.js', 'Svelte', 'Qwik', 'TypeScript', 'Tailwind CSS', 'Vite'],
      },
      {
        categoria: 'Backend & DB',
        color: 'bg-blue-50 border-blue-100 text-blue-700',
        herramientas: ['Node.js', 'Nest.js', 'Express.js', 'Supabase', 'MySQL', 'Drizzle', 'Prisma'],
      },
      {
        categoria: 'DevOps & dev tools',
        color: 'bg-orange-50 border-orange-100 text-orange-700',
        herramientas: ['Docker', 'Git / GitHub', 'Postman', 'Figma', 'Eureka Cloud', 'CI/CD'],
      },
      {
        categoria: 'AI assistants',
        color: 'bg-emerald-50 border-emerald-100 text-emerald-700',
        herramientas: ['ChatGPT', 'Claude', 'Gemini', 'Copilot', 'DeepSeek', 'Perplexity', 'Grok', 'Gwen', '+ and more'],
      },
      {
        categoria: 'Creative AI & multimedia',
        color: 'bg-fuchsia-50 border-fuchsia-100 text-fuchsia-700',
        herramientas: ['Gamma', 'ElevenLabs', 'Loom', 'Ideogram', 'Adobe Firefly', 'Synthesia', 'Midjourney', 'Suno', 'TTSMaker', '+ and more'],
      },
      {
        categoria: 'Automation & no-code',
        color: 'bg-teal-50 border-teal-100 text-teal-700',
        herramientas: ['Make', 'Zapier', 'N8N', 'RPA', 'Power BI', 'Looker Studio', 'Base44', 'Nano Banana', 'Landbot', 'Quipu', 'Google Forms', '+ and more'],
      },
    ],
    loQueCombino: [
      {
        num: '01',
        titulo: '+15 years in clinical environments',
        texto: 'From hygienist to radiotherapy technician. I understand the business from the inside, not only from the screen.',
      },
      {
        num: '02',
        titulo: 'Full-stack developer',
        texto: 'Vue, React, Next.js, Node.js, Supabase, Docker, Nest.js, Svelte. I build what I design.',
      },
      {
        num: '03',
        titulo: 'AI for SMEs',
        texto: 'ChatGPT, Make, n8n, RPA. Real automation that saves hours and delivers measurable results.',
      },
      {
        num: '04',
        titulo: 'Executive teaching',
        texto: 'UCJC, EOI, Impulso Digital. I train leaders and teams who have never touched technology before.',
      },
      {
        num: '05',
        titulo: 'Strategy & measurement',
        texto: 'KPIs, Power BI, digital roadmaps. If it is not measured, it does not exist.',
      },
      {
        num: '06',
        titulo: 'Rural innovation',
        texto: 'Rural Data, Rural Citizen. Because the future is also built from the territory.',
      },
    ],
    certificaciones: [
      'VET teaching qualification (SSCE0110)',
      'Digital Generation · Digital transformation expert',
      'Web application development',
      'Rural entrepreneurship & circular economy',
      'Nano-degree Agri-food · Fruit & vegetable sector 4.0',
    ],
    timeAgo: {
      years: (n) => `${n} years ago`,
      months: (n) => `${n} months ago`,
      days: (n) => `${n} days ago`,
      hours: (n) => `${n} hours ago`,
      minutes: (n) => `${n} minutes ago`,
      seconds: (n) => `${n} seconds ago`,
    },
  },
};

export function timeAgoFromDate(dateString: string, lang: Lang): string {
  const date = new Date(dateString);
  const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
  const ta = aboutSectionContent[lang].timeAgo;

  let interval = seconds / 31536000;
  if (interval > 1) return ta.years(Math.floor(interval));
  interval = seconds / 2592000;
  if (interval > 1) return ta.months(Math.floor(interval));
  interval = seconds / 86400;
  if (interval > 1) return ta.days(Math.floor(interval));
  interval = seconds / 3600;
  if (interval > 1) return ta.hours(Math.floor(interval));
  interval = seconds / 60;
  if (interval > 1) return ta.minutes(Math.floor(interval));
  return ta.seconds(Math.floor(seconds));
}
