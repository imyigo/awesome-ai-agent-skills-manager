# ⚡ Multi-AI Skill & Framework Hub (Claude • Antigravity • Cursor • Codex)

<p align="center">
  <a href="README.md"><b>English</b></a> •
  <a href="docs/README.tr.md"><b>Türkçe</b></a> •
  <a href="docs/README.de.md"><b>Deutsch</b></a> •
  <a href="docs/README.ru.md"><b>Русский</b></a> •
  <a href="docs/README.zh.md"><b>中文</b></a> •
  <a href="docs/README.fr.md"><b>Français</b></a> •
  <a href="docs/README.pt.md"><b>Português</b></a>
</p>

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Claude Code](https://img.shields.io/badge/Supported-Claude%20Code-5A67D8?logo=anthropic)](https://claude.ai)
[![Google Antigravity](https://img.shields.io/badge/Supported-Google%20Antigravity-4285F4?logo=google)](https://google.com)
[![Cursor IDE](https://img.shields.io/badge/Supported-Cursor%20IDE-000000?logo=cursor)](https://cursor.com)
[![OpenAI Codex](https://img.shields.io/badge/Supported-OpenAI%20Codex-00A67E?logo=openai)](https://openai.com)
[![Token Optimized](https://img.shields.io/badge/Token%20Economy-Lazy--Load-brightgreen)](#-architecture--token-economy)

> **The ultimate multi-AI agent skill manager.** Auto-detects and connects 10+ top community skills to **Claude Code, Google Antigravity, Cursor IDE, and OpenAI Codex** with live Git Submodule syncing and transparent GitHub reporting.

---

## ❓ The Problem: Is Managing AI Skills a Nightmare?

> **Are you tired of manually copying skill files across multiple machines, Claude Code, Antigravity, Cursor, and Codex?**

* ❌ **Instruction Conflicts:** Downloading raw skills from different repos leads to conflicting AI instructions.
* ❌ **Token Waste:** Loading massive, unoptimized skill files burns hundreds of thousands of context tokens in seconds.
* ❌ **Outdated Skills:** When original repo authors update their skills, your local copies stay outdated without you knowing.
* ❌ **Multi-AI Confusion:** Managing separate skill folders for Claude (`~/.claude`), Antigravity (`~/.gemini`), Cursor (`~/.cursor`), and Codex (`~/.codex`) is tedious and error-prone.

---

## 💡 The Solution: Multi-AI Skill & Framework Hub

> **A single-command, zero-conflict, token-optimized control panel that unifies your entire AI stack.**

* ✅ **Auto-AI Detection:** Automatically finds Antigravity, Claude Code, Cursor IDE, and OpenAI Codex on your system and links them seamlessly.
* ✅ **3-Tier Lazy-Load Architecture:** Reduces token consumption by **60-70%** by loading domain references only when triggered.
* ✅ **Live Upstream Sync:** Directly linked to original open-source repos via Git Submodules. Update all skills transparently with one click.
* ✅ **One-Click Custom Skill Addition:** Add any public GitHub skill repo on-the-fly and instantly deploy it across all your AI assistants.

---

## 🌟 Key Features

* **🎨 Modern Web GUI Dashboard:** Launch a visual dark-mode web dashboard (`./gui.sh`) at `http://localhost:3777` with live status badges, interactive action buttons, and live log console!
* **🤖 Multi-AI Assistant Auto-Detection:** Automatically detects installed AI agents (Antigravity, Claude Code, Cursor IDE, OpenAI Codex) and manages symlinks seamlessly.
* **🧠 Unified Super-Skill (`unified-dev`):** Distills 10+ top community skills into a non-conflicting core framework.
* **⚡ 60-70% Token Savings:** 3-Tier **Lazy-Load** architecture. Only loads specific domain references when triggered.
* **🔄 Live Upstream Sync & Transparent Reporting:** Displays live GitHub repository URLs, commit hashes, and author change logs during updates.
* **➕ Add Custom GitHub Skills:** Add any public GitHub skill repository on-the-fly and instantly link it across all detected AI assistants.

---

## 🎨 Web GUI Dashboard & CLI Options

You can manage your skills using the **Visual Web Dashboard** (`./gui.sh`) OR the **Interactive CLI** (`./control.sh`):

### Option A: Launch Visual Web Dashboard (Recommended)
```bash
./gui.sh
# Opens http://localhost:3777 in your browser automatically!
```

### Option B: Interactive CLI Dashboard
```bash
./control.sh
```

```text
========================================================
  ⚡ MULTI-AI SKILL & FRAMEWORK HUB CONTROL PANEL
  (Antigravity • Claude Code • Cursor IDE • OpenAI Codex)
========================================================
  [1] 🚀 Kurulum Yap & Tüm AI'ları Bağla (Install & Link)
  [2] 🔄 Skill'leri Güncelle & GitHub Raporu Al (Update & Report)
  [3] 🔍 AI Tespiti & Sistem Bağlantı Durumu (Auto-Detect Status)
  [4] ➕ Canlı Yeni GitHub Skill Reposu Ekle (Add Custom Skill Repo)
  [5] ⚙️ AI Bağlantı Hedef Ayarları (Toggle Target AIs)
  [6] ❌ Çıkış (Exit)
========================================================
```

---

## 🚀 Quick Start (30 Seconds)

### 1. Clone with Submodules
```bash
git clone --recursive https://github.com/imyigo/claude-antigravity-skills.git ~/.gemini/claude-antigravity-best-skills
```

### 2. Launch Control Panel
```bash
cd ~/.gemini/claude-antigravity-best-skills
chmod +x control.sh
./control.sh
```

---

## 📜 License

This project is [MIT](LICENSE) licensed.
