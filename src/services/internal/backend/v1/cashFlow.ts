import { internalBackendV1Client } from './client'

import { type GetCashFlowRequestQueryParams, type CreateCashFlowRequest, type UpdateCashFlowRequest } from '@/models/api/internal/v1/request/cashFlow'
import { type GetCashFlowResponseItem, type CreateCashFlowResponse, type UpdateCashFlowResponse } from '@/models/api/internal/v1/response/cashFlow'

export const getCashFlows = async (
  // 呼び出し側から受け取った params を、クエリパラメータとしてAPIに渡す
  params: GetCashFlowRequestQueryParams,
): Promise<GetCashFlowResponseItem[]> => {
  // get(url, config) の config（オプション）
  // 第二引数 config は「このHTTPリクエストをどう送るか」を指定する設定。
  // params を入れると クエリパラメータとして URL に付く
  const response = await internalBackendV1Client.get<GetCashFlowResponseItem[]>('/cash-flows', {
    params: params,
  })

  return response.data
}

// GETは body がないから get(url, config)
// POSTは body があるから post(url, body, config)
// 呼び出し側から受け取った body を、リクエストボディとしてAPIに渡す
export const createCashFlow = async (
  body: CreateCashFlowRequest,
): Promise<CreateCashFlowResponse> => {
  // post(url, data, config) の data（第2引数）
  // 第2引数 data は「リクエストボディ」に入るデータ。
  const response = await internalBackendV1Client.post<CreateCashFlowResponse>('/cash-flows', body)

  return response.data
}

//putを書く　
export const updateCashFlow = async (
  id: number,
  body: UpdateCashFlowRequest,
): Promise<UpdateCashFlowResponse> => {
  const response = await internalBackendV1Client.put<UpdateCashFlowResponse>(`/cash-flows/${id.toString()}`, body)

  return response.data
}

// Promise は返るけど、中身（resolve値）は何もない
export const deleteCashFlow = async (id: number): Promise<void> => {
  await internalBackendV1Client.delete(`/cash-flows/${id.toString()}`)
}



// 非同期通信の流れ
// javascriptは本来即時実行ですぐに次の処理へと進んでしまう。
// Promiseは一旦空の箱を渡す役割をする
// async非同期の関数でawait は「この処理が終わるまで待ってから次へ進む」を使えるようにする
// awaitが実行されたら、returnで箱にデータが入る(awaitされたものがそのまま入るわけではない。.dataのように加工されることもある)
// まとめる