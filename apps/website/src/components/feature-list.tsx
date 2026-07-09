import * as React from "react"

export function FeatureList({ children }: { children: React.ReactNode }) {
	return <ul className="m-0 list-none space-y-2.5 p-0">{children}</ul>
}

export function FeatureListItem({
	icon,
	children,
	rightElement,
}: {
	icon?: React.ReactNode
	children: React.ReactNode
	rightElement?: React.ReactNode
}) {
	return (
		<li className="bg-fill1 border-primary-border text-fg-secondary flex items-center gap-2 border-l-4 px-4 py-2 text-lg font-medium">
			{icon && <span className="shrink-0 text-lg">{icon}</span>}
			<span className="flex-1">{children}</span>
			{rightElement && <span>{rightElement}</span>}
		</li>
	)
}
