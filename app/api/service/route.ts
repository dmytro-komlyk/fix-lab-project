import { NextRequest, NextResponse } from 'next/server'
import { getAllServices } from './data'

// Notice the function definition:
export async function GET(request: NextRequest, response: NextResponse) {
  try {
    const res = getAllServices()
    return NextResponse.json(res, { status: 200 })
  } catch {
    return NextResponse.json('Failed to fetch all services', { status: 500 })
  }
}
