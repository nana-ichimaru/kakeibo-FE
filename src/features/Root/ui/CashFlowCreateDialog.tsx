import { Button, Dialog, Portal, Field, Fieldset, Input, NativeSelect } from '@chakra-ui/react'
import { CashFlowTypeList } from '@/share/constants/business/cashFlowType'
import { transformCashFlowTypeJa } from '@/share/logic/transform/transformCashFlowType'
interface CashFlowCreateDialogProps {
  handlers: { onSubmitCreateCashFlow: () => void }
}

export const CashFlowCreateDialog = ({ handlers }: CashFlowCreateDialogProps) => {
  //   try {
  // エラー出そうな処理
  //   } catch (e) {
  // エラー時の処理
  //   }

  return (
    <>
      <Dialog.Root>
        <Dialog.Trigger asChild>
          <Button bg={'blue.500'}>+ Add</Button>
        </Dialog.Trigger>
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content>
              <Dialog.Header>
                <Dialog.Title>Create Cash Flow</Dialog.Title>
              </Dialog.Header>
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  handlers.onSubmitCreateCashFlow()
                }}
              >
                {/* <form
                onSubmit={(e) => {
                  画面を勝手にリロードをしないように設定する「e.preventDefault()」
                  e.preventDefault()
                  console.log('test1')
                }}
              ></form> */}
                <Dialog.Body>
                  <Fieldset.Root>
                    <Fieldset.Content>
                      <Field.Root>
                        <Field.Label>Amount</Field.Label>
                        <Input placeholder='Enter amount' type='number' min={1} />
                      </Field.Root>
                      <Field.Root>
                        <Field.Label>Title</Field.Label>
                        <Input placeholder='Enter title' />
                      </Field.Root>
                      <Field.Root>
                        <Field.Label>Type</Field.Label>
                        <NativeSelect.Root>
                          <NativeSelect.Field defaultValue='income'>
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
                        {/* 'sv-SE'はスウェーデンのフォーマット。 */}
                        {/* toLocaleDateString('sv-SE')→YYYY-MM-DD */}
                        {/* toLocaleString('sv-SE')　→　YYYY-MM-DD HH:MM:SS */}
                        <Input type='date' defaultValue={new Date().toLocaleDateString('sv-SE')} />
                      </Field.Root>
                    </Fieldset.Content>
                  </Fieldset.Root>
                </Dialog.Body>
                <Dialog.Footer>
                  <Dialog.ActionTrigger asChild>
                    <Button bg={'gray.500'}>Close</Button>
                  </Dialog.ActionTrigger>
                  <Button type='submit' bg={'blue.500'}>
                    Submit
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
