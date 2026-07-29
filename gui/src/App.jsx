const { useState, useEffect, useRef, useMemo } = React;

// ============================================================
// INLINE LUCIDE SVG ICONS (NO EMOJI COMPLIANT)
// ============================================================
const Icons = {
  Zap: () => <svg className="w-5 h-5 text-indigo-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
  Shield: () => <svg className="w-5 h-5 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
  Grid: () => <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>,
  Cpu: () => <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 15h3M1 9h3M1 15h3"/></svg>,
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
  AlertTriangle: () => <svg className="w-4 h-4 text-amber-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>,
  Server: () => <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="8" rx="2" ry="2"/><rect x="2" y="14" width="20" height="8" rx="2" ry="2"/><line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/></svg>,
};

// ============================================================
// MAIN APP COMPONENT
// ============================================================
function App() {
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

  // SSE LISTENERS
  useEffect(() => {
    addLog('Universal SSE EventSource bağlantısı kuruluyor...', 'info');
    const es = new EventSource('/api/events');

    es.onopen = () => {
      setSseConnected(true);
      addLog('SSE Canlı Push Bağlantısı Aktif (Django Channels Modu)', 'success');
    };

    es.addEventListener('status_update', (e) => {
      try {
        const data = JSON.parse(e.data);
        setAiStatus(data);
        addLog('19 Provider durumu SSE üzerinden güncellendi', 'info');
      } catch (err) {}
    });

    es.addEventListener('skills_update', (e) => {
      try {
        const data = JSON.parse(e.data);
        setSkillsData(data);
        addLog('Skill koleksiyonu SSE üzerinden güncellendi', 'info');
      } catch (err) {}
    });

    es.addEventListener('mcp_update', (e) => {
      try {
        const data = JSON.parse(e.data);
        setMcpConfig(data);
        setMcpInputJson(JSON.stringify(data, null, 2));
      } catch (err) {}
    });

    es.onerror = () => {
      setSseConnected(false);
    };

    return () => es.close();
  }, []);

  // INITIAL DATA FETCH
  const fetchData = async () => {
    try {
      const [sRes, kRes, mRes, cRes, pRes, mkRes] = await Promise.all([
        fetch('/api/status'),
        fetch('/api/skills'),
        fetch('/api/mcp'),
        fetch('/api/commands'),
        fetch('/api/presets'),
        fetch('/api/marketplace'),
      ]);

      if (sRes.ok) setAiStatus(await sRes.json());
      if (kRes.ok) setSkillsData(await kRes.json());
      if (mRes.ok) {
        const mData = await mRes.json();
        setMcpConfig(mData);
        setMcpInputJson(JSON.stringify(mData, null, 2));
      }
      if (cRes.ok) setCommandsList(await cRes.json());
      if (pRes.ok) setPresetsList(await pRes.json());
      if (mkRes.ok) setMarketplace(await mkRes.json());
    } catch (e) {
      addLog('Veri çekme hatası: ' + e.message, 'error');
    }
  };

  useEffect(() => { fetchData(); }, []);

  // HANDLERS
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
      addLog('Bağlantı hatası: ' + e.message, 'error');
    } finally {
      setLoadingAction(null);
    }
  };

  const handleAddSkill = async (e) => {
    e.preventDefault();
    if (!newSkillUrl) return;
    setLoadingAction('add-skill');
    addLog(`Git Submodule ekleniyor: ${newSkillUrl}...`, 'info');
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
      addLog('Ekleme hatası: ' + e.message, 'error');
    } finally {
      setLoadingAction(null);
    }
  };

  const handleRemoveSkill = async (skillName) => {
    if (!confirm(`[${skillName}] submodule kaydını silmek istediğinize emin misiniz?`)) return;
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
      addLog('Silme hatası: ' + e.message, 'error');
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
      addLog('Geçersiz JSON formatı: ' + e.message, 'error');
    }
  };

  const handleUpdateAll = async () => {
    setLoadingAction('update-all');
    addLog('Tüm submodule repoları git pull ile güncelleniyor...', 'info');
    try {
      const res = await fetch('/api/update', { method: 'POST' });
      const data = await res.json();
      addLog(data.output, data.success ? 'success' : 'error');
      fetchData();
    } catch (e) {
      addLog('Güncelleme hatası: ' + e.message, 'error');
    } finally {
      setLoadingAction(null);
    }
  };

  const installedCount = useMemo(() => Object.values(aiStatus).filter(a => a.installed).length, [aiStatus]);
  const linkedCount = useMemo(() => Object.values(aiStatus).filter(a => a.linked).length, [aiStatus]);

  return (
    <div className="flex h-screen bg-slate-950 text-slate-100 font-sans overflow-hidden">
      {/* SIDEBAR NAVIGATION */}
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
            <span className={`w-2 h-2 rounded-full ${sseConnected ? 'bg-emerald-400 animate-pulse' : 'bg-rose-500'}`} title={sseConnected ? 'SSE Push Aktif' : 'Bağlantı kesildi'} />
          </div>

          <nav className="p-2 space-y-1">
            <button onClick={() => setActiveTab('dashboard')} className={`w-full flex items-center space-x-3 px-3 py-2 rounded-md text-xs font-medium transition ${activeTab === 'dashboard' ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'}`}>
              <Icons.Grid /> <span>Dashboard ({installedCount}/19)</span>
            </button>
            <button onClick={() => setActiveTab('skills')} className={`w-full flex items-center space-x-3 px-3 py-2 rounded-md text-xs font-medium transition ${activeTab === 'skills' ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'}`}>
              <Icons.Code /> <span>Skills Hub</span>
            </button>
            <button onClick={() => setActiveTab('mcp')} className={`w-full flex items-center space-x-3 px-3 py-2 rounded-md text-xs font-medium transition ${activeTab === 'mcp' ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'}`}>
              <Icons.Server /> <span>MCP Servers</span>
            </button>
            <button onClick={() => setActiveTab('commands')} className={`w-full flex items-center space-x-3 px-3 py-2 rounded-md text-xs font-medium transition ${activeTab === 'commands' ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'}`}>
              <Icons.Terminal /> <span>Slash Commands</span>
            </button>
            <button onClick={() => setActiveTab('presets')} className={`w-full flex items-center space-x-3 px-3 py-2 rounded-md text-xs font-medium transition ${activeTab === 'presets' ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'}`}>
              <Icons.Sliders /> <span>Presets (Modlar)</span>
            </button>
            <button onClick={() => setActiveTab('marketplace')} className={`w-full flex items-center space-x-3 px-3 py-2 rounded-md text-xs font-medium transition ${activeTab === 'marketplace' ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'}`}>
              <Icons.ShoppingBag /> <span>Marketplace</span>
            </button>
          </nav>
        </div>

        <div className="p-3 border-t border-slate-800">
          <button onClick={() => setIsConsoleOpen(!isConsoleOpen)} className="w-full flex items-center justify-between px-3 py-2 rounded bg-slate-900 border border-slate-800 text-slate-300 text-xs font-mono">
            <span className="flex items-center space-x-2"><Icons.Terminal /> <span>Console Logs</span></span>
            <span className="px-1.5 py-0.5 rounded bg-slate-800 text-[10px]">{logs.length}</span>
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 flex flex-col overflow-hidden bg-slate-950">
        {/* HEADER */}
        <header className="h-14 border-b border-slate-800 px-6 flex items-center justify-between bg-slate-900/30">
          <div className="flex items-center space-x-3">
            <h2 className="text-sm font-semibold text-white capitalize">{activeTab} Overview</h2>
            <span className="text-xs text-slate-500 font-mono">| {linkedCount} Provider Linked</span>
          </div>
          <div className="flex items-center space-x-2">
            <button onClick={handleUpdateAll} disabled={loadingAction === 'update-all'} className="px-3 py-1.5 rounded-md bg-indigo-600/20 border border-indigo-500/30 hover:bg-indigo-600/30 text-indigo-300 text-xs font-medium flex items-center space-x-2 transition">
              <Icons.Refresh /> <span>{loadingAction === 'update-all' ? 'Güncelleniyor...' : 'Tüm Repoları Güncelle'}</span>
            </button>
          </div>
        </header>

        {/* CONTENT PANELS */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* TAB 1: DASHBOARD */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">AI Providers ({Object.keys(aiStatus).length})</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {Object.entries(aiStatus).map(([key, info]) => (
                    <div key={key} className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition flex flex-col justify-between space-y-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="text-sm font-semibold text-slate-200">{info.name}</h4>
                          <p className="text-[11px] font-mono text-slate-500 truncate max-w-[160px]">{info.path}</p>
                        </div>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-medium border ${info.installed ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-slate-800 text-slate-500 border-slate-700'}`}>
                          {info.installed ? 'Yüklü' : 'Algılanmadı'}
                        </span>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-slate-800/60">
                        <span className={`text-xs flex items-center space-x-1 ${info.linked ? 'text-emerald-400' : 'text-slate-500'}`}>
                          {info.linked ? <><Icons.Link /> <span>Bağlı</span></> : <><Icons.Unlink /> <span>Bağlı Değil</span></>}
                        </span>

                        <button onClick={() => handleToggleLink(key, info.linked)} disabled={loadingAction === `toggle-${key}`} className={`px-3 py-1 rounded text-xs font-medium transition ${info.linked ? 'bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 border border-rose-500/20' : 'bg-indigo-600 text-white hover:bg-indigo-500'}`}>
                          {info.linked ? 'Bağlantıyı Kes' : 'Bağla'}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* SKILL EKLEME FORMU */}
              <div className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-4">
                <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Canlı Yeni Skill Reposu Ekle (Git Submodule)</h3>
                <form onSubmit={handleAddSkill} className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <input type="text" placeholder="https://github.com/user/skill-repo.git" value={newSkillUrl} onChange={e => setNewSkillUrl(e.target.value)} className="px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-xs font-mono text-slate-200 focus:outline-none focus:border-indigo-500" required />
                  <select value={newSkillCategory} onChange={e => setNewSkillCategory(e.target.value)} className="px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-indigo-500">
                    <option value="core">Çekirdek Davranışlar (Core)</option>
                    <option value="web">Web & UI/UX Tasarımı</option>
                    <option value="mobile">Mobil & Masaüstü</option>
                    <option value="game">Oyun Stüdyosu</option>
                    <option value="security">Siber Güvenlik</option>
                    <option value="planning">Mimari Planlama</option>
                    <option value="marketing">Pazarlama & CRO</option>
                  </select>
                  <button type="submit" disabled={loadingAction === 'add-skill'} className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-medium transition flex items-center justify-center space-x-2">
                    <Icons.Plus /> <span>{loadingAction === 'add-skill' ? 'Klonlanıyor...' : 'Skill Reposu Ekle'}</span>
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* TAB 2: SKILLS HUB */}
          {activeTab === 'skills' && (
            <div className="space-y-6">
              {Object.entries(skillsData).map(([catKey, cat]) => (
                <div key={catKey} className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-base font-semibold text-slate-100">{cat.title}</h3>
                      <p className="text-xs text-indigo-400 font-mono mt-0.5">{cat.command}</p>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-slate-800 border border-slate-700 text-xs font-mono text-slate-300">{cat.repos.length} Repo</span>
                  </div>

                  {cat.repos.length > 0 ? (
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
                          <button onClick={() => handleRemoveSkill(r.name)} className="p-1.5 rounded hover:bg-rose-500/20 text-rose-400 transition" title="Repoyu Sil">
                            <Icons.Trash />
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-slate-500 italic">Bu kategoride henüz repo yok.</p>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* TAB 3: MCP SERVERS */}
          {activeTab === 'mcp' && (
            <div className="space-y-4 p-5 rounded-xl bg-slate-900/80 border border-slate-800">
              <div>
                <h3 className="text-base font-semibold text-slate-100">MCP Server Yönetimi</h3>
                <p className="text-xs text-slate-400 mt-1">mcp_config.json içeriğini düzenleyin. Kaydettiğinizde tüm AI araçlarına (Claude Code, Cursor vb.) otomatik aktarılır.</p>
              </div>

              <textarea value={mcpInputJson} onChange={e => setMcpInputJson(e.target.value)} rows="12" className="w-full p-4 rounded-lg bg-slate-950 border border-slate-800 font-mono text-xs text-indigo-300 focus:outline-none focus:border-indigo-500" />

              <button onClick={handleSaveMcp} className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium transition flex items-center space-x-2">
                <Icons.Check /> <span>Kaydet ve Tüm Araçlara Senkronize Et</span>
              </button>
            </div>
          )}

          {/* TAB 4: SLASH COMMANDS */}
          {activeTab === 'commands' && (
            <div className="space-y-4">
              <h3 className="text-base font-semibold text-slate-100">Yerel Slash Commands ({commandsList.length})</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {commandsList.map(cmd => (
                  <div key={cmd.name} className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs text-indigo-400">/{cmd.name}</span>
                      <span className="text-[10px] text-slate-500 font-mono">{cmd.fileName}</span>
                    </div>
                    <pre className="p-3 rounded bg-slate-950 text-[11px] font-mono text-slate-300 overflow-x-auto border border-slate-800 max-h-32">{cmd.content}</pre>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: PRESETS */}
          {activeTab === 'presets' && (
            <div className="space-y-4">
              <h3 className="text-base font-semibold text-slate-100">Hazır Geliştirici Modları (Presets)</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {presetsList.map(p => (
                  <div key={p.id} className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between space-y-4">
                    <div>
                      <h4 className="text-sm font-semibold text-slate-200">{p.title}</h4>
                      <p className="text-xs text-slate-400 mt-1">{p.description}</p>
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {p.skills.map(s => <span key={s} className="px-2 py-0.5 rounded bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 font-mono text-[10px]">{s}</span>)}
                      </div>
                    </div>
                    <button className="w-full py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium transition">Modu Aktifleştir</button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: MARKETPLACE */}
          {activeTab === 'marketplace' && (
            <div className="space-y-4">
              <h3 className="text-base font-semibold text-slate-100">Skill Marketplace</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {marketplace.map(item => (
                  <div key={item.name} className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between space-y-3">
                    <div>
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-semibold text-slate-200">{item.label}</h4>
                        <span className="px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20 text-amber-300 font-mono text-[10px]">{item.stars} stars</span>
                      </div>
                      <p className="text-xs text-slate-400 mt-1">{item.desc}</p>
                    </div>
                    <button onClick={() => { setNewSkillUrl(item.url); setActiveTab('dashboard'); }} className="py-1.5 rounded bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-medium transition flex items-center justify-center space-x-1">
                      <Icons.Plus /> <span>Tek Tıkla Submodule Olarak Ekle</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      {/* CONSOLE DRAWER */}
      {isConsoleOpen && (
        <div className="absolute bottom-0 left-64 right-0 h-48 bg-slate-900 border-t border-slate-800 flex flex-col z-50">
          <div className="px-4 py-2 border-b border-slate-800 flex items-center justify-between bg-slate-950">
            <span className="text-xs font-mono text-slate-400">System Logs & Realtime Events</span>
            <button onClick={() => setIsConsoleOpen(false)} className="text-xs text-slate-500 hover:text-slate-300">Kapat</button>
          </div>
          <div className="flex-1 p-3 overflow-y-auto font-mono text-[11px] space-y-1 bg-slate-950">
            {logs.map((l, i) => (
              <div key={i} className={`flex space-x-2 ${l.type === 'error' ? 'text-rose-400' : l.type === 'success' ? 'text-emerald-400' : 'text-slate-400'}`}>
                <span className="text-slate-600">[{l.time}]</span>
                <span>{l.msg}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
