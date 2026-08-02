const test = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const os = require('os');
const path = require('path');

const cs = require('../core-services.js');
const CORE_ROOT = path.join(__dirname, '..', '..', 'repo', 'core-services');

function tmpCoreRoot() {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'core-'));
  fs.writeFileSync(path.join(dir, 'core-services.json'),
    JSON.stringify({ services: [] }));
  return dir;
}

test('loadManifest 3 çekirdek servisi okur', () => {
  const svcs = cs.loadManifest(CORE_ROOT);
  assert.strictEqual(svcs.length, 3);
  assert.deepStrictEqual(svcs.map(s => s.id), ['claude-mem', 'graphify', 'understand-anything']);
});

test('hepsi varsayılan KAPALI (enabledByDefault=false)', () => {
  cs.loadManifest(CORE_ROOT).forEach(s =>
    assert.strictEqual(s.enabledByDefault, false, `${s.id} default açık olmamalı`));
});

test('isRunnable: sadece image+buildDir olan servis', () => {
  const svcs = cs.loadManifest(CORE_ROOT);
  const mem = svcs.find(s => s.id === 'claude-mem');
  const graph = svcs.find(s => s.id === 'graphify');
  assert.strictEqual(cs.isRunnable(mem), true);
  assert.strictEqual(cs.isRunnable(graph), false);  // image=null
});

test('containerName brain-core- öneki kullanır', () => {
  assert.strictEqual(cs.containerName('claude-mem'), 'brain-core-claude-mem');
});

test('runArgs doğru docker run komutu üretir', () => {
  const svc = { id: 'claude-mem', port: 3780, image: 'brain-core-claude-mem:local', env: { K: 'v' } };
  const args = cs.runArgs(svc);
  assert.deepStrictEqual(args, [
    'run', '-d',
    '--name', 'brain-core-claude-mem',
    '--restart', 'no',
    '-p', '3780:3780',
    '-e', 'K=v',
    'brain-core-claude-mem:local'
  ]);
});

test('buildArgs docker build -t <image> <dir> üretir', () => {
  const svc = { image: 'brain-core-claude-mem:local', buildDir: 'claude-mem' };
  const args = cs.buildArgs(svc, CORE_ROOT);
  assert.strictEqual(args[0], 'build');
  assert.strictEqual(args[2], 'brain-core-claude-mem:local');
  assert.ok(args[3].endsWith(path.join('core-services', 'claude-mem')));
});

test('mcpEntryFor http tipini çekirdek MCP girişine çevirir', () => {
  const entry = cs.mcpEntryFor({ id: 'claude-mem', mcp: { type: 'http', url: 'http://localhost:3780/mcp' } });
  assert.deepStrictEqual(entry, { key: 'claude-mem', def: { type: 'http', url: 'http://localhost:3780/mcp' } });
});

// ---- Hub ----
test('CATALOG kurulabilir servisleri listeler', () => {
  const ids = cs.CATALOG.map(s => s.id);
  assert.ok(ids.includes('claude-mem'));
  assert.ok(ids.includes('custom-http'));
});

test('installToManifest ekler, tekrar eklemez', () => {
  const root = tmpCoreRoot();
  const item = cs.CATALOG.find(s => s.id === 'claude-mem');
  assert.deepStrictEqual(cs.installToManifest(root, item), { installed: true });
  assert.strictEqual(cs.loadManifest(root).length, 1);
  assert.deepStrictEqual(cs.installToManifest(root, item), { installed: false, reason: 'already' });
  assert.strictEqual(cs.loadManifest(root).length, 1);
});

test('removeFromManifest kaldırır', () => {
  const root = tmpCoreRoot();
  cs.installToManifest(root, cs.CATALOG.find(s => s.id === 'claude-mem'));
  assert.deepStrictEqual(cs.removeFromManifest(root, 'claude-mem'), { removed: true });
  assert.strictEqual(cs.loadManifest(root).length, 0);
  assert.deepStrictEqual(cs.removeFromManifest(root, 'claude-mem'), { removed: false });
});

test('catalogWithInstalled installed işaretini doğru verir', () => {
  const root = tmpCoreRoot();
  cs.installToManifest(root, cs.CATALOG.find(s => s.id === 'claude-mem'));
  const cat = cs.catalogWithInstalled(root);
  assert.strictEqual(cat.find(s => s.id === 'claude-mem').installed, true);
  assert.strictEqual(cat.find(s => s.id === 'custom-http').installed, false);
});
