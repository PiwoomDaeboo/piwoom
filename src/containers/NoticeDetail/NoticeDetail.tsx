import { useRouter } from 'next/router'

import {
  Box,
  Button,
  Container,
  Flex,
  HStack,
  Text,
  VStack,
} from '@chakra-ui/react'

import { useNoticeRetrieveQuery } from '@/generated/apis/Notice/Notice.query'
import { PaperclipIcon } from '@/generated/icons/MyIcons'
import { formatDate } from '@/utils/date-format'

function NoticeDetail() {
  const router = useRouter()
  const { id } = router.query
  const { data: noticeDetail } = useNoticeRetrieveQuery({
    variables: {
      id: Number(id),
    },
  })

  const handleFileDownload = (file: { name: string; path: string }) => {
    if (!file.path) {
      alert('파일이 존재하지 않습니다.')
      return
    }

    const link = document.createElement('a')
    link.href = file.path
    link.download = file.name
    link.target = '_blank'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <>
      <Container>
        <Flex
          pt={{ base: '34px', sm: '72px', md: '80px' }}
          pb={{ base: '80px', sm: '120px' }}
          flexDir={'column'}
        >
          <VStack
            borderBottom={'1px solid'}
            borderColor={'border.basic.1'}
            pb={'40px'}
            alignItems={'center'}
            spacing={'16px'}
          >
            <Text textStyle={'pre-body-6'}>
              {formatDate({
                date: new Date(noticeDetail?.createdAt || '-'),
                format: 'YYYY. MM. DD',
              })}
            </Text>
            <Text textStyle={'pre-display-4'}>
              {noticeDetail?.title || '-'}
            </Text>
          </VStack>
          <Box
            py={'56px'}
            minH={'473px'}
            whiteSpace={'pre-line'}
            dangerouslySetInnerHTML={{
              __html: noticeDetail?.description as string,
            }}
          />
          {noticeDetail?.fileSet && noticeDetail.fileSet.length > 0 && (
            <Flex pb={'56px'} gap={'40px'}>
              <Text textStyle={'pre-body-5'} color={'grey.10'}>
                첨부파일
              </Text>
              <VStack alignItems={'flex-start'} spacing={'8px'}>
                {noticeDetail.fileSet.map((file, index) => (
                  <HStack
                    key={index}
                    gap={'8px'}
                    as={'a'}
                    cursor={'pointer'}
                    onClick={() => handleFileDownload(file)}
                  >
                    <PaperclipIcon boxSize={'16px'} />
                    <Text>{file.name}</Text>
                  </HStack>
                ))}
              </VStack>
            </Flex>
          )}

          <Flex
            borderTop={'1px solid'}
            borderBottom={'1px solid'}
            borderColor={'grey.2'}
            py={{ base: '27px', sm: '27px' }}
            w={'100%'}
            justifyContent={'space-between'}
            _hover={{ bg: 'grey.1' }}
            cursor={'pointer'}
          >
            <HStack gap={'56px'}>
              <Text
                display={{ base: 'none', sm: 'block' }}
                textStyle={'pre-body-5'}
                color={'grey.10'}
              >
                다음글
              </Text>

              <Text textStyle={'pre-body-4'} color={'grey.10'}>
                {noticeDetail?.nextNotice?.title || '다음 글이 없습니다.'}
              </Text>
            </HStack>
          </Flex>

          <Flex
            py={{ base: '27px', sm: '27px' }}
            w={'100%'}
            justifyContent={'space-between'}
            _hover={{ bg: 'grey.1' }}
            cursor={'pointer'}
          >
            <HStack gap={'56px'}>
              <Text
                display={{ base: 'none', sm: 'block' }}
                textStyle={'pre-body-5'}
                color={'grey.10'}
              >
                이전글
              </Text>
              <Text textStyle={'pre-body-4'} color={'grey.10'}>
                {noticeDetail?.prevNotice?.title || '이전 글이 없습니다.'}
              </Text>
            </HStack>
          </Flex>

          <Flex justifyContent={'center'} mt={'40px'}>
            <Button
              variant={'solid-primary'}
              w={'160px'}
              size={'lg'}
              onClick={() => router.back()}
            >
              목록
            </Button>
          </Flex>
        </Flex>
      </Container>
    </>
  )
}
export default NoticeDetail
