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
} from '@chakra-ui/react'

import DrawerBasis from '@/components/@Drawer/DrawerBasis'
import {
  CaretDownIcon,
  HeaderlogoIcon,
  MenuIcon,
} from '@/generated/icons/MyIcons'

import { MENU_ITEMS } from '../../consts/menu'

interface HomeHeaderDrawerProps extends Omit<DrawerProps, 'children'> {
  bodyProps?: ChakraProps
}

const HomeHeaderDrawer = ({
  bodyProps,
  isOpen,
  onClose,
  ...props
}: HomeHeaderDrawerProps) => {
  return (
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
              py={'20px'}
              h={'80px'}
            >
              <HeaderlogoIcon boxSize={'127px'} h={'25px'} />
              <HStack gap={'10px'}>
                <Button variant={'black-primary'}>대출 신청</Button>
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
        <Container px={'0px'}>
          <VStack alignItems={'flex-start'} spacing={'0px'} px={'0px'}>
            {MENU_ITEMS.map((item) => (
              <Accordion key={item.label} allowToggle w={'100%'} px={'0px'}>
                <AccordionItem
                  border={'none'}
                  borderBottom={'1px solid'}
                  borderColor={'grey.2'}
                >
                  <AccordionButton py={'10px'} px={'0px'}>
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
                    />
                  </AccordionButton>

                  <AccordionPanel py={'12px'} bg={'grey.0'}>
                    <Flex flexDir={'column'} gap={'10px'}>
                      {item.submenuItems?.map((subItem) => (
                        <Box
                          key={subItem.label}
                          p={'12px 16px'}
                          borderRadius={'16px'}
                          textStyle={'pre-body-4'}
                          color={'grey.10'}
                          _hover={{
                            bg: 'primary.1',
                            color: 'primary.4',
                            textStyle: 'pre-body-3',
                          }}
                        >
                          <Link href={subItem.href}>{subItem.label}</Link>
                        </Box>
                      ))}
                    </Flex>
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>
            ))}
          </VStack>
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
  )
}

export default HomeHeaderDrawer
