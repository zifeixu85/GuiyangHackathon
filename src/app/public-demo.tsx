"use client";

import { Check, ChevronRight, CircleAlert, LoaderCircle, Play, RotateCcw, ShieldCheck } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import fixtureData from "@/data/public-fixtures.json";
import type { PublicScenario } from "@/data/public-types";

const scenarios = fixtureData as PublicScenario[];
type RunState = "idle" | "running" | "done";

export default function PublicDemo() {
  const [selectedId, setSelectedId] = useState(scenarios[0].id);
  const [runState, setRunState] = useState<RunState>("idle");
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const scenario = scenarios.find((item) => item.id === selectedId) ?? scenarios[0];

  useEffect(() => () => {
    if (timerRef.current) clearTimeout(timerRef.current);
  }, []);

  const selectScenario = (id: string) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setSelectedId(id);
    setRunState("idle");
  };

  const runDemo = () => {
    if (runState === "running") return;
    setRunState("running");
    timerRef.current = setTimeout(() => setRunState("done"), 720);
  };

  const resetDemo = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setRunState("idle");
  };

  return (
    <div className={`demo-shell demo-shell--${scenario.tone}`}>
      <div className="demo-banner">
        <span><ShieldCheck size={15} /> Mock 安全模式</span>
        <span>无网络请求 · 无外部副作用 · 无真实数据</span>
      </div>

      <div className="demo-grid">
        <aside className="queue-panel" aria-label="演示任务队列">
          <div className="panel-heading"><span>任务队列</span><small>{scenarios.length} 个合成场景</small></div>
          <div className="scenario-list">
            {scenarios.map((item) => (
              <button
                className={`scenario-button ${selectedId === item.id ? "is-active" : ""}`}
                key={item.id}
                type="button"
                onClick={() => selectScenario(item.id)}
                aria-pressed={selectedId === item.id}
              >
                <span className={`priority-dot priority-dot--${item.tone}`} />
                <span className="scenario-copy"><strong>{item.title}</strong><small>{item.queue} · {item.priority}</small></span>
                <ChevronRight size={16} />
              </button>
            ))}
          </div>
          <div className="queue-note"><CircleAlert size={16} /> 所有队列与优先级均为静态演示，不连接生产任务。</div>
        </aside>

        <section className="conversation-panel" aria-label="合成对话">
          <div className="panel-heading conversation-heading">
            <div><strong>{scenario.customerAlias}</strong><small>{scenario.lifecycle} · {scenario.channel}</small></div>
            <span className="mock-badge">MOCK</span>
          </div>
          <div className="conversation-body">
            <div className="message message--guest">
              <span>{scenario.customerAlias}</span>
              <p>{scenario.request}</p>
            </div>
            <div className="message message--draft">
              <span>公开演示草稿</span>
              <p>{scenario.draft}</p>
              <small>仅在浏览器内显示 · 不发送</small>
            </div>
          </div>
          <div className="conversation-actions">
            <button className="run-button" type="button" onClick={runDemo} disabled={runState === "running"}>
              {runState === "running" ? <LoaderCircle className="spin" size={17} /> : <Play size={17} />}
              {runState === "idle" ? "模拟执行" : runState === "running" ? "本地演算中" : "再次模拟"}
            </button>
            <button className="reset-button" type="button" onClick={resetDemo}><RotateCcw size={16} /> 重置</button>
          </div>
        </section>

        <aside className="evidence-panel" aria-label="证据与动作轨迹">
          <div className="panel-heading"><span>证据与动作</span><small>公开抽象</small></div>
          <div className="evidence-block">
            <h3>判断依据</h3>
            <ul>{scenario.evidence.map((item) => <li key={item}>{item}</li>)}</ul>
          </div>
          <div className="evidence-block">
            <h3>安全边界</h3>
            <ul>{scenario.guardrails.map((item) => <li key={item}>{item}</li>)}</ul>
          </div>
          <div className="step-list">
            {scenario.steps.map((step, index) => (
              <div className={`step-item ${runState === "done" ? "is-done" : ""}`} key={`${scenario.id}-${step.actor}`}>
                <span className="step-index">{runState === "done" ? <Check size={13} /> : index + 1}</span>
                <div><strong>{step.actor}</strong><p>{step.action}</p>{runState === "done" && <small>{step.result}</small>}</div>
              </div>
            ))}
          </div>
          <div className={`outcome-card ${runState === "done" ? "is-visible" : ""}`}>
            <small>模拟结果</small>
            <strong>{runState === "done" ? scenario.outcome : "等待本地模拟"}</strong>
            <span>{runState === "done" ? scenario.valueNote : "不会产生外部动作"}</span>
          </div>
        </aside>
      </div>
    </div>
  );
}
