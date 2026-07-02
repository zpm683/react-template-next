---
applyTo: "**"
---

# React 前端开发指南

> 版本：V2026.0612  
> 常驻短规则，详细规范见 .github/prompts/specification.prompt.md

## 适用基线

- 当前工程基线：Vite 8、React 19、TypeScript 6、MUI 9、Storybook 10、Vitest 4、Playwright 1.60
- 本文件只放高频、稳定、必须始终生效的规则
- 详细示例、反例和分层说明统一放在 .github/prompts/specification.prompt.md

## 目录与导入

- 默认只在 src 下写业务代码，遵循现有目录结构，不随意调整脚手架配置
- app 目录当前使用纵向分层：@types、apis、assets、constants、features、hooks、layouts、pages、stores、themes、ui、utils
- 每个对外提供能力的目录必须有 index.ts 作为唯一导出入口
- 禁止深层导入，优先通过同层 index.ts 暴露后的路径导入
- 同层级导入使用相对路径，跨层级导入使用绝对路径

## 命名与类型

- 文件和目录使用 kebab-case；组件和类型使用 PascalCase；变量和函数使用 camelCase；常量使用 UPPER_SNAKE_CASE
- Props 类型必须带组件名后缀，例如 UserCardProps，禁止泛化为 Props
- 布尔变量使用 is、has、should、can 前缀；事件处理函数使用 handle 或 h 前缀
- 优先使用 type，非必要不使用 interface
- 禁止使用 enum，改用 as const 加类型别名
- 避免 any，优先 unknown 加类型守卫
- 公共类型和 API 类型放在 @types 中，按模块声明管理

## React 与组件

- 使用函数式组件，遵循单一职责和 SOLID 原则
- 组件内部代码顺序遵循 hooks、handler、effect、render
- ui 层保持纯展示：禁止直接调用 API，禁止直接访问全局状态，禁止承载业务逻辑
- features 层允许承载业务实现，但禁止直接调用 API；需要通过 hooks、props、状态编排完成交互
- pages 层负责页面级 API 调用，并组合 ui 和 features
- 可选 props 在参数解构时提供默认值，不在函数体内兜底
- JSX 中不要写复杂逻辑，复杂条件提取为 renderXxx 函数
- 列表渲染必须使用稳定 key；有增删改时禁止使用 index 和随机值
- 接收 children 的组件必须显式声明 children 类型

## 工程与测试

- 测试栈固定为 Vitest、Testing Library、Playwright，不要再按 Cypress 习惯写规约或命令
- 当前常用脚本：vite:dev、server:mock、ut:terminal、ut:ui、ut:coverage、e2e:terminal、e2e:ui、e2e:install、storybook:dev、vite:build
- 不要默认使用不存在的 npm run dev、npm run test、npm run build；执行前先以 package.json 为准
- coverage、playwright-report、storybook-static、test-results 属于产物目录，不作为业务代码落点

## 样式、状态与 API

- 除公共全局样式外，优先使用 CSS Modules、MUI sx 或其他模块化样式方案，避免新增非模块化 CSS
- stores 中的状态更新方法应保持纯函数风格
- apis 层只负责请求封装，不处理排序、聚合和业务编排
- API 命名使用 [请求方法][资源名]API 格式，例如 getUsersAPI
- 统一通过封装后的 axios 实例处理请求和错误，不在 API 层直接 alert 或 console 输出

## 禁止项

- 禁止硬编码密钥、Token 等敏感信息，使用 .env 文件管理
- Vite 环境变量统一使用 VITE\_ 前缀
- 禁止吞噬异常，异步逻辑优先使用 async/await，并保证错误路径有兜底
- 禁止随意新增与现有规则冲突的工程约定；如需扩展，优先更新详细规范文件
