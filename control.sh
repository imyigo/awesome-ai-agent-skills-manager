#!/usr/bin/env bash
# Evrensel Antigravity & Claude Code Kontrol Paneli (control.sh)
# Windows, macOS ve Linux desteklidir.

SYNC_DIR="$(cd "$(dirname "$0")" && pwd)"

# İşletim Sistemi Tespiti
OS_TYPE="unix"
case "$OSTYPE" in
  msys*|cygwin*|mingw*) OS_TYPE="windows" ;;
  darwin*)             OS_TYPE="macos" ;;
  linux*)              OS_TYPE="linux" ;;
esac

if [ "$OS_TYPE" = "windows" ]; then
    CONFIG_DIR="$USERPROFILE/.gemini/config"
    ANTIGRAVITY_DIR="$USERPROFILE/.gemini/antigravity"
    CLAUDE_DIR="$USERPROFILE/.claude"
else
    CONFIG_DIR="$HOME/.gemini/config"
    ANTIGRAVITY_DIR="$HOME/.gemini/antigravity"
    CLAUDE_DIR="$HOME/.claude"
fi

# Linkleme Helper Fonksiyonu
create_link() {
    local src="$1"
    local dest="$2"
    local is_dir="$3"

    if [ "$OS_TYPE" = "windows" ]; then
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
        rm -rf "$dest"
        ln -s "$src" "$dest"
    fi
}

# 1. Kurulum Fonksiyonu
do_install() {
    echo ""
    echo "🚀 Kurulum Baslatiliyor..."
    echo "----------------------------------------"
    
    mkdir -p "$CONFIG_DIR"
    mkdir -p "$ANTIGRAVITY_DIR"
    mkdir -p "$CLAUDE_DIR"

    # MCP config
    if [ -f "$SYNC_DIR/mcp_config.json" ]; then
        create_link "$SYNC_DIR/mcp_config.json" "$CONFIG_DIR/mcp_config.json" "false"
        echo "  ✅ mcp_config.json baglandi"
    fi

    # skills/
    create_link "$SYNC_DIR/skills" "$ANTIGRAVITY_DIR/skills" "true"
    create_link "$SYNC_DIR/skills" "$CLAUDE_DIR/skills" "true"
    echo "  ✅ skills/ baglandi (Antigravity & Claude Code)"

    # commands/
    if [ -d "$SYNC_DIR/commands" ]; then
        create_link "$SYNC_DIR/commands" "$ANTIGRAVITY_DIR/commands" "true"
        create_link "$SYNC_DIR/commands" "$CLAUDE_DIR/commands" "true"
        echo "  ✅ commands/ baglandi (Antigravity & Claude Code)"
    fi

    # Submodules
    if [ -d "$SYNC_DIR/.git" ]; then
        cd "$SYNC_DIR"
        git submodule update --init --recursive 2>/dev/null || true
        echo "  ✅ Git submodule'ler guncellendi"
    fi

    # Post-merge hook
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
    echo "🎉 Kurulum Basariyla Tamamlandi!"
}

# 2. Guncelleme Fonksiyonu
do_update() {
    echo ""
    echo "🔄 Orijinal Skill Repolari Guncelleniyor..."
    echo "----------------------------------------"
    
    if [ -d "$SYNC_DIR/.git" ]; then
        cd "$SYNC_DIR"
        git submodule update --remote --merge
        echo ""
        echo "✅ Tum canlı skill'ler basariyla guncellendi!"
    else
        echo "❌ Git reposu bulunamadi!"
    fi
}

# 3. Durum Kontrol Fonksiyonu
do_status() {
    echo ""
    echo "🔍 Sistem ve Baglanti Durumu"
    echo "----------------------------------------"
    echo "🖥️  Sistem: $OS_TYPE"
    echo "📂 Repo: $SYNC_DIR"
    echo ""
    echo "🔗 Baglanti Durumları:"
    
    if [ -e "$CONFIG_DIR/mcp_config.json" ]; then
        echo "  ✅ mcp_config.json -> Bagli"
    else
        echo "  ❌ mcp_config.json -> Eksik"
    fi

    if [ -e "$ANTIGRAVITY_DIR/skills" ]; then
        echo "  ✅ Antigravity skills/ -> Bagli"
    else
        echo "  ❌ Antigravity skills/ -> Eksik"
    fi

    if [ -e "$CLAUDE_DIR/skills" ]; then
        echo "  ✅ Claude Code skills/ -> Bagli"
    else
        echo "  ❌ Claude Code skills/ -> Eksik"
    fi

    if [ -e "$ANTIGRAVITY_DIR/commands" ]; then
        echo "  ✅ Antigravity commands/ -> Bagli"
    else
        echo "  ❌ Antigravity commands/ -> Eksik"
    fi

    if [ -e "$CLAUDE_DIR/commands" ]; then
        echo "  ✅ Claude Code commands/ -> Bagli"
    else
        echo "  ❌ Claude Code commands/ -> Eksik"
    fi
}

# İnteraktif Menü Döngüsü (Kapanmaz)
while true; do
    echo ""
    echo "===================================================="
    echo "  ⚡ CLAUDE & ANTIGRAVITY BEST SKILLS CONTROL PANEL"
    echo "===================================================="
    echo "  [1] 🚀 Kurulum Yap (Install)"
    echo "  [2] 🔄 Skill'leri Guncelle (Update Live Submodules)"
    echo "  [3] 🔍 Sistem & Baglanti Durumu (Status Check)"
    echo "  [4] ❌ Cikis (Exit)"
    echo "===================================================="
    read -p "Seciminiz [1-4]: " choice

    case "$choice" in
        1)
            do_install
            read -p "Devam etmek icin Enter'a basin..." dummy
            ;;
        2)
            do_update
            read -p "Devam etmek icin Enter'a basin..." dummy
            ;;
        3)
            do_status
            read -p "Devam etmek icin Enter'a basin..." dummy
            ;;
        4)
            echo "Cikis yapiliyor. Iyi calismalar! 👋"
            exit 0
            ;;
        *)
            echo "Gecersiz secim! Lutfen 1-4 arasinda bir secim yapin."
            ;;
    esac
done
