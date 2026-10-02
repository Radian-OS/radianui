"use client"

import React from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { Button } from "@/styles/default/ui/button"
import { AnnouncementBadge } from "./announcement-badge"
import { SocialProof } from "./social-proof"

interface HeroContentProps {
	badgeText?: string
	title?: string
	description?: string
}

export function HeroContent({
	badgeText = "Announcing API 1.0",
	title = "Transforming Business with Intelligent AI",
	description = "Seamlessly integrate powerful insights into your workflow and transform complex data into clear, confident decisions.",
}: HeroContentProps) {
	return (
		<div className="flex max-w-xl flex-col gap-8 md:gap-10">
			{/* Top Announcement Badge */}
			<AnnouncementBadge text={badgeText} />

			{/* Heading & Subtitle */}
			<div className="flex flex-col gap-4 sm:gap-5">
				<h1 className="text-fg text-3xl font-medium sm:text-4xl md:text-5xl">
					{title}
				</h1>
				<p className="text-fg-secondary text-base font-normal">{description}</p>
			</div>

			{/* Action CTA Buttons */}
			<div className="flex flex-wrap items-center gap-3.5">
				<Button
					variant="strong"
					color="neutral"
					size="44"
					asChild
					className="gap-2 rounded-full px-6 font-medium shadow-xs transition-transform active:scale-95">
					<Link href="#get-started">
						<span>Get Started</span>
						<ChevronRight className="size-4" />
					</Link>
				</Button>

				<Button
					variant="outline"
					color="neutral"
					size="44"
					asChild
					className="gap-2.5 rounded-full px-5 font-medium transition-transform active:scale-95">
					<Link href="#google-signin">
						<Image
							src="https://www.google.com/s2/favicons?sz=32&domain=google.com"
							alt="Google"
							width={16}
							height={16}
							className="rounded-xs"
						/>
						<span>Sign In with Google</span>
					</Link>
				</Button>
			</div>

			{/* Social Proof & Ratings */}
			<SocialProof />
		</div>
	)
}
