"use client"

import React from "react"
import { Button } from "@/styles/default/ui/button"

interface LoginSocialButtonsProps {
	onGoogleLogin?: () => void
	onAppleLogin?: () => void
}

export function LoginSocialButtons({
	onGoogleLogin,
	onAppleLogin,
}: LoginSocialButtonsProps) {
	return (
		<div className="grid w-full grid-cols-2 gap-3">
			<Button
				type="button"
				variant="outline"
				color="neutral"
				onClick={onGoogleLogin}
				className="h-10 w-full cursor-pointer justify-center gap-2 border-neutral-200 bg-white text-sm font-medium text-neutral-900 shadow-xs hover:bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900 dark:text-white dark:hover:bg-neutral-800">
				<svg
					width="18"
					height="18"
					viewBox="0 0 24 24"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
					className="shrink-0">
					<path
						d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
						fill="#4285F4"
					/>
					<path
						d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
						fill="#34A853"
					/>
					<path
						d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
						fill="#FBBC05"
					/>
					<path
						d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
						fill="#EA4335"
					/>
				</svg>
				<span>Google</span>
			</Button>

			<Button
				type="button"
				variant="outline"
				color="neutral"
				onClick={onAppleLogin}
				className="h-10 w-full cursor-pointer justify-center gap-2 border-neutral-200 bg-white text-sm font-medium text-neutral-900 shadow-xs hover:bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900 dark:text-white dark:hover:bg-neutral-800">
				<svg
					width="18"
					height="18"
					viewBox="0 0 24 24"
					fill="currentColor"
					xmlns="http://www.w3.org/2000/svg"
					className="shrink-0 text-black dark:text-white">
					<path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.61-.75 1.04-1.8 0.92-2.87-.94.04-2.04.64-2.68 1.39-.56.65-.98 1.71-.85 2.72 1.05.08 2.07-.56 2.61-1.24z" />
				</svg>
				<span>Apple</span>
			</Button>
		</div>
	)
}
