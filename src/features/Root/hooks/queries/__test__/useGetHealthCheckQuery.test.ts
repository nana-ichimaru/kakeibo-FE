import { describe, it, expect, vi } from 'vitest'
import { customRenderHook } from '@/tests/helpers/customRenderHook'
import * as healthCheckServices from '@/services/internal/backend/v1/healthCheck'
import { useGetHealthCheckQuery } from '../useGetHealthCheckQuery'
import { waitFor } from '@testing-library/react'

describe('正常系', () => {
  it('healthCheckAPIが正しく実行される', async () => {
    vi.spyOn(healthCheckServices, 'getHealthCheck').mockResolvedValue({ status: 'ok' })
    const { result } = customRenderHook(() => useGetHealthCheckQuery())

    await waitFor(() => {
      expect(result.current.data).toEqual({ status: 'ok' })
    })
    expect(result.current.isFetching).toBe(false)
    expect(result.current.isSuccess).toBe(true)
  })
})

// .iserror がtrueが異常系の場合

// describeの中にdescribeを書いていくのが美しい書き方