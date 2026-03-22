/**
 * Traducciones ES / EN — objeto único para `translations[lang]`.
 * Los textos viven en `./locales/es` y `./locales/en`.
 */

import { es } from './locales/es';
import { en } from './locales/en';

export const translations = {
  es,
  en,
} as const;

export type Translations = (typeof translations)['es'];
