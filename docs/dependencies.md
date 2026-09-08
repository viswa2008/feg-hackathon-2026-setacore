# Dependencies

The prototype is intentionally lightweight so it runs anywhere with zero friction.

## Runtime

| Dependency | Version | Why |
|---|---|---|
| Node.js | ≥ 18 | Runs the Session Value Score engine (`src/`) and tests |
| A modern browser | any current | Opens the self-contained prototype (`demo/index.html`) |
| Python 3 | ≥ 3.8 *(optional)* | Only to serve the demo locally (`python3 -m http.server`) |

## Dev / test

| Package | Purpose |
|---|---|
| `node:test` (built-in) | Unit tests for the scoring engine — no external test runner needed |

There are **no third-party npm packages** in the prototype: the scoring engine is plain
ES modules and the demo is a single HTML file with inline JS/CSS. This keeps the build
trivial to review and the security surface minimal (a plus for the compliance story).

## AI & code-assistance disclosure

This repository was built with AI assistance (Anthropic's Claude) for scaffolding,
documentation, and prototype code. No third-party model, dataset, or template with
restrictive licensing is embedded in the deliverable. The team remains responsible for
originality, security, licensing, and accuracy. No confidential challenge information or
real player data was submitted to any AI system.

## Production (proposed, not in this repo)

For a real PSK integration the layer would add: a feature store for session signals, a
lightweight ranking model served at the edge, and the existing consent / responsible-gambling
services (consumed read-only). See [`architecture.md`](architecture.md).
