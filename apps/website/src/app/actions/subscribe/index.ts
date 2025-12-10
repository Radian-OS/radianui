"use server"

import { Resend } from "resend"
import WelcomeEmailTemplate from "@/components/email/welcome-email-template"

export async function subscribe(email: string) {
	const apiKey = process.env.RESEND_API_KEY
	if (!apiKey) {
		console.error("RESEND_API_KEY is missing at runtime")
		return { message: "Email service not configured. Please try again later.", status: 500 }
	}

	const resend = new Resend(apiKey)

	try {
		const { data } = await resend.contacts.get({ email: email })

		console.log("RESEND_API_KEY", `${apiKey.slice(0, 6)}…`)

		if (data?.email) {
			return { message: "Your email is already subscribed", status: 409 }
		}

		const { error } = await resend.contacts.create({
			email: email,
			unsubscribed: false,
		})

		if (error) {
			return { message: error.message, status: 500 }
		}

		try {
			await resend.emails.send({
				from: process.env.RESEND_FROM_EMAIL!,
				to: email,
				subject: "Welcome to RadianOS",
				react: WelcomeEmailTemplate(),
			})
		} catch (emailError) {
			console.error("Failed to send welcome email:", emailError)
		}

		return { message: "Email subscribed successfully", status: 201 }
	} catch (error) {
		console.error("Failed to subscribe email:", error)
		return { message: "Something went wrong. Please try again later.", status: 500 }
	}
}
