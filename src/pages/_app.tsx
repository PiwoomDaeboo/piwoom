import { DefaultSeo } from 'next-seo'

import { GoogleTagManager } from '@next/third-parties/google'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import 'slick-carousel/slick/slick-theme.css'
import 'slick-carousel/slick/slick.css'

import { config as SEO } from '@/configs/seo/config'
import withAppProvider from '@/hocs/withAppProvider'

function App({ Component, pageProps }: any) {
  return (
    <>
      <DefaultSeo {...SEO} />
      {/* <ColorModeBtn /> */}
      <GoogleTagManager gtmId="GTM-WQBJW8DZ" />
      <Component {...pageProps} />
      <ReactQueryDevtools initialIsOpen={false} />
    </>
  )
}

export default withAppProvider(App)
