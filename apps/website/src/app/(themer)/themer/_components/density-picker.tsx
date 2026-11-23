import { useThemerPickerPlacement } from "./themer-picker-placement"
import { Button, CompactButton } from "@/styles/default/ui/button"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuTrigger,
} from "@/styles/default/ui/dropdown-menu"
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/styles/default/ui/tooltip"
import { Info } from "lucide-react"
import { DENSITIES, DensityValue } from "@/registry/density"
import { useThemerPreset } from "@/lib/themer-preset"

interface DensityPickerProps {
	value?: DensityValue
	onValueChange?: (value: DensityValue) => void
}

export default function DensityPicker({
	value,
	onValueChange,
}: DensityPickerProps = {}) {
	const placement = useThemerPickerPlacement("start", 12)
	const [presetParams, setPresetParams] = useThemerPreset()
	const currentValue = value ?? presetParams.density
	const handleChange =
		onValueChange ?? ((val: DensityValue) => setPresetParams({ density: val }))

	const selectedDensity =
		DENSITIES.find((d) => d.value === currentValue) ??
		DENSITIES.find((d) => d.value === "default") ??
		DENSITIES[0]

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					className="bg-fill1-alpha w-full justify-between p-3 text-[13px] select-none"
					variant="soft"
					color="neutral">
					<span>Spacing</span>{" "}
					<span className="text-fg-tertiary font-medium">
						{selectedDensity.name}
					</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent
				{...placement}
				className="w-70 max-w-[calc(100vw-1.5rem)] shadow-sm">
				<div className="flex items-center justify-between">
					<DropdownMenuLabel className="text-fg-tertiary">
						Density
					</DropdownMenuLabel>
					<Tooltip>
						<TooltipTrigger asChild>
							<CompactButton variant="ghost" color="neutral" size="sm">
								<Info />
							</CompactButton>
						</TooltipTrigger>
						<TooltipContent className="max-w-fit" withArrow>
							Changes the spacing scale across your interface
						</TooltipContent>
					</Tooltip>
				</div>
				<DropdownMenuRadioGroup
					value={currentValue}
					onValueChange={(val) => handleChange(val as DensityValue)}>
					{DENSITIES.map((density) => (
						<DropdownMenuRadioItem
							key={density.value}
							value={density.value}
							onSelect={(e) => e.preventDefault()}>
							{density.name}
						</DropdownMenuRadioItem>
					))}
				</DropdownMenuRadioGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
