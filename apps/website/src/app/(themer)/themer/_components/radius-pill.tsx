import { cn } from "@/lib/utils"

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
