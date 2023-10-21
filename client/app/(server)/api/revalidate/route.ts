import { revalidatePath } from 'next/cache'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  if (request.nextUrl.searchParams.get('secret') !== 'fixlab') {
    return new Response(`Invalid credentials`, {
      status: 500,
    })
  }
  const path = request.nextUrl.searchParams.get('path') as string
  revalidatePath(path)
  return NextResponse.json({
    revalidate: true,
  })
}
