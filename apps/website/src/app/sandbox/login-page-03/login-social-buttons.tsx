"use client"

import React from "react"
import { Button } from "@/styles/default/ui/button"

interface LoginSocialButtonsProps {
	onGoogleLogin?: () => void
	onFacebookLogin?: () => void
}

export function LoginSocialButtons({
	onGoogleLogin,
	onFacebookLogin,
}: LoginSocialButtonsProps) {
	return (
		<div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
			<Button
				type="button"
				variant="outline"
				color="neutral"
				size="36"
				onClick={onGoogleLogin}
				className="w-full gap-2 text-xs font-medium">
				{/* Rule 9: Google logo from Google favicon service */}
				<img
					src="https://www.google.com/s2/favicons?sz=32&domain=google.com"
					alt="Google"
					className="size-4 object-contain"
				/>
				<span>Login with Google</span>
			</Button>

			<Button
				type="button"
				variant="outline"
				color="neutral"
				size="36"
				onClick={onFacebookLogin}
				className="w-full gap-2 text-xs font-medium">
				{/* Rule 9: Facebook logo from Google favicon service */}
				<img
					src="https://www.google.com/s2/favicons?sz=32&domain=facebook.com"
					alt="Facebook"
					className="size-4 object-contain"
				/>
				<span>Login with Facebook</span>
			</Button>
		</div>
	)
}
