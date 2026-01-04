import { useQuery } from '@tanstack/react-query'

import { type GetCashFlowRequestQueryParams } from '@/models/api/internal/v1/request/cashFlow'
import { getCashFlows } from '@/services/internal/backend/v1/cashFlow'

/**
 * キャッシュフロー一覧を取得するためのカスタムフック
 */
export const useGetCashFlowsQuery = (params: GetCashFlowRequestQueryParams) => {
  return useQuery({
    /**
     * queryFn:
     * React Query がデータ取得のために呼び出す「取得処理の関数」を指定する。
     *
     *  ここには「実行結果」ではなく「関数そのもの」を渡す必要がある。
     *
     * - queryFn: getCashFlows(params) だと、useQuery が呼ばれた瞬間に実行されてしまう
     * - queryFn: () => getCashFlows(params) だと、「後で呼ばれる関数」を渡せる
     *
     * React Query は必要なタイミングで queryFn() を実行し、
     * その結果（Promise）をもとに data / isLoading / error などを管理する。
     */
    queryFn: () => getCashFlows(params),

    /**
     * queryKey:
     * React Query がデータをキャッシュするときの「識別名（キー）」。
     *
     * 同じ queryKey を持つクエリは「同じデータ」として扱われ、
     * キャッシュがあれば再利用される（= 何度も同じ通信をしなくて済む）。
     *
     * 例：
     * - queryKey が 'cashFlows' の場合、キャッシュも 'cashFlows' という名前で保存される
     */
    queryKey: ['cashFlows', params],
  })
}