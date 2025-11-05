import React, { useState } from "react"
import { Sparkles } from "lucide-react"
import { Banner, BannerDescription, BannerIcon, BannerTitle } from "@/registry/ui/banner"
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
		<div className="max-w-160 flex w-full flex-col items-center justify-center gap-6">
			{bannerVisible1 && (
				<Banner onClose={handleClose1} color="success" variant="strong">
					<div className="flex grow items-center justify-center gap-2 px-1">
						<BannerTitle>Your account was created.</BannerTitle>
						<BannerDescription>You’ll get an email confirmation shortly</BannerDescription>
					</div>
				</Banner>
			)}
			{bannerVisible2 && (
				<Banner onClose={handleClose2} color="success">
					<BannerIcon>
						<Sparkles size={20} />
					</BannerIcon>
					<BannerDescription>Get full advantage of Radian with better performance.</BannerDescription>
					<BannerTitle>Get the Desktop app Now!</BannerTitle>
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
