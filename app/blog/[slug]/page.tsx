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
          url: post.coverImage,
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
      images: [post.coverImage],
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
    image: `https://markury.app${post.coverImage}`,
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
          <nav aria-label="Breadcrumb" className="container-narrow flex items-center gap-2 text-sm mt-4 mb-6">
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

          {/* Hero Cover Image — same width as header */}
          <div className="container-narrow mb-12">
            <div className="relative aspect-[21/9] rounded-2xl overflow-hidden bg-gradient-to-br from-primary-50 to-gray-100 shadow-lg">
              <Image
                src={post.coverImage}
                alt={post.title}
                fill
                priority
                className="object-cover"
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
            </div>
          </div>

          {/* Post Header */}
          <header className="mb-12 text-center max-w-3xl mx-auto px-6 lg:px-8">

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-6 leading-tight">
              {post.title}
            </h1>

            <p className="text-lg text-gray-500 mb-8 max-w-2xl mx-auto leading-relaxed">
              {post.description}
            </p>

            {/* Author + Meta row */}
            <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
              <div className="flex items-center gap-2.5 bg-gray-50 rounded-full px-4 py-2 border border-gray-100">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-400 to-markury-cyan flex items-center justify-center text-white text-xs font-bold shrink-0">
                  {post.author.charAt(0)}
                </div>
                <span className="font-semibold text-gray-900">{post.author}</span>
              </div>

              <span className="text-gray-300">·</span>

              <time dateTime={post.date} className="text-gray-500 font-medium">
                {format(parseISO(post.date), 'LLLL d, yyyy')}
              </time>

              <span className="text-gray-300">·</span>

              <span className="text-gray-500 font-medium">
                {readingTime} min read
              </span>
            </div>
          </header>

          {/* Divider */}
          <div className="container-narrow mb-12">
            <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
          </div>

          {/* Two-column layout: TOC + Content */}
          <div className="container-narrow">
            <div className="relative xl:grid xl:grid-cols-[220px_1fr] xl:gap-12">
              {/* Table of Contents — sticky sidebar */}
              <TableOfContents />

              {/* Article Content */}
              <div className="max-w-3xl">
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
