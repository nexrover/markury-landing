import { notFound } from 'next/navigation'
import { allPosts } from 'contentlayer/generated'
import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Mdx } from '@/components/blog/Mdx'
import TableOfContents from '@/components/blog/TableOfContents'
import { format, parseISO } from 'date-fns'

interface PostProps {
  params: {
    slug: string
  }
}

async function getPostFromParams(params: PostProps['params']) {
  const slug = params?.slug
  const post = allPosts.find((post) => post.slug === slug)

  if (!post) {
    return null
  }

  return post
}

function estimateReadingTime(text: string): number {
  const wordsPerMinute = 200
  const words = text.split(/\s+/).length
  return Math.max(1, Math.ceil(words / wordsPerMinute))
}

export async function generateMetadata({
  params,
}: PostProps): Promise<Metadata> {
  const post = await getPostFromParams(params)

  if (!post) {
    return {}
  }

  return {
    title: post.title,
    description: post.description,
    authors: [{ name: post.author }],
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
      url: `https://markury.app/blog/${post.slug}`,
      images: [
        {
          url: post.ogImage || post.coverImage,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: [post.ogImage || post.coverImage],
    },
  }
}

export async function generateStaticParams(): Promise<PostProps['params'][]> {
  return allPosts.map((post) => ({
    slug: post.slug,
  }))
}

export default async function PostPage({ params }: PostProps) {
  const post = await getPostFromParams(params)

  if (!post) {
    notFound()
  }

  const readingTime = estimateReadingTime(post.body.raw)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    image: (post.ogImage || post.coverImage).startsWith('http') ? (post.ogImage || post.coverImage) : `https://markury.app${post.ogImage || post.coverImage}`,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      '@type': 'Organization',
      name: post.author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Markury',
      logo: {
        '@type': 'ImageObject',
        url: 'https://markury.app/favicon/favicon-96x96.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://markury.app/blog/${post.slug}`,
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <main className="bg-white pt-32 md:pt-36 pb-24">
        <article>
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="container-narrow flex items-center gap-2 text-sm mt-4 mb-8">
            <Link href="/blog" className="font-medium text-gray-900 hover:text-primary-600 transition-colors">
              Blog
            </Link>
            <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
            <span className="text-gray-500 truncate max-w-[280px] sm:max-w-md">
              {post.title}
            </span>
          </nav>

          {/* Cover Image */}
          <div className="container-narrow mb-10">
            <div className="relative aspect-[2/1] rounded-2xl overflow-hidden bg-gradient-to-br from-primary-50 to-gray-100 shadow-lg">
              <Image
                src={post.coverImage}
                alt={post.title}
                fill
                priority
                quality={90}
                className="object-cover"
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
            </div>
          </div>

          {/* Two-column layout: TOC on left, everything else on right */}
          <div className="container-narrow">
            <div className="relative xl:grid xl:grid-cols-[280px_1fr] xl:gap-20">
              {/* Table of Contents — sticky sidebar */}
              <TableOfContents />

              {/* Right column: Title + Meta + Content */}
              <div className="max-w-[730px]">
                {/* Post Header */}
                <header className="mb-10 pt-4">
                  <h1 
                    className="text-4xl sm:text-5xl md:text-[52px] font-black text-[#111827] mb-5 font-sans"
                    style={{ lineHeight: 1.05, letterSpacing: '-0.04em' }}
                  >
                    {post.title}
                  </h1>

                  <p className="text-lg text-gray-500 leading-relaxed mb-8">
                    {post.description}
                  </p>

                  {/* Author + Meta row */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-8 border-b border-gray-200">
                    <div className="flex items-center gap-3">
                      {post.author && (
                        <>
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-400 to-markury-cyan flex items-center justify-center text-white text-sm font-bold shadow-sm shrink-0">
                            {post.author.charAt(0)}
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900 text-[15px] leading-tight">
                              {post.author}
                            </p>
                            <p className="text-sm text-gray-500">
                              Author
                            </p>
                          </div>
                        </>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1.5">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>{readingTime} min read</span>
                      </div>
                      <span className="text-gray-300 hidden sm:block">•</span>
                      <time dateTime={post.date} className="font-medium">
                        {format(parseISO(post.date), 'MMM d, yyyy')}
                      </time>
                    </div>
                  </div>
                </header>

                {/* Article Content */}
                <Mdx code={post.body.code} />
              </div>
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </>
  )
}

