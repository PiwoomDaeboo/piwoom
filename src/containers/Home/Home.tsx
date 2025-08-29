import { useEffect, useState } from 'react'

import {
  Box,
  Button,
  Center,
  Container,
  Flex,
  Image,
  SimpleGrid,
  Text,
  VStack,
} from '@chakra-ui/react'

import Terms from '../Terms'

// 공통 스타일 정의
const listItemStyles = {
  textStyle: 'pre-heading-4',
  mb: '6px',
  position: 'relative' as const,
  pl: '20px',
  _before: {
    content: '"·"',
    position: 'absolute' as const,
    left: '0',
    top: '0',
  },
}

const ListItem = ({
  children,
  color = 'grey.8',
}: {
  children: React.ReactNode
  color?: string
}) => (
  <Box as="li" color={color} {...listItemStyles}>
    {children}
  </Box>
)

const List = ({ children }: { children: React.ReactNode }) => (
  <Box as="ul" listStyleType="none" m={0} p={0} w="100%">
    {children}
  </Box>
)

function Home() {
  return <Terms />
}
export default Home
