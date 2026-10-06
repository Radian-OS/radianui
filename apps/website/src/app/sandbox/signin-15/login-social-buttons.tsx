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
				className="w-full">
				{/* Google logo from Radian resources */}
				<img
					src="https://cdn.jsdelivr.net/gh/Radian-os/radian-resources@main/packages/brand-logos/src/dark/colored/technology/icon/google.svg"
					alt="Google"
					className="size-6 object-contain"
				/>
				<span>Login with Google</span>
			</Button>

			<Button
				type="button"
				variant="outline"
				color="neutral"
				size="36"
				onClick={onFacebookLogin}
				className="w-full">
				{/* Facebook logo from Radian resources */}
				<img
					src="https://cdn.jsdelivr.net/gh/Radian-os/radian-resources@main/packages/brand-logos/src/dark/colored/social-content/icon/facebook.svg"
					alt="Facebook"
					className="size-6 object-contain"
				/>
				<span>Login with Facebook</span>
			</Button>
		</div>
	)
}
