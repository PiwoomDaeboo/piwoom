import localFont from 'next/font/local'

export const Pretendard = localFont({
  src: [
    {
      path: '../../../public/fonts/pretendard/PretendardVariable.woff2',
      weight: '100 900',
    },
  ],
})

export const RubikScribble = localFont({
  src: [
    {
      path: '../../../public/fonts/rubikscribble/RubikScribbleRegular.ttf',
      weight: '400',
    },
  ],
})
