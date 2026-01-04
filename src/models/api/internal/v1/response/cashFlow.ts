import { type CashFlow } from "@/share/types/cashflow"

export type GetCashFlowResponseItem = {
  id: number
  title: string
  type: CashFlow
  recordedAt: Date
  amount: number
}
