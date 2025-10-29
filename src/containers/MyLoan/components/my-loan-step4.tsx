import { useEffect, useState } from 'react'

import { useRouter } from 'next/router'

import { Button, Container, Flex, Text, VStack } from '@chakra-ui/react'

import { useLoanContractUrlRetrieveQuery } from '@/generated/apis/Loan/Loan.query'
import { BluecheckIcon } from '@/generated/icons/MyIcons'
import { useLocalStorage } from '@/stores/local/state'

function MyLoanStep4() {
  const router = useRouter()
  const { id } = router.query
  const { popup_status: safeKey, reset } = useLocalStorage()
  useEffect(() => {
    if (safeKey) {
      reset('popup_status')
    }
  }, [safeKey])
  const [isDownloading, setIsDownloading] = useState(false)
  const [contractDownloadId, setContractDownloadId] = useState<string | null>(
    null,
  )

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
          let filename = `${contractDownloadData.name}.pdf` // 기본값

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
          if (filename === `${contractDownloadData.name}.pdf`) {
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

  return (
    <Container maxW={'768px'}>
      <Flex
        py={{ base: '48px', sm: '64px', md: '120px' }}
        flexDir={'column'}
        justifyContent={'center'}
        alignItems={'center'}
        gap={'36px'}
      >
        <VStack alignItems={'center'} w={'100%'}>
          <BluecheckIcon boxSize={'100px'} />
          <Text
            textStyle={'pre-heading-1'}
            color={'grey.10'}
            textAlign={'center'}
          >
            전자계약서 작성 완료
          </Text>
        </VStack>
        <Flex
          w={'100%'}
          p={'20px 24px'}
          justifyContent={'center'}
          alignItems={'center'}
          flexDir={'column'}
          gap={'24px'}
          borderRadius={'20px'}
          border={'1px solid'}
          borderColor={'border.basic.1'}
        >
          <Text textStyle={'pre-body-6'} color={'grey.9'} textAlign={'center'}>
            전자계약서 작성이 완료되었습니다.
            <br />
            피움대부에서 확인 후 고객님께 대출금액 송금을 위해 연락드릴
            예정입니다.
          </Text>
          <Button
            onClick={() => handleContractDownload(id as string)}
            variant={'solid-primary'}
          >
            전자계약서 다운로드
          </Button>
        </Flex>
      </Flex>
    </Container>
  )
}
export default MyLoanStep4
