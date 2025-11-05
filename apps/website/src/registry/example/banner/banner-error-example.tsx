import React, { useState } from "react"
import { TriangleAlert } from "lucide-react"
import { Banner, BannerDescription, BannerIcon, BannerTitle } from "@/registry/ui/banner"
import { Button, LinkButton } from "@/registry/ui/button"

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
				<Banner onClose={handleClose} color="error" variant="strong">
					<div className="flex grow items-center gap-2 pl-1">
						<BannerIcon>
							<TriangleAlert size={20} />
						</BannerIcon>
						<BannerTitle className="grow">Pending Review. There is 1 new important file waiting for your review</BannerTitle>
						<LinkButton href="#error-banner" className="px-1 text-white">
							Review Now
						</LinkButton>
					</div>
				</Banner>
			)}

			<Banner color="error">
				<div className="flex grow items-center gap-2 pl-1">
					<BannerIcon>
						<TriangleAlert size={20} />
					</BannerIcon>
					<BannerTitle>Your profile is hidden</BannerTitle>
					<BannerDescription>To allow others to view this page</BannerDescription>
				</div>
				<Button size="28" variant="outline" color="error">
					View Settings
				</Button>
			</Banner>
		</div>
	)
}

export default BannerErrorExample
