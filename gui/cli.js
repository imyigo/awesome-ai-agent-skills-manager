#!/usr/bin/env node
/**
 * Scriptable CLI tool for Multi-AI Agent Skill Hub
 * Usage: node gui/cli.js <command> [options]
 * Supports --json and --yes for automated AI agents and CI/CD scripts.
 */

const fs = require('fs');
const path = require('path');
const { execSync, spawnSync } = require('child_process');

const SYNC_DIR = path.join(__dirname, '..');
const isWin = process.platform === 'win32';
const homeDir = isWin ? process.env.USERPROFILE : process.env.HOME;

const AI_PATHS = {
  antigravity: { name: "Google Antigravity", path: path.join(homeDir, '.gemini', 'antigravity'), skillsSub: 'skills', cmdSub: 'commands' },
  claude:      { name: "Claude Code",        path: path.join(homeDir, '.claude'),             skillsSub: 'skills', cmdSub: 'commands' },
  cursor:      { name: "Cursor IDE",         path: path.join(homeDir, '.cursor'),             skillsSub: 'rules',  cmdSub: 'rules' },
  codex:       { name: "OpenAI Codex",       path: path.join(homeDir, '.codex'),              skillsSub: 'skills', cmdSub: 'prompts' },
  windsurf:    { name: "Windsurf",           path: path.join(homeDir, '.windsurf'),           skillsSub: 'rules',  cmdSub: 'rules' },
  cline:       { name: "Cline",              path: path.join(homeDir, 'Documents', 'Cline'),  skillsSub: 'Rules',  cmdSub: 'Rules' },
  roocode:     { name: "Roo Code",           path: path.join(homeDir, '.roo'),                skillsSub: 'rules',  cmdSub: 'rules' },
  continue:    { name: "Continue",           path: path.join(homeDir, '.continue'),           skillsSub: 'rules',  cmdSub: 'rules' },
  copilot:     { name: "GitHub Copilot",     path: path.join(homeDir, '.github'),             skillsSub: 'instructions', cmdSub: 'instructions' },
  aider:       { name: "Aider",              path: path.join(homeDir, '.aider'),              skillsSub: 'skills', cmdSub: 'skills' },
  opencode:    { name: "OpenCode",           path: path.join(homeDir, '.config', 'opencode'), skillsSub: 'skills', cmdSub: 'commands' },
  zed:         { name: "Zed Editor",         path: path.join(homeDir, '.config', 'zed'),      skillsSub: 'prompt_overrides', cmdSub: 'prompt_overrides' },
  augment:     { name: "Augment",            path: path.join(homeDir, '.augment'),            skillsSub: 'rules',  cmdSub: 'rules' },
  amp:         { name: "Amp",                path: path.join(homeDir, '.amp'),                skillsSub: 'skills', cmdSub: 'skills' },
  gemini:      { name: "Gemini CLI",         path: path.join(homeDir, '.gemini'),             skillsSub: 'skills', cmdSub: 'skills' },
  pi:          { name: "Pi Agent",           path: path.join(homeDir, '.pi'),                 skillsSub: 'skills', cmdSub: 'skills' },
  hermes:      { name: "Hermes",             path: path.join(homeDir, '.hermes'),             skillsSub: 'skills', cmdSub: 'skills' },
  openclaw:    { name: "OpenClaw",           path: path.join(homeDir, '.openclaw'),           skillsSub: 'skills', cmdSub: 'skills' },
  agents:      { name: "Generic Agents",     path: path.join(homeDir, '.agents'),             skillsSub: 'skills', cmdSub: 'skills' },
};

function isCommandAvailable(cmd) {
  try {
    const res = spawnSync(isWin ? 'where' : 'which', [cmd], { encoding: 'utf8', timeout: 1000 });
    return res.status === 0 && !!res.stdout && res.stdout.trim().length > 0;
  } catch (e) {
    return false;
  }
}

function isNonEmptyDir(dirPath) {
  try {
    if (!fs.existsSync(dirPath)) return false;
    const stat = fs.statSync(dirPath);
    if (!stat.isDirectory()) return false;
    const files = fs.readdirSync(dirPath);
    return files.length > 0;
  } catch (e) {
    return false;
  }
}

function checkAIInstalled(aiKey) {
  const provider = AI_PATHS[aiKey];
  if (!provider) return false;

  switch (aiKey) {
    case 'antigravity':
      return isCommandAvailable('agy') || isCommandAvailable('antigravity') || fs.existsSync('/Applications/Antigravity.app') || isNonEmptyDir(provider.path);
    case 'claude':
      return isCommandAvailable('claude') || fs.existsSync('/Applications/Claude.app') || fs.existsSync(path.join(provider.path, 'settings.json')) || fs.existsSync(path.join(provider.path, 'CLAUDE.md')) || isNonEmptyDir(provider.path);
    case 'cursor':
      if (isWin) {
        const cursorProg = path.join(process.env.LOCALAPPDATA || '', 'Programs', 'cursor');
        const cursorProg64 = 'C:\\Program Files\\Cursor';
        return fs.existsSync(cursorProg) || fs.existsSync(cursorProg64) || isCommandAvailable('cursor') || isNonEmptyDir(provider.path);
      }
      return fs.existsSync('/Applications/Cursor.app') || isCommandAvailable('cursor') || isNonEmptyDir(provider.path);
    case 'codex':
      return isCommandAvailable('codex') || isCommandAvailable('openai-codex') || isNonEmptyDir(provider.path);
    case 'windsurf':
      return fs.existsSync('/Applications/Windsurf.app') || isCommandAvailable('windsurf') || isNonEmptyDir(provider.path);
    case 'cline':
      return isNonEmptyDir(provider.path) || isNonEmptyDir(path.join(homeDir, 'Library', 'Application Support', 'Code', 'User', 'globalStorage', 'saoudrizwan.claude-dev'));
    case 'roocode':
      return isCommandAvailable('roo') || isCommandAvailable('roocode') || isNonEmptyDir(provider.path);
    case 'continue':
      return isCommandAvailable('continue') || isNonEmptyDir(provider.path);
    case 'copilot':
      return isCommandAvailable('copilot') || isNonEmptyDir(provider.path);
    case 'aider':
      return isCommandAvailable('aider') || fs.existsSync(path.join(homeDir, '.aider.conf.yml')) || isNonEmptyDir(provider.path);
    case 'opencode':
      return isCommandAvailable('opencode') || isNonEmptyDir(provider.path);
    case 'zed':
      return fs.existsSync('/Applications/Zed.app') || isCommandAvailable('zed') || isNonEmptyDir(provider.path);
    case 'augment':
      return isCommandAvailable('augment') || isNonEmptyDir(provider.path);
    case 'amp':
      return isCommandAvailable('amp') || isNonEmptyDir(provider.path);
    case 'gemini':
      return isCommandAvailable('gemini') || isNonEmptyDir(provider.path);
    case 'pi':
      return isCommandAvailable('pi') || isNonEmptyDir(provider.path);
    case 'hermes':
      return isCommandAvailable('hermes') || isNonEmptyDir(provider.path);
    case 'openclaw':
      return isCommandAvailable('openclaw') || isNonEmptyDir(provider.path);
    case 'agents':
      return isNonEmptyDir(provider.path);
    default:
      return isNonEmptyDir(provider.path);
  }
}

function getAIStatus() {
  const result = {};
  for (const [key, provider] of Object.entries(AI_PATHS)) {
    const installed = checkAIInstalled(key);
    const skillsPath = path.join(provider.path, provider.skillsSub);
    let linked = false;
    try {
      const stat = fs.lstatSync(skillsPath);
      linked = stat.isSymbolicLink() || stat.isDirectory();
    } catch (e) {}
    result[key] = { name: provider.name, installed, linked, path: provider.path };
  }
  return result;
}

function parseSkillMetadata(skillDir) {
  const skillMdPath = path.join(skillDir, 'SKILL.md');
  const targetPath = fs.existsSync(skillMdPath) ? skillMdPath : null;

  const meta = { name: path.basename(skillDir), securityScore: 100, findings: [] };
  if (!targetPath) return meta;

  try {
    const content = fs.readFileSync(targetPath, 'utf8');
    if (/eval\s*\(|new\s+Function\s*\(/i.test(content)) {
      meta.findings.push("Dinamik kod çalıştırma (eval)");
      meta.securityScore -= 40;
    }
    if (/atob\s*\(|btoa\s*\(/i.test(content)) {
      meta.findings.push("Base64 kodlama tespiti");
      meta.securityScore -= 20;
    }
    if (/sk-[a-zA-Z0-9]{32,}|ghp_[a-zA-Z0-9]{36,}/.test(content)) {
      meta.findings.push("Hardcoded secret / token sızıntısı");
      meta.securityScore -= 50;
    }
  } catch (e) {}
  meta.securityScore = Math.max(0, meta.securityScore);
  return meta;
}

function getSkillsList() {
  const skillsDir = path.join(SYNC_DIR, 'skills', 'originals');
  if (!fs.existsSync(skillsDir)) return [];
  const items = [];
  try {
    const folders = fs.readdirSync(skillsDir);
    folders.forEach(folder => {
      const subPath = path.join(skillsDir, folder);
      if (fs.statSync(subPath).isDirectory()) {
        const meta = parseSkillMetadata(subPath);
        items.push({ name: folder, path: subPath, meta });
      }
    });
  } catch (e) {}
  return items;
}

// MAIN CLI ARGS PARSER
const args = process.argv.slice(2);
const command = args[0] || 'list';
const isJson = args.includes('--json');

switch (command) {
  case 'list':
  case 'ls': {
    const skills = getSkillsList();
    if (isJson) {
      console.log(JSON.stringify(skills, null, 2));
    } else {
      console.log(`\n=== Yüklü Skill'ler (${skills.length}) ===`);
      skills.forEach(s => {
        console.log(`- ${s.name} (Güvenlik Skoru: ${s.meta.securityScore}/100)`);
      });
      console.log();
    }
    break;
  }

  case 'status': {
    const status = getAIStatus();
    if (isJson) {
      console.log(JSON.stringify(status, null, 2));
    } else {
      console.log(`\n=== 19 AI Provider Durumu ===`);
      Object.entries(status).forEach(([k, v]) => {
        console.log(`- [${k}] ${v.name}: ${v.linked ? 'BAĞLI' : 'Bağlı Değil'} (${v.installed ? 'Yüklü' : 'Algılanmadı'})`);
      });
      console.log();
    }
    break;
  }

  case 'audit': {
    const skills = getSkillsList();
    const auditResult = skills.map(s => ({
      name: s.name,
      score: s.meta.securityScore,
      findings: s.meta.findings
    }));

    if (isJson) {
      console.log(JSON.stringify(auditResult, null, 2));
    } else {
      console.log(`\n=== Security & Linter Denetimi ===`);
      auditResult.forEach(a => {
        const status = a.score >= 80 ? 'GÜVENLİ' : 'UYARI';
        console.log(`[${status}] ${a.name} — Skor: ${a.score}/100`);
        if (a.findings.length) console.log(`   Bulgular: ${a.findings.join(', ')}`);
      });
      console.log();
    }
    break;
  }

  case 'install': {
    const url = args[1];
    if (!url) {
      console.error('Hata: Klonlanacak Git URL adresi eksik.');
      process.exit(1);
    }
    const name = path.basename(url, '.git');
    console.log(`[GIT SUBMODULE] ${url} klonlanıyor...`);
    try {
      execSync(`git submodule add -f "${url}" "skills/originals/${name}"`, { cwd: SYNC_DIR, stdio: 'inherit' });
      execSync(`git submodule update --init --recursive`, { cwd: SYNC_DIR, stdio: 'inherit' });
      if (isJson) {
        console.log(JSON.stringify({ success: true, name, url }));
      } else {
        console.log(`[BAŞARILI] ${name} başarıyla kuruldu ve submodule kaydı eklendi.`);
      }
    } catch (e) {
      console.error('Kurulum hatası:', e.message);
      process.exit(1);
    }
    break;
  }

  case 'help':
  case '-h':
  default: {
    console.log(`
⚡ Multi-AI Skill Hub CLI
Kullanım: node gui/cli.js <komut> [seçenekler]

Komutlar:
  list, ls          Yüklü tüm skill'leri listeler (--json destekler)
  status            19 AI provider bağlantı durumunu gösterir (--json destekler)
  audit             Tüm skill'lerin güvenlik taramasını çalıştırır (--json destekler)
  install <url>     Git submodule olarak yeni skill ekler

Seçenekler:
  --json            AI ajanları için yapılandırılmış JSON çıktısı basar
  -h, --help        Bu yardım mesajını gösterir
`);
    break;
  }
}
