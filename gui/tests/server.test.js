const test = require('node:test');
const assert = require('node:assert');
const { spawn } = require('child_process');
const path = require('path');

const PORT = 3779;

test.describe('Multi-AI Agent Skill Hub Full Feature Test Suite', () => {
  let serverProcess;

  test.before(async () => {
    const serverPath = path.join(__dirname, '..', 'gui_server.js');
    serverProcess = spawn('node', [serverPath], {
      env: { ...process.env, PORT: PORT.toString(), NO_OPEN: '1' }
    });

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
  });

  test('GET /api/status returns all 19 AI providers', async () => {
    const res = await fetch(`http://localhost:${PORT}/api/status`);
    assert.strictEqual(res.status, 200);
    const data = await res.json();
    assert.strictEqual(Object.keys(data).length, 19);
  });

  test('GET /api/presets returns merged predefined and custom presets', async () => {
    const res = await fetch(`http://localhost:${PORT}/api/presets`);
    assert.strictEqual(res.status, 200);
    const data = await res.json();
    assert.ok(Array.isArray(data));
    assert.ok(data.length >= 4);
  });

  test('POST /api/presets/save creates a new custom preset', async () => {
    const res = await fetch(`http://localhost:${PORT}/api/presets/save`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: 'Test Custom Mode', description: 'Testing preset creation', skills: ['ux-ui'] })
    });
    assert.strictEqual(res.status, 200);
    const data = await res.json();
    assert.strictEqual(data.success, true);
  });

  test('POST /api/sandbox/test simulates LLM response for a skill', async () => {
    const res = await fetch(`http://localhost:${PORT}/api/sandbox/test`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: 'Review code', skillName: 'ux-ui' })
    });
    assert.strictEqual(res.status, 200);
    const data = await res.json();
    assert.ok(data.simulatedOutput);
    assert.strictEqual(data.skillName, 'ux-ui');
  });

  test('POST /api/commands/save updates a slash command content', async () => {
    const res = await fetch(`http://localhost:${PORT}/api/commands/save`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ fileName: 'test-cmd.md', content: '# Test Command\n- Rule 1' })
    });
    assert.strictEqual(res.status, 200);
    const data = await res.json();
    assert.strictEqual(data.success, true);
  });
});
