import { type NextRequest, NextResponse } from "next/server";
import { google } from "googleapis";
import { getEnvVar } from "@/app/helper";

export async function POST(req: NextRequest) {
	const { to, subject, message } = await req.json();

	try {
		// Load credentials from env
		const CLIENT_ID = getEnvVar(process.env.GOOGLE_CLIENT_ID);
		const CLIENT_SECRET = getEnvVar(process.env.GOOGLE_CLIENT_SECRET);
		const REDIRECT_URI = "https://developers.google.com/oauthplayground";
		const REFRESH_TOKEN = getEnvVar(process.env.GOOGLE_REFRESH_TOKEN);

		const oAuth2Client = new google.auth.OAuth2(
			CLIENT_ID,
			CLIENT_SECRET,
			REDIRECT_URI,
		);

		oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

		const gmail = google.gmail({ version: "v1", auth: oAuth2Client });

		// Create base64 email
		const emailLines = [
			`To: ${to}`,
			"Content-Type: text/html; charset=utf-8",
			"MIME-Version: 1.0",
			`Subject: ${subject}`,
			"",
			message,
		];

		const email = emailLines.join("\n");
		const encodedEmail = Buffer.from(email)
			.toString("base64")
			.replace(/\+/g, "-")
			.replace(/\//g, "_")
			.replace(/=+$/, "");

		// Send email
		await gmail.users.messages.send({
			userId: "me",
			requestBody: {
				raw: encodedEmail,
			},
		});

		return NextResponse.json({ success: true, message: "Email sent" });
	} catch (error: unknown) {
		console.error("Error sending email:", error);
		return NextResponse.json(
			{ success: false, error: JSON.stringify(error) },
			{ status: 500 },
		);
	}
}
