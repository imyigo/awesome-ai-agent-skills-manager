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
    marketplace: "Marketplace",
    security: "Güvenlik Taraması",
    updateAll: "Tüm Repoları Güncelle",
    providers: "AI Providers",
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
    diffView: "Kod Diff Önizleme",
    runLlmScan: "LLM Güvenlik Analizi Başlat"
  },
  en: {
    dashboard: "Dashboard",
    skills: "Skills Hub",
    mcp: "MCP Servers",
    commands: "Slash Commands",
    presets: "Presets (Workflow Modes)",
    marketplace: "Marketplace",
    security: "Security Scanner",
    updateAll: "Update All Repos",
    providers: "AI Providers",
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
    diffView: "Code Diff Preview",
    runLlmScan: "Run LLM Threat Scan"
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
  Sliders: () => <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="4" y1="21" x2="4" y2="14"/><line x1="4" y1="10" x2="4" y2="3"/><line x1="12" y1="21" x2="12" y2="12"/><line x1="12" y1="8" x2="12" y2="3"/><line x1="20" y1="21" x2="20" y2="16"/><line x1="20" y1="12" x2="20" y2="3"/><line x1="1" y1="14" x2="7" y2="14"/><line x1="9" y1="8" x2="15" y2="8"/><line x1="17" y1="16" x2="23" y2="16"/></svg>,
  ShoppingBag: () => <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>,
  Code: () => <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>,
  Link: () => <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>,
  Unlink: () => <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18.36 6.64a9 9 0 0 1 0 12.72"/><line x1="2" y1="2" x2="22" y2="22"/><path d="M14.12 14.12A3 3 0 0 0 16 11.5"/></svg>,
  Refresh: () => <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></svg>,
  Plus: () => <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
  Trash: () => <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>,
  Check: () => <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>,
  Server: () => <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="8" rx="2" ry="2"/><rect x="2" y="14" width="20" height="8" rx="2" ry="2"/><line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/></svg>,
  Globe: () => <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>,
  Eye: () => <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>,
};

// VISUAL DIFF VIEWER COMPONENT
function DiffViewerModal({ title, originalContent, modifiedContent, onClose }) {
  const origLines = (originalContent || '').split('\n');
  const modLines = (modifiedContent || originalContent || '').split('\n');

  return (
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-6">
      <div className="bg-slate-900 border border-slate-800 rounded-xl w-full max-w-4xl max-h-[85vh] flex flex-col overflow-hidden shadow-2xl">
        <div className="px-5 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-950">
          <div className="flex items-center space-x-2">
            <Icons.Code />
            <h3 className="text-sm font-semibold text-white">{title} - Diff Preview</h3>
          </div>
          <button onClick={onClose} className="text-xs text-slate-400 hover:text-white px-2 py-1 rounded bg-slate-800">Close</button>
        </div>

        <div className="flex-1 overflow-auto p-4 font-mono text-xs space-y-1 bg-slate-950">
          {origLines.map((line, idx) => (
            <div key={idx} className="flex space-x-3 px-2 py-0.5 rounded hover:bg-slate-900">
              <span className="text-slate-600 select-none w-8 text-right">{idx + 1}</span>
              <span className="text-slate-300 whitespace-pre-wrap">{line}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// MAIN APP COMPONENT
function App() {
  const [lang, setLang] = useState('tr');
  const t = dict[lang];

  const [activeTab, setActiveTab] = useState('dashboard');
  const [aiStatus, setAiStatus] = useState({});
  const [skillsData, setSkillsData] = useState({});
  const [mcpConfig, setMcpConfig] = useState({ mcpServers: {} });
  const [commandsList, setCommandsList] = useState([]);
  const [presetsList, setPresetsList] = useState([]);
  const [marketplace, setMarketplace] = useState([]);
  const [sseConnected, setSseConnected] = useState(false);
  const [logs, setLogs] = useState([]);
  const [isConsoleOpen, setIsConsoleOpen] = useState(false);
  const [diffModal, setDiffModal] = useState(null);
  const [llmReport, setLlmReport] = useState(null);

  // Form states
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
    es.addEventListener('mcp_update', (e) => { try { const d = JSON.parse(e.data); setMcpConfig(d); setMcpInputJson(JSON.stringify(d, null, 2)); } catch (err) {} });
    es.onerror = () => setSseConnected(false);
    return () => es.close();
  }, []);

  const fetchData = async () => {
    try {
      const [sRes, kRes, mRes, cRes, pRes, mkRes] = await Promise.all([
        fetch('/api/status'), fetch('/api/skills'), fetch('/api/mcp'), fetch('/api/commands'), fetch('/api/presets'), fetch('/api/marketplace')
      ]);
      if (sRes.ok) setAiStatus(await sRes.json());
      if (kRes.ok) setSkillsData(await kRes.json());
      if (mRes.ok) { const m = await mRes.json(); setMcpConfig(m); setMcpInputJson(JSON.stringify(m, null, 2)); }
      if (cRes.ok) setCommandsList(await cRes.json());
      if (pRes.ok) setPresetsList(await pRes.json());
      if (mkRes.ok) setMarketplace(await mkRes.json());
    } catch (e) {
      addLog('Fetch error: ' + e.message, 'error');
    }
  };

  useEffect(() => { fetchData(); }, []);

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
      fetchData();
    } catch (e) {
      addLog('Error: ' + e.message, 'error');
    } finally {
      setLoadingAction(null);
    }
  };

  const handleAddSkill = async (e) => {
    e.preventDefault();
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
      setNewSkillUrl('');
      setNewSkillRule('');
      fetchData();
    } catch (e) {
      addLog('Error: ' + e.message, 'error');
    } finally {
      setLoadingAction(null);
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
      fetchData();
    } catch (e) {
      addLog('Error: ' + e.message, 'error');
    } finally {
      setLoadingAction(null);
    }
  };

  const handleSaveMcp = async () => {
    try {
      const parsed = JSON.parse(mcpInputJson);
      const res = await fetch('/api/mcp/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(parsed)
      });
      const data = await res.json();
      addLog(data.message, data.success ? 'success' : 'error');
    } catch (e) {
      addLog('JSON Error: ' + e.message, 'error');
    }
  };

  const handleRunLlmScan = async () => {
    setLoadingAction('llm-scan');
    addLog('Starting LLM Deep Threat Analysis...', 'info');
    try {
      const res = await fetch('/api/security/llm-scan', { method: 'POST' });
      const data = await res.json();
      setLlmReport(data);
      addLog('LLM Threat Scan completed: Grade ' + data.overallGrade, 'success');
    } catch (e) {
      addLog('Scan error: ' + e.message, 'error');
    } finally {
      setLoadingAction(null);
    }
  };

  const installedCount = useMemo(() => Object.values(aiStatus).filter(a => a.installed).length, [aiStatus]);
  const linkedCount = useMemo(() => Object.values(aiStatus).filter(a => a.linked).length, [aiStatus]);

  return (
    <div className="flex h-screen bg-slate-950 text-slate-100 font-sans overflow-hidden">
      {/* SIDEBAR */}
      <aside className="w-64 border-r border-slate-800 bg-slate-900/60 flex flex-col justify-between">
        <div>
          <div className="p-4 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-lg bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center">
                <Icons.Zap />
              </div>
              <div>
                <h1 className="font-semibold text-sm tracking-tight text-white">Skill Hub</h1>
                <p className="text-[11px] text-slate-400 font-mono">19 AI Providers</p>
              </div>
            </div>
            <button onClick={() => setLang(l => l === 'tr' ? 'en' : 'tr')} className="px-2 py-1 rounded bg-slate-800 text-[10px] font-mono text-indigo-300 hover:bg-slate-700 transition flex items-center space-x-1">
              <Icons.Globe /> <span>{t.langToggle}</span>
            </button>
          </div>

          <nav className="p-2 space-y-1">
            <button onClick={() => setActiveTab('dashboard')} className={`w-full flex items-center space-x-3 px-3 py-2 rounded-md text-xs font-medium transition ${activeTab === 'dashboard' ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'}`}>
              <Icons.Grid /> <span>{t.dashboard} ({installedCount}/19)</span>
            </button>
            <button onClick={() => setActiveTab('skills')} className={`w-full flex items-center space-x-3 px-3 py-2 rounded-md text-xs font-medium transition ${activeTab === 'skills' ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'}`}>
              <Icons.Code /> <span>{t.skills}</span>
            </button>
            <button onClick={() => setActiveTab('mcp')} className={`w-full flex items-center space-x-3 px-3 py-2 rounded-md text-xs font-medium transition ${activeTab === 'mcp' ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'}`}>
              <Icons.Server /> <span>{t.mcp}</span>
            </button>
            <button onClick={() => setActiveTab('commands')} className={`w-full flex items-center space-x-3 px-3 py-2 rounded-md text-xs font-medium transition ${activeTab === 'commands' ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'}`}>
              <Icons.Terminal /> <span>{t.commands}</span>
            </button>
            <button onClick={() => setActiveTab('presets')} className={`w-full flex items-center space-x-3 px-3 py-2 rounded-md text-xs font-medium transition ${activeTab === 'presets' ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'}`}>
              <Icons.Sliders /> <span>{t.presets}</span>
            </button>
            <button onClick={() => setActiveTab('marketplace')} className={`w-full flex items-center space-x-3 px-3 py-2 rounded-md text-xs font-medium transition ${activeTab === 'marketplace' ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'}`}>
              <Icons.ShoppingBag /> <span>{t.marketplace}</span>
            </button>
            <button onClick={() => setActiveTab('security')} className={`w-full flex items-center space-x-3 px-3 py-2 rounded-md text-xs font-medium transition ${activeTab === 'security' ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'}`}>
              <Icons.Shield /> <span>{t.security}</span>
            </button>
          </nav>
        </div>

        <div className="p-3 border-t border-slate-800">
          <button onClick={() => setIsConsoleOpen(!isConsoleOpen)} className="w-full flex items-center justify-between px-3 py-2 rounded bg-slate-900 border border-slate-800 text-slate-300 text-xs font-mono">
            <span className="flex items-center space-x-2"><Icons.Terminal /> <span>Logs</span></span>
            <span className="px-1.5 py-0.5 rounded bg-slate-800 text-[10px]">{logs.length}</span>
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
          <button onClick={fetchData} className="px-3 py-1.5 rounded-md bg-indigo-600/20 border border-indigo-500/30 hover:bg-indigo-600/30 text-indigo-300 text-xs font-medium flex items-center space-x-2 transition">
            <Icons.Refresh /> <span>{t.updateAll}</span>
          </button>
        </header>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {Object.entries(aiStatus).map(([key, info]) => (
                  <div key={key} className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition flex flex-col justify-between space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="text-sm font-semibold text-slate-200">{info.name}</h4>
                        <p className="text-[11px] font-mono text-slate-500 truncate max-w-[160px]">{info.path}</p>
                      </div>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-medium border ${info.installed ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-slate-800 text-slate-500 border-slate-700'}`}>
                        {info.installed ? t.installed : t.notInstalled}
                      </span>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-slate-800/60">
                      <span className={`text-xs flex items-center space-x-1 ${info.linked ? 'text-emerald-400' : 'text-slate-500'}`}>
                        {info.linked ? <><Icons.Link /> <span>{t.linked}</span></> : <><Icons.Unlink /> <span>{t.unlinked}</span></>}
                      </span>

                      <button onClick={() => handleToggleLink(key, info.linked)} disabled={loadingAction === `toggle-${key}`} className={`px-3 py-1 rounded text-xs font-medium transition ${info.linked ? 'bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 border border-rose-500/20' : 'bg-indigo-600 text-white hover:bg-indigo-500'}`}>
                        {info.linked ? t.disconnect : t.connect}
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-4">
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
          )}

          {activeTab === 'skills' && (
            <div className="space-y-6">
              {Object.entries(skillsData).map(([catKey, cat]) => (
                <div key={catKey} className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-base font-semibold text-slate-100">{cat.title}</h3>
                      <p className="text-xs text-indigo-400 font-mono mt-0.5">{cat.command}</p>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-slate-800 border border-slate-700 text-xs font-mono text-slate-300">{cat.repos.length} Repos</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {cat.repos.map(r => (
                      <div key={r.name} className="p-3 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-between">
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="font-mono text-xs font-semibold text-indigo-300">{r.name}</span>
                            <span className="px-1.5 py-0.2 rounded bg-slate-800 text-[10px] font-mono text-slate-400">{r.tag}</span>
                            {r.meta && (
                              <span className={`px-1.5 py-0.2 rounded text-[10px] font-mono ${r.meta.securityScore >= 80 ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'}`}>
                                Score: {r.meta.securityScore}/100
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] text-slate-500 truncate max-w-xs mt-1">{r.url}</p>
                        </div>
                        <div className="flex items-center space-x-1">
                          <button onClick={() => setDiffModal({ title: r.name, originalContent: `# ${r.name}\n\nPath: ${r.url}` })} className="p-1.5 rounded hover:bg-slate-800 text-slate-400 hover:text-white transition" title={t.diffView}>
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
              ))}
            </div>
          )}

          {activeTab === 'mcp' && (
            <div className="space-y-4 p-5 rounded-xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-semibold text-slate-100">MCP Server Management</h3>
              <textarea value={mcpInputJson} onChange={e => setMcpInputJson(e.target.value)} rows="12" className="w-full p-4 rounded-lg bg-slate-950 border border-slate-800 font-mono text-xs text-indigo-300 focus:outline-none focus:border-indigo-500" />
              <button onClick={handleSaveMcp} className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium transition flex items-center space-x-2">
                <Icons.Check /> <span>Save & Sync All Tools</span>
              </button>
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
                      <button onClick={() => setDiffModal({ title: cmd.name, originalContent: cmd.content })} className="text-xs text-slate-400 hover:text-white flex items-center space-x-1 bg-slate-800 px-2 py-1 rounded">
                        <Icons.Eye /> <span>{t.diffView}</span>
                      </button>
                    </div>
                    <pre className="p-3 rounded bg-slate-950 text-[11px] font-mono text-slate-300 overflow-x-auto border border-slate-800 max-h-32">{cmd.content}</pre>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="space-y-6">
              <div className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
                <div>
                  <h3 className="text-base font-semibold text-slate-100">LLM Deep Threat Analysis Engine</h3>
                  <p className="text-xs text-slate-400 mt-1">Prompt Injection, malicious code execution and telemetry check.</p>
                </div>
                <button onClick={handleRunLlmScan} disabled={loadingAction === 'llm-scan'} className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-medium transition flex items-center space-x-2">
                  <Icons.Shield /> <span>{t.runLlmScan}</span>
                </button>
              </div>

              {llmReport && (
                <div className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-semibold text-slate-200">Scan Report: {llmReport.skillName}</h4>
                    <span className="px-2.5 py-1 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono text-xs font-bold">Grade: {llmReport.overallGrade}</span>
                  </div>
                  <p className="text-xs text-slate-500 font-mono">Engine: {llmReport.engine} | {llmReport.timestamp}</p>
                  <div className="space-y-2 pt-2">
                    {llmReport.findings.map(f => (
                      <div key={f.id} className="p-3 rounded bg-slate-950 border border-slate-800 text-xs flex justify-between items-center">
                        <span className="text-slate-300">{f.description}</span>
                        <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-400 font-mono text-[10px]">{f.severity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'presets' && (
            <div className="space-y-4">
              <h3 className="text-base font-semibold text-slate-100">Workflow Presets</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {presetsList.map(p => (
                  <div key={p.id} className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between space-y-4">
                    <div>
                      <h4 className="text-sm font-semibold text-slate-200">{p.title}</h4>
                      <p className="text-xs text-slate-400 mt-1">{p.description}</p>
                    </div>
                    <button className="w-full py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium transition">Activate Preset</button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'marketplace' && (
            <div className="space-y-4">
              <h3 className="text-base font-semibold text-slate-100">Skill Marketplace</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {marketplace.map(item => (
                  <div key={item.name} className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between space-y-3">
                    <div>
                      <h4 className="text-sm font-semibold text-slate-200">{item.label}</h4>
                      <p className="text-xs text-slate-400 mt-1">{item.desc}</p>
                    </div>
                    <button onClick={() => { setNewSkillUrl(item.url); setActiveTab('dashboard'); }} className="py-1.5 rounded bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-medium transition flex items-center justify-center space-x-1">
                      <Icons.Plus /> <span>Install as Submodule</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      {diffModal && (
        <DiffViewerModal title={diffModal.title} originalContent={diffModal.originalContent} onClose={() => setDiffModal(null)} />
      )}
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
