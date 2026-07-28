# Web & UI/UX Reference

*Sources: ux-ui-agent-skills, ui-ux-pro-max-skill, marketingskills (CRO section)*

---

## Design Philosophy

- **Tokens first** — Design decisions come from a system (spacing scale, color palette,
  type scale), not one-off values. Never use magic numbers (e.g., `margin: 13px`).
- **Accessibility is not optional** — Target WCAG 2.2 AA minimum. AAA where feasible.
- **Performance is UX** — Core Web Vitals targets: LCP < 2.5s, INP < 200ms, CLS < 0.1.
- **Mobile-first** — Design for the smallest viewport first, scale up.

---

## Design System Checklist

Before implementing any UI component, verify:

- [ ] Color: Uses palette tokens, not hex literals. Contrast ratio ≥ 4.5:1 (text), ≥ 3:1 (UI elements)
- [ ] Spacing: Uses scale (4px base recommended: 4/8/12/16/24/32/48/64)
- [ ] Typography: Uses defined type scale. Line-height ≥ 1.5 for body text
- [ ] Interactivity: Focus styles visible. Hover/active states defined
- [ ] Responsive: Tested at 320px, 768px, 1280px breakpoints minimum
- [ ] Dark mode: If implemented, all tokens have dark-mode variants

---

## Component Architecture Rules

```
Prefer:
  Atomic components → Molecule → Organism → Page
  
  Button (atom) → SearchBar (molecule) → Header (organism) → HomePage (page)

Never:
  - Props drilling more than 2 levels → use context/store
  - Components > 200 lines → split it
  - Styles co-located with logic in same file > 100 lines → separate
```

---

## Color Palette Guidance

**Curated palettes for common project types:**

| Project Type | Primary | Accent | Surface |
|---|---|---|---|
| SaaS/App | Indigo 600 `#4F46E5` | Violet 400 `#A78BFA` | Slate 950 `#0F172A` |
| E-commerce | Emerald 600 `#059669` | Amber 400 `#FBBF24` | Gray 50 `#F9FAFB` |
| Creative/Portfolio | Rose 500 `#F43F5E` | Orange 400 `#FB923C` | Zinc 900 `#18181B` |
| B2B/Enterprise | Blue 700 `#1D4ED8` | Sky 400 `#38BDF8` | Gray 900 `#111827` |
| Health/Wellness | Teal 600 `#0D9488` | Green 400 `#4ADE80` | Stone 50 `#FAFAF9` |

**Typography pairings:**
- **Modern SaaS:** Inter (UI) + Inter (body) — single family, weights do the work
- **Editorial:** Playfair Display (headings) + Source Sans 3 (body)
- **Technical/Dev:** JetBrains Mono (headings) + Inter (body)
- **Premium/Brand:** Fraunces (headings) + Nunito Sans (body)

---

## Accessibility (WCAG 2.2)

**Always check:**
- `alt` text on all `<img>` — meaningful description, not filename
- Form inputs have associated `<label>` (not just placeholder)
- Interactive elements reachable via keyboard (`Tab`, `Enter`, `Space`, `Escape`)
- `aria-label` on icon-only buttons
- Skip navigation link as first focusable element on pages
- Modal/dialog traps focus while open, returns focus on close

**Color contrast minimums:**
- Normal text (< 18pt): 4.5:1
- Large text (≥ 18pt or 14pt bold): 3:1
- UI components & icons: 3:1
- Decorative elements: no requirement

---

## Framework-Specific Notes

### React / Next.js
- Use `React.memo` only when profiling shows a problem — premature optimization kills readability
- Prefer `useReducer` over multiple `useState` when state transitions are complex
- Server Components by default in Next.js App Router — only `'use client'` when needed
- Image: always use `next/image` for automatic optimization

### Vue 3 / Nuxt
- Composition API + `<script setup>` — Options API only for legacy
- `defineProps` with TypeScript for component contracts
- Pinia > Vuex for state management

### CSS
- Custom properties (variables) for all design tokens
- `clamp()` for fluid typography: `clamp(1rem, 2.5vw, 1.5rem)`
- Prefer `gap` over margin between flex/grid children
- Avoid `!important` — signals a specificity problem, not a solution

---

## Performance Checklist

Before shipping any page:

- [ ] Images: WebP/AVIF format, `loading="lazy"` on below-fold images
- [ ] Fonts: `font-display: swap`, preload critical fonts
- [ ] JS: Code-split routes. No synchronous blocking scripts in `<head>`
- [ ] CSS: Critical CSS inlined, non-critical deferred
- [ ] Third-party: Audit every script. GTM/analytics load async
- [ ] Bundle: Run `npm run build` and check chunk sizes. Flag any > 250kb

---

## CRO (Conversion Rate Optimization) Basics

When building landing pages or key conversion flows:

1. **Above the fold:** Value proposition clear within 5 seconds. Single primary CTA.
2. **Social proof:** Testimonials, logos, numbers near the CTA.
3. **Friction reduction:** Fewer form fields = higher conversion. Ask only what's needed.
4. **CTA copy:** Specific beats generic. "Start free trial" > "Submit". "Get my report" > "Download".
5. **Loading speed:** Every 100ms delay = ~1% conversion drop. Optimize aggressively.
6. **Mobile:** Test on real device. Thumb-reachable CTAs. Tap targets ≥ 44×44px.
