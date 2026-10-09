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
				className="h-10 w-full text-sm font-medium">
				Sign up with Google
			</Button>

			<Button
				type="button"
				variant="outline"
				color="neutral"
				size="36"
				onClick={onFacebookLogin}
				className="h-10 w-full text-sm font-medium">
				Sign up with Facebook
			</Button>
		</div>
	)
}
