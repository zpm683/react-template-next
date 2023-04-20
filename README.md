# react-template-next

## Quick to build a modern react app！

### Features ✨

- 🏗️ bootstrap by [vite](https://vitejs.dev/)
- 📸 ui-framework by [react](https://beta.reactjs.org/)
- 🔍 type-check by [typescript](https://www.typescriptlang.org/)
- 🏭 build by tsc & vite
- 🖼️ ui-component by [@mui/material](https://mui.com/)
- 🎛️ state-management by [zustand](https://zustand-demo.pmnd.rs/)
- ⚓ component-router by [react-router](https://reactrouter.com/)
- 🪝 react-hooks by [ahooks](https://ahooks.js.org/)
- 📡 http-client by [axios](https://axios-http.com/)
- 🎭 create immutable-state by [immer](https://immerjs.github.io/immer/)
- 📅 date-tools by [dayjs](https://day.js.org/)
- 🏘️ test-framework by [vitest](https://vitest.dev/)
- 🐙 test by [@testing-library](https://testing-library.com/)
- 👀 lint-code by [eslint](eslint.org) & [prettier](https://prettier.io/)
- 📊 test-coverage by [c8](https://github.com/bcoe/c8)
- 🕵️ commit-check by [husky](https://typicode.github.io/husky/#/) & [lint-staged](https://github.com/okonet/lint-staged)
- 🗃️ other tools: [lodash]() & [normalize.css](https://github.com/necolas/normalize.css/) & [promise-pool](https://www.npmjs.com/package/@supercharge/promise-pool)

### About Env 🌌
- Node version need >=16

### How to use? 🤨

  Step1：clone this project  
  Step2：npm i  
  Step3：make your components in src/\*\*  
  Step4: make your test code  in test/\*\*  
  Step5: run scripts (dev/build/preview/test/lint)  

  that's all, happy hacking!  

### How to build all in one HTML file? 📜

  just set this env in .env.production file!
  ```
  ENV_BUILD_IN_SINGLEFILE = true
  ```

### Script 🪃
- dev
- build
- preview
- test
- lint
- coverage
- remove-node_modules

### Catalog 📑

```txt
├─.vscode
├─dist
├─coverage
├─node_modules
├─public
├─.eslintrc
├─.eslintignore
├─.gitignore
├─.prettierrc
├─.prettierignore
├─index.html
├─package.json
├─pnpm-lock.yaml
├─README.md
├─tsconfig.json
├─vite.config.ts
└─src
    ├─app
    | ├─@types
    | ├─apis
    | ├─components
    | ├─constants
    | ├─hooks
    | ├─pages
    | ├─routers
    | ├─stores
    | ├─theme
    | ├─utils
    | ├─App.tsx
    | └─index.ts
    ├─shared
    | ├─components
    | ├─hooks
    | └─utils
    ├─test
    | └─setup.ts
    ├─index.css
    ├─index.tsx
    └─env.d.ts
```
