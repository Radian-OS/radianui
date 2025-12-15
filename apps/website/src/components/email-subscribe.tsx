"use client"

import React from "react"
import { Button } from "@/registry/ui/button"
import { Input } from "@/registry/ui/input"

export const EmailSubscribe = () => {
	return (
		<div className="z-30 flex flex-col gap-3">
			<form className="flex flex-col gap-3 sm:flex-row">
				<Input size="40" className="sm:min-w-70.25 w-full" type="email" required placeholder="Email Address" />
				<Button
					size="40"
					className="border-primary-hover w-full border bg-gradient-to-b from-[#6347EB] to-[#5133CF] shadow-[0px_4px_4px_rgba(24,25,27,0.16),0px_0px_0px_1.5px_#5B3FE0] hover:from-[#6A52F2] hover:to-[#5B3FE0] sm:w-fit">
					Subscribe
				</Button>
			</form>
		</div>
	)
}
