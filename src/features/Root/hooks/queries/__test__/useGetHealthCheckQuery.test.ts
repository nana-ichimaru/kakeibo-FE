import { describe, it, expect, vi } from 'vitest'
import { customRenderHook } from '@/tests/helpers/customRenderHook'
import * as healthCheckServices from '@/services/internal/backend/v1/healthCheck'
import { useGetHealthCheckQuery } from '../useGetHealthCheckQuery'
import { waitFor } from '@testing-library/react'

describe('正常系', () => {
  it('healthCheckAPIが正しく実行される', async () => {
    // vi.spyOn:
    // 指定したオブジェクトの関数を「監視」してスパイ化する。
    // 監視すると、呼び出し回数・引数・戻り値などを検証できるようになる。
    // ※ここでは getHealthCheck を“本物を叩かずに”テストするためにモック化の土台として使っている。
    //
    // mockResolvedValue:
    // spyOnした関数が返す Promise の「成功時の返り値(resolveする値)」を固定する。
    // async関数/Promiseを返すAPIを、任意のレスポンスで差し替えるのに便利。
    vi.spyOn(healthCheckServices, 'getHealthCheck').mockResolvedValue({ status: 'ok' })

    const { result } = customRenderHook(() => useGetHealthCheckQuery())

    // waitFor:
    // 非同期で状態が更新されるのを待つためのユーティリティ。
    // コールバック内のexpectが通るまで一定時間リトライしてくれる。
    // React Queryのdata更新など「いつ反映されるか分からない」更新待ちに使う。
    await waitFor(() => {
      // toEqual:
      // オブジェクト/配列などを「中身まで」比較する（deep equal）。
      // 参照が同じかではなく、プロパティの内容が同じかを見たいときに使う。
      expect(result.current.data).toEqual({ status: 'ok' })
    })

    // toBe:
    // 厳密等価(===)で比較する。
    // boolean / number / string などプリミティブ値の判定に向く。
    expect(result.current.isFetching).toBe(false)
    expect(result.current.isSuccess).toBe(true)
  })
})

// .isError が true → 異常系（エラー時）のテストを書く想定
// describe の中に describe をネストして、「正常系」「異常系」などで整理すると読みやすい
