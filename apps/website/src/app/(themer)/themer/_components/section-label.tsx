import React from "react"

export function SectionLabel({ children }: { children: React.ReactNode }) {
	return (
		<span className="text-fg-tertiary text-[11px] font-medium uppercase tracking-wider">
			{children}
		</span>
	)
}
