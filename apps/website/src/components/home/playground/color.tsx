import React from "react"
import { COLORS, COLOR_CLASSES } from "@/components/color/color-playground"
import { Dropdown, DropdownContent, DropdownRadioGroup, DropdownRadioItem, DropdownTrigger } from "@/registry/ui/dropdown"

export default function Colors() {
	const [radius, setRadius] = React.useState("default")
	return (
		<Dropdown indicatorPosition="right">
			<DropdownTrigger>
				<div className="hover:bg-fill2 flex size-8 cursor-pointer items-center justify-center rounded-md">
					<div className="size-4.5 bg-primary border-border rounded-full border"></div>
				</div>
			</DropdownTrigger>
			<DropdownContent align="end" className="h-69.5 overflow-y-scroll" sideOffset={10}>
				<DropdownRadioGroup value={radius} onValueChange={setRadius}>
					<DropdownRadioItem value="default">Default</DropdownRadioItem>
					{COLORS.map((colorOption) => (
						<DropdownRadioItem key={colorOption.value} value={colorOption.value}>
							<div className="flex items-center justify-center gap-2">
								<span className={`inline-block h-4 w-4 rounded-sm ${COLOR_CLASSES[colorOption.value]}`} />
								{colorOption.title}
							</div>
						</DropdownRadioItem>
					))}
				</DropdownRadioGroup>
			</DropdownContent>
		</Dropdown>
	)
}
