export type ScenarioTone = "amber" | "rose" | "jade";

export interface PublicScenario {
  id: string;
  title: string;
  queue: string;
  priority: string;
  customerAlias: string;
  lifecycle: string;
  channel: "Web 演示通道";
  request: string;
  draft: string;
  evidence: string[];
  guardrails: string[];
  steps: Array<{
    actor: string;
    action: string;
    result: string;
  }>;
  outcome: string;
  valueNote: string;
  tone: ScenarioTone;
  mock: true;
}
