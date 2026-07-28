import { type NextRequest, NextResponse } from "next/server";
import { decrypt } from "@/app/lib/session";
import { cookies } from "next/headers";

// 1. Specify protected and public routes
const protectedRoutes = ["/submit_ticket"];

export default async function middleware(req: NextRequest) {
	// 2. Check if the current route is protected or public
	const path = req.nextUrl.pathname;
	const isProtectedRoute = protectedRoutes.includes(path);

	// 3. Decrypt the session from the cookie
	const cookieStore = await cookies();
	const cookie = cookieStore.get("session")?.value;
	const session = await decrypt(cookie);

	if (isProtectedRoute && !session?.user) {
		// 1. Redirect unauthenticated users from protected routes to login
		return NextResponse.redirect(new URL("/login", req.nextUrl));
	}
	// 2. Redirect authenticated users trying to access the login page to submit_ticket
	if (path === "/login" && session?.user) {
		return NextResponse.redirect(new URL("/submit_ticket", req.nextUrl));
	}

	return NextResponse.next();
}

export const config = {
	matcher: ["/login", "/submit_ticket"],
};
