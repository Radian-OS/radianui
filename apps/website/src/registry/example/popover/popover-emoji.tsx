"use client"

import React from "react"
import { EmojiPicker } from "frimousse"
import Image from "next/image"
import { IconSlot } from "@/registry/icon/icon-library"
import {
	Avatar,
	AvatarFallback,
	AvatarImage,
	AvatarIndicator,
	AvatarStatus,
} from "@/registry/ui/avatar"
import { Button } from "@/registry/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/registry/ui/popover"

export default function PopoverEmoji() {
	const [selectedEmoji, setSelectedEmoji] = React.useState<string[]>([])
	const [open, setOpen] = React.useState(false)
	return (
		<div className="flex gap-2.5">
			<div>
				<Avatar size="36">
					<AvatarImage src="/media/male-1.jpg" />
					<AvatarFallback>JJ</AvatarFallback>
					<AvatarIndicator className="bottom-1.5 right-1.5">
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
					alt="background"
					className="rounded-md"
				/>
				<div className="max-w-75 flex flex-wrap gap-1.5">
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
								<IconSlot slot="smile-plus" />
							</Button>
						</PopoverTrigger>
						<PopoverContent
							className="w-fit overflow-clip rounded-lg p-0"
							align="start">
							<EmojiPicker.Root
								onEmojiSelect={(emoji) =>
									setSelectedEmoji((prev) => {
										setOpen(false)
										if (!prev.includes(emoji.emoji))
											return [...prev, emoji.emoji]
										return prev.filter((e) => e !== emoji.emoji)
									})
								}
								className="bg-elevation-level1 isolate flex h-[368px] flex-col">
								<div className="flex items-center gap-2 px-3 py-2.5">
									<IconSlot slot="search" className="size-4 shrink-0" />
									<EmojiPicker.Search
										placeholder="Search"
										className="placeholder:text-fg-tertiary z-10 w-full appearance-none text-sm font-normal focus:outline-0"
									/>
								</div>
								<EmojiPicker.Viewport className="outline-hidden relative flex-1">
									<EmojiPicker.Loading className="text-fg-tertiary absolute inset-0 flex items-center justify-center text-sm">
										Loading…
									</EmojiPicker.Loading>
									<EmojiPicker.Empty className="text-fg-secondary absolute inset-0 flex items-center justify-center text-sm">
										No emoji found.
									</EmojiPicker.Empty>
									<EmojiPicker.List
										className="select-none pb-1.5"
										components={{
											CategoryHeader: ({ category, ...props }) => (
												<div
													className="bg-elevation-level1 text-fg-tertiary px-2 py-1.5 text-xs font-normal"
													{...props}>
													{category.label}
												</div>
											),
											Row: ({ children, ...props }) => (
												<div className="scroll-my-1.5 px-1.5" {...props}>
													{children}
												</div>
											),
											Emoji: ({ emoji, ...props }) => (
												<button
													className="data-[active]:bg-fill3 flex size-8 cursor-pointer items-center justify-center rounded-md text-lg"
													{...props}>
													{emoji.emoji}
												</button>
											),
										}}
									/>
								</EmojiPicker.Viewport>
							</EmojiPicker.Root>
						</PopoverContent>
					</Popover>
				</div>
			</div>
		</div>
	)
}
