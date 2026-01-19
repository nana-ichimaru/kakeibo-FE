import { Button, Dialog, Portal, Field, Fieldset, Input, NativeSelect } from '@chakra-ui/react'
import { CashFlowTypeList } from '@/share/constants/business/cashFlowType'
import { transformCashFlowTypeJa } from '@/share/logic/transform/transformCashFlowType'
import { type CashFlowItemView } from '@/features/Root/types/CashFlowItemView'
interface CashFlowUpdateDialogProps {
  data: {
    isUpdateDialogOpen: boolean
    //定義ができない（undefined）
    cashFlow: CashFlowItemView | undefined
    targetUpdateCashFlowId: number | null
  }
  handlers: {
    onSubmitUpdateCashFlow: () => void
    setIsUpdateDialogOpen: (isOpen: boolean) => void
    setTargetUpdateCashFlowId: (data: number | null) => void
  }
}

export const CashFlowUpdateDialog = ({ data, handlers }: CashFlowUpdateDialogProps) => {
  return (
    <>
      <Dialog.Root
        open={data.isUpdateDialogOpen && data.cashFlow?.id == data.targetUpdateCashFlowId}
      >
        <Dialog.Trigger asChild>
          <Button
            onClick={() => {
              handlers.setTargetUpdateCashFlowId(data.cashFlow?.id ?? null)
              handlers.setIsUpdateDialogOpen(true)
            }}
            bg={'blue.500'}
          >
            Edit
          </Button>
        </Dialog.Trigger>
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content>
              <Dialog.Header>
                <Dialog.Title>Update Cash Flow</Dialog.Title>
              </Dialog.Header>
              <form
                action={(data) => {
                  handlers.onSubmitUpdateCashFlow({
                    title: data.get('title') as string,
                    type: data.get('type') as CashFlow,
                    recordedAt: new Date(data.get('recordedAt') as string),
                    amount: Number(data.get('amount')),
                  })
                  handlers.setIsUpdateDialogOpen(false)
                }}
              >
                <Dialog.Body>
                  <Fieldset.Root>
                    <Fieldset.Content>
                      <Field.Root>
                        <Field.Label>Amount</Field.Label>
                        <Input
                          name='amount'
                          placeholder='Enter amount'
                          type='number'
                          min={1}
                          defaultValue={data.cashFlow?.amount}
                        />
                      </Field.Root>
                      <Field.Root>
                        <Field.Label>Title</Field.Label>
                        <Input
                          name='title'
                          placeholder='Enter title'
                          defaultValue={data.cashFlow?.title}
                        />
                      </Field.Root>
                      <Field.Root>
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
                      <Field.Root>
                        <Field.Label>Recorded At</Field.Label>
                        <Input
                          name='recordedAt'
                          type='date'
                          defaultValue={data.cashFlow?.recordedAt.toLocaleDateString('sv-SE')}
                        />
                      </Field.Root>
                    </Fieldset.Content>
                  </Fieldset.Root>
                </Dialog.Body>
                <Dialog.Footer>
                  <Dialog.ActionTrigger asChild>
                    <Button
                      onClick={() => {
                        handlers.setIsUpdateDialogOpen(false)
                        handlers.setTargetUpdateCashFlowId(null)
                      }}
                      bg={'gray.500'}
                    >
                      Close
                    </Button>
                  </Dialog.ActionTrigger>
                  <Button type='submit'>Edit</Button>
                </Dialog.Footer>
              </form>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    </>
  )
}
