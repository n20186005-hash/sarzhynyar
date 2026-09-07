import { useTranslations, useMessages } from 'next-intl';

type FacilityItem = { name: string; note: string };

function FacilityItemRow({ name, note }: { name: string; note: string }) {
  return (
    <li className="flex items-start gap-3 py-3 border-b last:border-b-0" style={{ borderColor: 'var(--border-color)' }}>
      <span
        className="mt-1 flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-white"
        style={{ background: 'var(--accent)' }}
        aria-hidden="true"
      >
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </span>
      <div>
        <p className="font-medium" style={{ color: 'var(--text-primary)' }}>{name}</p>
        <p className="mt-0.5 text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{note}</p>
      </div>
    </li>
  );
}

/**
 * 访客服务与周边设施：仅按“类型”客观列示（园内 vs 周边城区），不推荐具体商户。
 */
export default function FacilitiesSection() {
  const t = useTranslations('facilities');
  const messages = useMessages() as any;
  const onSiteItems: FacilityItem[] = messages?.facilities?.onSiteItems || [];
  const nearbyItems: FacilityItem[] = messages?.facilities?.nearbyItems || [];

  return (
    <section className="section-padding">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-display text-3xl sm:text-4xl font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
          {t('title')}
        </h2>
        <p className="mb-6" style={{ color: 'var(--text-secondary)' }}>
          {t('subtitle')}
        </p>
        <div className="w-12 h-0.5 mb-8" style={{ background: 'var(--accent)' }} />

        <div
          className="rounded-xl border px-6 py-4 mb-10 text-sm leading-relaxed"
          style={{
            background: 'var(--bg-tertiary)',
            borderColor: 'var(--border-color)',
            color: 'var(--text-secondary)',
          }}
        >
          {t('neutralNote')}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="rounded-xl p-6 sm:p-8" style={{ background: 'var(--card-bg)', boxShadow: 'var(--card-shadow)' }}>
            <h3 className="font-display text-xl sm:text-2xl font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
              {t('onSiteTitle')}
            </h3>
            <ul>
              {onSiteItems.map((item) => (
                <FacilityItemRow key={item.name} name={item.name} note={item.note} />
              ))}
            </ul>
          </div>

          <div className="rounded-xl p-6 sm:p-8" style={{ background: 'var(--card-bg)', boxShadow: 'var(--card-shadow)' }}>
            <h3 className="font-display text-xl sm:text-2xl font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
              {t('nearbyTitle')}
            </h3>
            <ul>
              {nearbyItems.map((item) => (
                <FacilityItemRow key={item.name} name={item.name} note={item.note} />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
