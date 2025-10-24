import { Select as ChakraSelect, SelectComponent } from 'chakra-react-select'

type Option = Record<'label' | 'value', unknown>

/**
 * `ExtractReadOnlyMap` 타입은 불변 배열(`ReadonlyArray`)에서 각 요소의 속성을 추출하여 새로운 객체 타입을 생성합니다.
 *
 * @template T 불변(`Readonly`) `label`과 `value`를 포함한 `Option` 객체 배열
 *
 * @example
 * ```ts
 * const FRUITS = [
 *  {
 *     label: 'Apple',
 *     value: 'apple',
 *   },
 *   {
 *     label: 'Banana',
 *     value: 'banana',
 *   },
 * ] as const
 *
 * type Options = ExtractReadOnlyMap<typeof FRUITS>
 * //  { label: "Apple" | "Banana" , value: "apple" | "banana" }
 * ```
 */
export type ExtractReadOnlyMap<T extends Readonly<Option[]>> = {
  [K in keyof T[number]]: T[number][K]
}

/**
 * `CommonSelect` 컴포넌트는 ` 'chakra-react-select'`를 기반으로 만들어진 똑똑한개발자 Select 컴포넌트입니다.
 * @see https://github.com/csandman/chakra-react-select
 *
 * @template T 기본 `Option` 타입
 *
 * @param options `SelectOption<T>[]`
 * @param basisProps `ChakraSelect` 컴포넌트에 전달될 추가 속성들입니다. 'chakra-react-select'의 `Props`를 확장합니다.
 *
 * @returns `ChakraSelect` 컴포넌트를 렌더링합니다.
 *
 */
export const CommonSelect: SelectComponent = ({
  options,
  isSearchable = false,
  ...basisProps
}) => {
  return (
    <ChakraSelect
      options={options}
      isSearchable={isSearchable}
      chakraStyles={{
        option: (provided, state) => ({
          ...provided,
          bg: 'transparent',
          color: 'content.1',
          _hover: {
            bg: 'primary.1',
            color: '',
          },
          _selected: {
            bg: 'primary.3',
            color: 'white',
            _hover: {
              bg: 'primary.3',
            },
          },
          // 스크롤바 스타일
          overflowY: 'scroll',
          WebkitOverflowScrolling: 'touch',
          scrollbarWidth: 'auto',
          scrollbarColor: '#666 #e0e0e0',
          '&::-webkit-scrollbar': {
            width: '14px',
            display: 'block',
            WebkitAppearance: 'none',
          },
          '&::-webkit-scrollbar-track': {
            background: '#e0e0e0',
            borderRadius: '7px',
          },
          '&::-webkit-scrollbar-thumb': {
            background: '#666',
            borderRadius: '7px',
            border: '2px solid rgba(255, 255, 255, 0.3)',
            minHeight: '50px',
          },
          '&::-webkit-scrollbar-thumb:hover': {
            background: '#444',
          },
          '&::-webkit-scrollbar-thumb:active': {
            background: '#222',
          },
          '@media (max-width: 768px)': {
            '&::-webkit-scrollbar': {
              width: '16px',
            },
            '&::-webkit-scrollbar-thumb': {
              background: '#555',
              minHeight: '60px',
              border: '3px solid rgba(255, 255, 255, 0.4)',
            },
          },
        }),
        groupHeading: (provided) => ({
          ...provided,
          // bg: 'gray.50',
          // color: 'gray.600',
          // fontWeight: 'semibold',
          // fontSize: 'xs',
          textStyle: 'pre-caption-1',
          color: 'grey.5',
          textTransform: 'uppercase',
        }),
        dropdownIndicator: (provided) => ({
          ...provided,
          bg: 'transparent',
          p: 0,
          w: 6,
          mx: 2,
          cursor: 'inherit',
        }),
        indicatorSeparator: () => ({
          display: 'none',
        }),
        menuList: (provided) => ({
          ...provided,
          maxHeight: '200px',
          overflowY: 'scroll',
          WebkitOverflowScrolling: 'touch',
          // Firefox 스크롤바 스타일
          scrollbarWidth: 'auto',
          scrollbarColor: '#666 #e0e0e0',
          // Webkit 스크롤바 스타일
          '&::-webkit-scrollbar': {
            width: '14px',
            display: 'block',
            WebkitAppearance: 'none',
          },
          '&::-webkit-scrollbar-track': {
            background: '#e0e0e0',
            borderRadius: '7px',
          },
          '&::-webkit-scrollbar-thumb': {
            background: '#666',
            borderRadius: '7px',
            border: '2px solid rgba(255, 255, 255, 0.3)',
            minHeight: '50px',
          },
          '&::-webkit-scrollbar-thumb:hover': {
            background: '#444',
          },
          '&::-webkit-scrollbar-thumb:active': {
            background: '#222',
          },
          // 모바일 전용 - 더 큰 스크롤바
          '@media (max-width: 768px)': {
            '&::-webkit-scrollbar': {
              width: '16px',
            },
            '&::-webkit-scrollbar-thumb': {
              background: '#555',
              minHeight: '60px',
              border: '3px solid rgba(255, 255, 255, 0.4)',
            },
          },
        }),
      }}
      menuPortalTarget={
        typeof document !== 'undefined' ? document.body : undefined
      }
      styles={{
        menuPortal: (provided) => ({ ...provided, zIndex: 9999 }),
      }}
      {...basisProps}
    />
  )
}

export default CommonSelect
