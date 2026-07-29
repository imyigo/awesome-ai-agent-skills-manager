#!/usr/bin/env bash
# Evrensel Antigravity & Claude Code Guncelleme Scripti (Windows / macOS / Linux)

set -e

CONTROL_DIR="$(cd "$(dirname "$0")" && pwd)"
SYNC_DIR="$(cd "$CONTROL_DIR/.." && pwd)"

echo ""
echo "🔄 Orijinal Skill Repolari Guncelleniyor..."
echo "========================================="
echo ""

if [ -d "$SYNC_DIR/.git" ]; then
    cd "$SYNC_DIR"
    git submodule update --remote --merge
    echo ""
    echo "✅ Tum orijinal skill'ler basariyla guncellendi!"
else
    echo "❌ Git reposu bulunamadi!"
fi

echo ""
