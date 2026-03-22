'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import Image from 'next/image';
import { useSite } from '@/context/SiteContext';
import { translations } from '@/i18n/translations';

// ── Duración total del audio en segundos ─────────────────────────────────────
const AUDIO_DURATION = 51.43;

// ── Tiempos de aparición fijos (el audio es en español, la voz no cambia) ────
const fragmentStartTimes = [0, 9, 18, 32, 42];

// ── Barra de progreso ─────────────────────────────────────────────────────────
function ProgressBar({ current, total }: { current: number; total: number }) {
  const pct = total > 0 ? Math.min((current / total) * 100, 100) : 0;
  const fmt = (s: number) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`;
  return (
    <div className="w-full max-w-xs flex flex-col gap-1.5">
      <div className="h-1 w-full rounded-full bg-white/10 overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-violet-500 to-blue-400 transition-all duration-300"
          style={{ width: `${pct}%` }}
        />
      </div>
      <div className="flex justify-between text-xs text-gray-600">
        <span>{fmt(current)}</span>
        <span>{fmt(total)}</span>
      </div>
    </div>
  );
}

// ── Ondas de sonido (animadas por amplitud real) ──────────────────────────────
function SoundWave({ amplitude }: { amplitude: number }) {
  // amplitude: 0-1 → escala las barras
  const base = [3, 7, 12, 16, 11, 19, 13, 9, 15, 7, 11, 17, 9, 13, 7, 11, 15, 9, 13, 7];
  return (
    <div className="flex items-end justify-center gap-[3px] h-9">
      {base.map((h, i) => (
        <div
          key={i}
          className="w-[3px] rounded-full bg-violet-400 transition-all"
          style={{
            height: `${3 + h * amplitude}px`,
            opacity: 0.4 + amplitude * 0.6,
            transitionDuration: '80ms',
          }}
        />
      ))}
    </div>
  );
}


// ── Componente principal ──────────────────────────────────────────────────────
export default function StorytellingSection() {
  const { lang } = useSite();
  const t = translations[lang].historia;

  // Fragmentos con los tiempos fijos + texto traducido
  const storyFragments = fragmentStartTimes.map((startAt, i) => ({
    text: t.fragments[i],
    startAt,
  }));

  const [sectionVisible, setSectionVisible] = useState(false);
  const [isPlaying,      setIsPlaying]      = useState(false);
  const [isPaused,       setIsPaused]       = useState(false);
  const [isDone,         setIsDone]         = useState(false);
  const [currentTime,    setCurrentTime]    = useState(0);
  const [amplitude,      setAmplitude]      = useState(0);   // 0-1, amplitud de voz en tiempo real
  const [activeFragment, setActiveFragment] = useState(-1);
  const [visibleFrags,   setVisibleFrags]   = useState<number[]>([]);

  const sectionRef  = useRef<HTMLDivElement>(null);
  const audioRef    = useRef<HTMLAudioElement | null>(null);
  const ctxRef      = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const sourceRef   = useRef<MediaElementAudioSourceNode | null>(null);
  const rafRef      = useRef<number>(0);
  const dataRef     = useRef<Uint8Array<ArrayBuffer>>(new Uint8Array(128) as Uint8Array<ArrayBuffer>);

  // ── IntersectionObserver ──────────────────────────────────────────────────
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setSectionVisible(true); },
      { threshold: 0.15 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  // ── Cleanup al desmontar ──────────────────────────────────────────────────
  useEffect(() => {
    return () => {
      cancelAnimationFrame(rafRef.current);
      audioRef.current?.pause();
      ctxRef.current?.close();
    };
  }, []);

  // ── Loop de análisis de audio (RAF) ───────────────────────────────────────
  const startAnalysis = useCallback(() => {
    const analyser = analyserRef.current;
    if (!analyser) return;

    const tick = () => {
      analyser.getByteTimeDomainData(dataRef.current);

      // RMS de la señal → amplitud 0-1
      let sum = 0;
      for (let i = 0; i < dataRef.current.length; i++) {
        const v = (dataRef.current[i] - 128) / 128;
        sum += v * v;
      }
      const rms = Math.sqrt(sum / dataRef.current.length);
      // Suavizado exponencial para evitar parpadeo
      setAmplitude(prev => prev * 0.55 + Math.min(rms * 4, 1) * 0.45);

      // Actualizar tiempo y fragmento activo
      const audio = audioRef.current;
      if (audio) {
        const t = audio.currentTime;
        setCurrentTime(t);

        // Qué fragmento corresponde a este momento
        let active = 0;
        for (let i = storyFragments.length - 1; i >= 0; i--) {
          if (t >= storyFragments[i].startAt) { active = i; break; }
        }
        setActiveFragment(active);
        setVisibleFrags(prev => prev.includes(active) ? prev : [...prev, active]);
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
  }, []);

  // ── Inicializar AudioContext + Analyser ───────────────────────────────────
  const initAudio = useCallback(() => {
    if (ctxRef.current) return; // ya inicializado
    const audio = audioRef.current;
    if (!audio) return;

    const ctx      = new AudioContext();
    const analyser = ctx.createAnalyser();
    analyser.fftSize            = 256;
    analyser.smoothingTimeConstant = 0.7;

    const source = ctx.createMediaElementSource(audio);
    source.connect(analyser);
    analyser.connect(ctx.destination);

    ctxRef.current    = ctx;
    analyserRef.current = analyser;
    sourceRef.current   = source;
    dataRef.current     = new Uint8Array(analyser.frequencyBinCount);
  }, []);

  // ── Play ──────────────────────────────────────────────────────────────────
  const play = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio) return;

    initAudio();

    // Reanudar AudioContext si estaba suspendido (política de autoplay)
    if (ctxRef.current?.state === 'suspended') {
      await ctxRef.current.resume();
    }

    if (isDone) {
      audio.currentTime = 0;
      setVisibleFrags([]);
      setActiveFragment(-1);
      setIsDone(false);
    }

    await audio.play();
    setIsPlaying(true);
    setIsPaused(false);
    startAnalysis();
  }, [initAudio, isDone, startAnalysis]);

  const pause = useCallback(() => {
    audioRef.current?.pause();
    cancelAnimationFrame(rafRef.current);
    setIsPlaying(false);
    setIsPaused(true);
    setAmplitude(0);
  }, []);

  const resume = useCallback(async () => {
    if (ctxRef.current?.state === 'suspended') await ctxRef.current.resume();
    await audioRef.current?.play();
    setIsPlaying(true);
    setIsPaused(false);
    startAnalysis();
  }, [startAnalysis]);

  const stop = useCallback(() => {
    const audio = audioRef.current;
    if (audio) { audio.pause(); audio.currentTime = 0; }
    cancelAnimationFrame(rafRef.current);
    setIsPlaying(false);
    setIsPaused(false);
    setIsDone(false);
    setAmplitude(0);
    setCurrentTime(0);
    setActiveFragment(-1);
    setVisibleFrags([]);
  }, []);

  const onEnded = useCallback(() => {
    cancelAnimationFrame(rafRef.current);
    setIsPlaying(false);
    setIsPaused(false);
    setIsDone(true);
    setAmplitude(0);
    setActiveFragment(-1);
  }, []);

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <section id="historia" className="w-full bg-[#0a0a0f] py-28 px-4 relative overflow-hidden">
      {/* Decoración */}
      <div className="absolute top-20 left-1/4 w-96 h-96 rounded-full bg-violet-800/8 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-64 h-64 rounded-full bg-blue-800/8 blur-[80px] pointer-events-none" />

      {/* Audio element oculto */}
      <audio
        ref={audioRef}
        onEnded={onEnded}
        preload="auto"
        className="hidden"
      >
        <source src="/storytelling.mp3"  type="audio/mpeg" />
        <source src="/storytelling.webm" type="audio/webm" />
      </audio>

      <div className="mx-auto max-w-6xl relative z-10" ref={sectionRef}>

        {/* Cabecera */}
        <div className={`mb-16 text-center transition-all duration-700 ${sectionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="text-sm font-semibold uppercase tracking-widest text-violet-400 mb-3">{t.eyebrow}</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
            {t.headline}
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-blue-400">
              {t.headlineAccent}
            </span>
          </h2>
          <p className="text-gray-400 text-base max-w-lg mx-auto">
            {t.sub}
          </p>
        </div>

        {/* Layout */}
        <div className={`grid grid-cols-1 lg:grid-cols-5 gap-12 items-start transition-all duration-700 delay-200 ${sectionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>

          {/* ── Avatar (2/5) ── */}
          <div className="lg:col-span-2 flex flex-col items-center gap-5">

            {/* Marco */}
            <div className="relative">
              {/* Anillo pulsante — brillo proporcional a amplitud */}
              <div
                className="absolute inset-0 rounded-full transition-all duration-100"
                style={{
                  borderRadius: '50%',
                  boxShadow: isPlaying
                    ? `0 0 0 ${4 + amplitude * 12}px rgba(139,92,246,${0.2 + amplitude * 0.5}), 0 0 0 2px rgba(139,92,246,0.2)`
                    : '0 0 0 2px rgba(139,92,246,0.15)',
                }}
              />

              {/* Anillo rotante cuando habla */}
              {isPlaying && !isPaused && (
                <div
                  className="absolute rounded-full border-2 border-dashed border-violet-500/20"
                  style={{
                    inset: `${-8 - amplitude * 6}px`,
                    borderRadius: '50%',
                    animation: 'spinRing 10s linear infinite',
                  }}
                />
              )}

              {/* Foto */}
              <div className="relative w-56 h-56 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-violet-600/40 shadow-2xl shadow-violet-500/20">
                <Image
                  src="/traje.jpeg"
                  alt="María Sierra Sánchez"
                  fill
                  sizes="(max-width: 768px) 14rem, 16rem"
                  className="object-cover object-top"
                  priority
                />
                {/* Tinte sutil que late con la voz */}
                {isPlaying && (
                  <div
                    className="absolute inset-0 bg-violet-700 pointer-events-none transition-opacity duration-75"
                    style={{ opacity: amplitude * 0.15 }}
                  />
                )}
              </div>

              {/* Badge */}
              {isPlaying && !isPaused && (
                <div className="absolute -top-2 -right-2 flex items-center gap-1.5 rounded-full bg-red-600 px-3 py-1 text-xs font-bold text-white shadow-lg">
                  <span className="h-2 w-2 rounded-full bg-white animate-pulse" />
                  EN VIVO
                </div>
              )}
              {isPaused && (
                <div className="absolute -top-2 -right-2 flex items-center gap-1.5 rounded-full bg-yellow-500 px-3 py-1 text-xs font-bold text-white shadow-lg">
                  ⏸ PAUSADO
                </div>
              )}
            </div>

            {/* Nombre */}
            <div className="text-center">
              <p className="text-white font-bold text-lg">María Sierra Sánchez</p>
              <p className="text-violet-400 text-sm">IA · Transformación Digital · Software</p>
            </div>

            {/* Ondas sincronizadas */}
            <SoundWave amplitude={isPlaying && !isPaused ? amplitude : 0} />

            {/* Barra de progreso */}
            <ProgressBar current={currentTime} total={AUDIO_DURATION} />

            {/* Controles */}
            <div className="flex flex-wrap justify-center gap-2 mt-1">
              {/* PLAY (inicial o tras terminar) */}
              {!isPlaying && !isPaused && (
                <button
                  onClick={play}
                  className="flex items-center gap-2 rounded-full bg-violet-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-500/30 hover:bg-violet-500 hover:-translate-y-0.5 transition-all duration-200"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                  {isDone ? (lang === 'es' ? 'Volver a escuchar' : 'Listen again') : t.playLabel}
                </button>
              )}

              {/* PAUSAR */}
              {isPlaying && (
                <button
                  onClick={pause}
                  className="flex items-center gap-2 rounded-full border border-yellow-500/40 bg-yellow-500/10 px-5 py-2.5 text-sm font-medium text-yellow-300 hover:bg-yellow-500/20 transition-all"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                  </svg>
                  {t.pauseLabel}
                </button>
              )}

              {/* REANUDAR */}
              {isPaused && (
                <button
                  onClick={resume}
                  className="flex items-center gap-2 rounded-full border border-violet-500/40 bg-violet-500/10 px-5 py-2.5 text-sm font-medium text-violet-300 hover:bg-violet-500/20 transition-all"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                  {lang === 'es' ? 'Reanudar' : 'Resume'}
                </button>
              )}

              {/* PARAR */}
              {(isPlaying || isPaused) && (
                <button
                  onClick={stop}
                  className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-medium text-gray-400 hover:bg-white/10 transition-all"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6 6h12v12H6z" />
                  </svg>
                  {lang === 'es' ? 'Parar' : 'Stop'}
                </button>
              )}
            </div>
          </div>

          {/* ── Texto (3/5) ── */}
          <div className="lg:col-span-3 flex flex-col gap-4 min-h-[380px]">

            {/* Placeholder — botón clickable con micrófono animado */}
            {visibleFrags.length === 0 && (
              <button
                onClick={play}
                className="group flex flex-col items-center justify-center w-full h-full min-h-[320px] gap-6 rounded-2xl border border-white/5 bg-white/[0.02] hover:border-violet-500/40 hover:bg-violet-950/20 transition-all duration-300 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500"
                aria-label="Pulsa para escuchar mi historia"
              >
                {/* Icono micrófono con anillos pulsantes */}
                <div className="relative flex items-center justify-center">
                  {/* Anillo ping 1 */}
                  <span
                    className="absolute w-20 h-20 rounded-full border border-violet-400/40 animate-ping"
                    style={{ animationDuration: '1.8s' }}
                  />
                  {/* Anillo ping 2 - desfasado */}
                  <span
                    className="absolute w-20 h-20 rounded-full border border-violet-400/20 animate-ping"
                    style={{ animationDuration: '1.8s', animationDelay: '0.6s' }}
                  />
                  {/* Botón micrófono */}
                  <div className="relative z-10 flex h-20 w-20 items-center justify-center rounded-full bg-violet-600/15 border-2 border-violet-500/50 group-hover:bg-violet-600/35 group-hover:border-violet-400 group-hover:scale-110 transition-all duration-300 shadow-lg shadow-violet-500/20">
                    <svg
                      className="h-8 w-8 text-violet-400 group-hover:text-violet-200 transition-colors duration-200"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path d="M12 14c1.66 0 2.99-1.34 2.99-3L15 5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.3-3c0 3-2.54 5.1-5.3 5.1S6.7 14 6.7 11H5c0 3.41 2.72 6.23 6 6.72V21h2v-3.28c3.28-.48 6-3.3 6-6.72h-1.7z" />
                    </svg>
                  </div>
                </div>

                {/* Texto invitando a pulsar */}
                <div className="text-center">
                  <p className="text-white font-semibold text-base group-hover:text-violet-300 transition-colors duration-200">
                    {t.playLabel}
                  </p>
                  <p className="text-gray-500 text-sm mt-1.5">
                    {lang === 'es'
                      ? '51 segundos que explican por qué hago lo que hago.'
                      : '51 seconds that explain why I do what I do.'}
                  </p>
                </div>
              </button>
            )}

            {/* Fragmentos */}
            {storyFragments.map((frag, i) => {
              const isVis    = visibleFrags.includes(i);
              const isActive = activeFragment === i && isPlaying && !isPaused;
              return (
                <div
                  key={i}
                  className={`relative rounded-2xl border px-6 py-5 transition-all duration-500
                    ${isVis ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8 pointer-events-none absolute'}
                    ${isActive
                      ? 'border-violet-500/60 bg-violet-500/10 shadow-lg shadow-violet-500/10'
                      : 'border-white/10 bg-white/[0.03]'
                    }`}
                >
                  {isActive && (
                    <div className="absolute -left-3 top-1/2 -translate-y-1/2 flex flex-col gap-1">
                      {[0,1,2].map(j => (
                        <div key={j} className="w-1.5 h-1.5 rounded-full bg-violet-400"
                          style={{ animation: 'dotBounce 0.5s ease-in-out infinite', animationDelay: `${j*0.13}s` }} />
                      ))}
                    </div>
                  )}
                  <p className={`leading-relaxed text-base transition-colors duration-200 ${isActive ? 'text-white font-medium' : 'text-gray-400'}`}>
                    {frag.text}
                  </p>
                </div>
              );
            })}

            {/* Cita final */}
            {isDone && (
              <div className="mt-3 rounded-2xl bg-gradient-to-r from-violet-500/15 to-blue-500/15 border border-violet-500/30 p-6">
                <p className="text-violet-300 font-semibold text-lg italic leading-relaxed">
                  "La tecnología puede automatizar tareas,<br />
                  pero no puede sustituir la empatía."
                </p>
                <p className="text-gray-500 text-sm mt-3">— María Sierra Sánchez</p>
                <a href="/#contacto" className="mt-5 inline-flex items-center gap-2 text-violet-400 text-sm font-semibold hover:text-violet-300 transition-colors">
                  {lang === 'es' ? 'Hablemos →' : "Let's talk →"}
                </a>
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes spinRing {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes dotBounce {
          0%, 100% { transform: translateY(0); }
          50%       { transform: translateY(-4px); }
        }
      `}</style>
    </section>
  );
}
