import React from "react"
import { BookmarkIcon } from "lucide-react"
import { Toggle } from "@/registry/ui/toggle"

const ToggleVariantsExample = () => {
	return (
		<div className="flex flex-col items-center justify-center gap-5">
			<div className="flex items-center justify-center gap-3">
				<Toggle
					size="28"
					variant="ghost"
					color="primary"
					className="group/toggle">
					<BookmarkIcon className="group-data-[state=on]/toggle:fill-current" />
					Primary
				</Toggle>
				<Toggle
					size="28"
					variant="outline"
					color="primary"
					className="group/toggle">
					<BookmarkIcon className="group-data-[state=on]/toggle:fill-current" />
					Primary
				</Toggle>
			</div>

			<div className="flex items-center justify-center gap-3">
				<Toggle size="28" variant="ghost" color="info" className="group/toggle">
					<BookmarkIcon className="group-data-[state=on]/toggle:fill-current" />
					Info
				</Toggle>
				<Toggle
					size="28"
					variant="outline"
					color="info"
					className="group/toggle">
					<BookmarkIcon className="group-data-[state=on]/toggle:fill-current" />
					Info
				</Toggle>
			</div>

			<div className="flex items-center justify-center gap-3">
				<Toggle
					size="28"
					variant="ghost"
					color="success"
					className="group/toggle">
					<BookmarkIcon className="group-data-[state=on]/toggle:fill-current" />
					Success
				</Toggle>
				<Toggle
					size="28"
					variant="outline"
					color="success"
					className="group/toggle">
					<BookmarkIcon className="group-data-[state=on]/toggle:fill-current" />
					Success
				</Toggle>
			</div>

			<div className="flex items-center justify-center gap-3">
				<Toggle
					size="28"
					variant="ghost"
					color="error"
					className="group/toggle">
					<BookmarkIcon className="group-data-[state=on]/toggle:fill-current" />
					Error
				</Toggle>
				<Toggle
					size="28"
					variant="outline"
					color="error"
					className="group/toggle">
					<BookmarkIcon className="group-data-[state=on]/toggle:fill-current" />
					Error
				</Toggle>
			</div>

			<div className="flex items-center justify-center gap-3">
				<Toggle
					size="28"
					variant="ghost"
					color="warning"
					className="group/toggle">
					<BookmarkIcon className="group-data-[state=on]/toggle:fill-current" />
					Warning
				</Toggle>
				<Toggle
					size="28"
					variant="outline"
					color="warning"
					className="group/toggle">
					<BookmarkIcon className="group-data-[state=on]/toggle:fill-current" />
					Warning
				</Toggle>
			</div>

			<div className="flex items-center justify-center gap-3">
				<Toggle
					size="28"
					variant="ghost"
					color="neutral"
					className="group/toggle">
					<BookmarkIcon className="group-data-[state=on]/toggle:fill-current" />
					Neutral
				</Toggle>
				<Toggle
					size="28"
					variant="outline"
					color="neutral"
					className="group/toggle">
					<BookmarkIcon className="group-data-[state=on]/toggle:fill-current" />
					Neutral
				</Toggle>
			</div>
		</div>
	)
}

export default ToggleVariantsExample
