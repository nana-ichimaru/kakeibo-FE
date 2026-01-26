import { QueryClient } from '@tanstack/react-query'

export const createTestQueryClient = () =>
  // retry: クエリが失敗したときの自動再試行回数（false = 再試行しない）
  // テストでは失敗を即確定させて、待ち時間や実行回数のブレをなくすため false にする
  new QueryClient({ defaultOptions: { queries: { retry: false } } })
