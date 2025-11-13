"use client"

import React, { useState } from "react"
import { Info } from "lucide-react"
import { Banner, BannerContent, BannerDescription, BannerIcon, BannerTitle } from "@/registry/ui/banner"
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
						<BannerContent className="gor flex grow flex-col items-start sm:grow-0 sm:flex-row sm:items-center sm:gap-2">
							<BannerTitle className="truncate">New Version Available</BannerTitle>
							<BannerDescription className="truncate">App Security Patch</BannerDescription>
						</BannerContent>
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
