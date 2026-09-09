// 单景点 SEO 实体绑定配置
// 对应需求中的“单景点 SEO 实体绑定配置变量表”，全站共用，改动这里即可。
export const SITE = {
  // {{DOMAIN_NAME}}
  domain: 'sarzhynyar.com',
  // 网站主站地址
  url: 'https://sarzhynyar.com',
  // {{ATTRACTION_FULL_NAME}} 官方全称
  fullName: 'Sarzhyn Yar',
  // 官方全称（当地语言写法）
  fullNameLocal: 'Саржин Яр',
  // {{ATTRACTION_SHORT_NAME}} 常用俗称（与域名含义一致）
  shortName: 'Sarzhyn Yar',
  // {{CITY_NAME}}
  city: 'Kharkiv',
  // {{STATE_PROVINCE}}
  state: 'Kharkiv Oblast',
  // {{COUNTRY_NAME}}
  country: 'Ukraine',
  // {{COUNTRY_CODE_2LETTER}}
  countryCode: 'UA',
  // {{POSTAL_CODE}}
  postalCode: '61000',
  // {{LATITUDE}} / {{LONGITUDE}}（与 Google Maps 地点标注一致，来自官方 pb embed 中心坐标）
  latitude: 50.0265698,
  longitude: 36.2311716,
  // {{MAPS_SHARE_URL}}
  mapsShareUrl: 'https://maps.app.goo.gl/uvLNbbjwgavkq2VP6',
  // {{MAPS_EMBED_SRC}}（Google Maps 官方精确 pb 嵌入链接）
  mapEmbedSrc:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4555.66647361485!2d36.23117159999999!3d50.0265698!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4127a6cd428fa91b%3A0xc1eeead81d445bbe!2sSarzhyn%20Yar!5e1!3m2!1szh-CN!2s!4v1788936360574!5m2!1szh-CN!2s',
  // Plus Code
  plusCode: '26GJ+JF Kharkiv, Kharkiv Oblast, Ukraine',
  // 评分与评论数（最新 Google 数据）
  rating: '4.8',
  reviewCount: '32,968',
  // {{NEARBY_LANDMARK_1}} / {{NEARBY_LANDMARK_2}}
  nearbyLandmark1: 'Kharkiv Botanical Garden',
  nearbyLandmark2: 'Kharkiv Cable Car',
  // {{GOVT_TOURISM_URL}} 官方旅游局 / 政府权威链接
  govtTourismUrl: 'https://www.tourism.gov.ua/',
  kharkivOdaUrl: 'https://kharkivoda.gov.ua/',
  // GA4
  ga4Id: 'G-HXM22WWPKP',
  // 主视觉（OG 图片与 JSON-LD image）
  heroImagePath: '/images/hero.jpg',
  heroImageUrl: 'https://sarzhynyar.com/images/hero.jpg',
} as const;

// 本地化首页地址
export function localeHomeUrl(locale: string): string {
  return `${SITE.url}/${locale}`;
}

// 结构化数据用 JSON-LD：Park / TouristAttraction（含开放时间与评分，支持富摘要）
export function buildAttractionJsonLd(description: string): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'TouristAttraction',
    additionalType: 'https://schema.org/Park',
    '@id': `${SITE.url}/#attraction`,
    name: `${SITE.fullNameLocal} (${SITE.fullName})`,
    alternateName: [
      SITE.shortName,
      SITE.fullNameLocal,
      `${SITE.city} ${SITE.fullName}`,
      `${SITE.fullNameLocal} ${SITE.fullName}`,
    ],
    description,
    url: `${SITE.url}/`,
    image: [SITE.heroImageUrl],
    isAccessibleForFree: true,
    publicAccess: true,
    openingHours: 'Mo-Su 00:00-24:00',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Саржин Яр, Шевченківський район (Pavlovo Pole)',
      addressLocality: SITE.city,
      addressRegion: SITE.state,
      postalCode: SITE.postalCode,
      addressCountry: SITE.countryCode,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: SITE.latitude,
      longitude: SITE.longitude,
    },
    hasMap: SITE.mapsShareUrl,
    sameAs: [SITE.mapsShareUrl, SITE.govtTourismUrl, SITE.kharkivOdaUrl],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: SITE.rating,
      bestRating: '5',
      worstRating: '1',
      ratingCount: parseInt(SITE.reviewCount.replace(/,/g, ''), 10),
      author: {
        '@type': 'Organization',
        name: 'Google Maps',
      },
    },
    additionalProperty: [
      {
        '@type': 'PropertyValue',
        name: 'Google Rating',
        value: SITE.rating,
      },
      {
        '@type': 'PropertyValue',
        name: 'Google Review Count',
        value: SITE.reviewCount,
      },
    ],
  };
}
