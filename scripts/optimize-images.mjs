/**
 * 图片体积优化（Web 性能）：
 * - public/gallery/sarzhyn-yar-park-*.jpg -> 最长边 1600px, JPEG q80, mozjpeg 渐进
 * - public/images/hero.jpg              -> 最长边 1920px, JPEG q80, mozjpeg 渐进
 * 使用 tmp 文件 + rename 规避大文件写盘/占用问题。
 * 运行：npm run optimize:images
 */
import { readdirSync, renameSync, statSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');

const jobs = [
  {
    dir: join(root, 'public', 'gallery'),
    glob: /^sarzhyn-yar-park-\d+\.jpg$/i,
    maxWidth: 1600,
    quality: 72,
  },
  {
    dir: join(root, 'public', 'images'),
    glob: /^hero\.jpg$/i,
    maxWidth: 1920,
    quality: 80,
  },
];

let savedTotal = 0;
let count = 0;

for (const job of jobs) {
  for (const name of readdirSync(job.dir)) {
    if (!job.glob.test(name)) continue;
    const src = join(job.dir, name);
    const tmp = join(job.dir, `.${name}.tmp`);
    const before = statSync(src).size;
    const info = await sharp(src)
      .rotate()
      .resize({ width: job.maxWidth, withoutEnlargement: true })
      .jpeg({ quality: job.quality ?? 80, progressive: true, mozjpeg: true })
      .toFile(tmp);
    if (existsSync(tmp)) {
      renameSync(tmp, src);
      const after = statSync(src).size;
      const saved = before - after;
      savedTotal += saved;
      count += 1;
      console.log(
        `${name}: ${(before / 1024).toFixed(0)}KB -> ${(after / 1024).toFixed(0)}KB` +
          ` (${info.width}x${info.height}, -${((saved / before) * 100).toFixed(1)}%)`,
      );
    }
  }
}

console.log(`Done. ${count} files optimized, total saved ${(savedTotal / 1024 / 1024).toFixed(2)}MB`);
