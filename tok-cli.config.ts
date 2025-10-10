import { RootConfig } from '@toktokhan-dev/cli'
import { commit } from '@toktokhan-dev/cli-plugin-commit'
import { genApi } from '@toktokhan-dev/cli-plugin-gen-api-react-query'
import { genIcon } from '@toktokhan-dev/cli-plugin-gen-icon-chakra'
import { genImg } from '@toktokhan-dev/cli-plugin-gen-img'
import { genRoutePage } from '@toktokhan-dev/cli-plugin-gen-route-pages'
import { genSitemap } from '@toktokhan-dev/cli-plugin-gen-sitemap-next-page'
import { genSource } from '@toktokhan-dev/cli-plugin-gen-source'
import { genTheme } from '@toktokhan-dev/cli-plugin-gen-theme-chakra'

const config: RootConfig<{
  plugins: [
    typeof genImg,
    typeof genRoutePage,
    typeof genApi,
    typeof genTheme,
    typeof genIcon,
    typeof genSource,
    typeof commit,
    typeof genSitemap,
  ]
}> = {
  plugins: [
    genImg,
    genRoutePage,
    genApi,
    genTheme,
    genIcon,
    genSource,
    commit,
    genSitemap,
  ],
  'gen:img': {
    input: 'public/images',
    oneDepth: true,
    basePath: '/images',
  },
  'gen:route': {
    oneDepth: true,
  },
  'gen:api': {
    swaggerSchemaUrl: 'https://api.piwoom.com/openapi.json/',
  },
  'gen:theme': {
    tokenModes: {
      colors: {
        light: 'light',
        dark: 'dark',
      },
      textStyles: {
        base: 'mobile',
        sm: 'tablet',
        md: 'desktop',
      },
    },
  },
  'gen:icon': {
    input: 'public/icons',
  },
  'gen:source': {
    appName: 'toktokhan-dev',
  },
  'gen:sitemap': {
    domain: 'https://piwoom.com',
    input: './src/pages',
    output: 'public/sitemap.json',
    ignored: [
      '**/api/**',
      '**/_app.{ts,tsx}',
      '**/_document.{ts,tsx}',
      '**/_error.{ts,tsx}',
    ],
    routeMapper: {
      '/goods/[id]': [
        '/goods/0',
        '/goods/1',
        '/goods/2',
        '/goods/3',
        ...'/goods/99',
      ],
    },
  },
}
export default config
