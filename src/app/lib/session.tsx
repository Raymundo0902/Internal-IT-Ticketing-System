import "server-only";
import { type JWTPayload, SignJWT, jwtVerify } from "jose";

const secretKey = new TextEncoder().encode("secret");
const tokenExpires = 60 * 60 * 24; // 1 day in seconds

interface SessionPayload extends JWTPayload {
	user: {
		loginTime: Date;
		// Add other user properties here if needed
	};
	expires: Date;
}

// Function to generate a JWT
export async function encrypt(payload: SessionPayload) {
	return new SignJWT(payload)
		.setProtectedHeader({ alg: "HS256" })
		.setIssuedAt()
		.setExpirationTime(`${tokenExpires}s`)
		.sign(secretKey);
}

// Function to verify and decrypt a JWT
export async function decrypt(session: string | undefined = "") {
	try {
		const { payload } = await jwtVerify(session, secretKey, {
			algorithms: ["HS256"],
		});
		return payload;
	} catch {}
}
