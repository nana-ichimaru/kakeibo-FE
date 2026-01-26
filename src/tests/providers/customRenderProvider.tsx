import { Provider as ChakraUiProvider } from '@/components/ui/provider'
import { QueryClientProvider } from '@tanstack/react-query'
import { createTestQueryClient } from '../config/testQueryClient'
import { MemoryRouter } from 'react-router-dom'
import { type ReactNode } from 'react'

interface CustomRenderProviderProps {
  // 親、子、孫
  // この Provider で包みたい対象（テストで render するコンポーネント）を受け取るため。
  // ReactNode なので JSX ならだいたい全部入る
  children: ReactNode
}

// main.tsxのミラーを作る
// テスト用に、アプリ本番で使ってる Provider 構成（main.tsx）を再現して、customRender からまとめて使えるようにする」ためのコンポーネント
export const CustomRenderProvider = ({ children }: CustomRenderProviderProps) => {
  return (
    <>
      <QueryClientProvider client={createTestQueryClient()}>
        <ChakraUiProvider>
          {/* BrowserRouterの代わりにMemoryRouterを使用 */}
          {/* MemoryRouter は メモリ上でルーティング状態を持つので、テストで安定して使える（URL をいじらずに画面遷移テストができる） */}
          <MemoryRouter>{children}</MemoryRouter>
        </ChakraUiProvider>
      </QueryClientProvider>
    </>
  )
}
