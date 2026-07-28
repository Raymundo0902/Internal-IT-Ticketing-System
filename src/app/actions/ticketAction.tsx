"use server";

import { google } from "googleapis";
import { googleAuth } from "../lib/googleAuth";
import { getSession } from "./loginAction";
import { redirect } from "next/navigation";

export async function ticketSubmitAction(_state: object, formData: FormData) {
	// 1. Get the session
	const session = await getSession();

	// 2. Check if the session exists (user is authenticated)
	if (!session) {
		// Handle unauthorized access: redirect to login or return an error message
		redirect("/login"); // Redirect to login page
		// Alternatively, return an error message to the client-side:
		// return { success: false, error: "You must be logged in to submit a ticket." };
	}

	const rawData = {
		department: formData.get("department"),
		name: formData.get("name"),
		email: formData.get("email"),
		phone: formData.get("phone"),
		location: formData.get("location"),
		issue: formData.get("issue"),
	};

	const formatter = new Intl.DateTimeFormat("en-US", {
		weekday: "long",
		year: "numeric",
		month: "long",
		day: "numeric",
		hour: "numeric",
		minute: "numeric",
		second: "numeric",
		hour12: true,
		timeZone: "America/Los_Angeles",
	});

	const timeSubmitted = formatter.format(new Date());

	const spreadsheetId = process.env.GOOGLE_SHEET_ID;

	if (!spreadsheetId) {
		return {
			success: false,
			errors: ["There was an error connecting to google."],
		};
	}

	try {
		const sheets = google.sheets({
			auth: await googleAuth(),
			version: "v4",
		});

		await sheets.spreadsheets.values.append({
			spreadsheetId,
			range: "Sheet1!A:G",
			valueInputOption: "USER_ENTERED",
			requestBody: {
				values: [
					[
						rawData.name,
						rawData.department,
						rawData.email,
						rawData.phone,
						rawData.issue,
						rawData.location,
						timeSubmitted,
					],
				],
			},
		});

		return {
			success: true,
			errors: null,
		};
	} catch (error: unknown) {
		return {
			success: false,
			errors: ["An error occurred.", error],
		};
	}
}
