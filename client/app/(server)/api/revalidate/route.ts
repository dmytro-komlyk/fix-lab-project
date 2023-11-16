import { revalidateTag } from 'next/cache'
import type { NextRequest } from 'next/server'

export async function GET(_request: NextRequest) {
  revalidateTag('blog-posts')
  return Response.json({ revalidated: true, now: Date.now() })
}
