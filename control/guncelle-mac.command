#!/usr/bin/env bash
DIR="$(cd "$(dirname "$0")" && pwd)"
echo "macOS Güncellemesi Başlatılıyor..."
bash "$DIR/guncelle-mac-linux.sh"
read -p "Devam etmek için Enter'a basın..."
