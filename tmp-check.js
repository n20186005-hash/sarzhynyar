const fs = require('fs');
const html = fs.readFileSync('out/uk.html', 'utf8');
const root = fs.readFileSync('out/index.html', 'utf8');
const checks = ['Open-Meteo', 'open-meteo', 'ключ', 'безкоштовн', '免费', '密钥', 'API', 'no-store', 'localStorage'];
for (const c of checks) {
  console.log('contains ' + JSON.stringify(c) + ':', html.includes(c));
}
console.log('has forecast heading:', html.includes('Прогноз на 7 днів'));
console.log('h1 has Sarzhyn:', /<h1[\s\S]{0,600}?Саржин/.test(html));
console.log('breadcrumb chain:', html.includes('Саржин Яр') && html.includes('Харків') && html.includes('Україна'));
console.log('gallery old names left:', /sarzhyn-yar\s*\(\d+\)/.test(html));
const m = /(?:http-equiv="refresh"|content="0;\s*url=)([^"]+)/.exec(root);
console.log('root redirect target:', m ? m[1] : 'none');
console.log('uk page lang attr:', /<html[^>]*lang="([^"]+)"/.exec(html)?.[1]);
