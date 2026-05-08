import { Lock, LockOpen } from "lucide-react"
import { cn } from "@/lib/utils"
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/styles/default/ui/tooltip"

export const RADII = [
	{ name: "Default", value: "default" },
	{ name: "None", value: "none" },
	{ name: "Small", value: "small" },
	{ name: "Medium", value: "medium" },
	{ name: "Large", value: "large" },
] as const

export function RadiusPill({
	radius,
	isSelected,
	onClick,
}: {
	radius: (typeof RADII)[number]
	isSelected: boolean
	onClick: () => void
}) {
	return (
		<button
			onClick={onClick}
			className={cn(
				"rounded-md border px-3 py-1.5 text-xs font-medium transition-all",
				isSelected
					? "border-primary bg-primary-accent text-primary-text"
					: "border-border bg-elevation-level2 text-fg-secondary hover:border-fg-disabled hover:text-fg"
			)}>
			{radius.name}
		</button>
	)
}

export function RadiusLockPill({
	isLocked,
	onToggle,
}: {
	isLocked: boolean
	onToggle: () => void
}) {
	return (
		<Tooltip>
			<TooltipTrigger asChild>
				<button
					type="button"
					aria-label={isLocked ? "Unlock border radius" : "Lock border radius"}
					aria-pressed={isLocked}
					onClick={onToggle}
					className={cn(
						"flex size-8 items-center justify-center rounded-md border transition-all",
						"focus-visible:ring-primary focus-visible:ring-offset-elevation-level1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
						isLocked
							? "border-primary bg-primary-accent text-primary"
							: "border-border bg-elevation-level2 text-fg-tertiary hover:border-fg-disabled hover:text-fg"
					)}>
					{isLocked ? (
						<Lock className="size-3.5" />
					) : (
						<LockOpen className="size-3.5" />
					)}
				</button>
			</TooltipTrigger>
			<TooltipContent side="top">
				{isLocked ? "Border radius locked" : "Lock border radius"}
			</TooltipContent>
		</Tooltip>
	)
}
