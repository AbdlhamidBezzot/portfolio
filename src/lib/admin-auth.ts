import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

const cookieName = "ab_admin_session";
const maxAge = 60 * 60 * 12;
function secret() { return process.env.ADMIN_SESSION_SECRET || process.env.ADMIN_PASSWORD || ""; }
export function adminPasswordIsConfigured() { return Boolean(process.env.ADMIN_PASSWORD && secret()); }
export function isPasswordValid(password: string) { const expected = process.env.ADMIN_PASSWORD || ""; if (!expected || password.length !== expected.length) return false; return timingSafeEqual(Buffer.from(password), Buffer.from(expected)); }
export function createAdminToken() { const expires = Date.now() + maxAge * 1000; const payload = String(expires); const signature = createHmac("sha256", secret()).update(payload).digest("hex"); return `${payload}.${signature}`; }
export function verifyAdminToken(token?: string) { if (!token || !secret()) return false; const [expires, signature] = token.split("."); if (!expires || !signature || Number(expires) < Date.now()) return false; const expected = createHmac("sha256", secret()).update(expires).digest("hex"); return signature.length === expected.length && timingSafeEqual(Buffer.from(signature), Buffer.from(expected)); }
export function hasAdminSession() { return verifyAdminToken(cookies().get(cookieName)?.value); }
export const adminCookie = { name: cookieName, maxAge };