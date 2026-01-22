import { useDeleteCashFlowMutation } from '../mutations/useDeleteCashFlowMutation'
import { useState } from 'react'
import { toaster } from '@/components/ui/toaster'

export const useDeleteCashFlowHandler = () => {
  // mutate がピザのチラシ
  // isSuccess,isFetching,かける
  // ボタンが押された時にmutateを実行したい
  const { mutate } = useDeleteCashFlowMutation()

  const onSubmitDeleteCashFlow = (id: number | undefined) => {
    if (id == undefined) return
    try {
      mutate(id)
      toaster.success({ title: '削除に成功しました' })
    } catch (e) {
      toaster.error({
        title: '削除に失敗しました',
        description: '時間をあけてアクセスしてください',
      })
      console.log(e)
    }
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
