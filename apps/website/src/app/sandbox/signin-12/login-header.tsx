"use client"

import React from "react"
import Link from "next/link"

export function LoginHeader() {
	return (
		<div className="flex flex-col items-center gap-4 text-center">
			<Link
				href="#"
				className="flex shrink-0 items-center justify-center gap-2 transition-transform hover:scale-105"
				aria-label="Home">
				<img src="/logo.svg" alt="Radian Logo" className="block size-10" />
			</Link>
			<div className="flex flex-col gap-1 text-center">
				<h1 className="heading-4 text-center">Welcome to Radian</h1>
				<p className="text-fg-secondary text-base font-normal">
					Login to your account now
				</p>
			</div>
		</div>
	)
}
