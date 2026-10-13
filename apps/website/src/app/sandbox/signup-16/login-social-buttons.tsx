"use client"

import React from "react"
import Image from "next/image"
import { Button } from "@/styles/default/ui/button"

interface LoginSocialButtonsProps {
	onGoogleLogin?: () => void
	onGithubLogin?: () => void
	className?: string
}

export function LoginSocialButtons({
	onGoogleLogin,
	onGithubLogin,
	className = "",
}: LoginSocialButtonsProps) {
	return (
		<div
			className={`grid w-full grid-cols-1 gap-3 sm:grid-cols-2 ${className}`}>
			{/* Google Button */}
			<Button
				type="button"
				variant="outline"
				color="neutral"
				onClick={onGoogleLogin}
				className="w-full justify-center gap-2 px-2 text-xs font-medium sm:px-3 sm:text-sm">
				<Image
					src="https://cdn.jsdelivr.net/gh/Radian-os/radian-resources@main/packages/brand-logos/src/dark/colored/technology/icon/google.svg"
					alt="Google"
					width={18}
					height={18}
					className="size-4.5 shrink-0"
					unoptimized
				/>
				<span className="truncate">Continue with Google</span>
			</Button>

			{/* GitHub Button */}
			<Button
				type="button"
				variant="outline"
				color="neutral"
				onClick={onGithubLogin}
				className="w-full justify-center gap-2 px-2 text-xs font-medium sm:px-3 sm:text-sm">
				<Image
					src="https://cdn.jsdelivr.net/gh/Radian-os/radian-resources@main/packages/brand-logos/src/light/neutral/development/icon/github.svg"
					alt="GitHub"
					width={18}
					height={18}
					className="block size-4.5 shrink-0 dark:hidden"
					unoptimized
				/>
				<Image
					src="https://cdn.jsdelivr.net/gh/Radian-os/radian-resources@main/packages/brand-logos/src/dark/neutral/development/icon/github.svg"
					alt="GitHub"
					width={18}
					height={18}
					className="hidden size-4.5 shrink-0 dark:block"
					unoptimized
				/>
				<span className="truncate">Continue with GitHub</span>
			</Button>
		</div>
	)
}
