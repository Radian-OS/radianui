import React from "react"

interface FaqHeaderProps {
	badge?: string
	title?: string
}

export function FaqHeader({
	badge = "Know us better",
	title = "FAQs.",
}: FaqHeaderProps) {
	return (
		<div className="mx-auto max-w-7xl px-4 lg:px-8 xl:px-16">
			<div className="border-border border-x px-5 py-8 md:px-8 md:py-16">
				<div className="flex flex-col gap-4">
					<div className="flex items-center gap-1.5">
						<div className="bg-fg-secondary m-1.5 size-1.5 rounded-full" />
						<span className="text-fg-secondary text-base font-normal">
							{badge}
						</span>
					</div>
					<h2 className="heading-1 text-foreground">{title}</h2>
				</div>
			</div>
		</div>
	)
}
