// TanStack Query（react-query）が提供する「QueryClient」というクラスを読み込む
// QueryClient は、データ取得（useQueryなど）のキャッシュや状態を管理する司令塔
import { QueryClient } from '@tanstack/react-query'

// QueryClient のインスタンス（実体）を1つ作成して export する
// これをアプリ全体で共有することで、データのキャッシュや取得状態を共通で管理できる
export const queryClient = new QueryClient()
