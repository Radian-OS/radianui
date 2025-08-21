import React from "react"
import { getPackageVersion } from "@/lib/get-package-info"
import { Badge } from "@/registry/ui/badge"

export function VersionDisplayBadge() {
	const version = getPackageVersion()

	return (
		<Badge variant="soft" size="24" color="success" className="not-md:hidden">
			v {version}
		</Badge>
	)
}
