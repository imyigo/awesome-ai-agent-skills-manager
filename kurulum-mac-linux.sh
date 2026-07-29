#!/usr/bin/env bash
# macOS / Linux Kurulum Scripti

set -e

SYNC_DIR="$(cd "$(dirname "$0")" && pwd)"
CONFIG_DIR="$HOME/.gemini/config"
SKILLS_DIR="$HOME/.gemini/antigravity/skills"

echo "🚀 macOS / Linux Kurulumu Başlatılıyor..."
echo "📂 Repo Dizini: $SYNC_DIR"

# 1. Gerekli Hedef Dizinleri Oluştur
mkdir -p "$CONFIG_DIR"
mkdir -p "$HOME/.gemini/antigravity"

# 2. mcp_config.json Symlink (Sembolik Bağ) Kur
echo "🔗 mcp_config.json symlink kuruluyor..."
if [ -L "$CONFIG_DIR/mcp_config.json" ] || [ -f "$CONFIG_DIR/mcp_config.json" ]; then
    rm -rf "$CONFIG_DIR/mcp_config.json"
fi
ln -s "$SYNC_DIR/mcp_config.json" "$CONFIG_DIR/mcp_config.json"
echo "   ✅ mcp_config.json symlink bağlandı"

# 3. skills/ ve commands/ Symlink Kur (Antigravity & Claude Code)
echo "🔗 Antigravity & Claude Code symlink'leri kuruluyor..."

# Antigravity
if [ -L "$SKILLS_DIR" ] || [ -d "$SKILLS_DIR" ]; then rm -rf "$SKILLS_DIR"; fi
ln -s "$SYNC_DIR/skills" "$SKILLS_DIR"

COMMANDS_DIR="$HOME/.gemini/antigravity/commands"
if [ -L "$COMMANDS_DIR" ] || [ -d "$COMMANDS_DIR" ]; then rm -rf "$COMMANDS_DIR"; fi
ln -s "$SYNC_DIR/commands" "$COMMANDS_DIR"

# Claude Code (~/.claude)
mkdir -p "$HOME/.claude"
if [ -L "$HOME/.claude/skills" ] || [ -d "$HOME/.claude/skills" ]; then rm -rf "$HOME/.claude/skills"; fi
ln -s "$SYNC_DIR/skills" "$HOME/.claude/skills"

if [ -L "$HOME/.claude/commands" ] || [ -d "$HOME/.claude/commands" ]; then rm -rf "$HOME/.claude/commands"; fi
ln -s "$SYNC_DIR/commands" "$HOME/.claude/commands"

echo "   ✅ Antigravity & Claude Code bağlantıları kuruldu"

# 4. Git Submodule'leri Başlat ve Güncelle
echo "🔄 Git Submodule'ler güncelleniyor..."
cd "$SYNC_DIR"
git submodule update --init --recursive

# 5. Git post-merge hook kurulumu
mkdir -p "$SYNC_DIR/.git/hooks"
cat << 'EOF' > "$SYNC_DIR/.git/hooks/post-merge"
#!/bin/sh
SYNC_DIR="$(git rev-parse --show-toplevel)"
CONFIG_DIR="$HOME/.gemini/config"
if [ -f "$SYNC_DIR/mcp_config.json" ]; then
    rm -f "$CONFIG_DIR/mcp_config.json"
    ln -s "$SYNC_DIR/mcp_config.json" "$CONFIG_DIR/mcp_config.json"
    echo "[post-merge] mcp_config.json symlink yenilendi."
fi
EOF
chmod +x "$SYNC_DIR/.git/hooks/post-merge"
echo "   ✅ Git post-merge hook kuruldu"

echo ""
echo "🎉 Kurulum tamamlandı! Antigravity veya Claude Code'u yeniden başlatın."
echo ""
echo "  Sonraki güncellemeler için:"
echo "  cd $SYNC_DIR && ./update-skills.sh"
echo ""
