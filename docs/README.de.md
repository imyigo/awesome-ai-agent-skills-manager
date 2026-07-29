<p align="center">
  <img src="https://img.shields.io/badge/Brain_Manager-v2.5-5B5BD6?style=for-the-badge&logo=react&logoColor=white" />
  <img src="https://img.shields.io/badge/KI_Agenten-19_unterstützt-00C853?style=for-the-badge&logo=openai&logoColor=white" />
  <img src="https://img.shields.io/badge/Setup-90_Sekunden-FF6D00?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Lizenz-MIT-blue?style=for-the-badge" />
</p>

<h1 align="center">🧠 Awesome Universal Agent Brain Manager</h1>
<p align="center"><b>Ein Dashboard für alle AI-Coding-Agenten — Skills, MCP-Server und Presets, alles synchron.</b></p>

---

<p align="center">
  🌍 <b>Sprache wählen</b><br><br>
  <a href="../README.md"><b>🇬🇧 English</b></a> &nbsp;•&nbsp;
  <a href="README.tr.md"><b>🇹🇷 Türkçe</b></a> &nbsp;•&nbsp;
  <a href="README.zh.md"><b>🇨🇳 中文</b></a> &nbsp;•&nbsp;
  <a href="README.ja.md"><b>🇯🇵 日本語</b></a> &nbsp;•&nbsp;
  <a href="README.de.md"><b>🇩🇪 Deutsch</b></a> &nbsp;•&nbsp;
  <a href="README.es.md"><b>🇪🇸 Español</b></a>
</p>

---

## 😤 Das Problem, das jeder AI-Entwickler kennt

Du nutzt **Claude Code**, **Cursor**, **Windsurf**, **Copilot** und weitere Tools.  
Jedes Tool hat sein eigenes `SKILL.md`, `rules/`, `mcp_config.json`, Slash-Kommando-Ordner.

**Das Ergebnis?**

```
❌  Du aktualisierst einen Skill in Claude → Cursor weiß nichts davon
❌  Du fügst einen MCP-Server hinzu → musst ihn in 5 Tools separat konfigurieren
❌  Du installierst ein neues Skill-Repo → manuell in jeden Agent-Ordner kopieren
❌  Du wechselst das Projekt → alle Workflow-Presets sind weg
❌  Neues Teammitglied kommt → "Wo sind die Configs?" 3 Stunden Onboarding
```

**Du verwaltest Konfigurationen statt Software zu schreiben.**

---

## ✅ Die Lösung: Ein Gehirn, alle Agenten

```
┌─────────────────────────────────────────────────────────────────┐
│               🧠 AGENT BRAIN MANAGER                            │
│                                                                 │
│  📁 repo/skills/          ←  beliebige Skill-Repos klonen       │
│  📋 MCP-Server            ←  einmal konfigurieren, überall sync │
│  ⚡ Workflow-Presets      ←  Kontext mit einem Klick wechseln   │
│  🔴 Live SSE-Engine       ←  Echtzeit-Push an alle Agenten      │
│                                                                 │
│  Dashboard → http://localhost:3777                              │
└────────────────┬────────────────────────────────────────────────┘
                 │  Auto-Sync (Kopiermodus)
     ┌───────────┼───────────────────────────────┐
     ▼           ▼           ▼           ▼        ▼
  Claude      Cursor     Windsurf    Copilot   + 15 weitere
  Code        IDE        IDE         Chat      Agenten
  ✅ Skills   ✅ Regeln  ✅ Skills   ✅ Skills  ✅ Alles sync
  ✅ MCP      ✅ MCP     ✅ MCP      ✅ MCP
```

**Einmal aktualisieren → sofort an alle 19 Agenten weitergegeben.**

---

## ⚡ Setup in 90 Sekunden

> **Voraussetzungen:** Node.js 18+ und Git. Das war's.

```bash
# 1. Klonen
git clone https://github.com/imyigo/awesome-universal-agent-brain-manager.git
cd awesome-universal-agent-brain-manager

# 2. Starten
node gui/gui_server.js

# 3. Browser → http://localhost:3777
```

**Kein Docker. Kein Python. Kein Build-Schritt. Keine Config-Dateien bearbeiten.**  
Dashboard öffnen → "Verbinden" neben deinen AI-Tools klicken → fertig. ✅

---

## 📋 Systemanforderungen

| Tool | Erforderlich | Hinweis |
|------|-------------|---------|
| **Node.js** | ✅ Ja | v18 oder höher |
| **Git** | ✅ Ja | Zum Klonen von Skill-Repos |
| **Docker CLI** | ❌ Optional | Nur für Core Engine Daemons |
| **Python** | ❌ Optional | Nur für bestimmte Skills |
| **Browser** | ✅ Ja | Chrome, Firefox, Edge |

---

## 🛠️ Features auf einen Blick

- **📦 Skill-Repository-Manager** — URL eingeben, GitHub-Repo installieren, automatisch zu allen Agenten kopieren
- **🛍️ Starter Packs** — Kuratierte Multi-Repo-Bundles (Fullstack Dev, Security, Creative, AI Memory...)
- **🔌 MCP-Server-Verwaltung** — Stdio & HTTP/SSE Server, eingebaute API-Schlüssel-Verwaltung
- **⚡ Workflow-Presets** — Skill-Set mit einem Klick für aktuelle Aufgabe wechseln
- **🔴 Live-Terminal** — Jede git/Install-Operation wird zeilenweise gestreamt
- **💾 SQLite Backup/Wiederherstellung** — Gesamtsystem in eine JSON-Datei exportieren
- **🛡️ Sicherheitsscanner** — Gefährliche Muster in Skill-Dateien erkennen

---

## 🔌 19 unterstützte AI-Tools

```
1. Google Antigravity    6. Cline          11. OpenCode      16. Pi Agent
2. Claude Code           7. Roo Code       12. Zed Editor    17. Hermes
3. Cursor IDE            8. Continue       13. Augment       18. OpenClaw
4. OpenAI Codex          9. GitHub Copilot 14. Amp           19. Generische Agents
5. Windsurf             10. Aider          15. Gemini CLI
```

---

## 📜 Lizenz

MIT — Kostenlos für persönliche und kommerzielle Nutzung.

---

<p align="center">
  <b>⭐ Falls dieses Tool dir Zeit bei der AI-Agent-Verwaltung spart, gib dem Repo einen Star!</b><br><br>
  <a href="../README.md">🇬🇧 English</a> •
  <a href="README.tr.md">🇹🇷 Türkçe</a> •
  <a href="README.zh.md">🇨🇳 中文</a> •
  <a href="README.ja.md">🇯🇵 日本語</a> •
  <a href="README.de.md">🇩🇪 Deutsch</a> •
  <a href="README.es.md">🇪🇸 Español</a>
</p>
