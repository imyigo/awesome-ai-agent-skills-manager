# ⚡ Universal Multi-AI Agent Control Center

<p align="center">
  <img src="https://img.shields.io/badge/Control_Center-v2.0-5B5BD6?style=for-the-badge&logo=react&logoColor=white" alt="Universal Control Center" />
  <img src="https://img.shields.io/badge/AI_Providers-19_Agents_Active-00C853?style=for-the-badge&logo=python&logoColor=white" alt="19 AI Providers" />
  <img src="https://img.shields.io/badge/Architecture-Zero--Copy_Junction-FF6D00?style=for-the-badge&logo=git&logoColor=white" alt="Junction Link Architecture" />
  <img src="https://img.shields.io/badge/License-MIT-blue?style=for-the-badge" alt="MIT License" />
</p>

<p align="center">
  <a href="README.md"><b>English</b></a> •
  <a href="docs/README.tr.md"><b>Türkçe</b></a> •
  <a href="docs/README.de.md"><b>Deutsch</b></a> •
  <a href="docs/README.zh.md"><b>中文</b></a>
</p>

> **The World's Most Advanced Control Surface for AI Coding Assistants & Agents.**  
> Effortlessly unify, audit, test, and sync **Skills, MCP Servers, and Slash Commands** across **19 AI coding tools** — powered by zero-copy OS Junction Links, an SSE Real-Time Engine, and AST Security Threat Analysis.

---

## 💥 Why Engineers & Teams Choose Universal Skill Hub

| Problem Without Skill Hub | Solution With Universal Control Center |
|---|---|
| **Folder Chaos:** Skills copied into `~/.claude`, `~/.cursor`, `~/.codex` get out of sync instantly. | **Single-Source Junction Architecture:** One central folder linked natively via OS Junctions to 19 tools. One `git pull` updates every agent instantly. |
| **Scattered MCP & Slash Commands:** MCP JSON configs and slash commands maintained separately per tool. | **3-in-1 Unified Management:** Skills, MCP Servers (`mcp_config.json`), and Slash Commands managed in one dashboard and synced globally. |
| **Security Risks:** Malicious skills with hidden `eval()`, base64 payloads, or API key leaks. | **AST & LLM Threat Analysis:** Built-in security auditor rates skills 0-100 and flags vulnerabilities before deployment. |
| **Manual Edits & Re-uploads:** Editing SKILL.md requires terminal navigation and manual copy-pasting. | **In-Browser Live Code Editor & Diff Preview:** Edit markdown with live preview and compare changes side-by-side. |
| **No Testing Environment:** Blindly trusting skills without knowing how AI agents will execute them. | **Interactive LLM Sandbox Tester:** Simulate AI agent responses to user prompts using specific skill rules in a sandbox. |
| **Heavy Binaries & Python Setup:** Competitors require 2GB Rust toolchains, PyInstaller, or SQLite setup. | **Blazing Fast & Zero Dependencies:** Pure Node.js + React 18 SPA. Launches in **under 1 second** (`./gui.sh`). |

---

## 🤖 19 Supported AI Providers (Full Matrix Coverage)

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

## 🌟 Key Features

### 🔌 1. Real-Time SSE Push Engine (Django Channels Architecture)
No browser refreshes required. Any filesystem modification or backend status toggle is broadcast in real time to all open React tabs via **Server-Sent Events (SSE)**.

### 🛡️ 2. AST & LLM Threat Scanner (0-100 Security Score)
Scans skill instructions for dangerous patterns:
* Dynamic code execution (`eval`, `new Function`)
* Obfuscated payloads (`atob`, `btoa`, base64)
* Hardcoded secrets (`sk-`, `ghp_`, AWS keys)
* Destructive system commands (`rm -rf /`, `format c:`)

### ⚡ 3. 1-Click Workflow Presets (Developer Modes)
Activate curated skill combinations for specific engineering workflows with one click:
* **Fullstack Web & App Architect:** Karpathy Guardrails + OKLCH Design Tokens + Node.js/React standards.
* **Security Audit & Hardening:** OWASP Top 10 + STRIDE Threat Modeling + Zero-Trust auditing.
* **Indie Game Developer Studio:** Core Loop + 60 FPS Object Pooling + Game Feel (Juice).
* **Growth Marketing & CRO:** PAS/AIDA Copywriting + App Store Optimization.
* **Custom Preset Creator:** Create, save, and manage your own custom workflow modes.

### 🧪 4. Interactive LLM Sandbox Tester
Test how an AI agent will interpret user prompts under specific skill frameworks before deploying. Includes token count estimates and simulated response outputs.

### 🤖 5. Scriptable Automation CLI (`skills --json`)
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

### 2. Launch Web GUI Control Center
```bash
cd ~/.gemini/claude-antigravity-best-skills
chmod +x gui.sh
./gui.sh
```

> **The Web Control Center opens automatically at `http://localhost:3777`!**

---

## 📊 Feature Comparison Matrix

| Feature | **Universal Control Center** | `asm` (npm CLI) | `skills-manager` (Rust) | `skill-manager` (Python) |
|---|---|---|---|---|
| **AI Providers** | **19 Agents** | 19 Agents | ~6 Agents | 6 Agents |
| **Setup Overhead** | **Zero (Node.js)** | npm global | 2GB+ Rust SDK | Python venv + SQLite |
| **Storage Architecture** | **Junction Link (Zero-Copy)** | File Copy | Git Submodule | File Copy |
| **Managed Layers** | **Skills + MCP + Commands** | Skills | Skills | Skills + MCP + Commands |
| **Live Sync** | **SSE Push Engine** | None | None | None |
| **Scriptable CLI** | **`skills --json`** | `asm --json` | None | REST API |
| **Security Audit** | **AST + LLM Scan** | Regex | None | LLM Scan |
| **Testing Playground** | **LLM Sandbox Tester** | None | None | None |
| **Multi-Language** | **TR / EN Toggle** | None | EN/ZH | EN/ZH |

---

## 📜 License

MIT License. Designed and engineered for high-performance AI agent workflows.
