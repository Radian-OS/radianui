import React from "react"
import { BookmarkIcon } from "lucide-react"
import { Toggle } from "@/registry/ui/toggle"

const ToggleSizesExample = () => {
	return (
		<div className="flex flex-col items-center justify-center gap-5">
			<div className="flex items-center justify-center gap-3">
				<Toggle
					variant="outline"
					color="neutral"
					size="28"
					className="group/toggle">
					<BookmarkIcon className="group-data-[state=on]/toggle:fill-current" />
					Size 28
				</Toggle>
			</div>

			<div className="flex items-center justify-center gap-3">
				<Toggle
					variant="outline"
					color="neutral"
					size="32"
					className="group/toggle">
					<BookmarkIcon className="group-data-[state=on]/toggle:fill-current" />
					Size 32
				</Toggle>
			</div>

			<div className="flex items-center justify-center gap-3">
				<Toggle
					variant="outline"
					color="neutral"
					size="36"
					className="group/toggle">
					<BookmarkIcon className="group-data-[state=on]/toggle:fill-current" />
					Size 36
				</Toggle>
			</div>

			<div className="flex items-center justify-center gap-3">
				<Toggle
					variant="outline"
					color="neutral"
					size="40"
					className="group/toggle">
					<BookmarkIcon className="group-data-[state=on]/toggle:fill-current" />
					Size 40
				</Toggle>
			</div>

			<div className="flex items-center justify-center gap-3">
				<Toggle
					variant="outline"
					color="neutral"
					size="44"
					className="group/toggle">
					<BookmarkIcon className="group-data-[state=on]/toggle:fill-current" />
					Size 44
				</Toggle>
			</div>

			<div className="flex items-center justify-center gap-3">
				<Toggle
					variant="outline"
					color="neutral"
					size="48"
					className="group/toggle">
					<BookmarkIcon className="group-data-[state=on]/toggle:fill-current" />
					Size 48
				</Toggle>
			</div>
		</div>
	)
}

export default ToggleSizesExample
