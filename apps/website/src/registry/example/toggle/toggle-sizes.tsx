import React from "react"
import { BookmarkIcon } from "lucide-react"
import { Toggle } from "@/registry/ui/toggle"

const sizes = ["28", "32", "36", "40", "44", "48"] as const

const ToggleSizesExample = () => {
	return (
		<div className="flex flex-wrap items-center justify-center gap-3">
			{sizes.map((size) => (
				<Toggle key={size} variant="outline" size={size}>
					<BookmarkIcon className="group-data-[state=on]/toggle:fill-current" />
					{size}
				</Toggle>
			))}
		</div>
	)
}

export default ToggleSizesExample
