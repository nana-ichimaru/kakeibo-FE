import { Box, Container, HStack, Stack, Text } from '@chakra-ui/react'
import { CashFlowSummaryCard } from './ui/CashFlowSummaryCard'
import { HEADER_HEIGHT } from '@/share/constants/layout/header'
interface RootPresentationalProps {
  totalIncome: number
  totalExpense: number
  total: number
}

export const RootPresentational = ({ totalIncome, totalExpense, total }: RootPresentationalProps) => {
  return (
    <>
        {/*  ここでは「画面全体の高さ(100vh) から ヘッダーの高さ(HEADER_HEIGHT) を引いた値」を高さにしている
        Header（64pxなど）が上にある状態で、メインコンテンツが「残りの画面の高さ」にピッタリ収まるようにするため
        calc() は CSS の計算関数で、単位の違う値（vh と px）でも引き算できる
        100vh は「画面の高さ100%」、px は固定の長さ */}
      <Container h={`calc(100vh - ${HEADER_HEIGHT})`}>
        <Stack>
          {/* 日付選択カレンダー */}
          <Box>日付選択カレンダー</Box>
          {/* 収支計算 */}
          <HStack>
            <CashFlowSummaryCard title='income' amount={totalIncome} />
            <Text>-</Text>
            <CashFlowSummaryCard title='expenses' amount={totalExpense} />
            <Text>=</Text>
            <CashFlowSummaryCard title='TOTAL' amount={total} />
          </HStack>
          {/* 収支新規登録ボタン */}
          <Box>収支新規登録ボタン</Box>
          {/* 収支切り替えタブ（収支一覧テーブル表示切り替え） */}
          <Box>収支切り替えタブ（収支一覧テーブル表示切り替え）</Box>
        </Stack>
      </Container>
    </>
  )
}
