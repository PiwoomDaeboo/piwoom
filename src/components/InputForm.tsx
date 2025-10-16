import React from 'react'

import {
  Box,
  HStack,
  StackProps,
  Text,
  Tooltip,
  VStack,
} from '@chakra-ui/react'

import { WarningCircleIcon } from '@/generated/icons/MyIcons'

interface InputFormProps extends StackProps {
  label: string
  isRequired?: boolean
  isOptional?: boolean
  tooltipLabel?: string
  onClickTooltip?: () => void
  children: React.ReactNode
}

const InputForm = ({
  label,
  isRequired = true,
  isOptional = false,
  tooltipLabel = '',
  onClickTooltip,
  children,
  ...props
}: InputFormProps) => {
  return (
    <VStack w={'100%'} gap={'8px'} alignItems={'flex-start'} {...props}>
      <HStack w={'100%'} h={'auto'} alignItems={'center'} gap={'2px'}>
        {label !== '' && (
          <Text as={'label'} textStyle={'pre-body-7'} color={'grey.10'}>
            {label}
          </Text>
        )}
        {isRequired && (
          <Text as={'span'} color={'primary.4'}>
            •
          </Text>
        )}
        {isOptional && (
          <Text as={'span'} textStyle={'pre-caption-2'} color={'grey.7'}>
            (선택 사항)
          </Text>
        )}
        {onClickTooltip && (
          <Box
            cursor="pointer"
            display="inline-flex"
            alignItems="center"
            onClick={onClickTooltip}
          >
            <WarningCircleIcon boxSize={'15px'} />
          </Box>
        )}
        {tooltipLabel && (
          <Tooltip
            label={tooltipLabel}
            openDelay={300}
            closeDelay={100}
            hasArrow
            placement="right"
            bg="#1B1C1DCC"
            textStyle={'pre-body-68'}
            color="grey.0"
            p={'4px 8px'}
            maxW="300px"
          >
            <Box cursor="pointer" display="inline-flex" alignItems="center">
              <WarningCircleIcon boxSize={'15px'} />
            </Box>
          </Tooltip>
        )}
      </HStack>
      {children}
    </VStack>
  )
}

export default InputForm
