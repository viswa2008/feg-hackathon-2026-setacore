# PSK Compass

**Team:** Setacore · **Challenge:** #1 — Session Quality & Session-to-Action Conversion
**Solution title:** *PSK Compass — an intent-aware session layer that turns browsing into confident, informed action.*

---

## 1. Problem statement

Users open PSK often but rarely act — most sessions end in browsing. Discovery is noisy, a
single generic layout serves newcomers and veterans alike, and intent leaks at the final
step. Growth here is **not** an acquisition problem: the users already arrive. The
opportunity is to make each existing session more valuable **without pushing anyone to do
more than they want to.**

## 2. Solution overview & key innovation

PSK Compass is a session layer that observes in-session signals and makes each session more
relevant and lower-friction. Every uplift comes from **relevance and reduced friction —
never urgency or pressure.**

**Key innovation — the Session Value Score (SVS):** a north-star metric
`SVS = w_r·relevance + w_i·informedness + w_f·(1 − friction)` that turns "session quality"
from a vibe into an optimisable number. Most teams will propose "better recommendations";
the SVS is the measurable wedge, and the informed-decision framing doubles as the
responsible-gambling story.

## 3. Key features / user journey

| Module | What it does |
|---|---|
| **Smart Start** | Reads early-session signals and reorders the surface live — a veteran sees the in-play markets they follow; a newcomer gets a guided, explained view. |
| **Confidence Rail** | At the decision moment, an in-context panel surfaces what removes *hesitation*: relevant form/stats, a plain-language "why", clear payout math, and spend-so-far vs. the user's own limit. |
| **Session Value Score** | Live measurement of value per session, giving PSK a durable optimisation target. |

**User journey (demo scenario):** *Marko*, a returning football bettor, opens PSK at
halftime → Smart Start floats his followed live markets to the top → the Confidence Rail
shows form, a clear payout, and his spend-so-far → he places **one confident, informed bet**
with no urgency mechanics. A new user, *Ana*, gets the guided/explained variant instead.

## 4. Technology stack

- **Prototype:** a single self-contained HTML/CSS/JS page (`src/index.html`) — no framework, no build.
- **Scoring engine:** plain JavaScript ES module (`src/svs.mjs`).
- **Tests:** Node's built-in test runner (`node --test`).
- **No third-party runtime dependencies** — see [`docs/dependencies.md`](docs/dependencies.md).

## 5. System requirements & prerequisites

- Node.js **≥ 18** (for the scoring engine + tests)
- Any modern web browser (for the prototype)
- Python 3 *(optional)* — only to serve the demo over `http://`

## 6. Installation / setup

```bash
git clone <your-repo-url>
cd feg-hackathon-2026-setacore
cp .env.example .env      # optional: tweak weights / feature flags
```

No `npm install` is required — there are no dependencies.

## 7. Environment variables & configuration

- Copy `.env.example` → `.env`. It holds only **non-secret** tunables (score weights,
  feature flags, demo data source). **No secrets are committed**, and `.env` is
  git-ignored.
- Score weights and impact-model baselines also live in
  [`config/scenario.json`](config/scenario.json); compliance guardrails in
  [`config/content-policy.json`](config/content-policy.json).

## 8. How to run the prototype

```bash
# Simplest — just open the file:
open src/index.html            # macOS  (or double-click it)

# Or serve it (recommended):
python3 -m http.server 8000    # then visit http://localhost:8000/src/
```

Toggle **Compass on/off** to see Smart Start reorder the surface and the Confidence Rail
appear; click markets and place the bet to watch the **Session Value Score** update live.

## 9. How to test / validate

```bash
npm test        # or:  node --test
```

Runs the unit tests in `tests/` against the scoring engine (bounds, weighting,
browsing-vs-confident session behaviour).

## 10. Demo instructions / flow

See [`docs/architecture.md`](docs/architecture.md) for the 15-minute live-demo script, and
[`demo/`](demo/) for the video link, screenshots, and deck.

## 11. Known limitations, assumptions & future improvements

- **Sample data only.** No real player data is used. Signal derivation is illustrative.
- **Impact figures are modelled on stated assumptions** (see `docs/impact-case.md` and
  `config/scenario.json`); swap in official dataset baselines to finalise.
- The prototype mirrors the ranking logic with a simple relevance sort; production would
  use a lightweight edge-served model (see architecture).
- **Future:** real-time signal store, A/B holdout instrumentation for the SVS, and
  accessibility polish to full WCAG 2.1 AA audit.

## 12. AI-use disclosure

This repository was assembled with **AI assistance (Anthropic's Claude)** for scaffolding,
documentation drafting, and prototype code. The team is responsible for the originality,
security, licensing, and accuracy of all content. No confidential challenge information or
real player data was entered into any AI system. Disclosed per the submission guidelines.

## 13. Key links

- Architecture & demo flow → [`docs/architecture.md`](docs/architecture.md)
- Business impact & cost-value → [`docs/impact-case.md`](docs/impact-case.md)
- Compliance mapping → [`docs/compliance-note.md`](docs/compliance-note.md)
- Dependency & licence disclosure → [`docs/dependencies.md`](docs/dependencies.md)

---

### Reviewer access

This repository is **private**, owned and controlled by Team Setacore. Designated T-Hub/FEG
reviewer accounts are granted **read-level** access (ownership is not transferred). It
stays private through the end of the Judging Period.

*License: [MIT](LICENSE).*
