"use client"

import React from "react"
import Link from "next/link"
import { Asterisk } from "lucide-react"

export function LoginBrand() {
	return (
		<Link
			href="#"
			className="flex w-fit items-center gap-2.5 transition-opacity hover:opacity-85">
			<img src="/logo.svg" alt="Radian Logo" className="size-8" />
			<span className="text-fg text-base font-bold tracking-tight">Radian</span>
		</Link>
	)
}
