import { defineDocumentType, makeSource } from 'contentlayer/source-files'
import remarkGfm from 'remark-gfm'

export const Post = defineDocumentType(() => ({
  name: 'Post',
  filePathPattern: `blog/**/*.mdx`,
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    description: { type: 'string', required: true },
    date: { type: 'date', required: true },
    slug: { type: 'string', required: true },
    author: { type: 'string', required: true },
    coverImage: { type: 'string', required: true },
    ogImage: { type: 'string', required: false },
    cardImage: { type: 'string', required: false },
  },
  computedFields: {
    url: { type: 'string', resolve: (post) => `/blog/${post.slug}` },
  },
}))

export default makeSource({
  contentDirPath: 'content',
  documentTypes: [Post],
  mdx: {
    remarkPlugins: [remarkGfm],
  },
})

