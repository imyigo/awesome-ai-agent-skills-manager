# Planning & Project Management Reference

*Sources: gstack (PM/architect roles), planning-with-files, academic-research-skills
(verification methodology)*

---

## Planning Philosophy

- **Write before you build** — Thinking is free. Code is not.
- **Small batches** — Ship incrementally. Long-running branches = integration debt.
- **Explicit done criteria** — If you can't state how to verify it's done, it's not ready to start.
- **Ruthless scope control** — Everything added to v1 delays v1. Put it in the backlog.

---

## Before Starting Any Feature

Answer these four questions first:

1. **What problem does this solve?** (user/business problem, not the solution)
2. **How will I know it's done?** (specific, verifiable acceptance criteria)
3. **What's the minimal version?** (scope reduction question)
4. **What could go wrong?** (known risks, unknowns)

If you can't answer all four clearly, you're not ready to code.

---

## PRD (Product Requirements Document) Template

```markdown
## Feature: [Name]

### Problem
[1–2 sentences. What user/business pain does this solve?]

### Success Metrics
[How do we measure success? Specific numbers if possible]
- e.g., "Reduces support tickets about X by 30%"
- e.g., "90% of users complete onboarding in < 3 minutes"

### User Stories
- As a [user type], I want [action] so that [benefit]

### Acceptance Criteria
- [ ] [Specific, testable statement]
- [ ] [Another specific, testable statement]

### Out of Scope (v1)
- [Explicitly list what's NOT included]

### Open Questions
- [Things we need to decide before implementation]

### Tech Notes
[High-level implementation approach, key decisions, risks]
```

---

## Architecture Decision Record (ADR)

For significant tech decisions, document:

```markdown
## ADR-[N]: [Decision Title]

**Status:** Proposed / Accepted / Deprecated

**Context:** [Why is this decision needed?]

**Decision:** [What we're doing]

**Consequences:**
- ✅ [Benefit]
- ⚠️ [Trade-off / downside]
```

---

## Task Breakdown Rules

When breaking down a feature into tasks:

- Each task should be completable in **2–4 hours** max
- Tasks should be **independently shippable** where possible
- Write tasks as: **[verb] + [noun]** → "Add user avatar upload endpoint"
- Separate **discovery tasks** (research, decision) from **implementation tasks**
- Mark blockers explicitly: "BLOCKED BY: ADR-3"

---

## Sprint Structure (Solo / Small Team)

```
Sprint length: 1 week (solo) or 2 weeks (team)

Monday:
  - Review last sprint: what shipped, what didn't, why
  - Plan this sprint: select tasks from backlog, verify they're well-defined

Daily (5 min):
  - What did I do yesterday?
  - What am I doing today?
  - Any blockers?

Friday:
  - Demo or record a walkthrough of what shipped
  - Update changelog
  - Retrospective (1 thing to improve next sprint)
```

---

## File-Based Task Management

For solo projects, a simple `TODO.md` in the repo root works well:

```markdown
## Active Sprint — [Date Range]

### In Progress
- [/] Feature: user auth (started 2026-07-28)

### This Sprint
- [ ] Add email verification flow
- [ ] Write API docs for /auth endpoints
- [ ] Fix: logout doesn't clear refresh token

### Backlog
- [ ] Dark mode
- [ ] Push notifications
- [ ] Admin dashboard

### Done
- [x] User registration
- [x] Password reset flow
```

Legend: `[ ]` todo · `[/]` in progress · `[x]` done

---

## Research / Discovery Template

When you need to evaluate options or make a tech decision:

```markdown
## Decision: [e.g., Choose a database for X]

### Requirements
- [Requirement 1]
- [Requirement 2]

### Options Evaluated

| Criterion | Option A | Option B | Option C |
|---|---|---|---|
| Performance | ✅ | ⚠️ | ✅ |
| Cost | ✅ | ✅ | ❌ |
| Team familiarity | ✅ | ❌ | ⚠️ |

### Decision: [Chosen option]
**Rationale:** [2–3 sentences]

### Revisit if: [Conditions that would make us reconsider]
```

---

## Estimation Rules

- Never estimate in hours for tasks > 1 day. Use **T-shirt sizes:** XS / S / M / L / XL
- Add 30% buffer to any estimate for integration, testing, and unexpected issues
- "Almost done" is not a unit of measurement — define what "done" means
- Track velocity: how many story points/tasks actually shipped last sprint?

---

## Release Checklist

Before any production release:

**Code:**
- [ ] All acceptance criteria verified
- [ ] No known critical bugs
- [ ] Code reviewed (or self-reviewed after 24h gap)
- [ ] Tests pass (unit + integration minimum)

**Security:**
- [ ] See 05-security.md checklist
- [ ] Secrets not in code or git history

**Performance:**
- [ ] Profiled under realistic load
- [ ] No regressions vs previous version

**Observability:**
- [ ] Error tracking configured (Sentry, Bugsnag, etc.)
- [ ] Key user actions logged
- [ ] Uptime monitoring set up

**Rollback:**
- [ ] Can we revert in < 10 minutes if something breaks?
- [ ] Database migrations reversible?
