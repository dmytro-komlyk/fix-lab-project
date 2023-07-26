import { NextRequest, NextResponse } from "next/server";
import { getAllServices } from "./data";

// Notice the function definition:
export async function GET(req:NextRequest, res:NextResponse) {
  // ...
  return NextResponse.json(getAllServices());
}
