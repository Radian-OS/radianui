"use client"

import React from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/styles/default/ui/button"

export function SocialButtons() {
	return (
		<div className="mt-4 flex flex-col gap-4">
			{/* Divider */}
			<div className="relative flex items-center justify-center">
				<div className="border-border absolute inset-0 flex items-center">
					<span className="border-border w-full border-t" />
				</div>
				<span className="bg-bg text-fg-tertiary relative px-3 text-xs font-normal">
					Or continue with
				</span>
			</div>

			{/* Social Button Grid (Google & Github) with size 36 */}
			<div className="grid grid-cols-2 gap-3">
				<Button
					type="button"
					variant="outline"
					color="neutral"
					size="36"
					className="h-9 w-full cursor-pointer gap-2.5 rounded-xl">
					<Image
						src="https://authjs.dev/img/providers/google.svg"
						alt="Google"
						width={16}
						height={16}
						className="size-4 shrink-0"
					/>
					<span className="text-sm font-medium">Google</span>
				</Button>

				<Button
					type="button"
					variant="outline"
					color="neutral"
					size="36"
					className="h-9 w-full cursor-pointer gap-2.5 rounded-xl">
					<Image
						src="https://authjs.dev/img/providers/github.svg"
						alt="Github"
						width={16}
						height={16}
						className="size-4 shrink-0 dark:invert"
					/>
					<span className="text-sm font-medium">Github</span>
				</Button>
			</div>

			{/* Footer Sign In Link */}
			<div className="text-center text-sm">
				<span className="text-fg-secondary">Already have an account? </span>
				<Link
					href="#signin"
					className="text-fg hover:text-primary font-semibold transition-colors">
					Sign in
				</Link>
			</div>
		</div>
	)
}
