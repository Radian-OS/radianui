import React from "react"
import { CubeIcon } from "@radix-ui/react-icons"
import { Banner, BannerContent, BannerDescription, BannerIcon, BannerTitle } from "@/registry/ui/banner"
import { LinkButton } from "@/registry/ui/button"

function BannerColorExample() {
	return (
		<div className="flex w-full flex-col items-center justify-center gap-4">
			<Banner color="error" onClose={() => console.log("object")}>
				<BannerContent>
					<BannerIcon>
						<CubeIcon className="size-5" />
					</BannerIcon>
					<BannerTitle>Banner Title Here</BannerTitle>
					<BannerDescription>Enter Your banner message here</BannerDescription>
					<LinkButton href="#">Button Label</LinkButton>
				</BannerContent>
			</Banner>
			<Banner color="info" onClose={() => console.log("object")}>
				<BannerContent>
					<BannerIcon>
						<CubeIcon className="size-5" />
					</BannerIcon>
					<BannerTitle>Banner Title Here</BannerTitle>
					<BannerDescription>Enter Your banner message here</BannerDescription>
					<LinkButton href="#">Button Label</LinkButton>
				</BannerContent>
			</Banner>
			<Banner color="neutral" onClose={() => console.log("object")}>
				<BannerContent>
					<BannerIcon>
						<CubeIcon className="size-5" />
					</BannerIcon>
					<BannerTitle>Banner Title Here</BannerTitle>
					<BannerDescription>Enter Your banner message here</BannerDescription>
					<LinkButton href="#">Button Label</LinkButton>
				</BannerContent>
			</Banner>
			<Banner color="primary" onClose={() => console.log("object")}>
				<BannerContent>
					<BannerIcon>
						<CubeIcon className="size-5" />
					</BannerIcon>
					<BannerTitle>Banner Title Here</BannerTitle>
					<BannerDescription>Enter Your banner message here</BannerDescription>
					<LinkButton href="#">Button Label</LinkButton>
				</BannerContent>
			</Banner>
			<Banner color="success" onClose={() => console.log("object")}>
				<BannerContent>
					<BannerIcon>
						<CubeIcon className="size-5" />
					</BannerIcon>
					<BannerTitle>Banner Title Here</BannerTitle>
					<BannerDescription>Enter Your banner message here</BannerDescription>
					<LinkButton href="#">Button Label</LinkButton>
				</BannerContent>
			</Banner>
			<Banner color="warning" onClose={() => console.log("object")}>
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

export default BannerColorExample
