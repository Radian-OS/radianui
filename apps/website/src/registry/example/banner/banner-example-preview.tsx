"use client"

import React, { useState } from "react"
import { Sparkles } from "lucide-react"
import { Banner, BannerContent, BannerDescription, BannerIcon, BannerTitle } from "@/registry/ui/banner"

function BannerExamplePreview() {
	const [bannerVisible, setBannerVisible] = useState(true)
	return (
		<div className="absolute top-0 h-full w-full">
			{bannerVisible && (
				<Banner variant="strong" color="primary" onClose={() => setBannerVisible(false)}>
					<BannerContent>
						<BannerIcon>
							<Sparkles />
						</BannerIcon>
						<BannerTitle>New Feature!</BannerTitle>
						<BannerDescription>Check it out</BannerDescription>
					</BannerContent>
				</Banner>
			)}
		</div>
	)
}

export default BannerExamplePreview
