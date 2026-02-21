import Link from 'next/link'
import Image from 'next/image'
import { format, parseISO } from 'date-fns'
import { Post } from 'contentlayer/generated'

interface BlogCardProps {
  post: Post
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <article className="group relative flex flex-col bg-white rounded-2xl border border-gray-200/80 hover:border-primary-200 overflow-hidden transition-all duration-500 hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:-translate-y-1">
      {/* Cover image with gradient overlay */}
      <div className="w-full relative aspect-[16/9] bg-gradient-to-br from-primary-50 to-gray-100 overflow-hidden">
        <Image
          src={post.coverImage}
          alt={post.title}
          fill
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.08]"
          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
        />
        {/* Subtle bottom gradient for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      {/* Content */}
      <div className="px-6 pb-6 pt-5 flex flex-col flex-1">
        {/* Date badge */}
        <div className="flex items-center gap-3 mb-4">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-primary-50 text-primary-700 tracking-wide">
            {format(parseISO(post.date), 'MMM d, yyyy')}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold leading-snug text-gray-900 group-hover:text-primary-600 transition-colors duration-300 line-clamp-2 mb-3">
          <Link href={post.url} className="after:absolute after:inset-0 after:z-10 focus:outline-none">
            {post.title}
          </Link>
        </h3>

        {/* Description */}
        <p className="text-sm leading-relaxed text-gray-500 line-clamp-3 mb-5 flex-1">
          {post.description}
        </p>

        {/* Author + Read more */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-primary-400 to-markury-cyan flex items-center justify-center text-white text-xs font-bold">
              {post.author.charAt(0)}
            </div>
            <span className="text-xs font-medium text-gray-600">
              {post.author}
            </span>
          </div>
          <span className="text-xs font-semibold text-primary-600 group-hover:text-primary-700 flex items-center gap-1 transition-colors">
            Read more
            <svg className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </span>
        </div>
      </div>
    </article>
  )
}
