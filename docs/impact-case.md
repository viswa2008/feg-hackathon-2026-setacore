# Business Impact Case — PSK Compass

> **Scoring weight:** Business Impact = 30% (highest). This is the section judges
> reward most. Every number below is traceable to a stated assumption so it survives
> scrutiny.

## 1. Where the value comes from

Growth is not acquisition — the users already arrive. Value is unlocked by converting
**existing sessions** into confident actions. Three levers, all relevance/friction-based:

1. **Final-step conversion** (Confidence Rail) — recover intent that leaks at the decision point.
2. **Actions per session** (Smart Start) — surface relevant markets faster, so a session yields more than one considered action.
3. **Retention → value per active user** (both) — better sessions compound into D30/D90 retention.

## 2. Model (illustrative — replace with dataset baselines)

> ⚠️ **Assumptions**, to be swapped for official dataset values in `config/scenario.json`.

| Input | Assumed baseline | Source of assumption |
|---|---|---|
| Monthly active users (MAU) | 250,000 | Placeholder — mid-size EU operator |
| Sessions / user / month | 12 | Placeholder |
| Sessions ending without an action | 62% | Brief: "many sessions end in browsing" |
| Final-step drop-off (reached slip, didn't confirm) | 18% | Placeholder — typical checkout leak |
| Average value per completed action | €7.50 | Placeholder |

### Conservative uplift assumptions (relevance/friction only)

| Lever | Modelled lift | Rationale |
|---|---|---|
| Final-step conversion | **+12% relative** | Removing hesitation with in-context info (not urgency) |
| Actions per session | **+8% relative** | Faster, more relevant discovery |
| D30 retention | **+3pp** | Higher session quality compounds |

### Result (illustrative math)

```
Base monthly actions   = 250,000 × 12 × (1 − 0.62)          ≈ 1.14M actions
Recovered at final step= 1.14M × 0.18 × 0.12                ≈ 24,600 actions
Extra from +8% APS     = 1.14M × 0.08                       ≈ 91,200 actions
Incremental actions/mo ≈ 115,800  →  × €7.50  ≈ €0.87M / month incremental value
```

*(Retention uplift is modelled separately as a multiplier on lifetime value, not double-counted here.)*

## 3. Cost–value analysis

| Cost line | Estimate | Note |
|---|---|---|
| Build (one intent layer, reused across surfaces) | 2 squads × 8 weeks | Ships on existing session infra |
| Run (inference + edge personalisation) | low | Rules + lightweight model; no new data pipeline |
| Risk / compliance review | contained | Compliance-by-design reduces rework |

**Payback:** even at a fraction of the modelled uplift, incremental value dwarfs a
one-quarter build. The Session Value Score also gives PSK a durable optimisation asset
beyond this feature.

## 4. How to make this bullet-proof for judges

- Replace every placeholder with a dataset-derived baseline (see `config/scenario.json`).
- Show the **before/after Session Value Score** distribution on real sessions.
- State the counterfactual: uplift is measured against a holdout, attributed to relevance/friction, **not** to any pressure mechanic.
