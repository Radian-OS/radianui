"use client"

import React from "react"
import Link from "next/link"
import { BadgeCheck, Briefcase, Lightbulb, Mail, MapPin } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/styles/default/ui/avatar"

export function HeroProfile() {
	return (
		<div className="flex flex-col gap-6 pt-4 pb-2">
			{/* Top Profile Info: Avatar + Name + Subtitle */}
			<div className="flex items-center gap-5">
				{/* Avatar with Nepal Flag Badge */}
				<div className="relative">
					<Avatar
						size="80"
						rounded="circle"
						className="border-border/80 size-20 border-2 shadow-md">
						<AvatarImage
							src="/sandbox/placeholder.svg"
							alt="Kishor K. Khadka"
						/>
						<AvatarFallback className="text-base font-bold">KK</AvatarFallback>
					</Avatar>
					<span
						role="img"
						aria-label="Nepal Flag"
						className="absolute -top-1 -left-1 text-xl select-none">
						🇳🇵
					</span>
				</div>

				{/* Name, Verified Badge, and Tagline */}
				<div className="flex flex-col gap-1">
					<div className="flex items-center gap-1.5">
						<h1 className="text-foreground text-xl font-bold tracking-tight sm:text-2xl">
							Kishor K. Khadka
						</h1>
						<BadgeCheck className="text-background size-5 fill-blue-500" />
					</div>
					<p className="text-fg-secondary text-xs sm:text-sm">
						Building things that work
					</p>
				</div>
			</div>

			{/* Meta details list */}
			<div className="text-fg-secondary flex flex-col gap-2.5 pt-1 text-xs">
				<div className="flex items-center gap-2.5">
					<Briefcase className="text-fg-tertiary size-3.5" />
					<span>Product Designer</span>
				</div>
				<div className="flex items-center gap-2.5">
					<Lightbulb className="text-fg-tertiary size-3.5" />
					<span>Independent Builder</span>
				</div>
				<div className="flex items-center gap-2.5">
					<MapPin className="text-fg-tertiary size-3.5" />
					<span>Kathmandu, Nepal</span>
				</div>
				<div className="flex items-center gap-2.5">
					<Mail className="text-fg-tertiary size-3.5" />
					<Link
						href="mailto:imkishor24@gmail.com"
						className="hover:text-foreground transition-colors">
						imkishor24@gmail.com
					</Link>
				</div>
			</div>
		</div>
	)
}
