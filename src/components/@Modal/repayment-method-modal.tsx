import React from 'react'

import {
  AspectRatio,
  Box,
  Button,
  Flex,
  HStack,
  SimpleGrid,
  Text,
  VStack,
} from '@chakra-ui/react'

import ModalBasis from '@/components/@Modal/ModalBasis'
import ImageAsNext from '@/components/ImageAsNext'
import { MY_IMAGES } from '@/generated/path/images'

interface RepaymentMethodModalProps {
  isOpen: boolean
  onClose: () => void
}

function RepaymentMethodModal({ isOpen, onClose }: RepaymentMethodModalProps) {
  const handleConfirm = () => {
    onClose()
  }

  const handleClose = () => {
    onClose()
  }

  return (
    <ModalBasis
      isOpen={isOpen}
      visibleCloseButton={true}
      onClose={handleClose}
      styles={{
        body: {
          bg: 'grey.0',
        },
        footer: {
          bg: 'grey.0',
          borderRadius: { base: '0px', sm: '0px 0px 16px 16px' },
        },
      }}
      size={{ base: 'full', sm: 'md' }}
      header={
        <Box
          pb={'16px'}
          borderBottom={'1px solid'}
          borderColor={'border.basic.2'}
        >
          <Text textStyle={'pre-heading-2'} color={'grey.10'}>
            상환방식
          </Text>
        </Box>
      }
      body={
        <VStack
          spacing={'32px'}
          //   align={'stretch'}
          maxH={{ base: '100%', sm: '600px' }}
          overflowY={'auto'}
        >
          {/* 만기 일시상환 */}
          <Box>
            <Text textStyle={'pre-body-3'} color={'grey.10'} mb={'12px'}>
              만기 일시상환이란?
            </Text>
            <Text textStyle={'pre-body-6'} color={'grey.8'} mb={'8px'}>
              매달 이자만 먼저 내고{' '}
              <Box as={'span'} textStyle={'pre-body-5'} color={'grey.10'}>
                대출이 끝날 때 원금을 갚는 방식
              </Box>
            </Text>
            <Text textStyle={'pre-body-68'} color={'grey.9'} mb={'16px'}>
              • 매달 내는 금액이 적어요.
            </Text>

            <Box>
              <SimpleGrid
                maxW={'336px'}
                columns={4}
                spacing={2}
                h={'120px'}
                alignItems={'flex-end'}
              >
                <Flex flexDir="column" gap={'5px'}>
                  <Flex
                    borderRadius={'4px'}
                    bg={'accent.blue1'}
                    justifyContent="center"
                    alignItems="center"
                    h={'39px'}
                    p={'10px 12px'}
                  >
                    <Text textStyle={'pre-caption-1'} color={'primary.4'}>
                      이자
                    </Text>
                  </Flex>
                  <Box h={'16px'}></Box>
                </Flex>
                <Flex flexDir="column" gap={'5px'}>
                  <Flex
                    borderRadius={'6px'}
                    bg={'accent.blue1'}
                    justifyContent="center"
                    alignItems="center"
                    h={'39px'}
                    p={'10px 12px'}
                  ></Flex>
                  <Box h={'16px'}></Box>
                </Flex>
                <Flex flexDir="column" gap={'5px'}>
                  <Flex
                    borderRadius={'6px'}
                    bg={'accent.blue1'}
                    justifyContent="center"
                    alignItems="center"
                    h={'39px'}
                    p={'10px 12px'}
                  ></Flex>
                  <Box h={'16px'}></Box>
                </Flex>
                <Flex
                  flexDir="column"
                  alignItems={'center'}
                  gap={'5px'}
                  h={'100%'}
                  w={'100%'}
                >
                  <Flex
                    borderRadius={'6px'}
                    bg={'primary.3'}
                    justifyContent="center"
                    alignItems="center"
                    h={'100%'}
                    w={'100%'}
                    p={'10px 12px'}
                  >
                    <Text textStyle={'pre-caption-1'} color={'grey.0'}>
                      원금
                    </Text>
                  </Flex>
                  <Text h={'16px'} textStyle={'pre-caption-4'} color={'grey.8'}>
                    대출 만기일
                  </Text>
                </Flex>
              </SimpleGrid>

              <Flex
                mt={'16px'}
                p={'3px'}
                justifyContent={'center'}
                alignItems={'center'}
                w={'100%'}
                bg={'grey.1'}
                borderRadius={'6px'}
              >
                <Text
                  textStyle={'pre-caption-1'}
                  color={'grey.8'}
                  textAlign={'center'}
                >
                  월별 상환 금액
                </Text>
              </Flex>
            </Box>
          </Box>

          {/* 원리금균등 분할상환 */}
          <Box>
            <Text
              fontSize={'18px'}
              fontWeight={'600'}
              color={'grey.10'}
              mb={'12px'}
            >
              원리금균등 분할상환이란?
            </Text>
            <Text textStyle={'pre-body-6'} color={'grey.8'} mb={'8px'}>
              원금과 이자의 비율을 조정해{' '}
              <Box as={'span'} textStyle={'pre-body-5'} color={'grey.10'}>
                매달 같은 금액을 갚는 방식
              </Box>
            </Text>
            <Text textStyle={'pre-body-68'} color={'grey.9'} mb={'16px'}>
              • 매달 같은 금액으로 지출 관리가 쉬워요.
            </Text>

            <Box>
              <SimpleGrid maxW={'336px'} columns={4} spacing={2} h={'120px'}>
                <Flex flexDir="column" borderRadius={'6px'}>
                  <Flex
                    borderTopRadius={'4px'}
                    bg={'accent.blue1'}
                    justifyContent="center"
                    alignItems="center"
                    h={'40%'}
                  >
                    <Text textStyle={'pre-caption-1'} color={'primary.4'}>
                      이자
                    </Text>
                  </Flex>
                  <Flex
                    borderBottomRadius={'4px'}
                    bg={'primary.3'}
                    justifyContent="center"
                    alignItems="center"
                    h={'60%'}
                  >
                    <Text textStyle={'pre-caption-1'} color={'grey.0'}>
                      원금
                    </Text>
                  </Flex>
                </Flex>
                <Flex flexDir="column" borderRadius={'6px'}>
                  <Flex
                    borderTopRadius={'4px'}
                    bg={'accent.blue1'}
                    justifyContent="center"
                    alignItems="center"
                    h={'35%'}
                  ></Flex>
                  <Flex
                    borderBottomRadius={'4px'}
                    bg={'primary.3'}
                    justifyContent="center"
                    alignItems="center"
                    h={'65%'}
                  ></Flex>
                </Flex>
                <Flex flexDir="column" borderRadius={'6px'}>
                  <Flex
                    borderTopRadius={'4px'}
                    bg={'accent.blue1'}
                    justifyContent="center"
                    alignItems="center"
                    h={'25%'}
                  ></Flex>
                  <Flex
                    borderBottomRadius={'4px'}
                    bg={'primary.3'}
                    justifyContent="center"
                    alignItems="center"
                    h={'75%'}
                  ></Flex>
                </Flex>
                <Flex flexDir="column" borderRadius={'6px'}>
                  <Flex
                    borderTopRadius={'4px'}
                    bg={'accent.blue1'}
                    justifyContent="center"
                    alignItems="center"
                    h={'15%'}
                  ></Flex>
                  <Flex
                    borderBottomRadius={'4px'}
                    bg={'primary.3'}
                    justifyContent="center"
                    alignItems="center"
                    h={'85%'}
                  ></Flex>
                </Flex>
              </SimpleGrid>
              {/* <AspectRatio ratio={345 / 121}>
                <ImageAsNext
                  src={MY_IMAGES.EQUAL_INSTALLMENT.src}
                  alt={MY_IMAGES.EQUAL_INSTALLMENT.alt}
                />
              </AspectRatio> */}
              <Flex
                mt={'16px'}
                p={'3px'}
                justifyContent={'center'}
                alignItems={'center'}
                w={'100%'}
                bg={'grey.1'}
                borderRadius={'6px'}
              >
                <Text
                  textStyle={'pre-caption-1'}
                  color={'grey.8'}
                  textAlign={'center'}
                >
                  월별 상환 금액
                </Text>
              </Flex>
            </Box>
          </Box>
        </VStack>
      }
      footer={
        <>
          <Button w="100%" variant={'solid-primary'} onClick={handleConfirm}>
            확인
          </Button>
        </>
      }
    ></ModalBasis>
  )
}

export default RepaymentMethodModal
