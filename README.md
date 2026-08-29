# 黔客管家 · 贵客松公开验收版

黔客管家是一套面向贵州民宿的 AI 客户经营产品概念：把住前、住中、离店后的服务线索整理成可执行任务，让店员看见“谁需要处理、为什么处理、AI 做了什么、哪里必须由人确认”。

这个仓库是为比赛评审准备的**脱敏公开版本**。它保留可运行的交互 UI、合成场景和工程验证脚本，不包含生产系统的核心实现。

> 商业项目公开说明：本仓库按比赛要求公开可检验的部分代码；已部署实例使用非公开生产实现。两者共享产品方向和交互语言，但本仓库不包含生产系统的核心代码、真实数据与凭证。

## 评委可以核验什么

- 三栏经营工作台：任务队列、对话上下文、证据与动作轨迹。
- 三类合成场景：雨天亲子服务、服务风险接管、贵州好物推荐。
- 明确的 Mock 边界：没有真实客人、商户、订单、收益或外部消息发送。
- 可重复的工程检查：Lint、TypeScript、单元测试和 Next.js 生产构建。
- 只读健康接口：`GET /api/health`。

## 在线访问（已部署实例）

| 入口 | 直接访问 URL | 用途 |
| --- | --- | --- |
| 产品介绍 | [https://qianke.ameng.studio](https://qianke.ameng.studio) | 查看产品定位、能力边界与演示说明 |
| 现场体验 | [https://qianke.ameng.studio/experience](https://qianke.ameng.studio/experience) | 直接运行公开评审场景，无需安装 |
| 健康检查 | [https://qianke.ameng.studio/api/health](https://qianke.ameng.studio/api/health) | 核验线上服务与数据库状态 |

线上体验使用 Web 模拟消息通道，页面中的客户、门店、订单和金额均为演示数据；页面会分别标注真实运行部分与模拟部分，不把模拟结果表述为真实经营业绩。

## 技术栈与选型

| 层次 | 技术 / 框架 | 版本 | 选型理由 |
| --- | --- | --- | --- |
| 应用框架 | Next.js App Router | 16.3.3 | 同一工程组织页面、静态预渲染和只读健康接口，便于评委直接构建核验 |
| 视图层 | React | 19.2.8 | 用组件和浏览器内状态实现三栏工作台交互，不依赖生产后端 |
| 开发语言 | TypeScript | 5.9.x | 对公开场景、状态和组件属性做严格类型约束 |
| 样式 | 原生 CSS | CSS3 | 不引入额外样式运行时，便于审查响应式布局与可访问性 |
| 图标 | Lucide React | 0.542.x | 使用轻量、可访问的 SVG 图标组件 |
| 质量检查 | ESLint、TypeScript、Node.js Test Runner | Node.js 20.9+ | 覆盖静态检查、类型检查、Mock 数据纪律和脱敏范围扫描 |

公开版架构为：Next.js Server Component 页面外壳 + React Client Component 交互沙箱 + 合成 JSON 场景 + `GET /api/health`。完整边界见 [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md)。

## 本地运行

要求 Node.js 20.9 或更高版本。

```bash
npm ci
npm run dev
```

访问 `http://localhost:3000`。完整验收：

```bash
npm run verify
```

## 公开边界

本仓库刻意不包含：真实渠道适配、身份与权限、数据库模型和迁移、AI 编排与提示词、知识检索实现、风控与归因算法、部署配置、内部规格、真实数据和任何凭证。

详细说明见 [PUBLIC_SCOPE.md](PUBLIC_SCOPE.md)，架构抽象见 [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md)，验收步骤见 [docs/VERIFICATION.md](docs/VERIFICATION.md)。

## 数据声明

页面中的人物均为“演示客人 A/B/C”，金额、库存、天气、对话、执行结果全部为合成数据，只用于说明产品交互，不代表真实经营结果。
