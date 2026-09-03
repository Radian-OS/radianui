import { ChevronRight } from "lucide-react"

export function InfoCard() {
	return (
		<div className="flex flex-col gap-1">
			<img
				className="h-30 rounded-lg"
				src="https://images.unsplash.com/photo-1557682250-33bd709cbe85?q=80&w=1429&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
				alt="Abstract image"
			/>
			<div>
				<span className="text-[13px] leading-5 font-medium">
					Version 1.2 Update
				</span>
				<span className="text-fg-tertiary flex cursor-pointer items-center text-xs font-normal">
					<span>Learn More</span>
					<ChevronRight className="size-4" />
				</span>
			</div>
		</div>
	)
}
