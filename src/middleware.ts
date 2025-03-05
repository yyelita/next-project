import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "./app/lib/session";

export default async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const session = req.cookies.get("session")?.value;

  // Allow public routes without authentication
  //   const isPublicRoute = ["/", "/login", "/register"].includes(pathname);

  if (!session) {
    // If the user is NOT logged in, only block protected routes
    const isProtectedRoute =
      pathname.startsWith("/products") || pathname.startsWith("/cart");
    if (isProtectedRoute) {
      return NextResponse.redirect(new URL("/login", req.nextUrl)); // Redirect to root instead of login
    }
    return NextResponse.next();
  }

  try {
    // Validate the session
    const payload = await decrypt(session);
    const response = NextResponse.next();
    response.cookies.set("userId", payload._id as string);
    return response;
  } catch (error) {
    console.error("Invalid session:", error);

    // If session is invalid, clear it and send the user to "/"
    const response = NextResponse.redirect(new URL("/", req.nextUrl));
    response.cookies.delete("session");
    return response;
  }
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
