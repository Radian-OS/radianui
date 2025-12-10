"use client"

import React from "react"
import { Divider } from "@/registry/ui/divider"

export default function MiniFooter() {
	const currentYear = new Date().getFullYear()

	return (
		<>
			<Divider className="via-border bg-gradient-to-r from-transparent to-transparent" />
			<div className="h-13 flex items-center justify-center">
				<p className="text-fg-secondary text-center text-sm font-medium">© Copyright Radian OS {currentYear}. All rights reserved.</p>
			</div>
		</>
	)
}
