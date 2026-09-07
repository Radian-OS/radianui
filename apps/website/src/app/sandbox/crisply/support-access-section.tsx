"use client"

import React, { useState } from "react"
import { Button } from "@/styles/default/ui/button"
import { Switch } from "@/styles/default/ui/switch"

export function CrisplySupportAccessSection() {
	const [supportAccess, setSupportAccess] = useState(true)

	return (
		<section className="space-y-6 pt-6">
			{/* Section Heading (Rule 13: heading-3) */}
			<h3 className="heading-3 text-fg text-lg font-bold tracking-tight">
				Support Access
			</h3>

			<div className="space-y-6">
				{/* Support access toggle */}
				<div className="flex items-center justify-between">
					<div>
						<div className="text-fg text-xs font-bold">Support access</div>
						<div className="text-fg-tertiary mt-1 text-xs">
							You have granted us to access to your account for support purposes
							until Aug 31, 2023, 9:40 PM.
						</div>
					</div>

					<Switch
						checked={supportAccess}
						onCheckedChange={setSupportAccess}
						aria-label="Toggle support access"
					/>
				</div>

				{/* Log out of all devices */}
				<div className="border-border/60 flex flex-col gap-3 border-t pt-5 sm:flex-row sm:items-center sm:justify-between">
					<div>
						<div className="text-fg text-xs font-bold">
							Log out of all devices
						</div>
						<div className="text-fg-tertiary mt-1 text-xs">
							Log out of all other active sessions on other devices besides this
							one.
						</div>
					</div>

					<Button
						type="button"
						variant="outline"
						color="neutral"
						size="36"
						className="shrink-0 rounded-lg px-4 text-xs font-semibold">
						<span>Log out</span>
					</Button>
				</div>

				{/* Delete my account */}
				<div className="border-border/60 flex flex-col gap-3 border-t pt-5 sm:flex-row sm:items-center sm:justify-between">
					<div>
						<div className="text-error text-xs font-bold">
							Delete my account
						</div>
						<div className="text-fg-tertiary mt-1 text-xs">
							Permanently delete the account and remove access from all
							workspaces.
						</div>
					</div>

					<Button
						type="button"
						variant="outline"
						color="error"
						size="36"
						className="shrink-0 rounded-lg px-4 text-xs font-semibold">
						<span>Delete Account</span>
					</Button>
				</div>
			</div>
		</section>
	)
}
