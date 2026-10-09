"use client"

import React from "react"
import Image from "next/image"

export function AuthHeader() {
	return (
		<div className="mb-6 flex flex-col items-center text-center">
			{/* ReUI Squircle Logo Badge */}
			<div className="mb-3.5 flex items-center justify-center">
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
			<div className="flex flex-col gap-1">
				<h1 className="heading-4">Sign up</h1>
				<p className="text-fg-secondary text-sm font-normal">
					Create your account to get started.
				</p>
			</div>
		</div>
	)
}
