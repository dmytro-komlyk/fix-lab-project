import { revalidateTag } from 'next/cache'
import type { NextRequest } from 'next/server'

export const dynamic = 'force-dynamic'
export const revalidate = 60

export async function GET(_request: NextRequest) {
  revalidateTag('blog-posts')
  return Response.json({ revalidated: true, now: Date.now() })
}
