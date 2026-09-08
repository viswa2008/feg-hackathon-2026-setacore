# Compliance Mapping (1-page) — PSK Compass

> **Scoring weight:** Compliance by Design = 10%. But it also underwrites CX (20%) and
> Business Impact (30%), because the whole thesis is *uplift without pressure*.

## Core stance

PSK Compass moves metrics **only** through relevance and reduced friction. It contains
**no urgency mechanics, no dark patterns, no inducements**, and never targets vulnerable
or self-excluded users. Informed decisions are the product — which is also the
responsible-gambling requirement. Compliance is not a constraint bolted on; it is the
mechanism of the uplift.

## Mapping to EU baseline

| Framework | Requirement | How PSK Compass complies |
|---|---|---|
| **GDPR** | Lawful basis, data minimisation, purpose limitation | Personalisation runs on session-scoped behavioural signals under consent; no new PII collected; signals expire with the session by default. |
| **ePrivacy** | Consent for non-essential tracking | Smart Start personalisation is gated behind the existing consent layer; degrades gracefully to a sensible default when consent is absent. |
| **EU AI Act** | Transparency, risk tiering, human oversight | Ranking model is limited-risk; recommendations are explainable ("why this"), logged, and overridable. No manipulative or subliminal techniques (a prohibited practice). |
| **AMLD / KYC** | Identity & AML controls | Out of scope by design — Compass never touches registration, identity, or funding flows. |
| **eIDAS 2.0** | Trusted identity | Not altered; Compass sits above verified sessions only. |
| **EAA / WCAG 2.1 AA** | Accessibility | Confidence Rail meets AA contrast, keyboard navigation, screen-reader labels; payout math is text, not image. |
| **Responsible Gambling** | RG interstitials, reality checks, session/time limits, 18+ | All preserved at full fidelity; Compass **adds** spend-so-far context and never suppresses or delays an RG surface. |

## Guardrails baked into the code / config

- **No countdowns, no scarcity, no loss-chasing prompts** — enforced as a content policy in `config/`.
- **Self-exclusion + RG-flag check** before any personalised surface renders.
- **Frequency & quiet-hours caps** honoured (shared with any notification surface).
- **Explainability by default** — every recommendation carries a human-readable reason.
- **Holdout-based measurement** — uplift attributed to relevance/friction, auditable.

## What is explicitly out of scope

Acquisition, marketing, pricing, registration, identity verification — untouched, per the
challenge brief.
