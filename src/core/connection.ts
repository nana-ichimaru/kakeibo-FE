import { z } from 'zod/mini'
/**
 * 検証用の箱（schema）を作る
 * envSchema は「環境変数がこういう形で存在していてほしい」というルール定義。
 *
 * z.object(...) の中に定義したキーが必須になる。
 */
const envSchema = z.object({
  /**
   * VITE_BE_BASE_URL は backend の base URL を想定している
   * z.url() を使うことで、「URL形式として正しい文字列か」をチェックしてくれる。
   */
  VITE_BE_BASE_URL: z.url(),
})

/**
 *  環境変数を schema に通して検証 → OKなら値を取り出して export
 *
 * envSchema.parse(import.meta.env) は以下の動作:
 * - import.meta.env の中から VITE_BE_BASE_URL を取り出す
 * - schema のルール（URL形式）に一致するかチェック
 * - 一致しなければ例外（エラー）を投げる
 * - 一致すれば「検証済みの値」を返す
 * - parse は,ルールに合っているかチェックして合っていればその値を返して合っていなければエラーで止めるというメソッドです。
 * つまり envConnectionConfig は
 * 「存在していて、URLとして正しい」ことが保証された安全な設定値になる。
 */
export const envConnectionConfig = envSchema.parse(import.meta.env)
