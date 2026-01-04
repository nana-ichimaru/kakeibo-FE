import { internalBackendV1Client } from './client'

import { type GetCashFlowRequestQueryParams } from '@/models/api/internal/v1/request/cashFlow'
import { type GetCashFlowResponseItem } from '@/models/api/internal/v1/response/cashFlow'

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
