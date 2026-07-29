#!/usr/bin/env bash
# Evrensel Multi-AI Görsel Arayüz Başlatıcı (gui/gui.sh)

GUI_DIR="$(cd "$(dirname "$0")" && pwd)"
SYNC_DIR="$(cd "$GUI_DIR/.." && pwd)"

echo "⚡ Görsel Web Dashboard Başlatılıyor..."
cd "$SYNC_DIR"
node "$GUI_DIR/gui_server.js"
