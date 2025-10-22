import React from 'react'

import { Button, Flex, HStack, Text } from '@chakra-ui/react'

import { CaretLeftIcon, CaretRightIcon } from '@/generated/icons/MyIcons'

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  showPages?: number
}

export const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  showPages = 3,
}: PaginationProps) => {
  const getVisiblePages = () => {
    // 페이지가 5개 이하면 모든 페이지 표시
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1)
    }

    const pages: (number | string)[] = []

    // 첫 페이지는 항상 표시
    pages.push(1)

    // 현재 페이지 주변 페이지들 계산 (showPages 개수만큼)
    const halfPages = Math.floor(showPages / 2)
    let startPage = Math.max(2, currentPage - halfPages)
    let endPage = Math.min(totalPages - 1, currentPage + halfPages)

    // 현재 페이지가 앞쪽에 있을 때
    if (currentPage <= halfPages + 2) {
      startPage = 2
      endPage = Math.min(totalPages - 1, showPages + 1)
    }
    // 현재 페이지가 뒤쪽에 있을 때
    else if (currentPage >= totalPages - halfPages - 1) {
      startPage = Math.max(2, totalPages - showPages)
      endPage = totalPages - 1
    }

    // 첫 페이지와 현재 페이지 주변 사이에 '...' 표시
    if (startPage > 2) {
      pages.push('...')
    }

    // 현재 페이지 주변 페이지들 표시
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i)
    }

    // 현재 페이지 주변과 마지막 페이지 사이에 '...' 표시
    if (endPage < totalPages - 1) {
      pages.push('...')
    }

    // 마지막 페이지는 항상 표시
    pages.push(totalPages)

    return pages
  }

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1)
    }
  }

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1)
    }
  }

  const visiblePages = getVisiblePages()
  const isPreviousDisabled = currentPage === 1
  const isNextDisabled = currentPage === totalPages

  return (
    <HStack gap={{ base: '1', md: '2' }} alignItems="center">
      <Button
        variant={'none'}
        onClick={handlePrevious}
        p={{ base: '0px 8px 0px 4px', md: '0px 15px 0px 5px' }}
        disabled={isPreviousDisabled}
      >
        <CaretLeftIcon
          boxSize={{ base: '20px', md: '24px' }}
          color={'grey.5'}
        />
      </Button>

      {/* 페이지 번호들 */}
      <Flex align={'center'} gap={{ base: '1', md: '2' }}>
        {visiblePages.map((page, index) => (
          <React.Fragment key={`${page}-${index}`}>
            {page === '...' ?
              <Text
                // px={{ base: '2', md: '3' }}
                py="2"
                textStyle={'pre-caption-1'}
                color={'grey.8'}
                textAlign="center"
              >
                ...
              </Text>
            : <Button
                borderRadius={'100%'}
                variant={page === currentPage ? 'solid-primary' : 'ghost'}
                onClick={() => onPageChange(page as number)}
                boxSize={'48px'}
                p="0"
              >
                <Text
                  textStyle={'pre-caption-1'}
                  color={page === currentPage ? 'grey.0' : 'grey.8'}
                >
                  {page}
                </Text>
              </Button>
            }
          </React.Fragment>
        ))}
      </Flex>

      <Button
        boxSize={'32px'}
        variant={'none'}
        p={{ base: '0px 4px 0px 8px', md: '0px 5px 0px 15px' }}
        onClick={handleNext}
        disabled={isNextDisabled}
      >
        <CaretRightIcon
          boxSize={{ base: '20px', md: '24px' }}
          color={'grey.5'}
        />
      </Button>
    </HStack>
  )
}
