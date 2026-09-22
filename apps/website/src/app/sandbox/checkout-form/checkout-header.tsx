import React from "react"

interface CheckoutHeaderProps {
	title?: string
	subtitle?: string
}

export function CheckoutHeader({
	title = "Payment Details",
	subtitle = "Complete your purchase",
}: CheckoutHeaderProps) {
	return (
		<div className="space-y-1">
			<h2 className="heading-3 text-foreground">{title}</h2>
			<p className="text-fg-secondary text-sm">{subtitle}</p>
		</div>
	)
}
