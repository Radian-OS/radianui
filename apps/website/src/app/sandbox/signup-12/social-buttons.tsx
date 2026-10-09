"use client"

import React from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/styles/default/ui/button"
import { Divider } from "@/styles/default/ui/divider"

export function SocialButtons() {
	return (
		<div className="mt-4 flex flex-col gap-4">
			{/* Divider */}
			<div className="relative flex items-center justify-center">
				<div className="absolute inset-0 flex items-center">
					<Divider />
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
					className="w-full">
					<img
						src="https://cdn.jsdelivr.net/gh/Radian-os/radian-resources@main/packages/brand-logos/src/dark/colored/technology/icon/google.svg"
						alt="Google"
						className="size-5 shrink-0"
					/>
					Google
				</Button>

				<Button
					type="button"
					variant="outline"
					color="neutral"
					className="w-full">
					<img
						src="https://cdn.jsdelivr.net/gh/Radian-os/radian-resources@main/packages/brand-logos/src/light/neutral/development/icon/github.svg"
						alt="GitHub"
						className="block size-5 shrink-0 dark:hidden"
					/>
					<img
						src="https://cdn.jsdelivr.net/gh/Radian-os/radian-resources@main/packages/brand-logos/src/dark/neutral/development/icon/github.svg"
						alt="GitHub"
						className="hidden size-5 shrink-0 dark:block"
					/>
					Github
				</Button>
			</div>

			{/* Footer Sign In Link */}
			<div className="text-center text-sm">
				<span className="text-fg-secondary">Already have an account? </span>
				<Link href="#signin" className="text-fg font-semibold hover:underline">
					Sign in
				</Link>
			</div>
		</div>
	)
}
