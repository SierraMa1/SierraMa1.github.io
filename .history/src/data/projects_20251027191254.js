// src/data/projects.js

// NO debe haber ningún 'import' de 'lucide-react' en este archivo!!!!

export const projectsData = [
  {
    id: 1,
    title: "Clínica Casasnovas",
    description: "Solución Web completa para clínica dental con sistema de citas y gestión de pacientes.",
    image: "/Clinica.jpg", 
    github: "https://github.com/SierraMa1/ClinicaCasasnovas",
    demo: "https://www.clinicacasasnovas.com/",
    technologies: ["Vue.js", "Tailwind CSS", "Node.js", "Express.js", "Consultoría"],
    icon: "Stethoscope",
  
    detailedDescription: {
      contexto: "Diseñé y desarrollé la nueva identidad digital de la clínica desde cero para modernizar su presencia online y optimizar la captación de nuevos pacientes, proveyendo una solución tecnológica integral 'llave en mano'.",
      retos: [
        "Digitalizar el flujo de trabajo clínico para eliminar procesos manuales.",
        "Mejorar radicalmente la eficiencia operativa del equipo.",
        "Gestionar el ciclo de vida técnico completo, desde el dominio hasta el despliegue."
      ],
      soluciones: [
        "Creación de una Single Page Application (SPA) con Vue.js.",
        "Implementación de un sistema interno basado en tablets y software de gestión.",
        "Asesoría tecnológica continua y formación al personal en nuevas herramientas."
      ]
    },
   
    results: [
        {
            metric: "30%",
            description: "Reducción estimada del tiempo dedicado a tareas administrativas."
        },
        {
            //metric: "100%",
            description: "Digitalización del flujo de trabajo clínico, eliminando el papel."
        },
        {
            metric: "+20%",
            description: "Aumento en la solicitud de nuevas citas a través del portal web."
        }
    ]
  },
  {
    id: 2,
    title: "ElectricFinder",
    description: "Plataforma Web para conectar usuarios con electricistas, con acceso fácil y transparente.",
    image: "/electricfinder.jpeg",
    technologies: ["React.js", "MySQL", "Tailwind CSS", "Node.js", "Express", "Docker"],
    github: "https://github.com/SierraMa1/ProyectoCFGS/",
    demo: "https://electricfinder.es",
    icon: "Lightbulb", //  Usar el nombre como texto (string)
    detailedDescription: {
      contexto: "Creación de un marketplace digital desde cero para conectar a usuarios con electricistas cualificados, simplificando el proceso de búsqueda, evaluación y obtención de presupuestos.",
      retos: ["Diseñar una arquitectura full-stack escalable desde cero.", "Liderar el proceso de diseño UI/UX desde el prototipado hasta la implementación.", "Asegurar la fiabilidad y facilidad de despliegue de la aplicación."],
      soluciones: ["Implementación de un backend con Node.js/Express y un frontend interactivo con React/TailwindCSS.", "Prototipado de alta fidelidad en Figma centrado en la accesibilidad.", "Uso de Docker para la contenedorización de la aplicación y Postman para la validación de la API."]
    }
  },
  {
    id: 3,
    title: "Consultoría Digital (B2C)",
    description: "Consultoría 360º para definir la estrategia de transformación, superar la deuda técnica y preparar la innovación con IA en la app de BeSoccer.",
    image: "/ProyectoBesoccer.png",
    github: "private",
    demo: "private",
    technologies: ["Estrategia Digital", "IA", "Roadmap Técnico", "Cultura Organizacional"],
    icon: "BrainCircuit", //  Usar el nombre como texto (string)
    detailedDescription: {
      contexto: "Lideré una consultoría 360º para alinear la visión de innovación a largo plazo de la compañía con su realidad tecnológica y organizacional, enfocada en su producto B2C.",
      retos: [
        "Evaluar el impacto de la deuda técnica en la capacidad de innovación futura.",
        "Identificar oportunidades de optimización en flujos de trabajo interdepartamentales.",
        "Analizar la cultura organizativa para proponer mejoras en la gestión del talento."
      ],
      soluciones: [
        "Elaboración de un roadmap técnico evolutivo para la modernización del stack tecnológico.",
        "Diseño de un nuevo marco de procesos basado en metodologías ágiles y herramientas unificadas.",
        "Propuesta de un plan de desarrollo y coaching para potenciar el liderazgo interno."
      ]
    }
  },
  {
    id: 4,
    title: "Estrategia Digital (B2B)",
    description: "Desarrollo de un plan de transformación para BeSoccer Pro, profesionalizando operaciones y tecnología para competir de forma más eficaz.",
    image: "/ProyectoBesoccerPro.png",
    github: "private",
    demo: "private",
    technologies: ["Análisis de Datos", "CRM", "Buyer Persona", "Business Model Canvas"],
    icon: "Target", //  Usar el nombre como texto (string)
    detailedDescription: {
      contexto: "Realicé un diagnóstico de madurez digital para la división B2B, BeSoccer Pro, con el fin de formular un plan de acción que profesionalizara sus operaciones y tecnología.",
      retos: [
        "Analizar la competencia para identificar brechas operativas y tecnológicas.",
        "Optimizar el ciclo de vida del cliente y los procesos de venta, migrando de sistemas manuales a profesionales.",
        "Evaluar la escalabilidad de la plataforma actual frente a las demandas del mercado."
      ],
      soluciones: [
        "Diseño de un plan de acción para la implementación de herramientas clave como un CRM.",
        "Creación de un perfil de Buyer Persona y un mapa de experiencia para alinear el producto con el cliente.",
        "Elaboración de un Business Model Canvas y un Lienzo de Transformación Digital para guiar la estrategia."
      ]
    }
  },
];