"use client"

import React from "react"
import { Button } from "@/registry/ui/button"

export function SocialLogin() {
	return (
		<div className="flex w-full flex-col gap-3">
			{/* Divider */}
			<div className="my-1 flex w-full items-center gap-4">
				<div className="bg-border h-px flex-1" />
				<p className="text-fg-secondary shrink-0 text-sm whitespace-nowrap">
					Or continue with
				</p>
				<div className="bg-bg h-px flex-1" />
			</div>

			{/* Social Buttons */}
			<div className="flex w-full flex-col gap-3">
				<Button
					type="button"
					variant="outline"
					color="neutral"
					size="36"
					className="w-full">
					<img
						src="https://images.shadcnspace.com/assets/svgs/icon-google.svg"
						alt="Google"
						width={16}
						height={16}
						className="size-4 shrink-0"
					/>
					<span>Continue with Google</span>
				</Button>

				<Button
					type="button"
					variant="outline"
					color="neutral"
					size="36"
					className="w-full">
					<img
						src="https://images.shadcnspace.com/assets/svgs/auth/apple-light.svg"
						alt="Apple"
						width={16}
						height={16}
						className="block size-4 shrink-0 dark:hidden"
					/>
					<img
						src="https://images.shadcnspace.com/assets/svgs/auth/apple-dark.svg"
						alt="Apple"
						width={16}
						height={16}
						className="hidden size-4 shrink-0 dark:block"
					/>
					<span>Continue with Apple</span>
				</Button>

				<Button
					type="button"
					variant="outline"
					color="neutral"
					size="36"
					className="w-full">
					<img
						src="https://images.shadcnspace.com/assets/svgs/icon-github.svg"
						alt="GitHub"
						width={16}
						height={16}
						className="block size-4 shrink-0 dark:hidden"
					/>
					<img
						src="https://images.shadcnspace.com/assets/svgs/icon-github-white.svg"
						alt="GitHub"
						width={16}
						height={16}
						className="hidden size-4 shrink-0 dark:block"
					/>
					<span>Continue with Github</span>
				</Button>
			</div>
		</div>
	)
}
