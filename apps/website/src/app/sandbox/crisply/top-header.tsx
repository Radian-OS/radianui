"use client"

import React from "react"
import { ChevronDown, HelpCircle, Search } from "lucide-react"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/styles/default/ui/avatar"

export function CrisplyTopHeader() {
	return (
		<header className="border-border/70 bg-bg flex h-14 w-full items-center justify-between border-b px-6">
			{/* Left: Search Box */}
			<div className="flex w-full max-w-md items-center">
				<div className="relative flex w-full items-center">
					<Search className="text-fg-tertiary absolute left-3 size-4" />
					<input
						type="text"
						placeholder="Search"
						className="border-border/80 bg-fill1/40 text-fg placeholder:text-fg-tertiary focus:border-primary focus:bg-bg focus:ring-primary h-9 w-full rounded-lg border pr-14 pl-9 text-xs focus:ring-1 focus:outline-hidden"
					/>
					<div className="border-border bg-bg text-fg-tertiary absolute right-2.5 flex items-center gap-0.5 rounded-sm border px-1.5 py-0.5 font-mono text-[10px] shadow-2xs">
						<span>⌘</span>
						<span>F</span>
					</div>
				</div>
			</div>

			{/* Right: Help Center & User Profile */}
			<div className="flex items-center gap-5">
				<Link
					href="#help"
					className="text-fg-secondary hover:text-fg flex items-center gap-1.5 text-xs font-medium transition-colors">
					<HelpCircle className="text-fg-tertiary size-4" />
					<span>Help Center</span>
				</Link>

				{/* User Profile Badge */}
				<button
					type="button"
					className="hover:bg-fill2 flex cursor-pointer items-center gap-2 rounded-full p-1 transition-colors">
					<Avatar size="32" rounded="circle" className="border-border border">
						<AvatarImage src="/sandbox/placeholder.svg" alt="Brian Frederin" />
						<AvatarFallback className="text-[11px] font-semibold">
							BF
						</AvatarFallback>
					</Avatar>
					<span className="text-fg text-xs font-semibold">Brian F.</span>
					<ChevronDown className="text-fg-tertiary size-3.5" />
				</button>
			</div>
		</header>
	)
}
