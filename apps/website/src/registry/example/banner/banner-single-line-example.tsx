import React from "react"
import { CubeIcon } from "@radix-ui/react-icons"
import { CurlyBracesIcon } from "lucide-react"
import { Banner, BannerDescription, BannerIcon, BannerTitle } from "@/registry/ui/banner"
import { LinkButton } from "@/registry/ui/button"

const BannerSingleLineExample = () => {
	return (
		<div className="flex w-full flex-col items-center justify-center gap-4">
			<Banner color="error">
				<BannerIcon>
					<CurlyBracesIcon className="size-5" />
				</BannerIcon>
				<BannerTitle>Banner Title Here</BannerTitle>
				<BannerDescription>Enter Your banner message here</BannerDescription>
				<LinkButton color="error" href="#">
					Button Label
				</LinkButton>
			</Banner>
			<Banner color="info">
				<BannerIcon>
					<CubeIcon className="size-5" />
				</BannerIcon>
				<BannerTitle>Banner Title Here</BannerTitle>
				<BannerDescription>Enter Your banner message here</BannerDescription>
				<LinkButton color="info" href="#">
					Button Label
				</LinkButton>
			</Banner>
			<Banner color="neutral">
				<BannerIcon>
					<CubeIcon className="size-5" />
				</BannerIcon>
				<BannerTitle>Banner Title Here</BannerTitle>
				<BannerDescription>Enter Your banner message here</BannerDescription>
				<LinkButton color="neutral" href="#">
					Button Label
				</LinkButton>
			</Banner>
			<Banner color="primary">
				<BannerIcon>
					<CubeIcon className="size-5" />
				</BannerIcon>
				<BannerTitle>Banner Title Here</BannerTitle>
				<BannerDescription>Enter Your banner message here</BannerDescription>
				<LinkButton color="primary" href="#">
					Button Label
				</LinkButton>
			</Banner>
			<Banner color="success">
				<BannerIcon>
					<CubeIcon className="size-5" />
				</BannerIcon>
				<BannerTitle>Banner Title Here</BannerTitle>
				<BannerDescription>Enter Your banner message here</BannerDescription>
				<LinkButton color="success" href="#">
					Button Label
				</LinkButton>
			</Banner>
			<Banner color="warning">
				<BannerIcon>
					<CubeIcon className="size-5" />
				</BannerIcon>
				<BannerTitle>Banner Title Here</BannerTitle>
				<BannerDescription>Enter Your banner message here</BannerDescription>
				<LinkButton color="warning" href="#">
					Button Label
				</LinkButton>
			</Banner>
		</div>
	)
}

export default BannerSingleLineExample
