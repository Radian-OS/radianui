"use client"

import { LogOut } from "lucide-react"
import Image from "next/image"

export default function FlowHeader({
	showSignOut = false,
	email = "design@radian.com",
}: {
	showSignOut?: boolean
	email?: string
}) {
	return (
		<header className="fixed left-0 top-0 z-10 flex h-24 w-full items-center justify-between px-8">
			<div className="flex items-center gap-2.5">
				<Image
					src="https://radianos.com/favicon.ico"
					alt="Radian"
					width={32}
					height={32}
					className="rounded-lg"
				/>
				<span className="font-heading text-fg text-lg font-semibold">
					Radian
				</span>
			</div>
			{showSignOut && (
				<div className="flex items-center gap-1">
					<button
						type="button"
						className="text-fg-secondary hover:text-fg flex items-center gap-1 text-sm font-medium transition-colors">
						<LogOut className="size-5" />
						Sign out
					</button>
					<span className="text-fg-tertiary text-sm">({email})</span>
				</div>
			)}
		</header>
	)
}
