import { useTranslations, useMessages } from 'next-intl';
import { SITE } from '@/lib/site';

type SourceLink = {
  label: string;
  url: string;
};

/**
 * 资料来源板块：汇聚政府/官方旅游局等权威外链，增强 E-E-A-T 专业性与可信度。
 */
export default function SourcesSection() {
  const t = useTranslations('sources');
  const messages = useMessages() as any;
  const officialLinks = messages?.footer?.officialLinks || {};

  const links: SourceLink[] = [
    {
      label: officialLinks?.tourism?.name || '',
      url: officialLinks?.tourism?.url || '',
    },
    {
      label: officialLinks?.kharkivoda?.name || '',
      url: officialLinks?.kharkivoda?.url || '',
    },
    {
      label: officialLinks?.mcip?.name || '',
      url: officialLinks?.mcip?.url || '',
    },
    {
      label: t('mapsLabel'),
      url: SITE.mapsShareUrl,
    },
  ].filter((link) => link.label && link.url);

  return (
    <section id="sources" className="section-padding" style={{ background: 'var(--bg-tertiary)' }}>
      <div className="max-w-4xl mx-auto">
        <h2
          className="font-display text-3xl sm:text-4xl font-semibold mb-6 text-center"
          style={{ color: 'var(--text-primary)' }}
        >
          {t('title')}
        </h2>
        <div className="w-12 h-0.5 mx-auto mb-4" style={{ background: 'var(--accent)' }} />
        <p className="text-center text-lg mb-10" style={{ color: 'var(--text-secondary)' }}>
          {t('subtitle')}
        </p>

        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {links.map((link, index) => {
            let host = '';
            try {
              host = new URL(link.url).hostname.replace(/^www\./, '');
            } catch {
              host = link.url;
            }
            return (
              <li key={index}>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block rounded-xl border p-6 h-full transition-transform hover:-translate-y-0.5"
                  style={{
                    background: 'var(--card-bg)',
                    borderColor: 'var(--border-color)',
                    boxShadow: 'var(--card-shadow)',
                  }}
                >
                  <span className="flex items-start justify-between gap-3">
                    <span className="font-display text-lg font-semibold leading-snug" style={{ color: 'var(--text-primary)' }}>
                      {link.label}
                    </span>
                    <span
                      className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-white"
                      style={{ background: 'var(--accent)' }}
                      aria-hidden="true"
                    >
                      ↗
                    </span>
                  </span>
                  <span className="block mt-3 text-sm break-all" style={{ color: 'var(--text-muted)' }}>
                    {host}
                  </span>
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
