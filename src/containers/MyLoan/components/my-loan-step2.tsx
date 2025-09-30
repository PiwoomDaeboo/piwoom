import { useRouter } from 'next/router'

import {
  AspectRatio,
  Box,
  Button,
  Container,
  Flex,
  HStack,
  SimpleGrid,
  Text,
  VStack,
  useDisclosure,
} from '@chakra-ui/react'

import { AuthRedirectLoader } from '@/components/AuthRedirectLoader'
import ImageAsNext from '@/components/ImageAsNext'
import { useLoanListQuery } from '@/generated/apis/Loan/Loan.query'
import { MY_IMAGES } from '@/generated/path/images'
import { useAuthRedirect } from '@/hooks/useAuthRedirect'

import CustomerInfoModal from './customer-info-modal'
import ElectronicContractModal from './electronic-contract-modal'

const MyLoanStep2 = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const router = useRouter()

  //  <iframe
  //           src={
  //             'https://app.modusign.co.kr/embedded-participant?di=bc615c10-92d2-11f0-b573-dd5faac0c738&pi=bccf8730-92d2-11f0-b573-dd5faac0c738&ci=MDEwOTc5Nzk3NDY&sm=SECURE_LINK&token=sha256.GjhqbFrTXWZsJ7T9t6OPQTXRIfZHDS1wLlShhRy4Yi4&expiry=1758532991884&redirectUrl=http%3A%2F%2Fapi.piwoom.com%2Fv1%2Floan%2F1%2Fsign_callback%2F'
  //           }
  //         ></iframe>

  const { data: loanList } = useLoanListQuery({
    variables: {
      query: {
        // status_in: [],
        limit: 10,
        offset: 0,
      },
    },
    options: {},
  })
  return (
    <Container>
      <CustomerInfoModal isOpen={isOpen} onClose={onClose} />

      <Flex
        pt={{ base: '40px', sm: '48px', md: '80px' }}
        pb={'120px'}
        flexDir={'column'}
      >
        <VStack alignItems={'flex-start'} spacing={'8px'}>
          <Text textStyle={'pre-heading-2'} color={'grey.10'}>
            전자계약 리스트
          </Text>
          <Text textStyle={'pre-body-6'} color={'grey.7'}>
            아래 대출계약 건의 전자계약을 체결하시면 대출 금액이 송금됩니다.
          </Text>
        </VStack>
        <VStack
          mt={'32px'}
          bg={'background.basic.2'}
          borderRadius={'20px'}
          p={{ base: '28px 16px', sm: '32px 40px' }}
        >
          <Text textStyle={'pre-heading-2'} color={'primary.4'}>
            고객님은 총{' '}
            <Box as="span" color={'primary.4'}>
              1건
            </Box>
            의 대출계약이 있습니다.
          </Text>
          <Text textStyle={'pre-body-6'} color={'grey.7'} textAlign={'center'}>
            전자계약서 작성 버튼을 클릭하여 계약서 작성을 진행해 주세요.
          </Text>
          <Flex
            mt={'24px'}
            w={'100%'}
            flexDir={'column'}
            p={{ base: '20px', sm: '20px 32px' }}
            bg={'background.basic.1'}
            borderRadius={'20px'}
            gap={'24px'}
            boxShadow={'0 8px 50px 0 rgba(0, 46, 114, 0.10)'}
          >
            <HStack justifyContent={'space-between'} spacing={'6px'}>
              <Text textStyle={'pre-heading-4'} color={'primary.3'}>
                123-45678-911
              </Text>
              <Button
                // onClick={onElectronicContractModalOpen}
                onClick={onOpen}
                // onClick={() => router.push('/my-loan?step=3')}
                variant={'solid-primary'}
              >
                전자계약서 작성
              </Button>
            </HStack>
            <SimpleGrid
              columns={{ base: 1, sm: 2 }}
              p={'10px 20px'}
              bg={'background.basic.2'}
              borderRadius={'10px'}
              gap={'2px'}
            >
              <HStack justifyContent={'flex-start'} alignItems={'center'}>
                <Text textStyle={'pre-body-7'} color={'grey.9'}>
                  • 채무자:
                </Text>
                <Text textStyle={'pre-body-6'} color={'grey.9'}>
                  홍길동
                </Text>
              </HStack>
              <HStack justifyContent={'flex-start'} alignItems={'center'}>
                <Text textStyle={'pre-body-7'} color={'grey.9'}>
                  • 대출원금:
                </Text>
                <Text textStyle={'pre-body-6'} color={'grey.9'}>
                  홍길동
                </Text>
              </HStack>
              <HStack justifyContent={'flex-start'} alignItems={'center'}>
                <Text textStyle={'pre-body-7'} color={'grey.9'}>
                  • 대출종류:
                </Text>
                <Text textStyle={'pre-body-6'} color={'grey.9'}>
                  홍길동
                </Text>
              </HStack>
              <HStack justifyContent={'flex-start'} alignItems={'center'}>
                <Text textStyle={'pre-body-7'} color={'grey.9'}>
                  • 대출만기:
                </Text>
                <Text textStyle={'pre-body-6'} color={'grey.9'}>
                  홍길동
                </Text>
              </HStack>
              <HStack justifyContent={'flex-start'} alignItems={'center'}>
                <Text textStyle={'pre-body-7'} color={'grey.9'}>
                  • 상환방식:
                </Text>
                <Text textStyle={'pre-body-6'} color={'grey.9'}>
                  홍길동
                </Text>
              </HStack>
              <HStack justifyContent={'flex-start'} alignItems={'center'}>
                <Text textStyle={'pre-body-7'} color={'grey.9'}>
                  • 상환방식:
                </Text>
                <Text textStyle={'pre-body-6'} color={'grey.9'}>
                  이자율
                </Text>
              </HStack>
            </SimpleGrid>
          </Flex>
          <Box w={'100%'} h={'1px'} bg={'border.basic.1'} my={'32px'} />

          <Text textStyle={'pre-heading-2'} color={'primary.4'}>
            대출 심사 중
          </Text>
          <Text textStyle={'pre-body-6'} color={'grey.7'}>
            심사 완료 후 전자계약 체결이 가능해요.
          </Text>
          <Flex
            mt={'24px'}
            w={'100%'}
            flexDir={'column'}
            p={'20px 32px'}
            borderRadius={'20px'}
            gap={'24px'}
            bg={'grey.2'}
          >
            <HStack
              justifyContent={'space-between'}
              spacing={'6px'}
              mb={'24px'}
            >
              <Text textStyle={'pre-heading-4'} color={'grey.5'}>
                대출 신청 조건
              </Text>
              <Button variant={'solid-primary'} isDisabled={true}>
                전자계약서 작성
              </Button>
            </HStack>
            <SimpleGrid
              columns={{ base: 1, sm: 2 }}
              p={'10px 20px'}
              //   bg={'background.basic.2'}
              bg={'rgba(27, 28, 29, 0.05)'}
              borderRadius={'10px'}
              gap={'2px'}
            >
              <HStack justifyContent={'flex-start'} alignItems={'center'}>
                <Text textStyle={'pre-body-7'} color={'grey.9'}>
                  • 채무자:
                </Text>
                <Text textStyle={'pre-body-6'} color={'grey.9'}>
                  홍길동
                </Text>
              </HStack>
              <HStack justifyContent={'flex-start'} alignItems={'center'}>
                <Text textStyle={'pre-body-7'} color={'grey.9'}>
                  • 대출원금:
                </Text>
                <Text textStyle={'pre-body-6'} color={'grey.9'}>
                  홍길동
                </Text>
              </HStack>
              <HStack justifyContent={'flex-start'} alignItems={'center'}>
                <Text textStyle={'pre-body-7'} color={'grey.9'}>
                  • 대출종류:
                </Text>
                <Text textStyle={'pre-body-6'} color={'grey.9'}>
                  홍길동
                </Text>
              </HStack>
              <HStack justifyContent={'flex-start'} alignItems={'center'}>
                <Text textStyle={'pre-body-7'} color={'grey.9'}>
                  • 대출만기:
                </Text>
                <Text textStyle={'pre-body-6'} color={'grey.9'}>
                  홍길동
                </Text>
              </HStack>
              <HStack justifyContent={'flex-start'} alignItems={'center'}>
                <Text textStyle={'pre-body-7'} color={'grey.9'}>
                  • 상환방식:
                </Text>
                <Text textStyle={'pre-body-6'} color={'grey.9'}>
                  홍길동
                </Text>
              </HStack>
            </SimpleGrid>
          </Flex>

          {/* <Flex
            w={'100%'}
            justifyContent={'center'}
            pt={'40px'}
            borderTop={'1px solid'}
            borderColor={'border.basic.1'}
          >
            <Button
              variant={'solid-primary'}
              w={'160px'}
              onClick={() => router.push('/my-loan?step=3')}
            >
              다음
            </Button>
          </Flex> */}
        </VStack>
      </Flex>
    </Container>
  )
}

export default MyLoanStep2
