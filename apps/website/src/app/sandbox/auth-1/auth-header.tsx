"use client"

import React from "react"
import Image from "next/image"

export function AuthHeader() {
	return (
		<div className="mb-6 flex flex-col items-center text-center">
			{/* ReUI Squircle Logo Badge */}
			<div className="mb-3.5 flex items-center justify-center">
				<Image
					src="/sandbox/reui-logo.png"
					alt="ReUI Logo"
					width={42}
					height={42}
					priority
					className="size-10 rounded-xl object-cover shadow-xs"
				/>
			</div>

			{/* Heading & Subtitle */}
			<h1 className="text-fg text-2xl font-semibold tracking-tight">Sign up</h1>
			<p className="text-fg-secondary mt-1 text-sm font-normal">
				Create your account to get started.
			</p>
		</div>
	)
}
