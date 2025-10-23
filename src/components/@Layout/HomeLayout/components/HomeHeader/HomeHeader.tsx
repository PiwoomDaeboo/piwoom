import { useCallback, useEffect, useRef, useState } from 'react'

import { useRouter } from 'next/router'

import { Link } from '@chakra-ui/next-js'
import {
  Box,
  Button,
  Container,
  Flex,
  HStack,
  IconButton,
  Text,
} from '@chakra-ui/react'

import { MenuIcon, UserIcon } from 'generated/icons/MyIcons'

import ImageAsNext from '@/components/ImageAsNext'
import { useSettingRetrieveQuery } from '@/generated/apis/Setting/Setting.query'
import { MY_IMAGES } from '@/generated/path/images'
import { ROUTES } from '@/generated/path/routes'
import { useLocalStorage } from '@/stores/local/state'

import { MENU_ITEMS } from '../consts/menu'
import HomeHeaderDrawer from './components/HomeHeaderDrawer'

interface HomeHeaderProps {
  isDrawerOpen: boolean
  onDrawerOpen: () => void
  onDrawerClose: () => void
}

const HomeHeader = ({
  isDrawerOpen,
  onDrawerOpen,
  onDrawerClose,
  ...props
}: HomeHeaderProps) => {
  const router = useRouter()
  const { token } = useLocalStorage()
  const { data: settingData } = useSettingRetrieveQuery({
    variables: {
      id: 'me',
    },
  })
  const [hoveredMenuIndex, setHoveredMenuIndex] = useState<number | null>(null)
  const [isLogoutMenuOpen, setIsLogoutMenuOpen] = useState(false)
  const [isHeaderVisible, setIsHeaderVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const handleMouseEnter = (menuIndex: number) => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current)
      hoverTimeoutRef.current = null
    }
    setHoveredMenuIndex(menuIndex)
  }

  const handleMouseLeave = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setHoveredMenuIndex(null)
    }, 200)
  }

  // 스크롤 이벤트 핸들러
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      if (currentScrollY <= 0 || isDrawerOpen) {
        setIsHeaderVisible(true)
      } else {
        if (currentScrollY > lastScrollY && currentScrollY > 80) {
          setIsHeaderVisible(false)
          // 헤더가 숨겨질 때 hover 상태도 초기화
          setHoveredMenuIndex(null)
        } else if (currentScrollY < lastScrollY) {
          setIsHeaderVisible(true)
        }
      }
      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current)
      }
    }
  }, [lastScrollY, isDrawerOpen])
  const handleLogout = useCallback(() => {
    useLocalStorage.getState().reset('token')
    router.replace(ROUTES.MAIN)
    setIsLogoutMenuOpen(false)
  }, [])

  const handleMyLoanStatus = useCallback(() => {
    router.push(ROUTES.MY_LOAN_STATUS_MAIN)
    setIsLogoutMenuOpen(false)
  }, [])
  const hoverMenuMarginRight = useCallback((index: number) => {
    if (index === 0) {
      return '24px'
    }
    if (index === 1) {
      return '54px'
    }

    return '0px'
  }, [])

  const loginHoverMenuMarginRight = useCallback((index: number) => {
    if (index === 0) {
      return '-10px'
    }
    if (index === 1) {
      return '20px'
    }

    return '-40px'
  }, [])

  return (
    <Flex
      w="100%"
      alignItems="center"
      justifyContent="space-between"
      flexDir={'column'}
      position={'fixed'}
      top={0}
      left={0}
      right={0}
      zIndex={1000}
      bg={'white'}
      transform={isHeaderVisible ? 'translateY(0)' : 'translateY(-100%)'}
      transition={'transform 0.3s ease-in-out'}
      {...props}
    >
      <Flex
        py={'12px'}
        w={'100%'}
        bg={'primary.3'}
        alignItems={'center'}
        display={isDrawerOpen ? 'none' : 'flex'}
      >
        <Container>
          <HStack justifyContent={{ base: 'space-between', md: 'flex-start' }}>
            <Text
              textStyle={{
                base: 'pre-heading-5',
                sm: 'pre-heading-4',
                md: 'pre-heading-2',
              }}
              color={'grey.0'}
            >
              피움대부 주식회사
            </Text>
            <Flex
              flexDir={{ base: 'column', sm: 'row' }}
              gap={{ base: '0px', sm: '6px' }}
            >
              <Text
                textStyle={{
                  base: 'pre-body-7',
                  sm: 'pre-heading-5',
                  md: 'pre-heading-2',
                }}
                color={'grey.0'}
              >
                2023-창원의창-0003[대부업]
              </Text>
              <Text
                textStyle={{
                  base: 'pre-body-7',
                  sm: 'pre-heading-5',
                  md: 'pre-heading-2',
                }}
                color={'grey.0'}
              >
                2023-창원의창-0004[대부중개업]
              </Text>
            </Flex>
          </HStack>
        </Container>
      </Flex>
      <Container>
        <Flex
          alignItems={'center'}
          justifyContent={'space-between'}
          py={{ base: '8px', md: '20px' }}
          // p={{ base: '8px 24px 8px 40px', md: '20px' }}
          h={{ base: '64px', md: '80px' }}
        >
          <Link variant={'unstyled'} href={ROUTES.MAIN}>
            <ImageAsNext
              src={MY_IMAGES.LOGO_PC.src}
              alt="logo"
              width={{ base: '107px', sm: '127px', md: '127px' }}
              height={{ base: '20px', sm: '25px', md: '25px' }}
            />
            {/* <HeaderlogoIcon
              width={{ base: '107px', sm: '127px', md: '127px' }}
              h={'20px'}
            /> */}
          </Link>
          <HStack
            gap={'10px'}
            position={'relative'}
            display={{ base: 'none', md: 'flex' }}
          >
            {MENU_ITEMS.map((item, index) => (
              <Box
                key={index}
                px={'25px'}
                position={'relative'}
                onMouseEnter={() => item.hasSubmenu && handleMouseEnter(index)}
                onMouseLeave={() => item.hasSubmenu && handleMouseLeave()}
              >
                <Link
                  href={item.hasSubmenu ? '#' : item.href}
                  variant={'unstyled'}
                  onClick={
                    item.hasSubmenu ? (e) => e.preventDefault() : undefined
                  }
                  cursor={item.hasSubmenu ? 'default' : 'pointer'}
                >
                  <Text textStyle={'pre-body-3'} color={'grey.10'} pb={'2px'}>
                    {item.label}
                  </Text>
                </Link>
              </Box>
            ))}
          </HStack>
          <HStack gap={'10px'} display={{ base: 'none', md: 'flex' }}>
            {token ?
              <Flex
                w={'48px'}
                h={'48px'}
                bg={'primary.4'}
                borderRadius={'full'}
                justifyContent={'center'}
                alignItems={'center'}
                cursor={'pointer'}
                position={'relative'}
                onClick={() => setIsLogoutMenuOpen(!isLogoutMenuOpen)}
              >
                <UserIcon boxSize={'24px'} color={'grey.0'} />
                {isLogoutMenuOpen && (
                  <Flex
                    bg={'grey.0'}
                    minW={'160px'}
                    borderRadius={'10px'}
                    display={'flex'}
                    flexDirection={'column'}
                    border={'1px solid'}
                    borderColor={'grey.2'}
                    position={'absolute'}
                    zIndex={999}
                    boxShadow={
                      '0 20px 80px 0 rgba(27, 28, 29, 0.04), 0 4px 10px 0 rgba(27, 28, 29, 0.04)'
                    }
                    bottom={'-100px'}
                    right={0}
                    overflow={'hidden'}
                  >
                    <Flex
                      p={'10px 12px'}
                      cursor={'pointer'}
                      _hover={{ bg: 'grey.1' }}
                      onClick={handleMyLoanStatus}
                    >
                      <Text textStyle={'pre-body-6'} color={'grey.8'}>
                        나의 대출 조회
                      </Text>
                    </Flex>
                    <Flex
                      p={'10px 12px'}
                      cursor={'pointer'}
                      _hover={{ bg: 'grey.1' }}
                      onClick={handleLogout}
                    >
                      <Text textStyle={'pre-body-6'} color={'grey.8'}>
                        로그아웃
                      </Text>
                    </Flex>
                  </Flex>
                )}
              </Flex>
            : <Button
                onClick={() => router.push(ROUTES.MY_LOAN_STATUS_MAIN)}
                variant={'outline-secondary'}
              >
                <Text textStyle={'pre-body-7'} color={'grey.8'}>
                  대출 조회
                </Text>
              </Button>
            }

            <Button
              onClick={() => router.push('/apply-loan?step=1&type=credit')}
              variant={'black-primary'}
              isDisabled={!settingData?.isLoan}
            >
              <Text textStyle={'pre-body-7'} color={'grey.0'}>
                대출 신청
              </Text>
            </Button>
          </HStack>
          <HStack display={{ base: 'flex', md: 'none' }}>
            <Button
              variant={'black-primary'}
              isDisabled={!settingData?.isLoan}
              onClick={() => {
                isDrawerOpen && onDrawerClose

                router.push('/apply-loan?step=1&type=credit')
              }}
            >
              대출 신청
            </Button>
            <IconButton
              p={0}
              m={0}
              border={0}
              icon={<MenuIcon w="24px" h="24px" color={'grey.10'} />}
              onClick={isDrawerOpen ? onDrawerClose : onDrawerOpen}
              cursor="pointer"
              bg={'transparent'}
              _hover={{ bg: 'transparent' }}
              aria-label="btn-toggle-drawer"
            />
          </HStack>
        </Flex>
      </Container>

      {/* 전체 너비 서브메뉴 바 */}
      {hoveredMenuIndex !== null &&
        MENU_ITEMS[hoveredMenuIndex]?.submenuItems && (
          <Box
            w={'100%'}
            h={'80px'}
            bg={'white'}
            borderTop={'1px solid'}
            borderTopColor={'grey.2'}
            position={'absolute'}
            top={'100%'}
            left={'0'}
            zIndex={999}
            onMouseEnter={() => handleMouseEnter(hoveredMenuIndex)}
            onMouseLeave={handleMouseLeave}
          >
            <Container h={'100%'}>
              <Flex
                alignItems={'center'}
                justifyContent={'center'}
                h={'100%'}
                gap={'40px'}
                mr={
                  token ?
                    loginHoverMenuMarginRight(hoveredMenuIndex)
                  : hoverMenuMarginRight(hoveredMenuIndex)
                }
                ml={hoveredMenuIndex === 2 ? '190px' : '0px'}
              >
                {MENU_ITEMS[hoveredMenuIndex].submenuItems?.map(
                  (subItem, subIndex) => (
                    <Link
                      key={subIndex}
                      href={subItem.href}
                      variant={'unstyled'}
                    >
                      <Text
                        textStyle={'pre-body-4'}
                        color={'grey.10'}
                        _hover={{ color: 'primary.4' }}
                        cursor={'pointer'}
                      >
                        {subItem.label}
                      </Text>
                    </Link>
                  ),
                )}
              </Flex>
            </Container>
          </Box>
        )}

      <HomeHeaderDrawer
        isLoan={!settingData?.isLoan}
        isOpen={isDrawerOpen}
        onClose={onDrawerClose}
      />
    </Flex>
  )
}

export default HomeHeader
