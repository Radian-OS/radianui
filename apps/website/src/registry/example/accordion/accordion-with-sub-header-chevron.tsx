"use client"

import React from "react"
import { Bell, LifeBuoy, Link2, ShieldCheck } from "lucide-react"
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/registry/ui/accordion"

const items = [
	{
		value: "connected-accounts",
		icon: Link2,
		title: "Connected accounts",
		subtitle: "Manage your linked social and work accounts",
		content:
			"Connect your Google, GitHub, Slack, or Microsoft accounts to enable single sign-on and sync your work across platforms seamlessly.",
	},
	{
		value: "notifications",
		icon: Bell,
		title: "Notifications",
		subtitle: "Customize your notification preferences",
		content:
			"Choose which activity triggers a notification, select your preferred channels such as email, push, or in-app alerts, and set quiet hours to avoid interruptions.",
	},
	{
		value: "2-step-verification",
		icon: ShieldCheck,
		title: "2-step verification",
		subtitle: "Add an extra layer of security to your account",
		content:
			"Protect your account with two-factor authentication. You can use authenticator apps like Google Authenticator or Authy, receive SMS codes, or use security keys like YubiKey. We recommend using an authenticator app for the most secure experience.",
	},
	{
		value: "contact-support",
		icon: LifeBuoy,
		title: "Contact support",
		subtitle: "We're here to help 24/7",
		content:
			"Reach our support team via live chat, email, or phone. Our agents are available around the clock to help you resolve issues, answer questions, and guide you through any feature.",
	},
]

export default function AccordionWithSubHeader() {
	return (
		<Accordion
			variant="open"
			type="single"
			defaultValue="2-step-verification"
			collapsible
			className="w-full lg:w-3/4">
			{items.map(({ value, icon: Icon, title, subtitle, content }) => (
				<AccordionItem key={value} value={value}>
					<AccordionTrigger>
						<span className="flex gap-3">
							<span className="border-soft text-fg-secondary flex size-9 shrink-0 items-center justify-center rounded-full border">
								<Icon className="size-4" />
							</span>
							<span className="flex flex-col gap-0.5 text-start">
								<span className="text-fg font-semibold">{title}</span>
								<span className="text-fg text-sm font-normal">{subtitle}</span>
							</span>
						</span>
					</AccordionTrigger>
					<AccordionContent className="text-fg-secondary ps-12 pb-4 text-sm">
						{content}
					</AccordionContent>
				</AccordionItem>
			))}
		</Accordion>
	)
}
