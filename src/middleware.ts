import { NextResponse, type NextRequest } from "next/server";
import { withoutLocale } from "./lib/i18n";
import legacyPosts from "./content/legacy-posts.json";

const legacyPaths = new Map(legacyPosts.map((post) => [
    post.oldPath.replace(/\/$/, ""),
    post.portuguesePath,
]));

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    const migratedPath = legacyPaths.get(pathname.replace(/\/$/, ""));
    if (migratedPath) {
        const url = request.nextUrl.clone();
        url.pathname = migratedPath;
        return NextResponse.redirect(url, 301);
    }

    // English keeps the site's existing public URLs.
    if (pathname === "/en" || pathname.startsWith("/en/")) {
        const url = request.nextUrl.clone();
        url.pathname = withoutLocale(pathname);
        return NextResponse.redirect(url, 308);
    }

    if (pathname === "/pt" || pathname.startsWith("/pt/")) {
        return NextResponse.next();
    }

    const url = request.nextUrl.clone();
    url.pathname = `/en${pathname === "/" ? "" : pathname}`;
    return NextResponse.rewrite(url);
}

export const config = {
    matcher: ["/((?!api|_next|.*\\..*).*)"],
};
