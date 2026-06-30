import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "seatown_container_line_secret_key_2026_safe_fallback!"
);

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const isLoginPage = req.nextUrl.pathname.startsWith("/login");

  if (!token) {
    if (!isLoginPage) {
      return NextResponse.redirect(new URL("/login/admin", req.url));
    }
    return NextResponse.next();
  }

  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    const role = payload.role as string;

    // If logged in and on login page, redirect to dashboard
    if (isLoginPage) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    const pathname = req.nextUrl.pathname;

    // Route Guards based on Role-Based Access Control (RBAC)
    if (pathname.startsWith("/dashboard/users") && role !== "Super Admin") {
      return NextResponse.redirect(new URL("/dashboard/unauthorized", req.url));
    }

    if (pathname.startsWith("/dashboard/settings") && role !== "Super Admin") {
      return NextResponse.redirect(new URL("/dashboard/unauthorized", req.url));
    }

    if (pathname.startsWith("/dashboard/content") && !["Super Admin", "Administrator"].includes(role)) {
      return NextResponse.redirect(new URL("/dashboard/unauthorized", req.url));
    }

    if (pathname.startsWith("/dashboard/media") && !["Super Admin", "Administrator"].includes(role)) {
      return NextResponse.redirect(new URL("/dashboard/unauthorized", req.url));
    }

    if (pathname.startsWith("/dashboard/blog") && !["Super Admin", "Administrator", "Editor"].includes(role)) {
      return NextResponse.redirect(new URL("/dashboard/unauthorized", req.url));
    }

    if (pathname.startsWith("/dashboard/contacts") && !["Super Admin", "Administrator", "Moderator"].includes(role)) {
      return NextResponse.redirect(new URL("/dashboard/unauthorized", req.url));
    }

    if (pathname.startsWith("/dashboard/reviews") && !["Super Admin", "Administrator", "Editor", "Moderator"].includes(role)) {
      return NextResponse.redirect(new URL("/dashboard/unauthorized", req.url));
    }

    return NextResponse.next();
  } catch (err) {
    console.error("Middleware JWT verification failed:", err);
    // Token is invalid/expired, clear cookie and redirect to login
    const response = NextResponse.redirect(new URL("/login/admin", req.url));
    response.cookies.delete("token");
    return response;
  }
}

export const config = {
  matcher: ["/dashboard/:path*", "/login/:path*"],
};