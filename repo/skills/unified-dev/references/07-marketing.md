# Marketing & Growth Reference

*Sources: marketingskills (coreyhaines31), CRO and ASO best practices*

> Relevant for: landing pages, app store listings, email campaigns, growth loops,
> conversion optimization. Read alongside 02-web.md for landing page implementation.

---

## Context First

Before writing any copy or planning any growth work, confirm:
1. **Who is the user?** (demographic, problem, hesitations, language they use)
2. **What action do we want?** (sign up, purchase, download, share)
3. **What do they already know?** (traffic source, awareness level)
4. **What proof exists?** (testimonials, numbers, social proof)

If a `.agents/product-marketing.md` or `PRODUCT.md` file exists in the repo, read it first.

---

## Copywriting Fundamentals

**The core rules (Corey Haines):**
- **Clarity over cleverness** — always choose clear over creative
- **Benefits over features** — what it means to the customer, not what it does
- **Specificity over vagueness** — concrete numbers, outcomes, transformations
- **Customer language** — mirror actual words, objections, pain points

**Classic frameworks:**

```
PAS (Problem → Agitate → Solution)
  Best for: Email, ads, landing pages for pain-point products
  P: Name the problem ("Losing hours to manual data entry?")
  A: Make it vivid ("Every mistake costs you a client, a report, your evening.")
  S: Introduce the solution ("X automates it in one click.")

AIDA (Attention → Interest → Desire → Action)
  Best for: Ads, social posts, top-of-funnel content
  A: Hook (statistic, question, bold claim)
  I: Relevant benefit for this specific audience
  D: Why this solution, why now (urgency, unique angle)
  A: Single clear CTA

PASTOR (Problem → Amplify → Story → Testimony → Offer → Response)
  Best for: Long-form sales pages
  Follow the structure; don't rush to the offer
```

---

## Landing Page Conversion Checklist

**Above the fold (first screen):**
- [ ] Value proposition clear in < 5 seconds (can a stranger explain it back?)
- [ ] Single primary CTA — no competing buttons
- [ ] CTA copy is specific ("Start free trial" > "Get started" > "Submit")
- [ ] Hero image/video shows the product in use, not abstract art

**Trust & proof section:**
- [ ] Social proof near the CTA (not buried at the bottom)
- [ ] Specific numbers when possible ("10,000+ teams" > "thousands of teams")
- [ ] Logos of recognizable customers/press
- [ ] Real testimonials with full name, company, and photo

**Friction reduction:**
- [ ] Sign-up form: 3 fields max for top-of-funnel
- [ ] "No credit card required" if true — massive conversion lift
- [ ] FAQ addresses the top 3 objections
- [ ] Privacy statement near email capture ("No spam. Unsubscribe anytime.")

**Mobile:**
- [ ] CTA is thumb-reachable (bottom 1/3 of screen or sticky)
- [ ] Tap targets ≥ 44×44px
- [ ] Page speed < 3s on mobile (use PageSpeed Insights)

---

## ASO (App Store Optimization)

### iOS App Store
| Element | Limit | Weight | Tips |
|---|---|---|---|
| App Name | 30 chars | ⭐⭐⭐ | Primary keyword in name if possible |
| Subtitle | 30 chars | ⭐⭐ | Second keyword cluster |
| Keywords field | 100 chars | ⭐⭐ | Comma-separated, no spaces after comma |
| Description | 4000 chars | ⭐ | First 3 lines shown before "more" |
| Screenshots | Up to 10 | ⭐⭐⭐ | First 3 do 80% of the work |

**ASO rules:**
- Keyword research: use AppFollow, Sensor Tower, or AppFigures
- Never repeat the same keyword in Name + Subtitle + Keywords — wasted budget
- Screenshots: add short caption overlay (3–5 words), show the feature not the UI chrome
- Localize at minimum: EN, DE, FR, JA, KO, ZH for global reach

### Google Play
- **Title:** 30 chars — include primary keyword
- **Short description:** 80 chars — hook + keyword
- **Full description:** 4000 chars — first 3 lines critical, keyword density 2–3%
- **Feature graphic:** 1024×500 — used in lists and featured sections

---

## Growth Loops (Not Funnels)

Funnels are linear (ad → landing → sign up → churn). Loops are compounding.

**Common loops:**
```
Viral loop:      User → uses product → invites friends → more users
Content loop:    User creates content → SEO/shares → new users discover
Paid loop:       Revenue → more ad spend → more users → more revenue
Product loop:    Users → data → better product → more users
```

**Choose your primary loop first**, then optimize it. Don't run 5 loops at 20% each.

---

## Email Sequences

**Welcome sequence (3–5 emails):**
1. Immediate: Confirm value, set expectations, quick win
2. Day 2: Address the #1 objection or confusion
3. Day 4: Social proof / case study
4. Day 7: Feature highlight (most underused, most impactful)
5. Day 10: "How can we help?" or upgrade offer

**Rules:**
- Subject lines: specific > clever ("How to export in 30 seconds" > "You'll love this!")
- Preview text: complements subject, doesn't repeat it
- Single CTA per email
- Plain text or minimal HTML converts better for small lists

---

## Analytics & Measurement

**Key metrics by stage:**
```
Acquisition:   CAC (cost per acquired user), organic vs paid split
Activation:    % completing key action within 24h (e.g., first export, first share)
Retention:     D1/D7/D30 retention, weekly/monthly active users
Revenue:       ARPU, LTV, LTV:CAC ratio (target ≥ 3:1)
Referral:      K-factor (viral coefficient), NPS
```

**North Star Metric:** Pick ONE metric that captures the core value. Everything serves it.
- Slack: Daily Active Users
- Airbnb: Nights booked
- Spotify: Time spent listening
- Your app: _________________

---

## CRO (Conversion Rate Optimization)

**Testing hierarchy (highest to lowest impact):**
1. Offer (pricing, packaging, trial length)
2. Value proposition (headline, key benefit)
3. Social proof (placement, specificity)
4. CTA (copy, color, size, placement)
5. Form length
6. Page layout / visual hierarchy

**A/B test rules:**
- One variable at a time
- Run until 95% statistical significance OR 2 weeks minimum (whichever longer)
- Minimum 100 conversions per variant before declaring a winner
- Document all tests, including losers — negative learnings are valuable
