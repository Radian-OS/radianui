"use server"

import WelcomeEmailTemplate from "@/components/email/welcome-email-template"
import { resend } from "@/lib/resend"

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export async function subscribe(email: string) {
	try {
		const { data: existing_contact_data } = await resend.contacts.get({ email })

		if (existing_contact_data) {
			if (!existing_contact_data.unsubscribed) {
				return { message: "Email is already subscribed", status: 409 }
			}
			await resend.contacts.update({
				id: existing_contact_data.id,
				unsubscribed: !existing_contact_data.unsubscribed,
			})
			return { message: "Email re-subscribed successfully", status: 200 }
		}

		const { data: new_contact_data, error: new_contact_error } = await resend.contacts.create({
			email: email,
			unsubscribed: false,
		})

		if (new_contact_error) {
			return { message: "Email subscription failed. Please try again later.", status: 400 }
		}

		await delay(1000)

		const { error: email_send_error } = await resend.emails.send({
			from: process.env.RESEND_FROM_EMAIL!,
			to: email,
			subject: "Welcome to RadianOS",
			react: WelcomeEmailTemplate({
				baseUrl: process.env.NEXT_PUBLIC_WEBSITE_URL!,
				id: new_contact_data.id,
			}),
			headers: {
				"List-Unsubscribe": `<${process.env.NEXT_PUBLIC_WEBSITE_URL!}/api/unsubscribe?id=${encodeURIComponent(new_contact_data.id)}>`,
				"List-Unsubscribe-Post": "List-Unsubscribe=One-Click",
			},
		})

		if (email_send_error) {
			return {
				message: "Email subscription successful but failed to send welcome email",
				status: 400,
			}
		}
		return { message: "Email subscribed successfully", status: 201 }
	} catch (error) {
		console.error("Failed to subscribe email:", error)
		return { message: "Something went wrong. Please try again later.", status: 500 }
	}
}
