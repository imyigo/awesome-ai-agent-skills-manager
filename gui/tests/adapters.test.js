const test = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const os = require('os');
const path = require('path');

const { ADAPTERS, loadSkills, parseFrontmatter, renderCodexMcpToml, SUPPORTED } =
  require('../adapters.js');

test('sadece 5 araç destekleniyor', () => {
  assert.deepStrictEqual(
    SUPPORTED.sort(),
    ['antigravity', 'claude', 'codex', 'copilot', 'cursor']
  );
});

test('parseFrontmatter name+description+body ayırır', () => {
  const raw = '---\nname: foo\ndescription: bar baz\n---\ngovde metni';
  const { meta, body } = parseFrontmatter(raw);
  assert.strictEqual(meta.name, 'foo');
  assert.strictEqual(meta.description, 'bar baz');
  assert.strictEqual(body.trim(), 'govde metni');
});

test('loadSkills SKILL.md dizinlerini okur', () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'sk-'));
  const d = path.join(root, 'demo');
  fs.mkdirSync(d);
  fs.writeFileSync(path.join(d, 'SKILL.md'), '---\nname: demo\ndescription: bir demo\n---\ngovde');
  const skills = loadSkills(root);
  assert.strictEqual(skills.length, 1);
  assert.strictEqual(skills[0].name, 'demo');
  assert.strictEqual(skills[0].description, 'bir demo');
});

test('cursor adapter geçerli .mdc üretir', () => {
  const out = ADAPTERS.cursor.skills.renderSkills([
    { name: 'sec', description: 'guvenlik', body: 'kurallar' }
  ]);
  assert.strictEqual(out[0].relPath, 'sec.mdc');
  assert.match(out[0].content, /^---\ndescription: guvenlik\nalwaysApply: false\n---/);
  assert.match(out[0].content, /kurallar/);
});

test('copilot adapter .instructions.md + applyTo üretir', () => {
  const out = ADAPTERS.copilot.skills.renderSkills([
    { name: 'sec', description: 'd', body: 'b' }
  ]);
  assert.strictEqual(out[0].relPath, 'sec.instructions.md');
  assert.match(out[0].content, /applyTo: '\*\*'/);
});

test('codex tek AGENTS.md + brain-managed işaretleri üretir', () => {
  const content = ADAPTERS.codex.skills.renderSingle([
    { name: 'a', description: '', body: 'x' },
    { name: 'b', description: 'dd', body: 'y' }
  ]);
  assert.match(content, /brain-managed:start/);
  assert.match(content, /brain-managed:end/);
  assert.match(content, /## a/);
  assert.match(content, /## b/);
});

test('codex MCP TOML [mcp_servers.x] üretir', () => {
  const toml = renderCodexMcpToml({
    dokploy: { command: 'npx', args: ['-y', 'x'], env: { K: 'v' } }
  });
  assert.match(toml, /\[mcp_servers\.dokploy\]/);
  assert.match(toml, /command = "npx"/);
  assert.match(toml, /args = \["-y", "x"\]/);
  assert.match(toml, /env = \{ K = "v" \}/);
});
