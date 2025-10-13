import fs from 'fs'
import path from 'path'

import { NextApiRequest, NextApiResponse } from 'next'

import { ENV } from '@/configs/env'

/* eslint-disable @typescript-eslint/no-var-requires */
const prettier = require('prettier')

export default async function Sitemap(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    // 파일 시스템에서 sitemap.json 읽기
    const filePath = path.join(process.cwd(), 'public', 'sitemap.json')
    const fileContents = fs.readFileSync(filePath, 'utf8')
    const localRoutes = JSON.parse(fileContents)

    // 도메인 설정
    const protocol = req.headers.host?.includes('localhost') ? 'http' : 'https'
    const host = 'piwoom.com'
    const DOMAIN = `${protocol}://${host}`

    /**
     * externalRoutes: 백엔드 서버로 부터 받아옵니다.
     * 해당 프로젝트에 맞게 수정해야하는 부분입니다. 하나 이상의 api 호출이 필요할 수도 있습니다.
     */
    // const { data } = await axios.get('https://api.tagamall.com/api/v1/product/');
    // const externalRoutes = data.map((item: any) => `/items/${item.id}`);

    /**
     * localRoutes와 externalRoutes를 합하여 전체 routes를 구성합니다.
     */
    // const routes = [...localRoutes, ...externalRoutes];
    const routes = [...localRoutes]

    const urlSet = routes
      .map((route) => {
        return `
        <url>
            <loc>${`${DOMAIN}${route}`}</loc>
        </url>
        `
      })
      .join('')

    const sitemap = `
    <?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${urlSet}
    </urlset>
    `

    const formatted = prettier.format(sitemap, { parser: 'html' })

    // set response content header to xml
    res.setHeader('Content-Type', 'text/xml')
    // write the sitemap
    res.write(formatted)
    res.end()
  } catch (error) {
    res.status(500).json({ error })
  }
}
