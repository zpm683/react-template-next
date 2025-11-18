# React開発者規約

> バージョン：V1.0 更新日：（2025/07/27）

## 1.プロジェクト規範

### 1.0 必要でない限り、eslintとprettierのデフォルトルールを変更しない

このテンプレートは、ベストプラクティスに基づいて最適なデフォルトルールを設定しています。  
開発中にエラーが発生した場合は、必ず修正してください。  
警告レベルも、リリース前にすべて解消する必要があります。（開発段階では存在しても構いません）

vscodeを使用して開発する場合は、推奨プラグインを必ずインストールしてください。

### 1.1 テンプレートコードの階層と設定をできるだけ維持する

（ほとんどのシーンでは、srcにコードを追加するだけで済みます。環境はベストプラクティスに基づいて設定されています）

```txt
├─.husky                  # Gitフック設定ディレクトリ、コードチェック、コミットなどの自動化に使用
├─.mock                   # ローカルモックデータと設定ディレクトリ
│   ├─config.json         # モックサービスの設定ファイル
│   └─data.json           # モックデータファイル
├─.storybook              # Storybook設定ディレクトリ、コンポーネント開発と文書化に使用
│   ├─main.ts             # Storybookメイン設定ファイル
│   └─preview.ts          # Storybookプレビュー設定ファイル
├─.vscode                 # VSCodeエディター関連設定
│   ├─extensions.json     # 推奨VSCodeプラグインリスト
│   ├─launch.json         # VSCodeデバッグ設定
│   └─settings.json       # VSCodeワークスペース設定
├─coverage                # テストカバレッジレポート出力ディレクトリ
├─cypress                 # Cypressエンドツーエンドテスト関連ディレクトリ
│   ├─fixtures            # テスト用のモックデータ
│   └─support             # Cypressサポートファイル（カスタムコマンドなど）
├─dist                    # プロジェクト構築出力ディレクトリ
├─node_modules            # プロジェクト依存パッケージディレクトリ
├─public                  # 公共静的資源ディレクトリ
├─storybook-static        # Storybook静的構築出力ディレクトリ
├─.env.development        # 開発環境変数設定
├─.env.production         # 本番環境変数設定
├─.gitignore              # Git無視ファイル設定
├─.madgerc                # Madge（依存可視化ツール）設定ファイル
├─.prettierignore         # Prettierフォーマット無視ファイル
├─.prettierrc             # Prettierフォーマット設定ファイル
├─architecture.png        # プロジェクトアーキテクチャ図
├─cypress.config.ts       # Cypressテスト設定ファイル
├─dependencies.svg        # 依存関係可視化図
├─eslint.config.js        # ESLintコード規範設定ファイル
├─index.html              # プロジェクト入口HTMLファイル
├─LICENSE                 # プロジェクトライセンス
├─package-lock.json       # npm依存ロックファイル
├─package.json            # プロジェクト依存およびスクリプト設定ファイル
├─README.md               # プロジェクト説明文書
├─SPECIFICATION.cn.md     # プロジェクト開発規範（中国語）
├─SPECIFICATION.en.md     # プロジェクト開発規範（英語）
├─SPECIFICATION.ja.md     # プロジェクト開発規範（日本語）
├─stats.html              # 構築統計分析ページ
├─tsconfig.json           # TypeScriptコンパイル設定ファイル
├─vite.config.ts          # Vite構築ツール設定ファイル
└─src                     # プロジェクトソースコードディレクトリ
    ├─app                 # 主なビジネスコードディレクトリ
    │   ├─@types          # 型定義ディレクトリ
    │   │   ├─models      # データモデル型定義
    │   │   └─views       # ビュー関連型定義
    │   ├─apis            # APIリクエスト関連コード
    │   ├─assets          # 静的資源（画像、フォントなど）
    │   ├─components      # コンポーネントディレクトリ
    │   │   ├─atoms       # 原子レベルの基礎コンポーネント
    │   │   ├─molecules   # 分子レベルの組み合わせコンポーネント
    │   │   ├─organisms   # 組織レベルの複雑なコンポーネント
    │   │   └─index.ts    # コンポーネントエクスポート入口
    │   ├─constants       # 定数定義ディレクトリ
    │   ├─features        # ビジネス機能モジュールディレクトリ
    │   ├─hooks           # カスタムReact Hooksディレクトリ
    │   ├─layouts         # ページレイアウトコンポーネントディレクトリ
    │   ├─stores          # 状態管理関連ディレクトリ
    │   ├─themes          # テーマとスタイル関連ディレクトリ
    │   ├─utils           # ツール関数ディレクトリ
    │   ├─app.tsx         # アプリケーション主入口コンポーネント
    │   └─index.ts        # アプリケーション主入口ファイル
    ├─e2e                 # エンドツーエンド（E2E）テストディレクトリ
    ├─shared              # ビジネス間/グローバル共有コードディレクトリ
    │   ├─components      # 再利用可能な共有コンポーネント
    │   ├─hooks           # 再利用可能な共有Hooks
    │   └─utils           # 再利用可能な共有ツール関数
    ├─test                # 単体テスト関連ディレクトリ
    │   └─setup.ts        # テスト環境初期化ファイル
    ├─env.d.ts            # 環境変数型宣言
    ├─index.css           # グローバルスタイルファイル
    ├─index.tsx           # Reactアプリケーション入口ファイル
    └─reset.d.ts          # 型リセットまたは補充宣言ファイル
```

### 1.2 以下はテンプレートに追加されている一般的なライブラリです。要件を満たさない場合は、他のサードパーティライブラリを追加するか、既存のライブラリを調整してください。

- 🏗️ bootstrap by [vite](https://vitejs.dev/)  
  【Vite起動プロジェクト】—— モダンなフロントエンドプロジェクトの構築ツール、起動速度が非常に速い。

- ⚛️ framework by [react](https://beta.reactjs.org/)  
  【Reactフレームワーク】—— 主流のフロントエンドUIフレームワーク、ユーザーインターフェースとコンポーネントロジックを構築。

- 🧬 language by [typescript](https://www.typescriptlang.org/)  
  【TypeScript言語】—— JavaScriptのスーパーセット、型システムを提供し、コードのメンテナンス性と開発体験を向上。

- 🏭 build by tsc & [vite](https://github.com/vitejs/vite)  
  【tsc & Vite構築】—— tscはTypeScriptコンパイルに使用され、Viteは開発と本番環境の効率的な構築に使用。

- 🖼️ component by [mui](https://mui.com/)  
  【MUIコンポーネントライブラリ】—— Material Designに基づくReactコンポーネントライブラリ、美しいUIを迅速に構築。

- ⚛️ design-pattern by [atomic design](https://atomicdesign.bradfrost.com/)  
  【原子化デザインパターン】—— コンポーネントの階層化思想、UIを原子、分子、有機体などのレベルに分割し、再利用性とメンテナンス性を向上。

- 📔 ui component explorer by [storybook](https://storybook.js.org/)  
  【Storybookコンポーネント開発と文書化】—— 独立したUIコンポーネントの開発、テスト、展示に使用されるツール、コンポーネントの文書化とインタラクションデモをサポート。

- 🎛️ state-management by [zustand](https://zustand-demo.pmnd.rs/)  
  【Zustand状態管理】—— 軽量でテンプレート制限のないReact状態管理ライブラリ、簡単に使用可能。

- 📝 form by [react-hook-form](https://react-hook-form.com/) & form-validation by [zod](https://zod.dev/)  
  【フォーム管理と検証】—— react-hook-formは高性能なフォーム状態管理を提供し、zodは型安全なフォーム検証を提供。

- ⚓ page-router by [react-router](https://reactrouter.com/)  
  【ページルーター】—— Reactアプリケーションのルーティングソリューション、ページナビゲーションとルートガードなどの機能を実現。

- 💥 error-boundary by [react-error-boundary](https://github.com/bvaughn/react-error-boundary)  
  【エラー境界】—— Reactコンポーネントツリーのレンダリングエラーをキャッチし、エラー情報を優雅に表示し、ページのクラッシュを防ぐ。

- 🪝 react-hooks by [ahooks](https://ahooks.js.org/)  
  【ahooks React Hooksライブラリ】—— 高品質なReact Hooksを豊富に提供し、開発効率を向上。

- 📡 http-client by [use-request](https://ahooks.js.org/hooks/use-request/index) & [axios](https://axios-http.com/)  
  【HTTPリクエストツール】—— use-requestはahooksに基づくリクエスト管理Hookで、axiosは人気のHTTPクライアントライブラリ。

- 🪄 makes typescript's built-in typings be better by [ts-reset](https://github.com/total-typescript/ts-reset)  
  【TypeScript型の強化】—— ts-resetはTypeScriptの内蔵型定義を最適化し、型推論を正確にする。

- 🎏 create immutable-state by [immer](https://immerjs.github.io/immer/)  
  【不変データ管理】—— immerを使用して、可変の方法で不変データロジックを記述し、状態更新を簡素化。

- 📅 date-tools by [dayjs](https://day.js.org/)  
  【日付処理ツール】—— dayjsは軽量の日時処理ライブラリで、APIが簡潔で、moment.jsと互換性あり。

- 🏘️ test-framework by [vitest](https://vitest.dev/)  
  【単体テストフレームワーク】—— vitestはViteエコシステムの高速単体テストフレームワークで、Jestの構文と互換性あり。

- 🐙 unit-test by [@testing-library](https://testing-library.com/)  
  【コンポーネントテストツール】—— ユーザー中心のテスト方法を提供し、コンポーネントの動作に焦点を当て、実装の詳細に依存しない。

- 🎭 e2e-test by [cypress](https://www.cypress.io/)  
  【エンドツーエンドテスト】—— cypressはブラウザの自動化テストに使用され、実際のユーザー操作をシミュレートし、アプリケーションの全体的な機能を保証。

- 👀 lint-code by [eslint](https://eslint.org) & [prettier](https://prettier.io/)  
  【コード規範とフォーマット】—— eslintはコード品質チェックに使用され、prettierはコードスタイルの統一に使用。

- 🔍 dependencies checker by [madge](https://github.com/pahen/madge)  
  【依存関係分析】—— madgeはプロジェクトの依存関係を可視化し、循環依存などの問題を発見。

- 📊 test-coverage by [c8](https://github.com/bcoe/c8)  
  【テストカバレッジ統計】—— c8はテストカバレッジを統計し、テストの完全性を向上。

- 🚀 performance monitoring by [react-scan](https://react-scan.com/)  
  【性能監視】—— react-scanはReactアプリケーションの性能ボトルネックを分析し、監視。

- 🕵️ commit-check by [husky](https://typicode.github.io/husky/#/) & [lint-staged](https://github.com/okonet/lint-staged)  
  【コミットチェック】—— huskyはGitフックの自動化に使用され、lint-stagedはコミット前のコードチェックと修正に使用。

- 🧩 other tools:[json-server](https://github.com/typicode/json-server) [radash](https://github.com/toss/radash/tree/main)
  【その他のツール】—— json-serverはモックAPIの迅速な構築に使用され、radashは実用関数の集合を提供

### 1.3 src/appフォルダの構造

appフォルダ内の構造は比較的自由ですが、一般的に2つの推奨構造があります。

#### 縦型（一般的には小規模プロジェクト向け）（テンプレートデフォルト）

特徴はフロントエンドの技術領域に基づいてフォルダを計画

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

#### 横型（一般的には大規模プロジェクト、2つ以上の異なるビジネスがある場合に推奨）

特徴はビジネスに基づいてフォルダを計画。  
通常、共通フォルダ（@common）があり、ビジネス間で再利用可能なコンポーネントやメソッド、またはグローバル設定を格納します。  
各ビジネスフォルダ内で縦型に分層（実際の状況に応じて一部のフォルダが欠ける場合があります）。

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

> 横型構造時の注意事項
>
> - @commonフォルダには全体的に共通または公共ビジネス関連の内容のみを格納する
>   あるビジネスで他のビジネスで使用する必要があるメソッドがある場合は、そのビジネスのフォルダからエクスポートし、@commonで実装しない。
> - 各ビジネスフォルダもindex.tsを持ち、インポートとエクスポートを管理する

### 1.4 各フォルダには、インポート・エクスポート管理用のindex.tsが必要

JS/TSでは、変数をexportするだけで任意の場所でimportできます。
インポート・エクスポート管理を行わないと、この「自由さ」がプロジェクトの維持を困難にします。
そのため、以下の規約があります：

- index.tsには、他のフォルダ（外部）に公開する必要がある変数のみをエクスポートします。
- index.tsでエクスポートされていない変数は、現在のフォルダ内の内部変数とみなされます。
- index.tsでエクスポートされた変数が他の人に使用されてバグが発生した場合、その変数の作成者が責任を負います。（外部に公開が許可されている変数なので、原則として再利用可能）
- index.tsでエクスポートされていない変数を、他の人がindex.tsを迂回してソースファイルからインポートしてバグを発生させた場合、その変数の作成者は責任を負いません。（内部変数なので、原則として再利用不可）

### 1.5 深い階層から変数をインポートせず、必ずindex.tsを経由してインポートする

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

### 1.6 同じ階層から変数をインポートする場合は相対パスを使用し、異なる階層の場合は絶対パスを使用する

このルールは、外部変数と内部変数を区別し、レビューとメンテナンスを容易にするためです。

例: components内のコンポーネントAがcomponents内のコンポーネントBを使用する場合（同じ階層）

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

例: components内のコンポーネントAがconstants内の定数Bを使用する場合（異なる階層）

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

### 1.7 共通CSSがある場合を除き、非モジュール化CSS定義ファイルを使用しない

モジュール化：xxxx.module.css/useStyle/sx  
非モジュール：xxx.css

### 1.8 console.logを直接使用せず、プロジェクト専用のLoggerを使用する

## 2.命名規則

### 2.1 フォルダ/ファイルは一般的に xxx-yyy-zzz の形式で命名

### 2.2 上位に置く必要があるフォルダは@で始める（例：@types/@commonなど）

### 2.3 一時的なフォルダまたはファイルは\_で始める

### 2.4 クラスとReactコンポーネントはパスカルケース命名 (XxxxYyyyZzzz)

### 2.5 定数は XXX_YYY_ZZZ の形式で命名（大文字に注意）

### 2.6 一般的な変数はキャメルケース命名 (xxxxYyyyZzzz)

### 2.7 ルートコンポーネントがあるファイル名は通常フォルダ名と一致

    例：app/features/loginフォルダ内のルートコンポーネントファイルはlogin.tsxであるべき

### 2.8 型はパスカルケース命名（XxxxYyyyZzzz）

## 3.コンポーネント規則

### 3.1 関数型コンポーネントを使用し、クラス型コンポーネントは避ける

### 3.2 コンポーネントの性能最適化を早期に考慮しない

早期の性能最適化は逆効果になる可能性があり、性能改善が不明瞭で、メモリ使用量が増えることがあります。  
このテンプレートには性能チェックツールが設定されており、性能が明らかに低下した場合（例：FPSの変動、インタラクションの明らかな遅延）に最適化を行います。

### 3.3 公共コンポーネントは対応するstorybookを開発し、例を示すべき

### 3.4 コンポーネント開発時には、hooks-handler-effect-renderの順序に従う

```tsx
// 標準デモ改
import { FC, useState } from "react";

// コンポーネントのpropsインターフェース
type XxxxProps = {
  props1: string;
  props2?: number; // オプション項目
  props3: () => void;
};

/**
 * Xxxxコンポーネント
 */
export const Xxxx: FC<XxxxProps> = ({
  props1,
  props2 = 0, // 初期値を設定可能
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

### 3.5 コンポーネントのkeyはMath.random()やUUIDなど動的に生成されるものを使用してはいけない

さらに、keyの局所的な一意性を保証する必要があります。保証できない場合はmapメソッドのindexを使用できますが、
UIに並べ替えやドラッグ操作がある場合はmapメソッドのindexをkeyとして使用しないようにしてください。

## 4.タイプ定義規則

### 4.1 タイプ内の注釈は複数行形式を使用する（より良いヒント効果のため）

```ts
//bad
// userインターフェースのレスポンス
type UserRes = {
  // 名前
  name: string;
  // 年齢
  age: number;
};

// good
/** userインターフェースのレスポンス */
type UserRes = {
  /**名前 */
  name: string;
  /**年齢 */
  age: number;
};
```

### 4.2 タイプ定義には優先的にtypeキーワードを使用し、必要でない限りinterfaceキーワードを使用しない

> いつ必要か？
> 他人が拡張できるタイプを定義する必要がある場合、または既存のinterfaceタイプを拡張する場合にinterfaceを使用します。

## 5.各フォルダ内の規則

### 5.1 @typesフォルダについて

- 共通タイプまたはAPIインターフェースは@typesフォルダ内で定義する (xxx.d.ts)
- xxx.d.ts内ではモジュールとして定義する必要があります。規則: declare module "フォルダ名.ファイル名"

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

- @type/modelsフォルダ内にAPIインターフェースの定義ファイルを配置し、リクエストとレスポンスのタイプを指定する

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

- @type/viewsファイル内にUIで必要な共有タイプを定義できます

```ts
// app/@types/views/login.d.ts
declare module "views.login" {
  form: {
    xxx: string;
  }
}
```

- modelsとviewsフォルダで共有できるタイプがある場合、@type下にcommon.d.tsを定義します
- 共通性のないタイプは対応する.tsまたは.tsxファイル内に直接定義します。

### 5.2 apisフォルダについて

- 単一責任原則に従い、APIの封装以外のことを行ってはいけません（例：データのソート、統合など）
- 変数は通常、リクエストタイプで始まり、APIで終わります。
- ファイル名は通常APIリソース名と一致します
- 封装済みのaxiosInstanceを使用してAPIを呼び出します
- 通常、modelsフォルダで定義されたresとreqタイプを導入します

```ts
// user.ts
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

### 5.3 assetsフォルダについて

- 静的リソース（画像、SVGコンポーネント、音声、動画、フォントファイルなど）を配置するために使用します
- index.tsでリソースのインポートとエクスポートを統一して行う必要があります
- エクスポート時には具名化する必要があります

```ts
import LOGO_PNG from "./img/logo.png";

export { LOGO_PNG };
```

### 5.4 componentsフォルダについて

- 原子設計モデルを採用（atoms/molecules/organismsフォルダがあります）
- 原子は最小のコンポーネントで、分子は原子で構成され、組織は分子と原子で構成されます
- コンポーネントはできるだけ抽象化し、意味を持たせるべきで、コンポーネントとそのPropsを定義する際にはビジネスから離れ、UIの観点から考慮します（organisms層を除く）
- コンポーネントの命名時、末尾は通常UI上の概念（dialog, panel, card ....）になります
- componentsフォルダ内のコンポーネントは純粋なコンポーネントであるべきです
- componentsフォルダ内のコンポーネントはAPIを呼び出してはいけません
- componentsフォルダ内のコンポーネントはグローバル状態を呼び出してはいけません（propsを通じて渡す必要があります）
- componentsフォルダ内のコンポーネントはビジネスロジックを処理してはいけません（外部にパラメータを公開するためにコールバック（イベント）の形式で行います）
- コンポーネントを設計する際には、高い再利用性と高い封装度を常に考慮します（propsは簡単で、できるだけ状態をコンポーネント内に留めます）
- Propsタイプ内の各項目には詳細な注釈が必要です

```tsx
//// BAD ビジネスに基づいた命名
type PayProps = {
  data: {
    title: string;
    value: string;
  };
};
const PayTitle = ({ data }:PayProps) => {
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

//// Good UIに基づいた考慮、コンポーネントの再利用性が非常に高く、可読性も向上
type TitleProps = {
  title: string;
  subTitle: string;
};
const Title = ({ title, subTitle }:TitleProps) => {
  return (
    <div>
      <div>{title}</div>
      <div>{subTitle}</div>
    </div>
  );
};

const App = () => {
  const data = { title: "税金", value: "123" };
  return <Title title={`Title: ${data.title}`} subTitle={`Value: ${data.value}`}/>;
};
```

### 5.5 constantsフォルダについて

- このフォルダ内で定義されるのはすべて定数または設定です
- react-routerを使用している場合、app-path.tsを定義してルート設定を保存します
- オブジェクトはas constを使用することをお勧めします。これにより変更されることを防げます

```ts
const APP_PATH = {
  ROOT: "/",
  HOME: `/home`,
} as const;

export { APP_PATH };
```

### 5.6 featuresフォルダについて

- このフォルダは各ビジネスのトップレベルコンポーネント（ページレベル/独立したダイアログレベルなど）を保存します
- APIを呼び出すことができます
- グローバル状態を使用できます
- 1つのコンポーネントに複数のビジネスが存在する場合、hooksフォルダにビジネスごとに封装します
- 使用する子コンポーネントはすべてcomponentsフォルダに存在し、二次子フォルダには存在しません
- 各種ビジネス動作を処理します

### 5.7 hooksフォルダについて

- カスタムhooks（ビジネス/一般的でないUI用hooks）を保存します

### 5.8 layoutフォルダについて

- ページ（featuresレベル）の全体レイアウトコンポーネントを保存します
- コンポーネントはchildren propsを持つ必要があります

### 5.9 layoutフォルダについて

- ページ（featuresレベル）のグローバル状態を保存します
- 状態を変更する各メソッドは純粋関数である必要があります

### 5.10 themesフォルダについて

- グローバルスキンを保存します
- Muiの場合、スキン定義標準設計を優先して使用する必要があります

### 5.10 utilsフォルダについて

- 各種ツール関数を保存します
- すべて純粋関数です
- グローバル状態を使用しないようにします（パラメータ形式で渡すことを推奨）

### 5.11 app.tsxについて

- AppBuilderを使用して作成します
