import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateCashFlow } from '@/services/internal/backend/v1/cashFlow'

import { type UpdateCashFlowRequest } from '@/models/api/internal/v1/request/cashFlow'

// キャッシュフローを更新するためのカスタムフック

export const useUpdateCashFlowMutation = () => {

  // React Queryのキャッシュ操作（再取得・更新など）をするためのクライアント
  const queryClient = useQueryClient()
   
  return useMutation({
    // 更新処理本体（ミューテーション）
    // mutate(body) が呼ばれたら、ここが実行される
    // 更新ボタンなどで mutate(body) が呼ばれたら、その body を受け取って、id と一緒に updateCashFlow に渡して更新APIを叩く
    mutationFn: ({ id, data }: { id: number; data: UpdateCashFlowRequest }) => updateCashFlow(id, data),
    // 名前を変えて取り出すこともできる
    // ({ id: cashFlowId, data }: { id: number; data: UpdateCashFlowRequest }) => updateCashFlow(cashFlowId, data)
    // 呼び出し側
    // mutate({ id: selectedId, data: form }) みたいな感じになる
    /**
     * onSuccess:
     * mutationFn（PUT）が成功したときに実行される処理
     */
    // 注文が成功したらここが呼ばれる
    onSuccess: async () => {
      /**
       * invalidateQueries:
       * 指定した queryKey のキャッシュを「古い」とマークする
       *
       * これにより、画面側で useGetCashFlowsQuery を使っている場合、
       * 次回の描画タイミングや必要なタイミングで自動的に再取得が行われる
       *
       * queryKey: ['cashFlows'] としている理由：
       * - useGetCashFlowsQuery の queryKey が ['cashFlows', params] なので
       * - 先頭が 'cashFlows' のものをまとめて無効化できる（prefix一致）
       */
      await queryClient.invalidateQueries({ queryKey: ['cashFlows'] })
    },
  })
}