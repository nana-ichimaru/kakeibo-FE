import { describe, it, expect } from 'vitest'
import { customRender } from '@/tests/helpers/customRender'
import { Header } from '../Header'
import { screen } from '@testing-library/react'

describe('正常系', () => {
  it('ヘッダーが正しく表示されること', () => {
    customRender(<Header />)
    // toBeInTheDocument一つという意味
    // screen: render された画面（DOM）全体に対して要素を取得するためのオブジェクト
    // getByRole: 指定した role（役割）の要素を取得する
    expect(screen.getByRole('heading', { name: 'KAKEIBO APP' })).toBeInTheDocument()
  })
})
