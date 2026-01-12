import { useQuery } from '@tanstack/react-query'

import { type GetCashFlowRequestQueryParams } from '@/models/api/internal/v1/request/cashFlow'
import { getCashFlows } from '@/services/internal/backend/v1/cashFlow'
import { type CashFlowItemView } from '@/features/Root/types/CashFlowItemView'
import type { GetCashFlowResponseItem } from '@/models/api/internal/v1/response/cashFlow'

/**
 * キャッシュフロー一覧を取得するためのカスタムフック
 */

// API から取得した生データ（GetCashFlowResponseItem）を
// UI 表示用のデータ（CashFlowItemView）に変換する関数
const mapToCashFlowItemView = (item: GetCashFlowResponseItem): CashFlowItemView => {
  return {
    id: item.id,
    type: item.type,
    amount: item.amount,
    title: item.title,
    // 文字列を Date オブジェクトに変換
    // JSONでは文字列と数字しか扱えないためDate型は文字列で送られてくる
    recordedAt: new Date(item.recordedAt),
  }
}
// 材料を取ってきて調理場に渡す過程
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

    //実際に材料の取ってき方が書いてあるところ
    queryFn: () => getCashFlows(params),
    // 調理場に渡すために水洗いした材料を箱詰めして渡したい
    // 箱をまず準備したい
    select: (data) => data.map((item) => mapToCashFlowItemView(item)),
    // data は配列（GetCashFlowResponseItem[]）
    // map で1つずつ item を取り出して
    // mapToCashFlowItemView(item) に通して
    // CashFlowItemView[] に変換して返す

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
