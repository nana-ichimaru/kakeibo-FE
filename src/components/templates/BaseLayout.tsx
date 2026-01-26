// → どのページでも共通して表示したいヘッダー部分
import { Header } from '../organisms/Header'

// → ルーティングで指定された「子ルートの画面」を表示するための差し込み口
import { Outlet } from 'react-router-dom'

// BaseLayoutという「共通レイアウト用コンポーネント」を作成
// → Header（共通部分）と、ページごとに変わる中身（Outlet）をまとめる
export const BaseLayout = () => {
  return (
    <>
      {/* 共通で表示したいヘッダー */}
      <Header />

      {/* ここに各ページのコンテンツが表示される（差し込み口）
          例：/ にアクセスしたら <RootContainer /> がここに入る
              /maguro にアクセスしたら <MaguroContainer /> がここに入る */}
      <Outlet />
    </>
  )
}
