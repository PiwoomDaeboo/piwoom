import { NextPage } from 'next'
import dynamic from 'next/dynamic'
import Head from 'next/head'

const Ekyc = dynamic(() => import('../containers/MyLoan/components/ekyc'), {
  ssr: false,
})

const EkycPage: NextPage = () => {
  return (
    <>
      <Head>
        <style
          dangerouslySetInnerHTML={{
            __html: `
            * {
              margin: 0;
              padding: 0;
              box-sizing: border-box;
            }

            html,
            body {
              height: 100vh;
              overflow: scroll;

            }

            #__next {
              height: 100vh;
              width: 100vw;
            }
          `,
          }}
        />
      </Head>
      <Ekyc />
    </>
  )
}

export default EkycPage
