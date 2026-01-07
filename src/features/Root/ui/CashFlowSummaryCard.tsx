import { Card } from '@chakra-ui/react'

interface CashFlowSummaryCardProps {
  data: {
    title: string
    amount: number
  }
}

export const CashFlowSummaryCard = ({ data }: CashFlowSummaryCardProps) => {
  return (
    <>
      <Card.Root w={'2xs'}>
        <Card.Header bg={'blue.100'} p={'2'}>
          <Card.Title fontSize={'sm'} fontWeight={'medium'}>
            {data.title}
          </Card.Title>
        </Card.Header>
        <Card.Body>{data.amount}円</Card.Body>
      </Card.Root>
    </>
  )
}
