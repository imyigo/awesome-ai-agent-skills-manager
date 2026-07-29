const http = require('http');
const fs = require('fs');
const path = require('path');
const { exec, execSync } = require('child_process');

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

const REACT_HTML_SHELL = `<!DOCTYPE html>
<html lang="tr" class="dark">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>⚡ Multi-AI Skill Hub — Official React App</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <script crossorigin src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
  <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
  <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
  <script>
    tailwind.config = {
      darkMode: 'class',
      theme: {
        extend: {
          fontFamily: {
            sans: ['Inter', 'sans-serif'],
            mono: ['JetBrains Mono', 'monospace'],
          }
        }
      }
    }
  </script>
</head>
<body class="bg-slate-950 text-slate-100 font-sans min-h-screen antialiased selection:bg-indigo-500 selection:text-white">
  <div id="root"></div>
  <script type="text/babel" src="/src/App.jsx"></script>
</body>
</html>`;

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

function getLiveSkillsData() {
  const skillsDir = path.join(SYNC_DIR, 'skills', 'originals');
  const unifiedDir = path.join(SYNC_DIR, 'skills', 'unified-dev');

  const liveData = {
    core: {
      title: "🧠 Çekirdek Davranışlar (Core Behavior)",
      subtitle: "Karpathy Anti-Hallucination Guardrails + Caveman Token Reduction",
      command: "/caveman veya /unified-dev",
      description: "Her istekte otomatik çalışan temel kalite ve token koruma kuralları.",
      rules: [
        "Karpathy Guardrails: Kod yazmadan önce varsayımları doğrula ve kullanıcıya sor.",
        "Minimal Intervention: Sadece istenen bölgeye cerrahi müdahale yap, diğer kodları bozma.",
        "Caveman Protocol: Boş dolgu cümlelerini sil, konuya gir.",
        "File-based Task Planning: 3+ adımlı karmaşık görevlerde hafıza dosyası tut."
      ],
      repos: [],
      files: []
    },
    web: {
      title: "🎨 Web & UI/UX Tasarım Mimarisi",
      subtitle: "WCAG 2.2 AA/AAA, Design Tokens & Component System",
      command: "/ux-ui",
      description: "Üretime hazır, erişilebilir ve modern web/UI arayüz tasarımları için kıdemli mimar kuralları.",
      rules: [
        "Color Contrast: Metin kontrast oranı en az 4.5:1 (WCAG AA).",
        "Touch Target: Dokunmatik buton yüksekliği en az 44x44px.",
        "Tokens First: Sihirli sayı kullanma, 4px/8px grid scale kullan."
      ],
      repos: [],
      files: []
    },
    mobile: {
      title: "📱 Mobil & Masaüstü Uygulama Mimari",
      subtitle: "iOS SwiftUI, Android Jetpack Compose, macOS & Flutter",
      command: "/mobile",
      description: "Yerel mobil platform kuralları ve Apple HIG / Material Design 3 kılavuzu.",
      rules: [
        "iOS/macOS: Apple Human Interface Guidelines (HIG) ve SwiftUI declarative state yapısı.",
        "Android: Jetpack Compose, Material Design 3 ve Unidirectional Data Flow (UDF)."
      ],
      repos: [],
      files: []
    },
    game: {
      title: "🎮 Oyun Geliştirme Stüdyosu",
      subtitle: "GDD Şablonları, Engine Selection & Game Feel / Juice",
      command: "/game",
      description: "Oyun stüdyosu workflow kuralları.",
      rules: [
        "Core Loop: Oyunun döngüsünü net tanımla.",
        "Performance: 60 FPS hedefi, Object Pooling.",
        "Game Feel: Görsel ve işitsel geri bildirimler."
      ],
      repos: [],
      files: []
    },
    security: {
      title: "🔐 Siber Güvenlik & Kod Denetimi",
      subtitle: "OWASP Top 10, STRIDE Threat Modeling",
      command: "/security",
      description: "Yazılım güvenlik açıkları tespiti ve savunma mimarisi rehberi.",
      rules: [
        "OWASP Top 10: SQL Injection, XSS, CSRF taraması.",
        "STRIDE Modeling: Threat Modeling denetimi."
      ],
      repos: [],
      files: []
    },
    planning: {
      title: "📐 Proje & Mimari Planlama",
      subtitle: "PRD, ADR Karar Belgeleri & Sprint Task Breakdown",
      command: "/planning",
      description: "Yazılım mimarisi kararlarını ve proje aşamalarını belgeleme kılavuzu.",
      rules: [
        "PRD: İhtiyaçları tanımla.",
        "ADR: Alınan mimari kararları ve gerekçelerini kaydet."
      ],
      repos: [],
      files: []
    },
    marketing: {
      title: "📈 Pazarlama & ASO / CRO",
      subtitle: "PAS/AIDA Copywriting, App Store Optimization",
      command: "/marketing",
      description: "Dönüşüm oranlarını ve indirmeleri artıran büyüme rehberi.",
      rules: [
        "Copywriting: PAS ve AIDA modelleri.",
        "ASO: Anahtar kelime ve başlık optimizasyonu."
      ],
      repos: [],
      files: []
    }
  };

  if (fs.existsSync(skillsDir)) {
    try {
      const subFolders = fs.readdirSync(skillsDir);
      subFolders.forEach(folder => {
        const subPath = path.join(skillsDir, folder);
        if (fs.statSync(subPath).isDirectory()) {
          let gitUrl = "";
          let commitHash = "";
          try {
            gitUrl = execSync("git config --get remote.origin.url", { cwd: subPath }).toString().trim();
            commitHash = execSync("git rev-parse --short HEAD", { cwd: subPath }).toString().trim();
          } catch (e) {
            gitUrl = "https://github.com/" + folder;
            commitHash = "HEAD";
          }

          const repoObj = { name: folder, url: gitUrl, tag: commitHash };

          if (folder.includes("caveman") || folder.includes("karpathy")) {
            liveData.core.repos.push(repoObj);
          } else if (folder.includes("ux-ui") || folder.includes("ui-ux")) {
            liveData.web.repos.push(repoObj);
          } else if (folder.includes("game")) {
            liveData.game.repos.push(repoObj);
          } else if (folder.includes("marketing")) {
            liveData.marketing.repos.push(repoObj);
          } else if (folder.includes("security") || folder.includes("cybersecurity")) {
            liveData.security.repos.push(repoObj);
          } else if (folder.includes("planning")) {
            liveData.planning.repos.push(repoObj);
          } else {
            liveData.core.repos.push(repoObj);
          }
        }
      });
    } catch (err) {}
  }

  if (fs.existsSync(unifiedDir)) {
    try {
      const files = fs.readdirSync(unifiedDir);
      files.forEach(file => {
        const relPath = `skills/unified-dev/${file}`;
        if (file.includes("01") || file.includes("SKILL")) liveData.core.files.push(relPath);
        if (file.includes("02")) liveData.web.files.push(relPath);
        if (file.includes("03")) liveData.mobile.files.push(relPath);
        if (file.includes("04")) liveData.game.files.push(relPath);
        if (file.includes("05")) liveData.security.files.push(relPath);
        if (file.includes("06")) liveData.planning.files.push(relPath);
        if (file.includes("07")) liveData.marketing.files.push(relPath);
      });
    } catch (e) {}
  }

  return liveData;
}

function removeLinkTarget(targetPath) {
  if (!fs.existsSync(targetPath)) return;
  try {
    const stat = fs.lstatSync(targetPath);
    if (stat.isSymbolicLink()) {
      fs.unlinkSync(targetPath);
    } else if (isWin && stat.isDirectory()) {
      try {
        fs.rmdirSync(targetPath);
      } catch (e) {
        fs.rmSync(targetPath, { recursive: true, force: true });
      }
    } else {
      fs.rmSync(targetPath, { recursive: true, force: true });
    }
  } catch (e) {
    try {
      fs.rmSync(targetPath, { recursive: true, force: true });
    } catch (err) {}
  }
}

function toggleLink(aiKey, targetState, callback) {
  const targetDir = AI_PATHS[aiKey];
  if (!targetDir) return callback(new Error('Bilinmeyen AI aracı'));

  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  const skillsDest = path.join(targetDir, 'skills');
  const commandsDest = path.join(targetDir, 'commands');

  if (targetState === true) {
    removeLinkTarget(skillsDest);
    removeLinkTarget(commandsDest);

    if (isWin) {
      const winSrcSkills = path.join(SYNC_DIR, 'skills');
      const winSrcCmds = path.join(SYNC_DIR, 'commands');
      const cmd = `cmd //c "mklink /J \\"${skillsDest}\\" \\"${winSrcSkills}\\""`;
      exec(cmd, (err) => {
        if (fs.existsSync(winSrcCmds)) {
          const cmd2 = `cmd //c "mklink /J \\"${commandsDest}\\" \\"${winSrcCmds}\\""`;
          exec(cmd2, () => callback(null, `${aiKey} başarıyla bağlandı.`));
        } else {
          callback(null, `${aiKey} başarıyla bağlandı.`);
        }
      });
    } else {
      exec(`ln -s "${path.join(SYNC_DIR, 'skills')}" "${skillsDest}" && ln -s "${path.join(SYNC_DIR, 'commands')}" "${commandsDest}"`, (err) => {
        callback(err, `${aiKey} başarıyla bağlandı.`);
      });
    }
  } else {
    removeLinkTarget(skillsDest);
    removeLinkTarget(commandsDest);
    callback(null, `${aiKey} bağlantısı kaldırıldı.`);
  }
}

// REST API SUNUCUSU
function createServer(port) {
  const server = http.createServer((req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');

    if (req.method === 'GET' && (req.url === '/' || req.url === '/index.html')) {
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(REACT_HTML_SHELL);
    } else if (req.method === 'GET' && req.url.startsWith('/src/')) {
      const filePath = path.join(GUI_DIR, req.url);
      fs.readFile(filePath, (err, data) => {
        if (err) {
          res.writeHead(404, { 'Content-Type': 'text/plain' });
          return res.end('404 File Not Found');
        }
        res.writeHead(200, { 'Content-Type': 'application/javascript; charset=utf-8' });
        res.end(data);
      });
    } else if (req.method === 'GET' && req.url === '/api/status') {
      const statusData = getAIStatus();
      res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
      res.end(JSON.stringify(statusData));
    } else if (req.method === 'GET' && req.url === '/api/skills') {
      const liveSkills = getLiveSkillsData();
      res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
      res.end(JSON.stringify(liveSkills));
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
          const { url, category, customRule } = JSON.parse(body);
          if (!url) throw new Error('URL eksik');
          const skillName = path.basename(url, '.git');
          const cmd = `git submodule add -f "${url}" "skills/originals/${skillName}" && git submodule update --init --recursive`;
          
          exec(cmd, { cwd: SYNC_DIR }, (err, stdout, stderr) => {
            if (customRule && customRule.trim()) {
              const ruleFile = path.join(SYNC_DIR, 'skills', 'unified-dev', '01-core-behavior.md');
              if (fs.existsSync(ruleFile)) {
                fs.appendFileSync(ruleFile, `\n\n### Özel Kural [${skillName}]:\n- ${customRule}\n`);
              }
            }
            res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
            res.end(JSON.stringify({ success: !err, output: stdout || stderr || `[${skillName}] ${category || ''} kategorisine başarıyla eklendi!` }));
          });
        } catch (e) {
          res.writeHead(400, { 'Content-Type': 'application/json; charset=utf-8' });
          res.end(JSON.stringify({ success: false, output: 'Hata: ' + e.message }));
        }
      });
    } else if (req.method === 'POST' && req.url === '/api/remove-skill') {
      let body = '';
      req.on('data', chunk => { body += chunk.toString(); });
      req.on('end', () => {
        try {
          const { name } = JSON.parse(body);
          if (!name) throw new Error('Skill adı eksik');
          const relPath = `skills/originals/${name}`;
          const cmd = `git submodule deinit -f "${relPath}" && git rm -f "${relPath}"`;
          
          exec(cmd, { cwd: SYNC_DIR }, (err, stdout, stderr) => {
            const fullPath = path.join(SYNC_DIR, relPath);
            removeLinkTarget(fullPath);
            res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
            res.end(JSON.stringify({ success: true, output: `[${name}] repnuzu ve submodule kaydı başarıyla silindi.` }));
          });
        } catch (e) {
          res.writeHead(400, { 'Content-Type': 'application/json; charset=utf-8' });
          res.end(JSON.stringify({ success: false, output: 'Silme Hatası: ' + e.message }));
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
    console.log(` ⚡ Multi-AI Skill Hub Pure React Server`);
    console.log(` ⚛️ React 18 Entry: http://localhost:${port}`);
    console.log(`====================================================\n`);

    const startCmd = isWin ? `start http://localhost:${port}` :
                     process.platform === 'darwin' ? `open http://localhost:${port}` : `xdg-open http://localhost:${port}`;
    exec(startCmd);
  });
}

createServer(PORT);
