import { ChevronRight, Info } from "lucide-react"
import { cn } from "@/lib/utils"

export function InfoCard({ className }: { className?: string }) {
	return (
		<div className={cn("px-3 py-1.5", className)}>
			<div className="bg-bg border-soft flex items-center gap-2 rounded-lg border px-2.5 py-1.5">
				<Info className="size-6" />
				<div className="flex flex-col">
					<span className="text-[13px] font-medium leading-5">
						Version 1.2 Update
					</span>
					<span className="text-fg-tertiary flex cursor-pointer items-center text-sm font-normal">
						<span>Learn More</span>
						<ChevronRight className="size-4" />
					</span>
				</div>
			</div>
		</div>
	)
}
