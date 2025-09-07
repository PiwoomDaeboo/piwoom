export const MENU_ITEMS = [
  {
    label: '대출',
    href: '/loan',
    hasSubmenu: true,
    submenuItems: [
      { label: '월급 대출', href: '/loan/salary' },
      { label: '신용 대출', href: '/loan/credit' },
      { label: '부동산 담보대출', href: '/loan/mortgage' },
      { label: '대출 절차 안내', href: '/loan/process' },
    ],
  },
  { label: '나의 대출조회', href: '/my-loan' },
  { label: '고객센터', href: '/customer-service' },
  { label: '회사 소개', href: '/about' },
]
