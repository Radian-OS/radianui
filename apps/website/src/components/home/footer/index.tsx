import React from "react"
import { subscribe } from "@/app/actions/subscribe"
import EmailSubscription from "@/components/home/footer/email-subscription-form"
import FooterNavigation from "@/components/home/footer/footer-navigation"
import MiniFooter from "@/components/home/footer/mini-footer"

export default function Footer() {
	return (
		<footer className="bg-bg before:from-bg before:via-soft before:to-bg w-full before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-gradient-to-r">
			<FooterNavigation />
			<EmailSubscription subscribe={subscribe} />
			<MiniFooter />
		</footer>
	)
}
