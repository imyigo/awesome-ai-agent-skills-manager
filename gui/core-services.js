// ============================================================
// CORE SERVICES (Çekirdek Servisler / Çekirdek MCP)
// Arka planda çalışan daemon'lar. Skill değil — gerçek sunucu.
// Docker CLI ile izole container'da çalışır (host toolchain kirletmez).
// Varsayılan: KAPALI. Kullanıcı elle başlatır.
// ============================================================
const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const CONTAINER_PREFIX = 'brain-core-';

function containerName(id) {
  return CONTAINER_PREFIX + id;
}

function manifestFile(coreRoot) {
  return path.join(coreRoot, 'core-services.json');
}

// Manifest'i oku (kurulu/aktif çekirdek servisler).
function loadManifest(coreRoot) {
  const file = manifestFile(coreRoot);
  if (!fs.existsSync(file)) return [];
  try {
    const parsed = JSON.parse(fs.readFileSync(file, 'utf8'));
    return Array.isArray(parsed.services) ? parsed.services : [];
  } catch (e) {
    return [];
  }
}

// Manifest'i yaz (atomic).
function saveManifest(coreRoot, services) {
  const file = manifestFile(coreRoot);
  const payload = {
    $comment: 'Çekirdek Servisler (Core Engine Daemons). Docker ile çalışır, varsayılan KAPALI.',
    services
  };
  const tmp = `${file}.tmp-${process.pid}-${Date.now()}`;
  fs.writeFileSync(tmp, JSON.stringify(payload, null, 2) + '\n', 'utf8');
  fs.renameSync(tmp, file);
}

// Hub katalog girdisini manifest'e kur (varsa dokunma).
function installToManifest(coreRoot, item) {
  const services = loadManifest(coreRoot);
  if (services.some(s => s.id === item.id)) return { installed: false, reason: 'already' };
  services.push(item);
  saveManifest(coreRoot, services);
  return { installed: true };
}

// Manifest'ten kaldır.
function removeFromManifest(coreRoot, id) {
  const services = loadManifest(coreRoot);
  const next = services.filter(s => s.id !== id);
  if (next.length === services.length) return { removed: false };
  saveManifest(coreRoot, next);
  return { removed: true };
}

// ---- HUB KATALOĞU: kurulabilir çekirdek servisler ----
// image+buildDir tanımlı olanlar hazır; null olanlar şablon (kullanıcı doldurur).
const CATALOG = [
  {
    id: 'claude-mem',
    name: 'Claude Long-Term Memory Engine',
    icon: '🧠',
    port: 3780, containerPort: 3780,
    image: 'brain-core-claude-mem:local', buildDir: 'claude-mem',
    enabledByDefault: false, env: {},
    mcp: { type: 'http', url: 'http://localhost:3780/mcp' },
    reqs: ['Docker'],
    desc: 'Oturumlar arası silinmeyen uzun süreli hafıza veritabanı.',
    what: 'AI ajanına kalıcı hafıza verir: geçmiş oturumları özetleyip SQLite\'a saklar, yeni oturumda ilgili bağlamı otomatik enjekte eder. Container içinde çalışır.'
  },
  {
    id: 'graphify',
    name: 'Graphify Knowledge Architecture Engine',
    icon: '🕸️',
    port: 3781, containerPort: 3781,
    image: null, buildDir: null,
    enabledByDefault: false, env: {},
    mcp: { type: 'http', url: 'http://localhost:3781/mcp' },
    reqs: ['Docker'],
    desc: 'Kod deposu bağımlılıklarını mimari ilişki grafiğine dönüştürür.',
    what: 'Kod tabanının bağımlılık haritasını çıkarır. Şablon — çalıştırmak için image + buildDir ekleyin.'
  },
  {
    id: 'understand-anything',
    name: 'Understand Anything Code Deep Inspector',
    icon: '🔬',
    port: 3782, containerPort: 3782,
    image: null, buildDir: null,
    enabledByDefault: false, env: {},
    mcp: { type: 'http', url: 'http://localhost:3782/mcp' },
    reqs: ['Docker'],
    desc: 'AST tabanlı kod indeksleme ve anlık analiz.',
    what: 'Projeyi AST düzeyinde indeksler. Şablon — çalıştırmak için image + buildDir ekleyin.'
  },
  {
    id: 'custom-http',
    name: 'Özel HTTP MCP Daemon (şablon)',
    icon: '⚙️',
    port: 3790, containerPort: 3790,
    image: null, buildDir: null,
    enabledByDefault: false, env: {},
    mcp: { type: 'http', url: 'http://localhost:3790/mcp' },
    reqs: ['Docker'],
    desc: 'Kendi Docker MCP daemon\'unuz için boş şablon.',
    what: 'Kendi çekirdek MCP\'nizi eklemek için başlangıç şablonu. image, buildDir ve portu düzenleyin.'
  }
];

function catalogWithInstalled(coreRoot) {
  const installed = new Set(loadManifest(coreRoot).map(s => s.id));
  return CATALOG.map(item => ({ ...item, installed: installed.has(item.id), runnable: isRunnable(item) }));
}

// Docker CLI sistemde var mı?
function dockerAvailable() {
  try {
    const r = spawnSync('docker', ['--version'], { encoding: 'utf8', timeout: 3000 });
    return r.status === 0;
  } catch (e) {
    return false;
  }
}

// Container'ın çalışma durumu: 'running' | 'stopped' | 'absent'.
function containerState(id) {
  try {
    const r = spawnSync(
      'docker',
      ['inspect', '-f', '{{.State.Running}}', containerName(id)],
      { encoding: 'utf8', timeout: 4000 }
    );
    if (r.status !== 0) return 'absent';         // container yok
    return r.stdout.trim() === 'true' ? 'running' : 'stopped';
  } catch (e) {
    return 'absent';
  }
}

// ---- Pure argüman üreticiler (test edilebilir, docker gerektirmez) ----

function buildArgs(svc, coreRoot) {
  const dir = path.join(coreRoot, svc.buildDir);
  return ['build', '-t', svc.image, dir];
}

function runArgs(svc) {
  const args = [
    'run', '-d',
    '--name', containerName(svc.id),
    '--restart', 'no',                            // default off: reboot'ta geri gelmez
    '-p', `${svc.port}:${svc.containerPort || svc.port}`,
  ];
  for (const [k, v] of Object.entries(svc.env || {})) {
    args.push('-e', `${k}=${v}`);
  }
  args.push(svc.image);
  return args;
}

// MCP config girişi — servis çalışınca AI araçlarına "çekirdek MCP" olarak eklenir.
function mcpEntryFor(svc) {
  if (!svc.mcp) return null;
  if (svc.mcp.type === 'http') {
    return { key: svc.id, def: { type: 'http', url: svc.mcp.url } };
  }
  if (svc.mcp.type === 'stdio') {
    return { key: svc.id, def: { command: svc.mcp.command, args: svc.mcp.args || [] } };
  }
  return null;
}

// Servisin başlatılabilir olup olmadığı (image/build tanımlı mı).
function isRunnable(svc) {
  return !!(svc.image && svc.buildDir);
}

module.exports = {
  CONTAINER_PREFIX,
  containerName,
  loadManifest,
  saveManifest,
  installToManifest,
  removeFromManifest,
  CATALOG,
  catalogWithInstalled,
  dockerAvailable,
  containerState,
  buildArgs,
  runArgs,
  mcpEntryFor,
  isRunnable,
};
