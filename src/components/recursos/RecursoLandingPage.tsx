import Link from 'next/link';
import DirectBookingCTA from '@/components/DirectBookingCTA';

export type RecursoStep = {
  num: string;
  title: string;
  text: string;
};

export type RecursoLandingContent = {
  eyebrow: string;
  heroTitle: string;
  heroSub: string;
  bookingUrl: string;
  topCtaDescription: string;
  checklistSection: { eyebrow: string; title: string; intro: string };
  checklist: RecursoStep[];
  phasesSection: { eyebrow: string; title: string; intro: string };
  phases: RecursoStep[];
  bottomCtaDescription: string;
};

export default function RecursoLandingPage({ content }: { content: RecursoLandingContent }) {
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      <div className="max-w-4xl mx-auto px-6 pt-10">
        <Link
          href="/#recursos"
          className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-violet-400 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Volver a recursos
        </Link>
      </div>

      <header className="max-w-4xl mx-auto px-6 py-16 text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-violet-400 mb-4">{content.eyebrow}</p>
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">{content.heroTitle}</h1>
        <p className="text-gray-400 text-xl max-w-2xl mx-auto leading-relaxed">{content.heroSub}</p>
      </header>

      <div className="max-w-4xl mx-auto px-6 pb-24">
        <DirectBookingCTA bookingUrl={content.bookingUrl} serviceDescription={content.topCtaDescription} />

        <section className="mb-16">
          <div className="mb-8">
            <p className="text-sm font-semibold uppercase tracking-widest text-violet-400 mb-2">
              {content.checklistSection.eyebrow}
            </p>
            <h2 className="text-3xl font-bold text-white">{content.checklistSection.title}</h2>
            <p className="text-gray-400 mt-3 leading-relaxed">{content.checklistSection.intro}</p>
          </div>
          <div className="space-y-4">
            {content.checklist.map((item) => (
              <div
                key={item.num}
                className="flex gap-6 rounded-xl border border-white/5 bg-white/[0.03] p-6 hover:border-violet-500/30 hover:bg-violet-950/20 transition-all duration-200"
              >
                <span className="text-2xl font-bold text-violet-500/40 flex-shrink-0 w-10">{item.num}</span>
                <div>
                  <h3 className="font-bold text-white mb-1">{item.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-16">
          <div className="mb-8">
            <p className="text-sm font-semibold uppercase tracking-widest text-violet-400 mb-2">
              {content.phasesSection.eyebrow}
            </p>
            <h2 className="text-3xl font-bold text-white">{content.phasesSection.title}</h2>
            <p className="text-gray-400 mt-3 leading-relaxed">{content.phasesSection.intro}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {content.phases.map((phase) => (
              <div
                key={phase.num}
                className="rounded-xl border border-white/5 bg-white/[0.03] p-6 border-l-4 border-l-violet-500"
              >
                <p className="text-xs font-bold uppercase tracking-widest text-violet-400 mb-2">Fase {phase.num}</p>
                <h3 className="font-bold text-white mb-2">{phase.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{phase.text}</p>
              </div>
            ))}
          </div>
        </section>

        <DirectBookingCTA bookingUrl={content.bookingUrl} serviceDescription={content.bottomCtaDescription} />
      </div>
    </div>
  );
}
