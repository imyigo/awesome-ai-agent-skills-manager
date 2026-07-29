#!/usr/bin/env bash
# Evrensel Multi-AI Skill & Framework Hub Görsel Başlatıcı (gui.sh)
# Windows, macOS ve Linux desteklidir.

CONTROL_DIR="$(cd "$(dirname "$0")" && pwd)"

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
    CURSOR_DIR="$USERPROFILE/.cursor"
    CODEX_DIR="$USERPROFILE/.codex"
else
    CONFIG_DIR="$HOME/.gemini/config"
    ANTIGRAVITY_DIR="$HOME/.gemini/antigravity"
    CLAUDE_DIR="$HOME/.claude"
    CURSOR_DIR="$HOME/.cursor"
    CODEX_DIR="$HOME/.codex"
fi

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

# Auto install mode called from Web GUI button
if [ "$1" = "--auto-install" ]; then
    echo "🚀 Web GUI Tarafından Otomatik Kurulum Yapılıyor..."
    mkdir -p "$CONFIG_DIR" "$ANTIGRAVITY_DIR" "$CLAUDE_DIR" "$CURSOR_DIR" "$CODEX_DIR"

    if [ -f "$CONTROL_DIR/repo/mcp/mcp_config.json" ]; then
        create_link "$CONTROL_DIR/repo/mcp/mcp_config.json" "$CONFIG_DIR/mcp_config.json" "false"
    fi

    create_link "$CONTROL_DIR/repo/skills" "$ANTIGRAVITY_DIR/skills" "true"
    if [ -d "$CONTROL_DIR/repo/commands" ]; then create_link "$CONTROL_DIR/repo/commands" "$ANTIGRAVITY_DIR/commands" "true"; fi

    create_link "$CONTROL_DIR/repo/skills" "$CLAUDE_DIR/skills" "true"
    if [ -d "$CONTROL_DIR/repo/commands" ]; then create_link "$CONTROL_DIR/repo/commands" "$CLAUDE_DIR/commands" "true"; fi

    create_link "$CONTROL_DIR/repo/skills" "$CURSOR_DIR/skills" "true"
    if [ -d "$CONTROL_DIR/repo/commands" ]; then create_link "$CONTROL_DIR/repo/commands" "$CURSOR_DIR/commands" "true"; fi

    create_link "$CONTROL_DIR/repo/skills" "$CODEX_DIR/skills" "true"
    if [ -d "$CONTROL_DIR/repo/commands" ]; then create_link "$CONTROL_DIR/repo/commands" "$CODEX_DIR/commands" "true"; fi

    echo "✅ Kurulum Başarıyla Tamamlandı! Tüm AI araçları bağlandı."
    exit 0
fi

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

# Port 3777'de çalışan eski sunucuyu öldür
if [ "$OS_TYPE" = "windows" ]; then
    # Windows: netstat ile 3777 portunu kullanan process'i bul ve öldür
    PID=$(cmd //c "netstat -ano | findstr :3777" 2>/dev/null | awk '{print $NF}' | head -1)
    if [ -n "$PID" ] && [ "$PID" != "0" ]; then
        cmd //c "taskkill /PID $PID /F" 2>/dev/null || true
        echo "  ♻️  Eski sunucu (PID: $PID) kapatıldı."
    fi
else
    # Unix/macOS
    PID=$(lsof -ti:3777 2>/dev/null)
    if [ -n "$PID" ]; then
        kill -9 "$PID" 2>/dev/null || true
        echo "  ♻️  Eski sunucu (PID: $PID) kapatıldı."
    fi
fi

if command -v node >/dev/null 2>&1; then
    node "$CONTROL_DIR/gui/gui_server.js"
else
    echo "❌ Hata: Node.js bilgisayarınızda bulunamadı!"
    echo "   Lütfen Node.js (https://nodejs.org) yükleyin."
    read -p "Devam etmek için Enter'a basın..." dummy
fi
