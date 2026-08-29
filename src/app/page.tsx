import { ArrowUpRight, BadgeCheck, Boxes, Code2, Eye, LockKeyhole, ShieldCheck, Sparkles } from "lucide-react";
import PublicDemo from "./public-demo";

const boundaries = [
  { icon: Eye, title: "可核验", text: "页面、状态切换、合成场景、测试与生产构建全部可在本地复现。" },
  { icon: ShieldCheck, title: "可解释", text: "每个场景同时展示请求、证据、动作、人工边界和 Mock 声明。" },
  { icon: LockKeyhole, title: "已脱敏", text: "没有真实数据、凭证、外部通道、鉴权、数据库、模型调用或部署配置。" },
];

export default function Home() {
  return (
    <main>
      <header className="topbar shell">
        <a className="brand" href="#top" aria-label="返回页面顶部">
          <span className="brand-mark">黔</span>
          <span>黔客管家</span>
        </a>
        <div className="topbar-actions">
          <span className="public-pill"><BadgeCheck size={15} /> 公开验收版</span>
          <a className="text-link" href="https://github.com/zifeixu85/GuiyangHackathon" target="_blank" rel="noreferrer">
            查看源码 <ArrowUpRight size={15} />
          </a>
        </div>
      </header>

      <section className="hero shell" id="top">
        <div className="hero-copy">
          <span className="eyebrow"><Sparkles size={16} /> 贵客松 · AI × 文旅</span>
          <h1>让民宿看见每一位客人<br />下一步需要什么。</h1>
          <p className="hero-lead">
            这是一套公开可运行的产品交互样本：用任务队列、对话上下文和证据轨迹，解释 AI 如何协助服务，同时把必须由人确认的边界摆在台面上。
          </p>
          <div className="hero-actions">
            <a className="primary-button" href="#demo">进入交互沙箱</a>
            <a className="secondary-button" href="/api/health">检查健康接口</a>
          </div>
          <p className="disclosure">全部人物、对话、天气、库存、订单与金额均为合成 Mock 数据。</p>
        </div>
        <div className="hero-card" aria-label="公开版范围概览">
          <div className="hero-card-head">
            <span>PUBLIC RELEASE</span>
            <Code2 size={19} />
          </div>
          <strong>评审能运行什么？</strong>
          <ul>
            <li><span>01</span> 三栏经营工作台</li>
            <li><span>02</span> 三个合成业务场景</li>
            <li><span>03</span> Mock 与人工边界提示</li>
            <li><span>04</span> 自动范围扫描与构建</li>
          </ul>
          <div className="hero-card-foot"><LockKeyhole size={15} /> 核心生产实现不在本仓库</div>
        </div>
      </section>

      <section className="principles shell" aria-label="公开版原则">
        {boundaries.map(({ icon: Icon, title, text }) => (
          <article key={title} className="principle-card">
            <Icon size={22} />
            <div><h2>{title}</h2><p>{text}</p></div>
          </article>
        ))}
      </section>

      <section className="demo-section shell" id="demo">
        <div className="section-heading">
          <div>
            <span className="eyebrow"><Boxes size={16} /> 现场可操作</span>
            <h2>公开评审沙箱</h2>
          </div>
          <p>切换场景并点击“模拟执行”。所有变化只存在于当前浏览器，刷新即恢复。</p>
        </div>
        <PublicDemo />
      </section>

      <section className="boundary-section shell">
        <div>
          <span className="eyebrow"><ShieldCheck size={16} /> 代码边界</span>
          <h2>公开交互，保护核心。</h2>
        </div>
        <div className="boundary-grid">
          <article>
            <span className="boundary-label boundary-label--public">本仓库</span>
            <h3>展示与验收层</h3>
            <p>页面结构、样式、浏览器状态、合成场景、健康检查和公开范围测试。</p>
          </article>
          <article>
            <span className="boundary-label boundary-label--private">非公开</span>
            <h3>生产能力层</h3>
            <p>真实渠道、权限、数据、AI 执行、知识检索、安全护栏、经营归因与部署实现。</p>
          </article>
        </div>
      </section>

      <footer className="footer shell">
        <span>黔客管家 · 贵客松公开验收版</span>
        <span>Source available for evaluation · All data is synthetic</span>
      </footer>
    </main>
  );
}
