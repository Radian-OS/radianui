"use client"

import { LogOut } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function OnboardingHeader() {
	return (
		<header className="flex h-24 items-center justify-between px-8">
			<Link href="/flow4" className="flex items-center gap-2.5 hover:underline">
				<Image
					src="https://radianos.com/favicon.ico"
					alt="Radian"
					width={32}
					height={32}
					className="rounded-lg"
				/>
				<span className="text-fg text-lg font-semibold">Radian</span>
			</Link>

			<div className="flex items-center gap-1">
				<button className="text-fg-secondary hover:text-fg flex items-center gap-1 text-sm font-medium">
					<LogOut className="size-5" />
					Sign out
				</button>
				<span className="text-fg-tertiary text-sm">(design@radian.com)</span>
			</div>
		</header>
	)
}
