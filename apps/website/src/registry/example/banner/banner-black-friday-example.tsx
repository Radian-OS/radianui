import React from "react"
import { IconSlot } from "@/registry/icon/icon-library"
import {
	Banner,
	BannerContent,
	BannerDescription,
	BannerIcon,
	BannerTitle,
} from "@/registry/ui/banner"
import { Button, ButtonGroup } from "@/registry/ui/button"

const BannerExample = () => {
	return (
		<div className="flex w-full items-center justify-center px-4">
			<Banner className="w-full max-w-3xl">
				<BannerIcon className="flex-shrink-0">
					<span className="flex size-9 items-center justify-center rounded-full bg-white">
						<IconSlot
							slot="flame"
							className="fill-warning-hover text-warning-hover"
							size={20}
						/>
					</span>
				</BannerIcon>
				<BannerContent className="min-w-0">
					<BannerTitle>Black Friday Sale</BannerTitle>
					<BannerDescription className="max max-w-[200px] truncate sm:max-w-[280px]">
						Get 50% off on all your pro subscription purchases
					</BannerDescription>
				</BannerContent>
				<section className="flex flex-shrink-0 items-center justify-center gap-2 px-1 sm:gap-3">
					<ButtonGroup size="32" className="hidden md:flex">
						<Button>00h</Button>
						<Button>00m</Button>
						<Button>00s</Button>
					</ButtonGroup>
					<Button size="28" className="hidden sm:flex">
						Buy Now
					</Button>
					<IconSlot slot="cross" className="size-4 cursor-pointer sm:size-5" />
				</section>
			</Banner>
		</div>
	)
}

export default BannerExample
