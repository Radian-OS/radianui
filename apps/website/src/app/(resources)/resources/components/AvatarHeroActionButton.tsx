"use client"

import { Dices } from "lucide-react"
import Link from "next/link"
import { toast } from "sonner"
import { Button } from "@/registry/ui/button"
import { copyRandomAvatar } from "./avatar-playground-utils"

export default function AvatarHeroActionButtons() {
	const handleCopyRandom = async () => {
		const avatarSrc = await copyRandomAvatar()
		if (avatarSrc) {
			toast.custom(() => (
				<div className="bg-black-inverse text-fg-inverse sm:w-75 flex w-full items-center gap-2 rounded-lg px-3 py-2.5 shadow-[0_16px_24px_-4px_rgba(25,24,27,0.12)]">
					<img
						src={avatarSrc}
						alt=""
						className="size-10 rounded-lg object-cover"
					/>
					<div className="text-fg-inverse space-y-0.5 text-sm">
						<p className="font-semibold">Avatar copied to clipboard</p>
						<p>Paste in Figma to use</p>
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
