"use client"

import React from "react"
import { Button } from "@/styles/default/ui/button"

interface LoginMagicButtonsProps {
	onSelectRole?: (role: "user" | "admin") => void
}

export function LoginMagicButtons({ onSelectRole }: LoginMagicButtonsProps) {
	return (
		<div className="flex flex-col gap-2.5">
			<p className="text-fg-secondary text-xs sm:text-sm">
				Login with <span className="text-fg font-semibold">Magic Link</span>
			</p>
			<div className="grid grid-cols-2 gap-3">
				<Button
					type="button"
					variant="outline"
					color="neutral"
					size="36"
					onClick={() => onSelectRole?.("user")}
					className="w-full text-xs font-medium">
					Login as User
				</Button>
				<Button
					type="button"
					variant="outline"
					color="neutral"
					size="36"
					onClick={() => onSelectRole?.("admin")}
					className="w-full text-xs font-medium">
					Login as Admin
				</Button>
			</div>
		</div>
	)
}
