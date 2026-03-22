# Plan de refactorización – Portfolio

Resumen del análisis del código y cambios aplicados/recomendados.

---

## Cambios ya aplicados

### 1. Tipos centralizados
- **`src/types/index.ts`**: Definidos `Project`, `ProjectDetailedDescription`, `ProjectResult`, `BlogPost`, `NavItem`.
- **`ProjectDetailsClient.tsx`** y **`ProjectCarouselCard.tsx`**: Usan `Project` desde `@/types` en lugar de tipos locales duplicados.
- **`SkillSection.tsx`**: Usa `Project` y deja de usar `any`; componente interno renombrado a `SkillProjectCard` para no chocar con `ProjectLinkCard.jsx`.

### 2. Constantes compartidas
- **`src/constants/links.ts`**: `SOCIAL_LINKS` (GitHub, LinkedIn) y `CONTACT_EMAIL`.
- **Header** y **Footer**: Enlaces y email leídos desde estas constantes; añadidos `aria-label` en enlaces sociales.

### 3. Código duplicado
- **Header**: Eliminada duplicación entre `baseNavLinkClasses` y `homeLinkClasses` (eran iguales); una sola variable `navLinkClasses`.
- **Header**: Uso de tipo `NavItem` desde `@/types` en lugar de `NavItemType` local.

### 4. Corrección de bugs
- **ProjectDetailsClient**: Enlace “Contactar Ahora” corregido de `/#contact` a `/#contacto` (id del footer).
- **`getProjectById`** (projects/[id]/page.tsx): Comprueba `id` numérico con `Number.isNaN(parseInt(id, 10))` y devuelve `undefined` si no es válido.
- **Footer**: Copia al portapapeles con `navigator.clipboard.writeText` cuando existe; fallback a `document.execCommand('copy')` solo si hace falta.

### 5. Estilos y efectos
- **globals.css**: Añadida animación `@keyframes fadeIn` y clase `.animate-fade-in`.
- **PlaygroundSection**: Eliminada inyección dinámica de estilos en el módulo; la animación se usa desde CSS global.

### 6. Producción y logs
- **ChatbotButton**: Logs de depuración eliminados o envueltos en `process.env.NODE_ENV === 'development'` para no ensuciar consola en producción.

---

## Recomendaciones pendientes

### ~~Componentes no usados~~ (eliminados)
Se eliminaron los siguientes componentes que no se usaban en ninguna parte:
- `ChatWindow.jsx` (el chat usa Botpress vía ChatbotButton).
- `Wave.jsx` (WaveImage no estaba importado).
- `ProjectLinkCard.jsx` (en SkillSection se usa el interno SkillProjectCard; en recursos, enlaces directos).

### Unificar extensión a TypeScript
- Varios componentes siguen en `.jsx` sin tipos: `Footer`, `Hero`, `ChatbotButton`, `ChatWindow`, `ProjectCard`, `ProjectLinkCard`, `Wave`.
- Recomendación: ir pasándolos a `.tsx` y añadir tipos (props, estado) para mejor autocompletado y menos errores en tiempo de ejecución.

### Datos fuera de componentes
- **BlogSection**: El array `blogPosts` está dentro del componente; podría moverse a `src/data/blogPosts.ts` (o similar) y tiparse con `BlogPost` de `@/types`.
- **ResourceHubSection**: `resources` podría estar en `src/data/resources.ts`.
- **Solutions**: `services` podría estar en `src/data/services.ts`.

Así las páginas solo importan datos y el código es más fácil de testear y reutilizar.

### API y tipado
- **`src/app/api/chat/route.js`**: Pasar a `route.ts` y tipar body de la request y respuesta (p. ej. `{ messages: { role, content }[] }` y `{ response: string }`).
- **`projects.js`**: Opcional convertir a `projects.ts` y tipar `projectsData` como `Project[]`; si lo dejas en `.js`, puedes usar `src/data/projects.d.ts` para declarar el tipo de `projectsData` sin tocar el contenido.

### Swiper y tipos
- **ProjectsSection**: `useState<any>(null)` para la instancia de Swiper; si existe tipo de Swiper en `swiper`, usarlo (p. ej. `Swiper` de `swiper`) para evitar `any`.

### ProjectCard.jsx
- Recibe `project` sin tipo; conviene tipar con `Project` de `@/types` (y si quieres, migrar el archivo a `ProjectCard.tsx`).

### AboutSection
- La función `timeAgo` podría extraerse a `src/lib/format.ts` (o `utils.ts`) y reutilizarse en otros sitios si hace falta.

### Accesibilidad
- En formularios (Header búsqueda, Playground, etc.), asociar `<label>` a los inputs o usar `aria-label` donde corresponda.
- Comprobar contraste de colores en modo oscuro en las secciones que usan `dark:`.

### Comentarios y estilo
- Hay comentarios en español e inglés; unificar idioma (p. ej. todo en español) ayuda a mantener consistencia.
- Algunos comentarios obsoletos (p. ej. “// 2. APLICAMOS EL TIPO”) pueden eliminarse tras la refactorización.

---

## Estructura actual recomendada

```
src/
  constants/   # Enlaces, email, config (Botpress, etc.)
  data/        # projects.js, y en el futuro blogPosts, resources, services
  types/        # Interfaces globales (Project, BlogPost, NavItem, etc.)
  lib/          # utils (cn), y en el futuro format (timeAgo)
  components/
  app/
```

---

## Cómo seguir

1. Decidir si eliminar `ChatWindow.jsx`, `Wave.jsx` y `ProjectLinkCard.jsx` (no usados).
2. Migrar componentes `.jsx` a `.tsx` de forma gradual, empezando por los más usados (Footer, Hero, ProjectCard, ChatbotButton).
3. Mover listas de datos (blog, resources, services) a `src/data/` y tiparlas.
4. Convertir `api/chat/route.js` a TypeScript y tipar request/response.
5. Revisar accesibilidad (labels, aria, contraste) en formularios y enlaces.

Si quieres, el siguiente paso puede ser aplicar una de estas recomendaciones en concreto (por ejemplo, eliminar componentes no usados o migrar un componente a TSX).
