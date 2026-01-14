import { Button, Dialog, Portal, Field, Fieldset, Input, NativeSelect } from '@chakra-ui/react'
import { CashFlowTypeList } from '@/share/constants/business/cashFlowType'
import { transformCashFlowTypeJa } from '@/share/logic/transform/transformCashFlowType'
interface CashFlowUpdateDialogProps {
  handlers: {
    onSubmitUpdateCashFlow: () => void
  }
}

export const CashFlowUpdateDialog = ({ handlers }: CashFlowUpdateDialogProps) => {
  return (
    <>
      <Dialog.Root>
        <Dialog.Trigger asChild>
          <Button>Edit</Button>
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
                  handlers.onSubmitUpdateCashFlow()
                }}
              >
                <Dialog.Body>
                  <Fieldset.Root>
                    <Fieldset.Content>
                      <Field.Root>
                        <Field.Label>Amount</Field.Label>
                        <Input name='amount' placeholder='Enter amount' type='number' min={1} />
                      </Field.Root>
                      <Field.Root>
                        <Field.Label>Title</Field.Label>
                        <Input name='title' placeholder='Enter title' />
                      </Field.Root>
                      <Field.Root>
                        <Field.Label>Type</Field.Label>
                        <NativeSelect.Root>
                          <NativeSelect.Field name='type' defaultValue='income'>
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
                          defaultValue={new Date().toLocaleDateString('sv-SE')}
                        />
                      </Field.Root>
                    </Fieldset.Content>
                  </Fieldset.Root>
                </Dialog.Body>
                <Dialog.Footer>
                  <Dialog.ActionTrigger asChild>
                    <Button>Close</Button>
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
