import { Box, Container, HStack, Stack, Text, Tabs, ButtonGroup, IconButton, Pagination  } from '@chakra-ui/react'
import { CashFlowSummaryCard } from './ui/CashFlowSummaryCard'
import { HEADER_HEIGHT } from '@/share/constants/layout/header'
import type { CashFlowItemView } from './types/CashFlowItemView'
import { LuChevronLeft, LuChevronRight } from "react-icons/lu"
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
            <CashFlowSummaryCard title='income' amount={data.summary.totalIncome} />
            <Text>-</Text>
            <CashFlowSummaryCard title='expenses' amount={data.summary.totalExpense} />
            <Text>=</Text>
            <CashFlowSummaryCard title='TOTAL' amount={data.summary.total} />
          </HStack>
          {/* 収支新規登録ボタン */}
          <Box>収支新規登録ボタン</Box>
          {/* 収支切り替えタブ（収支一覧テーブル表示切り替え） */}
          <Tabs.Root defaultValue='income' variant='outline'>
            <Tabs.List>
              <Tabs.Trigger value='income'>income</Tabs.Trigger>
              <Tabs.Trigger value='expense'>expense</Tabs.Trigger>
            </Tabs.List>
            <Tabs.Content value='income'></Tabs.Content>
            <Tabs.Content value='expense'></Tabs.Content>
          </Tabs.Root>
        </Stack>
        <Pagination.Root count={20} pageSize={2} defaultPage={4}>
          <ButtonGroup variant='ghost' size='sm'>
            <Pagination.PrevTrigger asChild>
              <IconButton>
                <LuChevronLeft />
              </IconButton>
            </Pagination.PrevTrigger>

            <Pagination.Items
              render={(page) => (
                <IconButton variant={{ base: 'ghost', _selected: 'outline' }}>
                  {page.value}
                </IconButton>
              )}
            />

            <Pagination.NextTrigger asChild>
              <IconButton>
                <LuChevronRight />
              </IconButton>
            </Pagination.NextTrigger>
          </ButtonGroup>
        </Pagination.Root>
      </Container>
    </>
  )
}
