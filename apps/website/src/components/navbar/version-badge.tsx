import React from "react"
import { Badge } from "@/registry/ui/badge"

interface VersionDisplayBadgeProps {
	version: string
}

export function VersionDisplayBadge({ version }: VersionDisplayBadgeProps) {
	return (
		<Badge variant="soft" size="24" color="neon" className="not-md:hidden">
			Version {version}
		</Badge>
	)
}
