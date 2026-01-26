import { internalBackendV1Client } from './client'

// 型だけを import するときは `type` を付けると「型専用のimport」になる
import { type GetHealthCheckResponse } from '@/models/api/internal/v1/response/healthCheck'

// async は「この関数の中で await を使えるようにする」宣言
// async を付けた関数は、戻り値が自動的に Promise になる
// Promise<T> は「あとで T が返ってくる」という意味
export const getHealthCheck = async (): Promise<GetHealthCheckResponse> => {
  // await は「この処理が終わるまで待ってから次へ進む」
  // get<GetHealthCheckResponse>() の <...> は「レスポンスの data の型」を指定している
  const response = await internalBackendV1Client.get<GetHealthCheckResponse>('/health-check')

  // axios 形式なので、実際のデータ本体は response.data に入っている
  return response.data
}
