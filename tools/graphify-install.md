# graphify — Kurulum Kılavuzu

> **Ne yapar:** Kod, PDF, markdown, görsel — her türlü dosyayı okuyup
> interaktif bir **bilgi grafiği** oluşturur. Obsidian vault'a aktarabilir,
> AI ile sorgulayabilirsiniz. Token kullanımını 71.5× azaltır (raw dosya
> okumaya kıyasla).
>
> **Neden SKILL değil:** Python paketi + CLI aracı. Dosya bazlı talimat değil,
> çalıştırılması gereken bir komut.

---

## Gereksinimler

- Python 3.10+
- Claude Code veya Antigravity
- `pip` veya `uv`

---

## Kurulum

```bash
# 1. Paketi kur
pip install graphifyy

# 2. Claude/Antigravity'ye entegre et
graphify install
```

### uv kullanıyorsanız (önerilen)

```bash
uv tool install graphifyy
graphify install
```

---

## Kullanım

```bash
# Mevcut klasörü analiz et
/graphify .

# Belirli bir klasör
/graphify ./src

# Wiki modu ile (Wikipedia tarzı makaleler üretir)
/graphify . --wiki
```

---

## Çıktı Yapısı

```
graphify-out/
├── graph.html          ← İnteraktif grafik (tarayıcıda açılır)
├── obsidian/           ← Obsidian vault olarak aç
├── wiki/               ← Agent navigasyonu için Wikipedia tarzı makaleler
├── GRAPH_REPORT.md     ← Önemli node'lar, sürpriz bağlantılar, önerilen sorular
├── graph.json          ← Kalıcı grafik — haftalarca sonra yeniden sorgulayabilirsiniz
└── cache/              ← SHA256 cache — sadece değişen dosyaları yeniden işler
```

---

## Ne Zaman Kullanmalı

| Senaryo | Komut |
|---|---|
| Yeni bir projeyi anlamak | `/graphify . --wiki` |
| Karpathy-tarzı notlar/makaleler klasörü | `/graphify ~/raw-notes` |
| Büyük codebase'e katılmak | `/graphify ./src` |
| Haftalarca sonra context kaybı | `graph.json` mevcut — yeniden okuma yok |

---

## Dikkat

- Büyük codebase'lerde (10k+ dosya) **token tüketimi yüksek** — ilk çalıştırmayı
  `/src` veya belirli bir alt klasörle sınırlandırın
- `cache/` klasörü sayesinde tekrar çalıştırmalar çok daha hızlı

---

## Repo

[github.com/Graphify-Labs/graphify](https://github.com/Graphify-Labs/graphify)
