import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { Provider as ChakraUiProvider } from './components/ui/provider.tsx'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './core/queryClient.ts'

// ここは "root" 要素が必ず存在することを前提に `!`（non-null assertion）を使っているため、
// TypeScript の警告を抑制している。
// document.getElementById('root') は null になる可能性があるので通常は警告が出る。
// ただし index.html に <div id="root"></div> が必ずある前提なら問題ない。

// index.html にある <div id="root"></div> を探し、そこに React の画面を描画する（アプリ起動）
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
createRoot(document.getElementById('root')!).render(
  // StrictMode でアプリ全体を包む
  // 開発時のみ追加チェックが入る（本番ビルドには影響しない）
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      {/* Chakra UI の Provider でアプリを包むことで、UI設定やテーマが全体に適用される */}
      <ChakraUiProvider>
        {/* BrowserRouter でアプリを包むことで、URLに応じた画面遷移ができるようになる */}
        <BrowserRouter>
          {/* App がアプリ全体の入口（ここから各ページやコンポーネントへ分岐する） */}
          <App />
        </BrowserRouter>
      </ChakraUiProvider>
    </QueryClientProvider>
  </StrictMode>,
)
