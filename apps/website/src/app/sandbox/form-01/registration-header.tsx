import React from "react"

interface RegistrationHeaderProps {
	title?: string
	subtitle?: string
}

export function RegistrationHeader({
	title = "Registration",
	subtitle = "Please fill out all the information below to complete your registration.",
}: RegistrationHeaderProps) {
	return (
		<div className="space-y-1.5">
			<h2 className="heading-3 text-fg">{title}</h2>
			<p className="text-fg-secondary text-sm">{subtitle}</p>
		</div>
	)
}
