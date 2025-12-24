import { Card } from '@chakra-ui/react'

interface CashFlowSummaryCardProps {
  title: string
  amount: number
}

export const CashFlowSummaryCard = ({ title, amount }: CashFlowSummaryCardProps) => {
  return (
    <>
      <Card.Root w={'2xs'}>
        <Card.Header bg={'blue.100'} p={'2'}>
          <Card.Title fontSize={'sm'} fontWeight={'medium'}>
            {title}
          </Card.Title>
        </Card.Header>
        <Card.Body>{amount}円</Card.Body>
      </Card.Root>
    </>
  )
}
