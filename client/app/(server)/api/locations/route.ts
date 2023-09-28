import { NextResponse } from 'next/server'

import { getAllLocations } from './data'

// Notice the function definition:
export async function GET() {
  // ...
  return NextResponse.json(getAllLocations())
}
