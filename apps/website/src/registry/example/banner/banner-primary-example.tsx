import React from "react"
import { ArrowRight, Info, ShieldCheck } from "lucide-react"
import {
	Banner,
	BannerDescription,
	BannerIcon,
	BannerTitle,
} from "@/registry/ui/banner"
import { Button } from "@/registry/ui/button"

const BannerPrimaryExamples = () => {
	return (
		<div className="max-w-160 flex w-full flex-col items-center justify-center gap-6">
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

			<Banner>
				<BannerIcon>
					<ShieldCheck size={20} />
				</BannerIcon>
				<BannerTitle className="truncate">New Version 1.0.2</BannerTitle>
				<BannerDescription className="truncate">
					New security patch and 2FA now available in app
				</BannerDescription>
				<div className="flex items-center justify-center gap-1">
					<Button variant="link">Learn More</Button>
					<ArrowRight size={20} />
				</div>
			</Banner>
		</div>
	)
}

export default BannerPrimaryExamples
