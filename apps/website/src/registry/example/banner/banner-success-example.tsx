"use client"

import React, { useState } from "react"
import { Sparkles } from "lucide-react"
import {
	Banner,
	BannerContent,
	BannerDescription,
	BannerIcon,
	BannerTitle,
} from "@/registry/ui/banner"
import { Button } from "@/registry/ui/button"

const BannerSuccessExample = () => {
	const [bannerVisible1, setBannerVisible1] = useState(true)
	const [bannerVisible2, setBannerVisible2] = useState(true)
	const handleClose1 = () => {
		setBannerVisible1(false)

		setTimeout(() => {
			setBannerVisible1(true)
		}, 1500)
	}
	const handleClose2 = () => {
		setBannerVisible2(false)

		setTimeout(() => {
			setBannerVisible2(true)
		}, 1500)
	}
	return (
		<div className="flex w-full max-w-160 flex-col items-center justify-center gap-6">
			{bannerVisible1 && (
				<Banner onClose={handleClose1} color="success" variant="strong">
					<BannerContent className="flex gap-2 px-1 sm:flex-row sm:items-center sm:justify-center">
						<BannerTitle className="truncate">
							Your account was created.
						</BannerTitle>
						<BannerDescription className="truncate">
							You’ll get an email confirmation shortly
						</BannerDescription>
					</BannerContent>
				</Banner>
			)}
			{bannerVisible2 && (
				<Banner onClose={handleClose2} color="success">
					<BannerIcon>
						<Sparkles size={20} />
					</BannerIcon>
					<BannerDescription className="truncate">
						Get full advantage of Radian with better performance.
					</BannerDescription>
					<BannerTitle className="truncate">
						Get the Desktop app Now!
					</BannerTitle>
					<div className="flex items-center justify-center gap-3 pr-1">
						<Button size="28" color="success" variant="outline">
							Download
						</Button>
					</div>
				</Banner>
			)}
		</div>
	)
}

export default BannerSuccessExample
