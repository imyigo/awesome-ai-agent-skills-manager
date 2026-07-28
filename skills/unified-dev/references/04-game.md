# Game Development Reference

*Sources: Claude-Code-Game-Studios (49-agent workflow distilled), gstack (QA/release roles)*

---

## Game Development Philosophy

- **Fun first** — Technical excellence serves the experience, not the other way around.
- **Prototype fast** — Get something playable in hours, not weeks.
- **Playtest early** — Bugs in design are 10× cheaper to fix before implementation.
- **Juice it** — Screen shake, particle effects, sound feedback make mechanics feel good.

---

## Agent Role System (Distilled)

For complex game projects, adopt specialist roles when needed:

| Role | Trigger | Responsibility |
|---|---|---|
| **Game Director** | `/gd-director` | Vision, scope, player experience |
| **Lead Engineer** | `/gd-engineer` | Architecture, performance, tech decisions |
| **Level Designer** | `/gd-level` | Flow, pacing, challenge curve |
| **Systems Designer** | `/gd-systems` | Mechanics, balance, economy |
| **VFX / Audio** | `/gd-vfx` | Polish, feedback, juice |
| **QA Lead** | `/gd-qa` | Playtesting plan, bug triage |
| **Release Engineer** | `/gd-release` | Build pipeline, platform submission |

---

## Game Design Document (GDD) Template

When starting a project, define before coding:

```markdown
## [Game Name] — Design Brief

### Core Loop (30 seconds)
What does the player do every 30 seconds? [verb] → [feedback] → [reward]

### Session Loop (5–15 minutes)
What makes a session feel complete?

### Meta Loop (long-term)
What keeps players coming back? (progression, collection, social)

### Player Fantasy
"The player feels like ___________"

### Constraints
Platform: [iOS / Android / Web / Desktop]
Target session length: [X minutes]
Monetization: [premium / IAP / ads / none]
Team size: [just me / small team]

### Out of Scope (v1.0)
- [explicitly list what's NOT in v1]
```

---

## Engine Selection Guide

| Need | Engine | Language | Notes |
|---|---|---|---|
| 2D indie, fast prototype | **Godot 4** | GDScript / C# | Best for solo devs, MIT license |
| 2D web game | **Phaser 3** | TypeScript | Browser-native, great docs |
| 2D Python | **Pygame** | Python | Good for learning, limited mobile |
| 3D + mobile | **Unity** | C# | Huge ecosystem, complex licensing |
| 3D AAA | **Unreal 5** | C++ / Blueprints | Overkill for indie, stunning results |
| Mobile 2D | **Godot + Export** | GDScript | Best cross-platform for indie |

---

## Architecture Patterns

### Entity-Component-System (ECS)
```
Entity: a unique ID (player, enemy, bullet)
Component: pure data (Position, Health, Velocity)
System: logic that operates on components (MovementSystem, CollisionSystem)

Benefits: cache-friendly, decoupled, testable
Use when: many similar entities, performance matters
```

### State Machine (for AI, menus, game states)
```
States: Idle, Patrol, Chase, Attack, Dead
Transitions: triggered by conditions (player_in_range, health == 0)

Always define: what happens on Enter, Update, Exit
```

### Object Pooling (for bullets, particles, enemies)
```
Don't destroy/create at runtime — deactivate and reuse
Pool size = max simultaneous instances × 1.5
```

---

## Performance Rules

- **60 FPS target** — profile early, not at the end
- **Draw calls:** Mobile < 100/frame, desktop < 1000/frame
- **Physics:** Use simplified collision shapes (not mesh collision)
- **Audio:** Compress to OGG/MP3. Load SFX upfront, stream music
- **Texture atlases:** Batch sprites into atlas to reduce draw calls
- **Memory:** Mobile = 150–300MB target. Profile on lowest-spec target device

---

## Game Feel (Juice) Checklist

Before calling a mechanic "done":
- [ ] **Visual feedback** on every player action (hit flash, screen shake on impact)
- [ ] **Audio feedback** on every action (even a subtle click)
- [ ] **Anticipation** — telegraph big events 0.3–0.5s before they happen
- [ ] **Impact frames** — pause 1–3 frames on heavy hits
- [ ] **Particle effects** on destruction/collection
- [ ] **Camera** — slight lag/lead follows the action, not the player position
- [ ] **UI animations** — menus shouldn't feel static

---

## Mobile Game Specifics

- **Session length:** Casual = 2–5 min. Mid-core = 10–20 min.
- **First-time user experience (FTUE):** Teach by doing, not text. Max 60 seconds.
- **IAP pricing:** $0.99 / $2.99 / $4.99 / $9.99 are the psychological anchors
- **Ads:** Rewarded video > interstitials. Never interrupt gameplay with ads.
- **Battery/heat:** Limit frame rate when game is paused. Use `Application.targetFrameRate`
- **Offline first:** Core gameplay must work without internet

---

## Sprint / Milestone Structure

```
Milestone 0 — Prototype (1–2 weeks)
  Goal: Is the core loop fun?
  Done: Playable loop, rough art, no polish

Milestone 1 — Alpha (2–4 weeks)
  Goal: All features implemented, rough
  Done: Complete content, basic audio, major bugs fixed

Milestone 2 — Beta (1–2 weeks)  
  Goal: Polished, bug-free
  Done: Gold assets, all audio, performance passes, QA pass

Milestone 3 — Release
  Goal: Ship it
  Done: Store approved, marketing live, analytics wired
```
