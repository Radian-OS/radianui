"use client"

import { Box } from "lucide-react"
import { Banner } from "@/registry/ui/banner"

export default function UnderDevelopmentBanner() {
	return (
		<div className="hidden md:block">
			<Banner variant="dark" closable>
				<Box size={20} className="stroke-white" />
				<p>Radian OS is under development at the moment. Please check at a later time for updates.</p>
			</Banner>
		</div>
	)
}
