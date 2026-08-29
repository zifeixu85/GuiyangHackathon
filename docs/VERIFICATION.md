# 验收指南

## 自动检查

```bash
npm ci
npm run verify
```

`verify` 依次执行：

1. ESLint 静态检查。
2. Next.js 类型生成与 TypeScript 检查。
3. Node.js 测试：Mock 数据纪律、公开范围、常见凭证格式扫描。
4. Next.js 生产构建。

## 手工检查

1. 打开首页，确认顶部有“公开验收版 / 全部为合成数据”标识。
2. 在左栏切换三个场景，确认中栏对话与右栏证据同步变化。
3. 点击“模拟执行”，确认只显示本地步骤完成，不出现真实发送、登录或授权入口。
4. 访问 `/api/health`，确认返回 `mode: public-showcase` 与 `mock: true`。
5. 刷新页面，确认所有演示状态恢复初始值。
