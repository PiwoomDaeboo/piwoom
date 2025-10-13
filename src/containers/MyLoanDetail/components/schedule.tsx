import { useCallback, useEffect, useRef, useState } from 'react'

import { useRouter } from 'next/router'

import {
  Badge,
  Box,
  Button,
  Container,
  Flex,
  HStack,
  Skeleton,
  Spinner,
  Text,
  VStack,
} from '@chakra-ui/react'

import { CaretLeftIcon } from '@/generated/icons/MyIcons'

// Mock data 타입 정의
interface ScheduleItem {
  id: number
  round: number
  interest: number
  date: string
}

// Mock data 생성 함수 (총 120회차 가정)
const generateMockScheduleData = (
  start: number,
  count: number,
): ScheduleItem[] => {
  const baseDate = new Date('2025-12-12')
  return Array.from({ length: count }, (_, index) => {
    const round = start + index
    const date = new Date(baseDate)
    date.setMonth(date.getMonth() + round - 1)

    return {
      id: round,
      round,
      interest: Math.floor(Math.random() * 200000) + 400000, // 400,000 ~ 600,000원
      date: date.toISOString().split('T')[0].replace(/-/g, '.'),
    }
  })
}

const ITEMS_PER_PAGE = 15
const TOTAL_ITEMS = 120

export default function Schedule() {
  const router = useRouter()
  const [scheduleData, setScheduleData] = useState<ScheduleItem[]>([])
  const [page, setPage] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const observerRef = useRef<IntersectionObserver | null>(null)
  const loadMoreRef = useRef<HTMLDivElement | null>(null)

  // 초기 데이터 로드
  useEffect(() => {
    const initialData = generateMockScheduleData(1, ITEMS_PER_PAGE)
    setScheduleData(initialData)
  }, [])

  // 추가 데이터 로드 함수
  const loadMore = useCallback(() => {
    if (isLoading || !hasMore) return

    setIsLoading(true)

    // API 호출 시뮬레이션
    setTimeout(() => {
      const currentLength = scheduleData.length

      if (currentLength >= TOTAL_ITEMS) {
        setHasMore(false)
        setIsLoading(false)
        return
      }

      const nextData = generateMockScheduleData(
        currentLength + 1,
        Math.min(ITEMS_PER_PAGE, TOTAL_ITEMS - currentLength),
      )

      setScheduleData((prev) => [...prev, ...nextData])
      setPage((prev) => prev + 1)
      setIsLoading(false)

      if (currentLength + nextData.length >= TOTAL_ITEMS) {
        setHasMore(false)
      }
    }, 200)
  }, [scheduleData.length, isLoading, hasMore])

  // Intersection Observer 설정
  useEffect(() => {
    if (observerRef.current) {
      observerRef.current.disconnect()
    }

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const target = entries[0]
        if (target.isIntersecting && hasMore && !isLoading) {
          loadMore()
        }
      },
      {
        root: null,
        rootMargin: '200px',
        threshold: 0.1,
      },
    )

    if (loadMoreRef.current) {
      observerRef.current.observe(loadMoreRef.current)
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [hasMore, isLoading, loadMore])

  return (
    <Flex flexDir={'column'} w={'100%'}>
      <Flex
        w={'100%'}
        borderRadius={'32px'}
        boxShadow={'0 8px 50px 0 rgba(0, 46, 114, 0.10)'}
        p={{ base: '20px 28px', sm: '20px 48px', md: '40px 64px' }}
        bg={'grey.0'}
        flexDir={'column'}
        justifyContent={'center'}
        alignItems={'flex-start'}
      >
        <HStack
          pb={'20px'}
          borderBottom={'1px solid'}
          borderColor={'border.basic.1'}
          w={'100%'}
          justifyContent={'space-between'}
        >
          <VStack w={'100%'} alignItems={'flex-start'}>
            <Flex alignItems={'center'} gap={'8px'}>
              <Button
                variant={'none'}
                p={'8px'}
                onClick={() => router.push('/my-loan-status')}
              >
                <CaretLeftIcon boxSize={'24px'} />
              </Button>
              <Text textStyle={'pre-heading-2'} color={'grey.10'}>
                상환 스케줄
              </Text>
            </Flex>
            <Text textStyle={'pre-body-6'} color={'grey.7'}>
              선납, 중도상환, 금리 변경 등에 따라 보여지는 금액과 다를 수
              있어요.
            </Text>
          </VStack>
        </HStack>

        <Box w={'100%'} mt={'32px'}>
          <VStack gap={'16px'} alignItems={'stretch'}>
            {scheduleData.map((item) => (
              <Flex
                key={item.id}
                w={'100%'}
                justifyContent={'space-between'}
                alignItems={{ base: 'flex-end', sm: 'center' }}
                borderRadius={'12px'}
                bg={'background.basic.2'}
                p={{ base: '16px 20px', sm: '14.5px 24px', md: '14.5px 40px' }}
              >
                <Flex
                  flexDir={{ base: 'column', sm: 'row' }}
                  gap={{ base: '10px', sm: '80px' }}
                  alignItems={{ base: 'flex-start', sm: 'center' }}
                >
                  <Text
                    minW={'60px'}
                    textStyle={'pre-body-4'}
                    color={'grey.10'}
                  >
                    {item.round}회차
                  </Text>
                  <Flex flexDir={'column'} alignItems={'flex-start'}>
                    <Text textStyle={'pre-caption-2'} color={'primary.3'}>
                      이자
                    </Text>
                    <Text
                      textStyle={'pre-body-3'}
                      color={'grey.10'}
                      textAlign={'right'}
                    >
                      {item.interest.toLocaleString()}원
                    </Text>
                  </Flex>
                </Flex>
                <Text textStyle={'pre-body-6'} color={'grey.7'}>
                  {item.date}
                </Text>
              </Flex>
            ))}
          </VStack>

          {/* Intersection Observer 타겟 */}
          {hasMore && (
            <Flex
              ref={loadMoreRef}
              w={'100%'}
              justifyContent={'center'}
              alignItems={'center'}
              py={'40px'}
            >
              {isLoading && <Spinner size={'lg'} color={'primary.3'} />}
            </Flex>
          )}

          {/* 모든 데이터 로드 완료 메시지 */}
          {!hasMore && scheduleData.length > 0 && (
            <Flex
              w={'100%'}
              justifyContent={'center'}
              alignItems={'center'}
              py={'40px'}
            >
              <Text textStyle={'pre-body-6'} color={'grey.6'}>
                전체 {TOTAL_ITEMS}개의 스케줄을 모두 불러왔습니다.
              </Text>
            </Flex>
          )}
        </Box>
      </Flex>
    </Flex>
  )
}
