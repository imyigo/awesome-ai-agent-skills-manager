# control/kurulum-windows.ps1 — Antigravity & Claude Code Kurulum Scripti

$ScriptDir = Split-Path -Parent $PSScriptRoot
if (-not $ScriptDir) {
    $ScriptDir = Split-Path -Parent (Split-Path -Parent $MyInvocation.MyCommand.Definition)
}

Write-Host ""
Write-Host "Antigravity ve Claude Code Kurulum Scripti" -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Repo Dizini: $ScriptDir" -ForegroundColor Gray
Write-Host ""

# 1. Gerekli dizinleri olustur
Write-Host "Dizinler kontrol ediliyor..." -ForegroundColor Yellow
$geminiConfig = "$env:USERPROFILE\.gemini\config"
$geminiApp    = "$env:USERPROFILE\.gemini\antigravity"
$claudeDir     = "$env:USERPROFILE\.claude"

New-Item -ItemType Directory -Path $geminiConfig -Force | Out-Null
New-Item -ItemType Directory -Path $geminiApp -Force | Out-Null
New-Item -ItemType Directory -Path $claudeDir -Force | Out-Null
Write-Host "  Dizinler hazir." -ForegroundColor Green

# 2. mcp_config.json hardlink
Write-Host ""
Write-Host "MCP config baglantisi kuruluyor..." -ForegroundColor Yellow
$mcpTarget = "$ScriptDir\mcp_config.json"
$mcpLink   = "$geminiConfig\mcp_config.json"

if (Test-Path $mcpLink) {
    Remove-Item $mcpLink -Force -ErrorAction SilentlyContinue
}

if (Test-Path $mcpTarget) {
    cmd /c "mklink /H `"$mcpLink`" `"$mcpTarget`"" 2>$null
    Write-Host "  mcp_config.json hardlink kuruldu." -ForegroundColor Green
}

# Helper function to remove link or folder safely
function Remove-LinkOrFolder($path) {
    if (Test-Path $path) {
        cmd /c "rmdir `"$path`"" 2>$null
        if (Test-Path $path) {
            Remove-Item $path -Recurse -Force -ErrorAction SilentlyContinue
        }
    }
}

# 3. skills/ junction
Write-Host ""
Write-Host "skills/ baglantisi kuruluyor..." -ForegroundColor Yellow
$skillsTarget = "$ScriptDir\skills"
$geminiSkills = "$geminiApp\skills"
$claudeSkills = "$claudeDir\skills"

Remove-LinkOrFolder $geminiSkills
cmd /c "mklink /J `"$geminiSkills`" `"$skillsTarget`"" 2>$null
Write-Host "  Antigravity skills/ junction kuruldu." -ForegroundColor Green

Remove-LinkOrFolder $claudeSkills
cmd /c "mklink /J `"$claudeSkills`" `"$skillsTarget`"" 2>$null
Write-Host "  Claude Code skills/ junction kuruldu." -ForegroundColor Green

# 4. commands/ junction
Write-Host ""
Write-Host "commands/ baglantisi kuruluyor..." -ForegroundColor Yellow
$commandsTarget = "$ScriptDir\commands"
$geminiCmds     = "$geminiApp\commands"
$claudeCmds     = "$claudeDir\commands"

if (Test-Path $commandsTarget) {
    Remove-LinkOrFolder $geminiCmds
    cmd /c "mklink /J `"$geminiCmds`" `"$commandsTarget`"" 2>$null
    Write-Host "  Antigravity commands/ junction kuruldu." -ForegroundColor Green

    Remove-LinkOrFolder $claudeCmds
    cmd /c "mklink /J `"$claudeCmds`" `"$commandsTarget`"" 2>$null
    Write-Host "  Claude Code commands/ junction kuruldu." -ForegroundColor Green
}

# 5. Git Submodules Guncelle
Write-Host ""
Write-Host "Git Submodule'ler kontrol ediliyor..." -ForegroundColor Yellow
if (Test-Path "$ScriptDir\.git") {
    Push-Location $ScriptDir
    git submodule update --init --recursive 2>$null
    Pop-Location
    Write-Host "  Git submodule'ler guncellendi." -ForegroundColor Green
}

Write-Host ""
Write-Host "Kurulum tamamlandi! Antigravity ve Claude Code uygulamanizi yeniden baslatabilirsiniz." -ForegroundColor Green
Write-Host ""
