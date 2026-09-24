import React from "react"
import { TrendingUp } from "lucide-react"

interface ProfileHeaderProps {
	title?: string
	description?: string
	completionPercent?: number
}

export function ProfileHeader({
	title = "Profile Settings",
	description = "Identity and availability.",
	completionPercent = 84,
}: ProfileHeaderProps) {
	return (
		<div className="border-border flex items-start justify-between gap-4 border-b pb-6">
			<div className="space-y-1">
				<h2 className="text-fg text-xl font-semibold">{title}</h2>
				<p className="text-fg-secondary text-sm">{description}</p>
			</div>
			<div className="border-warning-border/30 bg-warning-accent/15 text-warning inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium">
				<TrendingUp className="size-3.5" />
				<span>{completionPercent}% complete</span>
			</div>
		</div>
	)
}
