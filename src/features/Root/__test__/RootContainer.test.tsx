import { describe, it, expect, vi } from 'vitest'
import { customRender } from '@/tests/helpers/customRender'
import { RootContainer } from '../RootContainer'
import { screen } from '@testing-library/react'

vi.mock('../RootPresentational',() => ({RootPresentational: () => {
    return <div data-testid="mocked-root-presentational" />
}}))
//フェーズ３で受け取ったものが正しいかのテストを自分で考えて実装する
describe('正常系', () => {
  it('RootPresentationalに正しいpropsが渡される', () => {
    customRender(<RootContainer />)
    expect(screen.getByTestId('mocked-root-presentational')).toBeInTheDocument()
  })
})
