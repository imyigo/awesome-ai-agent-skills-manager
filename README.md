<p align="center">
  <img src="https://img.shields.io/badge/Brain_Manager-v2.5-5B5BD6?style=for-the-badge&logo=react&logoColor=white" />
  <img src="https://img.shields.io/badge/AI_Providers-19_Supported-00C853?style=for-the-badge&logo=openai&logoColor=white" />
  <img src="https://img.shields.io/badge/Setup_Time-90_Seconds-FF6D00?style=for-the-badge&logo=lightning&logoColor=white" />
  <img src="https://img.shields.io/badge/License-MIT-blue?style=for-the-badge" />
</p>

<h1 align="center">🧠 Awesome Universal Agent Brain Manager</h1>
<p align="center"><b>One dashboard to rule all your AI coding agents — Skills, MCP Servers & Presets, unified.</b></p>

---

<p align="center">
  🌍 <b>Language / Dil / 语言 / 言語 / Sprache / Idioma</b><br><br>
  <a href="README.md"><b>🇬🇧 English</b></a> &nbsp;•&nbsp;
  <a href="docs/README.tr.md"><b>🇹🇷 Türkçe</b></a> &nbsp;•&nbsp;
  <a href="docs/README.zh.md"><b>🇨🇳 中文</b></a> &nbsp;•&nbsp;
  <a href="docs/README.ja.md"><b>🇯🇵 日本語</b></a> &nbsp;•&nbsp;
  <a href="docs/README.de.md"><b>🇩🇪 Deutsch</b></a> &nbsp;•&nbsp;
  <a href="docs/README.es.md"><b>🇪🇸 Español</b></a>
</p>

---

## 😤 The Problem Every AI Developer Knows

You use **Claude Code**, **Cursor**, **Windsurf**, **Copilot** and 5 other tools.  
Every tool has its own `SKILL.md`, `rules/`, `mcp_config.json`, slash commands folder.

**The result?**

```
❌  You update a skill in Claude → Cursor doesn't know about it
❌  You add an MCP server → you have to configure it in 5 tools separately
❌  You install a new skill repo → manually copy to every agent's folder
❌  You switch projects → all your workflow presets are gone
❌  New team member joins → "where are the configs?" 3-hour onboarding
```

You're spending **hours managing configs** instead of building software.

---

## ✅ The Solution: One Brain, All Agents

```
┌─────────────────────────────────────────────────────────────────┐
│               🧠 AGENT BRAIN MANAGER                            │
│                                                                 │
│  📁 repo/skills/          ←  git clone any skill repo here     │
│  📋 MCP Servers           ←  configure once, syncs everywhere  │
│  ⚡ Workflow Presets      ←  one-click context switching        │
│  🔴 Live SSE Engine       ←  real-time push to all agents      │
│                                                                 │
│  Dashboard → http://localhost:3777                              │
└────────────────┬────────────────────────────────────────────────┘
                 │  Auto-sync (Copy Mode)
     ┌───────────┼───────────────────────────────┐
     ▼           ▼           ▼           ▼        ▼
  Claude      Cursor     Windsurf    Copilot   + 15 more
  Code        IDE        IDE         Chat      agents...
  ✅ Skills   ✅ Rules   ✅ Skills   ✅ Skills  ✅ All synced
  ✅ MCP      ✅ MCP     ✅ MCP      ✅ MCP
  ✅ Commands ✅ Commands ✅ Commands ✅ Commands
```

**Update once → propagates to all 19 agents instantly.**

---

## ⚡ 90-Second Setup

> **Requirements:** Node.js 18+ and Git. That's it.

```bash
# 1. Clone
git clone https://github.com/imyigo/awesome-universal-agent-brain-manager.git
cd awesome-universal-agent-brain-manager

# 2. Run
node gui/gui_server.js

# 3. Open browser → http://localhost:3777
```

**No Docker. No Python. No build step. No config files to edit.**  
Open the dashboard → click "Connect" next to your AI tools → done. ✅

---

## 🗺️ How It Works (Full Architecture)

```
YOUR MACHINE
═══════════════════════════════════════════════════════════════════

  ┌─────────────────────────────────────────────────────────────┐
  │  📦 SKILL REPOSITORIES  (repo/skills/)                      │
  │                                                             │
  │  ├── caveman/          ← Token compression                  │
  │  ├── ui-ux-pro-max/    ← Design system rules                │
  │  ├── cybersecurity/    ← OWASP + threat modeling            │
  │  ├── your-custom-skill/← Your own skills                    │
  │  └── ...               ← Install any GitHub repo            │
  └──────────────────┬──────────────────────────────────────────┘
                     │
                     ▼
  ┌─────────────────────────────────────────────────────────────┐
  │  🧠 BRAIN MANAGER  (gui_server.js + SQLite)                 │
  │                                                             │
  │  • Web Dashboard    http://localhost:3777                   │
  │  • SSE Live Engine  /api/events (real-time push)            │
  │  • SQLite DB        All settings, presets, MCP configs      │
  │  • REST API         /api/skills /api/mcp /api/presets       │
  │  • Live Terminal    Streams every git/install operation     │
  └──────────────────┬──────────────────────────────────────────┘
                     │  File copy / sync
     ┌───────────────┼──────────────────────────────┐
     │               │               │              │
     ▼               ▼               ▼              ▼
  ~/.claude/      ~/.cursor/     ~/.gemini/    ~/.continue/
  skills/         rules/         antigravity/  skills/
  commands/       commands/      skills/       (etc.)
  mcp.json        .cursorrules   commands/
                                 mcp.json
  ✅ Claude     ✅ Cursor      ✅ Antigravity  ✅ Continue
  ✅ Cline      ✅ Windsurf    ✅ Copilot      ✅ + 12 more

RESULT: Edit one skill → all agents updated in seconds
```

---

## 🎯 Who Is This For?

| Persona | Pain | How This Helps |
|---------|------|----------------|
| **Solo Developer** | Maintaining skill configs across 3+ AI tools | One dashboard, all synced |
| **Dev Team** | Onboarding new member takes hours | Export SQLite backup → import → everything restored in 60s |
| **AI Power User** | Switching context between frontend/security/data work | One-click Workflow Presets |
| **Prompt Engineer** | Testing skills before deploying to agents | Built-in LLM Sandbox Tester |
| **DevOps / CI-CD** | Automating skill audits in pipelines | `node gui/cli.js audit --json` |

---

## 🔌 19 Supported AI Agents

```
┌────────────────────────────────────────────────────────────────┐
│                    SUPPORTED AI AGENTS                         │
├────────────────────────────────────────────────────────────────┤
│  1. Google Antigravity   6. Cline          11. OpenCode        │
│  2. Claude Code          7. Roo Code       12. Zed Editor      │
│  3. Cursor IDE           8. Continue       13. Augment         │
│  4. OpenAI Codex         9. GitHub Copilot 14. Amp             │
│  5. Windsurf            10. Aider          15. Gemini CLI       │
│                                           16. Pi Agent         │
│                                           17. Hermes           │
│                                           18. OpenClaw         │
│                                           19. Generic Agents   │
└────────────────────────────────────────────────────────────────┘
```

---

## 🛠️ Features at a Glance

### 📦 Skill Repository Manager
- Install any GitHub skill repo with one URL → files copied to all agents automatically
- Browse **Starter Packs** (curated multi-repo bundles: Full-Stack, Security, Creative, AI Memory...)
- Enable / disable individual skills per Preset
- Real-time clone progress streamed to Live Terminal

### 🔌 MCP Server Manager
- Add local `stdio` or remote `HTTP/SSE` MCP servers
- One config → propagated to Claude, Cursor, Windsurf etc.
- API key & environment variable editor built-in
- Quick templates: n8n, SQLite, Postgres, Puppeteer, 21st.dev

### ⚡ Workflow Presets
- Pre-built modes: Fullstack Dev, Security Audit, Game Studio, Marketing, Data Science
- Auto-activates only the relevant skills for your current task
- Create and save unlimited custom presets

### 🔴 Live Terminal
- Every `git clone`, `git pull`, Docker install, repo remove streams output **line by line**
- No more "is it working?" — see every operation in real time
- Pulsing green indicator when a job is active

### 📊 System Report Dashboard
- Provider connection status at a glance (19 agents, color-coded)
- Installed repos, active skills, MCP server count
- System Requirements panel: Git ✓, Node ✓, Docker ✓/✗, Python ✓/✗

### 💾 SQLite Backup & Restore
- Export full system state to one JSON file
- Import on any machine → **auto-clones all repos, restores all settings**
- Perfect for team sharing and machine migrations

### 🛡️ Security Scanner
- Scans all skill files for: `eval`, `exec`, hardcoded API keys, destructive commands
- AST-based threat detection — not just regex

---

## 📋 System Requirements

| Tool | Required | Notes |
|------|----------|-------|
| **Node.js** | ✅ Yes | v18 or higher |
| **Git** | ✅ Yes | For cloning skill repos |
| **Docker CLI** | ❌ Optional | Only for Core Engine daemons |
| **Python** | ❌ Optional | Only for certain skills |
| **Browser** | ✅ Yes | Chrome, Firefox, Edge |

> 💡 **Check your requirements:** Open the app → Settings → "Sistem Gereksinimleri" panel shows live status of all tools.

---

## 📂 Project Structure

```
awesome-universal-agent-brain-manager/
├── gui/
│   ├── gui_server.js     ← Node.js HTTP + SSE server (single file, no deps)
│   └── src/
│       └── App.jsx       ← React 18 SPA (served via CDN, no build needed)
├── repo/
│   └── skills/           ← Your installed skill repos (git-ignored)
├── db.sqlite             ← All state: presets, MCP, settings (git-ignored)
├── gui.sh                ← One-command launcher (Linux/macOS)
└── README.md
```

> **Zero build step.** The server reads `App.jsx` directly and serves it with browser-native ES modules + React from CDN.

---

## 🚀 Quick Start (Full)

```bash
# Clone the repo
git clone https://github.com/imyigo/awesome-universal-agent-brain-manager.git
cd awesome-universal-agent-brain-manager

# Start the server
node gui/gui_server.js

# OR on Linux/macOS:
./gui.sh
```

**Open:** `http://localhost:3777`

### First 5 Minutes:
1. **Dashboard** → see which AI agents are detected on your machine
2. **Providers** → click "Connect" to link your AI tools
3. **Starter Packs** → install a curated skill bundle (e.g. Full-Stack Dev)
4. **Presets** → activate a workflow mode
5. **Settings** → export a backup

---

## 🔧 CLI Usage (for Automation)

```bash
# List all installed skills as JSON
node gui/cli.js list --json

# Check provider link status
node gui/cli.js status --json

# Run security audit on all skills
node gui/cli.js audit --json

# Update all skill repos
curl -X POST http://localhost:3777/api/update
```

---

## 🤝 Contributing

1. Fork this repo
2. Install a new skill pack (any public GitHub repo with a `SKILL.md`)
3. Submit a PR to add it to the Starter Packs catalog

---

## 📜 License

MIT — Free for personal and commercial use.

---

<p align="center">
  <b>⭐ Star this repo if it saves you time managing AI agent configs!</b><br><br>
  <a href="README.md">🇬🇧 English</a> •
  <a href="docs/README.tr.md">🇹🇷 Türkçe</a> •
  <a href="docs/README.zh.md">🇨🇳 中文</a> •
  <a href="docs/README.ja.md">🇯🇵 日本語</a> •
  <a href="docs/README.de.md">🇩🇪 Deutsch</a> •
  <a href="docs/README.es.md">🇪🇸 Español</a>
</p>
