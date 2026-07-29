// Multi-AI Skill Hub Official React 18 Application (App.jsx)
const { useState, useEffect, useCallback } = React;

// 1. SIDEBAR COMPONENT
function Sidebar({ activeCategory, onSelectCategory, liveSkills, onDeleteSkill }) {
  const allRepos = [];
  if (liveSkills) {
    Object.values(liveSkills).forEach(cat => {
      if (cat.repos) {
        cat.repos.forEach(r => {
          if (!allRepos.some(e => e.name === r.name)) allRepos.push(r);
        });
      }
    });
  }

  const categories = [
    { id: 'overview', name: '📊 Genel Dashboard', tag: 'Ana Sayfa' },
    { id: 'core', name: '🧠 Çekirdek Davranışlar', tag: '/caveman' },
    { id: 'web', name: '🎨 Web & UI/UX Tasarım', tag: '/ux-ui' },
    { id: 'mobile', name: '📱 Mobil (iOS & Android)', tag: '/mobile' },
    { id: 'game', name: '🎮 Oyun Stüdyosu', tag: '/game' },
    { id: 'security', name: '🔐 Siber Güvenlik', tag: '/security' },
    { id: 'planning', name: '📐 Mimari Planlama', tag: '/planning' },
    { id: 'marketing', name: '📈 Pazarlama & ASO', tag: '/marketing' },
  ];

  return (
    <aside className="w-full lg:w-80 bg-slate-900/80 backdrop-blur-xl border-r border-slate-800/80 p-6 flex flex-col justify-between shrink-0">
      <div>
        <div className="flex items-center gap-3 pb-6 mb-6 border-b border-slate-800/80">
          <span className="text-3xl">⚛️</span>
          <div>
            <h1 className="font-extrabold text-lg tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
              Multi-AI React App
            </h1>
            <p className="text-xs text-slate-400">React 18 JSX + Node.js REST API</p>
          </div>
        </div>

        {/* Categories Navigation */}
        <div className="mb-6">
          <h3 className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-3 px-1">
            📂 React Gezilebilir Kategoriler
          </h3>
          <nav className="space-y-1.5">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 text-xs font-medium rounded-xl transition-all ${
                  activeCategory === cat.id
                    ? 'bg-indigo-600 text-white font-semibold shadow-lg shadow-indigo-600/20'
                    : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
                }`}
              >
                <span className="flex items-center gap-2">{cat.name}</span>
                <span className={`text-[10px] ${activeCategory === cat.id ? 'bg-white/20' : 'text-slate-500 font-mono'} px-1.5 py-0.5 rounded`}>
                  {cat.tag}
                </span>
              </button>
            ))}
          </nav>
        </div>

        {/* Live Repos List with Delete Action */}
        <div className="mb-6">
          <h3 className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-3 px-1 flex justify-between items-center">
            <span>🔗 Canlı Repolar</span>
            <span className="text-[9px] bg-slate-800 text-slate-400 px-1.5 py-0.5 rounded font-mono">
              {allRepos.length} Repo
            </span>
          </h3>
          <div className="space-y-1.5 font-mono text-[11px]">
            {allRepos.map(r => (
              <div key={r.name} className="flex items-center justify-between p-2 rounded-lg bg-slate-950/60 border border-slate-800/60 hover:border-indigo-500/40 text-slate-300 transition-all group">
                <a href={r.url} target="_blank" className="truncate hover:text-indigo-300 flex-1">
                  {r.name}
                </a>
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] text-emerald-400 font-mono">{r.tag}</span>
                  <button
                    onClick={() => onDeleteSkill(r.name)}
                    className="opacity-0 group-hover:opacity-100 text-[10px] text-rose-400 hover:text-rose-300 px-1.5 py-0.5 rounded bg-rose-500/10 hover:bg-rose-500/20 transition-all"
                    title="Skill Reposunu Sil"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="pt-4 border-t border-slate-800/80 text-[11px] text-slate-500 flex justify-between items-center">
        <span>React 18 JSX Engine</span>
        <a href="https://github.com/imyigo/awesome-ai-agent-skills-manager" target="_blank" className="text-indigo-400 hover:underline">GitHub ⭐</a>
      </div>
    </aside>
  );
}

// 2. AI ASSISTANTS CARDS GRID COMPONENT
function AICardsGrid({ status, onToggleLink }) {
  const aiList = [
    { key: 'antigravity', name: 'Google Antigravity', icon: '🌌', path: '~/.gemini/antigravity' },
    { key: 'claude', name: 'Claude Code', icon: '🤖', path: '~/.claude' },
    { key: 'cursor', name: 'Cursor IDE', icon: '🖱️', path: '~/.cursor' },
    { key: 'codex', name: 'OpenAI Codex', icon: '📜', path: '~/.codex' },
  ];

  return (
    <section className="mb-10">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Bilgisayardaki AI Asistanları & Tercihli Bağlantılar</h3>
        <span className="text-[11px] text-slate-500">React JSX State ile yönetilen canlı bağlantılar.</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {aiList.map(ai => {
          const info = status[ai.key] || { installed: false, linked: false };
          return (
            <article key={ai.key} className="bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-5 shadow-xl flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center mb-3">
                  <span className="text-2xl">{ai.icon}</span>
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded ${
                    info.installed
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                      : 'bg-slate-800 text-slate-500'
                  }`}>
                    {info.installed ? 'Yüklü' : 'Sistemde Yok'}
                  </span>
                </div>
                <h4 className="font-semibold text-sm text-slate-200">{ai.name}</h4>
                <p className="text-[11px] text-slate-500 mt-1 truncate">{ai.path}</p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-800/60 flex justify-between items-center">
                <span className={`text-xs font-medium ${info.linked ? 'text-emerald-400' : 'text-slate-500'}`}>
                  {info.linked ? '✅ Bağlı' : '❌ Bağsız'}
                </span>
                <button
                  onClick={() => onToggleLink(ai.key)}
                  className={`text-xs px-3 py-1.5 rounded-lg font-semibold transition-all ${
                    info.linked
                      ? 'bg-rose-600/80 hover:bg-rose-500 text-white shadow-lg shadow-rose-600/20'
                      : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/20'
                  }`}
                >
                  {info.linked ? '🔌 Bağlantıyı Kes' : '🔗 Bağla'}
                </button>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

// 3. CATEGORY DETAIL COMPONENT
function CategoryDetail({ category, onBack, onDeleteSkill }) {
  if (!category) return null;

  return (
    <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-6 shadow-xl space-y-6">
      <div className="flex justify-between items-center pb-4 border-b border-slate-800/60">
        <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">Tetikleyici Slash Komutu</span>
        <code className="bg-slate-950 text-indigo-300 px-3 py-1.5 rounded-lg border border-slate-800 font-mono text-xs font-semibold">{category.command}</code>
      </div>
      
      <p className="text-xs text-slate-300 leading-relaxed">{category.description}</p>
      
      {category.repos && category.repos.length > 0 && (
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
            <span>🔗</span> İlgili Canlı GitHub Repoları (Node.js REST API)
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {category.repos.map(r => (
              <div key={r.name} className="flex items-center justify-between p-3 rounded-xl bg-slate-950/80 border border-slate-800/80 hover:border-indigo-500/50 transition-all group">
                <a href={r.url} target="_blank" className="font-mono text-xs text-slate-200 group-hover:text-indigo-300 truncate flex-1">
                  {r.name}
                </a>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded font-mono">{r.tag}</span>
                  <button
                    onClick={() => onDeleteSkill(r.name)}
                    className="text-xs text-rose-400 hover:text-rose-300 px-2 py-1 rounded bg-rose-500/10 hover:bg-rose-500/20 transition-all"
                    title="Sil"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {category.files && category.files.length > 0 && (
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
            <span>📄</span> İlgili Skill Dosyaları (Node.js Diski)
          </h4>
          <div className="flex flex-wrap gap-2">
            {category.files.map(f => (
              <span key={f} className="bg-slate-950 text-slate-300 font-mono text-[11px] px-3 py-1.5 rounded-lg border border-slate-800/80 flex items-center gap-1.5">
                <span className="text-indigo-400">#</span> {f}
              </span>
            ))}
          </div>
        </div>
      )}

      <div>
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
          <span>📜</span> Rehber Kuralları & Standartlar
        </h4>
        <ul className="space-y-2.5">
          {category.rules && category.rules.map((rule, idx) => (
            <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-300">
              <span className="text-emerald-400 font-bold">✓</span>
              <span>{rule}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-slate-800/60">
        <button onClick={onBack} className="bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold py-2.5 px-4 rounded-xl text-xs transition-all flex items-center justify-center gap-2">
          <span>⬅️ Dashboard'a Dön</span>
        </button>
      </div>
    </div>
  );
}

// 4. FLOATING TERMINAL DRAWER COMPONENT (VS CODE STYLE)
function TerminalDrawer({ logs, onClear }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-4 right-4 z-50 transition-all duration-300">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2.5 bg-slate-900/90 hover:bg-slate-800 text-indigo-300 border border-slate-700 px-4 py-2.5 rounded-2xl shadow-2xl backdrop-blur-xl text-xs font-semibold hover:border-indigo-500/50 transition-all"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>💻 Canlı Konsol ({logs.length})</span>
          <span className="text-[10px] bg-indigo-500/20 px-1.5 py-0.5 rounded text-indigo-300">Aç ▲</span>
        </button>
      ) : (
        <div className="w-80 sm:w-[480px] bg-slate-950/95 border border-slate-800 rounded-2xl shadow-2xl backdrop-blur-2xl overflow-hidden font-mono text-xs">
          <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900/90 border-b border-slate-800 text-slate-400">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
              <span class="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
              <span className="ml-2 font-semibold text-[11px] text-slate-300">node-terminal.log</span>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={onClear} className="hover:text-slate-200 text-[10px] bg-slate-800 px-2 py-0.5 rounded">
                Temizle
              </button>
              <button onClick={() => setIsOpen(false)} className="hover:text-rose-400 font-bold px-1.5 py-0.5">
                ▼
              </button>
            </div>
          </div>
          <pre className="p-4 text-indigo-300 whitespace-pre-wrap max-h-64 overflow-y-auto leading-relaxed text-[11px]">
            {logs.join('\n')}
          </pre>
        </div>
      )}
    </div>
  );
}

// 5. MAIN REACT APP COMPONENT
function App() {
  const [activeCategory, setActiveCategory] = useState('overview');
  const [aiStatus, setAiStatus] = useState({});
  const [liveSkills, setLiveSkills] = useState({});
  const [logs, setLogs] = useState(["⚡ VS Code Tarzı Yüzen Terminal Hazır."]);
  
  // Advanced Form State
  const [repoUrl, setRepoUrl] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('core');
  const [customRule, setCustomRule] = useState('');

  const addLog = (msg) => {
    setLogs(prev => [...prev, msg]);
  };

  const fetchStatus = useCallback(async () => {
    try {
      const res = await fetch('/api/status');
      const data = await res.json();
      setAiStatus(data);
    } catch (err) {
      addLog(`❌ AI Durumu Alınamadı: ${err.message}`);
    }
  }, []);

  const fetchSkills = useCallback(async () => {
    try {
      const res = await fetch('/api/skills');
      const data = await res.json();
      setLiveSkills(data);
    } catch (err) {
      addLog(`❌ Skill Verisi Alınamadı: ${err.message}`);
    }
  }, []);

  useEffect(() => {
    fetchStatus();
    fetchSkills();
  }, [fetchStatus, fetchSkills]);

  const handleToggleLink = async (aiKey) => {
    const isLinked = aiStatus[aiKey] ? aiStatus[aiKey].linked : false;
    const newState = !isLinked;
    addLog(`⌛ [${aiKey}] bağlantısı değiştiriliyor...`);

    try {
      const res = await fetch('/api/toggle-link', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ai: aiKey, state: newState })
      });
      const data = await res.json();
      addLog(data.message);
      fetchStatus();
    } catch (err) {
      addLog(`❌ Hata: ${err.message}`);
    }
  };

  const handleUpdateSkills = async () => {
    addLog("⌛ Canlı Git Submodule güncellemeleri çekiliyor...");
    try {
      const res = await fetch('/api/update', { method: 'POST' });
      const data = await res.json();
      addLog(data.output);
      fetchStatus();
      fetchSkills();
    } catch (err) {
      addLog(`❌ Güncelleme Hatası: ${err.message}`);
    }
  };

  const handleAddSkill = async (e) => {
    e.preventDefault();
    if (!repoUrl.trim()) return alert("Lütfen geçerli bir GitHub URL girin!");
    addLog(`⌛ Yeni repo ekleniyor (${selectedCategory}): ${repoUrl}...`);

    try {
      const res = await fetch('/api/add-skill', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          url: repoUrl,
          category: selectedCategory,
          customRule: customRule
        })
      });
      const data = await res.json();
      addLog(data.output);
      setRepoUrl('');
      setCustomRule('');
      fetchStatus();
      fetchSkills();
    } catch (err) {
      addLog(`❌ Ekleme Hatası: ${err.message}`);
    }
  };

  const handleDeleteSkill = async (skillName) => {
    if (!confirm(`[${skillName}] yetenek reposunu tamamen silmek istediğinize emin misiniz?`)) return;
    addLog(`⌛ [${skillName}] repnuzu siliniyor...`);

    try {
      const res = await fetch('/api/remove-skill', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: skillName })
      });
      const data = await res.json();
      addLog(data.output);
      fetchStatus();
      fetchSkills();
    } catch (err) {
      addLog(`❌ Silme Hatası: ${err.message}`);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen relative pb-16">
      <Sidebar
        activeCategory={activeCategory}
        onSelectCategory={setActiveCategory}
        liveSkills={liveSkills}
        onDeleteSkill={handleDeleteSkill}
      />

      <main className="flex-1 p-6 lg:p-10 max-w-5xl">
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-8 mb-8 border-b border-slate-800/80">
          <div>
            <h2 className="text-2xl font-extrabold tracking-tight text-white">
              {activeCategory === 'overview' ? 'React 18 Dashboard & AI Bağlantıları' : liveSkills[activeCategory]?.title}
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              {activeCategory === 'overview' ? 'Gelişmiş Kategori & Özel Kural Yönetimi' : liveSkills[activeCategory]?.subtitle}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button onClick={() => { fetchStatus(); fetchSkills(); }} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-all">
              <span>🔄 Yenile</span>
            </button>
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              React 18 Platform
            </span>
          </div>
        </header>

        {/* Content View Routing */}
        {activeCategory === 'overview' ? (
          <div>
            <AICardsGrid status={aiStatus} onToggleLink={handleToggleLink} />

            {/* Advanced Management & Add Skill Form Section */}
            <section className="mb-10">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">Gelişmiş Yönetim & Özel Skill Tanımlama</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Advanced Add Skill Form Card */}
                <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-6 shadow-xl">
                  <h4 className="text-base font-semibold text-white flex items-center gap-2 mb-2">
                    <span>➕</span> Canlı Yeni Skill & Özel Kural Ekle
                  </h4>
                  <p className="text-xs text-slate-400 mb-4">
                    Reponuzu istediğiniz kategoriye bağlayın ve özel AI kuralı ekleyin.
                  </p>

                  <form onSubmit={handleAddSkill} className="space-y-3">
                    <div>
                      <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">GitHub Repo URL</label>
                      <input
                        type="url"
                        value={repoUrl}
                        onChange={(e) => setRepoUrl(e.target.value)}
                        placeholder="https://github.com/user/custom-skill.git"
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-100 font-mono focus:border-indigo-500 focus:outline-none"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">Kategori Seçimi</label>
                        <select
                          value={selectedCategory}
                          onChange={(e) => setSelectedCategory(e.target.value)}
                          className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:border-indigo-500 focus:outline-none"
                        >
                          <option value="core">🧠 Çekirdek (Core)</option>
                          <option value="web">🎨 Web & UI/UX</option>
                          <option value="mobile">📱 Mobil (iOS/Android)</option>
                          <option value="game">🎮 Oyun Stüdyosu</option>
                          <option value="security">🔐 Siber Güvenlik</option>
                          <option value="planning">📐 Mimari Planlama</option>
                          <option value="marketing">📈 Pazarlama & ASO</option>
                        </select>
                      </div>

                      <div>
                        <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">Özel Kural (Opsiyonel)</label>
                        <input
                          type="text"
                          value={customRule}
                          onChange={(e) => setCustomRule(e.target.value)}
                          placeholder="Örn: TS Strict Mode Zorunlu"
                          className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-100 focus:border-indigo-500 focus:outline-none"
                        />
                      </div>
                    </div>

                    <button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold py-2.5 px-4 rounded-xl text-xs transition-all shadow-lg shadow-emerald-600/25 active:scale-[0.98]">
                      <span>➕ Skill & Kuralı Ekle</span>
                    </button>
                  </form>
                </div>

                {/* Submodule Update Card */}
                <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-6 shadow-xl flex flex-col justify-between">
                  <div>
                    <h4 className="text-base font-semibold text-white flex items-center gap-2">
                      <span>🔄</span> Canlı Repoları Güncelle
                    </h4>
                    <p className="text-xs text-slate-400 mt-2">
                      Orijinal GitHub repolarından en son sürüm değişikliklerini çeker ve submodule commit loglarını günceller.
                    </p>
                  </div>
                  <button onClick={handleUpdateSkills} className="mt-6 w-full bg-purple-600 hover:bg-purple-500 text-white font-semibold py-3 px-4 rounded-xl transition-all text-sm flex items-center justify-center gap-2 shadow-lg shadow-purple-600/25 active:scale-[0.98]">
                    <span>🔄 Tüm Skill Repolarını Güncelle</span>
                  </button>
                </div>

              </div>
            </section>
          </div>
        ) : (
          <CategoryDetail
            category={liveSkills[activeCategory]}
            onBack={() => setActiveCategory('overview')}
            onDeleteSkill={handleDeleteSkill}
          />
        )}
      </main>

      {/* Floating VS Code Style Terminal Drawer Component */}
      <TerminalDrawer logs={logs} onClear={() => setLogs(["⚡ Konsol temizlendi."])} />
    </div>
  );
}

// 5. REACT 18 MAIN ENTRY POINT
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
