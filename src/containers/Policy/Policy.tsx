import { useRouter } from 'next/router'

import { Box, Container, Flex, Skeleton, Text } from '@chakra-ui/react'

import {
  DisclaimerRetrieveParamsEnumType,
  DisclaimerRetrieveParamsKindEnumTypeMap,
} from '@/generated/apis/@types/data-contracts'
import { useDisclaimerRetrieveQuery } from '@/generated/apis/Disclaimer/Disclaimer.query'

// PRIVACY_POLICY - 개인정보 처리방침
// LOAN_STANDARD_TERMS - 대부거래 표준약관
// ILLEGAL_DEBT_COLLECTION_RESPONSE - 불법채권추심대응요령
// EXTINCTION_DEBT_COLLECTION_NOTICE - 소멸시효완성채권추심관련안내
// TERMS_OF_SERVICE - 서비스이용약관
// DEBT_COLLECTION_SUPPORT_SYSTEM - 채권추심 관련 지원제도 안내
// DEBT_COLLECTION_PROCEDURE - 채권추심업무처리절차
// DEBT_COLLECTOR_OBLIGATIONS - 채권추심자의 의무와 추심에 관한 개인금융채무자의 권리

function Policy() {
  const { query } = useRouter()
  const { type } = query
  console.log(type)

  const typeString = Array.isArray(type) ? type[0] : type
  const kind = typeString?.toUpperCase() as DisclaimerRetrieveParamsEnumType

  const { data: policyData, isLoading } = useDisclaimerRetrieveQuery({
    variables: {
      kind,
    },
    options: {
      enabled: !!kind && !!query,
    },
  })

  const koreanTitle = kind ? DisclaimerRetrieveParamsKindEnumTypeMap[kind] : ''

  return (
    <Container>
      <Flex
        px={{ md: '190px' }}
        py={{ base: '48px', sm: '64px', md: '120px' }}
        w={'100%'}
        flexDirection={'column'}
        gap={'80px'}
        justifyContent={'center'}
        alignItems={'center'}
      >
        <Text textStyle={'pre-display-3'} color={'grey.10'}>
          {koreanTitle}
        </Text>
        {isLoading ?
          <Skeleton w={'100%'} h={'800px'} />
        : <Box
            dangerouslySetInnerHTML={{ __html: policyData?.body as string }}
            minH={'800px'}
          ></Box>
        }
      </Flex>
    </Container>
  )
}
export default Policy
