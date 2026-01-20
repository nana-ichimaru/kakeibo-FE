import { useUpdateCashFlowMutation } from '../mutations/useUpdateCashFlowMutation'
import { useState } from 'react'
import { type CashFlowItemView } from '../../types/CashFlowItemView'
import { type UpdateCashFlowRequest } from '@/models/api/internal/v1/request/cashFlow'

// バックエンドから取得したデータを、そのままUIに渡すのではなく、画面で使いやすい形に整えてからコンテナに渡す場所
export const useUpdateCashFlowHandler = () => {
  // mutate がピザのチラシ
  // isSuccess,isFetching,かける
  // ボタンが押された時にmutateを実行したい
  const { mutate } = useUpdateCashFlowMutation()

  // こうやって連絡すればいいよを教えてくれる関数
  const onSubmitUpdateCashFlow = (data: CashFlowItemView) => {
    // data.id の型が number | undefined（場合によっては null も）になっている
    //　でも mutate は id: number が必須（undefined は許されない）
    if (data.id == undefined) return
    // ここ以降は「data.id は null/undefined ではない」と分かる
    // => data.id は number として扱える
    const body: UpdateCashFlowRequest = {
      title: data.title,
      type: data.type,
      recordedAt: data.recordedAt,
      amount: data.amount,
    }
    mutate({ id: data.id, data: body })
  }

  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState<boolean>(false)
  // targetCashFlow は「編集対象を選んだ時だけ入る」ものなので、初期状態のまだ Edit を押してない場合はnull　どれか Edit 押した後にitem が入る
  const [targetUpdateCashFlowId, setTargetUpdateCashFlowId] = useState<number | null>(null)

  // onClick={() => {handlers.setTargetCashFlow(item)}}

  return {
    data: {
      isUpdateDialogOpen,
      targetUpdateCashFlowId,
    },
    handlers: {
      onSubmitUpdateCashFlow,
      setIsUpdateDialogOpen,
      setTargetUpdateCashFlowId,
    },
  }
}
// Handlerに記述したい実装内容
// ダイアログに表示するidが何かという状態管理
// ダイアログ開閉の状態管理
// CashFlowItemView で受け取ったフォーム値を UpdateCashFlowRequest に変換してバックエンドへ送る。
// 保存ボタンでmutateを実行する処理

// UIに記述したい実装内容
// useGetCashFlowsQueryのdataを使用して、編集時には入力欄に初期値が入った状態で開く
