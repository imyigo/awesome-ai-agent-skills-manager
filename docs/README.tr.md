<p align="center">
  <img src="https://img.shields.io/badge/Brain_Manager-v2.5-5B5BD6?style=for-the-badge&logo=react&logoColor=white" />
  <img src="https://img.shields.io/badge/Yapay_Zeka_Sağlayıcı-19_Agent-00C853?style=for-the-badge&logo=openai&logoColor=white" />
  <img src="https://img.shields.io/badge/Kurulum-90_Saniye-FF6D00?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Lisans-MIT-blue?style=for-the-badge" />
</p>

<h1 align="center">🧠 Awesome Universal Agent Brain Manager</h1>
<p align="center"><b>Tüm AI kodlama ajanlarını tek panelden yönet — Yetenekler, MCP Sunucular ve Presetler, hepsi senkronize.</b></p>

---

<p align="center">
  🌍 <b>Dil Seçin</b><br><br>
  <a href="../README.md"><b>🇬🇧 English</b></a> &nbsp;•&nbsp;
  <a href="README.tr.md"><b>🇹🇷 Türkçe</b></a> &nbsp;•&nbsp;
  <a href="README.zh.md"><b>🇨🇳 中文</b></a> &nbsp;•&nbsp;
  <a href="README.ja.md"><b>🇯🇵 日本語</b></a> &nbsp;•&nbsp;
  <a href="README.de.md"><b>🇩🇪 Deutsch</b></a> &nbsp;•&nbsp;
  <a href="README.es.md"><b>🇪🇸 Español</b></a>
</p>

---

## 😤 Her AI Geliştiricinin Yaşadığı Problem

**Claude Code**, **Cursor**, **Windsurf**, **Copilot** ve daha fazlasını kullanıyorsun.  
Her araç kendi `SKILL.md`, `rules/`, `mcp_config.json`, komut klasörüne sahip.

**Sonuç ne mi?**

```
❌  Claude'da skill güncelliyorsun → Cursor haberi yok
❌  MCP sunucu ekliyorsun → 5 araçta ayrı ayrı yapılandırmak zorundasın
❌  Yeni skill reposu kuruyorsun → her ajanın klasörüne manuel kopyalıyorsun
❌  Proje değiştiriyorsun → tüm workflow presetlerin kayboldu
❌  Takıma yeni biri katıldı → "configler nerede?" 3 saatlik onboarding
```

**Yazılım yazmak yerine config yönetiyorsun.**

---

## ✅ Çözüm: Tek Beyin, Tüm Ajanlar

```
┌─────────────────────────────────────────────────────────────────┐
│               🧠 AGENT BRAIN MANAGER                            │
│                                                                 │
│  📁 repo/skills/          ←  buraya git clone yap              │
│  📋 MCP Sunucular         ←  bir kez konfigüre et, her yerde   │
│  ⚡ Workflow Presetleri   ←  tek tıkla bağlam değiştir          │
│  🔴 Canlı SSE Motoru      ←  tüm ajanlara gerçek zamanlı push  │
│                                                                 │
│  Dashboard → http://localhost:3777                              │
└────────────────┬────────────────────────────────────────────────┘
                 │  Otomatik senkronizasyon (Kopyalama Modu)
     ┌───────────┼───────────────────────────────┐
     ▼           ▼           ▼           ▼        ▼
  Claude      Cursor     Windsurf    Copilot   + 15 daha
  Code        IDE        IDE         Chat      ajan...
  ✅ Skill    ✅ Kural   ✅ Skill    ✅ Skill   ✅ Hepsi senkron
  ✅ MCP      ✅ MCP     ✅ MCP      ✅ MCP
  ✅ Komutlar ✅ Komutlar ✅ Komutlar ✅ Komutlar
```

**Bir kez güncelle → 19 ajana anında yayılır.**

---

## ⚡ 90 Saniyede Kurulum

> **Gereksinimler:** Node.js 18+ ve Git. Hepsi bu.

```bash
# 1. Klonla
git clone https://github.com/imyigo/awesome-universal-agent-brain-manager.git
cd awesome-universal-agent-brain-manager

# 2. Çalıştır
node gui/gui_server.js

# 3. Tarayıcı → http://localhost:3777
```

**Docker yok. Python yok. Build adımı yok. Düzenlenecek config dosyası yok.**  
Dashboard'u aç → AI araçlarının yanındaki "Bağla"ya tıkla → bitti. ✅

---

## 🗺️ Nasıl Çalışır? (Tam Mimari)

```
BİLGİSAYARIN
═══════════════════════════════════════════════════════════════════

  ┌─────────────────────────────────────────────────────────────┐
  │  📦 SKİLL REPOLARI  (repo/skills/)                          │
  │                                                             │
  │  ├── caveman/          ← Token sıkıştırma                   │
  │  ├── ui-ux-pro-max/    ← Tasarım sistemi kuralları          │
  │  ├── cybersecurity/    ← OWASP + tehdit modelleme           │
  │  └── kendi-skillin/    ← Kendi skil repon                   │
  └──────────────────┬──────────────────────────────────────────┘
                     │
                     ▼
  ┌─────────────────────────────────────────────────────────────┐
  │  🧠 BRAIN MANAGER  (gui_server.js + SQLite)                 │
  │                                                             │
  │  • Web Dashboard    http://localhost:3777                   │
  │  • Canlı Terminal   Her git/kurulum işlemini akıyor         │
  │  • SQLite DB        Tüm presetler, MCP, ayarlar             │
  │  • REST API         /api/skills /api/mcp /api/presets       │
  └──────────────────┬──────────────────────────────────────────┘
                     │  Dosya kopyalama / senkronizasyon
     ┌───────────────┼──────────────────────────────┐
     │               │               │              │
     ▼               ▼               ▼              ▼
  ~/.claude/      ~/.cursor/     ~/.gemini/    ~/.continue/
  skills/         rules/         antigravity/  skills/
  commands/       commands/      skills/
  mcp.json        .cursorrules   commands/
                                 mcp.json
  ✅ Claude     ✅ Cursor      ✅ Antigravity  ✅ + 15 daha
```

---

## 🎯 Bu Araç Kimin İçin?

| Kişi | Sorun | Nasıl Çözüyor |
|------|-------|--------------|
| **Solo Geliştirici** | 3+ AI araçta skill configlerini takip etmek | Tek dashboard, hepsi senkron |
| **Dev Takımı** | Yeni üye onboarding saatler alıyor | SQLite yedek export → import → 60s'de her şey geri |
| **AI Güç Kullanıcısı** | Frontend / güvenlik / veri işi arasında bağlam değiştirmek | Tek tık Workflow Presetleri |
| **Prompt Mühendisi** | Skilleri ajanlara dağıtmadan test etmek | Yerleşik LLM Sandbox Tester |

---

## 📋 Sistem Gereksinimleri

| Araç | Gerekli | Not |
|------|---------|-----|
| **Node.js** | ✅ Evet | v18 veya üzeri |
| **Git** | ✅ Evet | Skill repo klonlamak için |
| **Docker CLI** | ❌ Opsiyonel | Sadece Core Engine daemonları için |
| **Python** | ❌ Opsiyonel | Bazı skilleler için |
| **Tarayıcı** | ✅ Evet | Chrome, Firefox, Edge |

> 💡 **Gereksinim kontrolü:** Uygulamayı aç → Ayarlar → "Sistem Gereksinimleri" paneli tüm araçların anlık durumunu gösterir.

---

## 🛠️ Öne Çıkan Özellikler

- **📦 Skill Repo Yöneticisi** — URL ile GitHub repo kur, otomatik tüm ajanlara kopyala
- **🛍️ Başlangıç Paketleri** — Hazır çoklu repo kitleri (Full-Stack, Güvenlik, Kreatif, AI Bellek...)
- **🔌 MCP Sunucu Yöneticisi** — Stdio ve HTTP/SSE sunucular, API key yönetimi
- **⚡ Workflow Presetleri** — Bağlamınıza göre tek tıkla skill seti değiştirme
- **🔴 Canlı Terminal** — Her işlem satır satır terminale akıyor
- **💾 SQLite Yedek/Geri Yükle** — Tüm sistemi tek JSON dosyasına export et
- **🛡️ Güvenlik Tarayıcı** — Skill dosyalarında tehlikeli pattern tespiti

---

## 📜 Lisans

MIT — Kişisel ve ticari kullanım için ücretsiz.

---

<p align="center">
  <b>⭐ AI ajan config yönetiminde zaman kazanıyorsan repoyu yıldızla!</b><br><br>
  <a href="../README.md">🇬🇧 English</a> •
  <a href="README.tr.md">🇹🇷 Türkçe</a> •
  <a href="README.zh.md">🇨🇳 中文</a> •
  <a href="README.ja.md">🇯🇵 日本語</a> •
  <a href="README.de.md">🇩🇪 Deutsch</a> •
  <a href="README.es.md">🇪🇸 Español</a>
</p>
