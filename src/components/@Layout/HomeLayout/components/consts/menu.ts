export const MENU_ITEMS = [
  {
    label: '대출',
    href: '/loan',
    hasSubmenu: true,
    submenuItems: [
      { label: '비상금 대출', href: '/loan?type=salary' },
      { label: '신용 대출', href: '/loan?type=credit' },
      { label: '부동산 담보대출', href: '/loan?type=mortgage' },
      { label: '대출 절차 안내', href: '/loan?type=procedure' },
    ],
  },
  {
    label: '나의 대출 조회',
    href: '/my-loan',
    hasSubmenu: true,
    submenuItems: [
      { label: '전자계약 작성하기', href: '/my-loan' },
      { label: '대출 현황 조회', href: '/my-loan-status' },
    ],
  },
  {
    label: '고객센터',
    href: '/notice',
    hasSubmenu: true,
    submenuItems: [
      { label: '공지사항', href: '/notice' },
      { label: '자주하는 질문', href: '/faq' },
    ],
  },
  { label: '회사 소개', href: '/company' },
]
