#!/usr/bin/env bash
# Evrensel Multi-AI Skill & Framework Hub Görsel Başlatıcı (control.sh)
# Windows, macOS ve Linux desteklidir.

CONTROL_DIR="$(cd "$(dirname "$0")" && pwd)"

echo ""
echo "========================================================"
echo "  ⚡ MULTI-AI SKILL HUB GÖRSEL DASHBOARD BAŞLATILIYOR"
echo "  (Antigravity • Claude Code • Cursor IDE • OpenAI Codex)"
echo "========================================================"
echo "  🌐 Arayüz Adresi: http://localhost:3777"
echo "  💡 Kapatmak için bu terminal penceresinde Ctrl+C yapın."
echo "========================================================"
echo ""

cd "$CONTROL_DIR"

if command -v node >/dev/null 2>&1; then
    node "$CONTROL_DIR/gui/gui_server.js"
else
    echo "❌ Hata: Node.js bilgisayarınızda bulunamadı!"
    echo "   Lütfen Node.js (https://nodejs.org) yükleyin."
    read -p "Devam etmek için Enter'a basın..." dummy
fi
