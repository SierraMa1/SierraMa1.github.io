/**
 * Tipos centralizados del portfolio.
 * Evita duplicar interfaces en varios componentes.
 */

export interface ProjectResult {
  metric?: string;
  description: string;
}

export interface ProjectDetailedDescription {
  contexto: string;
  retos: string[];
  soluciones: string[];
}

export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  github: string;
  demo: string;
  technologies: string[];
  tags: string[];
  icon: string;
  detailedDescription: ProjectDetailedDescription;
  results?: ProjectResult[];
}

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  tags: string[];
}

export interface NavItem {
  href: string;
  label: string;
  isPrimary?: boolean;
}
