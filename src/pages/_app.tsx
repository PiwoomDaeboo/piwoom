import { DefaultSeo } from 'next-seo'

import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import { TokGuideDrawer } from '@/components/@Drawer/TokGuideDrawer/TokGuideDrawer'
import { OpenBtn } from '@/components/OpenBtn'
import { config as SEO } from '@/configs/seo/config'
import withAppProvider from '@/hocs/withAppProvider'

function App({ Component, pageProps }: any) {
  return (
    <>
      <DefaultSeo {...SEO} />
      {/* <ColorModeBtn /> */}
      <Component {...pageProps} />
      <ReactQueryDevtools initialIsOpen={false} />
    </>
  )
}

export default withAppProvider(App)
