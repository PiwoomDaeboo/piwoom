import { useEffect, useRef, useState } from 'react'

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
  VStack,
} from '@chakra-ui/react'

import {
  HeaderlogoIcon,
  LogoIcon,
  MagicubeIcon,
  MenuIcon,
} from 'generated/icons/MyIcons'

import { ROUTES } from '@/generated/path/routes'

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
  const [hoveredMenuIndex, setHoveredMenuIndex] = useState<number | null>(null)
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
          py={'20px'}
          h={'80px'}
        >
          <Link variant={'unstyled'} href={ROUTES.MAIN}>
            <HeaderlogoIcon boxSize={'174px'} h={'25px'} />
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
            <Button
              onClick={() => router.push(ROUTES.MY_LOAN_MAIN)}
              variant={'outline-secondary'}
            >
              <Text textStyle={'pre-body-7'} color={'grey.8'}>
                대출 조회
              </Text>
            </Button>
            <Button
              onClick={() => router.push(ROUTES.LOAN_MAIN)}
              variant={'black-primary'}
            >
              <Text textStyle={'pre-body-7'} color={'grey.0'}>
                대출 신청
              </Text>
            </Button>
          </HStack>
          <HStack display={{ base: 'flex', md: 'none' }}>
            <Button variant={'black-primary'}>대출 신청</Button>
            <IconButton
              size={'lg'}
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
              >
                {MENU_ITEMS[hoveredMenuIndex].submenuItems?.map(
                  (subItem, subIndex) => (
                    <Link
                      key={subIndex}
                      href={subItem.href}
                      variant={'unstyled'}
                    >
                      <Text
                        textStyle={'pre-body-3'}
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

      <HomeHeaderDrawer isOpen={isDrawerOpen} onClose={onDrawerClose} />
    </Flex>
  )
}

export default HomeHeader
