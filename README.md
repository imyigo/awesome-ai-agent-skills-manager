# claude-antigravity-best-skills

Google Antigravity & Claude için hazırlanmış, **token optimizasyonlu (lazy-load) ve modüler** geliştirici yetenekleri (skills) ve MCP yapılandırma deposu.

---

## 🌳 Mimari & Token Hiyerarşisi

Bu repodaki skill yapısı gereksiz token tüketimini önlemek için 3 katmanlı bir ağaç yapısıyla çalışır:

```
┌─────────────────────────────────────────────────────────┐
│  KATMAN 0: Çekirdek Kurallar (Her Zaman Aktif)           │
│  skills/unified-dev/SKILL.md                            │
│  └── references/01-core-behavior.md                     │
│       • Caveman İletişim Protokolü (Öz/Kısa yanıtlar)  │
│       • Karpathy Guardrail'ları (Varsayımları sor)      │
│       • File-Based Planning (Dosya bazlı hafıza)        │
└─────────────────────────────────────────────────────────┘
              ↓ İhtiyaca göre yönlendirir (Lazy-Load)
┌─────────────────────────────────────────────────────────┐
│  KATMAN 1: Alan Referansları (Sadece İlgili Görevde)     │
│  ├── references/02-web.md        (Web, UI/UX, WCAG 2.2)│
│  ├── references/03-mobile.md     (iOS, Android, macOS) │
│  ├── references/04-game.md       (Oyun Mimarısı, GDD)  │
│  ├── references/05-security.md   (OWASP, STRIDE)       │
│  ├── references/06-planning.md   (PRD, ADR, Sprint)    │
│  └── references/07-marketing.md  (ASO, CRO, Copy)      │
└─────────────────────────────────────────────────────────┘
              ↓ Sadece komut ile çağrılır
┌─────────────────────────────────────────────────────────┐
│  KATMAN 2: Harici Araçlar (CLI/Daemon)                  │
│  ├── tools/graphify-install.md   (Bilgi Grafiği)        │
│  └── tools/claude-mem-install.md (Kalıcı Hafıza)        │
└─────────────────────────────────────────────────────────┘
```

---

## 📁 Dosya Yapısı

```
claude-antigravity-best-skills/
├── mcp_config.json              # MCP sunucu tanımları (Wix, GitHub)
├── setup.ps1                    # Otomatik kurulum ve junction bağlama scripti
├── skills/
│   └── unified-dev/             # Ana modüler geliştirici skill seti
│       ├── SKILL.md             # Tetikleyici + Yönlendirici
│       └── references/          # Domain bazlı referanslar (Lazy Load)
├── tools/                       # CLI araçlarının kurulum kılavuzları
└── sidecars/                    # Sidecar tanımları
```

---

## 🚀 Yeni Bilgisayarda Kurulum

### 1. Repo'yu klonla
```powershell
git clone https://github.com/imyigo/claude-antigravity-skills.git `
  C:\Users\<KULLANICI_ADI>\claude-antigravity-best-skills
```

### 2. Kurulum Scriptini Çalıştır
```powershell
cd C:\Users\<KULLANICI_ADI>\claude-antigravity-best-skills
.\setup.ps1
```
*Script otomatik olarak `mcp_config.json` hardlink'ini, `skills/` junction bağını ve git `post-merge` hook'unu kurar.*

---

## 🔄 Güncelleme Yapmak

Tüm değişiklikleri ve geliştirmeleri almak için:
```powershell
cd C:\Users\<KULLANICI_ADI>\claude-antigravity-best-skills
git pull
```
*`post-merge` hook sayesinde `mcp_config.json` ve skill bağlantıları otomatik olarak güncellenir.*
