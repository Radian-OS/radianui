import React from "react"
import Link from "next/link"
import { Badge } from "@/registry/ui/badge"

function BadgeAsChild() {
	return (
		<div className="flex items-center justify-center">
			<Badge asChild>
				<Link href="#">Badge</Link>
			</Badge>
		</div>
	)
}

export default BadgeAsChild
