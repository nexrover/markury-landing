import { allPosts } from 'contentlayer/generated'
import { compareDesc } from 'date-fns'

export async function GET() {
  const baseUrl = 'https://markury.app'
  const posts = allPosts.sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)))

  const feedXml = `<?xml version="1.0" encoding="utf-8"?>
  <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
    <channel>
      <title>Markury Blog</title>
      <link>${baseUrl}/blog</link>
      <description>Tips, guides, and tutorials on screen annotation, remote collaboration, and presentations with Markury.</description>
      <language>en</language>
      <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
      <atom:link href="${baseUrl}/feed.xml" rel="self" type="application/rss+xml" />
      ${posts
        .map(
          (post) => `
        <item>
          <title>${escapeXml(post.title)}</title>
          <link>${baseUrl}/blog/${post.slug}</link>
          <guid>${baseUrl}/blog/${post.slug}</guid>
          <pubDate>${new Date(post.date).toUTCString()}</pubDate>
          <description>${escapeXml(post.description)}</description>
          <author>${escapeXml(post.author)}</author>
        </item>
      `
        )
        .join('')}
    </channel>
  </rss>`

  return new Response(feedXml, {
    headers: {
      'Content-Type': 'text/xml; charset=utf-8',
    },
  })
}

function escapeXml(unsafe: string) {
  return unsafe.replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case '<': return '&lt;'
      case '>': return '&gt;'
      case '&': return '&amp;'
      case "'": return '&apos;'
      case '"': return '&quot;'
      default: return c
    }
  })
}
