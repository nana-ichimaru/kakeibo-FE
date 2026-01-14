import { useUpdateCashFlowMutation } from '../mutations/useUpdateCashFlowMutation'

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

  return {
    handlers: {
      onSubmitUpdateCashFlow,
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
