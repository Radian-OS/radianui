"use client"

import React, { useState } from "react"
import { Info } from "lucide-react"
import { Banner, BannerDescription, BannerIcon, BannerTitle } from "@/registry/ui/banner"
import { LinkButton } from "@/registry/ui/button"

function BannerExamplePreview() {
	const [bannerVisible, setBannerVisible] = useState(true)
	const handleClose = () => {
		setBannerVisible(false)

		setTimeout(() => {
			setBannerVisible(true)
		}, 1500)
	}
	return (
		<div className="absolute top-0 h-full w-full">
			{bannerVisible && (
				<Banner color="primary" variant="outline" onClose={handleClose}>
					<div className="flex grow items-center justify-center gap-2">
						<BannerIcon>
							<Info />
						</BannerIcon>
						<BannerTitle>New Version Available</BannerTitle>
						<BannerDescription>App Security Patch</BannerDescription>
						<div className="pl-1">
							<LinkButton color="neutral" href="#">
								Upgrade Now
							</LinkButton>
						</div>
					</div>
				</Banner>
			)}
		</div>
	)
}

export default BannerExamplePreview
