# guncelle-windows.ps1 — Skill'leri Canli Upstream Repolardan Guncelleme Scripti

$ErrorActionPreference = "Stop"
$ScriptDir = $PSScriptRoot
if (-not $ScriptDir) {
    $ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Definition
}

Write-Host ""
Write-Host "Orijinal Skill Repolari Guncelleniyor..." -ForegroundColor Cyan
Write-Host "=========================================" -ForegroundColor Cyan
Write-Host ""

if (Test-Path "$ScriptDir\.git") {
    Push-Location $ScriptDir
    git submodule update --remote --merge
    Pop-Location
    Write-Host ""
    Write-Host "Tum orijinal skill'ler basariyla guncellendi!" -ForegroundColor Green
} else {
    Write-Host "Git reposu bulunamadi!" -ForegroundColor Red
}

Write-Host ""
