"use client"

import React, { useEffect, useState } from "react"
import { User, X } from "lucide-react"
import { Button, CompactButton, IconButton, LinkButton } from "@/registry/ui/button"

function LoadingButtonExample() {
	useEffect(() => {
		// Automatically toggle button state every 4 seconds
		const interval = setInterval(() => {
			setLoading((prev) => !prev)
		}, 1000)

		// Cleanup interval on component unmount
		return () => clearInterval(interval)
	}, [])
	const [loading, setLoading] = useState(false)
	return (
		<div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
			<Button loading={loading}>Loading</Button>
			<IconButton loading={loading}>
				<User />
			</IconButton>
			<LinkButton href="#" loading={loading}>
				Loading
			</LinkButton>
			<CompactButton loading={loading}>
				<X />
			</CompactButton>
		</div>
	)
}
export default LoadingButtonExample
