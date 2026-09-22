"use client"

import React from "react"
import Link from "next/link"
import { Asterisk } from "lucide-react"

export function LoginBrand() {
	return (
		<Link
			href="#"
			className="flex w-fit items-center gap-2.5 transition-opacity hover:opacity-85">
			<div className="bg-foreground text-background flex size-7 items-center justify-center rounded-full shadow-xs">
				<Asterisk className="size-4.5 stroke-[2.5]" />
			</div>
			<span className="text-foreground text-base font-bold tracking-tight">
				shadcn/studio
			</span>
		</Link>
	)
}
