import React from "react"
import { CubeIcon } from "@radix-ui/react-icons"
import { Banner, BannerContent, BannerDescription, BannerIcon, BannerTitle } from "@/registry/ui/banner"
import { LinkButton } from "@/registry/ui/button"

function BannerColorExample() {
	return (
		<div className="flex w-full flex-col items-center justify-center gap-4">
			<Banner color="error" onClose={() => null}>
				<BannerIcon>
					<CubeIcon className="size-5" />
				</BannerIcon>
				<BannerContent>
					<BannerTitle>Banner Title Here</BannerTitle>
					<BannerDescription>Enter Your banner message here</BannerDescription>
				</BannerContent>
				<LinkButton color="error" href="#">
					Button Label
				</LinkButton>
			</Banner>
			<Banner color="info" onClose={() => null}>
				<BannerIcon>
					<CubeIcon className="size-5" />
				</BannerIcon>
				<BannerContent>
					<BannerTitle>Banner Title Here</BannerTitle>
					<BannerDescription>Enter Your banner message here</BannerDescription>
				</BannerContent>
				<LinkButton color="info" href="#">
					Button Label
				</LinkButton>
			</Banner>
			<Banner color="neutral" onClose={() => null}>
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
			<Banner color="primary" onClose={() => null}>
				<BannerIcon>
					<CubeIcon className="size-5" />
				</BannerIcon>
				<BannerContent>
					<BannerTitle>Banner Title Here</BannerTitle>
					<BannerDescription>Enter Your banner message here</BannerDescription>
				</BannerContent>
				<LinkButton color="primary" href="#">
					Button Label
				</LinkButton>
			</Banner>
			<Banner color="success" onClose={() => null}>
				<BannerIcon>
					<CubeIcon className="size-5" />
				</BannerIcon>
				<BannerContent>
					<BannerTitle>Banner Title Here</BannerTitle>
					<BannerDescription>Enter Your banner message here</BannerDescription>
				</BannerContent>
				<LinkButton color="success" href="#">
					Button Label
				</LinkButton>
			</Banner>
			<Banner color="warning" onClose={() => null}>
				<BannerIcon>
					<CubeIcon className="size-5" />
				</BannerIcon>
				<BannerContent>
					<BannerTitle>Banner Title Here</BannerTitle>
					<BannerDescription>Enter Your banner message here</BannerDescription>
				</BannerContent>
				<LinkButton color="warning" href="#">
					Button Label
				</LinkButton>
			</Banner>
		</div>
	)
}

export default BannerColorExample
