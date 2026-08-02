const test = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const os = require('os');
const path = require('path');

const { mergeMcpInto, removeLinkTarget } = require('../gui_server.js');

function tmpFile(name) {
  return path.join(fs.mkdtempSync(path.join(os.tmpdir(), 'brain-')), name);
}

test('mergeMcpInto kullanıcının mevcut server\'larını korur', () => {
  const f = tmpFile('mcp.json');
  fs.writeFileSync(f, JSON.stringify({
    mcpServers: { userThing: { command: 'x' } }
  }));

  mergeMcpInto(f, { dokploy: { command: 'npx' } }, 'mcpServers');

  const out = JSON.parse(fs.readFileSync(f, 'utf8'));
  assert.ok(out.mcpServers.userThing, 'kullanıcının server\'ı silinmemeli');
  assert.ok(out.mcpServers.dokploy, 'yeni server eklenmeli');
  assert.deepStrictEqual(out.__brainManaged, ['dokploy']);
});

test('mergeMcpInto eskiden eklediğini temizler, kullanıcınınkine dokunmaz', () => {
  const f = tmpFile('mcp.json');
  fs.writeFileSync(f, JSON.stringify({
    mcpServers: { userThing: { command: 'x' }, oldManaged: { command: 'y' } },
    __brainManaged: ['oldManaged']
  }));

  mergeMcpInto(f, { newManaged: { command: 'z' } }, 'mcpServers');

  const out = JSON.parse(fs.readFileSync(f, 'utf8'));
  assert.ok(out.mcpServers.userThing, 'kullanıcı server\'ı korunmalı');
  assert.ok(!out.mcpServers.oldManaged, 'eski managed server temizlenmeli');
  assert.ok(out.mcpServers.newManaged, 'yeni managed server eklenmeli');
});

test('mergeMcpInto bozuk JSON\'u EZMEZ', () => {
  const f = tmpFile('mcp.json');
  fs.writeFileSync(f, '{ bu bozuk json');

  const result = mergeMcpInto(f, { a: { command: 'x' } }, 'mcpServers');

  assert.strictEqual(result, false, 'bozuk dosyada false dönmeli');
  assert.strictEqual(fs.readFileSync(f, 'utf8'), '{ bu bozuk json', 'dosya değişmemeli');
});

test('removeLinkTarget gerçek klasörü silmez, yedeğe taşır', () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'brain-'));
  const target = path.join(dir, 'skills');
  fs.mkdirSync(target);
  fs.writeFileSync(path.join(target, 'onemli.md'), 'kullanıcı verisi');

  removeLinkTarget(target);

  assert.ok(!fs.existsSync(target), 'hedef taşınmış olmalı');
  const backups = fs.readdirSync(dir).filter(n => n.startsWith('skills.brain-bak-'));
  assert.strictEqual(backups.length, 1, 'bir yedek oluşmalı');
  assert.strictEqual(
    fs.readFileSync(path.join(dir, backups[0], 'onemli.md'), 'utf8'),
    'kullanıcı verisi',
    'kullanıcı verisi yedekte durmalı'
  );
});
