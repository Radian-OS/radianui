"use client"

import { LogOut } from "lucide-react"
import Link from "next/link"
import { Button } from "@/registry/ui/button"
import { Radian } from "../icon/radian"

export default function OnboardingHeader() {
	return (
		<header className="flex h-24 items-center justify-between px-8">
			<Link href="/flow4" className="flex items-center gap-2.5 hover:underline">
				<Radian />
				<span className="text-fg text-lg font-semibold">Radian</span>
			</Link>

			<div className="flex items-center">
				<Button variant="ghost" color="neutral">
					<LogOut className="size-5" />
					Sign out
				</Button>
				<span className="text-fg-tertiary text-sm">(design@radian.com)</span>
			</div>
		</header>
	)
}
