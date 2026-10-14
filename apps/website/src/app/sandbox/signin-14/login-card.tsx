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
		<Card className="relative z-10 w-full max-w-md p-6 sm:p-8">
			<CardHeader className="flex flex-col gap-8 p-0">
				<LoginBrand />
				<div className="flex flex-col gap-2">
					<CardTitle className="heading-4">Sign in to Radian UI</CardTitle>
					<CardDescription>Ship Faster and Focus on Growth.</CardDescription>
				</div>
			</CardHeader>
			<CardContent className="p-0">
				<LoginForm />
			</CardContent>
		</Card>
	)
}
