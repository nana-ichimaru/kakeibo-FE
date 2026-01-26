// axios本体と、axiosの設定項目を表す型（AxiosRequestConfig）を読み込む
// - axios: HTTP通信を行うためのライブラリ本体
// - AxiosRequestConfig: axios.create() に渡せる設定オブジェクトの「形」を定義した型
import axios, { type AxiosRequestConfig } from 'axios'

// 「設定（config）を受け取って、設定済みのaxiosインスタンスを作成して返す」関数（＝工場）
// 目的：API通信で使う共通設定（baseURL, headers, timeoutなど）をまとめて管理できるようにする
export const createBaseClient = (config: AxiosRequestConfig) => {
  // axios.create(config) によって「設定済みaxiosインスタンス（client）」を生成する
  // 生成されたclientは、ここで渡したconfig（例：baseURLなど）を保持した状態で通信できる
  const client = axios.create(config)

  // 作成したaxiosインスタンスを呼び出し元に返す
  // → internal / external など用途ごとに別の設定のclientを作って使い分けられる
  return client
}
