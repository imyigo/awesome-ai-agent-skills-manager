#!/usr/bin/env bash
# macOS / Linux Tek Tıkla Güncelleme Scripti

set -e

SYNC_DIR="$(cd "$(dirname "$0")" && pwd)"
echo "🔄 Orijinal Skill Repoları Güncelleniyor..."
cd "$SYNC_DIR"

# Submodule'leri canlı upstream kaynaklarından güncelle
git submodule update --remote --merge

echo ""
echo "✅ Tüm orijinal skill'ler başarıyla güncellendi!"
echo "📌 Güncellemeleri reponuza kaydetmek için:"
echo "   git commit -am 'chore: update submodules' && git push"
echo ""
