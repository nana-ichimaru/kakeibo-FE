// 「APIが返してくるデータの形（レスポンス）」を表す型定義です。
// バックエンドの仕様が変わる可能性がある時に便利なtype型を使用
export type GetHealthCheckResponse = {
    status: string
}