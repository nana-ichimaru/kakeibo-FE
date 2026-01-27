import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'
import react from 'eslint-plugin-react'

export default defineConfig([
  // dist: build成果物なのでlint不要
  // src/components/ui: 生成コード（shadcn/ui等）をlint対象外にする
  globalIgnores(['dist', 'src/components/ui']),
  {
    // この設定が適用されるファイルを TS/TSX のみに限定
    files: ['**/*.{ts,tsx}'],
    // ここは主に「各プラグインのおすすめ設定」をまとめて読み込んでいる
    extends: [
      ...tseslint.configs.strictTypeChecked, // 型情報を使った厳しめルール
      ...tseslint.configs.stylisticTypeChecked, // style系 + 型情報を使うルール
      tseslint.configs.recommended, // TypeScript ESLint 推奨セット
      reactHooks.configs.flat.recommended, // React Hooks 推奨
      reactRefresh.configs.vite, // Vite + React Refresh 用
    ],
    languageOptions: {
      parserOptions: {
        // 型情報を使うために参照する tsconfig を指定
        // strictTypeChecked / stylisticTypeChecked を使う場合は必須になる
        project: ['./tsconfig.node.json', './tsconfig.app.json', './tsconfig.test.json'],
        // tsconfig の探索起点（このeslint.config.jsの場所）
        tsconfigRootDir: import.meta.dirname,
      },
      // ECMAScriptのバージョン指定
      ecmaVersion: 2020,

      // ブラウザ環境のグローバル変数を許可
      globals: globals.browser,
    },
    settings: {
      react: {
        // Reactのバージョンを自動判定
        version: 'detect',
      },
    },
    plugins: {
      react,
    },
    rules: {
      // React推奨ルールを rules として展開（flat configの書き方）
      ...react.configs.recommended.rules,

      // jsx-runtime（React17+）向けのルールを展開
      ...react.configs['jsx-runtime'].rules,

      ...reactHooks.configs.recommended.rules,

      // type/interface 強制ルールを無効化（どちらでもOKにする）
      '@typescript-eslint/consistent-type-definitions': 'off',
    },
  },
  {
    files: ['**/*.test.ts', '**/*.test.tsx'],
    rules: {
      '@typescript-eslint/unbound-method': 'off',
      '@typescript-eslint/no-empty-function': 'off',
    },
  },
])
