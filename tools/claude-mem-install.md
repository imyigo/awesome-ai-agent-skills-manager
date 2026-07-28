# claude-mem — Kurulum Kılavuzu

> **Ne yapar:** Oturumlar arası kalıcı hafıza sistemi.
> Session boyunca yapılan işlemleri kaydeder, AI ile özetler,
> SQLite veritabanına saklar ve sonraki oturumda otomatik enjekte eder.
>
> **Neden SKILL değil:** Python/npm altyapısı gerektirir. Dosya bazlı talimat değil,
> arka planda çalışan bir daemon'dır.

---

## Kurulum

### Antigravity / Claude Code üzerinden (önerilen)

```
/plugin marketplace add thedotmack/claude-mem
/plugin install claude-mem
```

### Manuel kurulum

```bash
# 1. Paketi kur
npm install -g claude-mem

# 2. Veritabanı dizinini oluştur
mkdir -p ~/.claude-mem

# 3. Antigravity'de etkinleştir (settings.json'a ekle)
# ~/.gemini/antigravity-cli/settings.json içine:
{
  "plugins": ["claude-mem"]
}
```

---

## Komutlar (kurulumdan sonra)

| Komut | Ne Yapar |
|---|---|
| `/mem-search <sorgu>` | Geçmiş oturumlarda tam metin arama |
| `/mem-view` | `http://localhost:37777` adresinde görsel arayüz açar |
| `/mem-stats` | Veritabanı istatistiklerini gösterir |
| `/mem-clear` | Tüm hafızayı temizler |

---

## Gizlilik Kontrolü

Hassas içeriği hafızadan dışlamak için `<private>` etiketi kullanın:

```
<private>
Bu kısım veritabanına kaydedilmez.
API tokenları, şifreler, kişisel notlar buraya.
</private>
```

---

## Nasıl Çalışır

```
Oturum başlangıcı:
  → Geçmiş oturumlardan ilgili context enjekte edilir (otomatik)

Oturum boyunca:
  → Tool kullanımları ve gözlemler yakalanır

Oturum sonu:
  → Ham veri AI ile özetlenir → SQLite FTS5'e kaydedilir
```

---

## Depolama

```
~/.claude-mem/memory.db    ← SQLite veritabanı
~/.claude-mem/settings     ← Yapılandırma
```

---

## Repo

[github.com/thedotmack/claude-mem](https://github.com/thedotmack/claude-mem)
