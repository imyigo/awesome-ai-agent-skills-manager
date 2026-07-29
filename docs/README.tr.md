# ⚡ Evrensel Multi-AI Agent Yönetim Merkezi

<p align="center">
  <img src="https://img.shields.io/badge/Kontrol_Merkezi-v2.0-5B5BD6?style=for-the-badge&logo=react&logoColor=white" alt="Kontrol Merkezi" />
  <img src="https://img.shields.io/badge/AI_Providers-19_Ara%C3%A7_Aktif-00C853?style=for-the-badge&logo=python&logoColor=white" alt="19 AI Provider" />
  <img src="https://img.shields.io/badge/Mimari-S%C4%B1f%C4%B1r--Kopya_Junction-FF6D00?style=for-the-badge&logo=git&logoColor=white" alt="Junction Link Mimarisi" />
  <img src="https://img.shields.io/badge/Lisans-MIT-blue?style=for-the-badge" alt="MIT Lisansı" />
</p>

> **Yapay Zeka Kodlama Asistanları İçin Dünyanın En Gelişmiş Kontrol Yüzeyi.**  
> **19 farklı AI aracında** (Claude Code, Google Antigravity, Cursor, Codex, Windsurf vb.) **Skill'leri, MCP Server'ları ve Slash Komutlarını** tek bir merkezden sıfır kopyalama Junction Link mimarisi, SSE Canlı Push Motoru ve AST Güvenlik Analizi ile yönetin.

---

## 💥 Neden Evrensel Skill Merkezi?

| Problemler (Merkez Olmadan) | Çözümlerimiz (Evrensel Kontrol Merkezi) |
|---|---|
| **Klasör Karmaşası:** Skill'lerin `~/.claude`, `~/.cursor` gibi farklı yerlere kopyalanıp sürümlerin bozulması. | **Tek Kaynak Junction Mimarisi:** İlgili işletim sistemi seviyesinde bağlanan tek klasör. Tek `git pull` ile 19 aracın tamamı güncellenir. |
| **Dağınık MCP ve Komutlar:** MCP ayarlarının ve slash komutlarının her araçta ayrı ayrı tutulması. | **3'ü 1 Arada Yönetim:** Skill'ler, MCP Server'lar (`mcp_config.json`) ve Slash Komutlar (`commands/`) tek panelden yönetilir. |
| **Güvenlik Riskleri:** Zararlı kod, base64 payload'ları veya API anahtarı sızdıran güvensiz skill'ler. | **AST & LLM Güvenlik Analizi:** 0-100 Güvenlik Skoru ile tehditler canlı taranır ve uyarı verilir. |
| **Elle Düzenleme Eziyeti:** SKILL.md dosyalarını sürekli terminalden açıp kopyalamak. | **Arayüz İçi Canlı Kod Editörü & Diff Preview:** Markdown içeriklerini canlı önizleme ve yan yana fark görünümü ile düzenleme. |
| **Test Alanının Olmaması:** Skill'in AI asistanına verildiğinde nasıl yanıt vereceğinin bilinmemesi. | **Etkileşimli LLM Sandbox Tester:** Ajan yanıtlarını ajana yüklemeden önce GUI üzerinde simüle edebilme. |
| **Ağır Kurulumlar:** Rakiplerin 2GB Rust derleyicileri veya Python/SQLite bağımlılıkları istemesi. | **Işık Hızında & Sıfır Bağımlılık:** Saf Node.js + React 18 SPA. **1 saniyenin altında** açılır (`./gui.sh`). |

---

## 🤖 19 Desteklenen AI Aracı

```text
┌─────────────────────────────────────────────────────────────────────────────────┐
│                           19 DESTEKLENEN AI ARACI                               │
├─────────────────────────────────────────────────────────────────────────────────┤
│  1. Google Antigravity    6. Cline               11. OpenCode     16. Pi Agent  │
│  2. Claude Code           7. Roo Code            12. Zed Editor   17. Hermes    │
│  3. Cursor IDE            8. Continue            13. Augment      18. OpenClaw  │
│  4. OpenAI Codex          9. GitHub Copilot      14. Amp          19. Generic   │
│  5. Windsurf             10. Aider               15. Gemini CLI       Agents    │
└─────────────────────────────────────────────────────────────────────────────────┘
```

---

## 🚀 Hızlı Başlangıç

### 1. Klonlayın
```bash
git clone --recursive https://github.com/imyigo/awesome-ai-agent-skills-manager.git ~/.gemini/claude-antigravity-best-skills
```

### 2. Kontrol Panelini Başlatın
```bash
cd ~/.gemini/claude-antigravity-best-skills
chmod +x gui.sh
./gui.sh
```

> **Web Kontrol Paneli `http://localhost:3777` adresinde otomatik açılır!**

---

## 🤖 Otomasyon CLI (`skills --json`)

AI ajanları ve CI/CD süreçleri için scriptable komut satırı kullanımı:
```bash
node gui/cli.js status --json
node gui/cli.js list --json
node gui/cli.js audit --json
```

---

## 📜 Lisans

MIT Lisansı. Yüksek performanslı yapay zeka ajan süreçleri için tasarlandı.
