import { useTranslations, useMessages } from 'next-intl';

type Persona = {
  title: string;
  who: string;
  pace: string;
  bestTime: string;
  summary: string;
  points: string[];
  note: string;
};

type ItineraryStop = { name: string; note: string };
type Itinerary = { title: string; lead: string; stops: ItineraryStop[] };

const MetaRow = ({ label, value }: { label: string; value: string }) => (
  <p className="text-sm">
    <span className="font-semibold" style={{ color: 'var(--text-muted)' }}>{label}: </span>
    <span style={{ color: 'var(--text-secondary)' }}>{value}</span>
  </p>
);

/**
 * 分人群定制路线（亲子 / 摄影自然 / 低体力无障碍）+ 半日/全日通用路线。
 */
export default function VisitRoutesSection() {
  const t = useTranslations('trips');
  const messages = useMessages() as any;
  const personas: Persona[] = messages?.trips?.personas || [];
  const halfDay: Itinerary = messages?.trips?.halfDay;
  const fullDay: Itinerary = messages?.trips?.fullDay;

  return (
    <section className="section-padding" style={{ background: 'var(--bg-tertiary)' }}>
      <div className="max-w-6xl mx-auto">
        <h2 className="font-display text-3xl sm:text-4xl font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
          {t('title')}
        </h2>
        <p className="mb-8" style={{ color: 'var(--text-secondary)' }}>
          {t('subtitle')}
        </p>
        <div className="w-12 h-0.5 mb-10" style={{ background: 'var(--accent)' }} />

        <h3 className="font-display text-xl sm:text-2xl font-semibold mb-6" style={{ color: 'var(--text-primary)' }}>
          {t('personasLabel')}
        </h3>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-14">
          {personas.map((persona, index) => (
            <article
              key={index}
              className="rounded-xl border p-6 flex flex-col"
              style={{ background: 'var(--card-bg)', borderColor: 'var(--border-color)', boxShadow: 'var(--card-shadow)' }}
            >
              <p className="font-display text-sm font-semibold" style={{ color: 'var(--accent)' }}>
                {String(index + 1).padStart(2, '0')}
              </p>
              <h4 className="font-display text-2xl font-semibold mt-1 mb-4" style={{ color: 'var(--text-primary)' }}>
                {persona.title}
              </h4>
              <div className="space-y-1.5 mb-5">
                <MetaRow label={t('labels.who')} value={persona.who} />
                <MetaRow label={t('labels.pace')} value={persona.pace} />
                <MetaRow label={t('labels.bestTime')} value={persona.bestTime} />
              </div>
              <p className="text-sm leading-relaxed mb-5" style={{ color: 'var(--text-secondary)' }}>
                {persona.summary}
              </p>
              <ol className="mb-5 space-y-3 flex-1">
                {persona.points.map((point, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span
                      className="mt-0.5 flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold text-white"
                      style={{ background: 'var(--accent)' }}
                    >
                      {i + 1}
                    </span>
                    <span className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                      {point}
                    </span>
                  </li>
                ))}
              </ol>
              <p
                className="text-sm leading-relaxed rounded-lg px-4 py-3 italic"
                style={{ background: 'var(--bg-tertiary)', color: 'var(--text-secondary)' }}
              >
                {persona.note}
              </p>
            </article>
          ))}
        </div>

        <h3 className="font-display text-xl sm:text-2xl font-semibold mb-6" style={{ color: 'var(--text-primary)' }}>
          {t('durationTitle')}
        </h3>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {[halfDay, fullDay]
            .filter((it) => it && it.stops?.length)
            .map((it, index) => (
              <div
                key={index}
                className="rounded-xl p-6 sm:p-8"
                style={{ background: 'var(--card-bg)', boxShadow: 'var(--card-shadow)' }}
              >
                <h4 className="font-display text-2xl font-semibold mb-1" style={{ color: 'var(--accent)' }}>
                  {it.title}
                </h4>
                <p className="text-sm mb-6" style={{ color: 'var(--text-secondary)' }}>
                  {it.lead}
                </p>
                <ol className="space-y-5">
                  {it.stops.map((stop, i) => (
                    <li key={i} className="flex items-start gap-4">
                      <span
                        className="mt-0.5 flex-shrink-0 w-8 h-8 rounded-full border-2 flex items-center justify-center font-display font-semibold"
                        style={{ borderColor: 'var(--accent)', color: 'var(--accent)' }}
                      >
                        {i + 1}
                      </span>
                      <div>
                        <p className="font-medium" style={{ color: 'var(--text-primary)' }}>
                          {stop.name}
                        </p>
                        <p className="mt-0.5 text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                          {stop.note}
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}
