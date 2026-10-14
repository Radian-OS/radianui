"use client"

import React from "react"
import Image from "next/image"

export function AuthHeader() {
	return (
		<div className="flex flex-col items-center gap-3 text-center">
			<div className="flex items-center justify-center">
				<Image
					src="/logo.svg"
					alt="Radian UI Logo"
					width={42}
					height={42}
					priority
					className="size-10 rounded-xl object-cover shadow-xs"
				/>
			</div>

			{/* Heading & Subtitle */}
			<div className="flex flex-col gap-2">
				<h1 className="heading-4">Sign up</h1>
				<p className="text-fg-secondary text-sm font-normal">
					Create your account to get started.
				</p>
			</div>
		</div>
	)
}
