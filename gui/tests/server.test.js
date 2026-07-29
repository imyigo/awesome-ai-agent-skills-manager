const test = require('node:test');
const assert = require('node:assert');
const { spawn } = require('child_process');
const path = require('path');

const PORT = 3778;

test.describe('Multi-AI Agent Skill Hub Server & API Tests', () => {
  let serverProcess;

  test.before(async () => {
    const serverPath = path.join(__dirname, '..', 'gui_server.js');
    serverProcess = spawn('node', [serverPath], {
      env: { ...process.env, PORT: PORT.toString(), NO_OPEN: '1' }
    });

    // Wait for server to boot up
    await new Promise((resolve) => setTimeout(resolve, 2500));
  });

  test.after(() => {
    if (serverProcess) {
      serverProcess.kill('SIGTERM');
    }
  });

  test('GET / returns HTML shell with React entry point', async () => {
    const res = await fetch(`http://localhost:${PORT}/`);
    assert.strictEqual(res.status, 200);
    const html = await res.text();
    assert.ok(html.includes('<div id="root"></div>'));
    assert.ok(html.includes('App.jsx'));
  });

  test('GET /api/status returns all 19 AI providers', async () => {
    const res = await fetch(`http://localhost:${PORT}/api/status`);
    assert.strictEqual(res.status, 200);
    const data = await res.json();
    assert.ok(data.antigravity);
    assert.ok(data.claude);
    assert.ok(data.cursor);
    assert.ok(data.codex);
    assert.strictEqual(Object.keys(data).length, 19);
  });

  test('GET /api/skills returns skill categories', async () => {
    const res = await fetch(`http://localhost:${PORT}/api/skills`);
    assert.strictEqual(res.status, 200);
    const data = await res.json();
    assert.ok(data.core);
    assert.ok(data.web);
    assert.ok(data.security);
  });

  test('GET /api/mcp returns mcpServers object', async () => {
    const res = await fetch(`http://localhost:${PORT}/api/mcp`);
    assert.strictEqual(res.status, 200);
    const data = await res.json();
    assert.ok(typeof data.mcpServers === 'object');
  });

  test('GET /api/presets returns predefined developer modes', async () => {
    const res = await fetch(`http://localhost:${PORT}/api/presets`);
    assert.strictEqual(res.status, 200);
    const data = await res.json();
    assert.ok(Array.isArray(data));
    assert.ok(data.length >= 4);
  });

  test('GET /api/marketplace returns catalog items', async () => {
    const res = await fetch(`http://localhost:${PORT}/api/marketplace`);
    assert.strictEqual(res.status, 200);
    const data = await res.json();
    assert.ok(Array.isArray(data));
    assert.ok(data.length >= 5);
  });
});
