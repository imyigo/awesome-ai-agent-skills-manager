const http = require('http');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

let PORT = process.env.PORT || 3777;
const GUI_DIR = __dirname;
const SYNC_DIR = path.join(GUI_DIR, '..');

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
    } else if (req.method === 'POST' && req.url === '/api/install') {
      exec('bash control.sh --auto-install', { cwd: SYNC_DIR }, (err, stdout, stderr) => {
        res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify({ success: !err, output: stdout || stderr || 'Kurulum tamamlandı.' }));
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

    const startCmd = process.platform === 'win32' ? `start http://localhost:${port}` :
                     process.platform === 'darwin' ? `open http://localhost:${port}` : `xdg-open http://localhost:${port}`;
    exec(startCmd);
  });
}

createServer(PORT);
