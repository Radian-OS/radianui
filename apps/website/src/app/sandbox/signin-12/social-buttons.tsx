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
				className="w-full">
				<img
					src="https://cdn.jsdelivr.net/gh/Radian-os/radian-resources@main/packages/brand-logos/src/dark/colored/technology/icon/google.svg"
					alt="Google"
					className="size-5"
				/>
				Sign in with Google
			</Button>

			<Button
				type="button"
				variant="outline"
				color="neutral"
				className="w-full">
				<img
					src="https://cdn.jsdelivr.net/gh/Radian-os/radian-resources@main/packages/brand-logos/src/light/neutral/development/icon/github.svg"
					alt="Github"
					className="block size-5 dark:hidden"
				/>
				<img
					src="https://cdn.jsdelivr.net/gh/Radian-os/radian-resources@main/packages/brand-logos/src/dark/neutral/development/icon/github.svg"
					alt="Github"
					className="hidden size-5 dark:block"
				/>
				Sign in with Github
			</Button>
		</div>
	)
}
