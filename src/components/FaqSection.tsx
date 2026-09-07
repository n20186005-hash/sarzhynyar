import { useTranslations, useMessages } from 'next-intl';

type FaqItem = { q: string; a: string };

/**
 * FAQ 区块：可见问答（<details> 手风琴）+ 对应内容一致的 FAQPage JSON-LD，
 * 用于争取 Featured Snippet / AI Overview 卡片。
 */
export default function FaqSection() {
  const t = useTranslations('faq');
  const messages = useMessages() as any;
  const items: FaqItem[] = messages?.faq?.items || [];

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
      },
    })),
  };

  return (
    <section id="faq" className="section-padding">
      <div className="max-w-3xl mx-auto">
        <h2
          className="font-display text-3xl sm:text-4xl font-semibold mb-6 text-center"
          style={{ color: 'var(--text-primary)' }}
        >
          {t('title')}
        </h2>
        <div className="w-12 h-0.5 mx-auto mb-4" style={{ background: 'var(--accent)' }} />
        <p
          className="text-center text-lg mb-10"
          style={{ color: 'var(--text-secondary)' }}
        >
          {t('subtitle')}
        </p>

        <div className="space-y-4">
          {items.map((item, index) => (
            <details
              key={index}
              className="group rounded-xl border overflow-hidden"
              style={{
                background: 'var(--card-bg)',
                borderColor: 'var(--border-color)',
              }}
            >
              <summary
                className="flex items-center justify-between gap-4 cursor-pointer list-none px-6 py-5 select-none [&::-webkit-details-marker]:hidden"
                style={{ color: 'var(--text-primary)' }}
              >
                <span className="font-display text-lg font-semibold leading-snug">
                  {item.q}
                </span>
                <span
                  className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-white transition-transform duration-300 group-open:rotate-45"
                  style={{ background: 'var(--accent)' }}
                >
                  +
                </span>
              </summary>
              <div className="px-6 pb-6 text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                {item.a}
              </div>
            </details>
          ))}
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqJsonLd).replace(/</g, '\\u003c'),
        }}
      />
    </section>
  );
}
