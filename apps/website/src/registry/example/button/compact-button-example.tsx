import React from "react"
import { SunMedium, X } from "lucide-react"
import { CompactButton } from "@/registry/ui/button"

function CompactButtonExample() {
	return (
		<div className="flex flex-col items-center justify-center gap-4">
			<div className="flex items-center justify-center gap-4">
				<CompactButton size="20" color="primary" variant="outline">
					<X />
				</CompactButton>
				<CompactButton size="20" color="info" variant="outline">
					<X />
				</CompactButton>
				<CompactButton size="20" color="success" variant="outline">
					<X />
				</CompactButton>
				<CompactButton size="20" color="warning" variant="outline">
					<X />
				</CompactButton>
				<CompactButton size="20" color="error" variant="outline">
					<X />
				</CompactButton>
				<CompactButton size="20" color="neutral" variant="outline">
					<X />
				</CompactButton>
			</div>
			<div className="flex items-center justify-center gap-4">
				<CompactButton size="24" color="primary" variant="outline">
					<SunMedium />
				</CompactButton>
				<CompactButton size="24" color="info" variant="outline">
					<SunMedium />
				</CompactButton>
				<CompactButton size="24" color="success" variant="outline">
					<SunMedium />
				</CompactButton>
				<CompactButton size="24" color="warning" variant="outline">
					<SunMedium />
				</CompactButton>
				<CompactButton size="24" color="error" variant="outline">
					<SunMedium />
				</CompactButton>
				<CompactButton size="24" color="neutral" variant="outline">
					<SunMedium />
				</CompactButton>
			</div>
		</div>
	)
}

export default CompactButtonExample
