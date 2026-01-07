import { Table, Button } from '@chakra-ui/react'
import { type CashFlowItemView } from '../../types/CashFlowItemView'

interface CashFlowsTableProps {
  data: {
    cashFlows: CashFlowItemView[]
  }
}

export const CashFlowsTable = ({ data }: CashFlowsTableProps) => {
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
          {data.cashFlows.map((item) => (
            <Table.Row key={item.id}>
              <Table.Cell>{item.recordedAt.toLocaleDateString()}</Table.Cell>
              <Table.Cell>{item.title}</Table.Cell>
              <Table.Cell>{item.amount}</Table.Cell>
              <Table.Cell>
                <Button>Edit</Button>
              </Table.Cell>
              <Table.Cell>
                <Button>Delete</Button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </>
  )
}
