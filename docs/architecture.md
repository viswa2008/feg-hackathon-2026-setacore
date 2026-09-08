# Architecture & Demo Flow — PSK Compass

## System overview

PSK Compass is a **session layer** that sits between the existing PSK front end and its
content/markets services. It observes session signals, ranks what to surface, and injects
two UI modules — without changing core betting, payout, or identity logic.

```
        ┌─────────────────────────────────────────────┐
        │              PSK front end (web/app)          │
        │   ┌───────────────┐      ┌────────────────┐   │
        │   │  Smart Start  │      │ Confidence Rail│   │  ← injected UI modules
        │   └───────┬───────┘      └───────┬────────┘   │
        └───────────┼──────────────────────┼────────────┘
                    │                       │
              ┌─────▼───────────────────────▼─────┐
              │        PSK Compass layer           │
              │  ┌──────────────┐  ┌─────────────┐ │
              │  │ Signal reader │  │  Ranker     │ │
              │  │ (session-     │  │ (relevance) │ │
              │  │  scoped)      │  └─────────────┘ │
              │  └──────┬───────┘                   │
              │         │   ┌─────────────────────┐ │
              │         └──▶│ Session Value Score  │ │  ← measurement
              │             │  engine (src/)       │ │
              │             └─────────────────────┘ │
              └───────┬───────────────────┬─────────┘
                      │                   │
            ┌─────────▼────────┐  ┌────────▼─────────┐
            │ Consent + RG /   │  │ Content/markets  │
            │ self-exclusion   │  │ services (read)  │
            │ gate (existing)  │  └──────────────────┘
            └──────────────────┘
```

**Read-only where it matters:** Compass consumes markets/content and RG state; it does not
write to payout, funding, or identity systems.

## Session Value Score

```
SVS = w_r · relevance  +  w_i · informedness  +  w_f · (1 − friction)
```

- **relevance** — did the user engage with what was surfaced (dwell, expand, follow)?
- **informedness** — did they view decision context before acting (stats, why, payout, spend)?
- **friction** — normalised time/steps to first action (lower is better).

Weights live in `config/scenario.json` and `.env`. Engine + tests in `src/` and `tests/`.

## 15-minute live-demo script (D2)

1. **Cold open (2 min)** — a "browsing-only" session on today's PSK: noisy home, user drifts, leaves. Show the low Session Value Score.
2. **Smart Start (3 min)** — same user, Compass on. Surface reorders to their followed markets; time-to-first-action drops.
3. **Confidence Rail (4 min)** — user reaches the decision point; the rail answers "why this / what's the math / what have I spent". They act *confidently*. Final-step conversion recovered.
4. **The Score (3 min)** — before/after Session Value Score, and how PSK optimises against it.
5. **Impact + compliance (3 min)** — the €/month number, then the one-line compliance proof: *every gain came from clarity, none from pressure.*

## Realistic customer scenario

"**Marko**, a returning football bettor, opens PSK at halftime." Veteran path via Smart Start
→ live markets he follows → Confidence Rail shows form + clear payout + spend-so-far →
one confident bet, no urgency. Contrast with "**Ana**, new, casual": guided, explained view.
