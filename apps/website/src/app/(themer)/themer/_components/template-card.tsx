import { Check } from "lucide-react"
import { cn } from "@/lib/utils"
import { Template } from "@/registry/templates"

export function TemplateCard({
	template,
	isSelected,
	onClick,
}: {
	template: Template
	isSelected: boolean
	onClick: () => void
}) {
	const label = template.charAt(0).toUpperCase() + template.slice(1)
	return (
		<button
			onClick={onClick}
			className={cn(
				"relative flex flex-1 flex-col items-center gap-2 rounded-xl border-2 px-4 py-4 transition-all",
				isSelected
					? "border-primary bg-primary-accent"
					: "border-border bg-elevation-level2 hover:border-fg-disabled"
			)}>
			{isSelected && (
				<span className="bg-primary absolute top-2 right-2 flex size-4 items-center justify-center rounded-full">
					<Check className="text-fg-inverse size-2.5" strokeWidth={3} />
				</span>
			)}
			<span className="text-fg-secondary text-2xl">
				{template === "next" ? "N" : "V"}
			</span>
			<span
				className={cn(
					"text-xs font-medium",
					isSelected ? "text-primary-text" : "text-fg-secondary"
				)}>
				{label}
			</span>
		</button>
	)
}
