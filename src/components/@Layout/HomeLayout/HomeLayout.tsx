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
} from '@chakra-ui/react'

import { LAYOUT } from '@/constants/layout'

import HomeFooter from './components/HomeFooter'
import HomeHeader from './components/HomeHeader'

interface HomeLayoutProps {
  header?: JSX.Element
  footer?: JSX.Element
  content?: JSX.Element
  containerProps?: ContainerProps
}
const bounceAnimation = keyframes`
  0% {  transform: translateY(-100px); }
  60% {  transform: translateY(10px); }
  80% {  transform: translateY(-5px); }
  100% {  transform: translateY(0px); }
`
const HomeLayout = ({
  //
  header = <HomeHeader />,
  footer = <HomeFooter />,
  containerProps,
  content,
}: HomeLayoutProps) => {
  return (
    <Box
      w={'100%'}
      minH={'100vh'}
      // h="100vh" // 명시적으로 100vh로 설정
      display={'flex'}
      flexDirection={'column'}
    >
      <Flex
        // area={'header'}
        as={'header'}
        position="sticky"
        zIndex="sticky"
        top="0px"
        w={'100%'}
        h="70px"
        justifyContent={'center'}
        // pt={isScroll ? '10px' : '0'}
        // {...scrollConfig}
      >
        {header}
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
        // flex="1"
        mt={LAYOUT.HEADER.HEIGHT} // 헤더 높이만큼 margin-top 추가
        {...containerProps}
      >
        {content}
      </Flex>
      {footer}
    </Box>
  )
}

export default HomeLayout
