# 黔客管家 · 贵客松公开验收版

黔客管家是一套面向贵州民宿的 AI 客户经营产品概念：把住前、住中、离店后的服务线索整理成可执行任务，让店员看见“谁需要处理、为什么处理、AI 做了什么、哪里必须由人确认”。

这个仓库是为比赛评审准备的**脱敏公开版本**。它保留可运行的交互 UI、合成场景和工程验证脚本，不包含生产系统的核心实现。

## 评委可以核验什么

- 三栏经营工作台：任务队列、对话上下文、证据与动作轨迹。
- 三类合成场景：雨天亲子服务、服务风险接管、贵州好物推荐。
- 明确的 Mock 边界：没有真实客人、商户、订单、收益或外部消息发送。
- 可重复的工程检查：Lint、TypeScript、单元测试和 Next.js 生产构建。
- 只读健康接口：`GET /api/health`。

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

产品介绍页：[qianke.ameng.studio](https://qianke.ameng.studio)
