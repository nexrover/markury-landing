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

function CustomTable(props: React.HTMLAttributes<HTMLTableElement>) {
  return (
    <div className="my-8 overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
      <table className="w-full text-sm border-collapse" {...props} />
    </div>
  )
}

function CustomThead(props: React.HTMLAttributes<HTMLTableSectionElement>) {
  return <thead className="bg-gray-50 border-b border-gray-200" {...props} />
}

function CustomTh(props: React.ThHTMLAttributes<HTMLTableCellElement>) {
  return (
    <th
      className="px-5 py-3.5 text-left text-xs font-bold text-gray-500 uppercase tracking-wider first:rounded-tl-xl last:rounded-tr-xl"
      {...props}
    />
  )
}

function CustomTd(props: React.TdHTMLAttributes<HTMLTableCellElement>) {
  return (
    <td
      className="px-5 py-3.5 text-sm text-gray-700 border-t border-gray-100 whitespace-nowrap"
      {...props}
    />
  )
}

function CustomTr(props: React.HTMLAttributes<HTMLTableRowElement>) {
  return <tr className="even:bg-gray-50/50 transition-colors hover:bg-primary-50/30" {...props} />
}

const components = {
  Image: RoundedImage,
  a: CustomLink,
  Callout,
  BlogCTA,
  table: CustomTable,
  thead: CustomThead,
  th: CustomTh,
  td: CustomTd,
  tr: CustomTr,
}

interface MdxProps {
  code: string
}

export function Mdx({ code }: MdxProps) {
  const Component = useMDXComponent(code)

  return (
    <article className="prose prose-lg prose-slate max-w-[730px]
      prose-p:text-[18px] prose-p:leading-[1.6] prose-p:text-gray-700
      prose-headings:text-gray-900 prose-headings:tracking-tight
      prose-h2:text-[40px] prose-h2:leading-[1.1] prose-h2:font-bold prose-h2:mt-12 prose-h2:mb-6
      prose-h3:text-[28px] prose-h3:leading-[1.4] prose-h3:font-semibold prose-h3:mt-10 prose-h3:mb-4
      prose-a:text-primary-600 prose-a:no-underline hover:prose-a:underline
      prose-strong:text-gray-900
      prose-li:text-[18px] prose-li:leading-[1.6] prose-li:text-gray-700
      prose-ol:text-[18px] prose-ul:text-[18px]
    ">
      <Component components={{ ...components }} />
    </article>
  )
}

