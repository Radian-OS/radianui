import React from "react"
import { Star } from "lucide-react"

export function Rating() {
	return (
		<div className="flex flex-col items-center gap-1.5 text-center">
			<div className="flex items-center gap-1.5">
				<span className="text-fg text-lg font-bold">4.9+</span>
				<Star className="fill-warning-text text-warning-text size-4" />
			</div>
			<p className="text-fg-secondary text-xs font-medium">
				Based on customer reviews
			</p>
		</div>
	)
}
