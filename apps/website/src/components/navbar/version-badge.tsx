import React from "react"
import { Badge } from "@/styles/default/ui/badge"

interface VersionDisplayBadgeProps {
	version: string
}

export function VersionDisplayBadge({ version }: VersionDisplayBadgeProps) {
	return (
		<Badge variant="soft" size="24" color="success" className="not-md:hidden">
			v {version}
		</Badge>
	)
}
