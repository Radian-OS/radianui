export function ThemeSummaryPill({
	label,
	value,
	colorSwatch,
}: {
	label: string
	value: string
	colorSwatch?: string
}) {
	return (
		<div className="bg-fill1 border-border flex items-center gap-2 rounded-lg border px-2.5 py-1.5">
			{colorSwatch && (
				<span
					className="size-3 shrink-0 rounded-full border border-black/10"
					style={{ backgroundColor: colorSwatch }}
				/>
			)}
			<span className="text-fg-tertiary text-[11px]">{label}</span>
			<span className="text-fg text-xs font-medium">{value}</span>
		</div>
	)
}
