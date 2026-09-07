import { useTranslations, useMessages } from 'next-intl';

type SeasonItem = {
  season: string;
  months: string;
  climate: string;
  water: string;
  nature: string;
  visit: string;
};

/**
 * 季度游览策略：气象/水源/自然/出行建议四象限 × 四季。
 */
export default function SeasonsSection() {
  const t = useTranslations('seasons');
  const messages = useMessages() as any;
  const items: SeasonItem[] = messages?.seasons?.items || [];

  const fieldLabels = [
    { key: 'climate', value: t('labels.climate') },
    { key: 'water', value: t('labels.water') },
    { key: 'nature', value: t('labels.nature') },
    { key: 'visit', value: t('labels.visit') },
  ] as const;

  return (
    <section className="section-padding" style={{ background: 'var(--bg-tertiary)' }}>
      <div className="max-w-6xl mx-auto">
        <h2 className="font-display text-3xl sm:text-4xl font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
          {t('title')}
        </h2>
        <p className="mb-4" style={{ color: 'var(--text-secondary)' }}>
          {t('subtitle')}
        </p>
        <div className="w-12 h-0.5 mb-6" style={{ background: 'var(--accent)' }} />
        <p className="text-xs mb-8" style={{ color: 'var(--text-muted)' }}>
          {t('dataNote')}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          {items.map((item, index) => (
            <div
              key={index}
              className="rounded-xl border p-6"
              style={{ background: 'var(--card-bg)', borderColor: 'var(--border-color)', boxShadow: 'var(--card-shadow)' }}
            >
              <p className="font-display text-2xl font-semibold" style={{ color: 'var(--accent)' }}>
                {item.season}
              </p>
              <p className="mt-1 text-sm font-medium" style={{ color: 'var(--text-muted)' }}>
                {item.months}
              </p>
              <dl className="mt-5 space-y-4">
                {fieldLabels.map((field) => (
                  <div key={field.key}>
                    <dt className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
                      {field.value}
                    </dt>
                    <dd className="mt-1 text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                      {item[field.key]}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
