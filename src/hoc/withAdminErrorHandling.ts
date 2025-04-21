// This one is used on the admin area routes!
import { NextResponse } from "next/server";

export function withAdminErrorHandling(
  handler: (req: Request) => Promise<Response>
): (req: Request) => Promise<Response> {
  return async (req: Request): Promise<Response> => {
    try {
      return await handler(req);
    } catch (error: any) {
      console.error("API error:", error);

      // Redirect to login if unauthorized
      if (error.status === 401 || error.message?.includes("Authorization")) {
        return NextResponse.redirect(new URL("/admin-area/login", req.url));
      }

      // Ensure we always return a NextResponse
      return NextResponse.json(
        { error: error.message || "An unexpected error occurred." },
        { status: error.status || 500 }
      );
    }
  };
}
