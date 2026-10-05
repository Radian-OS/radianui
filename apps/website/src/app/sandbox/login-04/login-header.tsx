"use client"

import React from "react"
import Image from "next/image"
import Link from "next/link"

export function LoginHeader() {
	return (
		<div className="flex flex-col items-center gap-4 text-center">
			<Link
				href="#"
				className="flex shrink-0 items-center justify-center transition-transform hover:scale-105"
				aria-label="Home">
				<Image
					src="https://images.shadcnspace.com/assets/logo/logo-icon-black.svg"
					alt="Shadcn Space Logo"
					width={40}
					height={40}
					className="block size-10 dark:hidden"
					priority
				/>
				<Image
					src="https://images.shadcnspace.com/assets/logo/logo-icon-white.svg"
					alt="Shadcn Space Logo"
					width={40}
					height={40}
					className="hidden size-10 dark:block"
					priority
				/>
			</Link>
			<div className="flex flex-col gap-1 text-center">
				<h1 className="heading-4 text-center">Welcome to Shadcn Space</h1>
				<p className="text-fg-secondary text-base font-normal">
					Login to your account now
				</p>
			</div>
		</div>
	)
}
