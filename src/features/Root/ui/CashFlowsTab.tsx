import { Tabs } from '@chakra-ui/react'
import type { CashFlowItemView } from '../types/CashFlowItemView'
import { CashFlowsTable } from './CashFlowsTable/CashFlowsTable'

interface CashFlowsTabProps {
  data: {
    income: CashFlowItemView[]
    expense: CashFlowItemView[]
  }
}
// データは以下の形
//[{id: 1, type: 'income', amount: 100, title: "mikan", recordedAt: "2025-12-01"},
// {id: 2, type: 'income', amount: 200, title: "banana", recordedAt: "2025-12-02"},
// {id: 3, type: 'income', amount: 300, title: "apple", recordedAt: "2025-12-03"}];

export const CashFlowsTab = ({ data }: CashFlowsTabProps) => {
  return (
    <>
      <Tabs.Root defaultValue='income' variant='outline'>
        <Tabs.List>
          <Tabs.Trigger value='income'>income</Tabs.Trigger>
          <Tabs.Trigger value='expense'>expense</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value='income'>
          <CashFlowsTable data={{ cashFlows: data.income }} />
        </Tabs.Content>
        <Tabs.Content value='expense'>
          <CashFlowsTable data={{ cashFlows: data.expense }} />
        </Tabs.Content>
      </Tabs.Root>
    </>
  )
}
