/**
 * Unit tests for the Session Value Score engine.
 * Run with:  node --test
 * Uses Node's built-in test runner — no external dependencies.
 */
import { test } from "node:test";
import assert from "node:assert/strict";
import {
  computeSVS,
  clamp01,
  signalsFromEvents,
  scoreSession,
  DEFAULT_WEIGHTS,
} from "../src/svs.mjs";

test("clamp01 bounds values into [0,1]", () => {
  assert.equal(clamp01(-1), 0);
  assert.equal(clamp01(2), 1);
  assert.equal(clamp01(0.5), 0.5);
  assert.equal(clamp01("x"), 0);
});

test("perfect session scores 1", () => {
  const s = computeSVS({ relevance: 1, informedness: 1, friction: 0 });
  assert.equal(s, 1);
});

test("worst session scores 0", () => {
  const s = computeSVS({ relevance: 0, informedness: 0, friction: 1 });
  assert.equal(s, 0);
});

test("friction reduces the score", () => {
  const low = computeSVS({ relevance: 0.8, informedness: 0.8, friction: 0.1 });
  const high = computeSVS({ relevance: 0.8, informedness: 0.8, friction: 0.9 });
  assert.ok(low > high);
});

test("signalsFromEvents derives ratios correctly", () => {
  const sig = signalsFromEvents({
    surfacedItems: 10,
    engagedItems: 5,
    actions: 2,
    informedActions: 2,
    stepsToFirstAction: 4,
  });
  assert.equal(sig.relevance, 0.5);
  assert.equal(sig.informedness, 1);
  assert.equal(sig.friction, 0.5);
});

test("browsing-only session (no action) scores low; confident session scores higher", () => {
  const browsing = scoreSession({
    surfacedItems: 12,
    engagedItems: 2,
    actions: 0,
    informedActions: 0,
    stepsToFirstAction: 8,
  });
  const confident = scoreSession({
    surfacedItems: 12,
    engagedItems: 9,
    actions: 1,
    informedActions: 1,
    stepsToFirstAction: 2,
  });
  assert.ok(confident > browsing);
  assert.ok(browsing < 0.4);
  assert.ok(confident > 0.7);
});

test("weights are respected and normalised", () => {
  const s = computeSVS(
    { relevance: 1, informedness: 0, friction: 1 },
    { relevance: 1, informedness: 0, friction: 0 }
  );
  assert.equal(s, 1); // only relevance counts here
  assert.equal(DEFAULT_WEIGHTS.relevance, 0.4);
});
