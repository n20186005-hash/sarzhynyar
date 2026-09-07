import { setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import CookieSettingsClient from './CookieSettingsClient';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const baseUrl = 'https://sarzhynyar.com';
  const zhUrl = `${baseUrl}/zh/cookie-settings/`;
  const enUrl = `${baseUrl}/en/cookie-settings/`;
  const ruUrl = `${baseUrl}/ru/cookie-settings/`;
  const ukUrl = `${baseUrl}/uk/cookie-settings/`;
  let selfUrl = ukUrl;
  if (locale === 'zh') selfUrl = zhUrl;
  else if (locale === 'en') selfUrl = enUrl;
  else if (locale === 'ru') selfUrl = ruUrl;

  return {
    alternates: {
      canonical: selfUrl,
      languages: {
        'zh': zhUrl,
        'en': enUrl,
        'ru': ruUrl,
        'uk': ukUrl,
        'x-default': ukUrl,
      },
    },
  };
}

export default async function CookiePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <CookieSettingsClient />;
}
