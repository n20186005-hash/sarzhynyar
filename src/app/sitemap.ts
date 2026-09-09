import { MetadataRoute } from 'next';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://sarzhynyar.com';
  const locales = ['zh', 'en', 'ru', 'uk'];
  const routes = ['', '/privacy-policy', '/terms-of-service', '/cookie-settings', '/parks'];

  // 固定日期，避免每次构建产生漂移
  const lastModified = new Date('2026-09-09');

  const sitemap: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const route of routes) {
      const languages: Record<string, string> = {};
      for (const l of locales) {
        languages[l] = `${baseUrl}/${l}${route}/`;
      }
      // 与页面 <head> alternates 保持一致：x-default 指向默认语言 uk
      languages['x-default'] = `${baseUrl}/uk${route}/`;

      sitemap.push({
        url: `${baseUrl}/${locale}${route}/`,
        lastModified,
        changeFrequency: route === '' ? 'weekly' : 'monthly',
        priority: route === '' ? 1 : 0.5,
        alternates: {
          languages,
        },
      });
    }
  }

  return sitemap;
}
