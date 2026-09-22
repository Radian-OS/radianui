"use client"

import React from "react"
import { ShieldAlert, X } from "lucide-react"
import { Button, IconButton } from "@/styles/default/ui/button"

interface SettingsBannerProps {
	onDismiss: () => void
	onSetupMfa?: () => void
}

export function SettingsBanner({ onDismiss, onSetupMfa }: SettingsBannerProps) {
	return (
		<div className="border-border/80 bg-elevation-level1/40 flex flex-col gap-4 rounded-xl border p-4 sm:flex-row sm:items-center sm:justify-between">
			<div className="flex items-start gap-3">
				<div className="border-border/60 bg-elevation-level2 text-fg flex size-9 shrink-0 items-center justify-center rounded-lg border">
					<ShieldAlert className="size-4.5" />
				</div>
				<div className="flex flex-col gap-0.5">
					<span className="text-fg text-sm font-semibold">
						Secure your account
					</span>
					<p className="text-fg-secondary text-xs">
						Add multi-factor authentication (MFA) to your account to improve its
						security.
					</p>
				</div>
			</div>

			<div className="flex items-center gap-2 self-end sm:self-center">
				<Button variant="strong" color="neutral" size="32" onClick={onSetupMfa}>
					Set up MFA
				</Button>
				<IconButton
					variant="ghost"
					color="neutral"
					size="28"
					aria-label="Dismiss banner"
					onClick={onDismiss}>
					<X className="text-fg-secondary size-4" />
				</IconButton>
			</div>
		</div>
	)
}
