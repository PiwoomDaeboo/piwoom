import React from 'react'

import { HStack, StackProps, Text, VStack } from '@chakra-ui/react'

interface InputFormProps extends StackProps {
  label: string
  isRequired?: boolean
  children: React.ReactNode
}

const InputForm = ({
  label,
  isRequired = true,
  children,
  ...props
}: InputFormProps) => {
  return (
    <VStack w="100%" gap="8px" alignItems="flex-start" {...props}>
      <HStack w="100%" h="auto" alignItems="center" gap="2px">
        <Text as="label" textStyle="pre-body-07" color="text.secondary">
          {label}
        </Text>
        {isRequired && (
          <Text textStyle="pre-body-07" color="brand.500">
            *
          </Text>
        )}
      </HStack>
      {children}
    </VStack>
  )
}

export default InputForm
