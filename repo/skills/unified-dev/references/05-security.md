# Security Reference

*Sources: Anthropic-Cybersecurity-Skills (800+ skills distilled), OWASP Top 10 2021,
MITRE ATT&CK, NIST CSF 2.0*

---

## Security Mindset

- **Threat model first** — What are you protecting? From whom? At what cost?
- **Defense in depth** — No single control is sufficient. Layer defenses.
- **Least privilege** — Every user, service, and process gets the minimum access needed.
- **Fail securely** — On error, deny by default. Never expose internals in error messages.
- **Security is a feature** — Ship it from day one, not as a retrofit.

---

## OWASP Top 10 (2021) — Web Checklist

### A01: Broken Access Control
- [ ] Every endpoint checks authorization, not just authentication
- [ ] User A cannot access User B's resources (IDOR prevention)
- [ ] Directory listing disabled on web server
- [ ] CORS configured to allowed origins only (not `*` in production)

### A02: Cryptographic Failures
- [ ] No sensitive data in URLs or logs
- [ ] HTTPS everywhere — HSTS header set
- [ ] Passwords hashed with bcrypt/Argon2 (never MD5/SHA1)
- [ ] Secrets in environment variables, never in code or git history

### A03: Injection
- [ ] All database queries use parameterized statements / ORMs
- [ ] Never interpolate user input into SQL, shell commands, or eval()
- [ ] HTML output escaped (XSS prevention) — use framework templating, not string concat

### A04: Insecure Design
- [ ] Rate limiting on auth endpoints (prevent brute force)
- [ ] Account lockout after N failed attempts
- [ ] Password reset tokens: one-time use, short expiry, sent to verified email only

### A05: Security Misconfiguration
- [ ] Default credentials changed
- [ ] Debug mode OFF in production
- [ ] Error messages don't expose stack traces or internal paths to users
- [ ] Unnecessary features/endpoints disabled

### A06: Vulnerable Components
- [ ] Dependencies audited: `npm audit`, `pip audit`, `bundle audit`
- [ ] Automated dependency updates (Dependabot/Renovate)
- [ ] No end-of-life frameworks in production

### A07: Auth & Session Failures
- [ ] Session IDs rotated on login (session fixation prevention)
- [ ] JWTs: short expiry, signed with strong key, validated on every request
- [ ] Multi-factor authentication available for sensitive accounts
- [ ] Secure + HttpOnly + SameSite cookies for session tokens

### A08: Software & Data Integrity
- [ ] Subresource Integrity (SRI) on external CDN scripts
- [ ] CI/CD pipeline doesn't have write access beyond what's needed
- [ ] Signed commits for production deployments

### A09: Logging & Monitoring
- [ ] Auth events logged (success, failure, logout)
- [ ] Admin actions logged with user ID + timestamp
- [ ] Logs don't contain passwords, tokens, or PII
- [ ] Alerts set on anomalous patterns (too many 4xx, auth failures)

### A10: SSRF
- [ ] User-supplied URLs validated against allowlist before server-side fetch
- [ ] Internal metadata endpoints (AWS 169.254.x.x) blocked from SSRF

---

## Mobile Security

**iOS:**
- [ ] No secrets in `Info.plist` or bundled files (use Keychain)
- [ ] Certificate pinning for critical API calls
- [ ] Biometric auth via `LocalAuthentication` — never roll your own
- [ ] Disable screenshot on sensitive screens: `UIScreen.main.isCaptured`
- [ ] App Transport Security (ATS) enabled — no plain HTTP

**Android:**
- [ ] Sensitive data in `EncryptedSharedPreferences` or Keystore
- [ ] `android:exported="false"` on components not meant to be public
- [ ] ProGuard/R8 enabled for release builds (obfuscation)
- [ ] Root detection for high-security apps (SafetyNet/Play Integrity API)
- [ ] No sensitive data in logs (`Log.d` stripped in release)

---

## Authentication Patterns

```
Recommended stack (web):
  - Auth provider: Auth0 / Supabase Auth / Clerk (saves months of work)
  - If rolling your own:
      Password: bcrypt(cost=12) or Argon2id
      Session: random 128-bit token, stored server-side
      JWT: RS256 or ES256, 15-min access token, 7-day refresh token
      
API:
  - Bearer token in Authorization header (not cookies, not query params)
  - API keys: prefix them (e.g., "sk_live_...") for easy detection in leaks
```

---

## Threat Modeling (STRIDE)

For each feature that handles sensitive data, ask:

| Threat | Question |
|---|---|
| **S**poofing | Can an attacker pretend to be another user? |
| **T**ampering | Can data be modified in transit or at rest? |
| **R**epudiation | Can actions be denied? (logging/audit trail) |
| **I**nformation Disclosure | Can sensitive data be exposed? |
| **D**enial of Service | Can the feature be abused to disrupt service? |
| **E**levation of Privilege | Can a low-privilege user gain higher access? |

---

## Security Headers (HTTP)

Add to every web app:
```
Content-Security-Policy: default-src 'self'; script-src 'self' [trusted CDNs]
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=()
Strict-Transport-Security: max-age=31536000; includeSubDomains
```

---

## Incident Response (Quick Reference)

If a breach is suspected:
1. **Contain** — Rotate all credentials, revoke sessions, isolate affected systems
2. **Assess** — What data was accessed? How long? Entry point?
3. **Notify** — Users if PII affected (GDPR: 72 hours), platform if API keys leaked
4. **Fix** — Patch the vulnerability, test the fix
5. **Post-mortem** — Document timeline, root cause, prevention steps
