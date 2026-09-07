import { useTranslations, useMessages } from 'next-intl';

type LearnItem = { title: string; text: string };

/**
 * 科普与访客责任：科学事实卡片 + 负责任的游览规则。
 */
export default function ResponsibilitySection() {
  const t = useTranslations('responsibility');
  const messages = useMessages() as any;
  const learn: LearnItem[] = messages?.responsibility?.learn || [];
  const duties: string[] = messages?.responsibility?.duties || [];

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
          {t('learnTitle')}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
          {learn.map((item, index) => (
            <article
              key={index}
              className="rounded-xl p-6"
              style={{ background: 'var(--card-bg)', boxShadow: 'var(--card-shadow)' }}
            >
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center text-white mb-4"
                style={{ background: 'var(--accent)' }}
                aria-hidden="true"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="16" x2="12" y2="12" />
                  <line x1="12" y1="8" x2="12.01" y2="8" />
                </svg>
              </div>
              <h4 className="font-display text-xl font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>
                {item.title}
              </h4>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                {item.text}
              </p>
            </article>
          ))}
        </div>

        <h3 className="font-display text-xl sm:text-2xl font-semibold mb-6" style={{ color: 'var(--text-primary)' }}>
          {t('dutiesTitle')}
        </h3>

        <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3 mb-10">
          {duties.map((duty, index) => (
            <li key={index} className="flex items-start gap-3">
              <span
                className="mt-1 flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-white"
                style={{ background: 'var(--accent)' }}
                aria-hidden="true"
              >
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </span>
              <span className="text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                {duty}
              </span>
            </li>
          ))}
        </ul>

        <p
          className="rounded-xl border-l-4 px-6 py-4 text-base leading-relaxed"
          style={{ borderColor: 'var(--accent)', background: 'var(--card-bg)', color: 'var(--text-secondary)' }}
        >
          {t('note')}
        </p>
      </div>
    </section>
  );
}
