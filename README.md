# antigravity-sync

Google Antigravity ve Claude MCP yapılandırmalarını ve Skills'leri bilgisayarlar arasında senkronize etmek için kullanılan repo.

## 📁 Yapı

```
antigravity-sync/
├── mcp_config.json        # MCP sunucu tanımları
├── skills/                # Özel Antigravity skills
│   └── <skill-adi>/
│       └── SKILL.md
├── sidecars/              # Sidecar tanımları
└── .env.example           # Örnek ortam değişkenleri (gerçek token yok!)
```

## 🚀 Yeni Bilgisayarda Kurulum

### 1. Repo'yu klonla
```powershell
git clone https://github.com/<KULLANICI>/antigravity-sync.git C:\Users\<AD>\antigravity-sync
```

### 2. Symlink'leri kur (Yönetici PowerShell)
```powershell
# Önce varsa eski dosyayı yedekle
Copy-Item "$env:USERPROFILE\.gemini\config\mcp_config.json" "$env:USERPROFILE\.gemini\config\mcp_config.json.bak" -ErrorAction SilentlyContinue

# MCP config symlink
New-Item -ItemType SymbolicLink `
  -Path "$env:USERPROFILE\.gemini\config\mcp_config.json" `
  -Target "$env:USERPROFILE\antigravity-sync\mcp_config.json" `
  -Force

# Skills symlink
New-Item -ItemType SymbolicLink `
  -Path "$env:USERPROFILE\.gemini\antigravity\skills" `
  -Target "$env:USERPROFILE\antigravity-sync\skills" `
  -Force
```

### 3. Ortam değişkenlerini ayarla
`.env.example` dosyasını referans alarak API token'larını Windows ortam değişkeni olarak ekle:
```powershell
[System.Environment]::SetEnvironmentVariable("GITHUB_TOKEN", "ghp_...", "User")
```

### 4. Antigravity'yi yeniden başlat
Ayarlar otomatik yüklenecektir.

## 🔄 Güncelleme

```powershell
cd C:\Users\<AD>\antigravity-sync
git pull origin main
```

## ⚠️ Güvenlik Notları

- `mcp_config.json` içine **asla** gerçek API token/şifre koymayın
- Token'lar için `${ENV_VAR_ADI}` formatını kullanın
- `.env` dosyaları `.gitignore`'da tanımlıdır
