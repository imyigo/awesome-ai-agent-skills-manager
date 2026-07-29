# ⚡ Universal Multi-AI Agent Control Center

<p align="center">
  <img src="https://img.shields.io/badge/Control_Center-v2.0-5B5BD6?style=for-the-badge&logo=react&logoColor=white" alt="Universal Control Center" />
  <img src="https://img.shields.io/badge/AI_Providers-19_Agents_Active-00C853?style=for-the-badge&logo=python&logoColor=white" alt="19 AI Providers" />
  <img src="https://img.shields.io/badge/Architecture-Zero--Copy_Junction-FF6D00?style=for-the-badge&logo=git&logoColor=white" alt="Junction Link Architecture" />
  <img src="https://img.shields.io/badge/License-MIT-blue?style=for-the-badge" alt="MIT License" />
</p>

<p align="center">
  <a href="README.md"><b>English</b></a> •
  <a href="docs/README.tr.md"><b>Türkçe</b></a>
</p>

> **The Universal Control Surface for AI Coding Assistants & Agents.**  
> Effortlessly unify, audit, test, and sync **Skills, MCP Servers, and Slash Commands** across **19 AI coding tools** — powered by zero-copy OS Junction Links, an SSE Real-Time Engine, and AST Security Threat Analysis.

---

## 🤖 19 Supported AI Harnesses

Universal Control Center automatically detects, links, and manages 19 top AI tools out of the box:

```text
┌─────────────────────────────────────────────────────────────────────────────────┐
│                           19 SUPPORTED AI HARNESSES                             │
├─────────────────────────────────────────────────────────────────────────────────┤
│  1. Google Antigravity    6. Cline               11. OpenCode     16. Pi Agent  │
│  2. Claude Code           7. Roo Code            12. Zed Editor   17. Hermes    │
│  3. Cursor IDE            8. Continue            13. Augment      18. OpenClaw  │
│  4. OpenAI Codex          9. GitHub Copilot      14. Amp          19. Generic   │
│  5. Windsurf             10. Aider               15. Gemini CLI       Agents    │
└─────────────────────────────────────────────────────────────────────────────────┘
```

---

## 🌟 Key Capabilities

### 🔌 1. Real-Time SSE Push Engine
No manual refreshes required. Any filesystem modification or status change is broadcast in real time to all connected web clients via **Server-Sent Events (SSE)**.

### 🔗 2. Zero-Copy Junction Link Architecture
Links your central skills and commands directory natively to all 19 tools using OS Junctions / Symlinks. Updating via `git pull` instantly propagates updates across your entire AI stack without file duplication.

### 🛠️ 3. 3-in-1 Unified Management Layer
Manages **Skills** (`SKILL.md`), **MCP Servers** (`mcp_config.json`), and **Slash Commands** (`commands/`) in one dashboard and synchronizes them globally.

### 🛡️ 4. AST Security & Threat Scanner
Scans skill instructions for dangerous patterns:
* Dynamic code execution (`eval`, `new Function`)
* Obfuscated payloads (`atob`, `btoa`, base64)
* Hardcoded API secrets (`sk-`, `ghp_`, AWS keys)
* Destructive system operations (`rm -rf /`, `format c:`)

### ⚡ 5. Workflow Presets (Developer Modes)
Activate curated skill combinations for specific engineering workflows with one click:
* **Fullstack Web & App Architect:** Karpathy Guardrails + OKLCH Design Tokens + Node.js/React standards.
* **Security Audit & Hardening:** OWASP Top 10 + STRIDE Threat Modeling + Zero-Trust auditing.
* **Indie Game Developer Studio:** Core Loop + 60 FPS Object Pooling + Game Feel.
* **Growth Marketing & CRO:** PAS/AIDA Copywriting + App Store Optimization.
* **Custom Preset Creator:** Create, save, and manage your own custom workflow modes.

### 🧪 6. Interactive LLM Sandbox Tester
Test how an AI agent will interpret user prompts under specific skill frameworks before deploying.

### 🤖 7. Scriptable Automation CLI (`skills --json`)
Pass `--json` flags to script skill inventory, security audits, and provider links from AI agents or CI/CD pipelines:
```bash
node gui/cli.js status --json
node gui/cli.js list --json
node gui/cli.js audit --json
```

---

## 🚀 Quick Start

### 1. Clone Repository with Submodules
```bash
git clone --recursive https://github.com/imyigo/awesome-ai-agent-skills-manager.git ~/.gemini/claude-antigravity-best-skills
```

### 2. Launch Control Center
```bash
cd ~/.gemini/claude-antigravity-best-skills
chmod +x gui.sh
./gui.sh
```

> **The Web Dashboard opens automatically at `http://localhost:3777`!**

---

## 📜 License

MIT License. Designed and engineered for high-performance AI agent workflows.
