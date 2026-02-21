import * as React from 'react'
import Image from 'next/image'
import { useMDXComponent } from 'next-contentlayer/hooks'
import InternalLink from './InternalLink'
import BlogCTA from './BlogCTA'

const CustomLink = (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
  const href = props.href

  if (href?.startsWith('/')) {
    return (
      <InternalLink href={href} {...props}>
        {props.children}
      </InternalLink>
    )
  }

  if (href?.startsWith('#')) {
    return <a {...props} />
  }

  return <a target="_blank" rel="noopener noreferrer" {...props} />
}

function RoundedImage(props: any) {
  return <Image alt={props.alt} className="rounded-lg" {...props} />
}

function Callout(props: { emoji: string; children: React.ReactNode }) {
  return (
    <div className="px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 flex items-center text-gray-900 mb-8">
      <div className="flex items-center w-4 mr-4">{props.emoji}</div>
      <div className="w-full callout">{props.children}</div>
    </div>
  )
}

const components = {
  Image: RoundedImage,
  a: CustomLink,
  Callout,
  BlogCTA,
}

interface MdxProps {
  code: string
}

export function Mdx({ code }: MdxProps) {
  const Component = useMDXComponent(code)

  return (
    <article className="prose prose-slate max-w-none 
      prose-headings:text-gray-900 prose-headings:font-bold 
      prose-p:text-gray-700 prose-p:leading-relaxed 
      prose-a:text-primary-600 prose-a:no-underline hover:prose-a:underline
      prose-strong:text-gray-900
      prose-li:text-gray-700
      prose-table:border prose-table:border-gray-200 prose-th:bg-gray-50 prose-th:text-gray-900 prose-th:p-3 prose-td:p-3 prose-td:border-t prose-td:border-gray-200
    ">
      <Component components={{ ...components }} />
    </article>
  )
}
