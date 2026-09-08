/**
 * Session Value Score (SVS) engine — PSK Compass
 * -------------------------------------------------
 * SVS = w_r·relevance + w_i·informedness + w_f·(1 − friction)
 *
 * All inputs are normalised to [0, 1]. The score is in [0, 1].
 * No external dependencies — plain ES module so reviewers can read and test it easily.
 */

export const DEFAULT_WEIGHTS = { relevance: 0.4, informedness: 0.3, friction: 0.3 };

/** Clamp a number into [0, 1]. */
export function clamp01(x) {
  if (Number.isNaN(x) || typeof x !== "number") return 0;
  return Math.min(1, Math.max(0, x));
}

/**
 * Compute the Session Value Score.
 * @param {{relevance:number, informedness:number, friction:number}} signals - each in [0,1]
 * @param {{relevance:number, informedness:number, friction:number}} [weights]
 * @returns {number} score in [0,1]
 */
export function computeSVS(signals, weights = DEFAULT_WEIGHTS) {
  const r = clamp01(signals.relevance);
  const i = clamp01(signals.informedness);
  const f = clamp01(signals.friction);
  const wSum = weights.relevance + weights.informedness + weights.friction;
  const raw =
    weights.relevance * r +
    weights.informedness * i +
    weights.friction * (1 - f);
  // Normalise by weight sum so arbitrary weights still yield [0,1].
  return clamp01(raw / (wSum || 1));
}

/**
 * Derive session signals from a raw event stream (sample-data shape).
 * relevance   = share of surfaced items the user engaged with
 * informedness = share of actions preceded by viewing decision context
 * friction    = normalised steps-to-first-action (capped at 8 steps)
 */
export function signalsFromEvents(session) {
  const surfaced = session.surfacedItems || 0;
  const engaged = session.engagedItems || 0;
  const actions = session.actions || 0;
  const informedActions = session.informedActions || 0;
  const steps = session.stepsToFirstAction ?? 8;

  return {
    relevance: surfaced > 0 ? engaged / surfaced : 0,
    informedness: actions > 0 ? informedActions / actions : 0,
    friction: clamp01(steps / 8),
  };
}

export function scoreSession(session, weights = DEFAULT_WEIGHTS) {
  return computeSVS(signalsFromEvents(session), weights);
}
