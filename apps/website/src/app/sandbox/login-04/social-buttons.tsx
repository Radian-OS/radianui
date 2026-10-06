"use client"

import React from "react"
import { Button } from "@/styles/default/ui/button"

export function SocialButtons() {
	return (
		<div className="flex w-full flex-col items-center justify-center gap-3 sm:flex-row">
			<Button
				type="button"
				variant="outline"
				color="neutral"
				size="36"
				className="w-full flex-1 gap-2 font-medium">
				<img
					src="https://cdn.jsdelivr.net/gh/Radian-os/radian-resources@main/packages/brand-logos/src/dark/colored/technology/icon/google.svg"
					alt="Google"
					className="size-4"
				/>
				<span>Sign in with Google</span>
			</Button>

			<Button
				type="button"
				variant="outline"
				color="neutral"
				size="36"
				className="w-full flex-1 gap-2 font-medium">
				<img
					src="https://cdn.jsdelivr.net/gh/Radian-os/radian-resources@main/packages/brand-logos/src/light/neutral/development/icon/github.svg"
					alt="Github"
					className="block size-4 dark:hidden"
				/>
				<img
					src="https://cdn.jsdelivr.net/gh/Radian-os/radian-resources@main/packages/brand-logos/src/dark/neutral/development/icon/github.svg"
					alt="Github"
					className="hidden size-4 dark:block"
				/>
				<span>Sign in with Github</span>
			</Button>
		</div>
	)
}
