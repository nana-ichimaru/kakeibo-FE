import { Box, Container, HStack, Stack, Text, Button, CloseButton, Dialog, Portal } from '@chakra-ui/react'
import { CashFlowSummaryCard } from './ui/CashFlowSummaryCard'
import { CashFlowsTab } from './ui/CashFlowsTab'
import { HEADER_HEIGHT } from '@/share/constants/layout/header'
import type { CashFlowItemView } from './types/CashFlowItemView'
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
  }
}

//食べたもの　data
export const RootPresentational = ({ data }: RootPresentationalProps) => {
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
            {/* 消化過程 data.summary.totalIncome*/}
            <CashFlowSummaryCard data={{ title: 'income', amount: data.summary.totalIncome }} />
            <Text>-</Text>
            <CashFlowSummaryCard data={{ title: 'expenses', amount: data.summary.totalExpense }} />
            <Text>=</Text>
            <CashFlowSummaryCard data={{ title: 'TOTAL', amount: data.summary.total }} />
          </HStack>
          {/* 収支新規登録ボタン */}
          <Box>収支新規登録ボタン</Box>
          {/* 収支切り替えタブ（収支一覧テーブル表示切り替え） */}
          <CashFlowsTab data={{ income: data.income, expense: data.expense }} />
        </Stack>
        <Dialog.Root>
          <Dialog.Trigger asChild>
            <Button variant='outline' size='sm'>
              Open Dialog
            </Button>
          </Dialog.Trigger>
          <Portal>
            <Dialog.Backdrop />
            <Dialog.Positioner>
              <Dialog.Content>
                <Dialog.Header>
                  <Dialog.Title>Dialog Title</Dialog.Title>
                </Dialog.Header>
                <Dialog.Body>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
                    incididunt ut labore et dolore magna aliqua.
                  </p>
                </Dialog.Body>
                <Dialog.Footer>
                  <Dialog.ActionTrigger asChild>
                    <Button variant='outline'>Cancel</Button>
                  </Dialog.ActionTrigger>
                  <Button>Save</Button>
                </Dialog.Footer>
                <Dialog.CloseTrigger asChild>
                  <CloseButton size='sm' />
                </Dialog.CloseTrigger>
              </Dialog.Content>
            </Dialog.Positioner>
          </Portal>
        </Dialog.Root>
      </Container>
    </>
  )
}
