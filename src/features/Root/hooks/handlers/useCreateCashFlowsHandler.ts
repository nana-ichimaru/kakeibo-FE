import { useCreateCashFlowMutation } from '@/features/Root/hooks/mutations/useCreateCashFlowMutation'
import { type CreateCashFlowRequest } from '@/models/api/internal/v1/request/cashFlow'

// ダイアログで使えるようにしてみる　宿題
export const useCreateCashFlowHandler = () => {
  // mutate がピザのチラシ
  // isSuccess,isFetching,かける
  // ボタンが押された時にmutateを実行したい
  const { mutate } = useCreateCashFlowMutation()
  // こうやって連絡すればいいよを教えてくれる関数
  const onSubmitCreateCashFlow = () => {
    const body: CreateCashFlowRequest = {
      title: 'もも',
      type: 'income',
      recordedAt: new Date('2025-12-09'),
      amount: 200,
    }
    //　電話をここでかけている（bodyこれが注文）
    mutate(body)
  }
  return {
    onSubmitCreateCashFlow,
  }
}
