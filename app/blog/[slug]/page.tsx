import { notFound } from 'next/navigation'
import { allPosts } from 'contentlayer/generated'
import { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Mdx } from '@/components/blog/Mdx'
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
      <main className="bg-white pt-32 pb-24">
        <article className="container-narrow px-6 lg:px-8">
          <header className="mb-12 text-center max-w-3xl mx-auto">
            <time dateTime={post.date} className="block text-sm text-gray-500 mb-4 font-medium tracking-wide uppercase">
              {format(parseISO(post.date), 'LLLL d, yyyy')}
            </time>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight mb-6">
              {post.title}
            </h1>
            <div className="flex items-center justify-center gap-4 text-gray-600 font-medium">
              <span>By {post.author}</span>
            </div>
          </header>

          <div className="mx-auto max-w-3xl">
            <Mdx code={post.body.code} />
          </div>
        </article>
      </main>
      <Footer />
    </>
  )
}
