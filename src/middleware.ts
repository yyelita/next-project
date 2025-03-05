import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "./app/lib/session";

export default async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  try {
    const session = req.cookies.get("session")?.value;

    if (!session) {
      throw new Error("Unauthorized");
    }

    const payload = await decrypt(session);
    const response = NextResponse.next();
    response.cookies.set("userId", payload._id as string);
    return response;
  } catch (error: unknown) {
    console.error((error as Error).message);

    if (pathname.startsWith("/api")) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }
}

export const config = {
  matcher: [
    "/((?!login|register|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
