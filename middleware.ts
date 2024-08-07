import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const url = req.url;
  const newURL = new URL("/auth/signin", url);

  if (!req.cookies.has("AUTH")) {
    return NextResponse.redirect(newURL.href);
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/counselor/sessions",
    "/counselor/sessions/schedule",
    "/counselor/counselee",
    "/counselor/activities",
    "/counselor/attendance",
    "/counselor/sadhana",
    "/counselor/scan",
    "/counselor/sadhana/configure",
    "/cct/counselee",
    "/cct/changecounselor",
    "/cct/counselors",
    "/cct/cbmmeetings",
    "/cct/cbmattendance",
    "/cct/sevas",
    "/cct/planningrelocate",
    "/cct/scan",
  ],
};
