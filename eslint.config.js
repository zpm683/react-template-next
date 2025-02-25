import eslint from "@eslint/js";
import prettierConfig from "eslint-config-prettier";
import jsxA11y from "eslint-plugin-jsx-a11y";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import globals from "globals";
import tseslint from "typescript-eslint";

export default tseslint.config(
  {
    ignores: [
      "**/node_modules",
      "eslint.config.js",
      "dist",
      ".madgerc",
      "coverage",
      ".storybook",
    ],
  },
  {
    name: "common",
    extends: [eslint.configs.recommended, ...tseslint.configs.recommended],
    languageOptions: {
      ecmaVersion: "latest",
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
      globals: {
        ...globals.es2022,
        ...globals.browser,
        ...globals.node,
      },
    },

    // http://eslint.org/docs/rules/
    rules: {
      "array-callback-return": "warn",
      "default-case": ["warn", { commentPattern: "^no default$" }],
      "dot-location": ["warn", "property"],
      eqeqeq: ["warn", "smart"],
      "new-parens": "warn",
      "no-array-constructor": "warn",
      "no-caller": "warn",
      "no-cond-assign": ["warn", "except-parens"],
      "no-const-assign": "warn",
      "no-control-regex": "warn",
      "no-delete-var": "warn",
      "no-dupe-args": "warn",
      "no-dupe-class-members": "warn",
      "no-dupe-keys": "warn",
      "no-duplicate-case": "warn",
      "no-empty-character-class": "warn",
      "no-empty-pattern": "warn",
      "no-eval": "warn",
      "no-ex-assign": "warn",
      "no-extend-native": "warn",
      "no-extra-bind": "warn",
      "no-extra-label": "warn",
      "no-fallthrough": "warn",
      "no-func-assign": "warn",
      "no-implied-eval": "warn",
      "no-invalid-regexp": "warn",
      "no-iterator": "warn",
      "no-irregular-whitespace": "warn",
      "no-label-var": "warn",
      "no-labels": ["warn", { allowLoop: true, allowSwitch: false }],
      "no-lone-blocks": "warn",
      "no-loop-func": "warn",
      "no-mixed-operators": [
        "warn",
        {
          groups: [
            ["&", "|", "^", "~", "<<", ">>", ">>>"],
            ["==", "!=", "===", "!==", ">", ">=", "<", "<="],
            ["&&", "||"],
            ["in", "instanceof"],
          ],
          allowSamePrecedence: false,
        },
      ],
      "no-multi-str": "warn",
      "no-global-assign": "warn",
      "no-unsafe-negation": "warn",
      "no-new-func": "warn",
      "no-new-object": "warn",
      "no-new-symbol": "warn",
      "no-new-wrappers": "warn",
      "no-obj-calls": "warn",
      "no-octal": "warn",
      "no-octal-escape": "warn",
      "no-redeclare": "warn",
      "no-regex-spaces": "warn",
      "no-restricted-syntax": ["warn", "WithStatement"],
      "no-script-url": "warn",
      "no-self-assign": "warn",
      "no-self-compare": "warn",
      "no-sequences": "warn",
      "no-shadow-restricted-names": "warn",
      "no-sparse-arrays": "warn",
      "no-template-curly-in-string": "warn",
      "no-this-before-super": "warn",
      "no-throw-literal": "warn",
      "no-undef": "error",
      "no-unreachable": "warn",
      "no-unused-expressions": [
        "error",
        {
          allowShortCircuit: true,
          allowTernary: true,
          allowTaggedTemplates: true,
        },
      ],
      "no-unused-labels": "warn",
      "no-unused-vars": [
        "warn",
        {
          args: "none",
          ignoreRestSiblings: true,
        },
      ],
      "no-use-before-define": [
        "warn",
        {
          functions: false,
          classes: false,
          variables: false,
        },
      ],
      "no-useless-computed-key": "warn",
      "no-useless-concat": "warn",
      "no-useless-constructor": "warn",
      "no-useless-escape": "warn",
      "no-useless-rename": [
        "warn",
        {
          ignoreDestructuring: false,
          ignoreImport: false,
          ignoreExport: false,
        },
      ],
      "no-with": "warn",
      "no-whitespace-before-property": "warn",
      "require-yield": "warn",
      "rest-spread-spacing": ["warn", "never"],
      strict: ["warn", "never"],
      "unicode-bom": ["warn", "never"],
      "use-isnan": "warn",
      "valid-typeof": "warn",
      "no-restricted-properties": [
        "error",
        {
          object: "require",
          property: "ensure",
          message:
            "Please use import() instead. More info: https://facebook.github.io/create-react-app/docs/code-splitting",
        },
        {
          object: "System",
          property: "import",
          message:
            "Please use import() instead. More info: https://facebook.github.io/create-react-app/docs/code-splitting",
        },
      ],
      "getter-return": "warn",

      // Add TypeScript specific rules
      "@typescript-eslint/no-empty-object-type": "warn",
      "@typescript-eslint/consistent-type-assertions": "warn",
      "@typescript-eslint/no-array-constructor": "warn",
      "no-redeclare": "off",
      "@typescript-eslint/no-redeclare": "warn",
      "@typescript-eslint/no-use-before-define": [
        "warn",
        {
          functions: false,
          classes: false,
          variables: false,
          typedefs: false,
        },
      ],
      "@typescript-eslint/no-unused-expressions": [
        "error",
        {
          allowShortCircuit: true,
          allowTernary: true,
          allowTaggedTemplates: true,
        },
      ],
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          args: "none",
          ignoreRestSiblings: true,
        },
      ],
      "@typescript-eslint/no-useless-constructor": "warn",
    },
  },

  {
    name: "react-config",
    files: ["**/*.{js,jsx,ts,tsx}"],
    settings: {
      react: {
        version: "detect",
      },
    },
    plugins: {
      react: react,
      "jsx-a11y": jsxA11y,
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        jsxPragma: null, //jsx-runtime
      },
      globals: {
        React: true,
        ...globals.browser,
      },
    },
    rules: {
      // https://github.com/yannickcr/eslint-plugin-react/tree/master/docs/rules
      "react/react-in-jsx-scope": "off",
      "react/jsx-uses-react": "off",
      "react/forbid-foreign-prop-types": ["warn", { allowInPropTypes: true }],
      "react/jsx-no-comment-textnodes": "warn",
      "react/jsx-no-duplicate-props": "warn",
      "react/jsx-no-target-blank": "warn",
      "react/jsx-no-undef": "error",
      "react/jsx-pascal-case": [
        "warn",
        {
          allowAllCaps: true,
          ignore: [],
        },
      ],
      "react/no-danger-with-children": "warn",
      // Disabled because of undesirable warnings
      // See https://github.com/facebook/create-react-app/issues/5204 for
      // blockers until its re-enabled
      // 'react/no-deprecated': 'warn',
      "react/no-direct-mutation-state": "warn",
      "react/no-is-mounted": "warn",
      "react/no-typos": "error",
      "react/require-render-return": "error",
      "react/style-prop-object": "warn",

      // https://github.com/evcohen/eslint-plugin-jsx-a11y/tree/master/docs/rules
      "jsx-a11y/alt-text": "warn",
      "jsx-a11y/anchor-has-content": "warn",
      "jsx-a11y/anchor-is-valid": [
        "warn",
        {
          aspects: ["noHref", "invalidHref"],
        },
      ],
      "jsx-a11y/aria-activedescendant-has-tabindex": "warn",
      "jsx-a11y/aria-props": "warn",
      "jsx-a11y/aria-proptypes": "warn",
      "jsx-a11y/aria-role": ["warn", { ignoreNonDOM: true }],
      "jsx-a11y/aria-unsupported-elements": "warn",
      "jsx-a11y/heading-has-content": "warn",
      "jsx-a11y/iframe-has-title": "warn",
      "jsx-a11y/img-redundant-alt": "warn",
      "jsx-a11y/no-access-key": "warn",
      "jsx-a11y/no-distracting-elements": "warn",
      "jsx-a11y/no-redundant-roles": "warn",
      "jsx-a11y/role-has-required-aria-props": "warn",
      "jsx-a11y/role-supports-aria-props": "warn",
      "jsx-a11y/scope": "warn",

      // https://github.com/facebook/react/tree/main/packages/eslint-plugin-react-hooks
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",

      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
    },
  },

  prettierConfig,
);
