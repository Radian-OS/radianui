"use client"

import { Dices } from "lucide-react"
import Link from "next/link"
import { toast } from "sonner"
import {
	copyRandomAvatar,
	randomSolidMapColor,
} from "@/constants/avatar-playground-utils"
import { Button } from "@/registry/ui/button"

export default function AvatarHeroActionButtons() {
	const handleCopyRandom = async () => {
		const tone = randomSolidMapColor()
		const avatarSrc = await copyRandomAvatar(tone)
		if (avatarSrc) {
			toast.custom(() => (
				<div className="bg-black-inverse text-fg-inverse sm:w-78.5 flex w-full items-center gap-2 rounded-[10px] p-2">
					<img
						src={avatarSrc}
						alt=""
						className="size-15 rounded-lg object-cover"
					/>
					<div className="text-fg-inverse space-y-0.5 text-sm">
						<p className="font-medium">Added to Clipboard</p>
						<p className="text-fg-secondary font-normal">
							Avatar has been copied to your clipboard.
						</p>
					</div>
				</div>
			))
		}
	}

	return (
		<>
			<Button
				asChild
				size="40"
				className="bg-elevation-level1/20 dark:hover:bg-fill2/40 hover:bg-fill2/40 w-full backdrop-blur-md sm:w-fit"
				variant="outline"
				color="neutral">
				<Link href="/docs/components/accordion" className="w-full sm:w-fit">
					Explore Resources
				</Link>
			</Button>
			<Button
				variant="glossy"
				className="w-full sm:w-fit"
				size="40"
				onClick={handleCopyRandom}>
				<Dices className="size-5" />
				Copy Random Avatar
			</Button>
		</>
	)
}
