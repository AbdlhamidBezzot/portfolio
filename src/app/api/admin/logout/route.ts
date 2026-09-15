import { NextResponse } from "next/server";
import { adminCookie } from "@/lib/admin-auth";

function clearSession(request: Request) {
  const response = NextResponse.redirect(new URL("/admin/login", request.url));
  response.cookies.set(adminCookie.name, "", { httpOnly: true, sameSite: "strict", secure: process.env.NODE_ENV === "production", maxAge: 0, path: "/" });
  return response;
}

export async function POST(request: Request) { return clearSession(request); }
export async function GET(request: Request) { return clearSession(request); }