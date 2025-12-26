import { RootPresentational } from './RootPresentational'

import { useEffect } from 'react'

import { useGetHealthCheckQuery } from './hooks/queries/useGetHealthCheckQuery'

// RootContainer は「画面のロジックを担当するコンポーネント」
// - APIデータ取得
// - 状態管理
// - 取得結果をUIに渡す
// などをここで行い、表示は RootPresentational に任せる構造
export const RootContainer = () => {

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
  const { data, isSuccess, isFetching } = useGetHealthCheckQuery()

  // useEffect は「レンダリング後に実行したい処理」を書く場所
  // ここでは data / isSuccess / isFetching が変化したタイミングでログを出して、
  // API取得がどのような流れで状態遷移するかを確認している
  //
  // 【依存配列の役割】
  // - [data, isSuccess, isFetching] に入れた値が変わったときに、この useEffect が再実行される
  // - react-query は通信状況に応じて data / 状態フラグを更新するため、
  //   その更新を検知してログに出すには依存配列に入れる必要がある
  useEffect(() => {
    console.log(data, isSuccess, isFetching)
  }, [data, isSuccess, isFetching])

  // return で RootPresentational を描画する
  // - RootContainer は主にロジック（API取得や状態管理）を担当
  // - RootPresentational は主にUIを担当
  return (
    <>
      <RootPresentational />
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