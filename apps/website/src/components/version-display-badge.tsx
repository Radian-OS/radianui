import React from "react"
import { Badge } from "@/registry/ui/badge"

interface VersionDisplayBadgeProps {
	version: string
	className?: string
}

export function VersionDisplayBadge({
	version,
	className,
}: VersionDisplayBadgeProps) {
	return (
		<Badge variant="outline" size="24" color="neutral" className={className}>
			{`v${version}`}
		</Badge>
	)
}
