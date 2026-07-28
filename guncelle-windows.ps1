<#
.SYNOPSIS
    Tek tıkla tüm orijinal skill repolarını canlı GitHub kaynaklarından günceller.
#>

Write-Host "🔄 Orijinal Skill Repoları Güncelleniyor..." -ForegroundColor Cyan

# 1. Submodule'leri en son sürümlerine çek
git submodule update --remote --merge

Write-Host ""
Write-Host "✅ Tüm orijinal skill'ler başarıyla güncellendi!" -ForegroundColor Green
Write-Host "📌 Güncellemeleri reponuza kaydetmek için: git commit -am 'chore: update submodules' && git push" -ForegroundColor Gray
