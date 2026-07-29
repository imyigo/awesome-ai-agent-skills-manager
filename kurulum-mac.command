#!/usr/bin/env bash
DIR="$(cd "$(dirname "$0")" && pwd)"
echo "macOS Kurulumu Başlatılıyor..."
bash "$DIR/kurulum-mac-linux.sh"
read -p "Devam etmek için Enter'a basın..."
