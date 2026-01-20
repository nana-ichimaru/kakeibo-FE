import { useDeleteCashFlowMutation } from '../mutations/useDeleteCashFlowMutation'
import { useState } from 'react'

export const useDeleteCashFlowHandler = () => {
  // mutate がピザのチラシ
  // isSuccess,isFetching,かける
  // ボタンが押された時にmutateを実行したい
  const { mutate } = useDeleteCashFlowMutation()

  const onSubmitDeleteCashFlow = (id: number | undefined) => {
    if (id == undefined) return
    mutate(id)
  }

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false)
  // targetCashFlow は「編集対象を選んだ時だけ入る」ものなので、初期状態のまだ Edit を押してない場合はnull　どれか Edit 押した後にitem が入る
  const [targetDeleteCashFlowId, setTargetDeleteCashFlowId] = useState<number | null>(null)

  return {
    data: { isDeleteDialogOpen, targetDeleteCashFlowId },
    handlers: {
      onSubmitDeleteCashFlow,
      setIsDeleteDialogOpen,
      setTargetDeleteCashFlowId,
    },
  }
}
