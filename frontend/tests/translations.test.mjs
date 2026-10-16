import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import Module from 'node:module';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';

const testDirectory = path.dirname(fileURLToPath(import.meta.url));
const loadJson = relativePath => JSON.parse(fs.readFileSync(path.resolve(testDirectory, relativePath), 'utf8'));

function loadTypeScript(relativePath) {
  const filename = path.resolve(testDirectory, '..', relativePath);
  const source = fs.readFileSync(filename, 'utf8');
  const { outputText } = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, esModuleInterop: true, resolveJsonModule: true } });
  const compiled = new Module(filename);
  compiled.filename = filename;
  compiled.paths = Module._nodeModulePaths(path.dirname(filename));
  compiled._compile(outputText, filename);
  return compiled.exports;
}

const { createTextTranslator, REGISTERED_NAMES, normalizeText } = loadTypeScript('src/lib/translate.ts');
const { products, PRODUCT_BRANDS } = loadTypeScript('src/lib/products.ts');
const content = loadJson('../messages/site-content.json');

test('French presentation copy remains exactly unchanged, including whitespace and quantities', () => {
  const tx = createTextTranslator('fr');
  for (const product of products) {
    for (const field of ['name', 'brand', 'description', 'longDescription', 'composition', 'howToUse', 'warning', 'dosage', 'duration', 'format']) {
      assert.equal(tx(product[field]), product[field], `${product.id}.${field}`);
    }
  }
  assert.equal(tx('  Tous\nles produits  '), '  Tous\nles produits  ');
});

test('every registered brand and product name stays in French in both other languages', () => {
  for (const locale of ['en', 'ar']) {
    const tx = createTextTranslator(locale);
    for (const name of [...REGISTERED_NAMES, ...PRODUCT_BRANDS, ...products.map(p => p.name)]) assert.equal(tx(name), name, `${locale}: ${name}`);
  }
});

test('all current product descriptions, composition, instructions, warnings and pack sizes are translated', () => {
  for (const locale of ['en', 'ar']) {
    const tx = createTextTranslator(locale);
    for (const product of products) {
      for (const field of ['description', 'longDescription', 'composition', 'howToUse', 'warning', 'dosage', 'duration', 'format']) {
        assert.notEqual(tx(product[field]), product[field], `${locale}: ${product.id}.${field}`);
      }
      const quantities = [...product.composition.matchAll(/(?<![\p{L}\d])\d+(?: \d{3})*(?:[,.]\d+)?\s*(?:mg|µg|%)/gu)].map(m => m[0].replace(/\s/g, ''));
      const translated = tx(product.composition).replace(/\s/g, '');
      for (const quantity of quantities) assert.ok(translated.includes(quantity), `${locale}: ${product.id}: ${quantity}`);
    }
  }
});

test('multi-pack technical formats and durations retain both original sizes', () => {
  for (const locale of ['en', 'ar']) {
    const tx = createTextTranslator(locale);
    const format = tx('100 gélules végétales de 750mg\n300 gélules végétales de 750mg');
    assert.ok(format.includes('100') && format.includes('300') && format.includes('750mg'));
    assert.ok(!format.includes('gélules'));
    assert.ok(!tx('33 jours\n100 jours').includes('jours'));
    assert.ok(!tx('50 perles de 1400mg\n100 perles de 1400mg').includes('perles'));
  }
});

test('FAQ paragraphs and article fragments have English and Arabic copy', () => {
  const faqFile = path.resolve(testDirectory, '../src/app/[locale]/(site)/faq/page.tsx');
  const source = ts.createSourceFile(faqFile, fs.readFileSync(faqFile, 'utf8'), ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  const paragraphs = [];
  function visit(node) {
    if (ts.isPropertyAssignment(node) && node.name.getText() === 'a' && ts.isStringLiteral(node.initializer)) paragraphs.push(node.initializer.text);
    ts.forEachChild(node, visit);
  }
  visit(source);
  assert.equal(paragraphs.length, 24);
  for (const locale of ['en', 'ar']) for (const answer of paragraphs) for (const paragraph of answer.split(/\n+/)) assert.notEqual(createTextTranslator(locale)(paragraph), paragraph);
  const { MOCK_ARTICLES } = loadTypeScript('src/data/conseils.ts');
  const lookup = new Set(content.map(([fr]) => normalizeText(fr)));
  for (const match of MOCK_ARTICLES.flatMap(article => [...article.content.matchAll(/>([^<>]+)</g)])) {
    const text = normalizeText(match[1]);
    if (!/[A-Za-zÀ-ÿ]/.test(text) || REGISTERED_NAMES.has(text)) continue;
    assert.ok(lookup.has(text), `Missing article text: ${text}`);
  }
});

test('message namespaces and keys are complete in English and Arabic', () => {
  function keys(value, prefix = '') {
    return Object.entries(value).flatMap(([key, item]) => typeof item === 'object' ? keys(item, `${prefix}${key}.`) : [`${prefix}${key}`]).sort();
  }
  const fr = loadJson('../messages/fr.json');
  for (const locale of ['en', 'ar']) assert.deepEqual(keys(loadJson(`../messages/${locale}.json`)), keys(fr));
  for (const row of content) assert.ok(row.length === 3 && row.every(value => typeof value === 'string' && value.trim()));
});

test('non-text values and paragraph boundaries survive presentation translation', () => {
  const tx = createTextTranslator('ar');
  const node = { type: 'button', props: { value: 'Toutes' } };
  assert.equal(tx(node), node);
  assert.equal(tx(null), null);
  assert.equal(tx(100), 100);
  assert.equal(tx('Toutes\n\nProduits'), 'الكل\n\nالمنتجات');
});
