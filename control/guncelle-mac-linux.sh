#!/usr/bin/env bash
# macOS / Linux Tek Tıkla Güncelleme Scripti (control/guncelle-mac-linux.sh)

set -e

CONTROL_DIR="$(cd "$(dirname "$0")" && pwd)"
SYNC_DIR="$(cd "$CONTROL_DIR/.." && pwd)"

echo "🔄 Orijinal Skill Repoları Güncelleniyor..."
cd "$SYNC_DIR"

# Submodule'leri canlı upstream kaynaklarından güncelle
git submodule update --remote --merge

echo ""
echo "✅ Tüm orijinal skill'ler başarıyla güncellendi!"
echo ""
