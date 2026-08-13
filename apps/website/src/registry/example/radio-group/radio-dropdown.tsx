"use client"

import * as React from "react"
import { Check, Monitor, Moon, Sun } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/registry/ui/button"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuDivider,
	DropdownMenuGroup,
	DropdownMenuTrigger,
} from "@/registry/ui/dropdown-menu"
import { RadioGroup, RadioGroupItem } from "@/registry/ui/radio-group"

type OptionItem = {
	value: string
	label: string
	icon?: React.ReactNode
}

const modeOptions: OptionItem[] = [
	{
		value: "light",
		label: "Light",
		icon: <Sun className="text-fg-secondary size-5" />,
	},
	{
		value: "dark",
		label: "Light",
		icon: <Moon className="text-fg-secondary size-5" />,
	},
	{
		value: "system",
		label: "System",
		icon: <Monitor className="text-fg-secondary size-5" />,
	},
]

const accentOptions: OptionItem[] = [
	{
		value: "blue",
		label: "Blue",
		icon: <span className="bg-info size-5 shrink-0 rounded-full" />,
	},
	{
		value: "yellow",
		label: "Yellow",
		icon: <span className="bg-yellow size-5 shrink-0 rounded-full" />,
	},
	{
		value: "green",
		label: "Green",
		icon: <span className="bg-success size-5 shrink-0 rounded-full" />,
	},
	{
		value: "red",
		label: "Red",
		icon: <span className="bg-red size-5 shrink-0 rounded-full" />,
	},
	{
		value: "grey",
		label: "Grey",
		icon: <span className="bg-fg-secondary size-5 shrink-0 rounded-full" />,
	},
]

const densityOptions: OptionItem[] = [
	{ value: "comfortable", label: "Comfortable" },
	{ value: "compact", label: "Compact" },
]

function RadioDropdownItem({
	option,
	isSelected,
	onSelect,
	showCheck = false,
}: {
	option: OptionItem
	isSelected: boolean
	onSelect: (value: string) => void
	showCheck?: boolean
}) {
	return (
		<div
			role="menuitem"
			onClick={() => onSelect(option.value)}
			className={cn(
				"hover:bg-fill1-alpha flex w-full cursor-pointer select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm transition-colors",
				"text-fg"
			)}>
			<RadioGroupItem
				value={option.value}
				id={option.value}
				onClick={(e) => e.stopPropagation()}
				className="shrink-0"
			/>
			{option.icon && <span className="flex items-center">{option.icon}</span>}
			<span className="text-fg-secondary flex-1">{option.label}</span>
			{showCheck && isSelected && (
				<Check className="text-fg-secondary size-5 shrink-0" />
			)}
		</div>
	)
}

export default function RadioDropdown() {
	const [mode, setMode] = React.useState("dark")
	const [accent, setAccent] = React.useState("blue")
	const [density, setDensity] = React.useState("comfortable")

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="outline" color="neutral">
					Settings
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-80">
				{/* Mode */}
				<DropdownMenuGroup title="Mode">
					<RadioGroup value={mode} onValueChange={setMode} className="gap-0">
						{modeOptions.map((option) => (
							<RadioDropdownItem
								key={option.value}
								option={option}
								isSelected={mode === option.value}
								onSelect={setMode}
								showCheck
							/>
						))}
					</RadioGroup>
				</DropdownMenuGroup>

				<DropdownMenuDivider />

				{/* Accent Color */}
				<DropdownMenuGroup title="Accent Color">
					<RadioGroup
						value={accent}
						onValueChange={setAccent}
						className="gap-0">
						{accentOptions.map((option) => (
							<RadioDropdownItem
								key={option.value}
								option={option}
								isSelected={accent === option.value}
								onSelect={setAccent}
							/>
						))}
					</RadioGroup>
				</DropdownMenuGroup>

				<DropdownMenuDivider />

				{/* Density */}
				<DropdownMenuGroup title="Accent Color">
					<RadioGroup
						value={density}
						onValueChange={setDensity}
						className="gap-0">
						{densityOptions.map((option) => (
							<RadioDropdownItem
								key={option.value}
								option={option}
								isSelected={density === option.value}
								onSelect={setDensity}
								showCheck
							/>
						))}
					</RadioGroup>
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
