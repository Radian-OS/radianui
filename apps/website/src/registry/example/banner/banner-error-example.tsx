import React, { useState } from "react"
import { TriangleAlert } from "lucide-react"
import {
	Banner,
	BannerContent,
	BannerDescription,
	BannerIcon,
	BannerTitle,
} from "@/registry/ui/banner"
import { Button } from "@/registry/ui/button"

const BannerErrorExample = () => {
	const [bannerVisible, setBannerVisible] = useState(true)
	const handleClose = () => {
		setBannerVisible(false)

		setTimeout(() => {
			setBannerVisible(true)
		}, 1500)
	}
	return (
		<div className="max-w-160 flex w-full flex-col items-center justify-center gap-6">
			{bannerVisible && (
				<Banner
					className="p-3"
					onClose={handleClose}
					color="error"
					variant="strong">
					<BannerIcon>
						<TriangleAlert size={20} />
					</BannerIcon>
					<BannerTitle className="grow truncate">
						Pending Review. There is 1 new important file waiting for your
						review
					</BannerTitle>
					<Button variant="link" className="px-1 text-white">
						Review Now
					</Button>
				</Banner>
			)}

			<Banner color="error" className="p-3">
				<BannerIcon>
					<TriangleAlert size={20} />
				</BannerIcon>
				<BannerContent className="flex sm:flex-row sm:gap-2">
					<BannerTitle className="truncate">Your profile is hidden</BannerTitle>
					<BannerDescription className="truncate">
						To allow others to view this page
					</BannerDescription>
				</BannerContent>
				<div className="hidden sm:flex sm:items-center">
					<Button size="28" variant="outline" color="error">
						View Settings
					</Button>
				</div>
			</Banner>
		</div>
	)
}

export default BannerErrorExample
