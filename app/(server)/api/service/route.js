import { NextResponse } from "next/server";
import { getAllServices } from "./data";

// Notice the function definition:
export async function GET(req, res) {
  // ...
  return NextResponse.json(getAllServices());
}
