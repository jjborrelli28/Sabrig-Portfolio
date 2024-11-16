import * as contentful from 'contentful'
import { createClient } from 'contentful'

export const client = (preview = false) =>
  createClient({
    space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID ?? '',
    accessToken:
      (preview
        ? process.env.NEXT_PUBLIC_CONTENTFUL_PREVIEW_ACCESS_TOKEN
        : process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN) ?? '',
    host: preview ? 'preview.contentful.com' : 'cdn.contentful.com',
  })

type PageFields = {
  name: contentful.EntryFieldTypes.Text
  slug: contentful.EntryFieldTypes.Text
}

type PageEntrySkeleton = {
  contentTypeId: 'page'
  fields: PageFields
}

const parseSlug = (slug: string[], preview: boolean) => {
  if (!slug || (slug.length === 1 && slug[0] === 'preview')) return 'homepage'

  if (preview) return slug.slice(0, -1).join('/')

  return slug.join('/')
}

const getPageData = async (slug: string[]) => {
  const preview = slug?.[slug?.length - 1] === 'preview'
  const parsedSlug = parseSlug(slug, preview)
  const response = await client(preview).getEntries<PageEntrySkeleton>({
    content_type: 'page',
    'fields.slug': parsedSlug,
    include: 3,
  })

  return response.items[0]?.fields
}

export default getPageData