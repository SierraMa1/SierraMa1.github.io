'use client';

import { useEffect, useRef } from 'react';

/**
 * Cursor glow — halo violeta que sigue al cursor del ratón en desktop.
 * Solo se activa con ratón/trackpad (pointer: fine), nunca en táctil.
 * pointer-events: none → no interfiere con ningún clic.
 */
export default function CursorGlow() {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    // Salir en dispositivos táctiles
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const outer = outerRef.current;
    const inner = innerRef.current;
    if (!outer || !inner) return;

    // Posiciones: target (donde está el cursor) y actuales (suavizadas)
    let tx = window.innerWidth / 2;
    let ty = window.innerHeight / 2;
    let ox = tx, oy = ty;
    let ix = tx, iy = ty;
    let raf: number;

    // Mostrar inmediatamente al montar (el cursor ya está en la página)
    outer.style.opacity = '1';
    inner.style.opacity = '1';

    const onMove = (e: MouseEvent) => {
      tx = e.clientX;
      ty = e.clientY;
    };

    const onLeave = () => {
      outer.style.opacity = '0';
      inner.style.opacity = '0';
    };

    const onEnter = () => {
      outer.style.opacity = '1';
      inner.style.opacity = '1';
    };

    const animate = () => {
      // Glow exterior: inercia lenta y suave
      ox += (tx - ox) * 0.07;
      oy += (ty - oy) * 0.07;
      // Punto interior: sigue más rápido
      ix += (tx - ix) * 0.20;
      iy += (ty - iy) * 0.20;

      outer.style.transform = `translate(${ox}px, ${oy}px) translate(-50%, -50%)`;
      inner.style.transform = `translate(${ix}px, ${iy}px) translate(-50%, -50%)`;

      raf = requestAnimationFrame(animate);
    };

    document.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseleave', onLeave);
    document.addEventListener('mouseenter', onEnter);
    raf = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('mouseenter', onEnter);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      {/* Halo exterior — grande, difuminado */}
      <div
        ref={outerRef}
        className="pointer-events-none fixed left-0 top-0 z-[150] transition-opacity duration-500"
        style={{ opacity: 0 }}
        aria-hidden="true"
      >
        <div className="h-72 w-72 rounded-full bg-violet-500/25 blur-[80px]" />
      </div>

      {/* Punto interior — nítido, más saturado */}
      <div
        ref={innerRef}
        className="pointer-events-none fixed left-0 top-0 z-[151] transition-opacity duration-500"
        style={{ opacity: 0 }}
        aria-hidden="true"
      >
        <div className="h-8 w-8 rounded-full bg-violet-400/60 blur-[6px]" />
      </div>
    </>
  );
}
