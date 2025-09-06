import { useEffect, useRef, useState } from 'react'

import { Link } from '@chakra-ui/next-js'
import {
  Box,
  Button,
  Container,
  ContainerProps,
  Flex,
  HStack,
  IconButton,
  Text,
  VStack,
} from '@chakra-ui/react'
import { useDisclosure } from '@chakra-ui/react'

import {
  HeaderlogoIcon,
  LogoIcon,
  MagicubeIcon,
  MenuIcon,
} from 'generated/icons/MyIcons'

import InquiryModal from '@/components/@Modal/InquiryModal'
import { ROUTES } from '@/generated/path/routes'

import LoginCodeModal from '../../../../@Modal/LoginCodeModal'
import HomeHeaderDrawer from './components/HomeHeaderDrawer'

const HomeHeader = ({ ...props }: ContainerProps) => {
  const { isOpen, onClose, onOpen } = useDisclosure()
  const [isLoanHovered, setIsLoanHovered] = useState(false)
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const handleMouseEnter = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current)
      hoverTimeoutRef.current = null
    }
    setIsLoanHovered(true)
  }

  const handleMouseLeave = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setIsLoanHovered(false)
    }, 200) // 200ms 지연
  }

  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current)
      }
    }
  }, [])

  const navigationItems = [
    {
      label: '대출',
      href: '/loan',
      hasSubmenu: true,
      submenuItems: [
        { label: '월급 대출', href: '/loan/salary' },
        { label: '신용 대출', href: '/loan/credit' },
        { label: '부동산 담보대출', href: '/loan/mortgage' },
        { label: '대출 절차 안내', href: '/loan/process' },
      ],
    },
    { label: '나의 대출조회', href: '/my-loan' },
    { label: '고객센터', href: '/customer-service' },
    { label: '회사 소개', href: '/about' },
  ]

  return (
    <Flex
      w="100%"
      alignItems="center"
      justifyContent="space-between"
      flexDir={'column'}
      position={'relative'}
      {...props}
    >
      <Flex py={'12px'} w={'100%'} bg={'primary.3'} alignItems={'center'}>
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
          py={'20px'}
          h={'80px'}
        >
          {/* <Link variant={'unstyled'} href={ROUTES.MAIN}> */}
          <HeaderlogoIcon boxSize={'127px'} h={'25px'} />
          {/* </Link> */}
          <HStack
            gap={'10px'}
            position={'relative'}
            display={{ base: 'none', md: 'flex' }}
          >
            {navigationItems.map((item, index) => (
              <Box
                key={index}
                px={'25px'}
                position={'relative'}
                onMouseEnter={() => item.hasSubmenu && handleMouseEnter()}
                onMouseLeave={() => item.hasSubmenu && handleMouseLeave()}
              >
                <Link href={item.href} variant={'unstyled'}>
                  <Text
                    textStyle={'pre-heading-2'}
                    color={'grey.10'}
                    pb={'2px'}
                  >
                    {item.label}
                  </Text>
                </Link>
              </Box>
            ))}
          </HStack>
          <HStack gap={'10px'} display={{ base: 'none', md: 'flex' }}>
            <Button variant={'outline-primary'}>대출 조회</Button>
            <Button variant={'black-primary'}>대출 신청</Button>
          </HStack>
          <HStack display={{ base: 'flex', md: 'none' }}>
            <Button variant={'black-primary'}>대출 신청</Button>
            <IconButton
              size={'lg'}
              icon={<MenuIcon w="24px" h="24px" color={'grey.10'} />}
              onClick={onOpen}
              cursor="pointer"
              bg={'transparent'}
              _hover={{ bg: 'transparent' }}
              aria-label="btn-toggle-drawer"
            />
          </HStack>
        </Flex>
      </Container>

      {/* 전체 너비 서브메뉴 바 */}
      {isLoanHovered && (
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
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <Container h={'100%'}>
            <Flex
              alignItems={'center'}
              justifyContent={'center'}
              h={'100%'}
              gap={'40px'}
            >
              {navigationItems[0].submenuItems?.map((subItem, subIndex) => (
                <Link key={subIndex} href={subItem.href} variant={'unstyled'}>
                  <Text
                    textStyle={'pre-heading-2'}
                    color={'grey.10'}
                    _hover={{ color: 'primary.4' }}
                    cursor={'pointer'}
                  >
                    {subItem.label}
                  </Text>
                </Link>
              ))}
            </Flex>
          </Container>
        </Box>
      )}

      <HomeHeaderDrawer isOpen={isOpen} onClose={onClose} />
    </Flex>
  )
}

export default HomeHeader
