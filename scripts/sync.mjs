import { writeFile } from 'node:fs/promises';
const source = 'https://raw.githubusercontent.com/doGior/doGiorsHadEnough/builds/plugins.json';
const response = await fetch(source, { signal: AbortSignal.timeout(30000) });
if (!response.ok) throw new Error('Upstream HTTP ' + response.status);
const all = await response.json();
if (!Array.isArray(all) || !all.length) throw new Error('Invalid upstream list');
const selected = all.filter(p => p.language === 'it' || p.name === 'Arte');
for (const p of selected) {
  if (!p.name || !p.internalName || !Number.isInteger(p.version) || !Number.isInteger(p.status) ||
      !Array.isArray(p.authors) || !p.url?.startsWith('https://raw.githubusercontent.com/doGior/doGiorsHadEnough/builds/'))
    throw new Error('Invalid plugin metadata');
}
if (!selected.length) throw new Error('Empty selection');
await writeFile('plugins.json', JSON.stringify(selected, null, 2) + '\n');
console.log('Updated', selected.length, 'plugins');
