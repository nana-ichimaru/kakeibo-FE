import { useMutation, useQueryClient } from '@tanstack/react-query'

import { createCashFlow } from '@/services/internal/backend/v1/cashFlow'
import { type CreateCashFlowRequest } from '@/models/api/internal/v1/request/cashFlow'

/**
 * キャッシュフローを新規作成するためのカスタムフック
 *
 * 役割：
 * - createCashFlow（POST）を実行するための「Mutation」を提供する
 * - 作成に成功したら、一覧取得（useGetCashFlowsQuery）のキャッシュを無効化して
 *   自動で再取得させ、画面の一覧を最新状態にする
 *
 */
export const useCreateCashFlowMutation = () => {
  /**
   * queryClient は React Query が持っている「キャッシュ管理の司令塔」
   *
   * - invalidateQueries でキャッシュを無効化したり
   * - refetch（再取得）を促したりできる
   */
  const queryClient = useQueryClient()

  /**
   * useMutation は「更新系の非同期処理（POST/PUT/DELETEなど）」を扱うフック
   *
   * - mutate / mutateAsync で mutationFn を実行できる
   * - onSuccess などで成功/失敗時の処理をまとめられる
   *
   * useMutationは、こういう条件で物を作ってと電話をしてくれたら　方法を提供する
   * ピザのチラシのようなもの　関数
   */
  return useMutation({
    /**
     * mutationFn:
     * 実際に POST を行う関数を指定する
     *
     * createCashFlow は (body) => Promise<response> の形なので
     * mutationFn にそのまま渡せる（アロー関数で包む必要なし）
     */
    // ここで電話を受け取っている。定員さんが注文の詳細を受け取る（bodyこれが注文）
    // createCashFlow(body)バックエンドの裏方の人に作ってとお願いする。
    mutationFn: (body: CreateCashFlowRequest) => createCashFlow(body),

    /**
     * onSuccess:
     * mutationFn（POST）が成功したときに実行される処理
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
