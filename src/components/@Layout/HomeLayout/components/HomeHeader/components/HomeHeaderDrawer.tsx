import { useCallback } from 'react'

import { useRouter } from 'next/router'

import { Link } from '@chakra-ui/next-js'
import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  ChakraProps,
  Container,
  DrawerProps,
  Flex,
  HStack,
  IconButton,
  Text,
  VStack,
  useDisclosure,
} from '@chakra-ui/react'

import DrawerBasis from '@/components/@Drawer/DrawerBasis'
import LoanImpossibleModal from '@/components/@Modal/loan-impossible-modal'
import ImageAsNext from '@/components/ImageAsNext'
import { CaretDownIcon, MenuIcon, SignoutIcon } from '@/generated/icons/MyIcons'
import { MY_IMAGES } from '@/generated/path/images'
import { ROUTES } from '@/generated/path/routes'
import { useLocalStorage } from '@/stores/local/state'

import { MENU_ITEMS } from '../../consts/menu'

interface HomeHeaderDrawerProps extends Omit<DrawerProps, 'children'> {
  bodyProps?: ChakraProps
  isLoan: boolean
}

const HomeHeaderDrawer = ({
  bodyProps,
  isOpen,
  onClose,
  isLoan = false,
  ...props
}: HomeHeaderDrawerProps) => {
  const router = useRouter()
  const { token, reset } = useLocalStorage()
  const {
    isOpen: isLoanImpossibleModalOpen,
    onOpen: onLoanImpossibleModalOpen,
    onClose: onLoanImpossibleModalClose,
  } = useDisclosure()
  const isLoggedIn = token?.access_token && token.access_token.length > 0

  const handleLogout = useCallback(() => {
    reset('token')
    router.replace(ROUTES.MAIN)
    onClose()
  }, [])

  const handleLoanApply = useCallback(() => {
    if (!isLoan) {
      onLoanImpossibleModalOpen()
    } else {
      router.push('/apply-loan?step=1&type=credit')
    }
  }, [isLoan])
  return (
    <>
      <LoanImpossibleModal
        isOpen={isLoanImpossibleModalOpen}
        onClose={onLoanImpossibleModalClose}
      />
      <DrawerBasis
        isOpen={isOpen}
        onClose={onClose}
        visibleCloseButton={false}
        size={'full'}
        header={
          <Flex
            w="100%"
            alignItems="center"
            justifyContent="space-between"
            flexDir={'column'}
            position={'relative'}
          >
            <Flex
              py={'12px'}
              w={'100%'}
              bg={'primary.3'}
              alignItems={'center'}
              display={'none'}
            >
              <Container>
                <Text textStyle={'pre-heading-2'} color={'grey.0'}>
                  피움대부 주식회사 2023-창원의창-0003[대부업]
                  2023-창원의창-0004[대부중개업]
                </Text>
              </Container>
            </Flex>
            <Container>
              <Flex
                alignItems={'center'}
                justifyContent={'space-between'}
                py={'8px'}
                h={'64px'}
              >
                <Link
                  variant={'unstyled'}
                  href={ROUTES.MAIN}
                  onClick={(e) => {
                    if (router.pathname === ROUTES.MAIN) {
                      e.preventDefault()
                      onClose()
                    }
                  }}
                >
                  <ImageAsNext
                    w={'107px'}
                    h={'20px'}
                    src={MY_IMAGES.LOGO_MO.src}
                    alt="logo"
                  />
                  {/* <HeaderlogoIcon boxSize={'107px'} h={'20px'} /> */}
                </Link>
                <HStack gap={'10px'}>
                  <Button
                    minW={'100px'}
                    variant={'outline-primary'}
                    onClick={handleLoanApply}
                  >
                    대출 신청
                  </Button>
                  <IconButton
                    border={0}
                    size={'lg'}
                    icon={<MenuIcon w="24px" h="24px" color={'grey.10'} />}
                    onClick={onClose}
                    cursor="pointer"
                    bg={'transparent'}
                    _hover={{ bg: 'transparent' }}
                    aria-label="btn-close-drawer"
                  />
                </HStack>
              </Flex>
            </Container>
          </Flex>
        }
        body={
          <Container px={'0px'} h={'100%'}>
            <Flex
              flexDir="column"
              h={'100%'}
              pb={'16px'}
              justifyContent={'flex-start'}
            >
              <VStack
                alignItems={'flex-start'}
                spacing={'0px'}
                px={'0px'}
                mb={'32px'}
              >
                {MENU_ITEMS.map((item) => {
                  if (!item.submenuItems || item.submenuItems.length === 0) {
                    return (
                      <Box
                        key={item.label}
                        as="a"
                        w={'100%'}
                        borderBottom={'1px solid'}
                        borderColor={'grey.2'}
                        py={'10px'}
                        px={'0px'}
                        _hover={{
                          bg: 'primary.1',
                        }}
                      >
                        <Link href={item.href || '#'} onClick={onClose}>
                          <HStack w={'100%'} alignItems={'center'} gap={'10px'}>
                            <Text textStyle={'pre-body-3'} color={'grey.10'}>
                              {item.label}
                            </Text>
                          </HStack>
                        </Link>
                      </Box>
                    )
                  }

                  return (
                    <Accordion
                      key={item.label}
                      allowToggle
                      w={'100%'}
                      px={'0px'}
                    >
                      <AccordionItem
                        border={'none'}
                        borderBottom={'1px solid'}
                        borderColor={'grey.2'}
                      >
                        <AccordionButton
                          py={'10px'}
                          px={'0px'}
                          _expanded={{
                            '& > svg': {
                              transform: 'rotate(180deg)',
                            },
                          }}
                        >
                          <Box as="span" flex="1" textAlign="left">
                            <HStack alignItems={'center'} gap={'10px'}>
                              <Text textStyle={'pre-body-3'} color={'grey.10'}>
                                {item.label}
                              </Text>
                            </HStack>
                          </Box>

                          <CaretDownIcon
                            boxSize={'24px'}
                            color={'grey.8'}
                            ml={'20px'}
                            transform={'rotate(0deg)'}
                            transition={'transform 0.2s ease-in-out'}
                          />
                        </AccordionButton>

                        <AccordionPanel py={'12px'} bg={'grey.0'}>
                          <Flex flexDir={'column'} gap={'10px'}>
                            {item.submenuItems?.map((subItem) => (
                              <Link
                                key={subItem.label}
                                href={subItem.href}
                                p={'12px 16px'}
                                borderRadius={'16px'}
                                textStyle={'pre-body-4'}
                                color={'grey.10'}
                                _hover={{
                                  bg: 'primary.1',
                                  color: 'primary.4',
                                  textStyle: 'pre-body-3',
                                }}
                                title={`${subItem.label} 페이지로 이동`}
                                aria-label={`${subItem.label} 서브메뉴`}
                                display="block"
                                onClick={onClose}
                              >
                                <Text
                                  w={'100%'}
                                  textStyle={'pre-body-4'}
                                  color={'grey.10'}
                                >
                                  {subItem.label}
                                </Text>
                              </Link>
                            ))}
                          </Flex>
                        </AccordionPanel>
                      </AccordionItem>
                    </Accordion>
                  )
                })}
              </VStack>
              {isLoggedIn && (
                <Flex
                  mt={'auto'}
                  alignItems={'center'}
                  gap={'12px'}
                  onClick={handleLogout}
                >
                  <Flex
                    w={'40px'}
                    h={'40px'}
                    bg={'grey.2'}
                    borderRadius={'full'}
                    justifyContent={'center'}
                    alignItems={'center'}
                  >
                    <SignoutIcon boxSize={'24px'} />
                  </Flex>
                  <Text textStyle={'pre-body-3'} color={'grey.8'}>
                    로그아웃
                  </Text>
                </Flex>
              )}
            </Flex>
          </Container>
        }
        styles={{
          header: {
            bg: 'transparent',
            border: 'none',
            p: 0,
          },
          content: { bg: 'white' },
          body: { ...bodyProps },
        }}
        {...props}
      />
    </>
  )
}

export default HomeHeaderDrawer
