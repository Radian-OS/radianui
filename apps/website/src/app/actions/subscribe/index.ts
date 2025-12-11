"use server"

import { Resend } from "resend"
import WelcomeEmailTemplate from "@/components/email/welcome-email-template"

const resend = new Resend(process.env.RESEND_API_KEY)

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export async function subscribe(email: string) {
	try {
		const { data } = await resend.contacts.get({ email: email })

		if (data?.email) {
			return { message: "Your email is already subscribed", status: 409 }
		}

		await delay(1000)
		const { error } = await resend.contacts.create({
			email: email,
			unsubscribed: false,
		})

		if (error) {
			return { message: error.message, status: 500 }
		}

		await delay(1000)
		const { error: emailError } = await resend.emails.send({
			from: process.env.RESEND_FROM_EMAIL!,
			to: email,
			subject: "Welcome to RadianOS",
			react: WelcomeEmailTemplate({
				baseUrl: process.env.NEXT_PUBLIC_WEBSITE_URL!,
			}),
		})

		if (emailError) {
			console.error("Failed to send welcome email:", emailError)
			return {
				message: "Contact added but failed to send welcome email",
				status: 500,
			}
		}

		console.log("email sent successfully")
		return { message: "Email subscribed successfully", status: 201 }
	} catch (error) {
		console.error("Failed to subscribe email:", error)
		return { message: "Something went wrong. Please try again later.", status: 500 }
	}
}
