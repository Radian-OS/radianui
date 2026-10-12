"use client"

import React from "react"
import Link from "next/link"

export function LoginBrand() {
	return (
		<Link href="#" className="flex w-fit items-center gap-2">
			<img src="/logo.svg" alt="Radian" className="size-8 shrink-0" />
			<h1 className="heading-6">Radian</h1>
		</Link>
	)
}
