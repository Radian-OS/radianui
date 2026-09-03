"use client"

import React from "react"
import data, { Skin } from "@emoji-mart/data"
import Picker from "@emoji-mart/react"
import { SmilePlus } from "lucide-react"
import Image from "next/image"
import {
	Avatar,
	AvatarFallback,
	AvatarImage,
	AvatarIndicator,
	AvatarStatus,
} from "@/registry/ui/avatar"
import { Button } from "@/registry/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/registry/ui/popover"

export default function PopoverEmoji2() {
	const [selectedEmoji, setSelectedEmoji] = React.useState<string[]>([])
	const [open, setOpen] = React.useState(false)
	return (
		<div className="flex gap-2.5">
			<div>
				<Avatar size="36">
					<AvatarImage src="/media/male-1.jpg" />
					<AvatarFallback>JJ</AvatarFallback>
					<AvatarIndicator className="right-1.5 bottom-1.5">
						<AvatarStatus variant={"online"} />
					</AvatarIndicator>
				</Avatar>
			</div>
			<div className="flex flex-col gap-2">
				<div className="flex flex-col gap-0.5">
					<div className="flex items-center gap-1.5">
						<span className="font-medium">John Jacks</span>
						<span className="text-fg-tertiary text-xs">
							11/10/2025 11:24 PM
						</span>
					</div>
					<p className="text-fg-tertiary text-xs font-normal">
						radian_profile_1146.jpg
					</p>
				</div>
				<Image
					height={170}
					width={300}
					src="/media/background-2.jpg"
					alt="Background2"
					className="rounded-md"
				/>
				<div className="flex max-w-75 flex-wrap gap-1.5">
					{selectedEmoji.map((emoji) => (
						<Button
							variant="outline"
							color="neutral"
							size="28"
							key={emoji}
							onClick={() =>
								setSelectedEmoji((prev) => prev.filter((e) => e !== emoji))
							}>
							{emoji}
						</Button>
					))}
					<Popover open={open} onOpenChange={setOpen}>
						<PopoverTrigger asChild>
							<Button variant="outline" color="neutral" size="28">
								<SmilePlus />
							</Button>
						</PopoverTrigger>
						<PopoverContent
							className="w-fit overflow-clip rounded-lg p-0"
							align="start">
							<div className="[--rgb-background:var(--color-elevation-level1)]! [--rgb-color:var(--color-fg)]! [--rgb-input:var(--color-elevation-level1)]!">
								<Picker
									data={data}
									onEmojiSelect={(emoji: Skin) => {
										if (!selectedEmoji.includes(emoji.native))
											setSelectedEmoji((prev) => [...prev, emoji.native])
										else
											setSelectedEmoji((prev) =>
												prev.filter((e) => e !== emoji.native)
											)

										setOpen(false)
									}}
									previewPosition="none"
									skinTonePosition="none"
								/>
							</div>
						</PopoverContent>
					</Popover>
				</div>
			</div>
		</div>
	)
}
