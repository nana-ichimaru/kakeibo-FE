import { useUpdateCashFlowMutation } from '../mutations/useUpdateCashFlowMutation'
import { useState } from 'react'
import { CashFlowItemView } from '../../types/CashFlowItemView'

// バックエンドから取得したデータを、そのままUIに渡すのではなく、画面で使いやすい形に整えてからコンテナに渡す場所
export const useUpdateCashFlowHandler = () => {
  // mutate がピザのチラシ
  // isSuccess,isFetching,かける
  // ボタンが押された時にmutateを実行したい
  const { mutate } = useUpdateCashFlowMutation()

  
  // こうやって連絡すればいいよを教えてくれる関数
  const onSubmitUpdateCashFlow = () => {
    console.log('onSubmitUpdateCashFlow')
  }

  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState<boolean>(false)
  // targetCashFlow は「編集対象を選んだ時だけ入る」ものなので、初期状態のまだ Edit を押してない場合はnull　どれか Edit 押した後にitem が入る
  const [targetCashFlow, setTargetCashFlow] = useState<CashFlowItemView | null>(null)

  // onClick={() => {handlers.setTargetCashFlow(item)}}

  return {
    data: {
      isUpdateDialogOpen,
    },
    handlers: {
      onSubmitUpdateCashFlow,
      setIsUpdateDialogOpen,
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
