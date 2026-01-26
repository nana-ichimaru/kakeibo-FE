import { type CashFlow } from '@/share/types/cashFlow'

export type GetCashFlowResponseItem = {
  id: number
  title: string
  type: CashFlow
  recordedAt: Date
  amount: number
}

export type CreateCashFlowResponse = {
  id: number
  title: string
  type: CashFlow
  recordedAt: Date
  amount: number
}

export type UpdateCashFlowResponse = {
  id: number
  title: string
  type: CashFlow
  recordedAt: Date
  amount: number
}
