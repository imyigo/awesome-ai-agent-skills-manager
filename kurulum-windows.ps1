# setup.ps1 — Yeni bilgisayarda antigravity-sync kurulumu
# Kullanım: .\setup.ps1
# NOT: Normal PowerShell'de çalışır, yönetici gerekmez.

param(
    [string]$SyncDir = "$env:USERPROFILE\antigravity-sync"
)

Write-Host ""
Write-Host "🚀 Antigravity Sync Kurulum Scripti" -ForegroundColor Cyan
Write-Host "=====================================" -ForegroundColor Cyan
Write-Host ""

# 1. Gerekli dizinleri oluştur
Write-Host "📁 Dizinler kontrol ediliyor..." -ForegroundColor Yellow
New-Item -ItemType Directory -Path "$env:USERPROFILE\.gemini\config" -Force | Out-Null
New-Item -ItemType Directory -Path "$env:USERPROFILE\.gemini\antigravity" -Force | Out-Null
Write-Host "   ✅ Dizinler hazır" -ForegroundColor Green

# 2. mcp_config.json hardlink
Write-Host ""
Write-Host "🔗 MCP config bağlantısı kuruluyor..." -ForegroundColor Yellow
$mcpTarget = "$SyncDir\mcp_config.json"
$mcpLink   = "$env:USERPROFILE\.gemini\config\mcp_config.json"

if (Test-Path $mcpLink) {
    $backup = "$mcpLink.bak_$(Get-Date -Format 'yyyyMMdd_HHmmss')"
    Copy-Item $mcpLink $backup
    Write-Host "   ℹ️  Mevcut dosya yedeklendi: $backup" -ForegroundColor Gray
    Remove-Item $mcpLink -Force
}

cmd /c "mklink /H `"$mcpLink`" `"$mcpTarget`"" | Out-Null

if (Test-Path $mcpLink) {
    Write-Host "   ✅ mcp_config.json hardlink kuruldu" -ForegroundColor Green
} else {
    Write-Host "   ❌ mcp_config.json bağlantısı kurulamadı!" -ForegroundColor Red
}

# 3. skills/ junction
Write-Host ""
Write-Host "🔗 Skills klasörü bağlantısı kuruluyor..." -ForegroundColor Yellow
$skillsTarget = "$SyncDir\skills"
$skillsLink   = "$env:USERPROFILE\.gemini\antigravity\skills"

if (Test-Path $skillsLink) {
    Remove-Item $skillsLink -Recurse -Force
}

cmd /c "mklink /J `"$skillsLink`" `"$skillsTarget`"" | Out-Null

if (Test-Path $skillsLink) {
    Write-Host "   ✅ skills/ junction kuruldu" -ForegroundColor Green
} else {
    Write-Host "   ❌ skills/ bağlantısı kurulamadı!" -ForegroundColor Red
}

# 4. sidecars/ junction (isteğe bağlı)
$sidecarsTarget = "$SyncDir\sidecars"
$sidecarsLink   = "$env:USERPROFILE\.gemini\config\sidecars"

if (Test-Path $sidecarsLink) {
    Remove-Item $sidecarsLink -Recurse -Force
}

cmd /c "mklink /J `"$sidecarsLink`" `"$sidecarsTarget`"" | Out-Null

if (Test-Path $sidecarsLink) {
    Write-Host "   ✅ sidecars/ junction kuruldu" -ForegroundColor Green
}

# 4. commands/ junction bağını kur
Write-Host ""
Write-Host "🔗 commands/ junction kuruluyor..." -ForegroundColor Yellow
$cmdLink   = "$env:USERPROFILE\.gemini\antigravity\commands"
$cmdTarget = "$SyncDir\commands"

if (Test-Path $cmdLink) {
    cmd /c "rmdir `"$cmdLink`""
}
cmd /c "mklink /J `"$cmdLink`" `"$cmdTarget`""
Write-Host "   ✅ commands/ junction bağlandı" -ForegroundColor Green

# 5. Git post-merge hook (mcp_config.json hardlink yenileyici)
Write-Host ""
Write-Host "🔗 Git hook kuruluyor..." -ForegroundColor Yellow
$hookSrc  = "$SyncDir\.git\hooks\post-merge"
$hookDest = "$SyncDir\.git\hooks\post-merge"

if (-not (Test-Path "$SyncDir\.git\hooks")) {
    New-Item -ItemType Directory -Path "$SyncDir\.git\hooks" -Force | Out-Null
}

if (Test-Path $hookSrc) {
    Write-Host "   ✅ post-merge hook mevcut" -ForegroundColor Green
} else {
    Write-Host "   ⚠️  Hook bulunamadı, skip." -ForegroundColor Yellow
}

Write-Host ""
Write-Host "🎉 Kurulum tamamlandı! Antigravity'yi yeniden başlatın." -ForegroundColor Green
Write-Host ""
Write-Host "  Sonraki güncellemeler için:" -ForegroundColor Gray
Write-Host "  cd $SyncDir && git pull" -ForegroundColor Gray
Write-Host ""
