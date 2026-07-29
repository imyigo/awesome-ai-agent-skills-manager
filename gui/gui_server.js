const http = require('http');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

let PORT = process.env.PORT || 3777;
const GUI_DIR = __dirname;
const SYNC_DIR = path.join(GUI_DIR, '..');

const isWin = process.platform === 'win32';
const homeDir = isWin ? process.env.USERPROFILE : process.env.HOME;

const AI_PATHS = {
  antigravity: path.join(homeDir, '.gemini', 'antigravity'),
  claude: path.join(homeDir, '.claude'),
  cursor: path.join(homeDir, '.cursor'),
  codex: path.join(homeDir, '.codex')
};

// Check installation and link status
function getAIStatus() {
  const result = {};
  for (const [key, dirPath] of Object.entries(AI_PATHS)) {
    const installed = fs.existsSync(dirPath);
    const skillsPath = path.join(dirPath, 'skills');
    let linked = false;
    if (installed && fs.existsSync(skillsPath)) {
      try {
        const stat = fs.lstatSync(skillsPath);
        linked = stat.isSymbolicLink() || stat.isDirectory();
      } catch (e) {
        linked = false;
      }
    }
    result[key] = { installed, linked, path: dirPath };
  }
  return result;
}

// Create or remove link helper
function toggleLink(aiKey, targetState, callback) {
  const targetDir = AI_PATHS[aiKey];
  if (!targetDir) return callback(new Error('Bilinmeyen AI aracı'));

  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  const skillsDest = path.join(targetDir, 'skills');
  const commandsDest = path.join(targetDir, 'commands');

  if (targetState === true) {
    // LINK
    if (isWin) {
      const winSrcSkills = path.join(SYNC_DIR, 'skills');
      const winSrcCmds = path.join(SYNC_DIR, 'commands');
      const cmd = `cmd //c "if exist \\"${skillsDest}\\" rmdir /s /q \\"${skillsDest}\\" & mklink /J \\"${skillsDest}\\" \\"${winSrcSkills}\\""`;
      exec(cmd, (err) => {
        if (fs.existsSync(winSrcCmds)) {
          const cmd2 = `cmd //c "if exist \\"${commandsDest}\\" rmdir /s /q \\"${commandsDest}\\" & mklink /J \\"${commandsDest}\\" \\"${winSrcCmds}\\""`;
          exec(cmd2, () => callback(null, `${aiKey} başarıyla bağlandı.`));
        } else {
          callback(null, `${aiKey} başarıyla bağlandı.`);
        }
      });
    } else {
      exec(`rm -rf "${skillsDest}" "${commandsDest}" && ln -s "${path.join(SYNC_DIR, 'skills')}" "${skillsDest}" && ln -s "${path.join(SYNC_DIR, 'commands')}" "${commandsDest}"`, (err) => {
        callback(err, `${aiKey} başarıyla bağlandı.`);
      });
    }
  } else {
    // UNLINK
    if (isWin) {
      exec(`cmd //c "if exist \\"${skillsDest}\\" rmdir /s /q \\"${skillsDest}\\" & if exist \\"${commandsDest}\\" rmdir /s /q \\"${commandsDest}\\""`, (err) => {
        callback(err, `${aiKey} bağlantısı kaldırıldı.`);
      });
    } else {
      exec(`rm -rf "${skillsDest}" "${commandsDest}"`, (err) => {
        callback(err, `${aiKey} bağlantısı kaldırıldı.`);
      });
    }
  }
}

function createServer(port) {
  const server = http.createServer((req, res) => {
    if (req.method === 'GET' && req.url === '/') {
      fs.readFile(path.join(GUI_DIR, 'gui.html'), (err, data) => {
        if (err) {
          res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
          return res.end('Sunucu Hatası: gui.html okunamadı.');
        }
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(data);
      });
    } else if (req.method === 'GET' && req.url === '/api/status') {
      const statusData = getAIStatus();
      res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
      res.end(JSON.stringify(statusData));
    } else if (req.method === 'POST' && req.url === '/api/toggle-link') {
      let body = '';
      req.on('data', chunk => { body += chunk.toString(); });
      req.on('end', () => {
        try {
          const { ai, state } = JSON.parse(body);
          toggleLink(ai, state, (err, message) => {
            res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
            res.end(JSON.stringify({ success: !err, message: message || (err && err.message) }));
          });
        } catch (e) {
          res.writeHead(400, { 'Content-Type': 'application/json; charset=utf-8' });
          res.end(JSON.stringify({ success: false, message: e.message }));
        }
      });
    } else if (req.method === 'POST' && req.url === '/api/update') {
      exec('git submodule update --remote --merge', { cwd: SYNC_DIR }, (err, stdout, stderr) => {
        res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify({ success: !err, output: stdout || stderr || 'Tüm canlı skill repoları güncellendi!' }));
      });
    } else if (req.method === 'POST' && req.url === '/api/add-skill') {
      let body = '';
      req.on('data', chunk => { body += chunk.toString(); });
      req.on('end', () => {
        try {
          const { url } = JSON.parse(body);
          if (!url) throw new Error('URL eksik');
          const skillName = path.basename(url, '.git');
          const cmd = `git submodule add -f "${url}" "skills/originals/${skillName}" && git submodule update --init --recursive`;
          exec(cmd, { cwd: SYNC_DIR }, (err, stdout, stderr) => {
            res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
            res.end(JSON.stringify({ success: !err, output: stdout || stderr || `[${skillName}] eklendi ve tüm AI'lara bağlandı!` }));
          });
        } catch (e) {
          res.writeHead(400, { 'Content-Type': 'application/json; charset=utf-8' });
          res.end(JSON.stringify({ success: false, output: 'Geçersiz veri veya Hata: ' + e.message }));
        }
      });
    } else {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('404 Not Found');
    }
  });

  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.log(`⚠️ Port ${port} dolu, port ${port + 1} deneniyor...`);
      createServer(port + 1);
    } else {
      console.error('❌ Sunucu Hatası:', err);
    }
  });

  server.listen(port, () => {
    console.log(`\n====================================================`);
    console.log(` ⚡ Multi-AI Skill Hub Dashboard Çalışıyor!`);
    console.log(` 🌐 Arayüz Adresi: http://localhost:${port}`);
    console.log(`====================================================\n`);

    const startCmd = isWin ? `start http://localhost:${port}` :
                     process.platform === 'darwin' ? `open http://localhost:${port}` : `xdg-open http://localhost:${port}`;
    exec(startCmd);
  });
}

createServer(PORT);
