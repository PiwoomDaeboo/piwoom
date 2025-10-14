import fs from 'fs'
import path from 'path'

import { NextApiRequest, NextApiResponse } from 'next'

export default async function Sitemap(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    console.log('Sitemap API called')
    console.log('Headers:', req.headers)

    // 파일 시스템에서 sitemap.json 읽기
    const filePath = path.join(process.cwd(), 'public', 'sitemap.json')
    console.log('Looking for sitemap.json at:', filePath)

    if (!fs.existsSync(filePath)) {
      throw new Error(`sitemap.json not found at ${filePath}`)
    }

    const fileContents = fs.readFileSync(filePath, 'utf8')
    const localRoutes = JSON.parse(fileContents)
    console.log('Loaded routes:', localRoutes)

    // 도메인 설정 - 더 유연하게
    const host = req.headers.host || 'localhost:3000'
    const isLocalhost = host.includes('localhost') || host.includes('127.0.0.1')
    const protocol = isLocalhost ? 'http' : 'https'
    const DOMAIN = `${protocol}://${host}`

    console.log('Using domain:', DOMAIN)

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
        return `  <url>
    <loc>${DOMAIN}${route}</loc>
  </url>`
      })
      .join('\n')

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlSet}
</urlset>`

    console.log('Generated sitemap:', sitemap)

    // set response content header to xml
    res.setHeader('Content-Type', 'text/xml; charset=utf-8')
    res.setHeader('Cache-Control', 'public, max-age=3600, s-maxage=3600')
    res.status(200).send(sitemap)
  } catch (error) {
    console.error('Sitemap generation error:', error)
    res.status(500).json({
      error: 'Failed to generate sitemap',
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
    })
  }
}
