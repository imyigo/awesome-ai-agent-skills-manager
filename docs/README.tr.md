# ⚡ Multi-AI Skill & Framework Hub (Claude • Antigravity • Cursor • Codex)

> **Claude Code ve Google Antigravity için ultra optimize edilmiş, 3 katmanlı modüler yetenek (skill) ve MCP altyapısı.** 10+ popüler açık kaynak skill'i çakışmasız, canlı Git submodule bağlantılı tek bir mimaride birleştirir.

---

## ❓ Sorun: AI Yeteneklerini (Skills) Yönetmek Kâbus mu?

> **Farklı cihazlarda, Claude Code, Antigravity, Cursor ve Codex arasında yetenekleri senkronize etmek tam bir zaman kaybı değil mi?**

* ❌ **Çakışan Yönergeler:** Farklı repolardan doğrudan indirilen yetenekler birbiriyle çakışır ve AI'ın kafasını karıştırır.
* ❌ **Token İsrafı:** Aşırı büyük yetenek dosyaları her istekte yüzbinlerce context token'ı harcayarak kotanızı saniyeler içinde bitirir.
* ❌ **Geri Kaldıran Güncellemeler:** Orijinal repo sahipleri yeteneklerini güncellediğinde yerel dosyalarınız haberiniz olmadan eski kalır.
* ❌ **Çoklu Araç Karmaşası:** Claude (`~/.claude`), Antigravity (`~/.gemini`), Cursor (`~/.cursor`) ve Codex (`~/.codex`) için ayrı ayrı klasör yönetmek yorucu ve hataya açıktır.

---

## 💡 Çözüm: Multi-AI Skill & Framework Hub

> **Tüm AI araçlarınızı tek bir komutla bağlayan, sıfır çakışmalı ve token optimizasyonlu kontrol paneli.**

* ✅ **Otomatik AI Tespiti:** Bilgisayarınızdaki Antigravity, Claude Code, Cursor IDE ve OpenAI Codex'i otomatik tanır ve bağlar.
* ✅ **3-Katmanlı Lazy-Load Mimarisi:** İlgili alan referanslarını yalnızca ihtiyaç anında yükleyerek token tüketiminizi **%60-70 azaltır**.
* ✅ **Canlı GitHub Senkronizasyonu:** Orijinal repolara Git Submodules ile canlı bağlıdır. Tek komutla şeffafça güncellenir.
* ✅ **Tek Tıkla Özel Skill Ekleme:** İstediğiniz herhangi bir GitHub skill reposunu tek tıkla ekleyip tüm AI'larınıza anında yayınlayabilirsiniz.

---

## 🌟 Önemli Özellikler

* **🎨 Modern Görsel Web Dashboard:** Tarayıcınızda açılan görsel karanlık-mod kontrol paneli (`./gui.sh`) ile tek tıkla kurulum, canlı loglar ve durum rozetleri!
* **🤖 Otomatik Çoklu-AI Tespiti:** Bilgisayarınızda yüklü AI araçlarını (Antigravity, Claude Code, Cursor IDE, OpenAI Codex) otomatik tespit eder ve sembolik bağları yönetir.
* **🧠 Birleşik Süper-Skill (`unified-dev`):** Topluluğun en iyi 10+ skill'ini çakışmasız tek bir çatı altında toplar.
* **⚡ %60-70 Token Tasarrufu:** 3 Katmanlı **Lazy-Load** mimarisi kullanır.
* **🔄 Şeffaf GitHub Raporlama:** Güncelleme sırasında canlı GitHub repo URL'lerini, commit kodlarını ve geliştirici notlarını ekrana basar.
* **➕ Canlı GitHub Skill Ekleme:** İstediğiniz herhangi bir GitHub skill reposunu tek tıkla ekleyip tüm AI'larınıza bağlama imkanı!

---

## 🎨 Görsel Web Dashboard & CLI Seçenekleri

Yeteneklerinizi **Görsel Web Dashboard** (`./gui.sh`) VEYA **İnteraktif CLI** (`./control.sh`) ile yönetebilirsiniz:

### Seçenek A: Görsel Web Dashboard'u Başlat (Önerilen)
```bash
./gui.sh
# Tarayıcınızda http://localhost:3777 adresini otomatik açar!
```

### Seçenek B: İnteraktif Terminal Kontrol Paneli
```bash
./control.sh
```

```text
========================================================
  ⚡ MULTI-AI SKILL & FRAMEWORK HUB CONTROL PANEL
  (Antigravity • Claude Code • Cursor IDE • OpenAI Codex)
========================================================
  [1] 🚀 Kurulum Yap & Tüm AI'ları Bağla (Install & Link)
  [2] 🔄 Skill'leri Güncelle & GitHub Raporu Al (Update & Report)
  [3] 🔍 AI Tespiti & Sistem Bağlantı Durumu (Auto-Detect Status)
  [4] ➕ Canlı Yeni GitHub Skill Reposu Ekle (Add Custom Skill Repo)
  [5] ⚙️ AI Bağlantı Hedef Ayarları (Toggle Target AIs)
  [6] ❌ Çıkış (Exit)
========================================================
```

---

## 🚀 Hızlı Kurulum

```bash
git clone --recursive https://github.com/imyigo/claude-antigravity-skills.git ~/.gemini/claude-antigravity-best-skills
cd ~/.gemini/claude-antigravity-best-skills
chmod +x control.sh
./control.sh
```

---

## 📜 Lisans

Bu proje [MIT](LICENSE) lisanslıdır.
