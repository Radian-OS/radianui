import React from "react"
import { IconSlot } from "@/registry/icon/icon-library"
import {
	Banner,
	BannerDescription,
	BannerIcon,
	BannerTitle,
} from "@/registry/ui/banner"

function BannerColorExample() {
	return (
		<div className="max-w-160 flex w-full flex-col items-center justify-center gap-6">
			<Banner>
				<BannerIcon>
					<IconSlot slot="sparkles" size={20} />
				</BannerIcon>
				<BannerTitle className="truncate">Primary</BannerTitle>
				<BannerDescription className="truncate">
					Information news about product
				</BannerDescription>
			</Banner>
			<Banner color="neutral">
				<BannerIcon>
					<IconSlot slot="megaphone" size={20} />
				</BannerIcon>
				<BannerTitle className="truncate">Neutral</BannerTitle>
				<BannerDescription className="truncate">
					Information news about product
				</BannerDescription>
			</Banner>
			<Banner color="success">
				<BannerIcon>
					<IconSlot slot="circle-check" size={20} />
				</BannerIcon>
				<BannerTitle className="truncate">Success</BannerTitle>
				<BannerDescription className="truncate">
					User achievement or success message
				</BannerDescription>
			</Banner>
			<Banner color="error">
				<BannerIcon>
					<IconSlot slot="circle-alert" size={20} />
				</BannerIcon>
				<BannerTitle className="truncate">Error</BannerTitle>
				<BannerDescription className="truncate">
					Alert user of a problem or error
				</BannerDescription>
			</Banner>
			<Banner color="warning">
				<BannerIcon>
					<IconSlot slot="clock" size={20} />
				</BannerIcon>
				<BannerTitle className="truncate">Warning</BannerTitle>
				<BannerDescription className="truncate">
					Notify user of potential problem that may occur
				</BannerDescription>
			</Banner>
			<Banner color="info">
				<BannerIcon>
					<IconSlot slot="info" size={20} />
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
