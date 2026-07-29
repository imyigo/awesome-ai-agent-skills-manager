# ⚡ Evrensel Multi-AI Agent Yönetim Merkezi

<p align="center">
  <img src="https://img.shields.io/badge/Kontrol_Merkezi-v2.0-5B5BD6?style=for-the-badge&logo=react&logoColor=white" alt="Kontrol Merkezi" />
  <img src="https://img.shields.io/badge/AI_Providers-19_Ara%C3%A7_Aktif-00C853?style=for-the-badge&logo=python&logoColor=white" alt="19 AI Provider" />
  <img src="https://img.shields.io/badge/Mimari-S%C4%B1f%C4%B1r--Kopya_Junction-FF6D00?style=for-the-badge&logo=git&logoColor=white" alt="Junction Link Mimarisi" />
  <img src="https://img.shields.io/badge/Lisans-MIT-blue?style=for-the-badge" alt="MIT Lisansı" />
</p>

> **Yapay Zeka Kodlama Asistanları İçin Evrensel Kontrol Yüzeyi.**  
> **19 farklı AI aracında** (Claude Code, Google Antigravity, Cursor, Codex, Windsurf vb.) **Skill'leri, MCP Server'ları ve Slash Komutlarını** tek bir merkezden sıfır kopyalama Junction Link mimarisi, SSE Canlı Push Motoru ve AST Güvenlik Analizi ile yönetin.

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

## 🌟 Öne Çıkan Yetenekler

### 🔌 1. Gerçek Zamanlı SSE Push Motoru
Manuel yenilemeye gerek yoktur. Dosya sistemindeki veya durumdaki her değişiklik **Server-Sent Events (SSE)** ile canlı olarak tüm web istemcilerine aktarılır.

### 🔗 2. Sıfır-Kopya Junction Link Mimarisi
Merkezi skill ve komut klasörünü işletim sistemi seviyesinde sembolik bağlar (Junction/Symlink) ile 19 araca bağlar. Tek bir `git pull` ile tüm araçlar anında güncellenir.

### 🛠️ 3. 3'ü 1 Arada Yönetim Katmanı
**Skill'leri** (`SKILL.md`), **MCP Server'ları** (`mcp_config.json`) ve **Slash Komutları** (`commands/`) tek panelden yönetir ve senkronize eder.

### 🛡️ 4. AST Güvenlik ve Tehdit Taraması
Zararlı kod kalıplarını tarar ve puanlar:
* Dinamik kod çalıştırma (`eval`, `new Function`)
* Gizlenmiş içerikler (`atob`, `btoa`, base64)
* Sızdırılmış API anahtarları (`sk-`, `ghp_`)
* Yıkıcı sistem komutları (`rm -rf /`, `format c:`)

### ⚡ 5. Geliştirici Modları (Presets)
Tek tıkla özelleştirilmiş skill gruplarını aktifleştirme ve kendi özel modlarınızı oluşturma.

### 🧪 6. Etkileşimli LLM Sandbox Tester
Skill'leri canlı AI ajanına vermeden önce GUI üzerinden test edebilme ortamı.

### 🤖 7. Otomasyon CLI (`skills --json`)
AI ajanları ve CI/CD süreçleri için `--json` çıktılı komut satırı kullanımı.

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

## 📜 Lisans

MIT Lisansı. Yüksek performanslı yapay zeka ajan süreçleri için tasarlandı.
