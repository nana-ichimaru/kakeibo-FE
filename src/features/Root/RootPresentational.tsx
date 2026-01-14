import { Box, Container, HStack, Stack, Text } from '@chakra-ui/react'
import { CashFlowSummaryCard } from './ui/CashFlowSummaryCard'
import { CashFlowsTab } from './ui/CashFlowsTab'
import { HEADER_HEIGHT } from '@/share/constants/layout/header'
import type { CashFlowItemView } from './types/CashFlowItemView'
import { CashFlowCreateDialog } from './ui/CashFlowCreateDialog'
import { CashFlowUpdateDialog } from './ui/CashFlowsTable/CashFlowUpdateDialog/CashFlowUpdateDialog'

interface RootPresentationalProps {
  // 作法
  data: {
    income: CashFlowItemView[]
    expense: CashFlowItemView[]
    summary: {
      totalIncome: number
      totalExpense: number
      total: number
    }
    isCreateDialogOpen: boolean
  }
  //　戻り値が何もないときはvoidを使う
  //　関数の型定義
  handlers: {
    onSubmitCreateCashFlow: (data: CashFlowItemView) => void
    onSubmitUpdateCashFlow: () => void
    setIsCreateDialogOpen: (isOpen: boolean) => void
  }
}

//食べたもの　data
export const RootPresentational = ({ data, handlers }: RootPresentationalProps) => {
  return (
    <>
      {/*  ここでは「画面全体の高さ(100vh) から ヘッダーの高さ(HEADER_HEIGHT) を引いた値」を高さにしている
        Header（64pxなど）が上にある状態で、メインコンテンツが「残りの画面の高さ」にピッタリ収まるようにするため
        calc() は CSS の計算関数で、単位の違う値（vh と px）でも引き算できる
        100vh は「画面の高さ100%」、px は固定の長さ */}
      <Container h={`calc(100vh - ${HEADER_HEIGHT})`}>
        {/* 子要素を縦方向または横方向に積み重ねて配置するために使用されます。 */}
        <Stack>
          {/* 日付選択カレンダー */}
          <Box>日付選択カレンダー</Box>
          <CashFlowUpdateDialog
            handlers={{ onSubmitUpdateCashFlow: handlers.onSubmitUpdateCashFlow }}
          />
          {/* 収支計算 */}
          {/* 要素を横に並べる */}
          <HStack>
            {/* 消化過程 data.summary.totalIncome*/}
            <CashFlowSummaryCard data={{ title: 'income', amount: data.summary.totalIncome }} />
            <Text>-</Text>
            <CashFlowSummaryCard data={{ title: 'expenses', amount: data.summary.totalExpense }} />
            <Text>=</Text>
            <CashFlowSummaryCard data={{ title: 'TOTAL', amount: data.summary.total }} />
          </HStack>
          {/* 収支新規登録ボタン */}
          {/* chakrauiのBoxタグはHTMLでいうdivタグ */}
          {/* Stackの直下に置かれたタグは横幅が広がるため、Boxタグを使用してDialogタグを直下に置かないようにする */}
          <Box>
            <CashFlowCreateDialog
              data={{ isCreateDialogOpen: data.isCreateDialogOpen }}
              handlers={{
                onSubmitCreateCashFlow: handlers.onSubmitCreateCashFlow,
                setIsCreateDialogOpen: handlers.setIsCreateDialogOpen,
              }}
            />
          </Box>
          {/* 収支切り替えタブ（収支一覧テーブル表示切り替え） */}
          <CashFlowsTab data={{ income: data.income, expense: data.expense }} />
        </Stack>
      </Container>
    </>
  )
}
