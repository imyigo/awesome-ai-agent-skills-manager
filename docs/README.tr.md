# ⚡ Claude & Antigravity Best Skills Framework

> **Claude Code ve Google Antigravity için ultra optimize edilmiş, 3 katmanlı modüler yetenek (skill) ve MCP altyapısı.** 10+ popüler açık kaynak skill'i çakışmasız, canlı Git submodule bağlantılı tek bir mimaride birleştirir.

---

## 🌟 Önemli Özellikler

* **🧠 Birleşik Süper-Skill (`unified-dev`):** Topluluğun en iyi 10+ skill'ini çakışmasız ve tek bir çatı altında toplar.
* **⚡ %60-70 Token Tasarrufu:** 3 Katmanlı **Lazy-Load** mimarisi kullanır. Yalnızca ilgili alan referanslarını (Web, Mobil, Güvenlik vb.) ihtiyaç anında yükler.
* **🔄 Canlı Otomatik Senkronizasyon:** **Git Submodules** sayesinde orijinal repolara canlı bağlıdır. Tek bir komutla tüm skill'leri günceller!
* **🛡️ %100 Güvenli & Public Uyumlu:** Gizli veri veya sert kodlanmış şifre içermez. Paylaşıma tamamen hazırdır.
* **🖥️ Çoklu Cihaz Senkronizasyonu:** Tüm bilgisayarlarınızda kolay kurulum sağlayan `setup.ps1` scripti.

---

## 🌳 Mimari & Token Ekonomisi

```
┌─────────────────────────────────────────────────────────┐
│  KATMAN 0: Çekirdek Kurallar (Her Zaman Aktif - Düşük Token)│
│  skills/unified-dev/SKILL.md                            │
│  └── references/01-core-behavior.md                     │
│       • Öz ve Kısa Yanıt Stili (Caveman protokolü)      │
│       • Karpathy Hallüsinasyon Engelleme Kuralları     │
│       • Dosya Bazlı Görev & Hafıza Planlaması           │
└─────────────────────────────────────────────────────────┘
              ↓ İhtiyaç Anında Yüklenir (Lazy-Load)
┌─────────────────────────────────────────────────────────┐
│  KATMAN 1: Alan Referansları (Sadece Gerektiğinde)       │
│  ├── references/02-web.md        (Web, UI/UX, WCAG 2.2)│
│  ├── references/03-mobile.md     (iOS, Android, macOS) │
│  ├── references/04-game.md       (Oyun Motorları, GDD) │
│  ├── references/05-security.md   (OWASP Top 10, STRIDE)│
│  ├── references/06-planning.md   (PRD, ADR, Sprint)    │
│  └── references/07-marketing.md  (ASO, CRO, Copywriting)│
└─────────────────────────────────────────────────────────┘
              ↓ Özel Komut Çalıştırıldığında
┌─────────────────────────────────────────────────────────┐
│  KATMAN 2: Harici Araçlar ve Servisler                  │
│  ├── tools/graphify-install.md   (Bilgi Grafiği)        │
│  └── tools/claude-mem-install.md (Kalıcı Hafıza)        │
└─────────────────────────────────────────────────────────┘
```

---

## 🔄 Orijinal Repolarla Canlı Senkronizasyon

Bu altyapı, `skills/originals/` klasörü altındaki açık kaynak repolara canlı Git Submodule bağıyla bağlıdır:

* [JuliusBrussee/caveman](https://github.com/JuliusBrussee/caveman) — Token tasarruflu iletişim stili
* [multica-ai/andrej-karpathy-skills](https://github.com/multica-ai/andrej-karpathy-skills) — Davranışsal güvenlik kuralları
* [OthmanAdi/planning-with-files](https://github.com/OthmanAdi/planning-with-files) — Dosya bazlı kalıcı planlama
* [plugin87/ux-ui-agent-skills](https://github.com/plugin87/ux-ui-agent-skills) — Kıdemli UI/UX & WCAG 2.2 standartları
* [coreyhaines31/marketingskills](https://github.com/coreyhaines31/marketingskills) — Pazarlama, ASO & CRO
* [Donchitos/Claude-Code-Game-Studios](https://github.com/Donchitos/Claude-Code-Game-Studios) — Oyun geliştirme stüdyo mimarisi
* [Graphify-Labs/graphify](https://github.com/Graphify-Labs/graphify) — Codebase bilgi grafiği oluşturucu
* [Egonex-AI/Understand-Anything](https://github.com/Egonex-AI/Understand-Anything) — Rehberli codebase turları
* [VoltAgent/awesome-agent-skills](https://github.com/VoltAgent/awesome-agent-skills) — 1000+ Ajan yetenek rehberi

---

## 🚀 Hızlı Kurulum (30 Saniye)

### 1. Submodule'ler İle Klonlayın
```bash
git clone --recursive https://github.com/imyigo/claude-antigravity-skills.git ~/.gemini/claude-antigravity-best-skills
```

### 2. Kurulum Scriptini Çalıştırın

Kurulum ve güncelleme scriptleri **`control/`** klasöründedir.

**Windows (PowerShell):**
```powershell
cd ~/.gemini/claude-antigravity-best-skills
.\control\kurulum-windows.ps1
```

**macOS / Linux (Bash/Zsh):**
```bash
cd ~/.gemini/claude-antigravity-best-skills
chmod +x control/*.sh
./control/kurulum-mac-linux.sh
```

### 3. Tek Tıkla Güncelleme

**Windows:** `.\control\guncelle-windows.ps1`
**macOS / Linux:** `./control/guncelle-mac-linux.sh`

---

## 📜 Lisans

Bu proje [MIT](LICENSE) lisanslıdır.
