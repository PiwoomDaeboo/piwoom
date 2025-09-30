import React, { useCallback, useEffect, useState } from 'react'

import {
  Box,
  Container,
  ContainerProps,
  Flex,
  Grid,
  GridItem,
  GridItemProps,
  keyframes,
  useDisclosure,
} from '@chakra-ui/react'

import { LAYOUT } from '@/constants/layout'
import Terms from '@/containers/Terms'

import FloatingActionButton from './components/FloatingActionButton'
import HomeFooter from './components/HomeFooter'
import HomeHeader from './components/HomeHeader'

interface HomeLayoutProps {
  header?: JSX.Element
  footer?: JSX.Element
  content?: JSX.Element
  containerProps?: ContainerProps
}

const HomeLayout = ({
  header,
  footer = <HomeFooter />,
  containerProps,
  content,
}: HomeLayoutProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const defaultHeader = (
    <HomeHeader
      isDrawerOpen={isOpen}
      onDrawerOpen={onOpen}
      onDrawerClose={onClose}
    />
  )
  return (
    <Box w={'100%'} minH={'100vh'} display={'flex'} flexDirection={'column'}>
      <Flex
        as={'header'}
        // position="sticky"
        // zIndex="sticky"
        top="0px"
        w={'100%'}
        justifyContent={'center'}
      >
        {header || defaultHeader}
      </Flex>
      <Flex
        as={'main'}
        area={'main'}
        w={'100%'}
        h="100%"
        display="flex"
        flexDirection="column"
        justifyContent={'center'}
        alignItems={'center'}
        pt={{ base: '130px', sm: '114px', md: '130px' }} // 헤더 높이만큼 padding-top 추가
        {...containerProps}
      >
        {content}
        <Terms />
        <FloatingActionButton />
      </Flex>
      {footer}
    </Box>
  )
}

export default HomeLayout
