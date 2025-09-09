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

import {
  HeaderlogoIcon,
  LogoIcon,
  MagicubeIcon,
  MenuIcon,
} from 'generated/icons/MyIcons'

import { ROUTES } from '@/generated/path/routes'

import LoginCodeModal from '../../../../@Modal/LoginCodeModal'
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

  return (
    <Flex
      w="100%"
      alignItems="center"
      justifyContent="space-between"
      flexDir={'column'}
      position={'relative'}
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
            <Flex flexDir={{ base: 'column', md: 'row' }}>
              <Text
                textStyle={{ base: 'pre-body-7', md: 'pre-heading-2' }}
                color={'grey.0'}
              >
                2023-창원의창-0003[대부업]
              </Text>
              <Text
                textStyle={{ base: 'pre-body-7', md: 'pre-heading-2' }}
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
          {/* <Link variant={'unstyled'} href={ROUTES.MAIN}> */}
          <HeaderlogoIcon boxSize={'127px'} h={'25px'} />
          {/* </Link> */}
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
              {MENU_ITEMS[0].submenuItems?.map((subItem, subIndex) => (
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

      <HomeHeaderDrawer isOpen={isDrawerOpen} onClose={onDrawerClose} />
    </Flex>
  )
}

export default HomeHeader
