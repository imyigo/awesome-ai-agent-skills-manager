#!/usr/bin/env bash
# Evrensel Multi-AI Skill & Framework Yöneticisi (control.sh)
# Desteklenen AI'lar: Antigravity, Claude Code, Cursor IDE, OpenAI Codex
# Platformlar: Windows, macOS, Linux

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

# Varsayılan AI Hedefleri (Aktif/Pasif)
ENABLE_ANTIGRAVITY=true
ENABLE_CLAUDE=true
ENABLE_CURSOR=true
ENABLE_CODEX=true

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
    echo "🚀 Çoklu-AI Kurulumu Başlatılıyor..."
    echo "--------------------------------------------------------"
    
    mkdir -p "$CONFIG_DIR"

    # MCP config
    if [ -f "$SYNC_DIR/mcp_config.json" ]; then
        create_link "$SYNC_DIR/mcp_config.json" "$CONFIG_DIR/mcp_config.json" "false"
        echo "  ✅ mcp_config.json bağlandı ($CONFIG_DIR)"
    fi

    # 🌌 Antigravity
    if [ "$ENABLE_ANTIGRAVITY" = true ]; then
        mkdir -p "$ANTIGRAVITY_DIR"
        create_link "$SYNC_DIR/skills" "$ANTIGRAVITY_DIR/skills" "true"
        if [ -d "$SYNC_DIR/commands" ]; then create_link "$SYNC_DIR/commands" "$ANTIGRAVITY_DIR/commands" "true"; fi
        echo "  ✅ Google Antigravity -> Bağlandı ($ANTIGRAVITY_DIR)"
    fi

    # 🤖 Claude Code
    if [ "$ENABLE_CLAUDE" = true ]; then
        mkdir -p "$CLAUDE_DIR"
        create_link "$SYNC_DIR/skills" "$CLAUDE_DIR/skills" "true"
        if [ -d "$SYNC_DIR/commands" ]; then create_link "$SYNC_DIR/commands" "$CLAUDE_DIR/commands" "true"; fi
        echo "  ✅ Claude Code -> Bağlandı ($CLAUDE_DIR)"
    fi

    # 🖱️ Cursor IDE
    if [ "$ENABLE_CURSOR" = true ]; then
        mkdir -p "$CURSOR_DIR"
        create_link "$SYNC_DIR/skills" "$CURSOR_DIR/skills" "true"
        if [ -d "$SYNC_DIR/commands" ]; then create_link "$SYNC_DIR/commands" "$CURSOR_DIR/commands" "true"; fi
        echo "  ✅ Cursor IDE -> Bağlandı ($CURSOR_DIR)"
    fi

    # 📜 OpenAI Codex
    if [ "$ENABLE_CODEX" = true ]; then
        mkdir -p "$CODEX_DIR"
        create_link "$SYNC_DIR/skills" "$CODEX_DIR/skills" "true"
        if [ -d "$SYNC_DIR/commands" ]; then create_link "$SYNC_DIR/commands" "$CODEX_DIR/commands" "true"; fi
        echo "  ✅ OpenAI Codex -> Bağlandı ($CODEX_DIR)"
    fi

    # Submodules
    if [ -d "$SYNC_DIR/.git" ]; then
        cd "$SYNC_DIR"
        echo ""
        echo "  🔄 Orijinal Submodule Skill'leri hazirlaniyor..."
        git submodule update --init --recursive 2>/dev/null || true
        echo "  ✅ Tüm Submodule Skill'ler hazir"
    fi

    # Post-merge hook
    mkdir -p "$SYNC_DIR/.git/hooks"
    cat << 'EOF' > "$SYNC_DIR/.git/hooks/post-merge"
#!/bin/sh
SYNC_DIR="$(git rev-parse --show-to-level)"
CONFIG_DIR="$HOME/.gemini/config"
if [ -f "$SYNC_DIR/mcp_config.json" ]; then
    rm -f "$CONFIG_DIR/mcp_config.json"
    ln -s "$SYNC_DIR/mcp_config.json" "$CONFIG_DIR/mcp_config.json" 2>/dev/null || true
fi
EOF
    chmod +x "$SYNC_DIR/.git/hooks/post-merge" 2>/dev/null || true

    echo ""
    echo "🎉 Çoklu-AI Kurulumu Başarıyla Tamamlandı!"
}

# 2. Şeffaf ve GitHub Linkli Güncelleme Fonksiyonu
do_update() {
    echo ""
    echo "🔄 Orijinal Skill Repoları Taranıyor ve Güncelleniyor..."
    echo "--------------------------------------------------------"
    
    if [ ! -d "$SYNC_DIR/.git" ]; then
        echo "❌ Git reposu bulunamadı!"
        return
    fi

    cd "$SYNC_DIR"
    
    local total_count=0
    local updated_count=0
    local unchanged_count=0

    while read -r line; do
        if [ -z "$line" ]; then continue; fi
        
        local sub_path="$(echo "$line" | awk '{print $2}')"
        local skill_name="$(basename "$sub_path")"
        
        if [ -z "$sub_path" ] || [ ! -d "$SYNC_DIR/$sub_path" ]; then continue; fi
        
        total_count=$((total_count + 1))
        
        # Git Remote URL Al
        cd "$SYNC_DIR/$sub_path"
        local remote_url="$(git config --get remote.origin.url 2>/dev/null || echo "Bilinmiyor")"
        local old_commit="$(git rev-parse --short HEAD 2>/dev/null || echo "unknown")"
        
        # Güncelleme Yap
        cd "$SYNC_DIR"
        git submodule update --remote --merge "$sub_path" 2>/dev/null || true
        
        # Detayları Al
        cd "$SYNC_DIR/$sub_path"
        local new_commit="$(git rev-parse --short HEAD 2>/dev/null || echo "unknown")"
        local last_msg="$(git log -1 --pretty=format:"%s" 2>/dev/null || echo "")"
        local last_author="$(git log -1 --pretty=format:"%an" 2>/dev/null || echo "")"
        
        if [ "$old_commit" != "$new_commit" ]; then
            updated_count=$((updated_count + 1))
            echo "  ✨ [$skill_name] YENİ GÜNCELLEME ALINDI!"
            echo "     ├─ GitHub Repo : $remote_url"
            echo "     ├─ Commit      : $old_commit ➔ $new_commit ($last_author)"
            echo "     └─ Değişiklik  : $last_msg"
        else
            unchanged_count=$((unchanged_count + 1))
            echo "  ℹ️  [$skill_name] Zaten Güncel"
            echo "     ├─ GitHub Repo : $remote_url"
            echo "     └─ Commit      : $new_commit ($last_msg)"
        fi
        echo ""
        
    done < <(git submodule status 2>/dev/null || true)

    cd "$SYNC_DIR"

    echo "===================================================="
    echo "📊 SKILL GÜNCELLEME VE GİTHUB DETAY RAPORU"
    echo "===================================================="
    echo "  • Toplam İncelenen Skill Repo   : $total_count"
    echo "  • Yeni Güncelleme Alan Skill   : $updated_count"
    echo "  • Değişiklik Olmayan (Güncel)   : $unchanged_count"
    echo "===================================================="
}

# 3. AI Tespiti & Durum Kontrolü
do_status() {
    echo ""
    echo "🔍 AI Asistan Tespiti & Bağlantı Durumları"
    echo "--------------------------------------------------------"
    echo "🖥️  İşletim Sistemi : $OS_TYPE"
    echo "📂 Ana Repo Dizini  : $SYNC_DIR"
    echo ""
    echo "🤖 Bilgisayardaki AI Asistanları & Bağlantılar:"

    # Antigravity
    if [ -d "$ANTIGRAVITY_DIR" ]; then
        echo "  🌌 Google Antigravity -> [YÜKLÜ] (Skills: $( [ -e "$ANTIGRAVITY_DIR/skills" ] && echo "✅ Bağlı" || echo "❌ Bağsız" ))"
    else
        echo "  🌌 Google Antigravity -> [Tespit Edilmedi]"
    fi

    # Claude Code
    if [ -d "$CLAUDE_DIR" ]; then
        echo "  🤖 Claude Code        -> [YÜKLÜ] (Skills: $( [ -e "$CLAUDE_DIR/skills" ] && echo "✅ Bağlı" || echo "❌ Bağsız" ))"
    else
        echo "  🤖 Claude Code        -> [Tespit Edilmedi]"
    fi

    # Cursor
    if [ -d "$CURSOR_DIR" ]; then
        echo "  🖱️ Cursor IDE        -> [YÜKLÜ] (Skills: $( [ -e "$CURSOR_DIR/skills" ] && echo "✅ Bağlı" || echo "❌ Bağsız" ))"
    else
        echo "  🖱️ Cursor IDE        -> [Tespit Edilmedi]"
    fi

    # Codex
    if [ -d "$CODEX_DIR" ]; then
        echo "  📜 OpenAI Codex       -> [YÜKLÜ] (Skills: $( [ -e "$CODEX_DIR/skills" ] && echo "✅ Bağlı" || echo "❌ Bağsız" ))"
    else
        echo "  📜 OpenAI Codex       -> [Tespit Edilmedi]"
    fi

    echo ""
    echo "📦 Bağlı Canlı GitHub Skill Repoları:"
    if [ -d "$SYNC_DIR/.git" ]; then
        cd "$SYNC_DIR"
        git submodule status | while read -r line; do
            local sub_path="$(echo "$line" | awk '{print $2}')"
            local sub_commit="$(echo "$line" | awk '{print $1}')"
            local name="$(basename "$sub_path")"
            cd "$SYNC_DIR/$sub_path" 2>/dev/null || continue
            local url="$(git config --get remote.origin.url 2>/dev/null || echo "")"
            echo "  • $name -> $url (Commit: ${sub_commit:0:7})"
        done
    fi
}

# 4. Canlı GitHub Skill Ekleme Fonksiyonu
do_add_skill() {
    echo ""
    echo "➕ Yeni GitHub Skill Reposu Ekle"
    echo "--------------------------------------------------------"
    read -p "GitHub Repo URL (Örn: https://github.com/user/repo.git): " repo_url

    if [ -z "$repo_url" ]; then
        echo "❌ Geçersiz URL, iptal edildi."
        return
    fi

    local skill_name="$(basename "$repo_url" .git)"
    echo "📦 Skill Adı: $skill_name"
    
    cd "$SYNC_DIR"
    mkdir -p "skills/originals"
    
    echo "🔄 Submodule olarak ekleniyor..."
    git submodule add -f "$repo_url" "skills/originals/$skill_name"
    git submodule update --init --recursive "skills/originals/$skill_name"

    echo ""
    echo "✅ [$skill_name] repnuzu başarıyla eklendi ve tüm bağlı AI'lara yüklendi!"
}

# 5. AI Bağlantı Ayarları Menüsü
do_settings() {
    echo ""
    echo "⚙️ AI Bağlantı Hedef Ayarları"
    echo "--------------------------------------------------------"
    echo "  [1] Google Antigravity : $( [ "$ENABLE_ANTIGRAVITY" = true ] && echo "✅ AKTİF" || echo "❌ PASİF" )"
    echo "  [2] Claude Code        : $( [ "$ENABLE_CLAUDE" = true ] && echo "✅ AKTİF" || echo "❌ PASİF" )"
    echo "  [3] Cursor IDE         : $( [ "$ENABLE_CURSOR" = true ] && echo "✅ AKTİF" || echo "❌ PASİF" )"
    echo "  [4] OpenAI Codex        : $( [ "$ENABLE_CODEX" = true ] && echo "✅ AKTİF" || echo "❌ PASİF" )"
    echo "--------------------------------------------------------"
    read -p "Açmak/Kapatmak istediğiniz AI numarasını girin (Açmak/Kapatmak için 1-4, Çıkış için Enter): " toggle_choice

    case "$toggle_choice" in
        1) ENABLE_ANTIGRAVITY=$([ "$ENABLE_ANTIGRAVITY" = true ] && echo false || echo true) ;;
        2) ENABLE_CLAUDE=$([ "$ENABLE_CLAUDE" = true ] && echo false || echo true) ;;
        3) ENABLE_CURSOR=$([ "$ENABLE_CURSOR" = true ] && echo false || echo true) ;;
        4) ENABLE_CODEX=$([ "$ENABLE_CODEX" = true ] && echo false || echo true) ;;
    esac
}

# İnteraktif Menü Döngüsü
while true; do
    echo ""
    echo "========================================================"
    echo "  ⚡ MULTI-AI SKILL & FRAMEWORK HUB CONTROL PANEL"
    echo "  (Antigravity • Claude Code • Cursor IDE • OpenAI Codex)"
    echo "========================================================"
    echo "  [1] 🚀 Kurulum Yap & Tüm AI'ları Bağla (Install)"
    echo "  [2] 🔄 Skill'leri Güncelle & GitHub Raporu Al (Update)"
    echo "  [3] 🔍 AI Tespiti & Sistem Bağlantı Durumu (Status)"
    echo "  [4] ➕ Canlı Yeni GitHub Skill Reposu Ekle (Add Skill)"
    echo "  [5] ⚙️ AI Bağlantı Hedef Ayarları (Settings)"
    echo "  [6] ❌ Çıkış (Exit)"
    echo "========================================================"
    read -p "Seçiminiz [1-6]: " choice

    case "$choice" in
        1)
            do_install
            read -p "Devam etmek için Enter'a basın..." dummy
            ;;
        2)
            do_update
            read -p "Devam etmek için Enter'a basın..." dummy
            ;;
        3)
            do_status
            read -p "Devam etmek için Enter'a basın..." dummy
            ;;
        4)
            do_add_skill
            read -p "Devam etmek için Enter'a basın..." dummy
            ;;
        5)
            do_settings
            ;;
        6)
            echo "Çıkış yapılıyor. Harika kodlamalar! 👋"
            exit 0
            ;;
        *)
            echo "Geçersiz seçim! Lütfen 1-6 arasında bir seçim yapın."
            ;;
    esac
done
