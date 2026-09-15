import { NextRequest, NextResponse } from "next/server";

const cookieName = "ab_admin_session";

function unauthorized(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith("/api/")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const url = request.nextUrl.clone();
  url.pathname = "/admin/login";
  url.searchParams.set("next", request.nextUrl.pathname);
  return NextResponse.redirect(url);
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (pathname === "/admin/login" || pathname === "/api/admin/login" || pathname === "/api/admin/logout") {
    return NextResponse.next();
  }

  const token = request.cookies.get(cookieName)?.value;
  const configured = process.env.ADMIN_PASSWORD && (process.env.ADMIN_SESSION_SECRET || process.env.ADMIN_PASSWORD);
  if (!configured || !token) return unauthorized(request);

  const [expires, signature] = token.split(".");
  if (!expires || !signature || Number(expires) < Date.now()) return unauthorized(request);

  const bytes = new TextEncoder();
  const key = await crypto.subtle.importKey("raw", bytes.encode(process.env.ADMIN_SESSION_SECRET || process.env.ADMIN_PASSWORD), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const signed = await crypto.subtle.sign("HMAC", key, bytes.encode(expires));
  const expected = Array.from(new Uint8Array(signed)).map((byte) => byte.toString(16).padStart(2, "0")).join("");
  if (signature !== expected) return unauthorized(request);

  return NextResponse.next();
}

export const config = { matcher: ["/admin/:path*", "/api/admin/:path*"] };