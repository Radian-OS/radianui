"use client"

import dynamic from "next/dynamic"

const EmailSubscription = dynamic(
	() => import("@/components/home/footer/email-subscription-form"),
	{ ssr: false }
)

export default function EmailSubscriptionFormWrapper() {
	return <EmailSubscription />
}
