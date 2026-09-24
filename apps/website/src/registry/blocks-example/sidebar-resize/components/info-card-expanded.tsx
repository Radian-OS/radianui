import { ChevronRight } from "lucide-react"
import { CircleLogo } from "./logos"

export function InfoCardExpanded() {
	return (
		<div className="mt-auto px-3 py-1.5 group-data-[state=collapsed]:hidden">
			<div className="bg-elevation-level2 border-soft-alpha flex items-center gap-2 rounded-lg border px-2.5 py-1.5">
				<CircleLogo />
				<div className="flex flex-col">
					<span className="text-[13px] leading-5 font-medium">
						Version 1.2 Update
					</span>
					<span className="text-fg-tertiary flex cursor-pointer items-center text-xs font-normal">
						<span>Learn More</span>
						<ChevronRight className="size-4" />
					</span>
				</div>
			</div>
		</div>
	)
}
