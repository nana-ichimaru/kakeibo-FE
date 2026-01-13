import { type CashFlow } from '@/share/types/cashFlow'

export type GetCashFlowRequestQueryParams = {
  target_month: Date
}

export type CreateCashFlowRequest = {
  title: string
  type: CashFlow
  recordedAt: Date
  amount: number
}

export type UpdateCashFlowRequest = {
  title: string
  type: CashFlow
  recordedAt: Date
  amount: number
}
