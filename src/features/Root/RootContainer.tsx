import { RootPresentational } from './RootPresentational'

import { useGetCashFlowsHandler } from './hooks/handlers/useGetCashFlowsHandler'
import { useCreateCashFlowHandler } from './hooks/handlers/useCreateCashFlowsHandler'
import { useUpdateCashFlowHandler } from './hooks/handlers/useUpdateCashFlowHandler'
// RootContainer は「画面のロジックを担当するコンポーネント」
// - APIデータ取得
// - 状態管理
// - 取得結果をUIに渡す
// などをここで行い、表示は RootPresentational に任せる構造
export const RootContainer = () => {
  // useGetCashFlowsHandler() 調理
  // data: cashFlowsData　お皿を準備
  const { data: cashFlowsData } = useGetCashFlowsHandler()
  //　これが実際のチラシ
  const { data: createCashFlowData, handlers: createCashFlowHandlers } = useCreateCashFlowHandler()
  const { handlers: updateCashFlowHandlers } = useUpdateCashFlowHandler()

  // const { data = [], isSuccess, isFetching} = useGetCashFlowsQuery({target_month: new Date('2025-12-26')})
  // // 取得したdataからtypeがincomeのものだけを取得したい
  // const income = data.filter(item => item.type == 'income' )
  // const totalIncome = income.reduce((result,current) => result + current.amount, 0)
  // const expense = data.filter(item => item.type == 'expense' )
  // const totalExpense = expense.reduce((result,current) => result + current.amount, 0)
  // // 数字ではなく連想配列なので初期値を設置する。０で
  // // income = [{amount: 1000}, {amount: 2000}]　なら初期値が必要
  // // income = [1000, 2000]　いらない初期値
  // const total = totalIncome - totalExpense

  // useEffect(() => {
  //   console.log(data, isSuccess, isFetching, total)
  // }, [data, isSuccess, isFetching, total])

  // useGetHealthCheckQuery() を実行すると、
  // react-query が API取得（queryFn）を開始し、結果や状態が返される
  //
  // data:
  //   - queryFn（getHealthCheck）の戻り値が入る
  //   - API取得が成功するまで undefined のことが多い
  //
  // isSuccess:
  //   - API取得が成功して data が確定した状態かどうか
  //   - true の場合「成功してデータがある」状態を意味する
  //
  // isFetching:
  //   - 「今この瞬間」データ取得が走っているかどうか
  //   - 初回ロードや再取得（refetch）中は true になる
  // const { data, isSuccess, isFetching } = useGetHealthCheckQuery()

  // useEffect は「レンダリング後に実行したい処理」を書く場所
  // ここでは data / isSuccess / isFetching が変化したタイミングでログを出して、
  // API取得がどのような流れで状態遷移するかを確認している
  //
  // 【依存配列の役割】
  // - [data, isSuccess, isFetching] に入れた値が変わったときに、この useEffect が再実行される
  // - react-query は通信状況に応じて data / 状態フラグを更新するため、
  //   その更新を検知してログに出すには依存配列に入れる必要がある
  // useEffect(() => {
  //   console.log(data, isSuccess, isFetching)
  // }, [data, isSuccess, isFetching])

  // return で RootPresentational を描画する
  // - RootContainer は主にロジック（API取得や状態管理）を担当
  // - RootPresentational は主にUIを担当
  return (
    <>
      {/* 実際に食べてるところ */}
      <RootPresentational
        data={{
          income: cashFlowsData.income,
          expense: cashFlowsData.expense,
          summary: cashFlowsData.summary,
          isCreateDialogOpen: createCashFlowData.isCreateDialogOpen,
        }}
        handlers={{
          onSubmitCreateCashFlow: createCashFlowHandlers.onSubmitCreateCashFlow,
          onSubmitUpdateCashFlow: updateCashFlowHandlers.onSubmitUpdateCashFlow,
          setIsCreateDialogOpen: createCashFlowHandlers.setIsCreateDialogOpen,
        }}
      />
    </>
  )
}

// useEffect(() => {}, [] )
// 第二引数に変化があった時に動くのが第一引数
// 第二引数に見ておきたいものを入れる、空でも大丈夫(useEffectは、ブラウザを一回開けばまわるため)

// useEffect(() => {
//   // await getHealthCheck()
//   // useEffectの第一引数にasyncは記述できないため、変数に入れて使用する
//   const a = async () => {
//     const b = await getHealthCheck()
//     console.log(b)
//   }
//   void a()
// }, [])
