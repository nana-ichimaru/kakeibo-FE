import { Button, Dialog, Portal, Field, Fieldset, Input, NativeSelect } from '@chakra-ui/react'
import { CashFlowTypeList } from '@/share/constants/business/cashFlowType'
import { transformCashFlowTypeToJa } from '@/share/logic/transform/transformCashFlowType'
import { useEffect } from "react"

export const CashFlowCreateDialog = () => {
  useEffect(() => {
    try {
      console.log(transformCashFlowTypeToJa('income'))
      console.log(transformCashFlowTypeToJa('expense'))
      console.log(transformCashFlowTypeToJa('momo'))
      console.log('落ちてない！')
    } catch (e) {
      console.error('エラー出た:', e)
    }
  }, [])

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
                              {transformCashFlowTypeToJa(type)}
                            </option>
                            //　typeが'income'なら'収入'、そうでなければ'支出'を表示
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
                <Button bg={'blue.500'}>Submit</Button>
              </Dialog.Footer>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    </>
  )
}
