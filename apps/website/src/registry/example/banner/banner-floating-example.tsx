import React from "react"
import { Brain } from "lucide-react"
import {
	Banner,
	BannerContent,
	BannerDescription,
	BannerIcon,
	BannerTitle,
} from "@/registry/ui/banner"
import { Button } from "@/registry/ui/button"

const BannerFloatingExample = () => {
	return (
		<div className="max-w-160 flex w-full items-center justify-center">
			<Banner
				color="primary"
				variant="outline"
				className="border-border border-t-1 border-r-1 border-l-1 rounded-lg shadow-[0_4px_8px_0_var(--color-fill4)]">
				<BannerIcon>
					<Brain size={20} />
				</BannerIcon>
				<BannerContent className="sm:grow-0 sm:flex-row sm:items-center sm:gap-2">
					<BannerTitle className="truncate">Floating Banner</BannerTitle>
					<BannerDescription className="truncate">
						I am an example of a Floating Banner
					</BannerDescription>
				</BannerContent>
				<div className="pl-1">
					<Button variant="link">Click Me</Button>
				</div>
			</Banner>
		</div>
	)
}

export default BannerFloatingExample
