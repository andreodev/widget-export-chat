import { NextRequest, NextResponse } from "next/server";

const allowedReferers = ["https://app.chatlabel.com/"];

export function middleware(req: NextRequest) {
  const referer = req.headers.get("referer");
  if (
    !referer ||
    !allowedReferers.some((domain) => referer.startsWith(domain))
  ) {
    return new Response("Unrestricted access", { status: 403 });
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/exportar"],
};
