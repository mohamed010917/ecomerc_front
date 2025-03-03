import { NextResponse } from "next/server";

export function middleware(request) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("admin")?.value;
  let user ;
  // حماية لوحة التحكم
  if (pathname.startsWith("/dashbord")) {
    if (!token ) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  // إعادة توجيه المستخدم المسجّل إذا حاول الدخول لصفحة تسجيل الدخول
  if (pathname.startsWith("/admin/login")) {
    if (token) {
      return NextResponse.redirect(new URL("/dashbord", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashbord/:path*", "/dashbord", "/admin/login"],
};
