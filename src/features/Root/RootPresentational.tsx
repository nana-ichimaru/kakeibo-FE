import { Box, Container, HStack, Stack, Text } from '@chakra-ui/react'
import { CashFlowSummaryCard } from './ui/CashFlowSummaryCard'
import { Header } from '@/components/organisms/Header'

export const RootPresentational = () => {
  return (
    <>
      <Header />
      <Container>
        <Stack>
          {/* 日付選択カレンダー */}
          <Box>日付選択カレンダー</Box>
          {/* 収支計算 */}
          <HStack>
            <CashFlowSummaryCard title='income' amount={500} />
            <Text>-</Text>
            <CashFlowSummaryCard title='expenses' amount={100} />
            <Text>=</Text>
            <CashFlowSummaryCard title='TOTAL' amount={400} />
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
