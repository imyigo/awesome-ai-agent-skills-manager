#!/usr/bin/env bash
# Evrensel Multi-AI Görsel Arayüz Başlatıcı (gui/gui.sh)

GUI_DIR="$(cd "$(dirname "$0")" && pwd)"
SYNC_DIR="$(cd "$GUI_DIR/.." && pwd)"

echo ""
echo "⚡ Multi-AI Görsel Web Dashboard Başlatılıyor..."
echo "===================================================="
cd "$SYNC_DIR"

if command -v node >/dev/null 2>&1; then
    node "$GUI_DIR/gui_server.js"
else
    echo "❌ Hata: Node.js bilgisayarınızda bulunamadı!"
    echo "   Lütfen Node.js (https://nodejs.org) yükleyin veya control.sh kullanın."
fi

echo ""
read -p "Sunucuyu kapatmak için Enter'a basın..." dummy
