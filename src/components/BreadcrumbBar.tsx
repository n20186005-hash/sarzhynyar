import { useTranslations } from 'next-intl';

/**
 * 地理面包屑：{{FULL_NAME}} → {{CITY}} → {{STATE}} → {{COUNTRY}}
 * 与首页 H1/正文共同建立“归属层级”语义。
 */
export default function BreadcrumbBar() {
  const t = useTranslations('mapSection');
  const parts = t('locationChain')
    .split('→')
    .map((part) => part.trim())
    .filter(Boolean);

  // 地理层级面包屑结构化数据：全称 → 城市 → 州/省 → 国家
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: parts.map((name, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd).replace(/</g, '\\u003c'),
        }}
      />
      <div className="border-b" style={{ background: 'var(--bg-tertiary)', borderColor: 'var(--border-color)' }}>
      <nav aria-label="Breadcrumb" className="max-w-5xl mx-auto px-6 py-3">
        <ol className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-sm">
          {parts.map((part, index) => (
            <li key={`${index}-${part}`} className="flex items-center gap-2">
              {index > 0 && (
                <span className="select-none" style={{ color: 'var(--text-muted)' }}>
                  ›
                </span>
              )}
              <span
                className={index === 0 ? 'font-semibold' : ''}
                style={{
                  color: index === 0 ? 'var(--text-primary)' : 'var(--text-secondary)',
                }}
              >
                {part}
              </span>
            </li>
          ))}
        </ol>
      </nav>
      </div>
    </>
  );
}
