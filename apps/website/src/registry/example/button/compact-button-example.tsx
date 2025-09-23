import React from "react"
import { CircleAlert, MapPinned, SunMedium, X } from "lucide-react"
import { CompactButton } from "@/registry/ui/button"

function CompactButtonExample() {
	return (
		<div className="flex flex-col items-center justify-center gap-6">
			<div className="flex items-center justify-center gap-4">
				<CompactButton color="primary" variant="strong">
					<CircleAlert />
				</CompactButton>
				<CompactButton color="info" variant="strong">
					<CircleAlert />
				</CompactButton>
				<CompactButton color="success" variant="strong">
					<CircleAlert />
				</CompactButton>
				<CompactButton color="warning" variant="strong">
					<CircleAlert />
				</CompactButton>
				<CompactButton color="error" variant="strong">
					<CircleAlert />
				</CompactButton>
				<CompactButton color="neutral" variant="strong">
					<CircleAlert />
				</CompactButton>
			</div>
			<div className="flex items-center justify-center gap-4">
				<CompactButton color="primary" variant="outline">
					<X />
				</CompactButton>
				<CompactButton color="info" variant="outline">
					<X />
				</CompactButton>
				<CompactButton color="success" variant="outline">
					<X />
				</CompactButton>
				<CompactButton color="warning" variant="outline">
					<X />
				</CompactButton>
				<CompactButton color="error" variant="outline">
					<X />
				</CompactButton>
				<CompactButton color="neutral" variant="outline">
					<X />
				</CompactButton>
			</div>
			<div className="flex items-center justify-center gap-4">
				<CompactButton color="primary" variant="soft">
					<MapPinned />
				</CompactButton>
				<CompactButton color="info" variant="soft">
					<MapPinned />
				</CompactButton>
				<CompactButton color="success" variant="soft">
					<MapPinned />
				</CompactButton>
				<CompactButton color="warning" variant="soft">
					<MapPinned />
				</CompactButton>
				<CompactButton color="error" variant="soft">
					<MapPinned />
				</CompactButton>
				<CompactButton color="neutral" variant="soft">
					<MapPinned />
				</CompactButton>
			</div>
			<div className="flex items-center justify-center gap-4">
				<CompactButton color="primary" variant="ghost">
					<SunMedium />
				</CompactButton>
				<CompactButton color="info" variant="ghost">
					<SunMedium />
				</CompactButton>
				<CompactButton color="success" variant="ghost">
					<SunMedium />
				</CompactButton>
				<CompactButton color="warning" variant="ghost">
					<SunMedium />
				</CompactButton>
				<CompactButton color="error" variant="ghost">
					<SunMedium />
				</CompactButton>
				<CompactButton color="neutral" variant="ghost">
					<SunMedium />
				</CompactButton>
			</div>
		</div>
	)
}

export default CompactButtonExample
