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

## 🎨 Kontrol Paneli & Görsel Web Dashboard

Tüm işlemleri tek bir giriş noktasından (**`./control.sh`**) yönetebilirsiniz:

```bash
cd ~/.gemini/claude-antigravity-best-skills
chmod +x control.sh
./control.sh
```

**`control.sh` İçindeki Seçenekler:**
* **`[1]` 🚀 Kurulum Yap:** Antigravity, Claude Code, Cursor ve Codex bağlantılarını kurar.
* **`[2]` 🔄 Güncelle:** Tüm canlı skill'leri şeffaf commit loglarıyla günceller.
* **`[3]` 🔍 Sistem Durumu:** Yüklü AI asistanlarını tespit eder ve durum denetimi yapar.
* **`[4]` ➕ Canlı Skill Ekle:** İstediğiniz GitHub skill reposunu tek tıkla ekler.
* **`[5]` 🎨 Görsel Web Dashboard:** Tarayıcınızda `http://localhost:3777` adresinde **Görsel Web GUI** arayüzünü açar!
* **`[6]` 🌐 Dil Değiştir:** Menü dilini anında değiştirir (Türkçe, English, Deutsch vb.).
* **`[7]` ❌ Çıkış:** Kontrol panelinden çıkar.

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
git clone --recursive https://github.com/imyigo/awesome-ai-agent-skills-manager.git ~/.gemini/claude-antigravity-best-skills
cd ~/.gemini/claude-antigravity-best-skills
chmod +x control.sh
./control.sh
```

---

## 📜 Lisans

Bu proje [MIT](LICENSE) lisanslıdır.
