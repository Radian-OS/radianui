"use client"

import React from "react"
import { Info } from "lucide-react"
import {
	Banner,
	BannerDescription,
	BannerIcon,
	BannerTitle,
} from "@/registry/ui/banner"
import { Button } from "@/registry/ui/button"

function BannerExamplePreview() {
	return (
		<div className="absolute top-0 h-full w-full">
			<Banner className="w-full" variant="strong">
				<BannerIcon>
					<Info size={20} />
				</BannerIcon>
				<BannerTitle className="truncate">
					You have 1 day remaining in your Trail Period
				</BannerTitle>
				<BannerDescription className="truncate">
					Have questions or need help ?{" "}
				</BannerDescription>
				<div className="pl-1">
					<Button
						className="text-fg-secondary bg-white hover:bg-white"
						color="neutral"
						size="28">
						Talk to Sales
					</Button>
				</div>
			</Banner>
		</div>
	)
}

export default BannerExamplePreview
