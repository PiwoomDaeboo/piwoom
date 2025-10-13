export const AGREEMENT_ITEMS = [
  {
    id: 1,
    key: 'privacy',
    label: '대부거래 계약 주요 조건 (요약본)',
  },
  {
    id: 2,
    key: 'collection',
    label: '대부거래 표준약관',
  },
  {
    id: 3,
    key: 'provision',
    label: '채권양도(담보제공) 승낙서',
  },
]

export const CHECKBOX_STYLES = {
  '.chakra-checkbox__control': {
    borderRadius: '50%',
    border: '1px solid',
    borderColor: 'border.basic.2',
    color: '#4e5053',
    _checked: {
      bg: 'primary.3',
      borderColor: 'primary.3',
      borderRadius: '50%',
    },
  },
  '.chakra-checkbox__control svg': {
    opacity: 1,
    color: '#4e5053',
  },
  '.chakra-checkbox__control[data-checked]': {
    bg: 'primary.3',
    borderColor: 'primary.3',
    borderRadius: '50%',
  },
  '.chakra-checkbox__control[data-checked] svg': {
    color: 'white',
  },
}

export const SQUARE_CHECKBOX_STYLES = {
  '.chakra-checkbox__control': {
    borderRadius: '4px',
    border: '1px solid',
    borderColor: 'border.basic.2',
    _checked: {
      bg: 'primary.3',
      borderRadius: '4px',
      borderColor: 'primary.3',
    },
  },
  '.chakra-checkbox__control[data-checked]': {
    bg: 'primary.3',
    borderRadius: '4px',
    borderColor: 'primary.3',
  },
}
