import React from "react"
import { ColorOption, usePlayground } from "@/contexts/playground"
import { IconButton } from "@/styles/default/ui/button"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuPortal,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuTrigger,
} from "@/styles/default/ui/dropdown-menu"

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
	red: "bg-red",
	orange: "bg-orange",
	amber: "bg-amber",
	yellow: "bg-yellow",
	neon: "bg-neon",
	green: "bg-green",
	emerald: "bg-emerald",
	teal: "bg-teal",
	cyan: "bg-cyan",
	"light-blue": "bg-light-blue",
	blue: "bg-blue",
	"violet-blue": "bg-violet-blue",
	purple: "bg-purple",
	"dark-orchid": "bg-dark-orchid",
	fuchsia: "bg-fuchsia",
	magenta: "bg-magenta",
	rose: "bg-rose",
	neutral: "bg-neutral",
} as const
export default function Colors() {
	const { color, setColor } = usePlayground()
	return (
		<DropdownMenu indicatorPosition="right">
			<DropdownMenuTrigger asChild>
				<IconButton
					size="32"
					aria-label="Change Primary Color"
					variant="ghost"
					color="neutral"
					className="hover:bg-fill2 text-fg flex size-8 cursor-pointer items-center justify-center rounded-md">
					<div className="bg-primary border-border size-4.5 rounded-full border" />
				</IconButton>
			</DropdownMenuTrigger>
			<DropdownMenuPortal>
				<DropdownMenuContent
					align="end"
					className="h-69.5 overflow-y-scroll"
					sideOffset={10}>
					<DropdownMenuRadioGroup
						value={color}
						onValueChange={(value) => setColor(value as ColorOption)}>
						{COLORS.map((colorOption) => (
							<DropdownMenuRadioItem
								key={colorOption.value}
								value={colorOption.value}>
								<div className="flex items-center justify-center gap-2">
									<span
										className={`inline-block h-4 w-4 rounded-sm ${COLOR_CLASSES[colorOption.value]}`}
									/>
									{colorOption.title}
								</div>
							</DropdownMenuRadioItem>
						))}
					</DropdownMenuRadioGroup>
				</DropdownMenuContent>
			</DropdownMenuPortal>
		</DropdownMenu>
	)
}
