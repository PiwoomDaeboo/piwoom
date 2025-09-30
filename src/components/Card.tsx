import { Flex, FlexProps } from '@chakra-ui/react'

export default function Card({ children, ...props }: FlexProps) {
  return (
    <Flex
      cursor={'pointer'}
      p={{ base: '12px 20px', sm: '20px 24px', md: '28px 40px 48px 40px' }}
      bg={'grey.0'}
      {...props}
      borderRadius={'32px'}
      boxShadow={'0 8px 50px 0 rgba(0, 46, 114, 0.10)'}
    >
      {children}
    </Flex>
  )
}
