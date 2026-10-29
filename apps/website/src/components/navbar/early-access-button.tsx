"use client"

import React, { ComponentProps, useEffect, useState } from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Badge } from "@/styles/default/ui/badge"
import { Button } from "@/styles/default/ui/button"

function useGithubStars() {
	const [stars, setStars] = useState<number | null>(null)

	useEffect(() => {
		const controller = new AbortController()

		const fetchStars = async () => {
			try {
				const response = await fetch("/api/github-stars", {
					signal: controller.signal,
				})

				if (!response.ok) return

				const data: { stars?: unknown } = await response.json()
				const nextStars = Number(data.stars)

				if (Number.isInteger(nextStars) && nextStars >= 0) {
					setStars(nextStars)
				}
			} catch {
				return
			}
		}

		fetchStars()

		return () => controller.abort()
	}, [])

	return stars
}

const GithubIcon = ({ className }: { className?: string }) => (
	<>
		<img
			src="https://cdn.jsdelivr.net/gh/Radian-os/radian-resources@main/packages/brand-logos/src/dark/neutral/development/icon/github.svg"
			alt="GitHub"
			width={20}
			height={20}
			className={cn("size-5 dark:hidden", className)}
		/>
		<img
			src="https://cdn.jsdelivr.net/gh/Radian-os/radian-resources@main/packages/brand-logos/src/light/neutral/development/icon/github.svg"
			alt="GitHub"
			width={20}
			height={20}
			className={cn("hidden size-5 dark:block", className)}
		/>
	</>
)

type EarlyAccessButtonProps = {
	size?: ComponentProps<typeof Button>["size"]
	variant?: ComponentProps<typeof Button>["variant"]
	className?: string
}

function EarlyAccessButton({
	size,
	variant,
	className,
}: EarlyAccessButtonProps) {
	const stars = useGithubStars()
	return (
		<Button
			size={size ?? "md"}
			variant={variant ?? "smooth"}
			color={"primary"}
			className={cn(className)}
			asChild>
			<Link
				rel="noopener noreferrer"
				target="_blank"
				href={"https://github.com/Radian-os/radianui"}>
				<GithubIcon />
				Github
				{stars !== null && (
					<Badge variant="strong" size="sm" color="primary">
						{stars.toLocaleString("en-US")}
					</Badge>
				)}
			</Link>
		</Button>
	)
}

export default EarlyAccessButton
