import { useGetCashFlowsQuery } from '../queries/useGetCashFlowsQuery'
import { useState } from 'react'

// useQueryの場合は実際に叩いたデータを用意できます
export const useGetCashFlowsHandler = () => {
  const [targetMonth, setTargetMonth] = useState<Date>(new Date())

  const {
    // APIの結果がまだ入っていない（undefined）場合でも
    // この後の filter / reduce が落ちないように空配列を初期値にする
    data = [],
    isSuccess,
    isFetching,
  } = useGetCashFlowsQuery({ target_month: targetMonth })
  // 取得したdataからtypeがincomeのものだけを取得したい
  const cashFlows = data.sort((a, b) => b.recordedAt.getTime() - a.recordedAt.getTime())
  const income = cashFlows.filter((item) => item.type == 'income')
  const totalIncome = income.reduce((result, current) => result + current.amount, 0)
  const expense = cashFlows.filter((item) => item.type == 'expense')
  const totalExpense = expense.reduce((result, current) => result + current.amount, 0)
  // 数字ではなく連想配列なので初期値を設置する。０で
  // income = [{amount: 1000}, {amount: 2000}]　なら初期値が必要
  // income = [1000, 2000]　いらない初期値
  const total = totalIncome - totalExpense
  return {
    data: {
      targetMonth,
      income,
      expense,
      summary: { totalIncome: totalIncome, totalExpense: totalExpense, total: total },
    },
    handlers: {
      setTargetMonth
    },
    uiState: { isSuccess: isSuccess, isFetching: isFetching },
  }
}

