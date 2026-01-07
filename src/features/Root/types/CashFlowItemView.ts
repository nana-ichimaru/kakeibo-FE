import { type CashFlow } from '@/share/types/cashFlow'

export type CashFlowItemView = {
  id: number
  type: CashFlow
  amount: number
  title: string
  recordedAt: Date
}