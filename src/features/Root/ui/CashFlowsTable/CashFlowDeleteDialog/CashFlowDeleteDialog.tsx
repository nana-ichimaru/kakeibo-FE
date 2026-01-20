import { Button, Dialog, Portal, Field, Fieldset, Input, NativeSelect } from '@chakra-ui/react'
import { CashFlowTypeList } from '@/share/constants/business/cashFlowType'
import { transformCashFlowTypeJa } from '@/share/logic/transform/transformCashFlowType'
import { type CashFlowItemView } from '@/features/Root/types/CashFlowItemView'

interface CashFlowDeleteDialogProps {
  data: {
    isDeleteDialogOpen: boolean
    cashFlow: CashFlowItemView | undefined
    targetDeleteCashFlowId: number | null
  }
  handlers: {
    onSubmitDeleteCashFlow: (id: number | undefined) => void
    setIsDeleteDialogOpen: (isOpen: boolean) => void
    setTargetDeleteCashFlowId: (data: number | null) => void
  }
}

export const CashFlowDeleteDialog = ({ data, handlers }: CashFlowDeleteDialogProps) => {
  return (
    <>
      <Dialog.Root
        open={data.isDeleteDialogOpen && data.cashFlow?.id == data.targetDeleteCashFlowId}
      >
        <Dialog.Trigger asChild>
          <Button
            onClick={() => {
              handlers.setTargetDeleteCashFlowId(data.cashFlow?.id ?? null)
              handlers.setIsDeleteDialogOpen(true)
            }}
            bg={'red.500'}
          >
            Delete
          </Button>
        </Dialog.Trigger>
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content>
              <Dialog.Header>
                <Dialog.Title>Delete Cash Flow</Dialog.Title>
              </Dialog.Header>
              <form
                action={() => {
                  // data.cashFlow?.idの箇所で出ていたエラーは、useDeleteCashFlowHandlerで、
                  // 引数の型指定をid: numberだけにしており、
                  // id: number | undefinedのように| undefinedを入れていなかったため
                  handlers.onSubmitDeleteCashFlow(data.cashFlow?.id)
                  handlers.setIsDeleteDialogOpen(false)
                }}
              >
                <Dialog.Body>
                  <Fieldset.Root>
                    <Field.Root disabled>
                      <Field.Label>Amount</Field.Label>
                      <Input
                        name='amount'
                        placeholder='Enter amount'
                        type='number'
                        min={1}
                        defaultValue={data.cashFlow?.amount}
                      />
                    </Field.Root>
                    <Field.Root disabled>
                      <Field.Label>Title</Field.Label>
                      <Input
                        name='title'
                        placeholder='Enter title'
                        defaultValue={data.cashFlow?.title}
                      />
                    </Field.Root>
                    <Field.Root disabled>
                      <Field.Label>Type</Field.Label>
                      <NativeSelect.Root>
                        <NativeSelect.Field name='type' defaultValue={data.cashFlow?.type}>
                          {CashFlowTypeList.map((type) => (
                            <option key={type} value={type}>
                              {transformCashFlowTypeJa(type)}
                            </option>
                          ))}
                        </NativeSelect.Field>
                        <NativeSelect.Indicator />
                      </NativeSelect.Root>
                    </Field.Root>
                    <Field.Root disabled>
                      <Field.Label>Recorded At</Field.Label>
                      <Input
                        name='recordedAt'
                        type='date'
                        defaultValue={data.cashFlow?.recordedAt.toLocaleDateString('sv-SE')}
                      />
                    </Field.Root>
                  </Fieldset.Root>
                </Dialog.Body>
                <Dialog.Footer>
                  <Dialog.ActionTrigger asChild>
                    <Button
                      onClick={() => {
                        handlers.setIsDeleteDialogOpen(false)
                        handlers.setTargetDeleteCashFlowId(null)
                      }}
                      bg={'gray.500'}
                    >
                      Close
                    </Button>
                  </Dialog.ActionTrigger>
                  <Button type='submit' bg={'red.500'}>
                    Delete
                  </Button>
                </Dialog.Footer>
              </form>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    </>
  )
}
