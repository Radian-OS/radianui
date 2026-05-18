"use server"

import { Resend } from "resend"

let resend: Resend | null = null

export async function getResend() {
	const apiKey = process.env.RESEND_API_KEY

	if (!apiKey) {
		throw new Error("RESEND_API_KEY is not set")
	}

	resend ??= new Resend(apiKey)

	return resend
}
