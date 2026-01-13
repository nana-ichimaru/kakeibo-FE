import { type CashFlow } from '@/share/types/cashFlow'

export type CashFlowItemView = {
  // ?idがあってもなくてもいい型指定になる。optional(任意)になる.
  id?: number
  type: CashFlow
  amount: number
  title: string
  recordedAt: Date
}