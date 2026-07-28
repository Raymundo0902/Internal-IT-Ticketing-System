"use server";

import { encrypt, decrypt } from "@/app/lib/session";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";

// Demo credential only — simplified for portfolio purposes.
const tempPasswords = ["1234"];
const tokenExpires = 60 * 60 * 24; // 1 day in seconds

interface FormState {
	success: boolean;
	error: string;
}

export async function login(_state: FormState, formData: FormData) {
	const user = { loginTime: new Date() as Date };
	// In a real application, you would compare a hashed password
	if (!tempPasswords.includes(formData.get("password") as string)) {
		// You can handle login failure here
		return {
			success: false,
			error: "Invalid credentials",
		};
	}

	// Create the session
	const expires = new Date(Date.now() + tokenExpires * 1000);
	const session = await encrypt({ user, expires });
	const cookieStore = await cookies();

	// Set the cookie
	cookieStore.set("session", session, {
		httpOnly: true,
		secure: true, // Use `secure: true` in production
		expires,
		sameSite: "lax",
		path: "/",
	});
	redirect("/submit_ticket");
}

export async function logout() {
	// Destroy the session by deleting the cookie
	(await cookies()).set("session", "", { expires: new Date(0) });
	redirect("/login");
}

// Get the current session
export async function getSession() {
	const session = (await cookies()).get("session")?.value;
	if (!session) return null;
	return await decrypt(session);
}
