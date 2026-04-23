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
	onClick,
}: {
	color: (typeof PRIMARY_COLORS)[number]
	isSelected: boolean
	onClick: () => void
}) {
	return (
		<Tooltip>
			<TooltipTrigger asChild>
				<button
					onClick={onClick}
					className={cn(
						"size-7 rounded-full border-2 transition-all",
						isSelected
							? "border-fg scale-110 ring-2 ring-white"
							: "hover:border-border border-transparent hover:scale-110"
					)}
					style={{ backgroundColor: color.cssVars.light.primary }}
				/>
			</TooltipTrigger>
			<TooltipContent side="top">{color.name}</TooltipContent>
		</Tooltip>
	)
}
