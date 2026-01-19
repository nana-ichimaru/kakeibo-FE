import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteCashFlow } from '@/services/internal/backend/v1/cashFlow'

export const useDeleteCashFlowMutation = () => {
  // React Queryのキャッシュ操作（再取得・更新など）をするためのクライアント
  const queryClient = useQueryClient()

  return useMutation({
    // 更新処理本体（ミューテーション）
    // mutate(id) が呼ばれたら、ここが実行される
    // 削除ボタンなどで mutate(id) が呼ばれたら、その id を受け取って、削除APIを叩く
    mutationFn: (id: number) => deleteCashFlow(id),

    /**
     * onSuccess:
     * mutationFn（DELETE）が成功したときに実行される処理
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
