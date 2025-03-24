import { useMemo, useState } from 'react'

import { Badge, Box, Button, Flex, Grid, Text, VStack } from '@chakra-ui/react'

import { useCategoryListQuery } from '@/generated/apis/Category/Category.query'
import { CheckIcon } from '@/generated/icons/MyIcons'

const Section5 = () => {
  //   const { data: categoryList } = useCategoryListQuery({})
  //   const list = useMemo(() => {
  //     return categoryList?.map((item) => item) || []
  //   }, [categoryList])
  const [selectedCategory, setSelectedCategory] = useState<number>(1)
  const list = [
    {
      id: 1,
      title: '머그컵',
    },
    {
      id: 2,
      title: '글래스',
    },
    {
      id: 3,
      title: '접시',
    },
    {
      id: 4,
      title: '커피잔',
    },
    {
      id: 5,
      title: '박스 & 스티커',
    },
  ]

  const handleCategorySelect = (id: number) => {
    setSelectedCategory(id)
  }

  return (
    <Flex
      py={{ base: '80px', sm: '140px', md: '180px' }}
      flexDirection={'column'}
      alignItems={'center'}
      justifyContent={'center'}
      w="100%"
    >
      <Text textStyle="pre-display-03" mb="32px">
        MagiCube 갤러리
      </Text>
      <Flex
        gap="12px"
        overflowX="auto"
        pb="10px"
        w="100%"
        justifyContent={{ base: 'flex-start', md: 'center' }}
        sx={{
          '&::-webkit-scrollbar': { display: 'none' },
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          scrollBehavior: 'smooth',
          scrollSnapType: 'x mandatory',
          minWidth: '100%',
        }}
      >
        {list?.map((item) => {
          const isSelected = selectedCategory === item.id

          return (
            <Button
              key={item.id}
              borderRadius={'full'}
              variant={isSelected ? 'solid-primary' : 'outline-primary'}
              textStyle={'pre-heading-05'}
              onClick={() => handleCategorySelect(item.id)}
              flexShrink={0}
              minW="auto"
            >
              {item.title}
            </Button>
          )
        })}
      </Flex>
      <Flex w="100%" h="100%" py="56px">
        <Grid
          w="100%"
          h="100%"
          templateColumns={{
            base: 'repeat(2, 1fr)', // 모바일에서는 1열
            md: 'repeat(3, 1fr)',
          }}
          gap="20px"
        >
          <Box
            borderRadius="10px"
            bg="red"
            w="100%"
            minH={{ base: '220px', md: '319px' }}
            minW="160px"
            h="100%"
          >
            1
          </Box>
          <Box
            borderRadius="10px"
            bg="red"
            w="100%"
            minH={{ base: '220px', md: '319px' }}
            minW="160px"
            h="100%"
          >
            2
          </Box>
          <Box
            borderRadius="10px"
            bg="red"
            w="100%"
            minH={{ base: '220px', md: '319px' }}
            minW="160px"
            h="100%"
          >
            3
          </Box>
          <Box
            borderRadius="10px"
            bg="red"
            w="100%"
            minH={{ base: '220px', md: '319px' }}
            minW="160px"
            h="100%"
          >
            4
          </Box>
          <Box
            borderRadius="10px"
            bg="red"
            w="100%"
            minH={{ base: '220px', md: '319px' }}
            minW="160px"
            h="100%"
          >
            5
          </Box>
          <Box
            borderRadius="10px"
            bg="red"
            w="100%"
            minH={{ base: '220px', md: '319px' }}
            minW="160px"
            h="100%"
          >
            6
          </Box>
          <Box
            borderRadius="10px"
            bg="red"
            w="100%"
            minH={{ base: '220px', md: '319px' }}
            minW="160px"
            h="100%"
          >
            7
          </Box>
          <Box
            borderRadius="10px"
            bg="red"
            w="100%"
            minH={{ base: '220px', md: '319px' }}
            minW="160px"
            h="100%"
          >
            8
          </Box>
          <Box
            borderRadius="10px"
            bg="red"
            w="100%"
            minH={{ base: '220px', md: '319px' }}
            minW="160px"
            h="100%"
          >
            9
          </Box>
        </Grid>
      </Flex>
    </Flex>
  )
}

export default Section5
