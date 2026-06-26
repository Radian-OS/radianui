import React from "react"
import { Badge } from "@/registry/ui/badge"

interface VersionDisplayBadgeProps {
	version: string
}

export function VersionDisplayBadge({ version }: VersionDisplayBadgeProps) {
	return (
		<Badge
			variant="outline"
			size="24"
			color="neutral"
			className="not-md:hidden">
			{`v${version}`}
		</Badge>
	)
}
