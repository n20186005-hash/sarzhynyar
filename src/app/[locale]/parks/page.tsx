import { setRequestLocale } from 'next-intl/server';
import { useTranslations, useLocale, useMessages } from 'next-intl';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { routing } from '@/i18n/routing';
import { SITE } from '@/lib/site';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const messages = (await import(`@/messages/${locale}.json`)).default;
  const baseUrl = SITE.url;

  const zhUrl = `${baseUrl}/zh/parks/`;
  const enUrl = `${baseUrl}/en/parks/`;
  const ruUrl = `${baseUrl}/ru/parks/`;
  const ukUrl = `${baseUrl}/uk/parks/`;

  let selfUrl = ukUrl;
  if (locale === 'zh') selfUrl = zhUrl;
  else if (locale === 'en') selfUrl = enUrl;
  else if (locale === 'ru') selfUrl = ruUrl;

  return {
    title: messages.kharkivParks.meta.title,
    description: messages.kharkivParks.meta.description,
    alternates: {
      canonical: selfUrl,
      languages: {
        'zh': zhUrl,
        'en': enUrl,
        'ru': ruUrl,
        'uk': ukUrl,
        'x-default': ukUrl,
      } as Record<string, string>,
    },
    openGraph: {
      title: messages.kharkivParks.meta.title,
      description: messages.kharkivParks.meta.description,
      url: selfUrl,
      siteName: SITE.fullName,
      type: 'website',
      images: [
        {
          url: SITE.heroImageUrl,
          width: 1200,
          height: 630,
          alt: `${SITE.fullNameLocal} — ${SITE.city}`,
        },
      ],
    },
  };
}

function ParksContent() {
  const t = useTranslations('kharkivParks');
  const ht = useTranslations('header');
  const locale = useLocale();
  const messages = useMessages() as any;
  const items = (messages?.kharkivParks?.items || []) as Array<{
    name: string;
    tag: string;
    text: string;
  }>;
  const homeHref = `/${locale}/`;

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg-primary)' }}>
      <Header />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-32 pb-20">
        <a
          href={homeHref}
          className="inline-flex items-center gap-2 text-sm font-medium mb-10 transition-colors"
          style={{ color: 'var(--accent)' }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
          {ht('backToHome')}
        </a>

        <h1 className="font-display text-3xl sm:text-4xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>
          {t('title')}
        </h1>
        <p className="text-lg mb-6" style={{ color: 'var(--text-secondary)' }}>
          {t('subtitle')}
        </p>
        <p className="leading-relaxed mb-10 max-w-3xl" style={{ color: 'var(--text-secondary)' }}>
          {t('lead')}
        </p>
        <div className="w-12 h-0.5 mb-10" style={{ background: 'var(--accent)' }} />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {items.map((item, i) => (
            <article
              key={i}
              className="rounded-xl border p-6"
              style={{ background: 'var(--card-bg)', borderColor: 'var(--border-color)', boxShadow: 'var(--card-shadow)' }}
            >
              <p className="font-display text-sm font-semibold mb-2" style={{ color: 'var(--accent)' }}>
                {item.tag}
              </p>
              <h2 className="font-display text-xl font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>
                {item.name}
              </h2>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                {item.text}
              </p>
            </article>
          ))}
        </div>

        <div
          className="rounded-xl mt-10 p-8 sm:p-10"
          style={{ background: 'var(--accent)', color: '#ffffff' }}
        >
          <h2 className="font-display text-2xl sm:text-3xl font-semibold mb-3">{t('ctaTitle')}</h2>
          <p className="leading-relaxed text-white/95 mb-6 max-w-2xl">{t('ctaText')}</p>
          <a
            href={homeHref}
            className="inline-flex items-center gap-2 font-semibold rounded-full px-7 py-3 transition-transform"
            style={{ background: '#ffffff', color: 'var(--accent)' }}
          >
            {t('ctaLabel')}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </a>
        </div>

        <p className="mt-8 text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
          {t('note')}
        </p>
      </div>
      <Footer />
    </div>
  );
}

export default async function ParksPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }
  setRequestLocale(locale);
  return <ParksContent />;
}
