// Minimal preload. Şu an renderer'a API açmıyoruz — dashboard kendi
// HTTP API'sini (localhost) kullanıyor. İleride native köprü gerekirse buraya.
const { contextBridge } = require('electron');

contextBridge.exposeInMainWorld('brainDesktop', {
  isDesktop: true,
  platform: process.platform
});
