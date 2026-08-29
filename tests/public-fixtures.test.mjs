import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const fixtureUrl = new URL("../src/data/public-fixtures.json", import.meta.url);
const scenarios = JSON.parse(await readFile(fixtureUrl, "utf8"));

test("public fixtures contain three reviewable synthetic scenarios", () => {
  assert.equal(scenarios.length, 3);
  assert.equal(new Set(scenarios.map((scenario) => scenario.id)).size, scenarios.length);
});
test("every scenario is explicitly mock-only and uses synthetic aliases", () => {
  for (const scenario of scenarios) {
    assert.equal(scenario.mock, true);
    assert.match(scenario.customerAlias, /^演示客人 [A-C]$/);
    assert.equal(scenario.channel, "Web 演示通道");
    assert.ok(scenario.evidence.length >= 3);
    assert.ok(scenario.guardrails.length >= 3);
    assert.ok(scenario.steps.length >= 3);
  }
});

test("fixtures contain no URLs, credentials, phone numbers, or email addresses", () => {
  const serialized = JSON.stringify(scenarios);
  assert.doesNotMatch(serialized, /https?:\/\//i);
  assert.doesNotMatch(serialized, /\b1[3-9]\d{9}\b/);
  assert.doesNotMatch(serialized, /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i);
  assert.doesNotMatch(serialized, /(?:secret|token|password|api[_-]?key)\s*[:=]/i);
});
