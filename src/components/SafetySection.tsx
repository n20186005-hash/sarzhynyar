import { useTranslations } from 'next-intl';

/**
 * Prominent, above-the-fold safety advisory for Sarzhyn Yar / Kharkiv.
 * Reflects martial-law realities: suspended civilian flights, curfew,
 * air-raid alerts, plus a "last verified" date and official links.
 */
export default function SafetySection() {
  const t = useTranslations('safety');
  const links = t.raw('links') as { name: string; url: string }[];

  const points = [
    { label: t('airportLabel'), text: t('airport') },
    { label: t('curfewLabel'), text: t('curfew') },
    { label: t('alertLabel'), text: t('alert') },
  ];

  return (
    <section
      aria-label={t('title')}
      style={{
        background: 'var(--safety-bg)',
        borderTop: '1px solid var(--safety-border)',
        borderBottom: '1px solid var(--safety-border)',
      }}
    >
      <div className="max-w-5xl mx-auto px-6 py-5">
        <div className="flex items-start gap-3">
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="var(--safety-accent)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mt-0.5 shrink-0"
            aria-hidden="true"
          >
            <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
            <line x1="12" y1="9" x2="12" y2="13" />
            <line x1="12" y1="17" x2="12.01" y2="17" />
          </svg>
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
              <h2
                className="text-base font-bold"
                style={{ color: 'var(--safety-accent)' }}
              >
                {t('title')}
              </h2>
              <span
                className="text-xs font-medium px-2 py-0.5 rounded-full"
                style={{ background: 'var(--safety-verified-bg)', color: 'var(--safety-accent)' }}
              >
                {t('verified')}
              </span>
            </div>
            <p
              className="mt-1.5 text-sm leading-relaxed"
              style={{ color: 'var(--text-secondary)' }}
            >
              {t('intro')}
            </p>

            <ul className="mt-3 space-y-2">
              {points.map((point, i) => (
                <li key={i} className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                  <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>
                    {point.label}:{' '}
                  </span>
                  {point.text}
                </li>
              ))}
            </ul>

            <div className="mt-3">
              <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: 'var(--text-muted)' }}>
                {t('linksTitle')}
              </p>
              <ul className="mt-1.5 flex flex-wrap gap-x-4 gap-y-1">
                {links.map((link) => (
                  <li key={link.url}>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm underline underline-offset-2 hover:no-underline"
                      style={{ color: 'var(--safety-accent)' }}
                    >
                      {link.name} ↗
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
