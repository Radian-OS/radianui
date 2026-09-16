import React from "react"

export function SectionLabel({ children }: { children: React.ReactNode }) {
	return (
		<span className="text-fg-tertiary text-[11px] font-medium tracking-wider uppercase">
			{children}
		</span>
	)
}
