const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

function walk(dir, out = []) {
  for (const name of fs.readdirSync(dir)) {
    const p = path.join(dir, name);
    if (fs.statSync(p).isDirectory()) walk(p, out);
    else if (p.endsWith('.astro')) out.push(p);
  }
  return out;
}

function backupFile(file) {
  const bak = file + '.bak.' + Date.now();
  fs.copyFileSync(file, bak);
  return bak;
}

function tryParseYAML(text) {
  try {
    yaml.load(text);
    return null;
  } catch (e) {
    return e.message;
  }
}

function fixFrontMatterRaw(fm) {
  // normalize endings and remove BOM chars inside frontmatter
  fm = fm.replace(/\r\n/g, '\n').replace(/^\uFEFF/, '');

  // tabs -> two spaces
  fm = fm.replace(/\t/g, '  ');

  // remove trailing commas at line-ends (common JS-style mistake)
  fm = fm.replace(/,(\s*(\n|$))/g, '$1');

  // Heurística: se o valor contém caracteres como ":" "#" "{" "}" "[" "]" "," e não está entre aspas, coloque entre aspas
  fm = fm.split('\n').map(line => {
    const m = line.match(/^(\s*[^:\n]+:\s*)(.+)$/);
    if (!m) return line;
    const keyPart = m[1];
    let val = m[2].trim();
    if (val === '') return line;
    if (/^["']/.test(val)) return line; // já está citado
    if (/^(?:-?\d+(\.\d+)?|true|false|null)$/.test(val)) return line; // número ou boolean ou null
    // se valor tem caracteres problemáticos, cite-o
    if (/:|#|\{|\}|\[|\]|,/.test(val)) {
      // escapar aspas internas
      const escaped = val.replace(/"/g, '\\"');
      return keyPart + '"' + escaped + '"';
    }
    return line;
  }).join('\n');

  return fm;
}

function processFile(file) {
  let content = fs.readFileSync(file, 'utf8');

  // remove leading BOM
  if (content.charCodeAt(0) === 0xFEFF) content = content.slice(1);

  const m = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!m) return null; // sem front matter

  const rawFM = m[1];
  if (!tryParseYAML(rawFM)) return null; // já válido

  // aplicar heurísticas
  const fixedFM = fixFrontMatterRaw(rawFM);

  // revalidate
  const err = tryParseYAML(fixedFM);
  if (err) {
    return { file, changed: false, error: err };
  }

  // backup + write
  backupFile(file);
  const newContent = content.replace(/^---\r?\n([\s\S]*?)\r?\n---/, '---\n' + fixedFM + '\n---');
  fs.writeFileSync(file, newContent, 'utf8');
  return { file, changed: true };
}

(function main() {
  const root = path.resolve(__dirname, '..');
  const files = walk(root);
  const results = [];
  for (const f of files) {
    try {
      const r = processFile(f);
      if (r) results.push(r);
    } catch (e) {
      results.push({ file: f, changed: false, error: e.message || String(e) });
    }
  }

  const changed = results.filter(r => r.changed);
  const failed = results.filter(r => r.error);

  if (changed.length) {
    console.log('Arquivos atualizados:');
    changed.forEach(r => console.log('  -', r.file));
  } else {
    console.log('Nenhum arquivo foi modificado.');
  }

  if (failed.length) {
    console.error('\nFalhas ao tentar consertar (verifique manualmente):');
    failed.forEach(r => console.error('  -', r.file, '->', r.error));
    process.exit(2);
  } else {
    console.log('\nConsertos aplicados com sucesso (ou não havia erros além do que o script corrige).');
  }
})();
