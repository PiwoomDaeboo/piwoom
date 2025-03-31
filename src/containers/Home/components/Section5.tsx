import { useEffect, useMemo, useState } from 'react'

import { Box, Button, Flex, Grid, Image, Text } from '@chakra-ui/react'

import { GalleryType } from '@/generated/apis/@types/data-contracts'
import { useCategoryListQuery } from '@/generated/apis/Category/Category.query'
import { useGalleryListQuery } from '@/generated/apis/Gallery/Gallery.query'
import { CaretdownIcon, Cube1Icon } from '@/generated/icons/MyIcons'

const Section5 = () => {
  const [selectedCategory, setSelectedCategory] = useState<number>(1)
  const [cursor, setCursor] = useState<string>('')
  const [accumulatedItems, setAccumulatedItems] = useState<GalleryType[]>([]) // 누적 데이터 저장
  const { data: categoryList } = useCategoryListQuery({})
  const list = useMemo(() => {
    return categoryList?.map((item) => item) || []
  }, [categoryList])
  const { data: galleryList } = useGalleryListQuery({
    variables: {
      query: {
        category_id: selectedCategory,
        cursor: cursor,
        page_size: 9,
      },
    },
  })

  useEffect(() => {
    if (galleryList?.results && cursor === '') {
      setAccumulatedItems(galleryList.results)
    }
  }, [cursor, galleryList?.results])

  // 더보기 버튼 클릭 핸들러
  const handleLoadMore = () => {
    if (galleryList?.cursor && galleryList.results) {
      setCursor(galleryList.cursor)
      setAccumulatedItems((prev) => [
        ...prev,
        ...(galleryList?.results as GalleryType[]),
      ])
    }
  }

  const handleCategorySelect = (id: number) => {
    setSelectedCategory(id)
    setCursor('')
    setAccumulatedItems([])
  }

  return (
    <Flex
      py={{ base: '80px', sm: '140px', md: '180px' }}
      px={{ base: '16px', sm: '30px', md: '60px' }}
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
              size={{ base: 'md', md: 'lg' }}
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
        {accumulatedItems?.length > 0 ?
          <Grid
            w="100%"
            h="100%"
            templateColumns={{
              base: 'repeat(2, 1fr)',
              md: 'repeat(3, 1fr)',
            }}
            gap="20px"
          >
            {accumulatedItems?.map((item) => {
              return (
                <Box key={item.id} role="group">
                  <ImageWithHover
                    mainImage={item.mainImage}
                    hoverImage={item.hoverImage}
                  />
                </Box>
              )
            })}
          </Grid>
        : <Flex
            w="100%"
            h={{ base: '264px', md: '290px' }}
            bg="background.basic.2"
            display="flex"
            justifyContent="center"
            alignItems="center"
            gap="8px"
            flexDirection="column"
          >
            <Cube1Icon boxSize="40px" color="content.5" />
            <Text textStyle="pre-body-04" color="content.5">
              등록된 갤러리가 없습니다.
            </Text>
          </Flex>
        }
      </Flex>
      <Button
        borderRadius={'full'}
        size={{ base: 'md', md: 'lg' }}
        textStyle={'pre-heading-05'}
        variant={'outline-primary'}
        border="1px solid"
        borderColor="border.basic.1"
        gap="4px"
        onClick={handleLoadMore}
      >
        <Text>더보기</Text>
        <CaretdownIcon boxSize="24px" />
        {/* <ChevronDownIcon /> */}
      </Button>
    </Flex>
  )
}

export default Section5

const ImageWithHover = ({
  mainImage,
  hoverImage,
}: {
  mainImage: string
  hoverImage: string
}) => {
  return (
    <Box
      position="relative"
      width="100%"
      paddingBottom="100%" // 1:1 비율 유지
    >
      <Image
        position="absolute"
        top={0}
        left={0}
        w="100%"
        h="100%"
        borderRadius="10px"
        objectFit="cover" // 이미지가 영역을 꽉 채우도록
        src={mainImage}
        alt={mainImage}
        transition="opacity 0.3s"
        _groupHover={{ opacity: 0 }}
      />
      <Image
        position="absolute"
        top={0}
        left={0}
        w="100%"
        h="100%"
        borderRadius="10px"
        objectFit="cover" // 이미지가 영역을 꽉 채우도록
        src={hoverImage}
        alt={hoverImage}
        opacity={0}
        transition="opacity 0.3s"
        _groupHover={{ opacity: 1 }}
      />
    </Box>
  )
}
