'use client';

import { useEffect, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';

type WeatherCodeCategory =
  | 'clear'
  | 'partlyCloudy'
  | 'cloudy'
  | 'fog'
  | 'drizzle'
  | 'rain'
  | 'snow'
  | 'storm';

type CurrentWeather = {
  time: string;
  temperature_2m: number;
  relative_humidity_2m: number;
  apparent_temperature: number;
  precipitation: number;
  weather_code: number;
  wind_speed_10m: number;
  uv_index?: number;
  wind_gusts_10m?: number;
};

type DailyWeather = {
  time: string[];
  weather_code: number[];
  temperature_2m_max: number[];
  temperature_2m_min: number[];
  precipitation_probability_max: number[];
  precipitation_sum: number[];
  uv_index_max?: number[];
};

type WeatherData = {
  current: CurrentWeather;
  daily: DailyWeather;
};

const LAT = 50.0266;
const LON = 36.2312;
const CACHE_KEY = 'sarzhyn-weather-v2';
const CACHE_TTL_MS = 30 * 60 * 1000;

function categoryOf(code: number): WeatherCodeCategory {
  if (code === 0 || code === 1) return 'clear';
  if (code === 2) return 'partlyCloudy';
  if (code === 3) return 'cloudy';
  if (code === 45 || code === 48) return 'fog';
  if (code >= 51 && code <= 57) return 'drizzle';
  if ((code >= 61 && code <= 67) || (code >= 80 && code <= 82)) return 'rain';
  if ((code >= 71 && code <= 77) || (code >= 85 && code <= 86)) return 'snow';
  if (code >= 95) return 'storm';
  return 'cloudy';
}

function WeatherIcon({ type, size = 26 }: { type: WeatherCodeCategory; size?: number }) {
  const strokeProps = {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 2,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  };

  if (type === 'clear') {
    return (
      <svg {...strokeProps}>
        <circle cx="12" cy="12" r="5" />
        <line x1="12" y1="1" x2="12" y2="3" />
        <line x1="12" y1="21" x2="12" y2="23" />
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
        <line x1="1" y1="12" x2="3" y2="12" />
        <line x1="21" y1="12" x2="23" y2="12" />
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
      </svg>
    );
  }

  if (type === 'storm') {
    return (
      <svg {...strokeProps}>
        <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
        <polyline points="13 13 9.5 16.5 12 16.5 8 21 14 15 11.5 15 15 12" />
      </svg>
    );
  }

  if (type === 'rain' || type === 'drizzle') {
    return (
      <svg {...strokeProps}>
        <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
        <line x1="16" y1="13" x2="16" y2="21" />
        <line x1="8" y1="13" x2="8" y2="21" />
        <line x1="12" y1="15" x2="12" y2="23" />
      </svg>
    );
  }

  if (type === 'snow') {
    return (
      <svg {...strokeProps}>
        <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
        <circle cx="7.5" cy="19.5" r="1.2" fill="currentColor" stroke="none" />
        <circle cx="12" cy="22" r="1.2" fill="currentColor" stroke="none" />
        <circle cx="16.5" cy="19.5" r="1.2" fill="currentColor" stroke="none" />
      </svg>
    );
  }

  if (type === 'fog') {
    return (
      <svg {...strokeProps}>
        <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
        <line x1="5" y1="16" x2="19" y2="16" />
        <line x1="7" y1="20" x2="17" y2="20" />
      </svg>
    );
  }

  if (type === 'partlyCloudy') {
    return (
      <svg {...strokeProps}>
        <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
        <circle cx="7" cy="6" r="3.4" />
        <line x1="7" y1="0.5" x2="7" y2="1.5" />
        <line x1="12.7" y1="2.3" x2="11.9" y2="3.1" />
      </svg>
    );
  }

  // cloudy (and fallback)
  return (
    <svg {...strokeProps}>
      <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
    </svg>
  );
}

function AdviceBlock({ label, texts }: { label: string; texts: string[] }) {
  return (
    <div>
      <p
        className="mb-3 inline-flex rounded-md px-2.5 py-1 text-sm font-medium"
        style={{ background: 'var(--bg-tertiary)', color: 'var(--accent)' }}
      >
        {label}
      </p>
      <ul className="space-y-2.5">
        {texts.map((text, i) => (
          <li key={i} className="flex items-start gap-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
            <span className="mt-1.5 flex-shrink-0 w-1.5 h-1.5 rounded-full" style={{ background: 'var(--accent)' }} />
            <span>{text}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function WeatherSection() {
  const t = useTranslations('weather');
  const locale = useLocale();
  const [data, setData] = useState<WeatherData | null>(null);
  const [failed, setFailed] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    const endpoint =
      `https://api.open-meteo.com/v1/forecast` +
      `?latitude=${LAT}&longitude=${LON}` +
      `&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m,wind_gusts_10m,uv_index` +
      `&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,precipitation_sum,uv_index_max` +
      `&timezone=${encodeURIComponent('Europe/Kyiv')}&forecast_days=7`;

    async function load() {
      try {
        if (typeof window !== 'undefined') {
          const cached = window.localStorage.getItem(CACHE_KEY);
          if (cached) {
            const parsed = JSON.parse(cached);
            if (parsed && parsed.ts && Date.now() - parsed.ts < CACHE_TTL_MS && parsed.data) {
              if (!cancelled) {
                setData(parsed.data as WeatherData);
                setLoading(false);
              }
              return;
            }
          }
        }
        const res = await fetch(endpoint, { cache: 'no-store' });
        if (!res.ok) throw new Error(`weather ${res.status}`);
        const json = (await res.json()) as WeatherData;
        if (typeof window !== 'undefined') {
          try {
            window.localStorage.setItem(
              CACHE_KEY,
              JSON.stringify({ ts: Date.now(), data: json })
            );
          } catch {
            /* ignore quota errors */
          }
        }
        if (!cancelled) {
          setData(json);
          setLoading(false);
        }
      } catch {
        if (!cancelled) setFailed(true);
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const localeTag = locale === 'uk' ? 'uk-UA' : locale === 'ru' ? 'ru-RU' : locale === 'zh' ? 'zh-CN' : 'en-GB';

  const toLocalDate = (dateStr: string) => {
    const [y, m, d] = dateStr.split('-').map(Number);
    return new Date(y, m - 1, d, 12);
  };

  const dayLabel = (dateStr: string) =>
    toLocalDate(dateStr).toLocaleDateString(localeTag, { weekday: 'short', day: 'numeric' });

  const fullDayLabel = (dateStr: string) =>
    toLocalDate(dateStr).toLocaleDateString(localeTag, { weekday: 'long', month: 'long', day: 'numeric' });

  const round = (n: number) => Math.round(n);

  const currentCategory: WeatherCodeCategory | null = data ? categoryOf(data.current.weather_code) : null;

  // —— 今日游客建议：仅匹配到的条件才输出，风险项单独置顶 ——
  const adviceData = data
    ? (() => {
        const d = data.daily;
        const day0 = d.time[0] ?? '';
        const maxT = round(d.temperature_2m_max?.[0] ?? data.current.temperature_2m);
        const minT = round(d.temperature_2m_min?.[0] ?? data.current.temperature_2m);
        const codeT = d.weather_code[0];
        const catT = categoryOf(codeT);
        const prob = d.precipitation_probability_max?.[0] ?? 0;
        const uvMax = Math.round(d.uv_index_max?.[0] ?? 0);
        const windCur = round(data.current.wind_speed_10m);
        const month = Number(day0.slice(5, 7)) || 0;
        const range = maxT - minT;
        const storm = codeT >= 95;
        const heavy = codeT === 65 || codeT === 82;
        const precipToday = catT === 'drizzle' || catT === 'rain' || catT === 'storm';
        const lightRain = (catT === 'drizzle' || catT === 'rain') && !heavy && !storm;
        const snow = catT === 'snow';
        const fog = catT === 'fog';
        const clearish = catT === 'clear' || catT === 'partlyCloudy';
        const overcast = catT === 'cloudy';
        const windy = windCur >= 29;
        const gale = windCur >= 50;
        const hot = maxT >= 32;
        const veryHot = maxT >= 35;
        const cool = maxT <= 10;
        const freeze = minT <= -2;
        const poolDay =
          maxT >= 28 && month >= 5 && month <= 9 && !precipToday && !snow && !fog && !storm;

        const dress: string[] = [];
        const play: string[] = [];
        const pack: string[] = [];
        const risk: string[] = [];

        if (range > 8) dress.push('aLayers');
        if (hot) dress.push('aHot');
        if (cool) dress.push('aCold');
        if (precipToday || prob >= 60) dress.push('aRain');
        else if (windy) dress.push('aWind');

        if (storm || heavy) {
          // 强雷雨：以风险提醒为主，游玩建议从略
        } else if (snow) {
          play.push('pSnow');
        } else if (fog) {
          play.push('pFog');
        } else if (precipToday) {
          if (lightRain) play.push('pRain');
        } else if (prob >= 60) {
          play.push('pRain');
        } else if (clearish) {
          play.push('pClear');
        } else if (overcast) {
          play.push('pCloudy');
        }
        if (hot && !precipToday && !storm && !snow && !fog) play.push('pHeat');
        if (poolDay && (clearish || overcast)) {
          play.push('pWater');
          pack.push('kSwim');
        }
        if (windy && !precipToday && !fog && !snow) play.push('pWind');

        if (prob >= 60 || precipToday) pack.push('kUmbrella');
        if (heavy || storm || (precipToday && windCur >= 39)) pack.push('kRaincoat');
        if (uvMax >= 5) pack.push('kSun');
        if (maxT >= 28 || uvMax >= 8) pack.push('kWater');
        if (cool) pack.push('kWarm');
        if (freeze) pack.push('kGloves');
        pack.push('kComfort');

        if (storm) risk.push('rStorm');
        if (heavy) risk.push('rHeavy');
        if (gale) risk.push('rWind');
        if (fog) risk.push('rFog');
        if (veryHot) risk.push('rHeat');

        return { dress, play, pack, risk };
      })()
    : null;

  return (
    <section className="section-padding" style={{ background: 'var(--bg-secondary)' }}>
      <div className="max-w-5xl mx-auto">
        <h2 className="font-display text-3xl sm:text-4xl font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
          {t('title')}
        </h2>
        <p className="mb-8" style={{ color: 'var(--text-secondary)' }}>
          {t('subtitle')}
        </p>
        <div className="w-12 h-0.5 mb-10" style={{ background: 'var(--accent)' }} />

        {loading && !data && (
          <div className="rounded-xl p-6 sm:p-8" style={{ background: 'var(--card-bg)', boxShadow: 'var(--card-shadow)' }}>
            <div className="animate-pulse space-y-4">
              <div className="h-8 w-2/5 rounded" style={{ background: 'var(--border-color)' }} />
              <div className="h-16 w-1/3 rounded" style={{ background: 'var(--border-color)' }} />
              <div className="h-6 w-3/5 rounded" style={{ background: 'var(--border-color)' }} />
            </div>
          </div>
        )}

        {!loading && !data && (
          <div className="rounded-xl p-6 text-center" style={{ background: 'var(--card-bg)', boxShadow: 'var(--card-shadow)' }}>
            <p style={{ color: 'var(--text-secondary)' }}>{t('unavailable')}</p>
          </div>
        )}

        {failed && data && null}
        {data && currentCategory && (
          <>
            {/* 当前天气 */}
            <div
              className="rounded-xl p-6 sm:p-8 mb-6"
              style={{ background: 'var(--card-bg)', boxShadow: 'var(--card-shadow)' }}
            >
              <div className="grid grid-cols-1 md:grid-cols-[1.1fr_1fr] gap-8 items-center">
                <div>
                  <div className="flex items-center gap-3 mb-2" style={{ color: 'var(--text-muted)' }}>
                    <span className="text-sm font-medium">{t('now')}</span>
                    <span className="text-xs">
                      {fullDayLabel(data.daily.time[0])}
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <WeatherIcon type={currentCategory} size={56} />
                    <span className="font-display text-5xl sm:text-6xl font-semibold" style={{ color: 'var(--text-primary)' }}>
                      {round(data.current.temperature_2m)}°
                    </span>
                  </div>
                  <p className="mt-3 text-lg" style={{ color: 'var(--text-secondary)' }}>
                    {t(`codes.${currentCategory}`)}
                  </p>
                </div>
                <dl className="grid grid-cols-2 gap-x-6 gap-y-4 text-sm">
                  <div>
                    <dt style={{ color: 'var(--text-muted)' }}>{t('feelsLike')}</dt>
                    <dd className="mt-1 text-lg font-medium" style={{ color: 'var(--text-primary)' }}>
                      {round(data.current.apparent_temperature)}°
                    </dd>
                  </div>
                  <div>
                    <dt style={{ color: 'var(--text-muted)' }}>{t('humidity')}</dt>
                    <dd className="mt-1 text-lg font-medium" style={{ color: 'var(--text-primary)' }}>
                      {data.current.relative_humidity_2m}%
                    </dd>
                  </div>
                  <div>
                    <dt style={{ color: 'var(--text-muted)' }}>{t('wind')}</dt>
                    <dd className="mt-1 text-lg font-medium" style={{ color: 'var(--text-primary)' }}>
                      {round(data.current.wind_speed_10m)} {t('windUnit')}
                    </dd>
                  </div>
                  <div>
                    <dt style={{ color: 'var(--text-muted)' }}>{t('precipitation')}</dt>
                    <dd className="mt-1 text-lg font-medium" style={{ color: 'var(--text-primary)' }}>
                      {data.daily.precipitation_probability_max?.[0] ?? 0}%
                    </dd>
                  </div>
                </dl>
              </div>
            </div>

            {/* 今日游客建议：风险置顶红色，穿搭/游玩/随身动态展示 */}
            {adviceData && (
              <div className="mb-10">
                {adviceData.risk.length > 0 && (
                  <div
                    className="rounded-xl border p-5 sm:p-6 mb-5"
                    style={{ background: 'rgba(220, 38, 38, 0.08)', borderColor: 'rgba(220, 38, 38, 0.45)' }}
                  >
                    <div className="flex items-start gap-3">
                      <svg
                        width="22"
                        height="22"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#b91c1c"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        style={{ flexShrink: 0, marginTop: 2 }}
                      >
                        <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                        <line x1="12" y1="9" x2="12" y2="13" />
                        <line x1="12" y1="17" x2="12.01" y2="17" />
                      </svg>
                      <div>
                        <p className="font-semibold" style={{ color: '#b91c1c' }}>
                          {t('advice.sectionRisk')}
                        </p>
                        <ul className="mt-2 space-y-1.5 text-sm" style={{ color: 'var(--text-primary)' }}>
                          {adviceData.risk.map((key, i) => (
                            <li key={i}>{t(`advice.${key}`)}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}

                <div
                  className="rounded-xl p-6 sm:p-8"
                  style={{ background: 'var(--card-bg)', boxShadow: 'var(--card-shadow)' }}
                >
                  <h3 className="font-display text-xl font-semibold" style={{ color: 'var(--text-primary)' }}>
                    {t('advice.title')}
                  </h3>
                  <div className="mt-5 grid grid-cols-1 gap-6 md:grid-cols-3">
                    {adviceData.dress.length > 0 && (
                      <AdviceBlock
                        label={t('advice.sectionDress')}
                        texts={adviceData.dress.map((key) => t(`advice.${key}`))}
                      />
                    )}
                    {adviceData.play.length > 0 && (
                      <AdviceBlock
                        label={t('advice.sectionPlay')}
                        texts={adviceData.play.map((key) => t(`advice.${key}`))}
                      />
                    )}
                    {adviceData.pack.length > 0 && (
                      <AdviceBlock
                        label={t('advice.sectionPack')}
                        texts={adviceData.pack.map((key) => t(`advice.${key}`))}
                      />
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* 7 日预报 */}
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display text-xl font-semibold" style={{ color: 'var(--text-primary)' }}>
                {t('forecastTitle')}
              </h3>
              <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
                {t('today')}: {round(data.daily.temperature_2m_min[0])}°–{round(data.daily.temperature_2m_max[0])}°
              </span>
            </div>
            <div className="flex gap-3 overflow-x-auto pb-2 snap-x">
              {data.daily.time.map((dateStr, i) => {
                const cat = categoryOf(data.daily.weather_code[i]);
                const isToday = i === 0;
                return (
                  <div
                    key={dateStr}
                    className={`snap-start flex-shrink-0 w-28 rounded-xl border p-4 text-center ${
                      isToday ? '' : ''
                    }`}
                    style={{
                      background: isToday ? 'var(--bg-tertiary)' : 'var(--card-bg)',
                      borderColor: isToday ? 'var(--accent)' : 'var(--border-color)',
                      boxShadow: 'var(--card-shadow)',
                    }}
                  >
                    <p className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
                      {dayLabel(dateStr)}
                    </p>
                    <div className="my-3 flex justify-center" style={{ color: 'var(--accent)' }}>
                      <WeatherIcon type={cat} size={30} />
                    </div>
                    <p className="text-sm" style={{ color: 'var(--text-primary)' }}>
                      {round(data.daily.temperature_2m_min[i])}° / {round(data.daily.temperature_2m_max[i])}°
                    </p>
                    <p className="mt-1 text-xs truncate" style={{ color: 'var(--text-muted)' }}>
                      {t(`codes.${cat}`)}
                    </p>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
