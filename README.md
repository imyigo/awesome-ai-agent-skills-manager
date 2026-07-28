# claude-antigravity-best-skills

10+ topluluk skill reposundan damıtılmış, bilgisayarlar arası sync edilen
Google Antigravity & Claude yapılandırma deposu.

## 📁 Yapı

```
claude-antigravity-best-skills/
├── mcp_config.json              # MCP sunucu tanımları (Wix, GitHub)
├── skills/
│   └── unified-dev/             # Birleşik geliştirici skill seti
│       ├── SKILL.md             # Tetikleyici + core davranışlar
│       └── references/
│           ├── 01-core-behavior.md   # Token verimliliği + guardrails (HER ZAMAN)
│           ├── 02-web.md             # UI/UX, design systems, WCAG, CRO
│           ├── 03-mobile.md          # iOS/Swift, Android/Kotlin, macOS, Flutter
│           ├── 04-game.md            # GDD, engine seçimi, game feel
│           ├── 05-security.md        # OWASP Top 10, STRIDE, auth patterns
│           ├── 06-planning.md        # PRD, ADR, sprint, release checklist
│           └── 07-marketing.md       # Copywriting, ASO, growth loops
├── tools/
│   ├── claude-mem-install.md    # Kalıcı hafıza sistemi kurulum kılavuzu
│   └── graphify-install.md      # Bilgi grafiği aracı kurulum kılavuzu
└── sidecars/                    # Sidecar tanımları
```

## 🧠 Skill Kaynakları

| Skill Bileşeni | Kaynak Repo'lar |
|---|---|
| Token verimliliği + iletişim stili | [caveman](https://github.com/JuliusBrussee/caveman) |
| Davranış guardrail'ları | [andrej-karpathy-skills](https://github.com/multica-ai/andrej-karpathy-skills) |
| Rol tabanlı iş akışı | [gstack](https://github.com/garrytan/gstack) |
| Dosya bazlı planlama | [planning-with-files](https://github.com/OthmanAdi/planning-with-files) |
| UI/UX & design systems | [ux-ui-agent-skills](https://github.com/plugin87/ux-ui-agent-skills) |
| Copywriting & ASO | [marketingskills](https://github.com/coreyhaines31/marketingskills) |
| Oyun geliştirme | [Claude-Code-Game-Studios](https://github.com/Donchitos/Claude-Code-Game-Studios) |
| Güvenlik denetimi | [Anthropic-Cybersecurity-Skills](https://github.com/mukul975/Anthropic-Cybersecurity-Skills) |
| Hafıza altyapısı (araç) | [claude-mem](https://github.com/thedotmack/claude-mem) |
| Bilgi grafiği (araç) | [graphify](https://github.com/Graphify-Labs/graphify) |

## 🚀 Yeni Bilgisayarda Kurulum

### 1. Repo'yu klonla
```powershell
git clone https://github.com/<KULLANICI>/claude-antigravity-best-skills.git `
  C:\Users\<AD>\claude-antigravity-best-skills
```

### 2. Kurulum scriptini çalıştır (Normal PowerShell)
```powershell
cd C:\Users\<AD>\claude-antigravity-best-skills
.\setup.ps1
```

### 3. Ortam değişkenlerini ayarla
`.env.example` dosyasına bakarak token'larını ekle:
```powershell
[System.Environment]::SetEnvironmentVariable("GITHUB_TOKEN", "ghp_...", "User")
```

### 4. Araçları kur (isteğe bağlı)
```
# claude-mem için → tools/claude-mem-install.md
# graphify için  → tools/graphify-install.md
```

### 5. Antigravity'yi yeniden başlat

## 🔄 Güncelleme

```powershell
cd C:\Users\<AD>\claude-antigravity-best-skills
git pull origin main
```

## ⚠️ Güvenlik

- `mcp_config.json` içine **asla** gerçek token yazmayın
- Token'lar için `${ENV_VAR_ADI}` formatını kullanın
- `.env` dosyaları `.gitignore`'da
