"use client"

import React from "react"
import Image from "next/image"
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
				<Image
					src="https://images.shadcnspace.com/assets/svgs/icon-google.svg"
					alt="Google"
					width={16}
					height={16}
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
				<Image
					src="https://images.shadcnspace.com/assets/svgs/icon-github.svg"
					alt="Github"
					width={16}
					height={16}
					className="size-4 dark:invert"
				/>
				<span>Sign in with Github</span>
			</Button>
		</div>
	)
}
