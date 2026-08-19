"use client"

import { Dices } from "lucide-react"
import Link from "next/link"
import { toast } from "sonner"
import {
	copyRandomAvatar,
	randomSolidMapColor,
} from "@/constants/avatar-playground-utils"
import { Button } from "@/registry/ui/button"
import { showCopiedToast } from "./CopiedToast"

export default function AvatarHeroActionButtons() {
	const handleCopyRandom = async () => {
		const tone = randomSolidMapColor()
		const result = await copyRandomAvatar(tone)
		if (result) {
			showCopiedToast({
				src: result.src,
				index: result.index,
				tone,
				description: "Avatar has been copied to your clipboard.",
			})
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
				<Link
					href="/docs/getting-started/resources"
					className="w-full sm:w-fit">
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
