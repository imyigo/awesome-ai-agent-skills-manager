// Vite giriş noktası. Mevcut App.jsx global `React` ve `ReactDOM` kullanıyor
// ve kendini render ediyor. Bu dosya o global'leri kurup App'i import eder —
// böylece App.jsx TEK KAYNAK olarak hem CDN hem Vite'ta çalışır (0 değişiklik).
import React from 'react';
import * as ReactDOMClient from 'react-dom/client';

// Global'leri App.jsx değerlendirilmeden ÖNCE kur (static import'lar önce koşar).
window.React = React;
window.ReactDOM = ReactDOMClient;   // App.jsx: ReactDOM.createRoot(...)

// Dinamik import: global'ler set edildikten SONRA App.jsx modülü çalışır.
import('@app/App.jsx');
