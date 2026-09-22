"use client"

import React from "react"
import Link from "next/link"
import {
	Calendar,
	Facebook,
	Instagram,
	Mail,
	MapPin,
	Phone,
	Twitter,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/styles/default/ui/avatar"
import { Card, CardContent } from "@/styles/default/ui/card"
import { CONTACT_ITEMS, type ContactInfo } from "./types"

export function ProfileSidebar() {
	const renderIcon = (iconName: ContactInfo["iconName"]) => {
		switch (iconName) {
			case "mail":
				return <Mail className="size-4 text-amber-400" />
			case "phone":
				return <Phone className="size-4 text-amber-400" />
			case "calendar":
				return <Calendar className="size-4 text-amber-400" />
			case "map-pin":
				return <MapPin className="size-4 text-amber-400" />
		}
	}

	return (
		<Card className="border-border/80 bg-card flex w-full shrink-0 flex-col items-center rounded-3xl border p-6 shadow-2xl lg:w-72">
			<CardContent className="flex w-full flex-col items-center gap-5 p-0">
				{/* Avatar Container */}
				<div className="border-border/60 bg-elevation-level1/40 flex size-32 items-center justify-center rounded-2xl border p-2 shadow-xs">
					<Avatar size="80" rounded="square" className="size-28 rounded-xl">
						<AvatarImage
							src="/sandbox/placeholder.svg"
							alt="Richard hanrick"
							className="rounded-xl object-cover"
						/>
						<AvatarFallback className="rounded-xl text-lg font-bold">
							RH
						</AvatarFallback>
					</Avatar>
				</div>

				{/* Name & Badge */}
				<div className="flex flex-col items-center gap-2 text-center">
					<h2 className="text-foreground text-xl font-bold tracking-tight">
						Richard hanrick
					</h2>
					<span className="border-border/60 bg-elevation-level1/60 text-fg-secondary rounded-lg border px-3.5 py-1 text-xs font-medium">
						Web developer
					</span>
				</div>

				{/* Divider */}
				<div className="border-border/60 my-1 w-full border-t" />

				{/* Contact Information List */}
				<div className="flex w-full flex-col gap-4">
					{CONTACT_ITEMS.map((item) => (
						<div key={item.label} className="flex items-center gap-3.5">
							<div className="border-border/60 bg-elevation-level1/30 flex size-10 shrink-0 items-center justify-center rounded-xl border shadow-xs">
								{renderIcon(item.iconName)}
							</div>
							<div className="flex min-w-0 flex-col">
								<span className="text-fg-secondary text-[10px] font-semibold tracking-wider">
									{item.label}
								</span>
								{item.href ? (
									<Link
										href={item.href}
										className="text-foreground truncate text-xs font-medium transition-colors hover:text-amber-400">
										{item.value}
									</Link>
								) : (
									<span className="text-foreground truncate text-xs font-medium">
										{item.value}
									</span>
								)}
							</div>
						</div>
					))}
				</div>

				{/* Social Media Links */}
				<div className="text-fg-secondary mt-2 flex items-center justify-center gap-3.5">
					<Link
						href="#"
						aria-label="Facebook"
						className="hover:text-foreground transition-colors">
						<Facebook className="size-4" />
					</Link>
					<Link
						href="#"
						aria-label="Twitter"
						className="hover:text-foreground transition-colors">
						<Twitter className="size-4" />
					</Link>
					<Link
						href="#"
						aria-label="Instagram"
						className="hover:text-foreground transition-colors">
						<Instagram className="size-4" />
					</Link>
				</div>
			</CardContent>
		</Card>
	)
}
