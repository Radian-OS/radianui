import type { ReactNode } from "react"
import { Badge } from "@/registry/ui/badge"

interface ResourceCTAProps {
	id: string
	badge: string
	title: string
	description: string
	actions: ReactNode
	visual?: ReactNode
}

export function ResourceCTA({
	id,
	badge,
	title,
	description,
	actions,
	visual,
}: ResourceCTAProps) {
	return (
		<section
			aria-labelledby={id}
			className="border-soft from-fill1 to-bg-fill2 relative max-w-[1430px] overflow-hidden rounded-[20px] border bg-linear-to-b 2xl:mx-auto">
			<div className="flex min-h-[360px] items-center overflow-hidden p-6 sm:p-10 lg:w-[1350px] lg:p-15">
				<div className="relative z-10 flex w-full flex-col gap-5 lg:max-w-md">
					<div className="flex w-full flex-col gap-8 lg:w-[532px]">
						<div className="flex flex-col gap-5">
							<Badge color="green" variant="soft" size="28">
								{badge}
							</Badge>
							<h2 id={id} className="heading-4">
								{title}
							</h2>
						</div>
						<p className="text-fg-secondary text-sm font-normal">
							{description}
						</p>
					</div>
					<div className="flex flex-col items-center gap-3 sm:flex-row">
						{actions}
					</div>
				</div>
				{visual}
			</div>
		</section>
	)
}
