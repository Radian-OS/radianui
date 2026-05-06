import { cn } from "@/lib/utils"
import { PRIMARY_COLORS } from "@/registry/primary-colors"
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/styles/default/ui/tooltip"

export function ColorSwatch({
	color,
	isSelected,
	disabled,
	onClick,
}: {
	color: (typeof PRIMARY_COLORS)[number]
	isSelected: boolean
	disabled?: boolean
	onClick: () => void
}) {
	return (
		<Tooltip disableHoverableContent={disabled}>
			<TooltipTrigger asChild>
				<button
					onClick={onClick}
					disabled={disabled}
					className={cn(
						"size-7 rounded-full border-2 transition-all",
						isSelected
							? "border-fg scale-110 ring-2 ring-white"
							: "hover:border-border border-transparent hover:scale-110",
						disabled &&
							"cursor-not-allowed opacity-50 hover:scale-100 hover:border-transparent"
					)}
					style={{ backgroundColor: color.cssVars.light["--color-primary"] }}
				/>
			</TooltipTrigger>
			<TooltipContent side="top">{color.name}</TooltipContent>
		</Tooltip>
	)
}
