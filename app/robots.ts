import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        disallow: ['/private/', '/api/'],
      },
    ],
    sitemap: 'https://www.markury.app/sitemap.xml',
    host: 'www.markury.app',
  }
}
