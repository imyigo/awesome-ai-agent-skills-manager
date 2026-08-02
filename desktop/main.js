// Brain Manager — macOS masaüstü sarmalayıcı (Electron).
// Açılışta Node server'ını başlatır, hazır olunca dashboard'u pencerede gösterir.
// Kapanışta server'ı öldürür. Ayrı process — mevcut web koduna dokunmaz.
const { app, BrowserWindow, shell, dialog } = require('electron');
const { spawn } = require('child_process');
const http = require('http');
const path = require('path');
const fs = require('fs');

const PORT = parseInt(process.env.BRAIN_PORT || '3777', 10);
const URL = `http://localhost:${PORT}`;

let serverProc = null;
let mainWindow = null;

// Paketli app'te kaynaklar resources/app/ altında; dev'de ../ .
function resolveServerPath() {
  const packaged = path.join(process.resourcesPath || '', 'app', 'gui', 'gui_server.js');
  if (fs.existsSync(packaged)) return packaged;
  return path.join(__dirname, '..', 'gui', 'gui_server.js');
}

// Node ile: paketli değilse sistem 'node', paketli app'te Electron'un
// gömülü Node'u (ELECTRON_RUN_AS_NODE) ile server'ı çalıştır.
function startServer() {
  const serverPath = resolveServerPath();
  const useEmbeddedNode = !!process.resourcesPath && fs.existsSync(path.join(process.resourcesPath, 'app', 'gui'));
  const cmd = useEmbeddedNode ? process.execPath : (process.env.BRAIN_NODE || 'node');
  const env = { ...process.env, NO_OPEN: '1', PORT: String(PORT) };
  if (useEmbeddedNode) env.ELECTRON_RUN_AS_NODE = '1';

  serverProc = spawn(cmd, [serverPath], { env, stdio: ['ignore', 'pipe', 'pipe'] });
  serverProc.stdout.on('data', d => process.stdout.write(`[server] ${d}`));
  serverProc.stderr.on('data', d => process.stderr.write(`[server] ${d}`));
  serverProc.on('exit', code => { serverProc = null; if (code) console.error(`server çıktı: ${code}`); });
}

// Server hazır olana kadar bekle (port 200 dönene dek).
function waitForServer(timeoutMs = 20000) {
  const started = Date.now();
  return new Promise((resolve, reject) => {
    const tick = () => {
      const req = http.get(URL, res => { res.destroy(); resolve(); });
      req.on('error', () => {
        if (Date.now() - started > timeoutMs) return reject(new Error('Server zamanında başlamadı.'));
        setTimeout(tick, 300);
      });
    };
    tick();
  });
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1440,
    height: 900,
    minWidth: 1024,
    minHeight: 680,
    title: 'Brain Manager',
    backgroundColor: '#020617',
    titleBarStyle: 'hiddenInset',
    webPreferences: { preload: path.join(__dirname, 'preload.js'), contextIsolation: true }
  });

  // Dış linkleri sistem tarayıcısında aç (pencere içinde değil).
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith('http') && !url.startsWith(URL)) {
      shell.openExternal(url);
      return { action: 'deny' };
    }
    return { action: 'allow' };
  });

  mainWindow.loadURL(URL);
  mainWindow.on('closed', () => { mainWindow = null; });
}

app.whenReady().then(async () => {
  startServer();
  try {
    await waitForServer();
    createWindow();
  } catch (e) {
    dialog.showErrorBox('Server başlatılamadı', `${e.message}\n\nNode kurulu mu? (node --version)\nManuel: cd gui && node gui_server.js`);
    app.quit();
  }

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

function shutdown() {
  if (serverProc) { try { serverProc.kill(); } catch (e) {} serverProc = null; }
}
app.on('window-all-closed', () => { shutdown(); if (process.platform !== 'darwin') app.quit(); });
app.on('before-quit', shutdown);
process.on('exit', shutdown);
