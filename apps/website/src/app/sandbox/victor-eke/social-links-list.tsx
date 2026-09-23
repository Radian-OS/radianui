"use client"

import React from "react"
import Image from "next/image"
import { SOCIAL_LINKS } from "./types"

export function SocialLinksList() {
	return (
		<div className="flex flex-wrap items-center gap-2 pt-2">
			{SOCIAL_LINKS.map((link) => (
				<a
					key={link.name}
					href={link.url}
					target="_blank"
					rel="noopener noreferrer"
					className="group flex items-center gap-2 rounded-full border border-white/10 bg-neutral-900/60 px-3 py-1.5 text-xs font-medium text-neutral-300 transition-colors hover:border-white/20 hover:bg-neutral-800 hover:text-white">
					<Image
						src={`https://www.google.com/s2/favicons?sz=32&domain=${link.domain}`}
						alt={`${link.name} logo`}
						width={14}
						height={14}
						className="size-3.5 rounded-xs object-contain opacity-80 transition-opacity group-hover:opacity-100"
						unoptimized
					/>
					<span>{link.name}</span>
				</a>
			))}
		</div>
	)
}
