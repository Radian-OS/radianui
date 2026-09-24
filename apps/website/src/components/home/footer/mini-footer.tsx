import React from "react"
import { Divider } from "@/styles/default/ui/divider"

export default function MiniFooter() {
	const currentYear = new Date().getFullYear()

	return (
		<>
			<Divider className="border-soft border-t" />
			<div className="flex h-13 items-center justify-center">
				<p className="text-fg-secondary text-center text-xs font-normal">
					© Copyright Radian UI {currentYear}. All rights reserved.
				</p>
			</div>
		</>
	)
}
