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
import { useThemerPreset } from "@/lib/themer-preset"
import { DrawerTitle } from "@/registry/ui/drawer"
import { cn } from "@/lib/utils"
import { Theme } from "@/registry/themes"

const THEME_LABELS: Record<Theme, string> = {
	light: "Light",
	dark: "Dark",
	system: "System",
}

export default function AppearanceModePicker({
	onBack,
}: {
	onBack?: () => void
}) {
	const placement = useThemerPickerPlacement("end", 12)
	const [presetParams, setPresetParams] = useThemerPreset()

	const setMode = (value: Theme) => setPresetParams({ defaultTheme: value })
	const modeOptions = Object.entries(THEME_LABELS) as [Theme, string][]
	const modeDescription =
		"Sets the default theme your project loads with (light, dark, or system)"

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
							aria-label="Close mode settings"
							onClick={onBack}>
							<ChevronLeft />
						</IconButton>
						<DrawerTitle className="text-fg text-base font-medium">
							Mode
						</DrawerTitle>
					</div>
					<Tooltip>
						<TooltipTrigger asChild>
							<IconButton
								size="md"
								variant="ghost"
								color="neutral"
								className="text-fg-secondary"
								aria-label="About appearance mode">
								<Info />
							</IconButton>
						</TooltipTrigger>
						<TooltipContent className="max-w-xs text-center" withArrow>
							{modeDescription}
						</TooltipContent>
					</Tooltip>
				</div>
				<div
					role="group"
					aria-labelledby="mobile-mode-label"
					className="flex flex-col gap-0.5">
					<span id="mobile-mode-label" className="text-fg px-2 py-1.5 text-sm">
						Default mode
					</span>
					{modeOptions.map(([mode, label]) => {
						const selected = presetParams.defaultTheme === mode
						return (
							<Button
								key={mode}
								size="sm"
								variant="ghost"
								color="neutral"
								className={cn(
									"w-full justify-between px-2 text-sm font-normal",
									selected && "bg-fill1-alpha"
								)}
								aria-pressed={selected}
								onClick={() => setMode(mode)}>
								{label}
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
					className="bg-fill1-alpha w-full justify-between text-[13px] select-none"
					variant="soft"
					color="neutral">
					<span>Default Mode</span>{" "}
					<span className="text-fg-tertiary font-medium">
						{THEME_LABELS[presetParams.defaultTheme]}
					</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent
				{...placement}
				className="w-70 max-w-[calc(100vw-1.5rem)] shadow-sm">
				<div className="flex items-center justify-between">
					<DropdownMenuLabel className="text-fg-tertiary">
						Appearance Mode
					</DropdownMenuLabel>
					<Tooltip>
						<TooltipTrigger asChild>
							<CompactButton variant="ghost" color="neutral" size="sm">
								<Info />
							</CompactButton>
						</TooltipTrigger>
						<TooltipContent className="max-w-xs text-center" withArrow>
							{modeDescription}
						</TooltipContent>
					</Tooltip>
				</div>
				<DropdownMenuRadioGroup
					value={presetParams.defaultTheme}
					onValueChange={(value) => setMode(value as Theme)}>
					{modeOptions.map(([mode, label]) => (
						<DropdownMenuRadioItem key={mode} value={mode}>
							{label}
						</DropdownMenuRadioItem>
					))}
				</DropdownMenuRadioGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
