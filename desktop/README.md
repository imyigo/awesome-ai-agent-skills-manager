# Brain Manager — macOS Desktop App

Electron sarmalayıcı. Açılışta Node server'ını başlatır, hazır olunca dashboard'u
kendi penceresinde gösterir. Kapanışta server'ı durdurur.

## Çalıştır (geliştirme)

```bash
cd desktop
npm install
npm start
```

Çift tıkla açılan app gibi: server otomatik başlar (`NO_OPEN=1`, port 3777),
pencere hazır olunca dashboard yüklenir.

## .app / .dmg paketle

```bash
cd desktop
npm run dist
```

`electron-builder` ile `dist/` altında `.dmg` ve `.zip` üretir. `gui/`, `repo/` ve
`presets.json` `extraResources` olarak paket içine kopyalanır; paketli app,
Electron'un gömülü Node'u ile server'ı çalıştırır (sistem Node gerekmez).

## Notlar

- **Node sürümü:** server `node:sqlite` kullanır → Node 22+ gerekir. Geliştirmede
  sistem Node'un (`node --version`) 22+ olmalı. `BRAIN_NODE=/path/to/node` ile
  farklı Node işaret edilebilir.
- **Port:** varsayılan 3777. `BRAIN_PORT` ile değiştir.
- Bu app mevcut web koduna dokunmaz — sadece `gui/gui_server.js`'i başlatıp
  `http://localhost:3777`'i gösterir. Web'i Vite'a taşımak bu app'i etkilemez.
