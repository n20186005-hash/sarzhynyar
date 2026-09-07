// 静态导出后处理：确保站点的根路径（/）指向默认语言 /uk/
// 说明：纯静态托管没有运行时 middleware，无法执行服务端 redirect，
// 因此用零依赖的 meta refresh 生成 / 的 index.html。
import { writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const outDir = join(root, 'out');

const html = `<!doctype html>
<html lang="uk">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta http-equiv="refresh" content="0; url=/uk/" />
    <title>Саржин Яр (Харків) - путівник відвідувача</title>
  </head>
  <body>
    <p>Перенаправлення на українську версію&hellip; <a href="/uk/">Перейти</a></p>
  </body>
</html>`;

writeFileSync(join(outDir, 'index.html'), html, 'utf8');
console.log('[postexport] wrote root index.html -> /uk/');
