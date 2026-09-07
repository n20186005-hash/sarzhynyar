import { useTranslations, useMessages } from 'next-intl';

/**
 * History & Significance 语义区块：
 * 以正文段落深化 Sarzhyn Yar 的历史与自然意义（E-E-A-T 内容补充）。
 */
export default function HistorySection() {
  const t = useTranslations('history');
  const messages = useMessages() as any;
  const paragraphs: string[] = messages?.history?.paragraphs || [];
  const lead: string = messages?.history?.lead || '';

  return (
    <section className="section-padding" style={{ background: 'var(--bg-tertiary)' }}>
      <div className="max-w-4xl mx-auto">
        <h2
          className="font-display text-3xl sm:text-4xl font-semibold mb-6"
          style={{ color: 'var(--text-primary)' }}
        >
          {t('title')}
        </h2>
        <div className="w-12 h-0.5 mb-8" style={{ background: 'var(--accent)' }} />

        {lead && (
          <p
            className="font-display text-xl sm:text-2xl italic mb-10 leading-relaxed"
            style={{ color: 'var(--text-secondary)' }}
          >
            {lead}
          </p>
        )}

        <div className="space-y-6">
          {paragraphs.map((paragraph, index) => (
            <div
              key={index}
              className="rounded-xl p-6 sm:p-8"
              style={{ background: 'var(--bg-secondary)', boxShadow: 'var(--card-shadow)' }}
            >
              <p className="text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                {paragraph}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
