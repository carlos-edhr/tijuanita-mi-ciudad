import { NextRequest, NextResponse } from "next/server";

export const config = {
  /* 
        Match all patchs except for:
        1. /api rotues
        2. /_next (Next.js internals)
        3. /_static (inside /public)
        4. all root files inside /public (e.g. /favicon.ico)
    */
  matcher: ["/((?!api/|_next/|_static/|_vercel|media/|[\w-]+\.\w+).*)"],
};

export default async function middleware(req: NextRequest) {
  const url = req.nextUrl;
  // Extract the hsotname (e.g. "antonio.funroad.com" or "john.localhost")
  const hostname = req.headers.get("host") || "";

  const rootDomain = process.env.NEXT_PUBLIC_ROOT_DOMAIN || "";

  if (hostname.endsWith(`.${rootDomain}`)) {
    const tenantSlug = hostname.replace(`.${rootDomain}`, "");
    return NextResponse.rewrite(
      new URL(`/tenants/${tenantSlug}${url.pathname}`, req.url),
    );
  }
  return NextResponse.next();
}
