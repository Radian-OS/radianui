import React from "react"
import {
	AlarmClock,
	Bug,
	Feather,
	Megaphone,
	Sparkles,
	Trophy,
} from "lucide-react"
import {
	Banner,
	BannerDescription,
	BannerIcon,
	BannerTitle,
} from "@/registry/ui/banner"

function BannerColorExample() {
	return (
		<div className="flex w-full max-w-160 flex-col items-center justify-center gap-6">
			<Banner>
				<BannerIcon>
					<Sparkles size={20} />
				</BannerIcon>
				<BannerTitle className="truncate">Primary</BannerTitle>
				<BannerDescription className="truncate">
					Information news about product
				</BannerDescription>
			</Banner>
			<Banner color="neutral">
				<BannerIcon>
					<Megaphone size={20} />
				</BannerIcon>
				<BannerTitle className="truncate">Neutral</BannerTitle>
				<BannerDescription className="truncate">
					Information news about product
				</BannerDescription>
			</Banner>
			<Banner color="success">
				<BannerIcon>
					<Trophy size={20} />
				</BannerIcon>
				<BannerTitle className="truncate">Success</BannerTitle>
				<BannerDescription className="truncate">
					User achievement or success message
				</BannerDescription>
			</Banner>
			<Banner color="error">
				<BannerIcon>
					<Bug size={20} />
				</BannerIcon>
				<BannerTitle className="truncate">Error</BannerTitle>
				<BannerDescription className="truncate">
					Alert user of a problem or error
				</BannerDescription>
			</Banner>
			<Banner color="warning">
				<BannerIcon>
					<AlarmClock size={20} />
				</BannerIcon>
				<BannerTitle className="truncate">Warning</BannerTitle>
				<BannerDescription className="truncate">
					Notify user of potential problem that may occur
				</BannerDescription>
			</Banner>
			<Banner color="info">
				<BannerIcon>
					<Feather size={20} />
				</BannerIcon>
				<BannerTitle className="truncate">Info</BannerTitle>
				<BannerDescription className="truncate">
					Information news about product
				</BannerDescription>
			</Banner>
		</div>
	)
}

export default BannerColorExample
