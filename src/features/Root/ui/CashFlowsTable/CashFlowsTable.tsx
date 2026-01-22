import { Table } from '@chakra-ui/react'
import { type CashFlowItemView } from '../../types/CashFlowItemView'
import { CashFlowUpdateDialog } from './CashFlowUpdateDialog/CashFlowUpdateDialog'
import { CashFlowDeleteDialog } from './CashFlowDeleteDialog/CashFlowDeleteDialog'

interface CashFlowsTableProps {
  data: {
    cashFlows: CashFlowItemView[]
    isUpdateDialogOpen: boolean
    isDeleteDialogOpen: boolean
    targetUpdateCashFlowId: number | null
    targetDeleteCashFlowId: number | null
  }
  handlers: {
    onSubmitUpdateCashFlow: (data: CashFlowItemView) => void
    onSubmitDeleteCashFlow: (id: number | undefined) => void
    setIsUpdateDialogOpen: (isOpen: boolean) => void
    setIsDeleteDialogOpen: (isOpen: boolean) => void
    setTargetUpdateCashFlowId: (data: number | null) => void
    setTargetDeleteCashFlowId: (data: number | null) => void
  }
}

export const CashFlowsTable = ({ data, handlers }: CashFlowsTableProps) => {
  return (
    <>
      <Table.Root variant='outline'>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader w={'20%'}>Date</Table.ColumnHeader>
            <Table.ColumnHeader w={'30%'}>Title</Table.ColumnHeader>
            <Table.ColumnHeader w={'30%'}>Amount</Table.ColumnHeader>
            <Table.ColumnHeader w={'10%'}></Table.ColumnHeader>
            <Table.ColumnHeader w={'10%'}></Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {data.cashFlows
            .map((item) => (
              <Table.Row key={item.id}>
                <Table.Cell>{item.recordedAt.toLocaleDateString()}</Table.Cell>
                <Table.Cell>{item.title}</Table.Cell>
                <Table.Cell>{item.amount}</Table.Cell>
                <Table.Cell>
                  <CashFlowUpdateDialog
                    data={{
                      isUpdateDialogOpen: data.isUpdateDialogOpen,
                      cashFlow: item,
                      targetUpdateCashFlowId: data.targetUpdateCashFlowId,
                    }}
                    handlers={{
                      onSubmitUpdateCashFlow: handlers.onSubmitUpdateCashFlow,
                      setIsUpdateDialogOpen: handlers.setIsUpdateDialogOpen,
                      setTargetUpdateCashFlowId: handlers.setTargetUpdateCashFlowId,
                    }}
                  />
                </Table.Cell>
                <Table.Cell>
                  <CashFlowDeleteDialog
                    data={{
                      isDeleteDialogOpen: data.isDeleteDialogOpen,
                      cashFlow: item,
                      targetDeleteCashFlowId: data.targetDeleteCashFlowId,
                    }}
                    handlers={{
                      onSubmitDeleteCashFlow: handlers.onSubmitDeleteCashFlow,
                      setIsDeleteDialogOpen: handlers.setIsDeleteDialogOpen,
                      setTargetDeleteCashFlowId: handlers.setTargetDeleteCashFlowId,
                    }}
                  />
                </Table.Cell>
              </Table.Row>
            ))}
        </Table.Body>
      </Table.Root>
    </>
  )
}
