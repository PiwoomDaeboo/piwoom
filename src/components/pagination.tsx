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
    if (totalPages <= showPages) {
      return Array.from({ length: totalPages }, (_, i) => i + 1)
    }

    const pages: (number | string)[] = []

    // 첫 페이지는 항상 표시
    pages.push(1)

    if (currentPage <= 3) {
      // 현재 페이지가 앞쪽에 있을 때
      pages.push(2, 3)
      if (totalPages > 3) {
        pages.push('...')
        pages.push(totalPages)
      }
    } else if (currentPage >= totalPages - 2) {
      // 현재 페이지가 뒤쪽에 있을 때
      if (totalPages > 3) {
        pages.push('...')
      }
      pages.push(totalPages - 2, totalPages - 1, totalPages)
    } else {
      // 현재 페이지가 중간에 있을 때
      pages.push('...')
      pages.push(currentPage - 1, currentPage, currentPage + 1)
      pages.push('...')
      pages.push(totalPages)
    }

    return pages.filter((page, index, arr) => arr.indexOf(page) === index)
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
                px={{ base: '2', md: '3' }}
                py="2"
                textStyle={'pre-caption-1'}
                color={'grey.2'}
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
