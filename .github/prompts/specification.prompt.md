---
agent: agent
name: React开发者规约
description: 这是一个React开发者规约，旨在规范React项目的开发流程、代码风格和最佳实践，以提高代码质量和团队协作效率。
argument-hint: 请根据以下规约编写和审查React项目代码，确保遵守所有规范和最佳实践。
---

# React开发者规约

> 版本：V2026.0612  
> 适用范围：基于 Vite 8 + React 19 + TypeScript 6 的前端项目

说明：本文件是详细规范与示例手册；高频且始终生效的短规则统一维护在 .github/copilot-instructions.md。若两者表述层级不同，以 copilot-instructions 的常驻约束为入口，以本文件的详细解释为展开依据。

## 1.工程规范

### 1.0 非必要不要修改eslint和prettier默认规则

本脚手架已按照最佳实践配置了最佳默认规则。  
如在开发过程中出现了错误级别的问题，请务必修复。  
警告级别也需要在上线前全部消除。（开发阶段允许存在）

如果使用vscode开发请务必安装好推荐名单中的插件。

### 1.1 尽量保持模板代码中的层级和配置。

(大多数场景下，只需要在src中添加代码即可，环境已按照最佳实践配置完成)

```txt
├─.husky                  # Git 钩子配置目录，用于自动化代码检查、提交等
├─.mock                   # 本地 mock 数据和配置目录
│   ├─config.json         # mock 服务的配置文件
│   └─data.json           # mock 数据文件
├─.storybook              # Storybook 配置目录，用于组件开发和文档
│   ├─main.ts             # Storybook 主配置文件
│   └─preview.ts          # Storybook 预览配置文件
├─coverage                # 单元测试覆盖率报告输出目录
├─docs                    # 文档目录
├─playwright-report       # Playwright HTML 报告输出目录
├─public                  # 公共静态资源目录
├─src                     # 项目源代码目录
│   ├─app                 # 主业务代码目录
│   │   ├─@types          # 类型定义目录
│   │   ├─apis            # API 请求相关代码
│   │   ├─assets          # 静态资源（如图片、字体等）
│   │   ├─components      # 组件目录
│   │   │   ├─atoms       # 原子级基础组件
│   │   │   ├─molecules   # 分子级组合组件
│   │   │   ├─organisms   # 组织级复杂组件
│   │   │   └─index.ts    # 组件导出入口
│   │   ├─constants       # 常量定义目录
│   │   ├─features        # 业务功能模块目录
│   │   ├─hooks           # 自定义 React Hooks 目录
│   │   ├─layout          # 页面布局组件目录
│   │   ├─stores          # 状态管理相关目录
│   │   ├─themes          # 主题和样式相关目录
│   │   ├─utils           # 工具函数目录
│   │   ├─app.tsx         # 应用主入口组件
│   │   └─index.ts        # 应用主入口文件
│   ├─e2e                 # Playwright E2E 测试目录
│   ├─shared              # 跨业务/全局共享代码目录
│   │   ├─components      # 可复用的共享组件
│   │   ├─hooks           # 可复用的共享 Hooks
│   │   └─utils           # 可复用的共享工具函数
│   ├─test                # 单元测试相关目录
│   │   └─setup.ts        # 测试环境初始化文件
│   ├─index.css           # 全局样式文件
│   └─index.tsx           # React 应用入口文件
├─test-results            # Playwright 原始测试结果目录
├─types                   # 全局类型声明目录
├─eslint.config.js        # ESLint 代码规范配置文件
├─index.html              # 项目入口 HTML 文件
├─package.json            # 项目依赖及脚本配置文件
├─playwright.config.ts    # Playwright 测试配置文件
├─README.md               # 项目说明文档
├─stats.html              # 构建统计分析页面
├─tsconfig.json           # TypeScript 编译配置文件
└─vite.config.ts          # Vite 构建工具配置文件
```

补充约定：以上目录以当前工程现状为准，像 coverage、playwright-report、storybook-static、test-results 这类产物目录通常不需要手动维护，也不应作为业务代码落点。

### 1.2 下面是脚手架中已经添加过的常用库，如果不能满足需求，请自行添加其他第三方库或调整现有库。

当前工程基线版本：Vite 8、React 19、TypeScript 6、MUI 9、Storybook 10、Vitest 4、Playwright 1.60。

- 🏗️ bootstrap by [vite](https://vitejs.dev/)  
  【Vite 启动项目】—— 用于快速搭建和开发现代前端项目的构建工具，启动速度极快。

- ⚛️ framework by [react](https://beta.reactjs.org/)  
  【React 框架】—— 主流的前端 UI 框架，负责构建用户界面和组件逻辑。

- 🧬 language by [typescript](https://www.typescriptlang.org/)  
  【TypeScript 语言】—— JavaScript 的超集，提供类型系统，提升代码可维护性和开发体验。

- 🏭 build by tsc & [vite](https://github.com/vitejs/vite)  
  【tsc & Vite 构建】—— tsc 用于 TypeScript 编译，Vite 用于开发和生产环境的高效构建。

- 🖼️ component by [mui](https://mui.com/)  
  【MUI 组件库】—— 基于 Material Design 的 React 组件库，快速搭建美观一致的 UI。

- ⚛️ design-pattern by [atomic design](https://atomicdesign.bradfrost.com/)  
  【原子化设计模式】—— 组件分层思想，将 UI 拆分为原子、分子、有机体等层级，提升复用性和可维护性。

- 📔 ui component explorer by [storybook](https://storybook.js.org/)  
  【Storybook 组件开发与文档】—— 独立开发、测试和展示 UI 组件的工具，支持组件文档和交互演示。

- 🎛️ state-management by [zustand](https://zustand-demo.pmnd.rs/)  
  【Zustand 状态管理】—— 轻量级、无模板限制的 React 状态管理库，简单易用。

- 📝 form by [react-hook-form](https://react-hook-form.com/) & form-validation by [zod](https://zod.dev/)  
  【表单管理与校验】—— react-hook-form 提供高性能表单状态管理，zod 提供类型安全的表单校验。

- ⚓ page-router by [react-router](https://reactrouter.com/)  
  【页面路由】—— React 应用的路由解决方案，实现页面导航和路由守卫等功能。

- 💥 error-boundary by [react-error-boundary](https://github.com/bvaughn/react-error-boundary)  
  【错误边界】—— 捕获 React 组件树中的渲染错误，优雅地展示错误信息，防止页面崩溃。

- 🪝 react-hooks by [ahooks](https://ahooks.js.org/)  
  【ahooks React Hooks 库】—— 提供丰富的高质量 React Hooks，提升开发效率。

- 📡 http-client by [use-request](https://ahooks.js.org/hooks/use-request/index) & [axios](https://axios-http.com/)  
  【HTTP 请求工具】—— use-request 是基于 ahooks 的请求管理 Hook，axios 是流行的 HTTP 客户端库。

- 🪄 makes typescript's built-in typings be better by [ts-reset](https://github.com/total-typescript/ts-reset)  
  【TypeScript 类型增强】—— ts-reset 优化和修复 TypeScript 内置类型定义，让类型推断更准确。

- 🎏 create immutable-state by [immer](https://immerjs.github.io/immer/)  
  【不可变数据管理】—— immer 让你以可变的方式编写不可变数据逻辑，简化状态更新。

- 📅 date-tools by [dayjs](https://day.js.org/)  
  【日期处理工具】—— dayjs 是轻量级的日期处理库，API 简洁，兼容 moment.js。

- 🏘️ test-framework by [vitest](https://vitest.dev/)  
  【单元测试框架】—— vitest 是 Vite 生态下的极速单元测试框架，兼容 Jest 语法。

- 🐙 unit-test by [@testing-library](https://testing-library.com/)  
  【组件测试工具】—— 提供一套以用户为中心的测试方法，专注于组件行为而非实现细节。

- 🎭 e2e-test by [playwright](https://playwright.dev/)  
  【端到端测试】—— Playwright 用于自动化浏览器测试，支持多浏览器、网络拦截、追踪回放与更稳定的 CI 集成。

- 👀 lint-code by [eslint](https://eslint.org) & [prettier](https://prettier.io/)  
  【代码规范与格式化】—— eslint 用于代码质量检查，prettier 用于统一代码风格。

- 🔍 dependencies checker by [madge](https://github.com/pahen/madge)  
  【依赖关系分析】—— madge 可视化项目依赖关系，帮助发现循环依赖等问题。

- 📊 test-coverage by [@vitest/coverage-v8](https://vitest.dev/guide/coverage.html)  
  【测试覆盖率统计】—— 通过 Vitest 原生覆盖率能力输出覆盖率报告，帮助提升测试完整性。

- 🚀 performance monitoring by [react-scan](https://react-scan.com/)  
  【性能监控】—— react-scan 用于分析和监控 React 应用的性能瓶颈。

- 🕵️ commit-check by [husky](https://typicode.github.io/husky/#/) & [lint-staged](https://github.com/okonet/lint-staged)  
  【提交校验】—— husky 用于 Git 钩子自动化，lint-staged 用于提交前代码检查和修复。

- 🧩 other tools:[json-server](https://github.com/typicode/json-server) [radash](https://github.com/toss/radash/tree/main) [qs](https://github.com/ljharb/qs) [svgr](https://react-svgr.com/)
  【其他工具】—— json-server 用于快速搭建 mock API，radash 提供实用函数集合，qs 处理查询参数，SVGR 负责将 SVG 转成 React 组件。

### 1.2.1 当前常用脚本

- 本地开发：`npm run vite:dev`
- 启动 Mock 服务：`npm run server:mock`
- 单元测试：`npm run ut:terminal`
- 单元测试 UI：`npm run ut:ui`
- 单元测试覆盖率：`npm run ut:coverage`
- E2E 测试：`npm run e2e:terminal`
- E2E 测试 UI：`npm run e2e:ui`
- 安装 Playwright 浏览器：`npm run e2e:install`
- Storybook：`npm run storybook:dev`
- 生产构建：`npm run vite:build`

不要在规约、文档或自动化提示词中继续使用已经不存在的 `npm run dev`、`npm run test`、`npm run build` 作为默认命令；如需执行，请优先引用 package.json 中的真实脚本名。

### 1.3 src/app文件的夹结构

app 文件夹中的结构虽然比较自由，但一般有两种推荐的结构。

#### 纵向（一般针对小型项目）（脚手架默认）

特点是基于前端中的技术领域规划文件夹

```
├─@types
│  ├─models
│  └─views
├─apis
├─assets
│  └─img
├─components
│  ├─atoms
│  ├─molecules
│  └─organisms
├─constants
├─features
├─hooks
├─layout
├─stores
├─themes
└─utils
```

#### 横向（一般针对大型项目，有2种及以上的不同业务时推荐采用）

特点是基于业务规划文件夹。  
 一般有一个公共文件夹（@common）用来存放业务间可以复用的组件或者方法又或者全局配置，  
 各业务文件夹内部再按照纵向分层（可以按照实际情况缺少某些文件夹）。

```
├─@common
│  ├─@types
│  ├─...
│  └─utils
├─xxx
│  ├─@types
│  ├─...
│  └─utils
├─yyy
│  ├─@types
│  ├─...
│  └─utils
└─app.tsx
```

> 横向结构时的注意事项
>
> - @common文件夹中只能防止全局通用或者公共业务相关的内容
>   如果某个业务中存在一个需要给其他业务使用的方法时，应该从该业务的文件夹中导出，而不是在@common中实现。
> - 各业务文件夹也需要一个index.ts作为导入导出管理

### 1.4 每个文件夹都应该有一个index.ts作为导入导出管理

JS/TS中的变量只要export就能在任意位置import。
如果没有进行导入导出管理，这种“随意”将导致工程难以维护。
所以我们有如下约定：

- index.ts中只能导出需要对其他文件夹（外部）公开的变量。
- index.ts没导出的变量一律视为当前文件夹中的内部变量。
- index.ts中导出的变量被其他人使用发现BUG时，由此变量的创建者者负责。（因为是允许对外公开的变量，原则可以被复用）
- index.ts中没导出的变量，被其他人绕开index.ts直接从源文件导入导致BUG的，此变量的创建者不负责。（因为是内部变量，原则上不能被复用）
- components文件夹中如果按照了原子化分层，只需要components层有一个index.ts即可，atoms，molecules，organisms文件夹下无需index.ts。

### 1.5 不能从深的层级导入变量，必须通过index.ts导入

```ts
// Bad!
import { Xxx } from "./components/xxx";
import { Yyy } from "app/components/yyy";
import { Zzz } from "app/@common/components";

// Good!
import { Xxx } from "./components";
import { Yyy } from "app/components";
import { Zzz } from "app/@common";

```

### 1.6 从同层级导入变量时使用相对路径，跨层级时使用绝对路径

此规则是为了区分是外部变量还是内部变量，方便后续review和维护。

eg:当components中的组件A需要使用components中的组件B时（同层级）

```tsx
// Bad!
import { B } from "app/components";

const A = () => {
    return <B/>
};

// Good!
import { B } from "./components";

const A = () => {
    return <B/>
};
```

eg:当components中的组件A需要使用constants中的常量B时（跨层级）

```tsx
// Bad!
import { B } from "./constants";

const A = () => {
    return <B/>
};

// Good!
import { B } from "app/constants";

const A = () => {
    return <B/>
};
```

### 1.7 除非有公共CSS，其他情况下不能出现非模块化css定义文件。

模块化：xxxx.module.css/useStyle/sx  
非模块: xxx.css

### 1.8 避免直接使用console.log，而是使用项目专用的封装后的Logger

### 1.9 环境变量使用规范

- 敏感信息(API密钥/Token)禁止硬编码,必须使用 `.env` 文件
- 环境变量命名格式: `VITE_XXX_YYY`
- `.env.local` 文件禁止提交到Git(已在 `.gitignore` 中)

## 2.命名规范

### 2.1 文件夹/文件一般使用 xxx-yyy-zzz 的格式命名`

### 2.2 需要顶置的文件夹可以使用@开头（比如 @types/@common等）

### 2.3 临时文件夹或文件必须以\_开头

### 2.4 class类和React组件大驼峰式命名 (XxxxYyyyZzzz)

### 2.5 常量用 XXX_YYY_ZZZ 的格式命名 (注意大写)

### 2.6 一般的变量都是小驼峰式命名 (xxxxYyyyZzzz)

### 2.7 根组件所在文件名一般和文件夹名一致

    比如 app/features/login文件夹中的根组件文件应该是 login.tsx

### 2.8 类型都是大驼峰命名（XxxxYyyyZzzz）

### 2.9 布尔变量命名

- 使用 `is/has/should/can` 前缀 (第三方库导出的变量除外)
- ✅ Good: `isLoading`, `hasError`, `shouldUpdate`
- ❌ Bad: `loading`, `error`, `update`

### 2.10 事件处理函数命名

- 使用 `handle`或者 `h` 前缀 + 事件类型
- ✅ Good: `handleClick`, `hClick`, `handleSubmit`, `handleChange`
- ❌ Bad: `click`, `submit`, `onChange`

## 3.组件规范

### 3.1 使用函数式组件，避免使用class式组件

### 3.2 不用过早考虑组件性能优化

过早进行性能优化可能会适得其反，不但性能改善不明显，内存占用反而会变大。  
本脚手架配置了性能检查工具，如果发现性能明显下降（比如FPS波动，交互明显卡顿）等再进行性能优化。

### 3.3 公共组件都应该开发对应的storybook用来展示示例

### 3.4 开发组件时，按照hooks-handler-effect-render的顺序

```tsx
// 标准Demo改
import { FC, useCallback, useState } from "react";

// 组件的props接口
type XxxxProps = {
  props1: string;
  props2?: number; // 可选项
  props3: () => void;
};

/**
 * Xxxx组件
 */
export const Xxxx: FC<XxxxProps> = ({
  props1,
  props2 = 0, // 可以赋初值
  props3,
  children,
}) => {
  ////////// hooks start  ///////////
  const [state, setstate] = useState(0);
  ////////// hooks end  ///////////

  ////////// handler start ///////////
  const handleClick = () => {
    props3();
  };
  /////////// handler end ///////////

  ////////// effect start  ///////////
  useEffect(() => {}, [xxx]);
  ////////// effect end  ///////////

  /////////// render start ///////////
  const renderFooter = () => {
    return <div>footer</div>;
  };
  /////////// render end ///////////
  return (
    <div onClick={handleClick}>
      <h1>{props1}</h1>
      <h2>{props2}</h2>
      <h3>{state}</h3>
      {renderFooter()}
    </div>
  );
};
```

### 3.5 组件的 key 不能是一个动态的 key，如 Math.random() 或 等动态生成的UUID等。

此外一定要保证key的局部唯一性，如果无法保证可以使用map方法的index，
但是如果UI上有排序或者拖拽动作时务必不要使用map方法的index作为key。

### 3.6 Props默认值处理

- 可选Props必须在参数解构时赋初值(而非组件内部判断)
- ✅ Good: `const Xxx: FC<Props> = ({ size = 'medium' }) => ...`
- ❌ Bad: `const size = props.size || 'medium'`

### 3.7 条件渲染规范

- 简单条件使用 `&&` 或三元运算符
- 复杂条件必须提取为 `renderXxx` 函数
- 禁止在JSX中写复杂逻辑(超过3行)

### 3.8 列表渲染规范

- 必须使用稳定的 `key`(禁止 `Math.random()`)
- 数据有增删改时禁止使用 `index` 作为key
- 推荐使用数据的唯一标识(`id/uuid`)

### 3.9 性能优化时机

- 仅在以下情况优化:
  1. React DevTools Profiler显示明显性能问题
  2. FPS低于30(使用react-scan监控)
  3. 用户反馈明显卡顿

### 3.10 优化手段

- `React.memo`: 仅用于纯展示组件(props不频繁变化)
- `useMemo`: 仅用于昂贵计算(遍历大数组/复杂对象转换)
- `useCallback`: 仅用于传递给子组件的回调(子组件用了memo时)

### 3.11 children 类型定义规范

- 如果组件接收 children，必须显式声明类型
- ✅ Good:
  ```tsx
  type LayoutProps = {
    children: React.ReactNode; // 推荐
  };
  ```
- ❌ Bad:
  ```tsx
  const Layout: FC = ({ children }) => ... // children 类型隐式 any
  ```

## 4.类型定义规范

### 4.1 类型中的注解需采用多行格式（为了更好的提示效果）

```ts
//bad
// user接口的响应
type UserRes = {
  // 名字
  name: string;
  // 年龄
  age: number;
};

// good
/** user接口的响应 */
type UserRes = {
  /**名字 */
  name: string;
  /**年龄 */
  age: number;
};
```

### 4.2 优先使用type关键字定义类型，非必要不使用interface关键字

> 什么时候必要？
> 如果需要定义一个可以被他人拓展的类型，又或者要拓展已有interface类型时才使用interface

### 4.3 避免使用 `any`

- 生产代码中禁止使用 `any`(除非确实无法推断)
- 使用 `unknown` 替代,配合类型守卫(type guard)
- 临时开发阶段可用 `// @ts-ignore`,但上线前必须移除

### 4.4 泛型使用规范

- 泛型参数命名: 单字母(`T/K/V`)或语义化(`TData/TError`)
- 复杂泛型必须添加注释说明约束条件

### 4.5 禁止使用enum关键字，而是用 as const + 类型别名的方式定义枚举类型

```ts
// bad
enum Color {
  RED = "red",
  GREEN = "green",
  BLUE = "blue",
}
```

```ts
// good
const COLOR = {
  RED: "red",
  GREEN: "green",
  BLUE: "blue",
} as const;
type Color = (typeof COLOR)[keyof typeof COLOR];
```

## 5.各文件夹内部规范

### 5.1 关于@types文件夹

- 公共类型或 API 接口需要在@types 文件夹内定义 (xxx.d.ts)
- xxx.d.ts 内需要定义为模块。 规则: declare module "文件夹名.文件名"

```ts
// app/@types/models/login.d.ts
declare module "models.login" {
  type A = {};
  type B = {};
}

// app/login/@types/models/auth.d.ts
declare module "login.models.auth" {
  type A = {};
  type B = {};
}
```

- @type/models 文件夹内放置 API 接口的定义文件，在其中指定 Request 与 Response 的类型

```ts
// app/@types/models/login.d.ts
declare module "models.login" {
  type Request = {
    id: string;
    pass: string;
  };
  type Response = {
    token: string;
  };
}
```

- @type/views 文件内可以定义一些UI上所需的共享类型

```ts
// app/@types/views/login.d.ts
declare module "views.login" {
  form: {
    xxx: string;
  }
}
```

- 如果有一些类型可以在models和views文件夹中公用，则在@type下定义一个common.d.ts
- 没有共通性的类型可直接定义在自己对应的 .ts 或.tsx 文件内。

### 5.2 关于apis文件夹

- 单一职责原则，不能干封装api以外的事（比如数据排序，整合等）
- 变量一般以请求类型开头，以API结尾。
- 文件名一般和API资源名一致
- 使用封装过的axiosInstance调用API
- 一般都会引入models文件夹中定义好的res和req类型

```ts
//  user.ts
import { Req, Res } from "models.getUsers";

import { axiosInstance } from "shared/utils";

const getUsersAPI = async (req: Req) => {
  return await axiosInstance.get<Res>("/users");
};

const postUsersAPI = async (req: Req) => {
  return await axiosInstance.post<Res>("/users");
};

export { getUsersAPI, postUsersAPI };
```

### 5.2.1 错误处理规范

- API调用必须使用 `try-catch` 或全局错误拦截器
- 错误信息需要统一格式化(通过 `axiosInstance` 拦截器)
- 禁止在API层直接 `alert/console.error`

### 5.2.2 API命名补充

- 命名格式: `[请求方法][资源名]API`
- ✅ Good: `getUsersAPI`, `postLoginAPI`, `deleteUserAPI`
- ❌ Bad: `getUsers`, `login`, `delUser`

### 5.3 关于assets文件夹

- 一般用来放置静态资源 (图片，SVG组件，音频，视频，字体文件等)
- 需要在index.ts 统一进行资源的导入导出
- 导出时需要具名化

```ts
import LOGO_PNG from "./img/logo.png";

export { LOGO_PNG };
```

### 5.4 关于components文件夹

- 采用原子设计模型（有atoms/molecules/organisms文件夹）
- 原子是最小的组件，分子由原子组成，组织由分子和原子组成
- 组件要尽量抽象并语义化，定义组件和考虑其Props时尽量脱离业务，要从UI的角度考虑。(organisms层除外)
- 组件命名时，末尾一般都是一种UI上的概念（dialog, panel, card ....）
- components文件夹中的组件都应该是纯粹的组件
- components文件夹中的组件禁止调用任何API
- components文件夹中的组件禁止调用任何全局状态（需要通过props传递）
- components文件夹中的组件禁止处理任何业务性逻辑 （需要以回调（事件）的形式对外公开参数）
- 设计组件的时随时考虑高复用，高封装度（props简单，尽量把状态留在组件内部）
- Props类型中的各项目应该有详细的注解

```tsx
//// BAD 基于业务命名
type PayProps = {
  data: {
    title: string;
    value: string;
  };
};
const PayTitle: React.FC<PayProps> = ({ data }) => {
  return (
    <div>
      Title: <div>{data.title}</div>
      Value: <div>{data.value}</div>
    </div>
  );
};

const App = () => {
  const data = { title: "税金", value: "123" };
  return <PayTitle data={data} />;
};

//// Good 基于UI考虑，组件复用性极高，可读性也更好
type TitleProps = {
  title: string;
  subTitle: string;
};
const Title: React.FC<TitleProps> = ({ title, subTitle }) => {
  return (
    <div>
      <div>{title}</div>
      <div>{subTitle}</div>
    </div>
  );
};

const App = () => {
  const data = { title: "税金", value: "123" };
  return <Title title={`Title: ${data.title}`}  subTitle={`Value: ${data.value}`}/>;
};
```

### 5.5 关于constants文件夹

- 此文件夹中定义的都是常量或者配置
- 如果使用了react-router一般定义一个app-path.ts来存放路由配置
- 对象建议使用as const，可以防止被修改

```ts
const APP_PATH = {
  ROOT: "/",
  HOME: `/home`,
} as const;

export { APP_PATH };
```

### 5.6 关于features文件夹

- 此文件夹是存放各业务的顶级组件（页面级别/独立dialog级别等）
- 可以调用API
- 可以使用全局状态
- 如果一个组件中存在多个业务，则需要按照业务封装在hooks文件夹中
- 所用子组件都应该出现在components文件夹中，而不是二级子文件夹
- 处理各种业务行为

### 5.7 关于hooks文件夹

- 存放自定义hooks（业务/不通用的UI用hooks）

### 5.8 关于layout文件夹

- 存放页面（features级别）整体布局类组件
- 组件必须具有 children props

### 5.9 关于stores文件夹

- 存放页面（features级别）全局状态
- 各修改状态的方法需要是纯函数

### 5.10 关于themes文件夹

- 存放全局皮肤
- 对于Mui来说，需要优先使用皮肤定义标准设计

### 5.11 关于utils文件夹

- 存放各种工具函数
- 都是纯函数
- 避免使用全局状态（推荐以参数形式传入）

## 6. 注释规范

### 6.1 何时写注释

- 复杂业务逻辑(算法/特殊处理)
- 临时方案/技术债务(需标注TODO/FIXME)
- 公共API/组件(必须用JSDoc格式)

### 6.2 何时不写注释

- 代码本身已足够清晰(好的命名 > 注释)
- 无意义的重复(❌ Bad: `// 设置用户名 setUserName(xxx)`)

## 7. 安全规范

### 7.1 避免XSS攻击

- 用户输入必须转义(使用 `DOMPurify` 或React默认转义)
- 禁止使用 `dangerouslySetInnerHTML`(除非必要且已消毒)

### 7.2 敏感数据处理

- Token存储优先使用 `httpOnly Cookie`(而非localStorage)
- 前端禁止存储密码/密钥等敏感信息
