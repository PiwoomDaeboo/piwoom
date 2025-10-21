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
    const sidePages = Math.floor(showPages / 2) // 현재 페이지 양쪽에 표시할 페이지 수

    // 첫 페이지는 항상 표시
    pages.push(1)

    if (currentPage <= sidePages + 2) {
      // 현재 페이지가 앞쪽에 있을 때: 1, 2, 3, 4, ..., 마지막
      for (let i = 2; i <= Math.min(showPages, totalPages - 1); i++) {
        pages.push(i)
      }
      if (totalPages > showPages + 1) {
        pages.push('...')
        pages.push(totalPages)
      } else if (totalPages > showPages) {
        pages.push(totalPages)
      }
    } else if (currentPage >= totalPages - sidePages - 1) {
      // 현재 페이지가 뒤쪽에 있을 때: 1, ..., 마지막-3, 마지막-2, 마지막-1, 마지막
      if (totalPages > showPages + 1) {
        pages.push('...')
      }
      for (
        let i = Math.max(2, totalPages - showPages + 1);
        i <= totalPages;
        i++
      ) {
        pages.push(i)
      }
    } else {
      // 현재 페이지가 중간에 있을 때: 1, ..., 현재-1, 현재, 현재+1, ..., 마지막
      pages.push('...')
      for (let i = currentPage - sidePages; i <= currentPage + sidePages; i++) {
        if (i > 1 && i < totalPages) {
          pages.push(i)
        }
      }
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
