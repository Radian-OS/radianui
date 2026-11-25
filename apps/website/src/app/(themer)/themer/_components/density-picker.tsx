import { useThemerPickerPlacement } from "./themer-picker-placement"
import { Button, CompactButton, IconButton } from "@/styles/default/ui/button"
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
import { Check, ChevronLeft, Info } from "lucide-react"
import { DrawerTitle } from "@/registry/ui/drawer"
import { cn } from "@/lib/utils"
import { DENSITIES, DensityValue } from "@/registry/density"
import { useThemerPreset } from "@/lib/themer-preset"

interface DensityPickerProps {
	value?: DensityValue
	onValueChange?: (value: DensityValue) => void
	onBack?: () => void
}

export default function DensityPicker({
	value,
	onValueChange,
	onBack,
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

	if (onBack) {
		return (
			<div className="flex flex-col gap-2 px-3 pb-[max(12px,env(safe-area-inset-bottom))]">
				<div className="flex touch-none items-center justify-between">
					<div className="flex items-center gap-2">
						<IconButton
							size="xs"
							variant="ghost"
							color="neutral"
							className="text-fg-secondary"
							aria-label="Close density settings"
							onClick={onBack}>
							<ChevronLeft className="size-5!" />
						</IconButton>
						<DrawerTitle className="text-fg text-base font-medium">
							Density
						</DrawerTitle>
					</div>
					<Tooltip>
						<TooltipTrigger asChild>
							<IconButton
								size="md"
								variant="ghost"
								color="neutral"
								className="text-fg-secondary"
								aria-label="About density">
								<Info />
							</IconButton>
						</TooltipTrigger>
						<TooltipContent withArrow>
							Changes the spacing scale across your interface
						</TooltipContent>
					</Tooltip>
				</div>
				<div
					role="group"
					aria-labelledby="mobile-density-label"
					className="flex flex-col gap-0.5">
					<span
						id="mobile-density-label"
						className="text-fg px-2 py-1.5 text-sm">
						Density
					</span>
					{DENSITIES.map(({ value, name }) => {
						const selected = selectedDensity.value === value
						return (
							<Button
								key={value}
								size="sm"
								variant="ghost"
								color="neutral"
								className={cn(
									"w-full justify-between px-2 text-sm font-normal",
									selected && "bg-fill1-alpha"
								)}
								aria-pressed={selected}
								onClick={() => handleChange(value)}>
								{name}
								{selected && <Check className="text-fg-tertiary" />}
							</Button>
						)
					})}
				</div>
			</div>
		)
	}

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
