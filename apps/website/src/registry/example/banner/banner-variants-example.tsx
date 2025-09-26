import React from "react"
import { CubeIcon } from "@radix-ui/react-icons"
import { Banner, BannerContent, BannerDescription, BannerIcon, BannerTitle } from "@/registry/ui/banner"
import { LinkButton } from "@/registry/ui/button"

function BannerVariantsExample() {
	return (
		<div className="flex w-full flex-col items-center justify-center gap-4">
			<Banner variant="outline" onClose={() => null}>
				<BannerIcon>
					<CubeIcon className="size-5" />
				</BannerIcon>
				<BannerContent>
					<BannerTitle>Banner Title Here</BannerTitle>
					<BannerDescription>Enter Your banner message here</BannerDescription>
				</BannerContent>
				<LinkButton color="neutral" href="#">
					Button Label
				</LinkButton>
			</Banner>
			<Banner variant="soft" onClose={() => null}>
				<BannerIcon>
					<CubeIcon className="size-5" />
				</BannerIcon>
				<BannerContent>
					<BannerTitle>Banner Title Here</BannerTitle>
					<BannerDescription>Enter Your banner message here</BannerDescription>
				</BannerContent>
				<LinkButton href="#">Button Label</LinkButton>
			</Banner>
			<Banner variant="soft-outline" onClose={() => null}>
				<BannerIcon>
					<CubeIcon className="size-5" />
				</BannerIcon>
				<BannerContent>
					<BannerTitle>Banner Title Here</BannerTitle>
					<BannerDescription>Enter Your banner message here</BannerDescription>
				</BannerContent>
				<LinkButton href="#">Button Label</LinkButton>
			</Banner>
			<Banner variant="strong" onClose={() => null}>
				<BannerIcon>
					<CubeIcon className="size-5" />
				</BannerIcon>
				<BannerContent>
					<BannerTitle>Banner Title Here</BannerTitle>
					<BannerDescription>Enter Your banner message here</BannerDescription>
				</BannerContent>
				<LinkButton className="text-white" href="#">
					Button Label
				</LinkButton>
			</Banner>
		</div>
	)
}

export default BannerVariantsExample
