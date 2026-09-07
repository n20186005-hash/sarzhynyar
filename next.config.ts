import createNextIntlPlugin from 'next-intl/plugin';
import type { NextConfig } from 'next';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https' as const, hostname: 'images.unsplash.com' },
    ],
  },
  // 确保静态导出时正确处理图片路径
  output: 'export',
  distDir: 'out',
  // 以目录式 URL（/uk/）导出，利于 SEO 与后续托管
  trailingSlash: true,
  // 解决多lockfile警告
  outputFileTracingRoot: process.cwd(),
};

export default withNextIntl(nextConfig);
