import { Badge, Flex, Grid, Text, VStack } from '@chakra-ui/react'

import { CaretRightIcon } from '@/generated/icons/MyIcons'

interface ItemGridCardProps {
  items: {
    step: string
    icon: React.ElementType
    title: string
    description: string
  }[]
}

const ItemGridCard = ({ items }: ItemGridCardProps) => {
  return (
    <Grid
      templateColumns={{ base: '1fr', sm: '1fr 32px 1fr' }}
      rowGap={'24px'}
      columnGap={{ base: '0', sm: '16px' }}
      alignItems={'stretch'}
      justifyContent={{ base: 'center', sm: 'flex-start' }}
    >
      {items.map((item, index) => {
        const isEven = index % 2 === 0
        const isLast = index === items.length - 1

        return (
          <>
            {/* 절차 단계 카드 */}
            <Flex
              key={`step-${index}`}
              p={'24px 24px 28px 24px'}
              borderRadius={'20px'}
              boxShadow={'0 8px 50px 0 rgba(0, 46, 114, 0.10)'}
              flexDir={'column'}
            >
              <Flex justifyContent={'space-between'} alignItems={'flex-start'}>
                <VStack alignItems={'flex-start'}>
                  <Badge variant={'subtle_primary'}>{item.step}</Badge>
                  <Text textStyle={'pre-heading-3'}>{item.title}</Text>
                </VStack>
                {/* 데스크톱: 짝수 번째(0,2,4)에만 표시, 모바일: 마지막 제외하고 모두 표시 */}
                <Flex>
                  <item.icon boxSize={'60px'} />
                </Flex>
              </Flex>
              <Text mt={'4px'} textStyle={'pre-body-6'}>
                {item.description}
              </Text>
            </Flex>

            {/* 화살표 - 데스크톱: 마지막이 아니고 짝수 번째일 때만, 모바일: 마지막 제외하고 모두 */}
            <Flex
              display={{
                base: !isLast ? 'flex' : 'none',
                sm: !isLast && isEven ? 'flex' : 'none',
              }}
              justifyContent={'center'}
              alignItems={'center'}
              w={'100%'}
            >
              <Flex
                key={`arrow-${index}`}
                justifyContent={'center'}
                alignItems={'center'}
                bg={'primary.4'}
                width={'32px'}
                height={'32px'}
                borderRadius={'50%'}
                transform={{ base: 'rotate(90deg)', sm: 'none' }}
              >
                <CaretRightIcon boxSize={'24px'} color={'white'} />
              </Flex>
            </Flex>
          </>
        )
      })}
    </Grid>
  )
}

export default ItemGridCard
