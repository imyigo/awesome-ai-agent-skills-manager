#!/usr/bin/env bash
# Evrensel Multi-AI Skill & Framework Yöneticisi (control.sh)
# Otomatik Dil Tespiti (TR, EN, DE, RU, ZH, FR, PT) & Web GUI Entegrasyonu

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
    CURSOR_DIR="$USERPROFILE/.cursor"
    CODEX_DIR="$USERPROFILE/.codex"
else
    CONFIG_DIR="$HOME/.gemini/config"
    ANTIGRAVITY_DIR="$HOME/.gemini/antigravity"
    CLAUDE_DIR="$HOME/.claude"
    CURSOR_DIR="$HOME/.cursor"
    CODEX_DIR="$HOME/.codex"
fi

# Otomatik Dil Tespiti (System Locale)
SYS_LANG="${LANG:-${LC_ALL:-en}}"
USER_LANG="en"

case "$SYS_LANG" in
    tr*|TR*) USER_LANG="tr" ;;
    de*|DE*) USER_LANG="de" ;;
    ru*|RU*) USER_LANG="ru" ;;
    zh*|ZH*) USER_LANG="zh" ;;
    fr*|FR*) USER_LANG="fr" ;;
    pt*|PT*) USER_LANG="pt" ;;
    *)       USER_LANG="en" ;;
esac

# Parametre Kontrolü (--auto-install sunucu istekleri için)
if [ "$1" = "--auto-install" ]; then
    USER_LANG="en"
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
    if [ "$USER_LANG" = "tr" ]; then echo "🚀 Kurulum Başlatılıyor..."; else echo "🚀 Starting Installation..."; fi
    echo "--------------------------------------------------------"
    
    mkdir -p "$CONFIG_DIR"
    mkdir -p "$ANTIGRAVITY_DIR"
    mkdir -p "$CLAUDE_DIR"
    mkdir -p "$CURSOR_DIR"
    mkdir -p "$CODEX_DIR"

    # MCP config
    if [ -f "$SYNC_DIR/mcp_config.json" ]; then
        create_link "$SYNC_DIR/mcp_config.json" "$CONFIG_DIR/mcp_config.json" "false"
        echo "  ✅ mcp_config.json -> ($CONFIG_DIR)"
    fi

    # Antigravity, Claude, Cursor, Codex
    create_link "$SYNC_DIR/skills" "$ANTIGRAVITY_DIR/skills" "true"
    if [ -d "$SYNC_DIR/commands" ]; then create_link "$SYNC_DIR/commands" "$ANTIGRAVITY_DIR/commands" "true"; fi
    echo "  ✅ Google Antigravity -> ($ANTIGRAVITY_DIR)"

    create_link "$SYNC_DIR/skills" "$CLAUDE_DIR/skills" "true"
    if [ -d "$SYNC_DIR/commands" ]; then create_link "$SYNC_DIR/commands" "$CLAUDE_DIR/commands" "true"; fi
    echo "  ✅ Claude Code -> ($CLAUDE_DIR)"

    create_link "$SYNC_DIR/skills" "$CURSOR_DIR/skills" "true"
    if [ -d "$SYNC_DIR/commands" ]; then create_link "$SYNC_DIR/commands" "$CURSOR_DIR/commands" "true"; fi
    echo "  ✅ Cursor IDE -> ($CURSOR_DIR)"

    create_link "$SYNC_DIR/skills" "$CODEX_DIR/skills" "true"
    if [ -d "$SYNC_DIR/commands" ]; then create_link "$SYNC_DIR/commands" "$CODEX_DIR/commands" "true"; fi
    echo "  ✅ OpenAI Codex -> ($CODEX_DIR)"

    # Submodules
    if [ -d "$SYNC_DIR/.git" ]; then
        cd "$SYNC_DIR"
        git submodule update --init --recursive 2>/dev/null || true
        echo "  ✅ Git Submodules -> Ready"
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
    if [ "$USER_LANG" = "tr" ]; then echo "🎉 Kurulum Başarıyla Tamamlandı!"; else echo "🎉 Installation Completed Successfully!"; fi
}

# 2. Şeffaf Güncelleme Fonksiyonu
do_update() {
    echo ""
    if [ "$USER_LANG" = "tr" ]; then echo "🔄 Orijinal Skill Repoları Güncelleniyor..."; else echo "🔄 Updating Upstream Skill Repositories..."; fi
    echo "--------------------------------------------------------"
    
    if [ ! -d "$SYNC_DIR/.git" ]; then
        echo "❌ Git repo not found!"
        return
    fi

    cd "$SYNC_DIR"
    git submodule update --remote --merge
    echo ""
    if [ "$USER_LANG" = "tr" ]; then echo "✅ Tüm canlı skill repoları başarıyla güncellendi!"; else echo "✅ All live skill repos updated successfully!"; fi
}

# 3. Durum Kontrolü
do_status() {
    echo ""
    echo "🔍 System Status & AI Assistant Connections"
    echo "--------------------------------------------------------"
    echo "🖥️  OS System : $OS_TYPE"
    echo "🌐 Language  : $USER_LANG (Detected)"
    echo "📂 Sync Dir  : $SYNC_DIR"
    echo ""
    echo "🤖 AI Assistant Connections:"
    echo "  🌌 Google Antigravity -> $( [ -e "$ANTIGRAVITY_DIR/skills" ] && echo "✅ Connected" || echo "❌ Not Connected" )"
    echo "  🤖 Claude Code        -> $( [ -e "$CLAUDE_DIR/skills" ] && echo "✅ Connected" || echo "❌ Not Connected" )"
    echo "  🖱️ Cursor IDE        -> $( [ -e "$CURSOR_DIR/skills" ] && echo "✅ Connected" || echo "❌ Not Connected" )"
    echo "  📜 OpenAI Codex       -> $( [ -e "$CODEX_DIR/skills" ] && echo "✅ Connected" || echo "❌ Not Connected" )"
}

# 4. Canlı GitHub Skill Ekleme Fonksiyonu
do_add_skill() {
    echo ""
    read -p "GitHub Repo URL (e.g. https://github.com/user/repo.git): " repo_url
    if [ -z "$repo_url" ]; then return; fi

    local skill_name="$(basename "$repo_url" .git)"
    cd "$SYNC_DIR"
    mkdir -p "skills/originals"
    git submodule add -f "$repo_url" "skills/originals/$skill_name"
    git submodule update --init --recursive "skills/originals/$skill_name"
    echo "✅ [$skill_name] added and linked across all AI assistants!"
}

# 5. Görsel Web GUI Başlatıcı
do_web_gui() {
    echo ""
    echo "🎨 Web GUI Dashboard Başlatılıyor (http://localhost:3777)..."
    cd "$SYNC_DIR"
    node "$SYNC_DIR/gui/gui_server.js"
}

# 6. Dil Değiştirme Menüsü
do_language_select() {
    echo ""
    echo "🌐 Dil Seçimi / Select Language:"
    echo "  [1] English 🇬🇧"
    echo "  [2] Türkçe 🇹🇷"
    echo "  [3] Deutsch 🇩🇪"
    echo "  [4] Русский 🇷🇺"
    echo "  [5] 中文 🇨🇳"
    echo "  [6] Français 🇫🇷"
    echo "  [7] Português 🇵🇹"
    read -p "Selection [1-7]: " lang_choice

    case "$lang_choice" in
        1) USER_LANG="en" ;;
        2) USER_LANG="tr" ;;
        3) USER_LANG="de" ;;
        4) USER_LANG="ru" ;;
        5) USER_LANG="zh" ;;
        6) USER_LANG="fr" ;;
        7) USER_LANG="pt" ;;
    esac
    echo "✅ Language set to: $USER_LANG"
}

# Hızlı Otomatik Kurulumsaydı
if [ "$1" = "--auto-install" ]; then
    do_install
    exit 0
fi

# İnteraktif Menü Döngüsü
while true; do
    echo ""
    echo "========================================================"
    if [ "$USER_LANG" = "tr" ]; then
      echo "  ⚡ MULTI-AI SKILL HUB KONTROL PANELİ"
      echo "  (Antigravity • Claude Code • Cursor IDE • OpenAI Codex)"
      echo "========================================================"
      echo "  [1] 🚀 Kurulum Yap & Tüm AI'ları Bağla (Install)"
      echo "  [2] 🔄 Skill'leri Güncelle (Update Live Submodules)"
      echo "  [3] 🔍 AI Tespiti & Bağlantı Durumu (Status Check)"
      echo "  [4] ➕ Canlı Yeni GitHub Skill Reposu Ekle (Add Skill)"
      echo "  [5] 🎨 Görsel Web Dashboard'u Aç (http://localhost:3777)"
      echo "  [6] 🌐 Dil Değiştir / Change Language (Current: $USER_LANG)"
      echo "  [7] ❌ Çıkış (Exit)"
    else
      echo "  ⚡ MULTI-AI SKILL HUB CONTROL PANEL"
      echo "  (Antigravity • Claude Code • Cursor IDE • OpenAI Codex)"
      echo "========================================================"
      echo "  [1] 🚀 Install & Link All AIs"
      echo "  [2] 🔄 Update Live Skill Repositories"
      echo "  [3] 🔍 System & AI Assistant Connections (Status)"
      echo "  [4] ➕ Add Custom GitHub Skill Repo"
      echo "  [5] 🎨 Launch Visual Web Dashboard (http://localhost:3777)"
      echo "  [6] 🌐 Change Language (Current: $USER_LANG)"
      echo "  [7] ❌ Exit"
    fi
    echo "========================================================"
    read -p "Selection [1-7]: " choice

    case "$choice" in
        1) do_install; read -p "Press Enter to continue..." dummy ;;
        2) do_update; read -p "Press Enter to continue..." dummy ;;
        3) do_status; read -p "Press Enter to continue..." dummy ;;
        4) do_add_skill; read -p "Press Enter to continue..." dummy ;;
        5) do_web_gui ;;
        6) do_language_select ;;
        7) echo "Goodbye! 👋"; exit 0 ;;
        *) echo "Invalid choice!" ;;
    esac
done
