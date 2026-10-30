import { writeFile } from 'node:fs/promises';

// Fonte principale: doGior. Fonte aggiuntiva: PriSynx, solo per le estensioni
// che doGior non ha o che doGior segna come non disponibili (status 0).
const sources = [
  {
    list: 'https://raw.githubusercontent.com/doGior/doGiorsHadEnough/builds/plugins.json',
    prefix: 'https://raw.githubusercontent.com/doGior/doGiorsHadEnough/builds/',
    pick: p => p.language === 'it' || p.name === 'Arte',
  },
  {
    list: 'https://raw.githubusercontent.com/qwertyuiop8899/prisynx_cs3/builds/plugins.json',
    prefix: 'https://raw.githubusercontent.com/qwertyuiop8899/prisynx_cs3/builds/',
    pick: p => p.language === 'it',
  },
];

async function load({ list, prefix, pick }) {
  const response = await fetch(list, { signal: AbortSignal.timeout(30000) });
  if (!response.ok) throw new Error(`HTTP ${response.status} ${list}`);
  const all = await response.json();
  if (!Array.isArray(all) || !all.length) throw new Error('Invalid list ' + list);
  const selected = all.filter(pick);
  for (const p of selected) {
    if (!p.name || !p.internalName || !Number.isInteger(p.version) || !Number.isInteger(p.status) ||
        !Array.isArray(p.authors) || !p.url?.startsWith(prefix))
      throw new Error('Invalid plugin metadata in ' + list);
  }
  if (!selected.length) throw new Error('Empty selection ' + list);
  return selected;
}

const [main, extra] = await Promise.all(sources.map(load));
const key = p => p.internalName.toLowerCase();
const result = new Map(main.map(p => [key(p), p]));

for (const p of extra) {
  const existing = result.get(key(p));
  if (!existing || (existing.status === 0 && p.status !== 0)) result.set(key(p), p);
}

const plugins = [...result.values()].sort((a, b) => a.name.localeCompare(b.name));
await writeFile('plugins.json', JSON.stringify(plugins, null, 2) + '\n');
console.log('Updated', plugins.length, 'plugins');
