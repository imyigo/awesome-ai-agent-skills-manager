#!/usr/bin/env bash
# Evrensel Antigravity & Claude Code Kurulum Scripti (Windows / macOS / Linux)

set -e

SYNC_DIR="$(cd "$(dirname "$0")" && pwd)"

echo ""
echo "🚀 Antigravity & Claude Code Kurulumu Başlatılıyor..."
echo "===================================================="
echo "📂 Repo Dizini: $SYNC_DIR"
echo ""

# İşletim Sistemi Tespiti
OS_TYPE="unix"
case "$OSTYPE" in
  msys*|cygwin*|mingw*) OS_TYPE="windows" ;;
  darwin*)             OS_TYPE="macos" ;;
  linux*)              OS_TYPE="linux" ;;
esac

echo "🖥️ Tespit Edilen Sistem: $OS_TYPE"
echo ""

# Dizin tanımları
if [ "$OS_TYPE" = "windows" ]; then
    CONFIG_DIR="$USERPROFILE/.gemini/config"
    ANTIGRAVITY_DIR="$USERPROFILE/.gemini/antigravity"
    CLAUDE_DIR="$USERPROFILE/.claude"
else
    CONFIG_DIR="$HOME/.gemini/config"
    ANTIGRAVITY_DIR="$HOME/.gemini/antigravity"
    CLAUDE_DIR="$HOME/.claude"
fi

mkdir -p "$CONFIG_DIR"
mkdir -p "$ANTIGRAVITY_DIR"
mkdir -p "$CLAUDE_DIR"

# Linkleme Helper Fonksiyonu
create_link() {
    local src="$1"
    local dest="$2"
    local is_dir="$3"

    if [ "$OS_TYPE" = "windows" ]; then
        # Windows Junction / Hardlink
        local win_src="$(cygpath -w "$src" 2>/dev/null || echo "$src")"
        local win_dest="$(cygpath -w "$dest" 2>/dev/null || echo "$dest")"

        if [ "$is_dir" = "true" ]; then
            cmd //c "if exist \"$win_dest\" rmdir /s /q \"$win_dest\"" 2>/dev/null || true
            cmd //c "mklink /J \"$win_dest\" \"$win_src\"" 2>/dev/null || true
        else
            cmd //c "if exist \"$win_dest\" del /f /q \"$win_dest\"" 2>/dev/null || true
            cmd //c "mklink /H \"$win_dest\" \"$win_src\"" 2>/dev/null || true
        fi
    else
        # macOS / Linux Symlink
        rm -rf "$dest"
        ln -s "$src" "$dest"
    fi
}

echo "🔗 Baglantilar kuruluyor..."

# 1. mcp_config.json
if [ -f "$SYNC_DIR/mcp_config.json" ]; then
    create_link "$SYNC_DIR/mcp_config.json" "$CONFIG_DIR/mcp_config.json" "false"
    echo "   ✅ mcp_config.json baglandi"
fi

# 2. skills/ (Antigravity & Claude Code)
create_link "$SYNC_DIR/skills" "$ANTIGRAVITY_DIR/skills" "true"
create_link "$SYNC_DIR/skills" "$CLAUDE_DIR/skills" "true"
echo "   ✅ skills/ baglandi (Antigravity & Claude Code)"

# 3. commands/ (Antigravity & Claude Code)
if [ -d "$SYNC_DIR/commands" ]; then
    create_link "$SYNC_DIR/commands" "$ANTIGRAVITY_DIR/commands" "true"
    create_link "$SYNC_DIR/commands" "$CLAUDE_DIR/commands" "true"
    echo "   ✅ commands/ baglandi (Antigravity & Claude Code)"
fi

# 4. Git Submodules Güncelle
echo ""
echo "🔄 Git Submodule'ler kontrol ediliyor..."
if [ -d "$SYNC_DIR/.git" ]; then
    cd "$SYNC_DIR"
    git submodule update --init --recursive 2>/dev/null || true
    echo "   ✅ Git submodule'ler guncellendi"
fi

# 5. Git post-merge hook
mkdir -p "$SYNC_DIR/.git/hooks"
cat << 'EOF' > "$SYNC_DIR/.git/hooks/post-merge"
#!/bin/sh
SYNC_DIR="$(git rev-parse --show-toplevel)"
CONFIG_DIR="$HOME/.gemini/config"
if [ -f "$SYNC_DIR/mcp_config.json" ]; then
    rm -f "$CONFIG_DIR/mcp_config.json"
    ln -s "$SYNC_DIR/mcp_config.json" "$CONFIG_DIR/mcp_config.json" 2>/dev/null || true
fi
EOF
chmod +x "$SYNC_DIR/.git/hooks/post-merge" 2>/dev/null || true

echo ""
echo "🎉 Kurulum tamamlandi! Antigravity ve Claude Code uygulamanizi yeniden baslatabilirsiniz."
echo ""
