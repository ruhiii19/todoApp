import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
    const isLoggedIn = req.cookies.get("isLoggedIn")?.value === "true";
    if (!isLoggedIn && req.nextUrl.pathname === "/completed") {
        return NextResponse.redirect(new URL("/login", req.url));
    }
    return NextResponse.next();
}
