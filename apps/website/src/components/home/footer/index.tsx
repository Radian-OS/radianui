"use client"

import React from "react"
import dynamic from "next/dynamic"
import { subscribe } from "@/app/actions/subscribe"
import FooterNavigation from "@/components/home/footer/footer-navigation"
import MiniFooter from "@/components/home/footer/mini-footer"

const EmailSubscription = dynamic(() => import("@/components/home/footer/email-subscription-form"), { ssr: false })

export default function Footer() {
	return (
		<footer className="bg-bg before:from-bg before:via-soft before:to-bg w-full before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-gradient-to-r">
			<FooterNavigation />
			<EmailSubscription subscribe={subscribe} />
			<MiniFooter />
		</footer>
	)
}
