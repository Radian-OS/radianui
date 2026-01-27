"use client"

import React, { ComponentProps, useEffect, useState } from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Badge } from "@/registry/ui/badge"
import { Button } from "@/registry/ui/button"
import { CountingNumber } from "../counting-numbers"

const REPO_NAME = "Radian-os/radianos"
const GITHUB_STARS = 0

// Custom hook to fetch GitHub stars
function useGithubStars(repo = REPO_NAME) {
	const [stars, setStars] = useState<number>(GITHUB_STARS)

	useEffect(() => {
		const fetchStars = async () => {
			try {
				const response = await fetch(`https://api.github.com/repos/${repo}`)
				if (response.ok) {
					const data = await response.json()
					if (data?.stargazers_count) {
						console.log("GitHub stars fetched:", data.stargazers_count)
						setStars(data.stargazers_count)
					}
				}
			} catch (error) {
				console.error("Error fetching GitHub stars:", error)
			}
		}
		fetchStars()
	}, [repo])

	return stars
}

const GithubIcon = () => (
	<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path
			d="M9.96974 1.98486C0.462177 2.18365 -1.51713 14.9411 7.3768 18.0009C7.79168 18.0786 7.94726 17.8193 7.94726 17.6032C7.94726 17.3871 7.94726 16.8945 7.94726 16.2031C5.62222 16.7044 5.12954 15.1054 5.12954 15.1054C4.97362 14.6053 4.64207 14.1786 4.19608 13.904C3.44412 13.394 4.25658 13.4026 4.25658 13.4026C4.52219 13.4377 4.77603 13.5341 4.99803 13.6841C5.22003 13.8341 5.40412 14.0336 5.53578 14.267C5.77157 14.6775 6.15907 14.979 6.61489 15.1066C7.07073 15.2344 7.55847 15.1781 7.97319 14.9498C8.01589 14.5337 8.20234 14.1455 8.50041 13.8521C6.64213 13.6446 4.69738 12.9359 4.69738 9.78973C4.68569 8.97023 4.99604 8.17882 5.56171 7.58571C5.30004 6.87112 5.3311 6.08211 5.64814 5.39031C5.64814 5.39031 6.34825 5.17423 7.94726 6.25464C9.31691 5.88294 10.7609 5.88294 12.1306 6.25464C13.721 5.19152 14.4211 5.39031 14.4211 5.39031C14.7252 6.07954 14.7531 6.85925 14.4988 7.56842C15.0645 8.16154 15.3749 8.9529 15.3632 9.77248C15.3632 12.9272 13.4098 13.6274 11.5515 13.8261C12.4158 14.2842 12.0528 17.2316 12.1047 17.5946C12.1047 17.8107 12.2516 18.07 12.6837 17.9922C21.5517 14.9584 19.4774 2.18365 9.96974 1.98486Z"
			fill="white"
		/>
	</svg>
)

type EarlyAccessButtonProps = {
	size?: ComponentProps<typeof Button>["size"]
	variant?: ComponentProps<typeof Button>["variant"]
	className?: string
}

function EarlyAccessButton({ size, variant, className }: EarlyAccessButtonProps) {
	const stars = useGithubStars()
	return (
		<Button size={size ?? "36"} variant={variant ?? "smooth"} color={"primary"} className={cn(className)} asChild>
			<Link rel="noopener noreferrer" target="_blank" href={"https://github.com/Radian-os/radianos"}>
				<GithubIcon />
				Github
				<Badge variant="strong" size="20" color="primary">
					<CountingNumber from={0} to={stars} duration={1} />
				</Badge>
			</Link>
		</Button>
	)
}

export default EarlyAccessButton
