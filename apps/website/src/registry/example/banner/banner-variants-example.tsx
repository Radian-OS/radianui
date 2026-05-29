import React from "react"
import { IconSlot } from "@/registry/icon/icon-library"
import {
	Banner,
	BannerDescription,
	BannerIcon,
	BannerTitle,
} from "@/registry/ui/banner"

function BannerVariantsExample() {
	return (
		<div className="max-w-160 flex w-full flex-col items-center justify-center gap-6">
			<Banner variant="outline">
				<BannerIcon>
					<IconSlot slot="sparkles" size={20} />
				</BannerIcon>
				<BannerTitle className="truncate">Outline</BannerTitle>
				<BannerDescription className="truncate">
					This is a variant of banner component
				</BannerDescription>
			</Banner>
			<Banner variant="soft">
				<BannerIcon>
					<IconSlot slot="sparkles" size={20} />
				</BannerIcon>
				<BannerTitle className="truncate">Soft</BannerTitle>
				<BannerDescription className="truncate">
					This is a variant of banner component
				</BannerDescription>
			</Banner>
			<Banner variant="strong">
				<BannerIcon>
					<IconSlot slot="sparkles" size={20} />
				</BannerIcon>
				<BannerTitle className="truncate">Strong</BannerTitle>
				<BannerDescription className="truncate">
					This is a variant of banner component
				</BannerDescription>
			</Banner>
		</div>
	)
}

export default BannerVariantsExample
