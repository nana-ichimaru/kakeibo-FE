import { describe, it, expect, vi } from 'vitest'
import { customRender } from '@/tests/helpers/customRender'
import { RootContainer } from '../RootContainer'
import { screen } from '@testing-library/react'

// vi.mock:
// 指定モジュールをテスト中だけ差し替える（モック化する）。
// Containerのテストでは、Presentationalを“本物のUI”で描画する必要はないことが多いので、
// ここでは RootPresentational をダミーコンポーネントに置き換えている。
// → 「Presentationalが表示されたか」「propsが渡ったか」に集中できる。
vi.mock('../RootPresentational', () => ({
  // モジュールが export している RootPresentational を差し替え
  RootPresentational: () => {
    // data-testid:
    // テストで要素を安定して取得するための属性。
    // UI文言や構造変更の影響を受けづらい。
    return <div data-testid='mocked-root-presentational' />
  },
}))

// フェーズ３で受け取ったものが正しいかのテストを自分で考えて実装する
describe('正常系', () => {
  it('RootPresentationalに正しいpropsが渡される', () => {
    // customRender:
    // テスト用のrenderラッパー（Provider/Router/QueryClient等）を仕込んだrender。
    // アプリに必要な前提コンテキストを簡単に用意できる。
    customRender(<RootContainer />)

    // screen:
    // Testing Library が提供する「画面全体」から要素を探すためのAPI。
    // getBy* は「存在する前提」で探すので、見つからないとテストが失敗する。
    //
    // getByTestId:
    // data-testid を指定して要素を取得する。
    // ここでは「RootPresentationalがモックに差し替わって描画された」ことを確認している。
    //
    // toBeInTheDocument:
    // その要素がDOM上に存在していることを検証するマッチャー（@testing-library/jest-dom）。
    expect(screen.getByTestId('mocked-root-presentational')).toBeInTheDocument()
  })
})
