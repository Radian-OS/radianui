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
import { useThemerPreset } from "@/lib/themer-preset"
import { Theme } from "@/registry/themes"

const THEME_LABELS: Record<Theme, string> = {
	system: "System",
	light: "Light",
	dark: "Dark",
}

export default function AppearanceModePicker() {
	const [presetParams, setPresetParams] = useThemerPreset()

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
				side="right"
				align="end"
				sideOffset={20}
				className="min-w-[280px] shadow-sm">
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
							Sets the default theme your project loads with (light, dark, or
							system)
						</TooltipContent>
					</Tooltip>
				</div>
				<DropdownMenuRadioGroup
					value={presetParams.defaultTheme}
					onValueChange={(value) =>
						setPresetParams({ defaultTheme: value as Theme })
					}>
					<DropdownMenuRadioItem value="light">Light</DropdownMenuRadioItem>
					<DropdownMenuRadioItem value="dark">Dark</DropdownMenuRadioItem>
					<DropdownMenuRadioItem value="system">System</DropdownMenuRadioItem>
				</DropdownMenuRadioGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
