import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Progress } from "@/registry/ui/progress"

export function InfoCard({ className }: { className?: string }) {
	return (
		<div className={cn("max-w-65 w-full px-3 py-1", className)}>
			<div className="bg-fill1 border-soft flex flex-col gap-1.5 rounded-lg border p-1 pb-2">
				<div className="bg-bg flex flex-col gap-2 rounded-md p-2">
					<p className="text-xs font-normal">Complete your tutorial to unlock additional 100 credits</p>

					<Progress value={60} />

					<span className="text-fg-secondary text-xs font-normal">50% Complete</span>
				</div>

				<Link href="#" className="flex items-center gap-2 px-2 text-sm">
					<span className="text-primary-text flex-1 font-medium">Get Started</span>
					<ArrowRight className="text-fg-secondary size-4" />
				</Link>
			</div>
		</div>
	)
}
