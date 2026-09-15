import { NextResponse } from "next/server";

export function GET() {
  return NextResponse.json({ error: "This endpoint does not expose admin data." }, { status: 404 });
}