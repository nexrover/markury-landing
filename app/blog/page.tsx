import { allPosts } from 'contentlayer/generated'
import { compareDesc } from 'date-fns'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import BlogCard from '@/components/blog/BlogCard'
import { Metadata } from 'next'

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://www.markury.app"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Blog",
      "item": "https://www.markury.app/blog"
    }
  ]
}

export const metadata: Metadata = {
  title: 'Blog - Markury',
  description: 'Tips, guides, and tutorials on screen annotation, remote collaboration, and presentations with Markury.',
  alternates: {
    canonical: '/blog',
  },
  openGraph: {
    title: 'Blog - Markury',
    description: 'Tips, guides, and tutorials on screen annotation, remote collaboration, and presentations with Markury.',
    url: 'https://www.markury.app/blog',
    type: 'website',
    images: [
      {
        url: '/markury_og.png',
        width: 1200,
        height: 630,
        alt: 'Markury Blog',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog - Markury',
    description: 'Tips, guides, and tutorials on screen annotation, remote collaboration, and presentations with Markury.',
    images: ['/markury_og.png'],
  },
}

export default function BlogListingPage() {
  const posts = allPosts.sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)))

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <Header />
      <main className="bg-white text-gray-900 min-h-screen pt-40 md:pt-48 pb-24">
        <div className="container-narrow">
          <div className="mb-16">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mb-6">
              Markury Blog
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl">
              Discover tips, guides, and industry insights on how to improve your screen annotations, presentations, and remote collaboration.
            </p>
          </div>

          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <BlogCard key={post._id} post={post} />
            ))}
          </div>
          
          {posts.length === 0 && (
            <div className="text-center py-20 bg-gray-50 rounded-2xl border border-gray-100">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No posts yet</h3>
              <p className="text-gray-500">Check back soon for new articles!</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
