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
	{ name: "Full", value: "full" },
] as const

export function RadiusPill({
	radius,
	isSelected,
	disabled = false,
	onClick,
}: {
	radius: (typeof RADII)[number]
	isSelected: boolean
	disabled?: boolean
	onClick: () => void
}) {
	return (
		<button
			disabled={disabled}
			onClick={onClick}
			className={cn(
				"rounded-md border px-3 py-1.5 text-xs font-medium transition-all",
				disabled && "cursor-not-allowed opacity-50",
				isSelected
					? "border-primary bg-primary-accent text-primary-text"
					: "border-border bg-elevation-level2 text-fg-secondary",
				!disabled && !isSelected && "hover:border-fg-disabled hover:text-fg"
			)}>
			{radius.name}
		</button>
	)
}

export function RadiusLockPill({
	isLocked,
	disabled = false,
	onToggle,
}: {
	isLocked: boolean
	disabled?: boolean
	onToggle: () => void
}) {
	return (
		<Tooltip>
			<TooltipTrigger asChild>
				<button
					type="button"
					aria-label={isLocked ? "Unlock border radius" : "Lock border radius"}
					aria-pressed={isLocked}
					disabled={disabled}
					onClick={onToggle}
					className={cn(
						"flex size-8 items-center justify-center rounded-md border transition-all",
						"focus-visible:ring-primary focus-visible:ring-offset-elevation-level1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
						disabled && "cursor-not-allowed opacity-50",
						isLocked
							? "border-primary bg-primary-accent text-primary"
							: "border-border bg-elevation-level2 text-fg-tertiary",
						!disabled && !isLocked && "hover:border-fg-disabled hover:text-fg"
					)}>
					{isLocked ? (
						<Lock className="size-3.5" />
					) : (
						<LockOpen className="size-3.5" />
					)}
				</button>
			</TooltipTrigger>
			<TooltipContent side="top">
				{disabled
					? "Border radius unavailable for this style"
					: isLocked
						? "Border radius locked"
						: "Lock border radius"}
			</TooltipContent>
		</Tooltip>
	)
}
