import React from "react"
import { Badge } from "@/registry/ui/badge"

const BadgeColorExample = () => {
	const colors = [
		{ name: "Primary", value: "primary" },
		{ name: "Neutral", value: "neutral" },
		{ name: "Success", value: "success" },
		{ name: "Error", value: "error" },
		{ name: "Warning", value: "warning" },
		{ name: "Info", value: "info" },
		{ name: "Red", value: "red" },
		{ name: "Orange", value: "orange" },
		{ name: "Amber", value: "amber" },
		{ name: "Yellow", value: "yellow" },
		{ name: "Neon", value: "neon" },
		{ name: "Green", value: "green" },
		{ name: "Emerald", value: "emerald" },
		{ name: "Teal", value: "teal" },
		{ name: "Cyan", value: "cyan" },
		{ name: "Light Blue", value: "light-blue" },
		{ name: "Blue", value: "blue" },
		{ name: "Violet Blue", value: "violet-blue" },
		{ name: "Purple", value: "purple" },
		{ name: "Dark Orchid", value: "dark-orchid" },
		{ name: "Fuchsia", value: "fuchsia" },
		{ name: "Magenta", value: "magenta" },
		{ name: "Rose", value: "rose" },
	] as const

	type ColorValue = (typeof colors)[number]["value"]

	return (
		<div className="space-y-6">
			<div className="grid grid-cols-1 gap-8">
				{colors.map((color) => (
					<div key={color.value} className="flex flex-col gap-1.5">
						<p className="text-fg text-sm font-semibold">{color.name}</p>
						<div className="flex flex-wrap gap-2">
							<Badge color={color.value as ColorValue} variant="strong">
								Strong
							</Badge>
							<Badge color={color.value as ColorValue} variant="outline">
								Outline
							</Badge>
							<Badge color={color.value as ColorValue} variant="soft">
								Soft
							</Badge>
						</div>
					</div>
				))}
			</div>
		</div>
	)
}

export default BadgeColorExample
