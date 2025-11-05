import React from "react"
import { AlarmClock, Bug, Feather, Megaphone, Sparkles, Trophy } from "lucide-react"
import { Banner, BannerDescription, BannerIcon, BannerTitle } from "@/registry/ui/banner"

function BannerColorExample() {
	return (
		<div className="max-w-160 flex w-full flex-col items-center justify-center gap-6">
			<Banner>
				<BannerIcon>
					<Sparkles size={20} />
				</BannerIcon>
				<BannerTitle>Primary</BannerTitle>
				<BannerDescription>Information news about product</BannerDescription>
			</Banner>
			<Banner color="neutral">
				<BannerIcon>
					<Megaphone size={20} />
				</BannerIcon>
				<BannerTitle>Neutral</BannerTitle>
				<BannerDescription>Information news about product</BannerDescription>
			</Banner>
			<Banner color="success">
				<BannerIcon>
					<Trophy size={20} />
				</BannerIcon>
				<BannerTitle>Success</BannerTitle>
				<BannerDescription>User achievement or success message</BannerDescription>
			</Banner>
			<Banner color="error">
				<BannerIcon>
					<Bug size={20} />
				</BannerIcon>
				<BannerTitle>Error</BannerTitle>
				<BannerDescription>Alert user of a problem or error</BannerDescription>
			</Banner>
			<Banner color="warning">
				<BannerIcon>
					<AlarmClock size={20} />
				</BannerIcon>
				<BannerTitle>Warning</BannerTitle>
				<BannerDescription>Notify user of potential problem that may occur</BannerDescription>
			</Banner>
			<Banner color="info">
				<BannerIcon>
					<Feather size={20} />
				</BannerIcon>
				<BannerTitle>Info</BannerTitle>
				<BannerDescription>Information news about product</BannerDescription>
			</Banner>
		</div>
	)
}

export default BannerColorExample
