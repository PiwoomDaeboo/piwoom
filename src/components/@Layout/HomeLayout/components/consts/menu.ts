export const MENU_ITEMS = [
  {
    label: '대출',
    href: '/loan',
    hasSubmenu: true,
    submenuItems: [
      { label: '월급 대출', href: '/loan?type=salary' },
      { label: '신용 대출', href: '/loan?type=credit' },
      { label: '부동산 담보대출', href: '/loan?type=mortgage' },
      { label: '대출 절차 안내', href: '/loan?type=process' },
    ],
  },
  { label: '나의 대출조회', href: '/myloan' },
  { label: '고객센터', href: '/notice' },
  { label: '회사 소개', href: '/company' },
]
