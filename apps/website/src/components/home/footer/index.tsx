import React from "react"
import FooterNavigation from "@/components/home/footer/footer-navigation"
import MiniFooter from "@/components/home/footer/mini-footer"
import EmailSubscriptionFormWrapper from "./email-subscription-form-wrapper"

export default function Footer() {
	return (
		<footer className="bg-bg before:from-bg before:via-soft before:to-bg w-full before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-gradient-to-r">
			<FooterNavigation />
			<EmailSubscriptionFormWrapper />
			<MiniFooter />
		</footer>
	)
}
