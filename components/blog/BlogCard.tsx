import Link from 'next/link'
import Image from 'next/image'
import { format, parseISO } from 'date-fns'
import { Post } from 'contentlayer/generated'

interface BlogCardProps {
  post: Post
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <article className="group relative flex flex-col items-start justify-between bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300 overflow-hidden">
      <div className="w-full relative aspect-[16/9] bg-gray-100 mb-4 overflow-hidden">
        <Image
          src={post.coverImage}
          alt={post.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
        />
      </div>
      <div className="px-6 pb-6 pt-2 flex flex-col flex-1">
        <div className="flex items-center gap-x-4 text-xs mb-3">
          <time dateTime={post.date} className="text-gray-500 font-medium">
            {format(parseISO(post.date), 'LLLL d, yyyy')}
          </time>
        </div>
        <div className="group relative">
          <h3 className="mt-3 text-xl font-semibold leading-tight text-gray-900 group-hover:text-primary-600 transition-colors line-clamp-2">
            <Link href={post.url}>
              <span className="absolute inset-0" />
              {post.title}
            </Link>
          </h3>
          <p className="mt-4 text-base leading-relaxed text-gray-600 line-clamp-3">
            {post.description}
          </p>
        </div>
        <div className="mt-6 flex items-center gap-x-4 mt-auto">
          <div className="text-sm leading-6">
            <p className="font-semibold text-gray-900">
              <span className="absolute inset-0" />
              {post.author}
            </p>
          </div>
        </div>
      </div>
    </article>
  )
}
