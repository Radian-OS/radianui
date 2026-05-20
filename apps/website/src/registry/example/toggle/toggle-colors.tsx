import React from "react"
import { BookmarkIcon } from "lucide-react"
import { Toggle } from "@/registry/ui/toggle"

const ToggleVariantsExample = () => {
	return (
		<div className="flex flex-col items-center justify-center gap-5">
			<div className="flex items-center justify-center gap-3">
				<Toggle size="28" variant="ghost" color="primary">
					<BookmarkIcon className="group-data-[state=on]/toggle:fill-current" />
					Primary
				</Toggle>
				<Toggle size="28" variant="outline" color="primary">
					<BookmarkIcon className="group-data-[state=on]/toggle:fill-current" />
					Primary
				</Toggle>
			</div>

			<div className="flex items-center justify-center gap-3">
				<Toggle size="28" variant="ghost" color="info">
					<BookmarkIcon className="group-data-[state=on]/toggle:fill-current" />
					Info
				</Toggle>
				<Toggle size="28" variant="outline" color="info">
					<BookmarkIcon className="group-data-[state=on]/toggle:fill-current" />
					Info
				</Toggle>
			</div>

			<div className="flex items-center justify-center gap-3">
				<Toggle size="28" variant="ghost" color="success">
					<BookmarkIcon className="group-data-[state=on]/toggle:fill-current" />
					Success
				</Toggle>
				<Toggle size="28" variant="outline" color="success">
					<BookmarkIcon className="group-data-[state=on]/toggle:fill-current" />
					Success
				</Toggle>
			</div>

			<div className="flex items-center justify-center gap-3">
				<Toggle size="28" variant="ghost" color="error">
					<BookmarkIcon className="group-data-[state=on]/toggle:fill-current" />
					Error
				</Toggle>
				<Toggle size="28" variant="outline" color="error">
					<BookmarkIcon className="group-data-[state=on]/toggle:fill-current" />
					Error
				</Toggle>
			</div>

			<div className="flex items-center justify-center gap-3">
				<Toggle size="28" variant="ghost" color="warning">
					<BookmarkIcon className="group-data-[state=on]/toggle:fill-current" />
					Warning
				</Toggle>
				<Toggle size="28" variant="outline" color="warning">
					<BookmarkIcon className="group-data-[state=on]/toggle:fill-current" />
					Warning
				</Toggle>
			</div>

			<div className="flex items-center justify-center gap-3">
				<Toggle size="28" variant="ghost" color="neutral">
					<BookmarkIcon className="group-data-[state=on]/toggle:fill-current" />
					Neutral
				</Toggle>
				<Toggle size="28" variant="outline" color="neutral">
					<BookmarkIcon className="group-data-[state=on]/toggle:fill-current" />
					Neutral
				</Toggle>
			</div>
		</div>
	)
}

export default ToggleVariantsExample
