// import { NextResponse } from "next/server";

// export function middleware(req) {
//   const url = req.url;
//   const creatorToken = req.cookies.get("inplayer_access_token");
//   const adminToken = req.cookies.get("admin_access_token");

//   // Protect the creator area
//   if (
//     url.includes("/creator-dashboard") ||
//     url.includes("/upload-video") ||
//     url.includes("/creator-videos") ||
//     url.includes("/creator-analytics") ||
//     url.includes("/creator-faq") ||
//     url.includes("/creator-profile") ||
//     url.includes("/creator-series")
//   ) {
//     if (!creatorToken) {
//       return NextResponse.redirect(new URL("/creator-login", req.url));
//     }
//     return NextResponse.next();
//   }

//   // Protect the admin area
//   if (url.includes("/admin-area")) {
//     if (!adminToken) {
//       return NextResponse.redirect(new URL("/admin-area/login", req.url));
//     }
//     return NextResponse.next();
//   }

//   return NextResponse.next();
// }

// // Apply middleware only to protected routes
// export const config = {
//   matcher: [
//     "/creator-dashboard/:path*",
//     "/upload-video/:path*",
//     "/creator-videos/:path*",
//     "/creator-analytics:path*",
//     "/creator-faq:path*",
//     "/creator-profile:path*",
//     "/creator-series:path*",
//     "/admin-area/:path*",
//   ],
// };

import { NextResponse } from "next/server";

function parseJwt(token) {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    return null;
  }
}

function isTokenExpired(token) {
  const payload = parseJwt(token);
  if (!payload || !payload.exp) return true;
  const currentTime = Math.floor(Date.now() / 1000);
  return payload.exp < currentTime;
}

export function middleware(req) {
  const url = req.url;
  const creatorToken = req.cookies.get("inplayer_access_token");
  const adminToken = req.cookies.get("admin_access_token");

  // Protect the creator area
  if (
    url.includes("/creator-dashboard") ||
    url.includes("/upload-video") ||
    url.includes("/creator-videos") ||
    url.includes("/creator-analytics") ||
    url.includes("/creator-faq") ||
    url.includes("/creator-profile") ||
    url.includes("/creator-series")
  ) {
    if (!creatorToken || isTokenExpired(creatorToken)) {
      return NextResponse.redirect(new URL("/creator-login", req.url));
    }
    return NextResponse.next();
  }

  // Protect the admin area
  if (url.includes("/admin-area")) {
    if (!adminToken || isTokenExpired(adminToken)) {
      return NextResponse.redirect(new URL("/admin-area/login", req.url));
    }
    return NextResponse.next();
  }

  return NextResponse.next();
}

// Apply middleware only to protected routes
export const config = {
  matcher: [
    "/creator-dashboard/:path*",
    "/upload-video/:path*",
    "/creator-videos/:path*",
    "/creator-analytics/:path*",
    "/creator-faq/:path*",
    "/creator-profile/:path*",
    "/creator-series/:path*",
    "/admin-area/:path*",
  ],
};
