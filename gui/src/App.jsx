// Multi-AI Skill Hub — React 18 App
// Designed by UX/UI Expert Skill:
//   - OKLCH-based color palette, 4px grid, semantic tokens
//   - Inter UI + JetBrains Mono, Major Third type scale
//   - Lucide inline SVG icons (no emoji per skill ABSOLUTE rule)
//   - WCAG 2.2 AA contrast (4.5:1 text, 3:1 UI)
//   - 8 interaction states per component
//   - Atomic Design: Atoms → Molecules → Organisms

const { useState, useEffect, useCallback, useRef } = React;

// ─── LUCIDE ICONS (inline SVG, currentColor) ─────────────────────────────────
const Icon = ({ name, size = 16, className = '' }) => {
  const paths = {
    cpu: '<circle cx="12" cy="12" r="10"/><rect x="8" y="8" width="8" height="8" rx="1"/><path d="M6 12H4M18 12h2M12 6V4M12 18v2M9 9l-1-1M15 9l1-1M15 15l1 1M9 15l-1 1"/>',
    link: '<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>',
    unlink: '<path d="m18.84 12.25 1.72-1.71h-.02a5.004 5.004 0 0 0-.12-7.07 5.01 5.01 0 0 0-6.95.12l-1.72 1.71"/><path d="m5.17 11.75-1.71 1.71a5.004 5.004 0 0 0 .12 7.07 5.01 5.01 0 0 0 6.95-.12l1.71-1.71"/><line x1="8" y1="2" x2="8" y2="5"/><line x1="2" y1="8" x2="5" y2="8"/><line x1="16" y1="19" x2="16" y2="22"/><line x1="19" y1="16" x2="22" y2="16"/>',
    check: '<polyline points="20 6 9 17 4 12"/>',
    x: '<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>',
    plus: '<line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>',
    trash2: '<polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/>',
    refresh: '<polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>',
    chevronDown: '<polyline points="6 9 12 15 18 9"/>',
    chevronUp: '<polyline points="18 15 12 9 6 15"/>',
    arrowLeft: '<line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>',
    terminal: '<polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/>',
    wifi: '<path d="M5 12.55a11 11 0 0 1 14.08 0"/><path d="M1.42 9a16 16 0 0 1 21.16 0"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><circle cx="12" cy="20" r="1"/>',
    wifiOff: '<line x1="1" y1="1" x2="23" y2="23"/><path d="M16.72 11.06A10.94 10.94 0 0 1 19 12.55"/><path d="M5 12.55a10.94 10.94 0 0 1 5.17-2.39"/><path d="M10.71 5.05A16 16 0 0 1 22.56 9"/><path d="M1.42 9a15.91 15.91 0 0 1 4.7-2.88"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><circle cx="12" cy="20" r="1"/>',
    github: '<path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>',
    folder: '<path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>',
    package: '<line x1="16.5" y1="9.4" x2="7.5" y2="4.21"/><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/>',
    zap: '<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>',
    shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>',
    globe: '<circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>',
    activity: '<polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>',
    settings: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>',
    star: '<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>',
  };
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      dangerouslySetInnerHTML={{ __html: paths[name] || '' }}
      aria-hidden="true"
    />
  );
};

// ─── DESIGN TOKENS (CSS Custom Properties injected once) ─────────────────────
const DesignTokens = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');

    :root {
      /* OKLCH Primitive Palette — Indigo brand */
      --primitive-indigo-50:  oklch(97% 0.02 264);
      --primitive-indigo-100: oklch(93% 0.05 264);
      --primitive-indigo-200: oklch(87% 0.09 264);
      --primitive-indigo-300: oklch(78% 0.14 264);
      --primitive-indigo-400: oklch(67% 0.18 264);
      --primitive-indigo-500: oklch(57% 0.22 264);
      --primitive-indigo-600: oklch(50% 0.22 264);
      --primitive-indigo-700: oklch(42% 0.20 264);
      --primitive-indigo-800: oklch(34% 0.16 264);
      --primitive-indigo-900: oklch(26% 0.11 264);

      --primitive-emerald-400: oklch(74% 0.18 162);
      --primitive-emerald-500: oklch(66% 0.19 162);
      --primitive-emerald-600: oklch(58% 0.18 162);

      --primitive-rose-400: oklch(70% 0.20 15);
      --primitive-rose-500: oklch(62% 0.22 15);
      --primitive-rose-600: oklch(54% 0.22 15);

      --primitive-amber-400: oklch(81% 0.18 80);
      --primitive-amber-500: oklch(74% 0.19 80);

      /* Neutral scale (near-neutral, slight cool lean) */
      --primitive-neutral-0:   oklch(100% 0 0);
      --primitive-neutral-50:  oklch(98% 0.003 264);
      --primitive-neutral-100: oklch(95% 0.005 264);
      --primitive-neutral-200: oklch(90% 0.008 264);
      --primitive-neutral-300: oklch(82% 0.01 264);
      --primitive-neutral-400: oklch(68% 0.012 264);
      --primitive-neutral-500: oklch(54% 0.014 264);
      --primitive-neutral-600: oklch(44% 0.014 264);
      --primitive-neutral-700: oklch(34% 0.012 264);
      --primitive-neutral-800: oklch(24% 0.01 264);
      --primitive-neutral-850: oklch(19% 0.01 264);
      --primitive-neutral-900: oklch(14% 0.008 264);
      --primitive-neutral-950: oklch(9%  0.006 264);
      --primitive-neutral-980: oklch(6%  0.005 264);

      /* Semantic Surface Tokens */
      --surface-page:        var(--primitive-neutral-980);
      --surface-panel:       var(--primitive-neutral-950);
      --surface-elevated:    var(--primitive-neutral-900);
      --surface-overlay:     var(--primitive-neutral-850);
      --surface-subtle:      oklch(11% 0.007 264 / 0.6);

      /* Semantic Text Tokens */
      --text-primary:    var(--primitive-neutral-50);
      --text-secondary:  var(--primitive-neutral-400);
      --text-tertiary:   var(--primitive-neutral-600);
      --text-inverse:    var(--primitive-neutral-950);
      --text-on-action:  var(--primitive-neutral-0);

      /* Semantic Action Tokens */
      --action-primary:       var(--primitive-indigo-500);
      --action-primary-hover: var(--primitive-indigo-400);
      --action-primary-active:var(--primitive-indigo-600);
      --action-destructive:   var(--primitive-rose-500);
      --action-destructive-hover: var(--primitive-rose-400);
      --action-success:       var(--primitive-emerald-500);
      --action-warning:       var(--primitive-amber-500);

      /* Semantic Border Tokens */
      --border-default:  oklch(90% 0.008 264 / 0.08);
      --border-subtle:   oklch(90% 0.008 264 / 0.05);
      --border-strong:   oklch(90% 0.008 264 / 0.16);
      --border-focus:    var(--primitive-indigo-400);

      /* Motion Tokens */
      --duration-fast:   120ms;
      --duration-base:   200ms;
      --duration-slow:   320ms;
      --ease-out:        cubic-bezier(0.0, 0.0, 0.2, 1);
      --ease-in-out:     cubic-bezier(0.4, 0.0, 0.2, 1);
      --ease-spring:     cubic-bezier(0.34, 1.56, 0.64, 1);

      /* Shadow Tokens */
      --shadow-sm:  0 1px 2px oklch(0% 0 0 / 0.3);
      --shadow-md:  0 4px 12px oklch(0% 0 0 / 0.35), 0 1px 3px oklch(0% 0 0 / 0.2);
      --shadow-lg:  0 8px 24px oklch(0% 0 0 / 0.4), 0 2px 6px oklch(0% 0 0 / 0.25);
      --shadow-focus: 0 0 0 2px var(--surface-page), 0 0 0 4px var(--border-focus);
      --shadow-action: 0 4px 14px var(--primitive-indigo-500 / 0.3);

      /* Radius Tokens */
      --radius-sm:  6px;
      --radius-md:  10px;
      --radius-lg:  14px;
      --radius-xl:  20px;
      --radius-full: 999px;

      /* Spacing (4px base) */
      --space-1:  4px;
      --space-2:  8px;
      --space-3:  12px;
      --space-4:  16px;
      --space-5:  20px;
      --space-6:  24px;
      --space-8:  32px;
      --space-10: 40px;
      --space-12: 48px;
      --space-16: 64px;

      /* Typography */
      --font-ui:   'Inter', system-ui, -apple-system, sans-serif;
      --font-mono: 'JetBrains Mono', 'Fira Code', monospace;
      --text-xs:   11px;
      --text-sm:   13px;
      --text-base: 15px;
      --text-lg:   18px;
      --text-xl:   22px;
      --text-2xl:  28px;
      --text-3xl:  36px;
    }

    /* Global Reset */
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    html { font-size: 16px; -webkit-font-smoothing: antialiased; }

    body {
      font-family: var(--font-ui);
      font-size: var(--text-base);
      background: var(--surface-page);
      color: var(--text-primary);
      min-height: 100vh;
      line-height: 1.5;
    }

    /* Scrollbar */
    ::-webkit-scrollbar { width: 6px; height: 6px; }
    ::-webkit-scrollbar-track { background: transparent; }
    ::-webkit-scrollbar-thumb { background: var(--border-strong); border-radius: var(--radius-full); }
    ::-webkit-scrollbar-thumb:hover { background: var(--text-tertiary); }

    /* Focus Ring */
    :focus-visible { outline: none; box-shadow: var(--shadow-focus); border-radius: var(--radius-sm); }

    /* Transitions */
    .transition-base { transition: background var(--duration-base) var(--ease-out),
                                  color var(--duration-base) var(--ease-out),
                                  border-color var(--duration-base) var(--ease-out),
                                  box-shadow var(--duration-base) var(--ease-out),
                                  opacity var(--duration-base) var(--ease-out); }

    /* Layout */
    .app-shell { display: flex; min-height: 100vh; }
    .sidebar {
      width: 272px;
      flex-shrink: 0;
      background: var(--surface-panel);
      border-right: 1px solid var(--border-default);
      display: flex;
      flex-direction: column;
      position: sticky;
      top: 0;
      height: 100vh;
      overflow-y: auto;
    }
    .main { flex: 1; min-width: 0; overflow-y: auto; }

    /* Sidebar Sections */
    .sidebar-header {
      padding: var(--space-5) var(--space-5) var(--space-4);
      border-bottom: 1px solid var(--border-subtle);
    }
    .sidebar-logo {
      display: flex;
      align-items: center;
      gap: var(--space-3);
    }
    .sidebar-logo-icon {
      width: 36px; height: 36px;
      background: linear-gradient(135deg, var(--primitive-indigo-600), var(--primitive-indigo-400));
      border-radius: var(--radius-md);
      display: flex; align-items: center; justify-content: center;
      color: var(--text-on-action);
      box-shadow: 0 2px 8px oklch(57% 0.22 264 / 0.35);
      flex-shrink: 0;
    }
    .sidebar-logo-name {
      font-size: var(--text-sm);
      font-weight: 600;
      color: var(--text-primary);
      letter-spacing: -0.01em;
    }
    .sidebar-logo-sub {
      font-size: var(--text-xs);
      color: var(--text-tertiary);
      margin-top: 1px;
    }

    .sidebar-section { padding: var(--space-4) var(--space-3); }
    .sidebar-section + .sidebar-section { border-top: 1px solid var(--border-subtle); }
    .sidebar-label {
      font-size: 10px;
      font-weight: 600;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: var(--text-tertiary);
      padding: 0 var(--space-2) var(--space-2);
    }

    /* Nav Items */
    .nav-item {
      display: flex;
      align-items: center;
      gap: var(--space-2);
      padding: var(--space-2) var(--space-2);
      border-radius: var(--radius-md);
      cursor: pointer;
      border: none;
      background: transparent;
      width: 100%;
      text-align: left;
      color: var(--text-secondary);
      font-size: var(--text-sm);
      font-weight: 500;
      font-family: var(--font-ui);
      transition: background var(--duration-fast) var(--ease-out),
                  color var(--duration-fast) var(--ease-out);
    }
    .nav-item:hover { background: var(--border-default); color: var(--text-primary); }
    .nav-item.active {
      background: oklch(57% 0.22 264 / 0.15);
      color: var(--primitive-indigo-300);
    }
    .nav-item.active .nav-badge { background: oklch(57% 0.22 264 / 0.2); color: var(--primitive-indigo-300); }
    .nav-item-icon { flex-shrink: 0; opacity: 0.7; }
    .nav-item.active .nav-item-icon { opacity: 1; }
    .nav-item-label { flex: 1; }
    .nav-badge {
      font-size: 10px;
      font-weight: 600;
      font-family: var(--font-mono);
      background: var(--surface-elevated);
      color: var(--text-tertiary);
      padding: 1px 6px;
      border-radius: var(--radius-full);
      letter-spacing: 0;
    }

    /* Repo rows */
    .repo-row {
      display: flex;
      align-items: center;
      gap: var(--space-2);
      padding: var(--space-2);
      border-radius: var(--radius-md);
      transition: background var(--duration-fast) var(--ease-out);
    }
    .repo-row:hover { background: var(--border-subtle); }
    .repo-link {
      flex: 1;
      font-size: var(--text-xs);
      font-family: var(--font-mono);
      color: var(--text-secondary);
      text-decoration: none;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      transition: color var(--duration-fast) var(--ease-out);
    }
    .repo-link:hover { color: var(--primitive-indigo-300); }
    .repo-tag {
      font-size: 10px;
      font-family: var(--font-mono);
      color: var(--primitive-emerald-400);
      flex-shrink: 0;
    }
    .repo-delete-btn {
      opacity: 0;
      border: none;
      background: transparent;
      cursor: pointer;
      color: var(--action-destructive);
      padding: 2px;
      border-radius: var(--radius-sm);
      display: flex;
      align-items: center;
      transition: opacity var(--duration-fast) var(--ease-out),
                  background var(--duration-fast) var(--ease-out);
    }
    .repo-row:hover .repo-delete-btn { opacity: 1; }
    .repo-delete-btn:hover { background: oklch(62% 0.22 15 / 0.12); }

    /* Sidebar Footer */
    .sidebar-footer {
      margin-top: auto;
      padding: var(--space-4) var(--space-5);
      border-top: 1px solid var(--border-subtle);
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .sidebar-footer-text { font-size: var(--text-xs); color: var(--text-tertiary); }
    .sidebar-footer-link {
      font-size: var(--text-xs);
      color: var(--primitive-indigo-400);
      text-decoration: none;
      display: flex;
      align-items: center;
      gap: 4px;
      transition: color var(--duration-fast);
    }
    .sidebar-footer-link:hover { color: var(--primitive-indigo-300); }

    /* Main Content */
    .content-wrap { padding: var(--space-8) var(--space-10); max-width: 900px; }

    /* Page Header */
    .page-header {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: var(--space-4);
      margin-bottom: var(--space-8);
      padding-bottom: var(--space-6);
      border-bottom: 1px solid var(--border-default);
    }
    .page-title { font-size: var(--text-2xl); font-weight: 700; letter-spacing: -0.03em; line-height: 1.2; }
    .page-subtitle { font-size: var(--text-sm); color: var(--text-secondary); margin-top: var(--space-1); }
    .header-actions { display: flex; align-items: center; gap: var(--space-2); flex-shrink: 0; }

    /* Status Pill */
    .status-pill {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 5px 12px;
      border-radius: var(--radius-full);
      font-size: var(--text-xs);
      font-weight: 600;
      background: oklch(66% 0.19 162 / 0.1);
      color: var(--primitive-emerald-400);
      border: 1px solid oklch(66% 0.19 162 / 0.2);
    }
    .status-dot {
      width: 7px; height: 7px;
      border-radius: var(--radius-full);
      background: var(--primitive-emerald-400);
      animation: pulse 2s ease-in-out infinite;
    }
    @keyframes pulse {
      0%, 100% { opacity: 1; transform: scale(1); }
      50% { opacity: 0.5; transform: scale(0.8); }
    }

    /* Buttons — Atom */
    .btn {
      display: inline-flex;
      align-items: center;
      gap: var(--space-2);
      padding: 7px 14px;
      border-radius: var(--radius-md);
      font-size: var(--text-sm);
      font-weight: 500;
      font-family: var(--font-ui);
      border: 1px solid transparent;
      cursor: pointer;
      transition: background var(--duration-fast) var(--ease-out),
                  color var(--duration-fast) var(--ease-out),
                  border-color var(--duration-fast) var(--ease-out),
                  box-shadow var(--duration-fast) var(--ease-out),
                  transform var(--duration-fast) var(--ease-spring);
      white-space: nowrap;
      user-select: none;
    }
    .btn:active { transform: scale(0.97); }
    .btn-ghost {
      background: transparent;
      border-color: var(--border-strong);
      color: var(--text-secondary);
    }
    .btn-ghost:hover { background: var(--border-default); color: var(--text-primary); border-color: var(--border-strong); }
    .btn-primary {
      background: var(--action-primary);
      color: var(--text-on-action);
      box-shadow: 0 1px 2px oklch(0% 0 0 / 0.2), 0 0 0 1px oklch(57% 0.22 264 / 0.5) inset;
    }
    .btn-primary:hover { background: var(--action-primary-hover); box-shadow: 0 2px 8px oklch(57% 0.22 264 / 0.4), 0 0 0 1px oklch(67% 0.18 264 / 0.5) inset; }
    .btn-success {
      background: var(--action-success);
      color: var(--text-on-action);
      box-shadow: 0 1px 2px oklch(0% 0 0 / 0.2);
    }
    .btn-success:hover { background: var(--primitive-emerald-400); box-shadow: 0 2px 8px oklch(66% 0.19 162 / 0.35); }
    .btn-danger {
      background: oklch(62% 0.22 15 / 0.12);
      color: var(--primitive-rose-400);
      border-color: oklch(62% 0.22 15 / 0.2);
    }
    .btn-danger:hover { background: oklch(62% 0.22 15 / 0.2); color: var(--primitive-rose-300); }
    .btn-purple {
      background: oklch(57% 0.22 280);
      color: var(--text-on-action);
      box-shadow: 0 1px 2px oklch(0% 0 0 / 0.2);
    }
    .btn-purple:hover { background: oklch(63% 0.22 280); box-shadow: 0 2px 8px oklch(57% 0.22 280 / 0.35); }
    .btn-sm { padding: 5px 10px; font-size: var(--text-xs); }
    .btn-full { width: 100%; justify-content: center; padding: 10px 14px; }

    /* Card — Molecule */
    .card {
      background: var(--surface-panel);
      border: 1px solid var(--border-default);
      border-radius: var(--radius-xl);
      overflow: hidden;
    }
    .card-body { padding: var(--space-5); }
    .card-hover { transition: border-color var(--duration-base) var(--ease-out), box-shadow var(--duration-base) var(--ease-out); }
    .card-hover:hover { border-color: var(--border-strong); box-shadow: var(--shadow-md); }

    /* AI Card — Organism */
    .ai-card { display: flex; flex-direction: column; height: 100%; }
    .ai-card-header { display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: var(--space-4); }
    .ai-card-icon {
      width: 40px; height: 40px;
      border-radius: var(--radius-lg);
      display: flex; align-items: center; justify-content: center;
      font-size: 18px;
      flex-shrink: 0;
    }
    .ai-card-name { font-size: var(--text-sm); font-weight: 600; color: var(--text-primary); }
    .ai-card-path { font-size: var(--text-xs); color: var(--text-tertiary); margin-top: 2px; font-family: var(--font-mono); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    .ai-card-footer { margin-top: auto; padding-top: var(--space-4); border-top: 1px solid var(--border-subtle); display: flex; align-items: center; justify-content: space-between; }
    .link-status { display: flex; align-items: center; gap: 6px; font-size: var(--text-xs); font-weight: 500; }
    .link-status.linked { color: var(--primitive-emerald-400); }
    .link-status.unlinked { color: var(--text-tertiary); }

    /* Badge */
    .badge {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      padding: 3px 8px;
      border-radius: var(--radius-full);
      font-size: 11px;
      font-weight: 600;
      line-height: 1;
    }
    .badge-success { background: oklch(66% 0.19 162 / 0.12); color: var(--primitive-emerald-400); border: 1px solid oklch(66% 0.19 162 / 0.2); }
    .badge-neutral { background: var(--surface-elevated); color: var(--text-tertiary); border: 1px solid var(--border-default); }
    .badge-primary { background: oklch(57% 0.22 264 / 0.12); color: var(--primitive-indigo-300); border: 1px solid oklch(57% 0.22 264 / 0.2); }
    .badge-warning { background: oklch(81% 0.18 80 / 0.12); color: var(--primitive-amber-400); border: 1px solid oklch(81% 0.18 80 / 0.15); }

    /* Section header */
    .section-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: var(--space-4); }
    .section-title { font-size: var(--text-xs); font-weight: 600; letter-spacing: 0.07em; text-transform: uppercase; color: var(--text-tertiary); }

    /* Grid */
    .grid-4 { display: grid; grid-template-columns: repeat(4, 1fr); gap: var(--space-4); }
    .grid-2 { display: grid; grid-template-columns: repeat(2, 1fr); gap: var(--space-4); }

    @media (max-width: 1100px) { .grid-4 { grid-template-columns: repeat(2, 1fr); } }
    @media (max-width: 700px)  { .grid-4 { grid-template-columns: 1fr; } .grid-2 { grid-template-columns: 1fr; } }

    /* Section spacing */
    .section { margin-bottom: var(--space-10); }

    /* Form */
    .form-label { font-size: var(--text-xs); font-weight: 600; color: var(--text-secondary); text-transform: uppercase; letter-spacing: 0.06em; display: block; margin-bottom: var(--space-2); }
    .form-input {
      width: 100%;
      background: var(--surface-page);
      border: 1px solid var(--border-strong);
      border-radius: var(--radius-md);
      padding: 8px 12px;
      font-size: var(--text-sm);
      font-family: var(--font-ui);
      color: var(--text-primary);
      transition: border-color var(--duration-fast), box-shadow var(--duration-fast);
    }
    .form-input:focus { outline: none; border-color: var(--border-focus); box-shadow: 0 0 0 3px oklch(57% 0.22 264 / 0.15); }
    .form-input::placeholder { color: var(--text-tertiary); }
    .form-input.mono { font-family: var(--font-mono); font-size: var(--text-xs); }
    select.form-input { cursor: pointer; appearance: none; background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23888' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E"); background-repeat: no-repeat; background-position: right 10px center; padding-right: 28px; }
    .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-3); }
    .form-stack { display: flex; flex-direction: column; gap: var(--space-3); }

    /* Category detail */
    .detail-command { display: inline-flex; align-items: center; gap: var(--space-2); background: var(--surface-page); border: 1px solid var(--border-strong); border-radius: var(--radius-md); padding: 4px 12px; font-family: var(--font-mono); font-size: var(--text-xs); color: var(--primitive-indigo-300); }
    .detail-description { font-size: var(--text-sm); color: var(--text-secondary); line-height: 1.65; margin-bottom: var(--space-6); }
    .rule-item { display: flex; align-items: flex-start; gap: var(--space-3); padding: var(--space-3) 0; border-bottom: 1px solid var(--border-subtle); }
    .rule-item:last-child { border-bottom: none; }
    .rule-check { flex-shrink: 0; color: var(--primitive-emerald-400); margin-top: 1px; }
    .rule-text { font-size: var(--text-sm); color: var(--text-secondary); line-height: 1.55; }
    .file-chip { display: inline-flex; align-items: center; gap: 6px; background: var(--surface-elevated); border: 1px solid var(--border-default); border-radius: var(--radius-md); padding: 4px 10px; font-family: var(--font-mono); font-size: var(--text-xs); color: var(--text-secondary); }
    .file-chip-hash { color: var(--primitive-indigo-400); }

    /* Category detail repo card */
    .repo-card { display: flex; align-items: center; justify-content: space-between; padding: var(--space-3) var(--space-4); background: var(--surface-page); border: 1px solid var(--border-default); border-radius: var(--radius-lg); transition: border-color var(--duration-fast), background var(--duration-fast); }
    .repo-card:hover { border-color: var(--border-strong); background: var(--surface-elevated); }
    .repo-card a { font-family: var(--font-mono); font-size: var(--text-xs); color: var(--text-secondary); text-decoration: none; flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; transition: color var(--duration-fast); }
    .repo-card:hover a { color: var(--primitive-indigo-300); }

    /* Terminal Drawer */
    .terminal-fab {
      position: fixed;
      bottom: var(--space-5);
      right: var(--space-5);
      z-index: 100;
    }
    .terminal-pill {
      display: flex;
      align-items: center;
      gap: var(--space-2);
      background: var(--surface-panel);
      border: 1px solid var(--border-strong);
      border-radius: var(--radius-full);
      padding: 8px 16px 8px 12px;
      cursor: pointer;
      font-size: var(--text-xs);
      font-weight: 500;
      color: var(--text-secondary);
      box-shadow: var(--shadow-lg);
      transition: background var(--duration-fast), color var(--duration-fast), border-color var(--duration-fast);
    }
    .terminal-pill:hover { background: var(--surface-elevated); color: var(--text-primary); border-color: var(--border-focus); }
    .terminal-panel {
      width: 460px;
      background: var(--surface-panel);
      border: 1px solid var(--border-strong);
      border-radius: var(--radius-xl);
      box-shadow: var(--shadow-lg);
      overflow: hidden;
    }
    .terminal-titlebar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 10px var(--space-4);
      background: var(--surface-overlay);
      border-bottom: 1px solid var(--border-default);
    }
    .terminal-dots { display: flex; gap: 6px; }
    .terminal-dot { width: 12px; height: 12px; border-radius: var(--radius-full); }
    .terminal-dot-red { background: oklch(62% 0.22 15 / 0.7); }
    .terminal-dot-yellow { background: oklch(81% 0.18 80 / 0.7); }
    .terminal-dot-green { background: oklch(66% 0.19 162 / 0.7); }
    .terminal-filename { font-size: var(--text-xs); font-family: var(--font-mono); color: var(--text-tertiary); }
    .terminal-actions { display: flex; gap: var(--space-2); }
    .terminal-body { padding: var(--space-4); font-family: var(--font-mono); font-size: 12px; line-height: 1.7; color: var(--primitive-indigo-300); max-height: 240px; overflow-y: auto; white-space: pre-wrap; }

    /* Divider */
    .divider { border: none; border-top: 1px solid var(--border-default); margin: var(--space-6) 0; }

    /* Subsection label */
    .subsection-label { font-size: var(--text-xs); font-weight: 600; letter-spacing: 0.06em; text-transform: uppercase; color: var(--text-tertiary); margin-bottom: var(--space-3); display: flex; align-items: center; gap: var(--space-2); }

    /* Ai card tinted icons */
    .ai-icon-indigo { background: oklch(57% 0.22 264 / 0.15); color: var(--primitive-indigo-300); }
    .ai-icon-emerald { background: oklch(66% 0.19 162 / 0.12); color: var(--primitive-emerald-400); }
    .ai-icon-amber   { background: oklch(81% 0.18 80  / 0.12); color: var(--primitive-amber-400); }
    .ai-icon-rose    { background: oklch(62% 0.22 15  / 0.12); color: var(--primitive-rose-400); }
  `}</style>
);

// ─── SIDEBAR ─────────────────────────────────────────────────────────────────
const CATEGORIES = [
  { id: 'overview', label: 'Dashboard',        icon: 'activity',  tag: 'Home'      },
  { id: 'core',     label: 'Core Behavior',    icon: 'cpu',       tag: '/caveman'  },
  { id: 'web',      label: 'Web & UI/UX',      icon: 'globe',     tag: '/ux-ui'    },
  { id: 'mobile',   label: 'Mobile',           icon: 'zap',       tag: '/mobile'   },
  { id: 'game',     label: 'Game Studio',      icon: 'star',      tag: '/game'     },
  { id: 'security', label: 'Security',         icon: 'shield',    tag: '/security' },
  { id: 'planning', label: 'Architecture',     icon: 'settings',  tag: '/planning' },
  { id: 'marketing',label: 'Marketing & ASO',  icon: 'activity',  tag: '/market'   },
];

function Sidebar({ active, onSelect, liveSkills, onDeleteSkill }) {
  const allRepos = [];
  if (liveSkills) {
    Object.values(liveSkills).forEach(cat => {
      if (cat.repos) cat.repos.forEach(r => {
        if (!allRepos.some(e => e.name === r.name)) allRepos.push(r);
      });
    });
  }

  return (
    <aside className="sidebar" role="navigation" aria-label="Primary navigation">
      <div className="sidebar-header">
        <div className="sidebar-logo">
          <div className="sidebar-logo-icon" aria-hidden="true">
            <Icon name="package" size={18} />
          </div>
          <div>
            <div className="sidebar-logo-name">Skill Hub</div>
            <div className="sidebar-logo-sub">React 18 + Node.js</div>
          </div>
        </div>
      </div>

      <div className="sidebar-section">
        <div className="sidebar-label">Navigation</div>
        {CATEGORIES.map(cat => (
          <button
            key={cat.id}
            className={`nav-item transition-base${active === cat.id ? ' active' : ''}`}
            onClick={() => onSelect(cat.id)}
            aria-current={active === cat.id ? 'page' : undefined}
          >
            <span className="nav-item-icon" aria-hidden="true"><Icon name={cat.icon} size={15} /></span>
            <span className="nav-item-label">{cat.label}</span>
            <span className="nav-badge">{cat.tag}</span>
          </button>
        ))}
      </div>

      <div className="sidebar-section">
        <div className="sidebar-label" style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span>Live Repos</span>
          <span className="badge badge-neutral">{allRepos.length}</span>
        </div>
        {allRepos.length === 0 && (
          <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)', padding: '0 8px' }}>No repos found</p>
        )}
        {allRepos.map(r => (
          <div key={r.name} className="repo-row">
            <Icon name="package" size={12} style={{ color: 'var(--text-tertiary)', flexShrink: 0 }} />
            <a href={r.url} target="_blank" rel="noreferrer" className="repo-link">{r.name}</a>
            <span className="repo-tag">{r.tag}</span>
            <button
              className="repo-delete-btn"
              onClick={() => onDeleteSkill(r.name)}
              aria-label={`Delete ${r.name}`}
            >
              <Icon name="x" size={12} />
            </button>
          </div>
        ))}
      </div>

      <div className="sidebar-footer">
        <span className="sidebar-footer-text">Multi-AI Skill Hub</span>
        <a
          href="https://github.com/imyigo/awesome-ai-agent-skills-manager"
          target="_blank"
          rel="noreferrer"
          className="sidebar-footer-link"
        >
          <Icon name="github" size={13} />
          <span>GitHub</span>
        </a>
      </div>
    </aside>
  );
}

// ─── AI CARD ATOM ─────────────────────────────────────────────────────────────
const AI_LIST = [
  { key: 'antigravity', label: 'Google Antigravity', path: '~/.gemini/antigravity', iconClass: 'ai-icon-indigo', iconName: 'zap' },
  { key: 'claude',      label: 'Claude Code',         path: '~/.claude',             iconClass: 'ai-icon-emerald', iconName: 'cpu'  },
  { key: 'cursor',      label: 'Cursor IDE',           path: '~/.cursor',             iconClass: 'ai-icon-amber',  iconName: 'activity' },
  { key: 'codex',       label: 'OpenAI Codex',         path: '~/.codex',              iconClass: 'ai-icon-rose',   iconName: 'terminal'  },
];

function AICard({ ai, info = {}, onToggle }) {
  return (
    <article className="card card-hover ai-card" aria-label={ai.label}>
      <div className="card-body" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <div className="ai-card-header">
          <div className={`ai-card-icon ${ai.iconClass}`} aria-hidden="true">
            <Icon name={ai.iconName} size={18} />
          </div>
          <span className={`badge ${info.installed ? 'badge-success' : 'badge-neutral'}`}>
            {info.installed ? (
              <><Icon name="check" size={10} /> Installed</>
            ) : 'Not found'}
          </span>
        </div>
        <div className="ai-card-name">{ai.label}</div>
        <div className="ai-card-path">{ai.path}</div>
        <div className="ai-card-footer">
          <div className={`link-status ${info.linked ? 'linked' : 'unlinked'}`}>
            <Icon name={info.linked ? 'link' : 'unlink'} size={13} />
            <span>{info.linked ? 'Linked' : 'Unlinked'}</span>
          </div>
          <button
            className={`btn btn-sm ${info.linked ? 'btn-danger' : 'btn-primary'}`}
            onClick={() => onToggle(ai.key)}
          >
            <Icon name={info.linked ? 'unlink' : 'link'} size={13} />
            {info.linked ? 'Unlink' : 'Link'}
          </button>
        </div>
      </div>
    </article>
  );
}

// ─── CATEGORY DETAIL ──────────────────────────────────────────────────────────
function CategoryDetail({ category, onBack, onDeleteSkill }) {
  if (!category) return (
    <div style={{ color: 'var(--text-tertiary)', fontSize: 'var(--text-sm)', padding: 'var(--space-8)' }}>
      Category data loading...
    </div>
  );
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', marginBottom: 'var(--space-6)' }}>
        <button className="btn btn-ghost btn-sm" onClick={onBack}>
          <Icon name="arrowLeft" size={14} /> Dashboard
        </button>
        <span style={{ color: 'var(--border-strong)' }}>/</span>
        <span className="detail-command">
          <Icon name="terminal" size={12} />
          {category.command}
        </span>
      </div>

      <p className="detail-description">{category.description}</p>

      {category.repos?.length > 0 && (
        <div className="section">
          <div className="subsection-label">
            <Icon name="github" size={13} />
            Live Repositories
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
            {category.repos.map(r => (
              <div key={r.name} className="repo-card">
                <a href={r.url} target="_blank" rel="noreferrer">{r.name}</a>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', flexShrink: 0 }}>
                  <span className="badge badge-success" style={{ fontFamily: 'var(--font-mono)' }}>{r.tag}</span>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => onDeleteSkill(r.name)}
                    aria-label={`Delete ${r.name}`}
                    style={{ padding: '4px 8px' }}
                  >
                    <Icon name="trash2" size={13} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {category.files?.length > 0 && (
        <div className="section">
          <div className="subsection-label"><Icon name="folder" size={13} /> Skill Files</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
            {category.files.map(f => (
              <span key={f} className="file-chip">
                <span className="file-chip-hash">#</span>
                {f.split('/').pop()}
              </span>
            ))}
          </div>
        </div>
      )}

      {category.rules?.length > 0 && (
        <div className="section">
          <div className="subsection-label"><Icon name="check" size={13} /> Rules & Standards</div>
          <div className="card"><div className="card-body" style={{ padding: 0 }}>
            {category.rules.map((rule, i) => (
              <div key={i} className="rule-item" style={{ padding: 'var(--space-3) var(--space-5)' }}>
                <span className="rule-check"><Icon name="check" size={14} /></span>
                <span className="rule-text">{rule}</span>
              </div>
            ))}
          </div></div>
        </div>
      )}
    </div>
  );
}

// ─── TERMINAL DRAWER ──────────────────────────────────────────────────────────
function TerminalDrawer({ logs, onClear }) {
  const [open, setOpen] = useState(false);
  const bodyRef = useRef(null);
  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [logs, open]);

  return (
    <div className="terminal-fab">
      {!open ? (
        <button className="terminal-pill" onClick={() => setOpen(true)} aria-label="Open console log">
          <Icon name="terminal" size={14} />
          <span>Console</span>
          <span className="badge badge-primary" style={{ marginLeft: 4 }}>{logs.length}</span>
        </button>
      ) : (
        <div className="terminal-panel" role="log" aria-label="Console log" aria-live="polite">
          <div className="terminal-titlebar">
            <div className="terminal-dots" aria-hidden="true">
              <div className="terminal-dot terminal-dot-red" />
              <div className="terminal-dot terminal-dot-yellow" />
              <div className="terminal-dot terminal-dot-green" />
            </div>
            <span className="terminal-filename">node-terminal.log</span>
            <div className="terminal-actions">
              <button className="btn btn-ghost btn-sm" onClick={onClear} style={{ padding: '2px 8px' }}>Clear</button>
              <button className="btn btn-ghost btn-sm" onClick={() => setOpen(false)} style={{ padding: '2px 8px' }}>
                <Icon name="chevronDown" size={13} />
              </button>
            </div>
          </div>
          <div className="terminal-body" ref={bodyRef}>
            {logs.join('\n')}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
function App() {
  const [active, setActive]         = useState('overview');
  const [aiStatus, setAiStatus]     = useState({});
  const [liveSkills, setLiveSkills] = useState({});
  const [logs, setLogs]             = useState(['[system] Skill Hub initialized.']);
  const [repoUrl, setRepoUrl]       = useState('');
  const [selectedCat, setSelectedCat] = useState('core');
  const [customRule, setCustomRule] = useState('');

  const addLog = useCallback((msg) => setLogs(p => [...p, msg]), []);

  const fetchStatus = useCallback(async () => {
    try {
      const data = await fetch('/api/status').then(r => r.json());
      setAiStatus(data);
    } catch (e) { addLog(`[error] status: ${e.message}`); }
  }, [addLog]);

  const fetchSkills = useCallback(async () => {
    try {
      const data = await fetch('/api/skills').then(r => r.json());
      setLiveSkills(data);
    } catch (e) { addLog(`[error] skills: ${e.message}`); }
  }, [addLog]);

  useEffect(() => {
    fetchStatus();
    fetchSkills();

    const es = new EventSource('/api/events');
    es.addEventListener('connected', (e) => {
      const d = JSON.parse(e.data);
      addLog(`[sse] connected — ${d.time.slice(11,19)} UTC, clients: ${d.clients}`);
    });
    es.addEventListener('status_update', (e) => {
      setAiStatus(JSON.parse(e.data));
      addLog('[sse] status_update received');
    });
    es.addEventListener('skills_update', (e) => {
      setLiveSkills(JSON.parse(e.data));
      addLog('[sse] skills_update received');
    });
    es.onerror = () => addLog('[sse] reconnecting...');
    return () => es.close();
  }, [fetchStatus, fetchSkills, addLog]);

  const handleToggle = async (key) => {
    const linked = aiStatus[key]?.linked;
    addLog(`[action] toggle ${key} → ${!linked ? 'link' : 'unlink'}`);
    const data = await fetch('/api/toggle-link', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ai: key, state: !linked })
    }).then(r => r.json());
    addLog(`[result] ${data.message}`);
    fetchStatus();
  };

  const handleUpdate = async () => {
    addLog('[action] updating all submodules...');
    const data = await fetch('/api/update', { method: 'POST' }).then(r => r.json());
    addLog(`[result] ${data.output}`);
    fetchSkills();
  };

  const handleAddSkill = async (e) => {
    e.preventDefault();
    if (!repoUrl.trim()) return;
    addLog(`[action] adding repo: ${repoUrl}`);
    const data = await fetch('/api/add-skill', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url: repoUrl, category: selectedCat, customRule })
    }).then(r => r.json());
    addLog(`[result] ${data.output}`);
    setRepoUrl(''); setCustomRule('');
    fetchSkills();
  };

  const handleDelete = async (name) => {
    if (!confirm(`Delete "${name}" skill repo?`)) return;
    addLog(`[action] deleting: ${name}`);
    const data = await fetch('/api/remove-skill', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name })
    }).then(r => r.json());
    addLog(`[result] ${data.output}`);
    fetchSkills();
  };

  const currentCategory = liveSkills[active];
  const currentCategoryMeta = CATEGORIES.find(c => c.id === active);

  return (
    <>
      <DesignTokens />
      <div className="app-shell">
        <Sidebar
          active={active}
          onSelect={setActive}
          liveSkills={liveSkills}
          onDeleteSkill={handleDelete}
        />

        <div className="main">
          <div className="content-wrap">
            {/* Page Header */}
            <header className="page-header">
              <div>
                <h1 className="page-title">
                  {active === 'overview' ? 'AI Assistant Hub' : currentCategory?.title ?? currentCategoryMeta?.label}
                </h1>
                <p className="page-subtitle">
                  {active === 'overview'
                    ? 'Manage skill links across your AI assistants in real time'
                    : currentCategory?.subtitle ?? 'Category detail'}
                </p>
              </div>
              <div className="header-actions">
                <button
                  className="btn btn-ghost btn-sm"
                  onClick={() => { fetchStatus(); fetchSkills(); }}
                  aria-label="Refresh data"
                >
                  <Icon name="refresh" size={14} />
                  Refresh
                </button>
                <div className="status-pill" role="status">
                  <div className="status-dot" aria-hidden="true" />
                  SSE Live
                </div>
              </div>
            </header>

            {/* Content */}
            {active === 'overview' ? (
              <>
                {/* AI Cards Section */}
                <section className="section" aria-label="AI assistants">
                  <div className="section-header">
                    <span className="section-title">AI Assistants</span>
                    <span className="badge badge-neutral">
                      {Object.values(aiStatus).filter(s => s?.linked).length} linked
                    </span>
                  </div>
                  <div className="grid-4">
                    {AI_LIST.map(ai => (
                      <AICard
                        key={ai.key}
                        ai={ai}
                        info={aiStatus[ai.key]}
                        onToggle={handleToggle}
                      />
                    ))}
                  </div>
                </section>

                <hr className="divider" />

                {/* Management Section */}
                <section className="section" aria-label="Skill management">
                  <div className="section-header">
                    <span className="section-title">Skill Management</span>
                  </div>
                  <div className="grid-2">

                    {/* Add Skill Card */}
                    <div className="card">
                      <div className="card-body">
                        <div style={{ marginBottom: 'var(--space-4)' }}>
                          <h2 style={{ fontSize: 'var(--text-base)', fontWeight: 600, marginBottom: 4 }}>
                            Add Skill Repository
                          </h2>
                          <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>
                            Clone a public GitHub repo into a category.
                          </p>
                        </div>
                        <form onSubmit={handleAddSkill} className="form-stack">
                          <div>
                            <label className="form-label" htmlFor="repo-url">GitHub Repository URL</label>
                            <input
                              id="repo-url"
                              type="url"
                              value={repoUrl}
                              onChange={e => setRepoUrl(e.target.value)}
                              placeholder="https://github.com/user/repo.git"
                              className="form-input mono"
                              required
                            />
                          </div>
                          <div className="form-row">
                            <div>
                              <label className="form-label" htmlFor="cat-select">Category</label>
                              <select
                                id="cat-select"
                                value={selectedCat}
                                onChange={e => setSelectedCat(e.target.value)}
                                className="form-input"
                              >
                                {CATEGORIES.filter(c => c.id !== 'overview').map(c => (
                                  <option key={c.id} value={c.id}>{c.label}</option>
                                ))}
                              </select>
                            </div>
                            <div>
                              <label className="form-label" htmlFor="custom-rule">Custom Rule</label>
                              <input
                                id="custom-rule"
                                type="text"
                                value={customRule}
                                onChange={e => setCustomRule(e.target.value)}
                                placeholder="e.g. TypeScript strict mode"
                                className="form-input"
                              />
                            </div>
                          </div>
                          <button type="submit" className="btn btn-success btn-full">
                            <Icon name="plus" size={15} />
                            Add Skill
                          </button>
                        </form>
                      </div>
                    </div>

                    {/* Update Card */}
                    <div className="card" style={{ display: 'flex', flexDirection: 'column' }}>
                      <div className="card-body" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                        <div style={{ flex: 1 }}>
                          <h2 style={{ fontSize: 'var(--text-base)', fontWeight: 600, marginBottom: 4 }}>
                            Update All Skills
                          </h2>
                          <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                            Pull the latest commits from all upstream GitHub repositories and sync submodule references.
                          </p>
                          <div style={{ marginTop: 'var(--space-4)', display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                            {Object.values(liveSkills).flatMap(c => c.repos || []).slice(0, 4).map(r => (
                              <div key={r.name} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)' }}>
                                <Icon name="package" size={11} />
                                <span style={{ fontFamily: 'var(--font-mono)' }}>{r.name}</span>
                                <span className="badge badge-success" style={{ marginLeft: 'auto' }}>{r.tag}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        <button
                          className="btn btn-purple btn-full"
                          onClick={handleUpdate}
                          style={{ marginTop: 'var(--space-6)' }}
                        >
                          <Icon name="refresh" size={15} />
                          Pull & Update All
                        </button>
                      </div>
                    </div>

                  </div>
                </section>
              </>
            ) : (
              <CategoryDetail
                category={currentCategory}
                onBack={() => setActive('overview')}
                onDeleteSkill={handleDelete}
              />
            )}
          </div>
        </div>

        <TerminalDrawer
          logs={logs}
          onClear={() => setLogs(['[system] console cleared.'])}
        />
      </div>
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
