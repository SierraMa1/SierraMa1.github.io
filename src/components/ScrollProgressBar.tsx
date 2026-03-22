'use client';

import { useEffect, useState } from 'react';

/**
 * Barra de progreso de scroll — fija en la parte superior de la página.
 * Se llena de izquierda a derecha a medida que el usuario hace scroll.
 * Gradiente violeta → azul, grosor de 2px, z-index 100 para estar sobre el header.
 */
export default function ScrollProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
    };

    // Listener pasivo para no bloquear el scroll
    window.addEventListener('scroll', update, { passive: true });
    update(); // Inicializar con el valor actual
    return () => window.removeEventListener('scroll', update);
  }, []);

  return (
    <div
      className="fixed top-0 left-0 z-[100] h-[3px] w-full bg-transparent pointer-events-none"
      aria-hidden="true"
    >
      <div
        className="h-full bg-gradient-to-r from-violet-600 via-violet-400 to-blue-500"
        // transition-none para que la barra siga el scroll en tiempo real sin lag
        style={{ width: `${progress}%`, transition: 'width 60ms linear' }}
      />
    </div>
  );
}
