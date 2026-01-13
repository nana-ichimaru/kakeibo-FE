import { useCreateCashFlowMutation } from '@/features/Root/hooks/mutations/useCreateCashFlowMutation'
import { type CashFlowItemView } from '../../types/CashFlowItemView'
import { type CreateCashFlowRequest } from '@/models/api/internal/v1/request/cashFlow'
import { useState } from 'react'

// ダイアログで使えるようにしてみる
export const useCreateCashFlowHandler = () => {
  // mutate がピザのチラシ
  // isSuccess,isFetching,かける
  // ボタンが押された時にmutateを実行したい
  const { mutate } = useCreateCashFlowMutation()
  // CashFlowItemView はUIの責務
  // CreateCashFlowRequest はAPIの責務
  // それを useCreateCashFlowHandler が橋渡しする責務
  // こうやって連絡すればいいよを教えてくれる関数
  const onSubmitCreateCashFlow = (data: CashFlowItemView) => {
    const body: CreateCashFlowRequest = {
      title: data.title,
      type: data.type,
      recordedAt: data.recordedAt,
      amount: data.amount,
    }
    //　電話をここでかけている（bodyこれが注文）
    mutate(body)
  }

  //booleanは変数名にisをつける慣習
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState<boolean>(false)

  //countが変数名で<>はcountの型、()は初期値
  //setCountがcountを更新するための関数
  //ボタンがクリックされたときにsetCountを使ってcountの値を更新する
  //setCount(count + 1)かっこの中に更新したい値をおく
  //const [count, setCount] = useState<number | string>(100)

  return {
    data: {
      isCreateDialogOpen,
    },
    handlers: {
      onSubmitCreateCashFlow,
      setIsCreateDialogOpen,
    },
  }
}
