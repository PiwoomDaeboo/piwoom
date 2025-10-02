import { Button, Flex, SimpleGrid } from '@chakra-ui/react'

import { Controller, useFormContext } from 'react-hook-form'

interface SelectButtonOption {
  value: string
  label: string
}

interface UseSelectButtonGroupProps {
  name: string
  options: SelectButtonOption[]
  variant?: 'single' | 'multiple'
}

export const useSelectButtonGroup = ({
  name,
  options,
  variant = 'single',
}: UseSelectButtonGroupProps) => {
  const { control } = useFormContext()

  const SelectButtonGroup = () => (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Flex flexWrap={'wrap'} gap={'8px'}>
          {options.map((option) => {
            const isSelected =
              variant === 'single' ?
                field.value === option.value
              : field.value?.includes(option.value)

            return (
              <Button
                // variant={'outline-secondary'}
                variant={isSelected ? 'outline-primary' : 'outline-secondary'}
                textStyle={'pre-body-5'}
                bg={isSelected ? 'primary.1' : 'grey.0'}
                fontWeight={600}
                key={option.value}
                w={'209px'}
                onClick={() => {
                  if (variant === 'single') {
                    field.onChange(option.value)
                  } else {
                    const currentValues = field.value || []
                    const newValues =
                      currentValues.includes(option.value) ?
                        currentValues.filter((v: string) => v !== option.value)
                      : [...currentValues, option.value]
                    field.onChange(newValues)
                  }
                }}
              >
                {option.label}
              </Button>
            )
          })}
        </Flex>
      )}
    />
  )

  return { SelectButtonGroup }
}
