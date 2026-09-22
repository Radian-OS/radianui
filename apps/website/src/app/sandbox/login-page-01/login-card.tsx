"use client"

import React from "react"
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/styles/default/ui/card"
import { LoginBrand } from "./login-brand"
import { LoginForm } from "./login-form"

export function LoginCard() {
	return (
		<Card className="border-border/80 bg-card/95 relative z-10 w-full max-w-md p-6 shadow-2xl backdrop-blur-xs sm:p-8">
			<CardHeader className="flex flex-col gap-4 p-0">
				<LoginBrand />
				<div className="flex flex-col gap-1.5">
					<CardTitle className="heading-5 text-fg">
						Sign in to Shadcn Studio
					</CardTitle>
					<CardDescription className="text-fg-secondary text-xs sm:text-sm">
						Ship Faster and Focus on Growth.
					</CardDescription>
				</div>
			</CardHeader>
			<CardContent className="p-0 pt-6">
				<LoginForm />
			</CardContent>
		</Card>
	)
}
