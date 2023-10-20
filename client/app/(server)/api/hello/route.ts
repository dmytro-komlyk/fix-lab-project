import { NextResponse } from 'next/server'

// Notice the function definition:
export async function GET() {
  // ...
  return NextResponse.json({ message: 'Hello from Next.js!' })
}
