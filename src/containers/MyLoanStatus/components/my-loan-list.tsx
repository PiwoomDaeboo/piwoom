import { useEffect, useMemo, useState } from 'react'

import { useRouter } from 'next/router'

import {
  Badge,
  Box,
  Button,
  Flex,
  HStack,
  SimpleGrid,
  Text,
  VStack,
  useDisclosure,
} from '@chakra-ui/react'

import LoanDelayModal from '@/components/@Modal/loan-delay-modal'
import { LOAN_KIND_OPTIONS, LOAN_STATUS } from '@/constants/loan'
import { LoanType } from '@/generated/apis/@types/data-contracts'
import { useLoanContractUrlRetrieveQuery } from '@/generated/apis/Loan/Loan.query'
import { CaretRightIcon } from '@/generated/icons/MyIcons'
import { useLocalStorage } from '@/stores/local/state'
import { formatDate } from '@/utils/date-format'
import {
  getAdditionalDocumentButtonVisibility,
  getBadgeStyle,
  getContractDownloadButtonVisibility,
  getDocumentRequestButtonVisibility,
  getRepaymentButtonVisibility,
  getScheduleButtonVisibility,
} from '@/utils/style-utils'

interface MyLoanListProps {
  loanList: LoanType[]
}

export default function MyLoanList({ loanList }: MyLoanListProps) {
  const router = useRouter()
  const { reset } = useLocalStorage()
  const {
    isOpen: isLoanDelayOpen,
    onClose: onLoanDelayClose,
    onOpen: onDelayOpen,
  } = useDisclosure()
  const [isDownloading, setIsDownloading] = useState(false)
  const [contractDownloadId, setContractDownloadId] = useState<string | null>(
    null,
  )
  const getLoanStatus = (status: string): boolean => {
    if (
      status === 'UNDER_REVIEW' ||
      // status === 'CONTRACTING' ||
      // status === 'REMITTING' ||
      status === 'REJECTED'
    ) {
      return false
    } else return true
  }

  const { data: contractDownloadData } = useLoanContractUrlRetrieveQuery({
    variables: {
      id: Number(contractDownloadId),
    },
    options: {
      enabled: !!contractDownloadId && isDownloading,
    },
  })

  useEffect(() => {
    if (contractDownloadData?.url && isDownloading) {
      // presigned URL에서 파일을 fetch로 받아서 다운로드
      const downloadFile = async () => {
        try {
          const response = await fetch(contractDownloadData.url)
          const blob = await response.blob()

          // 서버에서 제공한 파일명 추출
          let filename = `피움대부_계약서_${contractDownloadId}.pdf` // 기본값

          // Content-Disposition 헤더에서 파일명 추출
          const contentDisposition = response.headers.get('Content-Disposition')
          if (contentDisposition) {
            const filenameMatch = contentDisposition.match(
              /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/,
            )
            if (filenameMatch && filenameMatch[1]) {
              filename = filenameMatch[1].replace(/['"]/g, '')
            }
          }

          // URL에서 파일명 추출 (Content-Disposition이 없는 경우)
          if (filename === `피움대부_계약서_${contractDownloadId}.pdf`) {
            const urlPath = new URL(contractDownloadData.url).pathname
            const urlFilename = urlPath.split('/').pop()
            if (urlFilename && urlFilename.includes('.')) {
              filename = urlFilename
            }
          }

          // Blob URL 생성
          const blobUrl = window.URL.createObjectURL(blob)

          // 다운로드 링크 생성 및 클릭
          const link = document.createElement('a')
          link.href = blobUrl
          link.download = filename
          document.body.appendChild(link)
          link.click()

          // 정리
          document.body.removeChild(link)
          window.URL.revokeObjectURL(blobUrl)
        } catch (error) {
          console.error('파일 다운로드 실패:', error)
        } finally {
          // 상태 초기화
          setIsDownloading(false)
          setContractDownloadId(null)
        }
      }

      downloadFile()
    }
  }, [contractDownloadData, isDownloading, contractDownloadId])

  const handleContractDownload = (id: string) => {
    setIsDownloading(true)
    setContractDownloadId(id.toString())
  }

  const handleRepayment = (status: string, id: number) => {
    if (status === 'OVERDUE') {
      onDelayOpen()
    } else {
      router.push(`/my-loan-status/prepayment/${id}`)
    }
  }

  const isStatusReviewAndRejected = (status: string): boolean => {
    return status === 'UNDER_REVIEW' || status === 'REJECTED' ? true : false
  }
  const isStatusInProgressAndOverdue = (status: string): boolean => {
    return status === 'IN_PROGRESS' || status === 'OVERDUE' ? true : false
  }

  return (
    <>
      <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} gap={'20px'}>
        <LoanDelayModal isOpen={isLoanDelayOpen} onClose={onLoanDelayClose} />
        {loanList?.map((item, index: number) => (
          <Flex
            key={index}
            flexDirection={'column'}
            p={'24px 32px'}
            borderRadius={'32px'}
            boxShadow={'0 8px 50px 0 rgba(0, 46, 114, 0.10)'}
          >
            <HStack
              w={'100%'}
              justifyContent={'space-between'}
              alignItems={'flex-start'}
            >
              <VStack alignItems={'flex-start'}>
                <Badge
                  variant={'subtle_primary'}
                  sx={getBadgeStyle(item.status)}
                >
                  {
                    LOAN_STATUS.find((status) => status.value === item.status)
                      ?.label
                  }
                </Badge>
                <Text>
                  {isStatusReviewAndRejected(item.status) ?
                    (
                      item.status === 'UNDER_REVIEW' ||
                      item.status === 'REJECTED'
                    ) ?
                      '신청번호'
                    : '계약번호'
                  : '계약번호'}
                  <Box as="span" ml={'8px'} color={'primary.4'}>
                    {item.no}
                  </Box>
                </Text>
              </VStack>
              {getLoanStatus(item.status) && (
                <Flex
                  justifyContent={'center'}
                  alignItems={'center'}
                  w={'40px'}
                  h={'40px'}
                  borderRadius={'50%'}
                  border={'1px solid'}
                  borderColor={'primary.4'}
                  cursor={'pointer'}
                  onClick={() => router.push(`/my-loan-status/${item?.id}`)}
                >
                  <CaretRightIcon boxSize={'24px'} color={'primary.4'} />
                </Flex>
              )}
            </HStack>
            {isStatusReviewAndRejected(item.status) ?
              <Flex flexDirection={'column'} w={'100%'} gap={'6px'} mt={'20px'}>
                <HStack justifyContent={'space-between'}>
                  <Text textStyle={'pre-body-6'} color={'grey.10'}>
                    대출 상품
                  </Text>
                  <Text textStyle={'pre-body-5'} color={'grey.10'}>
                    {LOAN_KIND_OPTIONS.find((kind) => kind.value === item?.kind)
                      ?.label || '-'}{' '}
                    대출
                  </Text>
                </HStack>
                <HStack justifyContent={'space-between'}>
                  <Text textStyle={'pre-body-6'} color={'grey.10'}>
                    대출 신청액
                  </Text>
                  <Text textStyle={'pre-body-5'} color={'grey.10'}>
                    {item?.contract?.amount?.toLocaleString() ||
                      item?.loanAmount?.toLocaleString() ||
                      0}
                    원
                  </Text>
                </HStack>
                <HStack justifyContent={'space-between'}>
                  <Text textStyle={'pre-body-6'} color={'grey.10'}>
                    대출 신청일
                  </Text>
                  <Text textStyle={'pre-body-5'} color={'grey.10'}>
                    {item?.contract?.loanDate ||
                      formatDate({
                        date: new Date(item.createdAt),
                        format: 'YYYY-MM-DD',
                      }) ||
                      '-'}
                  </Text>
                </HStack>
              </Flex>
            : <Flex flexDirection={'column'} w={'100%'} gap={'6px'} mt={'20px'}>
                <HStack justifyContent={'space-between'}>
                  <Text textStyle={'pre-body-6'} color={'grey.10'}>
                    대출 금액
                  </Text>
                  <Text textStyle={'pre-body-5'} color={'grey.10'}>
                    {item?.contract?.remainingAmount?.toLocaleString() || 0}원
                  </Text>
                </HStack>
                <HStack justifyContent={'space-between'}>
                  <Text textStyle={'pre-body-6'} color={'grey.10'}>
                    다음 갚는날
                  </Text>
                  <Text textStyle={'pre-body-5'} color={'grey.10'}>
                    {item?.contract?.nextScheduleDate || '-'}
                  </Text>
                </HStack>
                <HStack justifyContent={'space-between'}>
                  <Text textStyle={'pre-body-6'} color={'grey.10'}>
                    다음 갚을 금액
                  </Text>
                  <Text textStyle={'pre-body-5'} color={'grey.10'}>
                    {item?.contract?.nextScheduleAmount?.toLocaleString() || 0}
                    원
                  </Text>
                </HStack>
              </Flex>
            }
            <Flex
              flexDirection={
                isStatusInProgressAndOverdue(item.status) ? 'column-reverse' : (
                  'column'
                )
              }
            >
              <SimpleGrid
                // visibility={'hidden'}
                visibility={'visible'}
                columns={2}
                gap={'8px'}
                mt={'10px'}
              >
                <Button
                  visibility={getRepaymentButtonVisibility(item.status)}
                  variant={'outline-secondary'}
                  onClick={() => {
                    handleRepayment(item?.status, item?.id)
                  }}
                >
                  <Text textStyle={'pre-body-7'} color={'grey.8'}>
                    중도 상환 신청
                  </Text>
                </Button>
                <Button
                  visibility={getContractDownloadButtonVisibility(item.status)}
                  variant={'outline-secondary'}
                  onClick={() => handleContractDownload(item?.id.toString())}
                >
                  <Text textStyle={'pre-body-7'} color={'grey.8'}>
                    계약서 다운로드
                  </Text>
                </Button>
              </SimpleGrid>
              <SimpleGrid columns={2} gap={'8px'} mt={'10px'}>
                <Button
                  visibility={getScheduleButtonVisibility(item.status)}
                  variant={'outline-secondary'}
                  onClick={() => {
                    router.push(
                      `/my-loan-status/${item?.id}?detailMenu=schedule`,
                    )
                  }}
                >
                  <Text textStyle={'pre-body-7'} color={'grey.8'}>
                    상환 스케줄 확인
                  </Text>
                </Button>
                <Button
                  visibility={getDocumentRequestButtonVisibility(item.status)}
                  variant={'outline-secondary'}
                  onClick={() => {
                    window.open('http://pf.kakao.com/_xkxoben/chat', '_blank')
                  }}
                >
                  <Text textStyle={'pre-body-7'} color={'grey.8'}>
                    기타서류 발급 요청
                  </Text>
                </Button>
              </SimpleGrid>
            </Flex>
            <Button
              // visibility={getAdditionalDocumentButtonVisibility(item.status)}
              mt={'10px'}
              variant={'outline-secondary'}
              w={'100%'}
              onClick={() => {
                reset('popup_status')
                router.push(`/my-loan-status/${item?.id}?detailMenu=document`)
              }}
            >
              <Text textStyle={'pre-body-7'} color={'grey.8'}>
                추가서류 제출
              </Text>
            </Button>
          </Flex>
        ))}
      </SimpleGrid>
    </>
  )
}
