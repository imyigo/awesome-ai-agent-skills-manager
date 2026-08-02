// ============================================================
// PROVIDER ADAPTERS
// Desteklenen 5 araç. Her adapter, ortak skill modelini alıp
// aracın GERÇEK native formatına çevirir. "Dosyayı kopyala"
// değil "aracın okuduğu formata dönüştür" mantığı.
// ============================================================
const fs = require('fs');
const path = require('path');

// ---- Skill parse ----
// repo/skills/<name>/SKILL.md  ->  { name, description, body }
function parseFrontmatter(raw) {
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!m) return { meta: {}, body: raw };
  const meta = {};
  m[1].split(/\r?\n/).forEach(line => {
    const kv = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
    if (kv) meta[kv[1].trim()] = kv[2].trim().replace(/^["']|["']$/g, '');
  });
  return { meta, body: m[2] };
}

function loadSkills(skillsRoot) {
  const out = [];
  if (!fs.existsSync(skillsRoot)) return out;
  for (const entry of fs.readdirSync(skillsRoot, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const skillDir = path.join(skillsRoot, entry.name);
    const skillFile = path.join(skillDir, 'SKILL.md');
    if (!fs.existsSync(skillFile)) continue;
    let raw = '';
    try { raw = fs.readFileSync(skillFile, 'utf8'); } catch (e) { continue; }
    const { meta, body } = parseFrontmatter(raw);
    out.push({
      name: meta.name || entry.name,
      description: meta.description || '',
      body: body.trim(),
      dir: skillDir
    });
  }
  return out;
}

// ---- Yardımcılar ----
function esc(s) { return String(s || '').replace(/"/g, '\\"'); }

// ============================================================
// ADAPTERS
// capabilities.skills.mode:
//   'passthrough' -> skill klasörünü olduğu gibi kopyala (SKILL.md spec)
//   'render'      -> her skill için renderSkills() dosya listesi üretir
// mcp.format:
//   'json'        -> mcpServers { } JSON merge
//   'toml-codex'  -> [mcp_servers.x] TOML
//   null          -> MCP desteklenmiyor
// ============================================================
const ADAPTERS = {
  claude: {
    key: 'claude',
    name: 'Claude Code',
    skills: { mode: 'passthrough', sub: 'skills' },   // ~/.claude/skills/<name>/SKILL.md
    commands: { sub: 'commands', ext: '.md' },
    mcp: { format: 'json', files: ['.claude.json'], serversKey: 'mcpServers' }
  },

  antigravity: {
    key: 'antigravity',
    name: 'Google Antigravity',
    skills: { mode: 'passthrough', sub: 'skills' },   // skills spec uyumlu
    commands: { sub: 'commands', ext: '.md' },
    mcp: { format: 'json', files: ['mcp_config.json'], serversKey: 'mcpServers' }
  },

  cursor: {
    key: 'cursor',
    name: 'Cursor IDE',
    skills: {
      mode: 'render',
      sub: path.join('rules'),                        // ~/.cursor/rules/<name>.mdc
      renderSkills(skills) {
        return skills.map(s => ({
          relPath: `${s.name}.mdc`,
          content:
            `---\ndescription: ${s.description}\nalwaysApply: false\n---\n\n${s.body}\n`
        }));
      }
    },
    commands: { sub: 'commands', ext: '.md' },
    mcp: { format: 'json', files: ['mcp.json'], serversKey: 'mcpServers' }
  },

  copilot: {
    key: 'copilot',
    name: 'GitHub Copilot',
    skills: {
      mode: 'render',
      sub: 'instructions',                            // .github/instructions/<name>.instructions.md
      renderSkills(skills) {
        return skills.map(s => ({
          relPath: `${s.name}.instructions.md`,
          content:
            `---\napplyTo: '**'\n---\n\n${s.description ? s.description + '\n\n' : ''}${s.body}\n`
        }));
      }
    },
    commands: { sub: 'prompts', ext: '.prompt.md' },  // *.prompt.md = Copilot prompt files
    // Copilot MCP'yi VS Code (.vscode/mcp.json) üzerinden okur; ev dizininde global yok.
    mcp: { format: 'json', files: ['mcp.json'], serversKey: 'servers' }
  },

  codex: {
    key: 'codex',
    name: 'OpenAI Codex',
    skills: {
      mode: 'render',
      sub: '',                                        // tek dosya: ~/.codex/AGENTS.md
      single: 'AGENTS.md',
      renderSingle(skills) {
        const header =
          '# Agent Instructions (Brain Manager tarafından üretildi)\n' +
          '<!-- brain-managed:start -->\n';
        const footer = '<!-- brain-managed:end -->\n';
        const body = skills.map(s =>
          `## ${s.name}\n${s.description ? `_${s.description}_\n\n` : ''}${s.body}\n`
        ).join('\n---\n\n');
        return header + body + '\n' + footer;
      }
    },
    commands: { sub: 'prompts', ext: '.md' },         // ~/.codex/prompts/*.md -> /slash
    mcp: { format: 'toml-codex', files: ['config.toml'], serversKey: 'mcp_servers' }
  }
};

// ---- Codex TOML üretimi (config.toml içine [mcp_servers.x]) ----
// Kullanıcının config.toml'undaki diğer alanları KORUR — sadece
// brain-managed blok işaretleri arasını değiştirir.
function renderCodexMcpToml(mcpServers) {
  const lines = ['# <!-- brain-managed:start -->'];
  for (const [name, cfg] of Object.entries(mcpServers || {})) {
    lines.push(`[mcp_servers.${name}]`);
    if (cfg.command) lines.push(`command = "${esc(cfg.command)}"`);
    if (Array.isArray(cfg.args)) {
      lines.push(`args = [${cfg.args.map(a => `"${esc(a)}"`).join(', ')}]`);
    }
    if (cfg.env && typeof cfg.env === 'object') {
      const envInline = Object.entries(cfg.env)
        .map(([k, v]) => `${k} = "${esc(v)}"`).join(', ');
      lines.push(`env = { ${envInline} }`);
    }
    lines.push('');
  }
  lines.push('# <!-- brain-managed:end -->');
  return lines.join('\n') + '\n';
}

module.exports = {
  ADAPTERS,
  loadSkills,
  parseFrontmatter,
  renderCodexMcpToml,
  SUPPORTED: Object.keys(ADAPTERS)
};
