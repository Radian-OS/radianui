import React from "react"
import { ColorOption, usePlayground } from "@/contexts/playground"
import { IconButton } from "@/styles/default/ui/button"
import {
	Dropdown,
	DropdownContent,
	DropdownPortal,
	DropdownRadioGroup,
	DropdownRadioItem,
	DropdownTrigger,
} from "@/styles/default/ui/dropdown"

export const COLORS = [
	{ title: "Red", value: "red" },
	{ title: "Orange", value: "orange" },
	{ title: "Amber", value: "amber" },
	{ title: "Yellow", value: "yellow" },
	{ title: "Neon", value: "neon" },
	{ title: "Green", value: "green" },
	{ title: "Emerald", value: "emerald" },
	{ title: "Teal", value: "teal" },
	{ title: "Cyan", value: "cyan" },
	{ title: "Light Blue", value: "light-blue" },
	{ title: "Blue", value: "blue" },
	{ title: "Violet Blue (Default)", value: "violet-blue" },
	{ title: "Purple", value: "purple" },
	{ title: "Dark Orchid", value: "dark-orchid" },
	{ title: "Fuchsia", value: "fuchsia" },
	{ title: "Magenta", value: "magenta" },
	{ title: "Rose", value: "rose" },
	{ title: "Neutral", value: "neutral" },
] as const

export const COLOR_CLASSES = {
	red: "bg-[oklch(0.64_0.22_26.04)]",
	orange: "bg-[oklch(0.6211_0.1686_43.12)]",
	amber: "bg-[oklch(0.8016_0.1705_73.27)]",
	yellow: "bg-[oklch(0.8_0.1625_94.77)]",
	neon: "bg-[oklch(0.7153_0.1873_128.9)]",
	green: "bg-[oklch(0.6523_0.2156_142.6)]",
	emerald: "bg-[oklch(0.6334_0.171_148.65)]",
	teal: "bg-[oklch(0.6432_0.1255_169.12)]",
	cyan: "bg-[oklch(0.6549_0.1092_194.82)]",
	"light-blue": "bg-[oklch(0.6092_0.2041_255.8)]",
	blue: "bg-[oklch(0.5345_0.223_272.15)]",
	"violet-blue": "bg-[oklch(0.528_0.2539_282.58)]",
	purple: "bg-[oklch(0.5554_0.2522_292.8)]",
	"dark-orchid": "bg-[oklch(0.623_0.2799_310.69)]",
	fuchsia: "bg-[oklch(0.6901_0.2628_327.97)]",
	magenta: "bg-[oklch(0.6175_0.2503_347.29)]",
	rose: "bg-[oklch(0.6515_0.221_6.33)]",
	neutral: "bg-fg",
} as const
export default function Colors() {
	const { color, setColor } = usePlayground()
	return (
		<Dropdown indicatorPosition="right">
			<DropdownTrigger asChild>
				<IconButton
					size="32"
					aria-label="Change Primary Color"
					variant="ghost"
					color="neutral"
					className="hover:bg-fill2 text-fg flex size-8 cursor-pointer items-center justify-center rounded-md">
					<div className="size-4.5 bg-primary border-border rounded-full border" />
				</IconButton>
			</DropdownTrigger>
			<DropdownPortal>
				<DropdownContent
					align="end"
					className="h-69.5 overflow-y-scroll"
					sideOffset={10}>
					<DropdownRadioGroup
						value={color}
						onValueChange={(value) => setColor(value as ColorOption)}>
						{COLORS.map((colorOption) => (
							<DropdownRadioItem
								key={colorOption.value}
								value={colorOption.value}>
								<div className="flex items-center justify-center gap-2">
									<span
										className={`inline-block h-4 w-4 rounded-sm ${COLOR_CLASSES[colorOption.value]}`}
									/>
									{colorOption.title}
								</div>
							</DropdownRadioItem>
						))}
					</DropdownRadioGroup>
				</DropdownContent>
			</DropdownPortal>
		</Dropdown>
	)
}
