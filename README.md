# ⚡ Claude & Antigravity Best Skills Framework

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Claude Code](https://img.shields.io/badge/Built%20For-Claude%20Code-5A67D8?logo=anthropic)](https://claude.ai)
[![Google Antigravity](https://img.shields.io/badge/Compatible-Google%20Antigravity-4285F4?logo=google)](https://google.com)
[![Token Optimized](https://img.shields.io/badge/Token%20Economy-Lazy--Load-brightgreen)](#-architecture--token-economy)
[![Live Git Submodules](https://img.shields.io/badge/Sync-Git%20Submodules-orange)](#-live-sync-with-original-repos)

> **The ultimate, token-optimized, 3-tier modular skill & MCP framework for Claude Code and Google Antigravity.** Combines 10+ top community skills into a unified, zero-conflict architecture with live Git submodule syncing.

---

## 🌟 Key Features

* **🧠 Unified Super-Skill (`unified-dev`):** Distills 10+ top community skills into a non-conflicting, single core agent framework.
* **⚡ 60-70% Token Savings:** Employs a 3-tier **Lazy-Load** architecture. Only loads specific domain references (Web, Mobile, Security, etc.) when triggered.
* **🔄 Live Auto-Sync:** Linked directly to original open-source repos via **Git Submodules**. Update all skills with a single command!
* **🛡️ Security & Zero-Leak Ready:** Public-safe configuration. No hardcoded credentials.
* **🖥️ Multi-Machine Sync:** Complete cross-device sync setup script (`setup.ps1`).

---

## 🌳 Architecture & Token Economy

```
┌─────────────────────────────────────────────────────────┐
│  TIER 0: Core Rules (Always Active - Low Token Footprint)│
│  skills/unified-dev/SKILL.md                            │
│  └── references/01-core-behavior.md                     │
│       • Concise Output Style (Caveman protocol)         │
│       • Karpathy Anti-Hallucination Guardrails          │
│       • File-Based Task & Memory Planning               │
└─────────────────────────────────────────────────────────┘
              ↓ Lazy-Loaded on Demand
┌─────────────────────────────────────────────────────────┐
│  TIER 1: Domain References (Loaded Only When Needed)    │
│  ├── references/02-web.md        (Web, UI/UX, WCAG 2.2)│
│  ├── references/03-mobile.md     (iOS, Android, macOS) │
│  ├── references/04-game.md       (Game Engines, GDD)   │
│  ├── references/05-security.md   (OWASP Top 10, STRIDE)│
│  ├── references/06-planning.md   (PRD, ADR, Sprint)    │
│  └── references/07-marketing.md  (ASO, CRO, Copywriting)│
└─────────────────────────────────────────────────────────┘
              ↓ Explicit Tool Execution
┌─────────────────────────────────────────────────────────┐
│  TIER 2: External Tools & Daemons                       │
│  ├── tools/graphify-install.md   (Knowledge Graph)      │
│  └── tools/claude-mem-install.md (Persistent Memory)    │
└─────────────────────────────────────────────────────────┘
```

---

## 🔄 Live Sync with Original Repos

This framework maintains live links to original community repos via Git Submodules inside `skills/originals/`:

* [JuliusBrussee/caveman](https://github.com/JuliusBrussee/caveman) — Token reduction communication style
* [multica-ai/andrej-karpathy-skills](https://github.com/multica-ai/andrej-karpathy-skills) — Behavioral guardrails
* [OthmanAdi/planning-with-files](https://github.com/OthmanAdi/planning-with-files) — Persistent file planning
* [plugin87/ux-ui-agent-skills](https://github.com/plugin87/ux-ui-agent-skills) — Senior UI/UX & WCAG 2.2
* [coreyhaines31/marketingskills](https://github.com/coreyhaines31/marketingskills) — Marketing, ASO & CRO
* [Donchitos/Claude-Code-Game-Studios](https://github.com/Donchitos/Claude-Code-Game-Studios) — Game dev framework
* [Graphify-Labs/graphify](https://github.com/Graphify-Labs/graphify) — Codebase knowledge graph
* [Egonex-AI/Understand-Anything](https://github.com/Egonex-AI/Understand-Anything) — Guided codebase tours
* [VoltAgent/awesome-agent-skills](https://github.com/VoltAgent/awesome-agent-skills) — 1000+ Agent skills index

---

## 🚀 Quick Setup (30 Seconds)

### 1. Clone with Submodules
```bash
git clone --recursive https://github.com/imyigo/claude-antigravity-skills.git ~/.gemini/claude-antigravity-best-skills
```

### 2. Run Setup Script (Windows / macOS / Linux)
```powershell
cd ~/.gemini/claude-antigravity-best-skills
.\setup.ps1
```

### 3. One-Click Updates
To update all skills from their live original GitHub sources at any time:
```powershell
.\update-skills.ps1
```

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/imyigo/claude-antigravity-skills/issues).

---

## 📜 License

This project is [MIT](LICENSE) licensed.
