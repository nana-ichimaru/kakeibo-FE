// react-query（TanStack Query）が提供する「データ取得用のHook」useQuery を読み込む
// useQuery は API 取得処理を実行し、その結果をキャッシュし、
// さらに loading / error / data などの状態をまとめて管理してくれる
import { useQuery } from '@tanstack/react-query'

import { getHealthCheck } from '@/services/internal/backend/v1/healthCheck'

// health-check API を取得するための「カスタムHook」
// 目的：コンポーネント側で useQuery の設定を毎回書かずに、
//      このHookを呼ぶだけで health-check を取得できるようにする
export const useGetHealthCheckQuery = () => {
  // useQuery に「何のデータを」「どうやって取得して」「どう識別するか」を渡す
  // useQuery の戻り値には data / isLoading / error などが入る
  return useQuery({
    // queryFn（query function）
    // 役割：データ取得の「実処理」を行う関数
    // - useQuery が必要なタイミングでこの関数を呼び出す
    // - 戻り値は Promise（非同期結果）であることが多い
    // 例）getHealthCheck が axios.get(...) をしてレスポンスを返す
    queryFn: getHealthCheck,

    // queryKey
    // 役割：この取得データを react-query がキャッシュ管理するための「識別子」
    // - 同じ queryKey の useQuery は同じキャッシュを参照する
    // - ここが一致している限り、データを使い回したり、再取得の制御ができる
    // - 文字列ではなく配列で持つのが推奨（引数などを追加しやすい）
    //
    // 例）['healthcheck'] は「healthcheckデータのキャッシュ」を意味する
    queryKey: ['healthcheck'],
  })
}
