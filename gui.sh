#!/usr/bin/env bash
# Evrensel Multi-AI Görsel Arayüz Başlatıcı (gui.sh)

SYNC_DIR="$(cd "$(dirname "$0")" && pwd)"
cd "$SYNC_DIR"

echo "⚡ Görsel Web Dashboard Başlatılıyor..."
node gui_server.js
