import React from "react"
import { CubeIcon } from "@radix-ui/react-icons"
import { Banner, BannerContent, BannerDescription, BannerIcon, BannerTitle } from "@/registry/ui/banner"
import { LinkButton } from "@/registry/ui/button"

function BannerVariantsExample() {
	return (
		<div className="flex w-full flex-col items-center justify-center gap-4">
			<Banner variant="outline" onClose={() => console.log("object")}>
				<BannerContent>
					<BannerIcon>
						<CubeIcon className="size-5" />
					</BannerIcon>
					<BannerTitle>Banner Title Here</BannerTitle>
					<BannerDescription>Enter Your banner message here</BannerDescription>
					<LinkButton href="#">Button Label</LinkButton>
				</BannerContent>
			</Banner>
			<Banner variant="soft" onClose={() => console.log("object")}>
				<BannerContent>
					<BannerIcon>
						<CubeIcon className="size-5" />
					</BannerIcon>
					<BannerTitle>Banner Title Here</BannerTitle>
					<BannerDescription>Enter Your banner message here</BannerDescription>
					<LinkButton href="#">Button Label</LinkButton>
				</BannerContent>
			</Banner>
			<Banner variant="soft-outline" onClose={() => console.log("object")}>
				<BannerContent>
					<BannerIcon>
						<CubeIcon className="size-5" />
					</BannerIcon>
					<BannerTitle>Banner Title Here</BannerTitle>
					<BannerDescription>Enter Your banner message here</BannerDescription>
					<LinkButton href="#">Button Label</LinkButton>
				</BannerContent>
			</Banner>
			<Banner variant="strong" onClose={() => console.log("object")}>
				<BannerContent>
					<BannerIcon>
						<CubeIcon className="size-5" />
					</BannerIcon>
					<BannerTitle>Banner Title Here</BannerTitle>
					<BannerDescription>Enter Your banner message here</BannerDescription>
					<LinkButton href="#">Button Label</LinkButton>
				</BannerContent>
			</Banner>
		</div>
	)
}

export default BannerVariantsExample
