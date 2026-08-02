const { useState, useEffect, useRef, useMemo } = React;

// ============================================================
// I18N DICTIONARY (TR & EN)
// ============================================================
const dict = {
  tr: {
    dashboard: "Dashboard",
    skills: "Skills Hub",
    mcp: "MCP Servers",
    commands: "Slash Commands",
    presets: "Presets (Modlar)",
    marketplace: "Marketplace (GitHub)",
    settings: "Ayarlar (SQLite)",
    sandbox: "LLM Sandbox Test",
    updateAll: "Tüm Repoları Güncelle",
    providers: "AI Providers",
    starterPacks: "Başlangıç Paketleri",
    installed: "Yüklü",
    notInstalled: "Algılanmadı",
    linked: "Bağlı",
    unlinked: "Bağlı Değil",
    connect: "Bağla",
    disconnect: "Bağlantıyı Kes",
    addSkill: "Canlı Yeni Skill Reposu Ekle (Git Submodule)",
    repoUrl: "https://github.com/user/skill-repo.git",
    addBtn: "Skill Reposu Ekle",
    langToggle: "EN",
    diffView: "Kod Görünümü / Düzenle",
    disableSkill: "Pasifleştir",
    enableSkill: "Aktifleştir",
    createPreset: "Yeni Preset Oluştur",
    editPreset: "Preset Düzenle",
    testPrompt: "Test İstemini Girin",
    runTest: "Sandbox Simülasyonu Çalıştır",
    addMcp: "Yeni MCP Server Ekle (Local Stdio & Remote HTTP/SSE)",
    saveMcp: "MCP Konfigürasyonunu Kaydet ve Senkronize Et",
    rawJsonView: "Ham JSON Görünümü",
    cardView: "Görsel Kart Görünümü",
    searchGithub: "GitHub Repolarında Ara (Örn: mcp-server, claude-skills)",
    saveSettings: "Ayarları SQLite Veritabanına Kaydet",
    setAuthSecret: "Auth Key Kaydet",
    editMcp: "MCP Sunucusunu Düzenle",
    allCategories: "Tüm Kategoriler"
  },
  en: {
    dashboard: "Dashboard",
    skills: "Skills Hub",
    mcp: "MCP Servers",
    commands: "Slash Commands",
    presets: "Presets (Workflow Modes)",
    marketplace: "Marketplace (GitHub)",
    settings: "Settings (SQLite)",
    sandbox: "LLM Sandbox Test",
    updateAll: "Update All Repos",
    providers: "AI Providers",
    starterPacks: "Starter Packs",
    installed: "Installed",
    notInstalled: "Not Detected",
    linked: "Linked",
    unlinked: "Unlinked",
    connect: "Link",
    disconnect: "Unlink",
    addSkill: "Add Live Skill Repository (Git Submodule)",
    repoUrl: "https://github.com/user/skill-repo.git",
    addBtn: "Add Skill Repository",
    langToggle: "TR",
    diffView: "View / Edit Code",
    disableSkill: "Disable",
    enableSkill: "Enable",
    createPreset: "Create Custom Preset",
    editPreset: "Edit Preset",
    testPrompt: "Enter Test Prompt",
    runTest: "Run Sandbox Simulation",
    addMcp: "Add New MCP Server (Local Stdio & Remote HTTP/SSE)",
    saveMcp: "Save & Sync MCP Configuration",
    rawJsonView: "Raw JSON View",
    cardView: "Visual Cards View",
    searchGithub: "Search GitHub Repositories (e.g. mcp-server, claude-skills)",
    saveSettings: "Save Settings to SQLite Database",
    setAuthSecret: "Save Auth Secret",
    editMcp: "Edit MCP Server",
    allCategories: "All Categories"
  }
};

// ============================================================
// INLINE LUCIDE SVG ICONS
// ============================================================
const Icons = {
  Zap: () => <svg className="w-5 h-5 text-indigo-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
  Shield: () => <svg className="w-4 h-4 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
  Grid: () => <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>,
  Terminal: () => <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/></svg>,
  Sliders: () => <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="4" y1="21" x2="4" y2="14"/><line x1="4" y1="10" x2="4" y2="3"/><line x1="12" y1="21" x2="12" y2="12"/><line x1="12" y1="8" x2="12" y2="8"/><line x1="20" y1="21" x2="20" y2="16"/><line x1="20" y1="12" x2="20" y2="3"/><line x1="1" y1="14" x2="7" y2="14"/><line x1="9" y1="8" x2="15" y2="8"/><line x1="17" y1="16" x2="23" y2="16"/></svg>,
  ShoppingBag: () => <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>,
  Code: () => <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>,
  Link: () => <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>,
  Unlink: () => <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18.36 6.64a9 9 0 0 1 0 12.72"/><line x1="2" y1="2" x2="22" y2="22"/><path d="M14.12 14.12A3 3 0 0 0 16 11.5"/></svg>,
  Refresh: () => <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></svg>,
  Plus: () => <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
  Trash: () => <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>,
  Edit: () => <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>,
  Check: () => <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>,
  Server: () => <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="8" rx="2" ry="2"/><rect x="2" y="14" width="20" height="8" rx="2" ry="2"/><line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/></svg>,
  Globe: () => <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>,
  Eye: () => <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>,
  Play: () => <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="5 3 19 12 5 21 5 3"/></svg>,
  Power: () => <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18.36 6.64a9 9 0 1 1-12.73 0"/><line x1="12" y1="2" x2="12" y2="12"/></svg>,
  Settings: () => <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>,
  Search: () => <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
  Lock: () => <svg className="w-4 h-4 text-amber-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>,
  Database: () => <svg className="w-4 h-4 text-sky-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>,
  Filter: () => <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>,
  CheckCircle: () => <svg className="w-5 h-5 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>,
  AlertTriangle: () => <svg className="w-5 h-5 text-rose-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>,
  Cpu: () => <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="4" y="4" width="16" height="16" rx="2" ry="2"/><rect x="9" y="9" width="6" height="6"/><line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/><line x1="9" y1="20" x2="9" y2="23"/><line x1="15" y1="20" x2="15" y2="23"/><line x1="20" y1="9" x2="23" y2="9"/><line x1="20" y1="15" x2="23" y2="15"/><line x1="1" y1="9" x2="4" y2="9"/><line x1="1" y1="15" x2="4" y2="15"/></svg>,
};

// ============================================================
// PROVIDER BRAND LOGOS (inline SVG — self-contained, CSP-safe)
// Desteklenen 5 araç. Marka renkleriyle sadeleştirilmiş işaretler.
// ============================================================
const PROVIDER_LOGOS = {
  claude: ({ className = 'w-4 h-4' }) => (
    <svg className={className} viewBox="0 0 24 24" fill="#D97757" aria-label="Claude">
      <path d="M4.7 15.9l4.2-2.36.07-.2-.07-.11h-.2l-.7-.05-2.38-.06-2.07-.09-2-.11-.5-.11L0 12.1l.05-.31.42-.28.6.05 1.33.09 2 .14 1.45.08 2.14.22h.34l.05-.14-.12-.09-.09-.08L6.1 10.4 3.9 8.94l-1.15-.84-.62-.42-.31-.4-.14-.86.56-.62.75.05.19.05.76.59 1.63 1.26 2.13 1.57.31.26.13-.09.015-.065-.14-.235L6.15 6.9 4.9 4.74l-.56-.9-.15-.54c-.05-.22-.09-.4-.09-.63l.64-.87.35-.11.85.11.36.31.53 1.21.86 1.91 1.33 2.6.39.77.21.71.08.22h.13v-.13l.11-1.42.2-1.74.19-2.24.07-.63.31-.76.62-.41.48.23.4.57-.05.37-.24 1.56-.47 2.44-.3 1.63h.18l.2-.2.81-1.08 1.36-1.7.6-.68.7-.74.45-.36h.85l.63.93-.28.96-.88 1.11-.73.94-1.04 1.4-.65 1.12.06.09.15-.01 2.34-.5 1.26-.23 1.51-.26.68.32.07.32-.27.66-1.6.4-1.87.37-2.79.66-.03.024.04.05 1.26.12.54.03h1.32l2.46.18.64.43.39.52-.06.4-1 .51-1.34-.32-3.13-.74-1.07-.27h-.15v.09l.89.87 1.64 1.48 2.05 1.91.1.47-.26.37-.28-.04-1.8-1.36-.69-.61-1.57-1.32h-.1v.14l.36.53 1.91 2.87.1.88-.14.29-.49.17-.54-.1-1.11-1.56-1.14-1.75-.92-1.57-.11.06-.55 5.9-.26.3-.59.23-.49-.38-.26-.6.26-1.19.31-1.55.25-1.24.23-1.53.13-.51-.01-.03h-.11l-1.11 1.52-1.69 2.28-1.33 1.43-.32.13-.55-.29.05-.51.31-.45 1.83-2.32.9-1.18.58-.68-.005-.1h-.03l-4.04 2.62-.72.09-.31-.29.04-.47.15-.16 2.63-1.81-.005.015z"/>
    </svg>
  ),
  cursor: ({ className = 'w-4 h-4' }) => (
    <svg className={className} viewBox="0 0 24 24" aria-label="Cursor">
      <path d="M12 2L21 7v10l-9 5-9-5V7l9-5z" fill="#0f0f0f" stroke="#4b5563" strokeWidth="0.5" />
      <path d="M12 2L21 7l-9 5-9-5 9-5z" fill="#6b7280" opacity="0.9" />
      <path d="M12 12l9-5v10l-9 5V12z" fill="#111827" />
      <path d="M12 12L3 7v10l9 5V12z" fill="#374151" />
    </svg>
  ),
  copilot: ({ className = 'w-4 h-4' }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-label="GitHub Copilot">
      <rect x="4" y="8" width="16" height="10" rx="5" fill="#111827" stroke="#9ca3af" strokeWidth="1" />
      <path d="M12 5v3" stroke="#9ca3af" strokeWidth="1.4" strokeLinecap="round" />
      <circle cx="12" cy="4.2" r="1.3" fill="#9ca3af" />
      <ellipse cx="9" cy="13" rx="1.7" ry="2.1" fill="#e5e7eb" />
      <ellipse cx="15" cy="13" rx="1.7" ry="2.1" fill="#e5e7eb" />
    </svg>
  ),
  antigravity: ({ className = 'w-4 h-4' }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-label="Antigravity">
      <circle cx="12" cy="12" r="9" stroke="#4285F4" strokeWidth="2" />
      <path d="M12 3a9 9 0 0 1 0 18" stroke="#EA4335" strokeWidth="2" fill="none" />
      <path d="M12 3a9 9 0 0 0-6.36 15.36" stroke="#FBBC05" strokeWidth="2" fill="none" />
      <circle cx="12" cy="12" r="3" fill="#34A853" />
    </svg>
  ),
  codex: ({ className = 'w-4 h-4' }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="#e5e7eb" strokeWidth="1.6" aria-label="OpenAI Codex">
      <path d="M14.5 3.2a4 4 0 0 1 3.9 2.8 4 4 0 0 1 1.6 6.7 4 4 0 0 1-3.9 4.8 4 4 0 0 1-6.7 1.5 4 4 0 0 1-4.8-3.9 4 4 0 0 1-1.5-6.7 4 4 0 0 1 3.9-4.8 4 4 0 0 1 7.5-.7z" />
      <path d="M9 10.5l3 1.7 3-1.7M12 12.2v3.3" stroke="#e5e7eb" strokeWidth="1.4" />
    </svg>
  ),
};

function ProviderLogo({ k, className }) {
  const L = PROVIDER_LOGOS[k];
  if (!L) return <span className={className || 'w-4 h-4'} />;
  return <L className={className || 'w-4 h-4'} />;
}

// FLOATING TOAST NOTIFICATION CONTAINER
function ToastContainer({ toasts, onDismiss }) {
  return (
    <div className="fixed top-5 right-5 z-[100] space-y-2 max-w-sm w-full pointer-events-none">
      {toasts.map(t => (
        <div key={t.id} className={`pointer-events-auto p-4 rounded-xl border shadow-2xl flex items-start space-x-3 transition-all duration-300 transform translate-y-0 ${t.type === 'error' ? 'bg-slate-900/95 border-rose-500/40 text-slate-100' : 'bg-slate-900/95 border-emerald-500/40 text-slate-100'}`}>
          <div className="mt-0.5">
            {t.type === 'error' ? <Icons.AlertTriangle /> : <Icons.CheckCircle />}
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="text-xs font-semibold text-white">{t.title}</h4>
            <p className="text-xs text-slate-400 mt-0.5 leading-snug">{t.message}</p>
          </div>
          <button onClick={() => onDismiss(t.id)} className="text-slate-500 hover:text-white text-xs">x</button>
        </div>
      ))}
    </div>
  );
}

// LIVE CODE EDITOR MODAL
function CodeEditorModal({ title, fileName, initialContent, onSave, onClose }) {
  const [content, setContent] = useState(initialContent || '');

  return (
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-6">
      <div className="bg-slate-900 border border-slate-800 rounded-xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden shadow-2xl">
        <div className="px-5 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-950">
          <div className="flex items-center space-x-2">
            <Icons.Code />
            <h3 className="text-sm font-semibold text-white">Live Editor - {title} ({fileName})</h3>
          </div>
          <div className="flex items-center space-x-2">
            <button onClick={() => onSave(content)} className="px-3 py-1.5 rounded bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium flex items-center space-x-1">
              <Icons.Check /> <span>Save Changes</span>
            </button>
            <button onClick={onClose} className="text-xs text-slate-400 hover:text-white px-2 py-1 rounded bg-slate-800">Cancel</button>
          </div>
        </div>

        <div className="flex-1 grid grid-cols-2 divide-x divide-slate-800 overflow-hidden bg-slate-950">
          <textarea value={content} onChange={e => setContent(e.target.value)} className="p-4 bg-transparent font-mono text-xs text-indigo-300 focus:outline-none resize-none overflow-y-auto" placeholder="Markdown content..." />
          <div className="p-4 font-sans text-xs text-slate-300 overflow-y-auto space-y-2 bg-slate-900/40">
            <span className="text-[10px] uppercase font-mono text-slate-500">Live Preview</span>
            <div className="whitespace-pre-wrap font-mono text-[11px] leading-relaxed">{content}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// MCP AUTO-DETECTION ENGINE FOR REQUIREMENTS & VARIABLES
const KNOWN_MCP_REQUIREMENTS = {
  'brave-search': [
    { key: 'BRAVE_API_KEY', type: 'env', description: 'Brave Search API Key (brave.com/search/api)', required: true }
  ],
  'github': [
    { key: 'GITHUB_PERSONAL_ACCESS_TOKEN', type: 'env', description: 'GitHub Personal Access Token (repo & read permissions)', required: true }
  ],
  'slack': [
    { key: 'SLACK_BOT_TOKEN', type: 'env', description: 'Slack Bot Token (xoxb-...)', required: true },
    { key: 'SLACK_TEAM_ID', type: 'env', description: 'Slack Workspace Team ID (T000000)', required: true }
  ],
  'n8n': [
    { key: 'N8N_HOST', type: 'env', description: 'n8n Instance Host URL (e.g. http://localhost:5678)', required: true },
    { key: 'N8N_API_KEY', type: 'env', description: 'n8n Account API Key', required: true }
  ],
  'postgres': [
    { key: 'POSTGRES_CONNECTION_STRING', type: 'env', description: 'PostgreSQL URI (postgresql://user:pass@localhost:5432/db)', required: true }
  ],
  'sqlite': [
    { key: 'DB_PATH', type: 'arg', description: 'Local path to SQLite database file (.db / .sqlite)', required: true }
  ],
  'filesystem': [
    { key: 'ALLOWED_PATHS', type: 'arg', description: 'Allowed directory paths for file operations', required: true }
  ],
  'sentry': [
    { key: 'SENTRY_AUTH_TOKEN', type: 'env', description: 'Sentry Auth Token', required: true },
    { key: 'SENTRY_ORG', type: 'env', description: 'Sentry Organization Slug', required: true }
  ],
  'gitlab': [
    { key: 'GITLAB_PERSONAL_ACCESS_TOKEN', type: 'env', description: 'GitLab Access Token', required: true }
  ],
  'google-maps': [
    { key: 'GOOGLE_MAPS_API_KEY', type: 'env', description: 'Google Maps API Key', required: true }
  ],
  'aws': [
    { key: 'AWS_ACCESS_KEY_ID', type: 'env', description: 'AWS Access Key ID', required: true },
    { key: 'AWS_SECRET_ACCESS_KEY', type: 'env', description: 'AWS Secret Access Key', required: true }
  ],
  's3': [
    { key: 'AWS_ACCESS_KEY_ID', type: 'env', description: 'AWS Access Key ID', required: true },
    { key: 'AWS_SECRET_ACCESS_KEY', type: 'env', description: 'AWS Secret Access Key', required: true }
  ],
  'neo4j': [
    { key: 'NEO4J_URI', type: 'env', description: 'Neo4j Bolt URI (bolt://localhost:7687)', required: true },
    { key: 'NEO4J_USERNAME', type: 'env', description: 'Neo4j Username', required: true },
    { key: 'NEO4J_PASSWORD', type: 'env', description: 'Neo4j Password', required: true }
  ],
  'puppeteer': [
    { key: 'PUPPETEER_EXECUTABLE_PATH', type: 'env', description: 'Chrome/Chromium executable binary path', required: false }
  ],
  'linear': [
    { key: 'LINEAR_API_KEY', type: 'env', description: 'Linear Personal API Key', required: true }
  ],
  'notion': [
    { key: 'NOTION_API_KEY', type: 'env', description: 'Notion Integration Secret', required: true }
  ],
  'cloudflare': [
    { key: 'CLOUDFLARE_API_TOKEN', type: 'env', description: 'Cloudflare API Token', required: true }
  ],
  'supabase': [
    { key: 'SUPABASE_URL', type: 'env', description: 'Supabase Project URL', required: true },
    { key: 'SUPABASE_SERVICE_ROLE_KEY', type: 'env', description: 'Supabase Service Role Key', required: true }
  ],
  'redis': [
    { key: 'REDIS_URL', type: 'env', description: 'Redis Connection URI (redis://:pass@host:6379)', required: true }
  ]
};

function detectMcpRequirements(serverKey = '', serverData = {}) {
  const reqMap = new Map();

  const addReq = (reqObj) => {
    if (!reqMap.has(reqObj.key)) {
      reqMap.set(reqObj.key, reqObj);
    }
  };

  const textToScan = [
    serverKey || '',
    serverData?.command || '',
    ...(Array.isArray(serverData?.args) ? serverData.args : []),
    serverData?.url || '',
    JSON.stringify(serverData?.headers || {})
  ].join(' ').toLowerCase();

  // 1. Known Catalog Match
  for (const [pkgKey, knownList] of Object.entries(KNOWN_MCP_REQUIREMENTS)) {
    if (textToScan.includes(pkgKey)) {
      knownList.forEach(k => addReq({ ...k }));
    }
  }

  // 2. Scan Existing ENV Keys
  const envObj = serverData?.env || {};
  for (const [envKey, envVal] of Object.entries(envObj)) {
    addReq({
      key: envKey,
      type: 'env',
      description: `${envKey} çevre değişkeni`,
      required: true
    });
  }

  // 3. Scan placeholders (${VAR}, $VAR, <KEY>, YOUR_KEY)
  const placeholderRegex = /\$\{?([A-Z0-9_]{2,})\}?|<([A-Z0-9_]{2,})>|(YOUR_[A-Z0-9_]+)/g;
  const fullText = [
    serverData?.command || '',
    ...(Array.isArray(serverData?.args) ? serverData.args : []),
    serverData?.url || '',
    JSON.stringify(serverData?.headers || {})
  ].join(' ');

  let match;
  while ((match = placeholderRegex.exec(fullText)) !== null) {
    const varName = match[1] || match[2] || match[3];
    if (varName && !['TRUE', 'FALSE', 'HTTP', 'HTTPS', 'JSON', 'STDIO'].includes(varName.toUpperCase())) {
      addReq({
        key: varName,
        type: 'env',
        description: `Otomatik algılanan gereksinim: ${varName}`,
        required: true
      });
    }
  }

  // 4. Scan headers
  if (serverData?.headers) {
    for (const [hKey, hVal] of Object.entries(serverData.headers)) {
      addReq({
        key: `HEADER:${hKey}`,
        type: 'header',
        description: `HTTP Header: ${hKey}`,
        required: true
      });
    }
  }

  // Calculate status & value for each requirement
  return Array.from(reqMap.values()).map(req => {
    let val = '';
    if (req.type === 'header' && serverData?.headers) {
      const hName = req.key.replace(/^HEADER:/, '');
      val = serverData.headers[hName] || '';
    } else {
      val = envObj[req.key] || '';
      if (!val && Array.isArray(serverData?.args)) {
        const argMatch = serverData.args.find(a => typeof a === 'string' && a.includes(req.key));
        if (argMatch) val = argMatch;
      }
    }

    let status = 'configured';
    if (!val || val.trim() === '') {
      status = 'missing';
    } else if (/YOUR_|ENTER_|<.*>|\$\{.*\}|FIXME|EXAMPLE|DEFAULT/i.test(val)) {
      status = 'placeholder';
    }

    return {
      ...req,
      value: val,
      status
    };
  });
}

function autoParsePastedMcpConfig(rawText) {
  const result = {
    key: '',
    mcpType: 'stdio',
    cmd: 'npx',
    argsStr: '',
    url: '',
    headerKey: 'x-api-key',
    headerVal: '',
    envVars: {}
  };

  if (!rawText || !rawText.trim()) return null;
  const text = rawText.trim();

  // 1. Try JSON parse
  try {
    const obj = JSON.parse(text);
    if (obj.mcpServers) {
      const firstKey = Object.keys(obj.mcpServers)[0];
      if (firstKey) {
        const srv = obj.mcpServers[firstKey];
        result.key = firstKey;
        if (srv.url) {
          result.mcpType = 'remote';
          result.url = srv.url;
          if (srv.headers) {
            const hKeys = Object.keys(srv.headers);
            if (hKeys.length > 0) {
              result.headerKey = hKeys[0];
              result.headerVal = srv.headers[hKeys[0]];
            }
          }
        } else {
          result.mcpType = 'stdio';
          result.cmd = srv.command || 'npx';
          result.argsStr = (srv.args || []).join(' ');
        }
        if (srv.env) result.envVars = { ...srv.env };
        return result;
      }
    } else if (obj.url || obj.command) {
      if (obj.url) {
        result.mcpType = 'remote';
        result.url = obj.url;
      } else {
        result.mcpType = 'stdio';
        result.cmd = obj.command || 'npx';
        result.argsStr = (obj.args || []).join(' ');
      }
      if (obj.headers) {
        const hKeys = Object.keys(obj.headers);
        if (hKeys.length > 0) {
          result.headerKey = hKeys[0];
          result.headerVal = obj.headers[hKeys[0]];
        }
      }
      if (obj.env) result.envVars = { ...obj.env };
      return result;
    }
  } catch (e) {}

  // 2. URL Extraction
  const urlMatch = text.match(/(https?:\/\/[^\s"']+)|(([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(:\d+)?(\/[^\s"']*)?)/i);
  if (urlMatch) {
    let matchedUrl = urlMatch[0];
    if (!matchedUrl.startsWith('http://') && !matchedUrl.startsWith('https://')) {
      matchedUrl = 'https://' + matchedUrl;
    }
    result.mcpType = 'remote';
    result.url = matchedUrl;

    if (matchedUrl.includes('dokploy')) {
      result.key = 'dokploy';
    }
  }

  // 3. Token / API Key Extraction (24+ karakterlik token deseni)
  const tokenMatch = text.match(/([a-zA-Z0-9_-]{24,})/);
  if (tokenMatch) {
    const token = tokenMatch[1];
    result.headerKey = 'x-api-key';
    result.headerVal = token;
    result.envVars.API_KEY = token;

    if (result.key === 'dokploy' || text.toLowerCase().includes('dokploy')) {
      result.envVars.DOKPLOY_API_KEY = token;
      if (result.url) result.envVars.DOKPLOY_URL = result.url;
    }
  }

  // 4. Command extraction (if npx or python or node)
  if (text.includes('npx') || text.includes('node') || text.includes('python')) {
    result.mcpType = 'stdio';
    const parts = text.split(/\s+/);
    result.cmd = parts[0] || 'npx';
    result.argsStr = parts.slice(1).join(' ');
  }

  return result;
}

// AGENT SETTINGS & HOOKS INSPECTOR MODAL
function AgentSettingsInspectorModal({ onClose }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/settings/inspect')
      .then(res => res.json())
      .then(d => { setData(d); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-6">
      <div className="bg-slate-900 border border-slate-800 rounded-xl w-full max-w-2xl overflow-hidden shadow-2xl space-y-4 p-6 max-h-[90vh] flex flex-col">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center space-x-2">
            <span className="text-amber-400 font-mono text-base">⚙️</span>
            <div>
              <h3 className="text-sm font-semibold text-white">Agent Hooks & Settings Inspector</h3>
              <p className="text-[11px] text-slate-400">Claude Code, Antigravity ve Cursor kural, oturum kancaları (SessionStart & UserPromptSubmit)</p>
            </div>
          </div>
          <button onClick={onClose} className="text-xs text-slate-400 hover:text-white px-2.5 py-1 rounded bg-slate-800">Kapat</button>
        </div>

        {loading ? (
          <div className="p-8 text-center text-xs text-slate-400">Konfigürasyon ve kancalar taranıyor...</div>
        ) : (
          <div className="space-y-4 overflow-y-auto pr-1 text-xs">
            {/* PERSISTENT HOOK RULES */}
            <div className="p-3.5 rounded-lg bg-amber-950/30 border border-amber-500/30 space-y-2">
              <span className="font-mono text-amber-300 font-bold block">⚡ Her Zaman Aktif (Persistent Session & Prompt Hook) Kuralları:</span>
              {data?.activePersistentRules && data.activePersistentRules.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {data.activePersistentRules.map(r => (
                    <span key={r} className="px-2 py-1 rounded bg-amber-500/20 text-amber-300 font-mono text-[11px] border border-amber-500/30 font-semibold">
                      ⚡ {r.replace(/^always-active-/, '').replace(/\.md$/, '')} (Session & Prompt Hook)
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-[11px] text-slate-400 italic">Şu an her zaman aktif özel kural tanımlı değil. Skills sayfasından herhangi bir skill'i "⚡ Her Zaman Aktif" yapabilirsiniz.</p>
              )}
            </div>

            {/* CLAUDE CODE SETTINGS */}
            {data?.claudeSettings && (
              <div className="p-3.5 rounded-lg bg-slate-950 border border-slate-800 space-y-2">
                <span className="font-mono text-indigo-400 font-semibold block">🤖 Claude Code (settings.json & hooks):</span>
                <pre className="p-3 rounded bg-slate-900 text-[11px] font-mono text-indigo-300 overflow-x-auto max-h-40">{JSON.stringify(data.claudeSettings, null, 2)}</pre>
              </div>
            )}

            {/* ANTIGRAVITY SETTINGS */}
            {data?.geminiSettings && (
              <div className="p-3.5 rounded-lg bg-slate-950 border border-slate-800 space-y-2">
                <span className="font-mono text-emerald-400 font-semibold block">🧠 Google Antigravity (config.json & policies):</span>
                <pre className="p-3 rounded bg-slate-900 text-[11px] font-mono text-emerald-300 overflow-x-auto max-h-40">{JSON.stringify(data.geminiSettings, null, 2)}</pre>
              </div>
            )}

            {/* CURSOR SETTINGS */}
            {data?.cursorSettings && (
              <div className="p-3.5 rounded-lg bg-slate-950 border border-slate-800 space-y-2">
                <span className="font-mono text-sky-400 font-semibold block">💻 Cursor IDE (mcp.json):</span>
                <pre className="p-3 rounded bg-slate-900 text-[11px] font-mono text-sky-300 overflow-x-auto max-h-40">{JSON.stringify(data.cursorSettings, null, 2)}</pre>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// MCP SERVER EDITOR MODAL
function McpEditorModal({ serverKey, serverData, onSave, onClose }) {
  const [key, setKey] = useState(serverKey || '');
  const [mcpType, setMcpType] = useState(serverData?.url ? 'remote' : 'stdio');
  const [cmd, setCmd] = useState(serverData?.command || 'npx');
  const [argsStr, setArgsStr] = useState((serverData?.args || []).join(' '));
  const [url, setUrl] = useState(serverData?.url || '');
  const [headerKey, setHeaderKey] = useState(serverData?.headers ? Object.keys(serverData.headers)[0] || 'x-api-key' : 'x-api-key');
  const [headerVal, setHeaderVal] = useState(serverData?.headers ? Object.values(serverData.headers)[0] || '' : '');
  const [envVars, setEnvVars] = useState(() => {
    const existing = serverData?.env || {};
    const keyLower = (serverKey || '').toLowerCase();
    if (keyLower.includes('n8n') && Object.keys(existing).length === 0) {
      return { N8N_HOST: 'http://localhost:5678', N8N_API_KEY: '' };
    }
    if (keyLower.includes('dokploy') && Object.keys(existing).length === 0) {
      return { DOKPLOY_URL: 'https://your-dokploy-host.example.com', DOKPLOY_API_KEY: '' };
    }
    if (keyLower.includes('github') && Object.keys(existing).length === 0) {
      return { GITHUB_PERSONAL_ACCESS_TOKEN: '' };
    }
    if (keyLower.includes('slack') && Object.keys(existing).length === 0) {
      return { SLACK_BOT_TOKEN: '', SLACK_TEAM_ID: '' };
    }
    return existing;
  });

  const [pasteText, setPasteText] = useState('');
  const [showPasteBox, setShowPasteBox] = useState(false);

  const handleAutoParsePaste = (textToParse) => {
    if (!textToParse || !textToParse.trim()) return;
    const parsed = autoParsePastedMcpConfig(textToParse);
    if (parsed) {
      if (parsed.key && !serverKey) setKey(parsed.key);
      setMcpType(parsed.mcpType);
      if (parsed.cmd) setCmd(parsed.cmd);
      if (parsed.argsStr) setArgsStr(parsed.argsStr);
      if (parsed.url) setUrl(parsed.url);
      if (parsed.headerKey) setHeaderKey(parsed.headerKey);
      if (parsed.headerVal) setHeaderVal(parsed.headerVal);
      if (Object.keys(parsed.envVars).length > 0) {
        setEnvVars(prev => ({ ...prev, ...parsed.envVars }));
      }
    }
  };

  // Dynamic placeholders based on MCP server type
  const mcpProfile = useMemo(() => {
    const k = key.toLowerCase();
    if (k.includes('n8n')) {
      return {
        title: '⚡ n8n Workflow Automation MCP Configuration',
        cmdPlaceholder: 'npx',
        argsPlaceholder: '-y n8n-mcp@latest',
        recommendedEnv: ['N8N_HOST', 'N8N_API_KEY'],
        desc: 'n8n otomasyon sunucunuza bağlanır. N8N_HOST (örn: http://localhost:5678) ve N8N_API_KEY girilmelidir.'
      };
    }
    if (k.includes('sqlite')) {
      return {
        title: '🗄️ SQLite Database MCP Configuration',
        cmdPlaceholder: 'npx',
        argsPlaceholder: '-y @modelcontextprotocol/server-sqlite C:/data/db.sqlite',
        desc: 'Yerel SQLite veritabanı dosyanızın yolunu args alanına yazın.'
      };
    }
    if (k.includes('postgres')) {
      return {
        title: '🐘 PostgreSQL MCP Configuration',
        cmdPlaceholder: 'npx',
        argsPlaceholder: '-y @modelcontextprotocol/server-postgres postgresql://user:pass@localhost:5432/db',
        desc: 'PostgreSQL bağlantı dizesini args alanına yazın.'
      };
    }
    return {
      title: `⚙️ ${key || 'Custom'} MCP Server Configuration`,
      cmdPlaceholder: 'npx',
      argsPlaceholder: '-y @package/mcp-server@latest',
      desc: 'Local stdio veya remote HTTP/SSE MCP sunucu konfigürasyonu.'
    };
  }, [key]);

  const handleApplyPreset = (presetType) => {
    if (presetType === 'n8n') {
      setKey(serverKey || 'n8n');
      setMcpType('stdio');
      setCmd('npx');
      setArgsStr('-y n8n-mcp@latest');
      setEnvVars({
        N8N_HOST: 'http://localhost:5678',
        N8N_API_KEY: ''
      });
    } else if (presetType === 'brave') {
      setKey(serverKey || 'brave-search');
      setMcpType('stdio');
      setCmd('npx');
      setArgsStr('-y @modelcontextprotocol/server-brave-search');
      setEnvVars({ BRAVE_API_KEY: '' });
    } else if (presetType === 'github') {
      setKey(serverKey || 'github');
      setMcpType('stdio');
      setCmd('npx');
      setArgsStr('-y @modelcontextprotocol/server-github');
      setEnvVars({ GITHUB_PERSONAL_ACCESS_TOKEN: '' });
    } else if (presetType === 'slack') {
      setKey(serverKey || 'slack');
      setMcpType('stdio');
      setCmd('npx');
      setArgsStr('-y @modelcontextprotocol/server-slack');
      setEnvVars({ SLACK_BOT_TOKEN: '', SLACK_TEAM_ID: '' });
    } else if (presetType === 'dokploy') {
      setKey(serverKey || 'dokploy');
      setMcpType('remote');
      setUrl('https://your-dokploy-host.example.com/api/mcp');
      setHeaderKey('x-api-key');
      setHeaderVal('$DOKPLOY_API_KEY');
      setEnvVars({
        DOKPLOY_URL: 'https://your-dokploy-host.example.com',
        DOKPLOY_API_KEY: '$DOKPLOY_API_KEY'
      });
    } else if (presetType === 'sentry') {
      setKey(serverKey || 'sentry');
      setMcpType('stdio');
      setCmd('npx');
      setArgsStr('-y @modelcontextprotocol/server-sentry');
      setEnvVars({ SENTRY_AUTH_TOKEN: '', SENTRY_ORG: '' });
    } else if (presetType === 'sqlite') {
      setKey(serverKey || 'sqlite');
      setMcpType('stdio');
      setCmd('npx');
      setArgsStr('-y @modelcontextprotocol/server-sqlite /path/to/database.sqlite');
    } else if (presetType === 'postgres') {
      setKey(serverKey || 'postgres');
      setMcpType('stdio');
      setCmd('npx');
      setArgsStr('-y @modelcontextprotocol/server-postgres postgresql://user:pass@localhost:5432/dbname');
    } else if (presetType === 'puppeteer') {
      setKey(serverKey || 'puppeteer');
      setMcpType('stdio');
      setCmd('npx');
      setArgsStr('-y @modelcontextprotocol/server-puppeteer');
    } else if (presetType === '21st') {
      setKey(serverKey || '21st');
      setMcpType('remote');
      setUrl('https://21st.dev/api/mcp');
      setHeaderKey('x-api-key');
      setHeaderVal('$API_KEY_21ST');
    }
  };

  const liveReqs = useMemo(() => {
    return detectMcpRequirements(key, {
      command: cmd,
      args: argsStr ? argsStr.split(' ').filter(Boolean) : [],
      url,
      headers: headerKey ? { [headerKey]: headerVal } : {},
      env: envVars
    });
  }, [key, cmd, argsStr, url, headerKey, headerVal, envVars]);

  const handleUpdateEnv = (k, val) => {
    setEnvVars(prev => ({ ...prev, [k]: val }));
  };

  const handleAddEnvRow = () => {
    const k = prompt('Yeni Environment Key adı (Örn: N8N_API_KEY):');
    if (k && k.trim()) {
      setEnvVars(prev => ({ ...prev, [k.trim()]: '' }));
    }
  };

  const handleRemoveEnvRow = (k) => {
    setEnvVars(prev => {
      const copy = { ...prev };
      delete copy[k];
      return copy;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let configObj = {};
    if (mcpType === 'remote') {
      configObj = {
        url: url,
        headers: headerKey ? { [headerKey]: headerVal } : {}
      };
    } else {
      configObj = {
        command: cmd,
        args: argsStr ? argsStr.split(' ').filter(Boolean) : []
      };
    }
    if (Object.keys(envVars).length > 0) {
      configObj.env = envVars;
    }
    onSave(key, configObj);
  };

  return (
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-6">
      <div className="bg-slate-900 border border-slate-800 rounded-xl w-full max-w-xl overflow-hidden shadow-2xl space-y-4 p-6 max-h-[90vh] flex flex-col">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div>
            <h3 className="text-sm font-semibold text-white flex items-center space-x-2">
              <Icons.Server /> <span>{mcpProfile.title}</span>
            </h3>
            <p className="text-[11px] text-slate-400 mt-0.5">{mcpProfile.desc}</p>
          </div>
          <button onClick={onClose} className="text-xs text-slate-400 hover:text-white px-2 py-1 rounded bg-slate-800">Kapat</button>
        </div>

        {/* READY PRESET TEMPLATE CHIPS */}
        <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono text-indigo-400 uppercase font-semibold block">Sık Kullanılan Sunucular İçin Hızlı Konfigürasyon:</span>
            <button
              type="button"
              onClick={() => setShowPasteBox(!showPasteBox)}
              className="text-[10px] font-mono text-amber-300 hover:text-amber-200 underline"
            >
              {showPasteBox ? '▲ Gizle' : '📋 Metin / JSON / Token Yapıştır (Otomatik Doldur)'}
            </button>
          </div>
          <div className="flex flex-wrap gap-1.5">
            <button type="button" onClick={() => handleApplyPreset('dokploy')} className="px-2 py-1 rounded bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/40 text-blue-300 text-xs font-mono font-bold transition">
              🚀 Dokploy MCP
            </button>
            <button type="button" onClick={() => handleApplyPreset('brave')} className="px-2 py-1 rounded bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-300 text-xs font-mono transition">
              🦁 Brave Search
            </button>
            <button type="button" onClick={() => handleApplyPreset('github')} className="px-2 py-1 rounded bg-sky-500/10 hover:bg-sky-500/20 border border-sky-500/30 text-sky-300 text-xs font-mono transition">
              🐙 GitHub
            </button>
            <button type="button" onClick={() => handleApplyPreset('slack')} className="px-2 py-1 rounded bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/30 text-purple-300 text-xs font-mono transition">
              💬 Slack
            </button>
            <button type="button" onClick={() => handleApplyPreset('n8n')} className="px-2 py-1 rounded bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-rose-300 text-xs font-mono transition">
              ⚡ n8n
            </button>
            <button type="button" onClick={() => handleApplyPreset('postgres')} className="px-2 py-1 rounded bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 text-xs font-mono transition">
              🐘 Postgres
            </button>
            <button type="button" onClick={() => handleApplyPreset('sqlite')} className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-mono transition">
              🗄️ SQLite
            </button>
            <button type="button" onClick={() => handleApplyPreset('puppeteer')} className="px-2 py-1 rounded bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs font-mono transition">
              🌐 Puppeteer
            </button>
            <button type="button" onClick={() => handleApplyPreset('sentry')} className="px-2 py-1 rounded bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-300 text-xs font-mono transition">
              🎯 Sentry
            </button>
            <button type="button" onClick={() => handleApplyPreset('21st')} className="px-2 py-1 rounded bg-teal-500/10 hover:bg-teal-500/20 border border-teal-500/30 text-teal-300 text-xs font-mono transition">
              🚀 21st.dev Remote
            </button>
          </div>

          {showPasteBox && (
            <div className="pt-2 space-y-2 border-t border-slate-800/80">
              <textarea
                placeholder="Herhangi bir URL, API Token, npx komutu veya JSON yapıştırın..."
                value={pasteText}
                onChange={e => {
                  setPasteText(e.target.value);
                  handleAutoParsePaste(e.target.value);
                }}
                rows="3"
                className="w-full p-2.5 rounded bg-slate-900 border border-slate-800 font-mono text-xs text-amber-300 focus:outline-none focus:border-amber-500"
              />
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-slate-400">Yazılan veya yapıştırılan metin anında otomatik olarak ayrıştırılır ve form alanlarına doldurulur!</span>
                <button
                  type="button"
                  onClick={() => handleAutoParsePaste(pasteText)}
                  className="px-3 py-1 rounded bg-amber-500 text-slate-950 text-xs font-bold transition"
                >
                  ⚡ Otomatik Ayrıştır
                </button>
              </div>
            </div>
          )}
        </div>

        {/* LIVE AUTO-DETECTED REQUIREMENTS BANNER */}
        {liveReqs.length > 0 && (
          <div className="p-3 rounded-lg bg-indigo-950/40 border border-indigo-500/30 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono text-indigo-300 font-semibold flex items-center space-x-1">
                <span>🔍 Otomatik Algılanan Sistem Gereksinimleri ({liveReqs.length})</span>
              </span>
            </div>
            <div className="space-y-1.5">
              {liveReqs.map(req => {
                const isEnvAdded = Object.prototype.hasOwnProperty.call(envVars, req.key);
                return (
                  <div key={req.key} className="flex items-center justify-between bg-slate-900/80 p-2 rounded border border-slate-800 text-xs">
                    <div className="flex items-center space-x-2">
                      <span className="px-1.5 py-0.5 rounded text-[9px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                        {req.type.toUpperCase()}
                      </span>
                      <div>
                        <span className="font-mono text-slate-200 font-semibold">{req.key}</span>
                        <p className="text-[10px] text-slate-400">{req.description}</p>
                      </div>
                    </div>
                    {req.type === 'env' && !isEnvAdded && (
                      <button
                        type="button"
                        onClick={() => setEnvVars(prev => ({ ...prev, [req.key]: '' }))}
                        className="px-2 py-1 rounded bg-indigo-600 hover:bg-indigo-500 text-white text-[10px] font-medium transition"
                      >
                        + Değişken Ekle
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 overflow-y-auto pr-1">
          <div>
            <label className="text-xs font-mono text-slate-400 block mb-1">Server ID / Adı (Örn: n8n, sqlite)</label>
            <input type="text" value={key} onChange={e => setKey(e.target.value)} disabled={!!serverKey} className="w-full p-2.5 rounded bg-slate-950 border border-slate-800 text-xs font-mono text-slate-200 focus:outline-none focus:border-indigo-500" required />
          </div>

          <div>
            <label className="text-xs font-mono text-slate-400 block mb-1">Sunucu İletişim Protokolü</label>
            <div className="grid grid-cols-2 gap-2">
              <button type="button" onClick={() => setMcpType('stdio')} className={`py-2 rounded text-xs font-mono transition ${mcpType === 'stdio' ? 'bg-indigo-600/30 text-indigo-300 border border-indigo-500/50' : 'bg-slate-950 text-slate-400 border border-slate-800'}`}>
                Local Stdio (Komut Çıktısı)
              </button>
              <button type="button" onClick={() => setMcpType('remote')} className={`py-2 rounded text-xs font-mono transition ${mcpType === 'remote' ? 'bg-indigo-600/30 text-indigo-300 border border-indigo-500/50' : 'bg-slate-950 text-slate-400 border border-slate-800'}`}>
                Remote HTTP / SSE (URL Web)
              </button>
            </div>
          </div>

          {mcpType === 'stdio' ? (
            <>
              <div>
                <label className="text-xs font-mono text-slate-400 block mb-1">Çalıştırma Komutu (command)</label>
                <input type="text" value={cmd} onChange={e => setCmd(e.target.value)} placeholder="npx" className="w-full p-2.5 rounded bg-slate-950 border border-slate-800 text-xs font-mono text-slate-200 focus:outline-none focus:border-indigo-500" required />
              </div>
              <div>
                <label className="text-xs font-mono text-slate-400 block mb-1">Komut Parametreleri (args)</label>
                <input type="text" value={argsStr} onChange={e => setArgsStr(e.target.value)} placeholder="-y n8n-mcp@latest" className="w-full p-2.5 rounded bg-slate-950 border border-slate-800 text-xs font-mono text-slate-200 focus:outline-none focus:border-indigo-500" />
              </div>
            </>
          ) : (
            <>
              <div>
                <label className="text-xs font-mono text-slate-400 block mb-1">Remote SSE Endpoint URL</label>
                <input type="url" value={url} onChange={e => setUrl(e.target.value)} placeholder="https://21st.dev/api/mcp" className="w-full p-2.5 rounded bg-slate-950 border border-slate-800 text-xs font-mono text-slate-200 focus:outline-none focus:border-indigo-500" required />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs font-mono text-slate-400 block mb-1">Header Anahtarı</label>
                  <input type="text" value={headerKey} onChange={e => setHeaderKey(e.target.value)} placeholder="x-api-key" className="w-full p-2.5 rounded bg-slate-950 border border-slate-800 text-xs font-mono text-slate-200 focus:outline-none focus:border-indigo-500" />
                </div>
                <div>
                  <label className="text-xs font-mono text-slate-400 block mb-1">Header Değeri</label>
                  <input type="text" value={headerVal} onChange={e => setHeaderVal(e.target.value)} placeholder="$API_KEY_21ST" className="w-full p-2.5 rounded bg-slate-950 border border-slate-800 text-xs font-mono text-slate-200 focus:outline-none focus:border-indigo-500" />
                </div>
              </div>
            </>
          )}

          {/* DYNAMIC ENVIRONMENT VARIABLES (ENV) EDITOR */}
          <div className="p-3.5 rounded-lg bg-slate-950 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-mono text-amber-400 font-semibold flex items-center space-x-1">
                <Icons.Lock /> <span>Environment Değişkenleri & API Key'ler ({Object.keys(envVars).length})</span>
              </label>
              <button type="button" onClick={handleAddEnvRow} className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-amber-300 text-[10px] font-mono transition">
                + Env Ekle
              </button>
            </div>

            {Object.keys(envVars).length === 0 ? (
              <p className="text-[11px] text-slate-500 italic">n8n, Slack veya GitHub API Key gibi özel değişkenler gerekiyorsa yukarıdaki "+ Env Ekle" butonuna tıklayın.</p>
            ) : (
              <div className="space-y-2">
                {Object.entries(envVars).map(([ek, ev]) => (
                  <div key={ek} className="flex items-center space-x-2">
                    <span className="text-xs font-mono text-slate-300 w-1/3 truncate">{ek}:</span>
                    <input
                      type="text"
                      placeholder={`${ek} değerini girin`}
                      value={ev}
                      onChange={e => handleUpdateEnv(ek, e.target.value)}
                      className="flex-1 p-2 rounded bg-slate-900 border border-slate-800 text-xs font-mono text-indigo-300 focus:outline-none focus:border-indigo-500"
                    />
                    <button type="button" onClick={() => handleRemoveEnvRow(ek)} className="text-rose-400 hover:text-rose-300 text-xs px-1.5 py-1">x</button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="pt-3 flex justify-end space-x-2 border-t border-slate-800">
            <button type="button" onClick={onClose} className="px-4 py-2 rounded bg-slate-800 text-xs text-slate-300">İptal</button>
            <button type="submit" className="px-4 py-2 rounded bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium transition flex items-center space-x-1">
              <Icons.Check /> <span>MCP Sunucusunu Kaydet</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// PRESET EDITOR MODAL
function PresetEditorModal({ preset, availableSkills, onSave, onClose }) {
  const isAutoMode = preset?.id?.includes('auto') || (preset?.skills || []).length === 0;
  const [title, setTitle] = useState(preset?.title || '');
  const [desc, setDesc] = useState(preset?.description || '');
  const [customRule, setCustomRule] = useState(preset?.customRule || '');
  const [skills, setSkills] = useState(preset?.skills || []);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      id: preset?.id || 'preset-' + Date.now(),
      title,
      description: desc,
      skills: isAutoMode ? [] : skills,
      customRule,
      custom: true
    });
  };

  return (
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-6">
      <div className="bg-slate-900 border border-slate-800 rounded-xl w-full max-w-lg overflow-hidden shadow-2xl space-y-4 p-6 max-h-[90vh] flex flex-col">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h3 className="text-sm font-semibold text-white flex items-center space-x-2">
            <Icons.Sliders /> <span>{preset?.id ? `Preset Düzenle — ${preset.title}` : 'Yeni Preset Oluştur'}</span>
          </h3>
          <button onClick={onClose} className="text-xs text-slate-400 hover:text-white px-2 py-1 rounded bg-slate-800">Kapat</button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 overflow-y-auto pr-1">
          <div>
            <label className="text-xs font-mono text-slate-400 block mb-1">Preset Başlığı</label>
            <input type="text" value={title} onChange={e => setTitle(e.target.value)} className="w-full p-2.5 rounded bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-indigo-500" required />
          </div>

          <div>
            <label className="text-xs font-mono text-slate-400 block mb-1">Açıklama</label>
            <input type="text" value={desc} onChange={e => setDesc(e.target.value)} className="w-full p-2.5 rounded bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-indigo-500" />
          </div>

          {isAutoMode ? (
            <div className="p-3 rounded-lg bg-emerald-500/5 border border-emerald-500/20">
              <p className="text-xs text-emerald-400 flex items-center space-x-1">
                <Icons.Zap /><span><strong>Otomatik Mod:</strong> Tüm yüklü yetenekleri aktif eder. AI tüm skill setini görür ve göreve göre otomatik seçim yapar.</span>
              </p>
            </div>
          ) : (
            <div>
              <label className="text-xs font-mono text-indigo-300 font-semibold block mb-2">
                Aktifleştirilecek Yetenekler ({skills.length} Seçili)
              </label>
              <div className="space-y-1 max-h-48 overflow-y-auto p-3 rounded-lg bg-slate-950 border border-slate-800">
                {availableSkills.map(s => (
                  <div
                    key={s}
                    onClick={() => setSkills(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s])}
                    className={`p-2 rounded border cursor-pointer flex items-center space-x-2 transition ${skills.includes(s) ? 'bg-indigo-600/20 border-indigo-500/40 text-indigo-200' : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700'}`}
                  >
                    <span className="font-mono text-xs">{skills.includes(s) ? '[x]' : '[ ]'}</span>
                    <span className="text-xs font-mono">{s}</span>
                  </div>
                ))}
                {availableSkills.length === 0 && <p className="text-xs text-slate-500 text-center py-4">Henüz yüklü yetenek yok. Skills Hub'dan repo ekleyin.</p>}
              </div>
            </div>
          )}

          <div>
            <label className="text-xs font-mono text-slate-400 block mb-1">Özel Kural / Custom Rule (İsteğe Bağlı)</label>
            <textarea
              value={customRule}
              onChange={e => setCustomRule(e.target.value)}
              rows="3"
              placeholder="Örn: Her yanıtta kaynak kodu için test yaz. Yanıtları Türkçe ver."
              className="w-full p-2.5 rounded bg-slate-950 border border-slate-800 text-xs font-mono text-slate-200 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="pt-3 flex justify-end space-x-2 border-t border-slate-800">
            <button type="button" onClick={onClose} className="px-4 py-2 rounded bg-slate-800 text-xs text-slate-300">İptal</button>
            <button type="submit" className="px-4 py-2 rounded bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium transition flex items-center space-x-1">
              <Icons.Check /> <span>Preset Kaydet</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// MAIN APP COMPONENT
function App() {
  const [lang, setLang] = useState('tr');
  const t = dict[lang];

  const VALID_TABS = ['dashboard', 'providers', 'starterPacks', 'skills', 'mcp', 'commands', 'presets', 'engines', 'sandbox', 'marketplace', 'settings'];

  const getInitialTab = () => {
    const seg = window.location.pathname.replace(/^\//, '').split('/')[0];
    return VALID_TABS.includes(seg) ? seg : 'dashboard';
  };

  const [activeTab, setActiveTabState] = useState(getInitialTab);

  const setActiveTab = (tab) => {
    setActiveTabState(tab);
    window.history.pushState({ tab }, '', `/${tab}`);
  };

  useEffect(() => {
    const handlePop = (e) => {
      const seg = window.location.pathname.replace(/^\//, '').split('/')[0];
      if (VALID_TABS.includes(seg)) setActiveTabState(seg);
      else setActiveTabState('dashboard');
    };
    window.addEventListener('popstate', handlePop);
    return () => window.removeEventListener('popstate', handlePop);
  }, []);

  const [aiStatus, setAiStatus] = useState({});
  const [skillsData, setSkillsData] = useState({});
  const [mcpConfig, setMcpConfig] = useState({ mcpServers: {} });
  const [commandsList, setCommandsList] = useState([]);
  const [presetsList, setPresetsList] = useState([]);
  const [marketplace, setMarketplace] = useState([]);
  const [settingsData, setSettingsData] = useState({});
  const [sseConnected, setSseConnected] = useState(false);
  const [enginesList, setEnginesList] = useState([]);
  const [coreCatalog, setCoreCatalog] = useState([]);
  const [showCoreHub, setShowCoreHub] = useState(false);

  // Live Terminal State — streams live_log SSE events
  const [liveTerminal, setLiveTerminal] = useState({ lines: [], jobLabel: null, active: false });
  const terminalEndRef = useRef(null);

  const fetchEngines = async () => {
    try {
      const res = await fetch('/api/engines/status');
      if (res.ok) {
        const data = await res.json();
        setEnginesList(data);
      }
    } catch (e) {}
    try {
      const c = await fetch('/api/core-services/catalog');
      if (c.ok) setCoreCatalog(await c.json());
    } catch (e) {}
  };

  const handleCoreHubAction = async (id, kind) => {
    try {
      const res = await fetch(`/api/core-services/${kind}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
      });
      const d = await res.json();
      showToast(d.success ? 'Hub Güncellendi' : 'Hata', d.message, d.success ? 'success' : 'error');
      fetchEngines();
    } catch (e) { showToast('Hata', e.message, 'error'); }
  };

  // Toast Notifications
  const [toasts, setToasts] = useState([]);
  const showToast = (title, message, type = 'success') => {
    const id = Date.now() + Math.random();
    setToasts(prev => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  };

  const [logs, setLogs] = useState([]);
  const [isConsoleOpen, setIsConsoleOpen] = useState(false);
  const [editorModal, setEditorModal] = useState(null);

  // Skills Hub Category & Search Filter
  const [skillsCategoryFilter, setSkillsCategoryFilter] = useState('all');
  const [skillsSearchQuery, setSkillsSearchQuery] = useState('');

  // MCP UI View Mode & Modals
  const [mcpViewMode, setMcpViewMode] = useState('cards');
  const [editingMcpServer, setEditingMcpServer] = useState(null);
  const [mcpAuthInputs, setMcpAuthInputs] = useState({});

  // Marketplace GitHub Search & Installation
  const [marketplaceMode, setMarketplaceMode] = useState('skills'); // 'skills' | 'mcp'
  const [githubQuery, setGithubQuery] = useState('agent-skills');
  const [isSearchingGithub, setIsSearchingGithub] = useState(false);
  const [installingRepo, setInstallingRepo] = useState(null);
  const [installingPack, setInstallingPack] = useState(null); // For Starter Packs tab

  // Presets State & Modal
  const [editingPreset, setEditingPreset] = useState(null);
  const [showInspectorModal, setShowInspectorModal] = useState(false);

  // Sandbox Tester states
  const [sandboxPrompt, setSandboxPrompt] = useState('Review this React component for accessibility issues.');
  const [sandboxSkill, setSandboxSkill] = useState('ux-ui');
  const [sandboxResult, setSandboxResult] = useState(null);

  // Settings State
  const [settingLinkMode, setSettingLinkMode] = useState('copy');
  const [settingAutoSync, setSettingAutoSync] = useState('true');
  const [systemInfo, setSystemInfo] = useState(null);

  useEffect(() => {
    fetch('/api/system/info').then(r => r.ok ? r.json() : null).then(d => { if (d) setSystemInfo(d); }).catch(() => {});
  }, []);

  // Form loading states
  const [newSkillUrl, setNewSkillUrl] = useState('');
  const [newSkillCategory, setNewSkillCategory] = useState('web');
  const [newSkillRule, setNewSkillRule] = useState('');
  const [loadingAction, setLoadingAction] = useState(null);
  const [mcpInputJson, setMcpInputJson] = useState('');

  const addLog = (msg, type = 'info') => {
    const time = new Date().toLocaleTimeString();
    setLogs(prev => [...prev.slice(-99), { time, msg, type }]);
  };

  useEffect(() => {
    const es = new EventSource('/api/events');
    es.onopen = () => { setSseConnected(true); addLog('SSE Connected (Live Sync Active)', 'success'); };
    es.addEventListener('status_update', (e) => { try { setAiStatus(JSON.parse(e.data)); } catch (err) {} });
    es.addEventListener('skills_update', (e) => { try { setSkillsData(JSON.parse(e.data)); } catch (err) {} });
    es.addEventListener('presets_update', (e) => { try { setPresetsList(JSON.parse(e.data)); } catch (err) {} });
    es.addEventListener('mcp_update', (e) => {
      try {
        const d = JSON.parse(e.data);
        setMcpConfig(d);
        setMcpInputJson(JSON.stringify(d, null, 2));
      } catch (err) {}
    });
    es.addEventListener('live_log', (e) => {
      try {
        const { jobId, line, type, label } = JSON.parse(e.data);
        setLiveTerminal(prev => {
          const newLines = [...prev.lines, { jobId, line, type, ts: new Date().toLocaleTimeString() }].slice(-300);
          const isActive = type !== 'done' ? true : false;
          return {
            lines: newLines,
            jobLabel: label || prev.jobLabel,
            active: prev.active ? type !== 'done' : true,
          };
        });
        setIsConsoleOpen(true); // auto-open terminal
        if (type === 'done') {
          setTimeout(() => setLiveTerminal(prev => ({ ...prev, active: false })), 500);
        }
        addLog(line, type === 'stdout' || type === 'done' ? 'info' : 'error');
      } catch (err) {}
    });
    es.onerror = () => setSseConnected(false);
    return () => es.close();
  }, []);

  const fetchData = async () => {
    try {
      const [sRes, kRes, mRes, cRes, pRes, mkRes, setRes] = await Promise.all([
        fetch('/api/status'), fetch('/api/skills'), fetch('/api/mcp'), fetch('/api/commands'), fetch('/api/presets'), fetch('/api/marketplace'), fetch('/api/settings')
      ]);
      if (sRes.ok) setAiStatus(await sRes.json());
      if (kRes.ok) setSkillsData(await kRes.json());
      if (mRes.ok) {
        const m = await mRes.json();
        setMcpConfig(m || { mcpServers: {} });
        setMcpInputJson(JSON.stringify(m || { mcpServers: {} }, null, 2));
      }
      if (cRes.ok) setCommandsList(await cRes.json());
      if (pRes.ok) setPresetsList(await pRes.json());
      if (mkRes.ok) setMarketplace(await mkRes.json());
      if (setRes.ok) {
        const s = await setRes.json();
        setSettingsData(s);
        if (s.linkMode) setSettingLinkMode(s.linkMode);
        if (s.autoSync) setSettingAutoSync(s.autoSync);
      }
    } catch (e) {
      addLog('Fetch error: ' + e.message, 'error');
    }
  };

  useEffect(() => {
    fetchData();
    fetchEngines();
    const interval = setInterval(() => {
      fetchEngines();
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Auto-scroll terminal to bottom when new lines arrive
  useEffect(() => {
    if (terminalEndRef.current && isConsoleOpen) {
      terminalEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [liveTerminal.lines, isConsoleOpen]);

  const handleUpdateAllRepos = async () => {
    setLoadingAction('update-all');
    try {
      const res = await fetch('/api/update', { method: 'POST' });
      const data = await res.json();
      addLog(data.output || 'Repos update triggered', data.success ? 'success' : 'error');
      showToast(data.success ? 'Git Update Successful' : 'Update Failed', data.output || 'Tüm submodule repoları GitHub üzerinden güncellendi.', data.success ? 'success' : 'error');
      fetchData();
    } catch (e) {
      addLog('Update error: ' + e.message, 'error');
      showToast('Update Failed', e.message, 'error');
    } finally {
      setLoadingAction(null);
    }
  };

  const handleInstallMarketplaceRepo = async (repoUrl, repoName) => {
    setInstallingRepo(repoUrl);
    try {
      const res = await fetch('/api/add-skill', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: repoUrl, category: 'core' })
      });
      const data = await res.json();
      addLog(data.output || `[${repoName}] kuruldu`, data.success ? 'success' : 'error');
      showToast(data.success ? 'Kurulum Tamamlandı' : 'Kurulum Hatası', data.output || `[${repoName}] başarıyla eklendi!`, data.success ? 'success' : 'error');
      if (data.success) fetchData();
    } catch (e) {
      showToast('Hata', e.message, 'error');
    } finally {
      setInstallingRepo(null);
    }
  };

  const allInstalledSkillsList = useMemo(() => {
    const list = [];
    Object.values(skillsData).forEach(cat => {
      if (cat.repos) cat.repos.forEach(r => list.push(r.name));
    });
    return Array.from(new Set(list));
  }, [skillsData]);

  const handleToggleLink = async (aiKey, currentState) => {
    setLoadingAction(`toggle-${aiKey}`);
    try {
      const res = await fetch('/api/toggle-link', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ai: aiKey, state: !currentState })
      });
      const data = await res.json();
      addLog(data.message, data.success ? 'success' : 'error');
      showToast(data.success ? 'Success' : 'Error', data.message, data.success ? 'success' : 'error');
      fetchData();
    } catch (e) {
      addLog('Error: ' + e.message, 'error');
    } finally {
      setLoadingAction(null);
    }
  };

  const handleToggleSkillDisabled = async (skillName) => {
    setLoadingAction(`disable-${skillName}`);
    try {
      const res = await fetch('/api/toggle-skill-disabled', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: skillName })
      });
      const data = await res.json();
      addLog(data.message, data.success ? 'success' : 'error');
      showToast(data.success ? 'Skill Toggle' : 'Error', data.message, data.success ? 'success' : 'error');
      fetchData();
    } catch (e) {
      addLog('Error: ' + e.message, 'error');
    } finally {
      setLoadingAction(null);
    }
  };

  const handleToggleSkillPersistent = async (skillName, currentPersistentState) => {
    setLoadingAction(`persistent-${skillName}`);
    try {
      const res = await fetch('/api/toggle-skill-persistent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: skillName, persistent: !currentPersistentState })
      });
      const data = await res.json();
      addLog(data.message, data.success ? 'success' : 'error');
      showToast(data.success ? 'Persistent Hook' : 'Error', data.message, data.success ? 'success' : 'error');
      fetchData();
    } catch (e) {
      addLog('Error: ' + e.message, 'error');
    } finally {
      setLoadingAction(null);
    }
  };

  const handleAddSkill = async (e) => {
    if (e) e.preventDefault();
    if (!newSkillUrl) return;
    setLoadingAction('add-skill');
    try {
      const res = await fetch('/api/add-skill', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: newSkillUrl, category: newSkillCategory, customRule: newSkillRule })
      });
      const data = await res.json();
      addLog(data.output, data.success ? 'success' : 'error');
      showToast(data.success ? 'Submodule Added' : 'Error', data.output, data.success ? 'success' : 'error');
      setNewSkillUrl('');
      setNewSkillRule('');
      fetchData();
    } catch (e) {
      addLog('Error: ' + e.message, 'error');
    } finally {
      setLoadingAction(null);
    }
  };

  const handleMarketplaceInstallSubmodule = async (repoUrl) => {
    setInstallingRepo(repoUrl);
    try {
      const res = await fetch('/api/add-skill', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: repoUrl, category: 'web' })
      });
      const data = await res.json();
      addLog(data.output, data.success ? 'success' : 'error');
      showToast(data.success ? 'Marketplace Install' : 'Error', data.output, data.success ? 'success' : 'error');
      fetchData();
      setActiveTab('skills');
    } catch (e) {
      addLog('Install error: ' + e.message, 'error');
      showToast('Install Failed', e.message, 'error');
    } finally {
      setInstallingRepo(null);
    }
  };

  const handleRemoveSkill = async (skillName) => {
    if (!confirm(`Remove [${skillName}] submodule?`)) return;
    setLoadingAction(`remove-${skillName}`);
    try {
      const res = await fetch('/api/remove-skill', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: skillName })
      });
      const data = await res.json();
      addLog(data.output, data.success ? 'success' : 'error');
      showToast(data.success ? 'Submodule Removed' : 'Error', data.output, data.success ? 'success' : 'error');
      fetchData();
    } catch (e) {
      addLog('Error: ' + e.message, 'error');
    } finally {
      setLoadingAction(null);
    }
  };

  const handleSearchGithubMarketplace = async (e) => {
    e.preventDefault();
    if (!githubQuery) return;
    setIsSearchingGithub(true);
    try {
      const res = await fetch(`/api/marketplace/search?q=${encodeURIComponent(githubQuery)}`);
      if (res.ok) {
        const items = await res.json();
        setMarketplace(items);
        addLog(`GitHub search completed for "${githubQuery}" (${items.length} repos found)`, 'success');
        showToast('GitHub Search', `Found ${items.length} repositories for "${githubQuery}"`, 'success');
      }
    } catch (e) {
      addLog('GitHub Search error: ' + e.message, 'error');
    } finally {
      setIsSearchingGithub(false);
    }
  };

  const handleSaveMcpAuthSecret = async (serverKey, envKey) => {
    const val = mcpAuthInputs[`${serverKey}_${envKey}`];
    if (!val) return;
    try {
      const res = await fetch('/api/mcp/auth/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ serverKey, envKey, authValue: val })
      });
      const data = await res.json();
      addLog(data.message, data.success ? 'success' : 'error');
      showToast('Auth Secret Saved', data.message, 'success');
      fetchData();
    } catch (e) {
      addLog('Auth save error: ' + e.message, 'error');
    }
  };

  const handleSaveMcpServerObject = (serverKey, serverObj) => {
    const current = { ...(mcpConfig.mcpServers || {}) };
    current[serverKey] = serverObj;
    const updated = { mcpServers: current };
    setMcpConfig(updated);
    setMcpInputJson(JSON.stringify(updated, null, 2));
    handleSaveMcpConfig(updated);
    setEditingMcpServer(null);
  };

  const handleRemoveMcpServer = (serverKey) => {
    if (!confirm(`Remove MCP Server [${serverKey}]?`)) return;
    const current = { ...(mcpConfig.mcpServers || {}) };
    delete current[serverKey];
    const updated = { mcpServers: current };
    setMcpConfig(updated);
    setMcpInputJson(JSON.stringify(updated, null, 2));
    handleSaveMcpConfig(updated);
  };

  const handleSaveMcpConfig = async (configObj) => {
    try {
      const target = configObj || JSON.parse(mcpInputJson);
      const res = await fetch('/api/mcp/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(target)
      });
      const data = await res.json();
      addLog(data.message, data.success ? 'success' : 'error');
      showToast('MCP Saved', data.message, 'success');
      fetchData();
    } catch (e) {
      addLog('MCP Error: ' + e.message, 'error');
    }
  };

  const handleActivatePreset = async (preset) => {
    setLoadingAction(`preset-${preset.id}`);
    try {
      const isDeactivating = preset.active;
      const res = await fetch('/api/presets/activate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ presetId: isDeactivating ? 'all' : preset.id })
      });
      const data = await res.json();
      addLog(data.message, data.success ? 'success' : 'error');
      showToast(data.success ? (isDeactivating ? 'Mod Devre Dışı' : 'Mod Aktifleştirildi') : 'Hata', data.message, data.success ? 'success' : 'error');
      fetchData();
    } catch (e) {
      addLog('Preset error: ' + e.message, 'error');
    } finally {
      setLoadingAction(null);
    }
  };

  const handleSavePresetObj = async (presetObj) => {
    try {
      const res = await fetch('/api/presets/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(presetObj)
      });
      const data = await res.json();
      addLog(data.message, data.success ? 'success' : 'error');
      showToast('Preset Saved', data.message, 'success');
      setEditingPreset(null);
      fetchData();
    } catch (e) {
      addLog('Save preset error: ' + e.message, 'error');
    }
  };

  const handleDeletePreset = async (presetId) => {
    if (!confirm('Delete this preset?')) return;
    try {
      const res = await fetch('/api/presets/delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ presetId })
      });
      const data = await res.json();
      addLog(data.message, data.success ? 'success' : 'error');
      showToast('Preset Deleted', data.message, 'success');
      fetchData();
    } catch (e) {
      addLog('Delete preset error: ' + e.message, 'error');
    }
  };

  const handleSaveSettings = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/settings/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ linkMode: settingLinkMode, autoSync: settingAutoSync, theme: 'dark' })
      });
      const data = await res.json();
      addLog(data.message, data.success ? 'success' : 'error');
      showToast('Settings Saved', data.message, 'success');
      fetchData();
    } catch (e) {
      addLog('Settings save error: ' + e.message, 'error');
    }
  };

  const handleRunSandbox = async () => {
    setLoadingAction('sandbox-test');
    try {
      const res = await fetch('/api/sandbox/test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: sandboxPrompt, skillName: sandboxSkill })
      });
      const data = await res.json();
      setSandboxResult(data);
      addLog('Sandbox test executed for ' + sandboxSkill, 'success');
      showToast('Sandbox Completed', `Tokens generated: ${data.tokenCount}`, 'success');
    } catch (e) {
      addLog('Sandbox error: ' + e.message, 'error');
    } finally {
      setLoadingAction(null);
    }
  };

  const handleSaveCommandContent = async (fileName, newContent) => {
    try {
      const res = await fetch('/api/commands/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fileName, content: newContent })
      });
      const data = await res.json();
      addLog(data.message, data.success ? 'success' : 'error');
      showToast('Command Saved', data.message, 'success');
      setEditorModal(null);
      fetchData();
    } catch (e) {
      addLog('Save error: ' + e.message, 'error');
    }
  };

  const installedCount = useMemo(() => Object.values(aiStatus).filter(a => a.installed).length, [aiStatus]);
  const linkedCount = useMemo(() => Object.values(aiStatus).filter(a => a.linked).length, [aiStatus]);
  const mcpServersList = useMemo(() => Object.entries(mcpConfig.mcpServers || {}), [mcpConfig]);

  return (
    <div className="flex h-screen bg-slate-950 text-slate-100 font-sans overflow-hidden">
      <ToastContainer toasts={toasts} onDismiss={id => setToasts(prev => prev.filter(t => t.id !== id))} />

      {/* SIDEBAR */}
      <aside className="w-64 border-r border-slate-800 bg-slate-900/60 flex flex-col justify-between">
        <div>
          <div className="p-4 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-lg bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center">
                <Icons.Zap />
              </div>
              <div>
                <h1 className="font-semibold text-sm tracking-tight text-white flex items-center space-x-1">
                  <span>🧠 Awesome Brain Manager</span>
                </h1>
                <p className="text-[10px] text-indigo-400 font-mono">Universal Agent Engine ({Object.keys(aiStatus).length} Providers)</p>
              </div>
            </div>
            <button onClick={() => setLang(l => l === 'tr' ? 'en' : 'tr')} className="px-2 py-1 rounded bg-slate-800 text-[10px] font-mono text-indigo-300 hover:bg-slate-700 transition flex items-center space-x-1">
              <Icons.Globe /> <span>{t.langToggle}</span>
            </button>
          </div>

          <nav className="p-2 space-y-1">
            {/* --- CORE NAV --- */}
            <button onClick={() => setActiveTab('dashboard')} className={`w-full flex items-center space-x-3 px-3 py-2 rounded-md text-xs font-medium transition ${activeTab === 'dashboard' ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'}`}>
              <Icons.Grid /> <span>{t.dashboard}</span>
            </button>
            <button onClick={() => setActiveTab('providers')} className={`w-full flex items-center space-x-3 px-3 py-2 rounded-md text-xs font-medium transition ${activeTab === 'providers' ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'}`}>
              <Icons.Zap /> <span>{t.providers} ({installedCount}/{Object.keys(aiStatus).length})</span>
            </button>
            <button onClick={() => setActiveTab('starterPacks')} className={`w-full flex items-center space-x-3 px-3 py-2 rounded-md text-xs font-medium transition ${activeTab === 'starterPacks' ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'}`}>
              <Icons.ShoppingBag /> <span>{t.starterPacks}</span>
            </button>
            {/* --- DIVIDER --- */}
            <div className="pt-1 pb-0.5 px-3">
              <div className="border-t border-slate-800/80" />
            </div>
            <button onClick={() => setActiveTab('skills')} className={`w-full flex items-center space-x-3 px-3 py-2 rounded-md text-xs font-medium transition ${activeTab === 'skills' ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'}`}>
              <Icons.Code /> <span>{t.skills}</span>
            </button>
            <button onClick={() => setActiveTab('mcp')} className={`w-full flex items-center space-x-3 px-3 py-2 rounded-md text-xs font-medium transition ${activeTab === 'mcp' ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'}`}>
              <Icons.Server /> <span>{t.mcp} + Çekirdek ({mcpServersList.length})</span>
            </button>
            <button onClick={() => setActiveTab('commands')} className={`w-full flex items-center space-x-3 px-3 py-2 rounded-md text-xs font-medium transition ${activeTab === 'commands' ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'}`}>
              <Icons.Terminal /> <span>{t.commands}</span>
            </button>
            <button onClick={() => setActiveTab('presets')} className={`w-full flex items-center space-x-3 px-3 py-2 rounded-md text-xs font-medium transition ${activeTab === 'presets' ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'}`}>
              <Icons.Sliders /> <span>{t.presets}</span>
            </button>
            <button onClick={() => setActiveTab('sandbox')} className={`w-full flex items-center space-x-3 px-3 py-2 rounded-md text-xs font-medium transition ${activeTab === 'sandbox' ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'}`}>
              <Icons.Play /> <span>{t.sandbox}</span>
            </button>
            <button onClick={() => setActiveTab('marketplace')} className={`w-full flex items-center space-x-3 px-3 py-2 rounded-md text-xs font-medium transition ${activeTab === 'marketplace' ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'}`}>
              <Icons.Search /> <span>{t.marketplace}</span>
            </button>
            <button onClick={() => setActiveTab('settings')} className={`w-full flex items-center space-x-3 px-3 py-2 rounded-md text-xs font-medium transition ${activeTab === 'settings' ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'}`}>
              <Icons.Settings /> <span>{t.settings}</span>
            </button>
          </nav>
        </div>

        <div className="p-3 border-t border-slate-800">
          <button onClick={() => setIsConsoleOpen(!isConsoleOpen)} className="w-full flex items-center justify-between px-3 py-2 rounded bg-slate-900 border border-slate-800 text-slate-300 text-xs font-mono hover:border-slate-700 transition">
            <span className="flex items-center space-x-2">
              <Icons.Terminal />
              <span>Terminal</span>
              {liveTerminal.active && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />}
            </span>
            <span className="px-1.5 py-0.5 rounded bg-slate-800 text-[10px]">{liveTerminal.lines.length || logs.length}</span>
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 flex flex-col overflow-hidden bg-slate-950">
        <header className="h-14 border-b border-slate-800 px-6 flex items-center justify-between bg-slate-900/30">
          <div className="flex items-center space-x-3">
            <h2 className="text-sm font-semibold text-white capitalize">{t[activeTab] || activeTab}</h2>
            <span className="text-xs text-slate-500 font-mono">| {linkedCount} Provider {t.linked}</span>
          </div>
          <div className="flex items-center space-x-2">
            <button onClick={() => setShowInspectorModal(true)} className="px-3 py-1.5 rounded-md bg-amber-500/20 border border-amber-500/30 hover:bg-amber-500/30 text-amber-300 text-xs font-medium flex items-center space-x-1.5 transition">
              <span>⚙️</span> <span>Hooks & Settings Inspector</span>
            </button>
            <button onClick={handleUpdateAllRepos} disabled={loadingAction === 'update-all'} className="px-3 py-1.5 rounded-md bg-indigo-600/20 border border-indigo-500/30 hover:bg-indigo-600/30 text-indigo-300 text-xs font-medium flex items-center space-x-2 transition">
              <Icons.Refresh /> <span>{loadingAction === 'update-all' ? 'Güncelleniyor...' : t.updateAll}</span>
            </button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* ===== TAB: DASHBOARD (STATS REPORT) ===== */}
          {activeTab === 'dashboard' && (() => {
            const totalProviders = Object.keys(aiStatus).length;
            const installedProviders = Object.values(aiStatus).filter(i => i.installed).length;
            const linkedProviders = Object.values(aiStatus).filter(i => i.linked).length;
            const allSkillRepos = Object.values(skillsData).flatMap(c => c.repos);
            const activeSkillRepos = allSkillRepos.filter(r => !r.meta?.disabled);
            const now = new Date();
            return (
              <div className="space-y-6">
                {/* HEADER GREETING */}
                <div className="p-5 rounded-2xl bg-gradient-to-br from-indigo-950/60 via-slate-900/80 to-slate-950 border border-indigo-500/20 flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-bold text-white">🧠 Agent Brain Manager</h2>
                    <p className="text-xs text-slate-400 mt-1">{now.toLocaleDateString('tr-TR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })} — Sistem durumu özeti</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-black text-indigo-400">{linkedProviders}<span className="text-base text-slate-500">/{totalProviders}</span></div>
                    <div className="text-[10px] text-slate-400 font-mono uppercase tracking-wider">Provider Bağlı</div>
                  </div>
                </div>

                {/* STAT CARDS */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { label: 'Yüklü AI Tool', value: installedProviders, total: totalProviders, icon: '🖥️', color: 'emerald', sub: `${totalProviders - installedProviders} algılanmadı` },
                    { label: 'Bağlı Provider', value: linkedProviders, total: totalProviders, icon: '🔗', color: 'indigo', sub: `${totalProviders - linkedProviders} bağlantısız` },
                    { label: 'Skill Reposu', value: allSkillRepos.length, total: null, icon: '📦', color: 'violet', sub: `${activeSkillRepos.length} aktif` },
                    { label: 'MCP Sunucu', value: mcpServersList.length, total: null, icon: '⚡', color: 'amber', sub: 'Kayıtlı sunucu' },
                  ].map(card => (
                    <div key={card.label} className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex flex-col space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xl">{card.icon}</span>
                        <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                          card.color === 'emerald' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                          card.color === 'indigo' ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20' :
                          card.color === 'violet' ? 'bg-violet-500/10 text-violet-400 border border-violet-500/20' :
                          'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                        }`}>{card.sub}</span>
                      </div>
                      <div>
                        <div className="text-2xl font-black text-slate-100">
                          {card.value}{card.total ? <span className="text-sm text-slate-500">/{card.total}</span> : ''}
                        </div>
                        <div className="text-[11px] text-slate-400 font-medium">{card.label}</div>
                      </div>
                      {card.total && (
                        <div className="w-full bg-slate-800 rounded-full h-1">
                          <div className={`h-1 rounded-full ${
                            card.color === 'emerald' ? 'bg-emerald-500' : 'bg-indigo-500'
                          }`} style={{ width: `${Math.round((card.value / card.total) * 100)}%` }} />
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* PROVIDER STATUS QUICK VIEW */}
                <div className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center space-x-2">
                      <Icons.Zap /><span>AI Provider Durumu</span>
                    </h3>
                    <button onClick={() => setActiveTab('providers')} className="text-[11px] text-indigo-400 hover:text-indigo-300 font-mono transition">Tümünü Yönet →</button>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                    {Object.entries(aiStatus).map(([key, info]) => (
                      <div key={key} className={`px-3 py-2 rounded-lg border flex items-center justify-between ${
                        info.linked ? 'bg-emerald-950/30 border-emerald-500/20' :
                        info.installed ? 'bg-slate-900 border-slate-700' :
                        'bg-slate-950 border-slate-800 opacity-50'
                      }`}>
                        <span className="flex items-center space-x-1.5 min-w-0">
                          <ProviderLogo k={key} className="w-4 h-4 flex-shrink-0" />
                          <span className="text-[11px] font-semibold text-slate-200 truncate">{info.name}</span>
                        </span>
                        <span className={`w-2 h-2 rounded-full flex-shrink-0 ml-2 ${
                          info.linked ? 'bg-emerald-400' : info.installed ? 'bg-amber-400' : 'bg-slate-600'
                        }`} />
                      </div>
                    ))}
                  </div>
                </div>

                {/* SKILL REPOS SUMMARY */}
                <div className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center space-x-2">
                      <Icons.Code /><span>Kurulu Skill Repoları</span>
                    </h3>
                    <button onClick={() => setActiveTab('skills')} className="text-[11px] text-indigo-400 hover:text-indigo-300 font-mono transition">Skills Hub →</button>
                  </div>
                  {allSkillRepos.length === 0 ? (
                    <div className="text-center py-8 text-slate-500">
                      <div className="text-3xl mb-2">📭</div>
                      <p className="text-xs">Henüz kurulu repo yok.</p>
                      <button onClick={() => setActiveTab('starterPacks')} className="mt-3 px-4 py-1.5 rounded bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium transition">Başlangıç Paketi Kur</button>
                    </div>
                  ) : (
                    <div className="space-y-1.5">
                      {Object.entries(skillsData).map(([catKey, cat]) => cat.repos.length > 0 && (
                        <div key={catKey} className="flex items-center justify-between px-3 py-2 rounded-lg bg-slate-950 border border-slate-800">
                          <span className="text-xs text-slate-300 font-medium">{cat.title}</span>
                          <div className="flex items-center space-x-2">
                            <span className="text-[10px] font-mono text-slate-500">{cat.repos.filter(r => !r.meta?.disabled).length}/{cat.repos.length} aktif</span>
                            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* QUICK ACTIONS */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {[
                    { label: 'AI Providers Yönet', icon: <Icons.Zap />, tab: 'providers', color: 'indigo' },
                    { label: 'Başlangıç Paketi Kur', icon: <Icons.ShoppingBag />, tab: 'starterPacks', color: 'violet' },
                    { label: 'MCP Sunucu Ekle', icon: <Icons.Server />, tab: 'mcp', color: 'emerald' },
                    { label: 'Preset Oluştur', icon: <Icons.Sliders />, tab: 'presets', color: 'amber' },
                  ].map(a => (
                    <button key={a.tab} onClick={() => setActiveTab(a.tab)} className={`p-3 rounded-xl border flex flex-col items-start space-y-2 transition hover:scale-[1.02] ${
                      a.color === 'indigo' ? 'bg-indigo-950/30 border-indigo-500/20 hover:border-indigo-500/40' :
                      a.color === 'violet' ? 'bg-violet-950/30 border-violet-500/20 hover:border-violet-500/40' :
                      a.color === 'emerald' ? 'bg-emerald-950/30 border-emerald-500/20 hover:border-emerald-500/40' :
                      'bg-amber-950/30 border-amber-500/20 hover:border-amber-500/40'
                    }`}>
                      <span className={`${
                        a.color === 'indigo' ? 'text-indigo-400' :
                        a.color === 'violet' ? 'text-violet-400' :
                        a.color === 'emerald' ? 'text-emerald-400' : 'text-amber-400'
                      }`}>{a.icon}</span>
                      <span className="text-[11px] font-medium text-slate-200 text-left leading-tight">{a.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            );
          })()}

          {/* ===== TAB: AI PROVIDERS ===== */}
          {activeTab === 'providers' && (
            <div className="space-y-6">
              <div className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
                <h3 className="text-sm font-semibold text-slate-100">AI Provider Bağlantıları</h3>
                <p className="text-xs text-slate-400">Yüklü AI araçlarına skill klasörlerini bağlayın veya bağlantıyı kesin. Her provider için yol ve durum otomatik algılanır.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {Object.entries(aiStatus).map(([key, info]) => (
                  <div key={key} className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition flex flex-col justify-between space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-2.5 min-w-0">
                        <span className="w-9 h-9 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-center flex-shrink-0">
                          <ProviderLogo k={key} className="w-5 h-5" />
                        </span>
                        <div className="min-w-0">
                          <h4 className="text-sm font-semibold text-slate-200 truncate">{info.name}</h4>
                          <p className="text-[11px] font-mono text-slate-500 truncate max-w-[140px]">{info.path}</p>
                        </div>
                      </div>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-medium border ${info.installed ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-slate-800 text-slate-500 border-slate-700'}`}>
                        {info.installed ? t.installed : t.notInstalled}
                      </span>
                    </div>
                    <div className="flex items-center justify-between pt-2 border-t border-slate-800/60">
                      <span className={`text-xs flex items-center space-x-1 ${info.linked ? 'text-emerald-400' : 'text-slate-500'}`}>
                        {info.linked ? <><Icons.Link /> <span>{t.linked}</span></> : <><Icons.Unlink /> <span>{t.unlinked}</span></>}
                      </span>
                      <button
                        onClick={() => {
                          if (!info.installed && !info.linked) {
                            showToast('Yüklü Değil', `${info.name} bilgisayarınızda yüklü olmadığı için bağlantı kurulamaz. Lütfen önce uygulamayı kurun.`, 'error');
                            addLog(`[UYARI] ${info.name} yüklü değil, bağlantı reddedildi.`, 'error');
                            return;
                          }
                          handleToggleLink(key, info.linked);
                        }}
                        disabled={loadingAction === `toggle-${key}`}
                        title={!info.installed && !info.linked ? `${info.name} bilgisayarınızda yüklü değil` : ''}
                        className={`px-3 py-1 rounded text-xs font-medium transition ${
                          info.linked
                            ? 'bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 border border-rose-500/20'
                            : info.installed
                            ? 'bg-indigo-600 text-white hover:bg-indigo-500 shadow-sm shadow-indigo-500/20'
                            : 'bg-slate-800/80 text-slate-500 border border-slate-700/50 cursor-not-allowed hover:bg-slate-800'
                        }`}
                      >
                        {info.linked ? t.disconnect : t.connect}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ===== TAB: STARTER PACKS ===== */}
          {activeTab === 'starterPacks' && (() => {
            const starterKits = [
              {
                id: 'fullstack-dev',
                emoji: '🚀',
                label: 'Full-Stack Geliştirici Paketi',
                desc: 'Web, API ve UI/UX geliştirme için eksiksiz başlangıç seti. TDD, kod denetimi, tasarım standartları.',
                badge: 'Önerilen',
                badgeColor: 'indigo',
                repos: [
                  { name: 'obra/superpowers', label: 'Superpowers (TDD & Workflow)', url: 'https://github.com/obra/superpowers', tag: 'core' },
                  { name: 'nextlevelbuilder/ui-ux-pro-max-skill', label: 'UI/UX Pro Max', url: 'https://github.com/nextlevelbuilder/ui-ux-pro-max-skill', tag: 'web' },
                  { name: 'JuliusBrussee/caveman', label: 'Caveman (Token Tasarrufu)', url: 'https://github.com/JuliusBrussee/caveman', tag: 'core' },
                  { name: 'multica-ai/andrej-karpathy-skills', label: 'Karpathy Guardrails', url: 'https://github.com/multica-ai/andrej-karpathy-skills', tag: 'core' },
                ]
              },
              {
                id: 'security-audit',
                emoji: '🛡️',
                label: 'Güvenlik & Denetim Paketi',
                desc: 'OWASP Top 10, STRIDE tehdit modelleme ve siber güvenlik denetimi için kapsamlı set.',
                badge: 'Güvenlik',
                badgeColor: 'rose',
                repos: [
                  { name: 'mukul975/Anthropic-Cybersecurity-Skills', label: 'Cybersecurity Skills', url: 'https://github.com/mukul975/Anthropic-Cybersecurity-Skills', tag: 'security' },
                  { name: 'K-Dense-AI/scientific-agent-skills', label: 'Scientific Agent Skills', url: 'https://github.com/K-Dense-AI/scientific-agent-skills', tag: 'core' },
                  { name: 'obra/superpowers', label: 'Superpowers (TDD)', url: 'https://github.com/obra/superpowers', tag: 'core' },
                ]
              },
              {
                id: 'creative-studio',
                emoji: '🎨',
                label: 'Kreatif & Tasarım Stüdyosu',
                desc: 'UI/UX, oyun geliştirme, marketing copywriting ve görsel içerik üretimi için hazır kit.',
                badge: 'Kreatif',
                badgeColor: 'violet',
                repos: [
                  { name: 'nextlevelbuilder/ui-ux-pro-max-skill', label: 'UI/UX Pro Max', url: 'https://github.com/nextlevelbuilder/ui-ux-pro-max-skill', tag: 'web' },
                  { name: 'Donchitos/Claude-Code-Game-Studios', label: 'Game Studio', url: 'https://github.com/Donchitos/Claude-Code-Game-Studios', tag: 'game' },
                  { name: 'coreyhaines31/marketingskills', label: 'Marketing Skills (PAS/AIDA)', url: 'https://github.com/coreyhaines31/marketingskills', tag: 'marketing' },
                  { name: 'plugin87/ux-ui-agent-skills', label: 'UX Agent Skills', url: 'https://github.com/plugin87/ux-ui-agent-skills', tag: 'web' },
                ]
              },
              {
                id: 'ai-memory-engine',
                emoji: '🧠',
                label: 'AI Bellek & Bağlam Motoru',
                desc: 'Uzun süreli bellek, bağlam yönetimi ve çoklu oturum sürekliliği için temel çekirdek bileşenler.',
                badge: 'Çekirdek',
                badgeColor: 'emerald',
                repos: [
                  { name: 'thedotmack/claude-mem', label: 'Claude-Mem (Kalıcı Bellek)', url: 'https://github.com/thedotmack/claude-mem', tag: 'core' },
                  { name: 'OthmanAdi/planning-with-files', label: 'Planning With Files', url: 'https://github.com/OthmanAdi/planning-with-files', tag: 'core' },
                  { name: 'garrytan/gstack', label: 'G-Stack', url: 'https://github.com/garrytan/gstack', tag: 'core' },
                  { name: 'JuliusBrussee/caveman', label: 'Caveman (Token Tasarrufu)', url: 'https://github.com/JuliusBrussee/caveman', tag: 'core' },
                ]
              },
              {
                id: 'mobile-dev',
                emoji: '📱',
                label: 'Mobil Geliştirici Paketi',
                desc: 'Flutter, React Native ve cross-platform mobil uygulama geliştirme için optimize edilmiş set.',
                badge: 'Mobil',
                badgeColor: 'amber',
                repos: [
                  { name: 'VoltAgent/awesome-agent-skills', label: 'Awesome Agent Skills', url: 'https://github.com/VoltAgent/awesome-agent-skills', tag: 'mobile' },
                  { name: 'obra/superpowers', label: 'Superpowers (TDD)', url: 'https://github.com/obra/superpowers', tag: 'core' },
                  { name: 'nextlevelbuilder/ui-ux-pro-max-skill', label: 'UI/UX Pro Max', url: 'https://github.com/nextlevelbuilder/ui-ux-pro-max-skill', tag: 'web' },
                ]
              },
              {
                id: 'data-science',
                emoji: '📊',
                label: 'Veri Bilimi & Araştırma Paketi',
                desc: 'Bilimsel analiz, veri görselleştirme ve akademik araştırma için geliştirilmiş yetenek seti.',
                badge: 'Bilim',
                badgeColor: 'cyan',
                repos: [
                  { name: 'K-Dense-AI/scientific-agent-skills', label: 'Scientific Agent Skills', url: 'https://github.com/K-Dense-AI/scientific-agent-skills', tag: 'core' },
                  { name: 'multica-ai/andrej-karpathy-skills', label: 'Karpathy Guardrails', url: 'https://github.com/multica-ai/andrej-karpathy-skills', tag: 'core' },
                  { name: 'Egonex-AI/Understand-Anything', label: 'Understand Anything', url: 'https://github.com/Egonex-AI/Understand-Anything', tag: 'core' },
                ]
              },
            ];

            const handleInstallPack = async (kit) => {
              setInstallingPack(kit.id);
              for (const repo of kit.repos) {
                try {
                  await fetch('/api/add-skill', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ url: repo.url, category: repo.tag })
                  });
                } catch(e) { /* continue */ }
              }
              addLog(`✅ "${kit.label}" paketi işlemleri başlatıldı (${kit.repos.length} repo)`);
              setInstallingPack(null);
            };

            return (
              <div className="space-y-6">
                <div className="p-5 rounded-xl bg-gradient-to-r from-violet-950/40 to-indigo-950/40 border border-violet-500/20 flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-white flex items-center space-x-2"><Icons.ShoppingBag /><span>Başlangıç Paketleri (Skill Kits)</span></h3>
                    <p className="text-xs text-slate-400 mt-1">Her paket birden fazla uyumlu repoyu kapsar. Tek tıkla tüm paket kurulur.</p>
                  </div>
                  <button onClick={() => setActiveTab('marketplace')} className="px-3 py-1.5 rounded-lg bg-violet-600/20 border border-violet-500/30 text-violet-300 text-xs font-medium hover:bg-violet-600/30 transition flex items-center space-x-1">
                    <Icons.Search /> <span>Marketplace'e Git</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                  {starterKits.map(kit => (
                    <div key={kit.id} className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition flex flex-col space-y-3">
                      {/* Kit Header */}
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-2">
                          <span className="text-2xl">{kit.emoji}</span>
                          <div>
                            <h4 className="text-xs font-bold text-slate-100 leading-tight">{kit.label}</h4>
                            <span className={`inline-block mt-0.5 px-1.5 py-0.2 rounded text-[9px] font-mono font-semibold ${
                              kit.badgeColor === 'indigo' ? 'bg-indigo-500/15 text-indigo-300 border border-indigo-500/25' :
                              kit.badgeColor === 'rose' ? 'bg-rose-500/15 text-rose-300 border border-rose-500/25' :
                              kit.badgeColor === 'violet' ? 'bg-violet-500/15 text-violet-300 border border-violet-500/25' :
                              kit.badgeColor === 'emerald' ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/25' :
                              kit.badgeColor === 'amber' ? 'bg-amber-500/15 text-amber-300 border border-amber-500/25' :
                              'bg-cyan-500/15 text-cyan-300 border border-cyan-500/25'
                            }`}>{kit.badge}</span>
                          </div>
                        </div>
                        <span className="text-[10px] font-mono text-slate-500 bg-slate-800 px-2 py-0.5 rounded-full">{kit.repos.length} repo</span>
                      </div>

                      <p className="text-[11px] text-slate-400 leading-snug">{kit.desc}</p>

                      {/* Repo list */}
                      <div className="space-y-1">
                        {kit.repos.map(repo => (
                          <div key={repo.name} className="flex items-center space-x-2 px-2 py-1.5 rounded bg-slate-950 border border-slate-800/80">
                            <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                              repo.tag === 'core' ? 'bg-indigo-400' :
                              repo.tag === 'web' ? 'bg-emerald-400' :
                              repo.tag === 'security' ? 'bg-rose-400' :
                              repo.tag === 'game' ? 'bg-violet-400' :
                              repo.tag === 'mobile' ? 'bg-amber-400' : 'bg-cyan-400'
                            }`} />
                            <span className="text-[10px] text-slate-300 font-mono truncate flex-1">{repo.label}</span>
                            <span className={`text-[9px] px-1 rounded font-mono ${
                              repo.tag === 'core' ? 'text-indigo-400' :
                              repo.tag === 'web' ? 'text-emerald-400' :
                              repo.tag === 'security' ? 'text-rose-400' :
                              repo.tag === 'game' ? 'text-violet-400' :
                              repo.tag === 'mobile' ? 'text-amber-400' : 'text-cyan-400'
                            }`}>{repo.tag}</span>
                          </div>
                        ))}
                      </div>

                      {/* Install button */}
                      <button
                        onClick={() => handleInstallPack(kit)}
                        disabled={installingPack === kit.id}
                        className={`w-full py-2 rounded-lg text-xs font-semibold transition flex items-center justify-center space-x-2 ${
                          installingPack === kit.id
                            ? 'bg-slate-700 text-slate-400 cursor-not-allowed'
                            : 'bg-indigo-600 hover:bg-indigo-500 text-white'
                        }`}
                      >
                        {installingPack === kit.id ? (
                          <><Icons.Refresh /><span>Kuruluyor ({kit.repos.length} repo)...</span></>
                        ) : (
                          <><Icons.Plus /><span>Paketi Kur ({kit.repos.length} Repo)</span></>
                        )}
                      </button>
                    </div>
                  ))}
                </div>

                {/* MANUAL ADD */}
                <div className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-3">
                  <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{t.addSkill}</h3>
                  <form onSubmit={handleAddSkill} className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <input type="text" placeholder={t.repoUrl} value={newSkillUrl} onChange={e => setNewSkillUrl(e.target.value)} className="px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-xs font-mono text-slate-200 focus:outline-none focus:border-indigo-500" required />
                    <select value={newSkillCategory} onChange={e => setNewSkillCategory(e.target.value)} className="px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-indigo-500">
                      <option value="core">Core</option>
                      <option value="web">Web & UI/UX</option>
                      <option value="mobile">Mobile</option>
                      <option value="game">Game Studio</option>
                      <option value="security">Security</option>
                    </select>
                    <button type="submit" disabled={loadingAction === 'add-skill'} className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-medium transition flex items-center justify-center space-x-2">
                      <Icons.Plus /> <span>{t.addBtn}</span>
                    </button>
                  </form>
                </div>
              </div>
            );
          })()}

          {/* TAB: SKILLS HUB WITH CATEGORY FILTERS & SEARCH BAR */}
          {activeTab === 'skills' && (
            <div className="space-y-6">
              {/* FILTER BAR */}
              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex flex-wrap items-center gap-1.5">
                  <button onClick={() => setSkillsCategoryFilter('all')} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${skillsCategoryFilter === 'all' ? 'bg-indigo-600 text-white' : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'}`}>
                    {t.allCategories}
                  </button>
                  {Object.entries(skillsData).map(([catKey, cat]) => (
                    <button key={catKey} onClick={() => setSkillsCategoryFilter(catKey)} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${skillsCategoryFilter === catKey ? 'bg-indigo-600 text-white' : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'}`}>
                      {cat.title} ({cat.repos.length})
                    </button>
                  ))}
                </div>

                <div className="relative w-full md:w-64">
                  <input
                    type="text"
                    placeholder="Skill Ara / Search..."
                    value={skillsSearchQuery}
                    onChange={e => setSkillsSearchQuery(e.target.value)}
                    className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs font-mono text-slate-200 focus:outline-none focus:border-indigo-500"
                  />
                  <div className="absolute left-2.5 top-2 text-slate-500"><Icons.Search /></div>
                </div>
              </div>

              {/* CATEGORIES GRID */}
              {Object.entries(skillsData)
                .filter(([catKey]) => skillsCategoryFilter === 'all' || skillsCategoryFilter === catKey)
                .map(([catKey, cat]) => {
                  const filteredRepos = cat.repos.filter(r =>
                    !skillsSearchQuery ||
                    r.name.toLowerCase().includes(skillsSearchQuery.toLowerCase()) ||
                    r.tag.toLowerCase().includes(skillsSearchQuery.toLowerCase())
                  );

                  if (filteredRepos.length === 0 && skillsSearchQuery) return null;

                  return (
                    <div key={catKey} className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-base font-semibold text-slate-100">{cat.title}</h3>
                          <p className="text-xs text-indigo-400 font-mono mt-0.5">{cat.command}</p>
                        </div>
                        <span className="px-2.5 py-1 rounded-full bg-slate-800 border border-slate-700 text-xs font-mono text-slate-300">{filteredRepos.length} Repos</span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {filteredRepos.map(r => (
                          <div key={r.name} className={`p-3.5 rounded-lg border flex items-center justify-between transition ${r.meta?.disabled ? 'bg-slate-950/40 border-slate-900 opacity-60' : 'bg-slate-950 border-slate-800 hover:border-slate-700'}`}>
                            <div>
                              <div className="flex items-center space-x-2">
                                <span className="font-mono text-xs font-semibold text-indigo-300">{r.name}</span>
                                <span className="px-1.5 py-0.2 rounded bg-slate-800 text-[10px] font-mono text-slate-400">{r.tag}</span>
                                {['claude-mem', 'graphify', 'understand-anything'].includes(r.name) && (
                                  <span className="px-2 py-0.5 rounded bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 font-mono text-[10px] flex items-center space-x-1">
                                    <Icons.Cpu /> <span>Arka Plan Servisli Engine</span>
                                  </span>
                                )}
                                {r.meta?.disabled && <span className="px-1.5 py-0.2 rounded bg-rose-500/10 text-rose-400 border border-rose-500/20 font-mono text-[10px]">Disabled</span>}
                              </div>
                              <p className="text-xs text-slate-300 mt-1 leading-snug font-sans max-w-sm line-clamp-2">
                                {r.meta?.description && r.meta.description !== 'Açıklama belirtilmemiş' ? r.meta.description :
                                 r.name.includes('ux-ui') ? 'WCAG 2.2 AA ve OKLCH renk paletli UI/UX tasarım standartları.' :
                                 r.name.includes('caveman') ? 'Minimalist AI iletişim protokolü (%40-60 token tasarrufu).' :
                                 r.name.includes('karpathy') ? 'Kod geliştirmede muhafazakar Karpathy guardrails doğrulaması.' :
                                 r.name.includes('security') ? 'OWASP Top 10 ve STRIDE tehdit denetim motoru.' :
                                 r.name.includes('game') ? '60 FPS performans ve Juice oyun geliştirme şablonları.' :
                                 r.name.includes('marketing') ? 'PAS/AIDA metin yazarlığı, ASO ve CRO optimizasyonu.' :
                                 'AI ajanı için geliştirilmiş özel yetenek seti.'}
                              </p>
                              <p className="text-[10px] font-mono text-indigo-400/80 truncate max-w-xs mt-1">{r.url}</p>
                            </div>
                            <div className="flex items-center space-x-1">
                              {['claude-mem', 'graphify', 'understand-anything'].includes(r.name) && (
                                <button
                                  onClick={() => setActiveTab('mcp')}
                                  className="px-2 py-1 rounded bg-indigo-600/20 hover:bg-indigo-600/40 border border-indigo-500/30 text-indigo-300 text-[10px] font-mono transition flex items-center space-x-1"
                                  title="Çekirdek Servisler (MCP sekmesi)"
                                >
                                  <Icons.Cpu /> <span>Servise Git</span>
                                </button>
                              )}
                              <button
                                onClick={() => handleToggleSkillPersistent(r.name, r.meta?.isPersistent)}
                                disabled={loadingAction === `persistent-${r.name}`}
                                className={`px-2 py-1 rounded text-[10px] font-mono font-medium transition flex items-center space-x-1 ${
                                  r.meta?.isPersistent
                                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm shadow-amber-500/20 font-bold'
                                    : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-slate-200 border border-slate-700/60'
                                }`}
                                title={r.meta?.isPersistent ? 'Sürekli Hook (SessionStart & Prompt Submit aktif)' : 'İsteğe Bağlı (On-Demand)'}
                              >
                                <span>⚡</span>
                                <span>{r.meta?.isPersistent ? 'Sürekli Hook' : 'İsteğe Bağlı'}</span>
                              </button>
                              <button onClick={() => handleToggleSkillDisabled(r.name)} className={`p-1.5 rounded transition ${r.meta?.disabled ? 'bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20' : 'bg-slate-800 text-slate-400 hover:text-white'}`} title={r.meta?.disabled ? t.enableSkill : t.disableSkill}>
                                <Icons.Power />
                              </button>
                              <button onClick={() => setEditorModal({ title: r.name, fileName: 'SKILL.md', initialContent: r.meta?.content || `# ${r.name}` })} className="p-1.5 rounded hover:bg-slate-800 text-slate-400 hover:text-white transition" title={t.diffView}>
                                <Icons.Eye />
                              </button>
                              <button onClick={() => handleRemoveSkill(r.name)} className="p-1.5 rounded hover:bg-rose-500/20 text-rose-400 transition" title="Delete">
                                <Icons.Trash />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
            </div>
          )}

          {/* TAB: MCP SERVERS */}
          {activeTab === 'mcp' && (
            <div className="space-y-6">
              <div className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
                <div>
                  <h3 className="text-base font-semibold text-slate-100">MCP Server Management (Stdio & Remote HTTP/SSE)</h3>
                  <p className="text-xs text-slate-400 mt-1">Manage local stdio and remote HTTP/SSE MCP servers with custom headers, API keys, and auto-sync.</p>
                </div>
                <div className="flex items-center space-x-2">
                  <button onClick={() => setEditingMcpServer({ key: '', data: null })} className="px-3 py-1.5 rounded bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium flex items-center space-x-1 transition">
                    <Icons.Plus /> <span>{t.addMcp}</span>
                  </button>
                  <button onClick={() => setMcpViewMode(mcpViewMode === 'cards' ? 'json' : 'cards')} className="px-3 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-xs text-indigo-300 font-mono transition">
                    {mcpViewMode === 'cards' ? t.rawJsonView : t.cardView}
                  </button>
                </div>
              </div>

              {mcpViewMode === 'cards' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {mcpServersList.map(([key, srv]) => {
                    const reqs = detectMcpRequirements(key, srv);
                    const missingReqs = reqs.filter(r => r.status === 'missing');
                    const placeholderReqs = reqs.filter(r => r.status === 'placeholder');
                    const statusBadge = missingReqs.length > 0 ? (
                      <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-rose-500/10 text-rose-400 border border-rose-500/20">
                        🔴 Eksik: {missingReqs.length} Değişken/API Key
                      </span>
                    ) : placeholderReqs.length > 0 ? (
                      <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-amber-500/10 text-amber-400 border border-amber-500/20">
                        🟡 {placeholderReqs.length} Varsayılan Değişken
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        🟢 Yapılandırıldı
                      </span>
                    );

                    return (
                      <div key={key} className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between space-y-4 hover:border-slate-700 transition">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                              <Icons.Server />
                            </div>
                            <div>
                              <div className="flex items-center space-x-2">
                                <h4 className="text-sm font-semibold text-slate-200 capitalize">{key}</h4>
                                <span className={`px-2 py-0.2 rounded text-[9px] font-mono ${srv.url ? 'bg-sky-500/10 text-sky-400 border border-sky-500/20' : 'bg-slate-800 text-slate-400'}`}>
                                  {srv.url ? 'Remote HTTP/SSE' : 'Local Stdio'}
                                </span>
                              </div>
                              <p className="text-[11px] font-mono text-slate-500 truncate max-w-xs mt-0.5">
                                {srv.url ? srv.url : `${srv.command} ${(srv.args || []).join(' ')}`}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center space-x-2">
                            {statusBadge}
                            <button onClick={() => setEditingMcpServer({ key, data: srv })} className="p-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition" title="Edit MCP Server">
                              <Icons.Edit />
                            </button>
                            <button onClick={() => handleRemoveMcpServer(key)} className="p-1.5 rounded hover:bg-rose-500/20 text-rose-400 transition" title="Delete MCP Server">
                              <Icons.Trash />
                            </button>
                          </div>
                        </div>

                        {/* DETECTED REQUIREMENTS & VARIABLES PANEL */}
                        <div className="p-3.5 rounded-lg bg-slate-950 border border-slate-800/80 space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-[11px] font-mono text-amber-400 font-semibold flex items-center space-x-1">
                              <Icons.Lock /> <span>⚡ Otomatik Algılanan Gereksinimler & Değişkenler ({reqs.length})</span>
                            </span>
                            <span className="text-[10px] text-slate-500">Dinamik MCP Özellikleri</span>
                          </div>

                          {reqs.length === 0 ? (
                            <p className="text-[11px] text-slate-500 italic">Özel API Key veya ortam değişkeni gerektirmiyor.</p>
                          ) : (
                            <div className="space-y-2">
                              {reqs.map(req => {
                                const currentInputValue = mcpAuthInputs[`${key}_${req.key}`] !== undefined ? mcpAuthInputs[`${key}_${req.key}`] : req.value;
                                return (
                                  <div key={req.key} className="space-y-1 bg-slate-900/60 p-2 rounded border border-slate-800/60">
                                    <div className="flex items-center justify-between">
                                      <div className="flex items-center space-x-2">
                                        <span className={`px-1.5 py-0.2 rounded text-[9px] font-mono font-bold ${
                                          req.type === 'header' ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30' :
                                          req.type === 'arg' ? 'bg-sky-500/20 text-sky-300 border border-sky-500/30' :
                                          'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                                        }`}>
                                          {req.type.toUpperCase()}
                                        </span>
                                        <span className="text-xs font-mono font-semibold text-slate-200">{req.key}</span>
                                      </div>
                                      <span className={`px-1.5 py-0.2 rounded text-[9px] font-mono ${
                                        req.status === 'configured' ? 'bg-emerald-500/20 text-emerald-400' :
                                        req.status === 'placeholder' ? 'bg-amber-500/20 text-amber-400' :
                                        'bg-rose-500/20 text-rose-400 font-bold'
                                      }`}>
                                        {req.status === 'configured' ? '🟢 Yapılandırıldı' : req.status === 'placeholder' ? '🟡 Default / Placeholder' : '🔴 Eksik Değişken / Key'}
                                      </span>
                                    </div>
                                    <p className="text-[10px] text-slate-400 font-sans">{req.description}</p>
                                    
                                    {req.type === 'env' && (
                                      <div className="flex items-center space-x-2 pt-1">
                                        <input
                                          type="password"
                                          placeholder={`${req.key} değerini yazın...`}
                                          value={currentInputValue}
                                          onChange={e => setMcpAuthInputs({ ...mcpAuthInputs, [`${key}_${req.key}`]: e.target.value })}
                                          className="flex-1 px-2 py-1 rounded bg-slate-950 border border-slate-800 text-xs font-mono text-indigo-300 focus:outline-none focus:border-indigo-500"
                                        />
                                        <button
                                          onClick={() => handleSaveMcpAuthSecret(key, req.key)}
                                          className="px-2.5 py-1 rounded bg-indigo-600/30 hover:bg-indigo-600/50 border border-indigo-500/30 text-indigo-300 text-[10px] font-medium transition"
                                        >
                                          Kaydet
                                        </button>
                                      </div>
                                    )}
                                  </div>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="space-y-4 p-5 rounded-xl bg-slate-900/80 border border-slate-800">
                  <textarea value={mcpInputJson} onChange={e => setMcpInputJson(e.target.value)} rows="14" className="w-full p-4 rounded-lg bg-slate-950 border border-slate-800 font-mono text-xs text-indigo-300 focus:outline-none focus:border-indigo-500" />
                  <button onClick={() => handleSaveMcpConfig()} className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium transition flex items-center space-x-2">
                    <Icons.Check /> <span>{t.saveMcp}</span>
                  </button>
                </div>
              )}
            </div>
          )}

          {/* TAB: PRESETS WITH ACTIVATION ENGINE & EDIT MODAL */}
          {activeTab === 'presets' && (
            <div className="space-y-6">
              <div className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
                <div>
                  <h3 className="text-base font-semibold text-slate-100">Presets & Workflow Modes</h3>
                  <p className="text-xs text-slate-400 mt-1">Activate curated skill configurations or create custom workflow modes saved into SQLite.</p>
                </div>
                <button onClick={() => setEditingPreset({ id: '', title: '', description: '', skills: [] })} className="px-3 py-1.5 rounded bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium flex items-center space-x-1 transition">
                  <Icons.Plus /> <span>{t.createPreset}</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {presetsList.map(p => (
                  <div key={p.id} className={`p-5 rounded-xl flex flex-col justify-between space-y-4 transition ${p.active ? 'bg-slate-900/90 border-emerald-500/50 shadow-emerald-950/20 shadow-xl' : 'bg-slate-900/80 border-slate-800'}`}>
                    <div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <h4 className="text-sm font-semibold text-slate-200">{p.title}</h4>
                          {p.active && (
                            <span className="px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-mono flex items-center space-x-1">
                              <Icons.Check /> <span>Aktif Mod</span>
                            </span>
                          )}
                        </div>
                        <div className="flex items-center space-x-1">
                          <button onClick={() => setEditingPreset(p)} className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-white transition" title="Skill ve Preset Düzenle">
                            <Icons.Edit />
                          </button>
                          {p.custom && (
                            <button onClick={() => handleDeletePreset(p.id)} className="p-1 rounded hover:bg-rose-500/20 text-rose-400 transition" title="Preset Sil">
                              <Icons.Trash />
                            </button>
                          )}
                          {p.custom ? (
                            <span className="px-2 py-0.5 rounded bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-[10px] font-mono">SQLite Custom</span>
                          ) : (
                            <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-400 text-[10px] font-mono">System Preset</span>
                          )}
                        </div>
                      </div>
                      <p className="text-xs text-slate-400 mt-1">{p.description}</p>
                      <div className="flex flex-wrap gap-1 mt-3">
                        {(p.skills || []).map(sk => (
                          <span key={sk} className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-[10px] font-mono text-indigo-300">
                            {sk}
                          </span>
                        ))}
                      </div>
                    </div>

                    <button
                      onClick={() => handleActivatePreset(p)}
                      className={`w-full py-2.5 rounded-lg text-xs font-semibold transition flex items-center justify-center space-x-2 shadow-lg ${p.active ? 'bg-emerald-600 hover:bg-emerald-500 text-white border border-emerald-400/50 shadow-emerald-900/40' : 'bg-indigo-600 hover:bg-indigo-500 text-white'}`}
                    >
                      {p.active ? (
                        <>
                          <Icons.Check /> <span>✓ Aktif Preset (Aktifleştirildi)</span>
                        </>
                      ) : (
                        <>
                          <Icons.Play /> <span>Modu Aktifleştir / Apply Preset</span>
                        </>
                      )}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
          {/* TAB: CORE ENGINES & DAEMON MANAGER */}
          {activeTab === 'mcp' && (
            <div className="space-y-6">
              <div className="p-5 rounded-xl bg-slate-900/80 border border-indigo-500/20 flex items-center justify-between">
                <div>
                  <h3 className="text-base font-semibold text-slate-100 flex items-center space-x-2">
                    <Icons.Cpu /> <span>Çekirdek Servisler (Docker Daemon / Çekirdek MCP)</span>
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Skill değil — arka planda çalışan gerçek daemon'lar. Docker container'da izole çalışır, host'a hiçbir şey kurmaz. Başlayınca çekirdek MCP olarak araçlara eklenir. <span className="text-amber-400">Varsayılan: kapalı.</span>
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setShowCoreHub(v => !v)}
                    className="px-3 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition flex items-center space-x-1.5 shadow-lg"
                    title="Çekirdek Servis Hub — kurulabilir servisler"
                  >
                    <Icons.Plus /> <span>{showCoreHub ? 'Hub\'ı Gizle' : 'Hub\'dan Ekle'}</span>
                  </button>
                  <button
                    onClick={async () => {
                      showToast('Docker CLI Kuruluyor...', 'winget/brew/apt ile Docker CLI indiriliyor (Docker Desktop değil)', 'info');
                      try {
                        const res = await fetch('/api/docker/install', { method: 'POST' });
                        const d = await res.json();
                        showToast(d.success ? '✓ Docker Kuruldu' : '⚠ Docker Kurulum Hatası', d.message, d.success ? 'success' : 'error');
                        addLog(d.message, d.success ? 'success' : 'error');
                      } catch (e) { showToast('Hata', e.message, 'error'); }
                    }}
                    className="px-3 py-2 rounded-lg bg-sky-600 hover:bg-sky-500 text-white text-xs font-semibold transition flex items-center space-x-1.5 shadow-lg"
                    title="Docker Desktop değil, hafif Docker CLI (Engine) kurar"
                  >
                    <Icons.Server /> <span>Docker CLI Kur</span>
                  </button>
                </div>
              </div>

              {showCoreHub && (
                <div className="p-5 rounded-xl bg-slate-950 border border-indigo-500/30 space-y-3">
                  <h4 className="text-sm font-semibold text-indigo-300 flex items-center space-x-2">
                    <Icons.ShoppingBag /> <span>Çekirdek Servis Hub</span>
                    <span className="text-[10px] font-mono text-slate-500">— kur / kaldır</span>
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {coreCatalog.map(item => (
                      <div key={item.id} className="p-3 rounded-lg bg-slate-900/80 border border-slate-800 flex items-start justify-between space-x-3">
                        <div className="min-w-0">
                          <div className="flex items-center space-x-2">
                            <span className="text-sm">{item.icon}</span>
                            <span className="text-xs font-semibold text-slate-200 truncate">{item.name}</span>
                            {item.runnable
                              ? <span className="px-1.5 py-0.5 rounded text-[9px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">hazır</span>
                              : <span className="px-1.5 py-0.5 rounded text-[9px] font-mono bg-amber-500/10 text-amber-400 border border-amber-500/20">şablon</span>}
                          </div>
                          <p className="text-[11px] text-slate-400 mt-1 leading-snug">{item.what || item.desc}</p>
                          <p className="text-[10px] font-mono text-slate-600 mt-1">port {item.port} · MCP {item.mcp?.type}</p>
                        </div>
                        {item.installed ? (
                          <button
                            onClick={() => handleCoreHubAction(item.id, 'remove')}
                            className="px-2.5 py-1 rounded text-[11px] font-medium bg-rose-500/10 border border-rose-500/30 text-rose-400 hover:bg-rose-500/20 transition flex-shrink-0"
                          >Kaldır</button>
                        ) : (
                          <button
                            onClick={() => handleCoreHubAction(item.id, 'install')}
                            className="px-2.5 py-1 rounded text-[11px] font-medium bg-indigo-600 hover:bg-indigo-500 text-white transition flex-shrink-0"
                          >Ekle</button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 gap-4">
                {(enginesList.length > 0 ? enginesList : [
                  { id: 'claude-mem', name: '🧠 Claude Long-Term Memory Engine', status: 'stopped', port: 3780, reqs: ['Node.js 18+', 'SQLite Vector Ext'], desc: 'Silinmez hafıza veritabanı.' },
                  { id: 'graphify', name: '🕸️ Graphify Architecture Engine', status: 'stopped', port: 3781, reqs: ['Python 3.10+', 'Graphviz'], desc: '3D düğüm haritası.' },
                  { id: 'understand-anything', name: '🔬 Understand Anything Deep Inspector', status: 'stopped', port: 3782, reqs: ['Node.js 18+', 'pnpm'], desc: 'AST kod indeksleme.' }
                ]).map(eng => {
                  const isRunning = eng.status === 'running';
                  return (
                    <div key={eng.id} className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-start justify-between">
                      <div className="space-y-2 max-w-2xl">
                        <div className="flex items-center space-x-3">
                          <h4 className="text-sm font-semibold text-slate-100">{eng.name}</h4>
                          <span className={`px-2 py-0.5 rounded text-[10px] font-mono flex items-center space-x-1 border ${isRunning ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' : 'bg-rose-500/10 border-rose-500/30 text-rose-400'}`}>
                            {isRunning ? <><Icons.Check /> <span>Port Dinleniyor ({eng.port}) - Aktif</span></> : <><Icons.AlertTriangle /> <span>Servis Kapalı (Port {eng.port})</span></>}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 leading-relaxed">{eng.what || eng.desc}</p>
                        {eng.runnable === false && (
                          <p className="text-[11px] text-amber-400/90 font-mono">⚠ Docker image tanımlı değil — manifest'e image + buildDir ekleyin.</p>
                        )}
                        {eng.dockerAvailable === false && (
                          <p className="text-[11px] text-rose-400/90 font-mono">⚠ Docker CLI bulunamadı — üstteki "Docker CLI Kur" ile kurun.</p>
                        )}
                        <div className="flex items-center space-x-2 pt-1">
                          <span className="text-[10px] font-mono text-indigo-400 uppercase font-semibold">Gereksinimler:</span>
                          {(eng.reqs || []).map(r => (
                            <span key={r} className="px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-[10px] font-mono text-slate-300">
                              {r}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <button
                          disabled={eng.runnable === false || eng.dockerAvailable === false}
                          onClick={async () => {
                            showToast('Docker Build Başlatıldı', `[${eng.id}] image build ediliyor (docker build)...`, 'info');
                            try {
                              const res = await fetch('/api/engines/build', {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({ engineId: eng.id })
                              });
                              const d = await res.json();
                              showToast(d.success ? 'Image Build Edildi' : 'Build Hatası', d.message, d.success ? 'success' : 'error');
                              fetchEngines();
                            } catch (e) {}
                          }}
                          className="px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 text-xs font-medium transition flex items-center space-x-1 disabled:opacity-40 disabled:cursor-not-allowed"
                          title="Docker image build et (docker build -t ...)"
                        >
                          <Icons.Refresh /> <span>Docker Image Build Et</span>
                        </button>

                        <button
                          disabled={!isRunning && (eng.runnable === false || eng.dockerAvailable === false)}
                          onClick={async () => {
                            const action = isRunning ? 'stop' : 'start';
                            try {
                              const res = await fetch('/api/engines/toggle', {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({ engineId: eng.id, action })
                              });
                              const d = await res.json();
                              showToast(d.success ? 'Engine Güncellendi' : 'Hata', d.message, d.success ? 'success' : 'error');
                              fetchEngines();
                            } catch (e) {}
                          }}
                          className={`px-3 py-2 rounded-lg text-xs font-medium transition flex items-center space-x-1 disabled:opacity-40 disabled:cursor-not-allowed ${isRunning ? 'bg-rose-500/10 border border-rose-500/30 text-rose-400 hover:bg-rose-500/20' : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg'}`}
                        >
                          {isRunning ? <><Icons.Power /> <span>Servisi Durdur</span></> : <><Icons.Play /> <span>Servisi Başlat</span></>}
                        </button>

                        {isRunning && eng.webUrl ? (
                          <a
                            href={eng.webUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="px-3 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium transition flex items-center space-x-1 shadow-md"
                          >
                            <Icons.Globe /> <span>Arayüzü Aç (Web UI)</span>
                          </a>
                        ) : (
                          <button
                            disabled
                            onClick={() => showToast('Servis Kapalı', 'Port dinlenmiyor! Arayüzü açmak için önce servisi başlatın.', 'error')}
                            className="px-3 py-2 rounded-lg bg-slate-800/50 border border-slate-800 text-slate-500 text-xs font-medium cursor-not-allowed flex items-center space-x-1 opacity-60"
                            title="Servis çalışmadığı için Web UI açılamaz"
                          >
                            <Icons.Globe /> <span>Arayüz Kapalı (Bağlanılamadı)</span>
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB: DEEP DYNAMIC GITHUB MARKETPLACE (SKILLS & MCP SEPARATED) */}
          {activeTab === 'marketplace' && (
            <div className="space-y-6">
              {/* MODE TOGGLE: SKILLS VS MCP */}
              <div className="p-1.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center space-x-2">
                <button
                  onClick={() => {
                    setMarketplaceMode('skills');
                    setGithubQuery('agent-skills');
                    fetch('/api/marketplace/search?q=agent-skills').then(r => r.json()).then(data => setMarketplace(data));
                  }}
                  className={`flex-1 py-2.5 rounded-lg text-xs font-semibold font-mono transition flex items-center justify-center space-x-2 ${marketplaceMode === 'skills' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:text-white hover:bg-slate-800/50'}`}
                >
                  <Icons.Code /> <span>Skills Hub Marketplace (Ajan Yetenekleri)</span>
                </button>
                <button
                  onClick={() => {
                    setMarketplaceMode('mcp');
                    setGithubQuery('mcp-server');
                    fetch('/api/marketplace/search?q=mcp-server').then(r => r.json()).then(data => setMarketplace(data));
                  }}
                  className={`flex-1 py-2.5 rounded-lg text-xs font-semibold font-mono transition flex items-center justify-center space-x-2 ${marketplaceMode === 'mcp' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:text-white hover:bg-slate-800/50'}`}
                >
                  <Icons.Server /> <span>MCP Servers Marketplace (Model Context Protocol)</span>
                </button>
              </div>

              <div className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-4">
                <div>
                  <h3 className="text-base font-semibold text-slate-100">
                    {marketplaceMode === 'skills' ? 'GitHub Agent Skill Repolarında Ara' : 'GitHub MCP Server Sunucularında Ara'}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    {marketplaceMode === 'skills'
                      ? 'Canlı GitHub depolarında arama yapın ve dilediğiniz yeteneği tek tıkla submodule olarak ekleyin.'
                      : 'Model Context Protocol (MCP) sunucularını arayın ve mcp_config.json dosyanıza otomatik ekleyin.'}
                  </p>
                </div>

                <form onSubmit={handleSearchGithubMarketplace} className="flex items-center space-x-3">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      placeholder={marketplaceMode === 'skills' ? 'Örn: claude-skills, ux-ui, security-agent...' : 'Örn: mcp-server-sqlite, postgres-mcp, puppeteer-mcp...'}
                      value={githubQuery}
                      onChange={e => setGithubQuery(e.target.value)}
                      className="w-full pl-9 pr-4 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-xs font-mono text-slate-200 focus:outline-none focus:border-indigo-500"
                    />
                    <div className="absolute left-3 top-3 text-slate-500"><Icons.Search /></div>
                  </div>
                  <button type="submit" disabled={isSearchingGithub} className="px-4 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium transition flex items-center space-x-2">
                    <Icons.Search /> <span>{isSearchingGithub ? 'Aranıyor...' : 'GitHub Depolarında Ara'}</span>
                  </button>
                </form>

                {/* DISCOVERY CHIPS FOR SKILLS VS MCP */}
                <div className="pt-2">
                  <span className="text-[11px] font-mono text-slate-400 block mb-2 font-semibold uppercase tracking-wider">
                    {marketplaceMode === 'skills' ? 'Skill Keşif Konuları (Skills Topic Discovery):' : 'MCP Server Keşif Konuları (MCP Topic Discovery):'}
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {(marketplaceMode === 'skills' ? [
                      { label: "Official Skills", query: "anthropics skills" },
                      { label: "AI Long-Term Memory", query: "claude memory skill" },
                      { label: "Cybersecurity & Audit", query: "cybersecurity agent skills" },
                      { label: "UI/UX & CSS Design", query: "ui-ux pro max skill" },
                      { label: "Token Savers & Speed", query: "caveman prompt skill" },
                      { label: "Agent Workflows & TDD", query: "agent superpowers workflow" },
                      { label: "Game Dev & 60FPS", query: "game studio agent skills" },
                      { label: "Marketing & Growth", query: "marketing copywriting skills" }
                    ] : [
                      { label: "SQLite & Databases", query: "mcp-server sqlite" },
                      { label: "PostgreSQL MCP", query: "mcp-server postgres" },
                      { label: "Browser Automation", query: "mcp-server puppeteer" },
                      { label: "Fetch & Web Scraper", query: "mcp-server fetch" },
                      { label: "Git & Version Control", query: "mcp-server git" },
                      { label: "Slack & Communication", query: "mcp-server slack" },
                      { label: "Docker & Container", query: "mcp-server docker" }
                    ]).map(chip => (
                      <button
                        key={chip.label}
                        type="button"
                        onClick={() => {
                          setGithubQuery(chip.query);
                          fetch(`/api/marketplace/search?q=${encodeURIComponent(chip.query)}`)
                            .then(r => r.json())
                            .then(data => setMarketplace(data));
                        }}
                        className="px-2.5 py-1 rounded-md bg-slate-950 hover:bg-indigo-600/20 border border-slate-800 hover:border-indigo-500/40 text-slate-300 text-xs font-mono transition flex items-center space-x-1"
                      >
                        <span>#</span> <span>{chip.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {marketplace.map(item => {
                  const repoBasename = (item.url || item.name || '').split('/').pop().replace(/\.git$/, '');
                  const isInstalled = allInstalledSkillsList.some(s => s.toLowerCase() === repoBasename.toLowerCase() || s.toLowerCase() === item.name.toLowerCase());

                  return (
                    <div key={item.name} className={`p-5 rounded-xl border flex flex-col justify-between space-y-3 transition ${isInstalled ? 'bg-slate-900/40 border-emerald-500/30' : 'bg-slate-900/80 border-slate-800'}`}>
                      <div>
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm font-semibold text-slate-200 truncate">{item.label || item.name}</h4>
                          <div className="flex items-center space-x-2">
                            {isInstalled && (
                              <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-mono flex items-center space-x-1">
                                <Icons.Check /> <span>Yüklü</span>
                              </span>
                            )}
                            <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20 text-[10px] font-mono">★ {item.stars || '1.2k'}</span>
                          </div>
                        </div>
                        <p className="text-xs text-slate-400 mt-1.5 leading-relaxed line-clamp-2">{item.desc}</p>
                        <p className="text-[10px] font-mono text-indigo-400 mt-2 truncate">{item.url}</p>
                      </div>
                      <button
                        onClick={() => {
                          if (marketplaceMode === 'mcp') {
                            setEditingMcpServer({
                              key: repoBasename,
                              data: { command: 'npx', args: ['-y', `${item.name}@latest`] }
                            });
                            showToast('MCP Server Ekleme', `[${repoBasename}] konfigürasyonu için editör açıldı.`, 'info');
                          } else {
                            handleMarketplaceInstallSubmodule(item.url);
                          }
                        }}
                        disabled={marketplaceMode === 'skills' && (isInstalled || installingRepo === item.url)}
                        className={`py-2 rounded text-xs font-medium transition flex items-center justify-center space-x-1 ${marketplaceMode === 'skills' && isInstalled ? 'bg-slate-800 text-emerald-400 cursor-default border border-emerald-500/20' : 'bg-emerald-600 hover:bg-emerald-500 text-white'}`}
                      >
                        {marketplaceMode === 'skills' ? (
                          isInstalled ? (
                            <>
                              <Icons.Check /> <span>Yüklendi (Skills Hub'da Aktif)</span>
                            </>
                          ) : (
                            <>
                              <Icons.Plus />
                              <span>{installingRepo === item.url ? 'Kuruluyor...' : 'Submodule Olarak Yükle'}</span>
                            </>
                          )
                        ) : (
                          mcpConfig?.mcpServers && mcpConfig.mcpServers[repoBasename] ? (
                            <>
                              <Icons.Check /> <span>Yüklendi & Yapılandır</span>
                            </>
                          ) : (
                            <>
                              <Icons.Server />
                              <span>MCP Sunucularıma Ekle</span>
                            </>
                          )
                        )}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB: SETTINGS */}
          {activeTab === 'settings' && (
            <div className="space-y-6">

              {/* SYSTEM REQUIREMENTS */}
              <div className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-slate-100 flex items-center space-x-2">
                    <Icons.Cpu /> <span>Sistem Gereksinimleri</span>
                  </h3>
                  <button onClick={() => fetch('/api/system/info').then(r => r.json()).then(d => setSystemInfo(d))}
                    className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 font-mono transition flex items-center space-x-1">
                    <Icons.Refresh /> <span>Tara</span>
                  </button>
                </div>
                {systemInfo ? (<>
                  <div className="flex flex-wrap items-center gap-3 p-3 rounded-lg bg-slate-950 border border-slate-800">
                    <span className="text-2xl">{systemInfo.os.platform === 'win32' ? '🪟' : systemInfo.os.platform === 'darwin' ? '🍎' : '🐧'}</span>
                    <div>
                      <div className="text-xs font-bold text-slate-200">{systemInfo.os.label} ({systemInfo.os.arch})</div>
                      <div className="text-[10px] font-mono text-slate-500">{systemInfo.os.platform}</div>
                    </div>
                    <div className="ml-auto flex items-center space-x-4 text-[11px] font-mono">
                      <span className="text-slate-400">🖥️ RAM: <span className="text-slate-200">{systemInfo.os.totalMemGB} GB</span></span>
                      <span className="text-slate-400">🟢 Serbest: <span className="text-emerald-300">{systemInfo.os.freeMemGB} GB</span></span>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {Object.entries(systemInfo.requirements).map(([key, req]) => (
                      <div key={key} className={`flex items-center justify-between px-3 py-2.5 rounded-lg border ${req.ok ? 'bg-emerald-950/20 border-emerald-500/20' : req.required ? 'bg-rose-950/20 border-rose-500/20' : 'bg-slate-950 border-slate-800'}`}>
                        <div className="flex items-center space-x-2">
                          <span className={`w-2 h-2 rounded-full flex-shrink-0 ${req.ok ? 'bg-emerald-400' : req.required ? 'bg-rose-400 animate-pulse' : 'bg-slate-600'}`} />
                          <div>
                            <div className="text-[11px] font-semibold text-slate-200">{req.label}</div>
                            {req.version && <div className="text-[10px] font-mono text-slate-500 truncate max-w-[180px]">{req.version}</div>}
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          {req.required && !req.ok && <span className="text-[9px] px-1.5 py-0.5 rounded bg-rose-500/20 text-rose-400 border border-rose-500/30 font-mono">Gerekli!</span>}
                          {!req.required && <span className="text-[9px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-500 font-mono">opsiyonel</span>}
                          <span className={`text-[11px] font-mono font-semibold ${req.ok ? 'text-emerald-400' : req.required ? 'text-rose-400' : 'text-slate-500'}`}>{req.ok ? '✓' : '✗'}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  {!systemInfo.requirements.docker.ok && (
                    <div className="flex items-center justify-between p-3 rounded-lg bg-indigo-950/20 border border-indigo-500/20">
                      <div>
                        <div className="text-xs font-semibold text-indigo-300">Docker CLI Kur</div>
                        <div className="text-[10px] text-slate-400 mt-0.5">
                          {systemInfo.os.platform === 'win32' ? 'winget ile kurulur (yönetici gerekmez)' : systemInfo.os.platform === 'darwin' ? 'brew install docker' : 'get.docker.com scripti'}
                        </div>
                      </div>
                      <button onClick={() => fetch('/api/docker/install', { method: 'POST' })}
                        className="px-3 py-1.5 rounded bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium transition flex items-center space-x-1">
                        <Icons.Plus /> <span>Kur</span>
                      </button>
                    </div>
                  )}
                </>) : (
                  <div className="flex items-center justify-center py-8 text-slate-500">
                    <span className="text-xs font-mono animate-pulse">Sistem taranıyor...</span>
                  </div>
                )}
              </div>

              {/* MAIN SETTINGS PANEL */}
              <div className="space-y-6 p-5 rounded-xl bg-slate-900/80 border border-slate-800">
                <div className="border-b border-slate-800 pb-4 flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-semibold text-slate-100 flex items-center space-x-2">
                      <Icons.Database /> <span>System &amp; SQLite Database Settings</span>
                    </h3>
                    <p className="text-xs text-slate-400 mt-1">Configure global storage, linking modes, and SQLite database settings.</p>
                  </div>
                  <span className="px-2.5 py-1 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono">
                    Engine: Built-in node:sqlite
                  </span>
                </div>

                <form onSubmit={handleSaveSettings} className="space-y-4 max-w-xl">
                  <div>
                    <label className="text-xs font-mono text-slate-400 block mb-1">SQLite Database Location</label>
                    <input type="text" value={settingsData.dbPath || 'db.sqlite'} disabled className="w-full p-2.5 rounded bg-slate-950 border border-slate-800 text-xs font-mono text-slate-500" />
                  </div>

                  <div>
                    <label className="text-xs font-mono text-slate-400 block mb-1">Windows &amp; Universal Sync Strategy</label>
                    <select value={settingLinkMode} onChange={e => setSettingLinkMode(e.target.value)} className="w-full p-2.5 rounded bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-indigo-500">
                      <option value="copy">Copy (Önerilen — Dosyaları doğrudan kopyalar, AI chatbotlar görebilir)</option>
                      <option value="junction">Junction Link (Windows — Link klasörü, bazı chatbotlar göremez)</option>
                      <option value="symlink">Symlink (Linux/Mac — Sembolik link)</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-mono text-slate-400 block mb-1">Auto-Sync SSE Live Engine</label>
                    <select value={settingAutoSync} onChange={e => setSettingAutoSync(e.target.value)} className="w-full p-2.5 rounded bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-indigo-500">
                      <option value="true">Enabled (Real-time filesystem push)</option>
                      <option value="false">Disabled</option>
                    </select>
                  </div>

                  <button type="submit" className="px-4 py-2.5 rounded bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium transition flex items-center space-x-2">
                    <Icons.Check /> <span>{t.saveSettings}</span>
                  </button>
                </form>

                {/* SQL DUMP EXPORT & IMPORT BACKUP SYSTEM */}
                <div className="pt-6 border-t border-slate-800 space-y-4 max-w-xl">
                  <div>
                    <h4 className="text-sm font-semibold text-slate-200 flex items-center space-x-2">
                      <Icons.Lock /> <span>SQLite Tam Sistem Yedeği (SQL Export &amp; Import Restore)</span>
                    </h4>
                    <div className="p-4 rounded-lg bg-amber-500/5 border border-amber-500/20 mt-2">
                      <p className="text-xs text-amber-400">💡 <strong>Import notu:</strong> JSON yedek dosyasından tüm presetler, MCP ayarları ve repo URL'leri geri yüklenir. Bulunan her repo otomatik olarak <code>git clone</code> ile indirilir. Bu işlem internet bağlantısı ve birkaç dakika gerektirebilir.</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <a href="/api/db/export" download className="px-4 py-2.5 rounded bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-medium transition flex items-center space-x-2 shadow-lg">
                      <Icons.Sliders /> <span>Tam Sistem Yedeği Al (Export JSON)</span>
                    </a>
                    <label className="px-4 py-2.5 rounded bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium transition flex items-center space-x-2 cursor-pointer shadow-lg">
                      <Icons.Plus /> <span>Yedeği Geri Yükle + Repoları İndir (Import)</span>
                      <input type="file" accept=".json" className="hidden" onChange={e => {
                        const file = e.target.files[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onload = async (evt) => {
                            try {
                              showToast('Import Başladı', 'Veriler geri yükleniyor ve repolar klonlanıyor...', 'info');
                              const res = await fetch('/api/db/import', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: evt.target.result });
                              const data = await res.json();
                              addLog(data.message, data.success ? 'success' : 'error');
                              if (data.log) data.log.forEach(line => addLog(line, line.startsWith('✓') ? 'success' : line.startsWith('✗') ? 'error' : 'info'));
                              showToast(data.success ? '✓ Sistem Geri Yüklendi' : 'Import Hatası', data.message, data.success ? 'success' : 'error');
                              fetchData();
                            } catch (err) { addLog('SQL Import Hatası: ' + err.message, 'error'); }
                          };
                          reader.readAsText(file);
                        }
                      }} />
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}


          {activeTab === 'sandbox' && (
            <div className="space-y-6">
              <div className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-4">
                <div>
                  <h3 className="text-base font-semibold text-slate-100">LLM Sandbox Skill Tester</h3>
                  <p className="text-xs text-slate-400 mt-1">Test any installed skill against a sample prompt before deploying to your AI agent.</p>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="text-xs font-mono text-slate-400 block mb-1">Target Skill Framework</label>
                    <select value={sandboxSkill} onChange={e => setSandboxSkill(e.target.value)} className="w-full p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-indigo-500">
                      <option value="ux-ui">ux-ui (Web & UI/UX Standards)</option>
                      <option value="caveman">caveman (Token Reduction)</option>
                      <option value="karpathy">karpathy (Guardrails & Verification)</option>
                      <option value="security">security (OWASP & Threat Modeling)</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-mono text-slate-400 block mb-1">Test Prompt</label>
                    <textarea value={sandboxPrompt} onChange={e => setSandboxPrompt(e.target.value)} rows="3" className="w-full p-3 rounded-lg bg-slate-950 border border-slate-800 text-xs font-mono text-slate-200 focus:outline-none focus:border-indigo-500" placeholder="Type test user request..." />
                  </div>

                  <button onClick={handleRunSandbox} disabled={loadingAction === 'sandbox-test'} className="px-4 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-medium transition flex items-center space-x-2">
                    <Icons.Play /> <span>{t.runTest}</span>
                  </button>
                </div>
              </div>

              {sandboxResult && (
                <div className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <h4 className="text-sm font-semibold text-slate-200">Sandbox Result: {sandboxResult.skillName}</h4>
                    <span className="text-xs font-mono text-slate-400">Tokens: {sandboxResult.tokenCount}</span>
                  </div>
                  <pre className="p-4 rounded-lg bg-slate-950 border border-slate-800 font-mono text-xs text-indigo-300 whitespace-pre-wrap">{sandboxResult.simulatedOutput}</pre>
                </div>
              )}
            </div>
          )}

          {activeTab === 'commands' && (
            <div className="space-y-4">
              <h3 className="text-base font-semibold text-slate-100">Slash Commands ({commandsList.length})</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {commandsList.map(cmd => (
                  <div key={cmd.name} className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs text-indigo-400">/{cmd.name}</span>
                      <button onClick={() => setEditorModal({ title: cmd.name, fileName: cmd.fileName, initialContent: cmd.content })} className="text-xs text-slate-400 hover:text-white flex items-center space-x-1 bg-slate-800 px-2.5 py-1 rounded">
                        <Icons.Eye /> <span>{t.diffView}</span>
                      </button>
                    </div>
                    <pre className="p-3 rounded bg-slate-950 text-[11px] font-mono text-slate-300 overflow-x-auto border border-slate-800 max-h-32">{cmd.content}</pre>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      {/* LIVE TERMINAL DRAWER */}
      {isConsoleOpen && (
        <div className="absolute bottom-0 left-64 right-0 bg-slate-950 border-t border-slate-800 flex flex-col z-50" style={{ height: '260px' }}>
          {/* Header */}
          <div className="px-4 py-2 border-b border-slate-800 flex items-center justify-between bg-slate-900 flex-shrink-0">
            <div className="flex items-center space-x-2">
              <div className={`w-2 h-2 rounded-full ${liveTerminal.active ? 'bg-emerald-400 animate-pulse' : 'bg-slate-600'}`} />
              <span className="text-xs font-mono text-slate-300">
                {liveTerminal.active ? `▶ ${liveTerminal.jobLabel || 'İşlem çalışıyor...'}` : 'Terminal — Sistem Logları'}
              </span>
              {liveTerminal.lines.length > 0 && (
                <span className="text-[10px] font-mono text-slate-500 bg-slate-800 px-1.5 py-0.5 rounded">{liveTerminal.lines.length} satır</span>
              )}
            </div>
            <div className="flex items-center space-x-2">
              <button onClick={() => setLiveTerminal({ lines: [], jobLabel: null, active: false })} className="text-[11px] text-slate-500 hover:text-slate-300 font-mono transition">Temizle</button>
              <button onClick={() => setIsConsoleOpen(false)} className="text-xs text-slate-500 hover:text-white px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 transition">✕</button>
            </div>
          </div>

          {/* Scrollable Log Area */}
          <div className="flex-1 p-3 overflow-y-auto font-mono text-[11px] space-y-0.5">
            {liveTerminal.lines.length > 0 ? (
              liveTerminal.lines.map((l, i) => (
                <div key={i} className={`flex space-x-2 leading-relaxed ${
                  l.type === 'done' && l.line.startsWith('✅') ? 'text-emerald-400' :
                  l.type === 'done' && l.line.startsWith('❌') ? 'text-rose-400' :
                  l.type === 'start' ? 'text-indigo-300 font-semibold' :
                  l.type === 'stderr' ? 'text-amber-400/80' :
                  'text-slate-400'
                }`}>
                  <span className="text-slate-700 flex-shrink-0">[{l.ts}]</span>
                  <span className="break-all">{l.line}</span>
                </div>
              ))
            ) : (
              logs.map((l, i) => (
                <div key={i} className={`flex space-x-2 ${l.type === 'error' ? 'text-rose-400' : l.type === 'success' ? 'text-emerald-400' : 'text-slate-500'}`}>
                  <span className="text-slate-700">[{l.time}]</span>
                  <span>{l.msg}</span>
                </div>
              ))
            )}
            <div ref={terminalEndRef} />
          </div>
        </div>
      )}


      {/* MCP EDITOR MODAL */}
      {editingMcpServer && (
        <McpEditorModal
          serverKey={editingMcpServer.key}
          serverData={editingMcpServer.data}
          onSave={(key, serverObj) => handleSaveMcpServerObject(key, serverObj)}
          onClose={() => setEditingMcpServer(null)}
        />
      )}

      {/* PRESET EDITOR MODAL */}
      {editingPreset && (
        <PresetEditorModal
          preset={editingPreset.id ? editingPreset : null}
          availableSkills={allInstalledSkillsList}
          onSave={(presetObj) => handleSavePresetObj(presetObj)}
          onClose={() => setEditingPreset(null)}
        />
      )}

      {showInspectorModal && (
        <AgentSettingsInspectorModal onClose={() => setShowInspectorModal(false)} />
      )}

      {editorModal && (
        <CodeEditorModal title={editorModal.title} fileName={editorModal.fileName} initialContent={editorModal.initialContent} onSave={(newContent) => handleSaveCommandContent(editorModal.fileName, newContent)} onClose={() => setEditorModal(null)} />
      )}
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
