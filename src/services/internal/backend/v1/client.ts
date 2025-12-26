import { createBaseClient } from "@/services/base/httpClientFactory";

// internal backend API を呼ぶための共通クライアントを作成する
const client = createBaseClient({
  // APIの共通のURL（これが土台になる）
  // client.get("/health-check") → http://localhost:8000/api/v1/health-check にアクセスする
  baseURL: "http://localhost:8000/api/v1",

  // Cookieなどの認証情報をリクエストに含める設定（ログインが必要なAPIで重要）
  withCredentials: true,

  // 10秒以上かかった通信はタイムアウトして失敗させる
  timeout: 10000,
});

// 他のファイルから使えるように export
export const internalBackendV1Client = client;