"use client"

import { Link2 } from "lucide-react"
import { Button } from "@/registry/ui/button"
import { Divider } from "@/registry/ui/divider"
import { Input } from "@/registry/ui/input"
import { Label } from "@/registry/ui/label"
import { AuthLayout } from "./auth-layout"
import { RadianLogo } from "./radian-logo"

export function InviteStep({ onNext }: { onNext: () => void }) {
	return (
		<AuthLayout>
			<div className="flex w-full max-w-[480px] flex-col gap-8">
				<div className="flex flex-col gap-6">
					<RadianLogo />
					<div className="flex flex-col gap-2">
						<h2 className="heading-5">Invite your Team</h2>
						<p className="text-fg-secondary text-sm tracking-[-0.14px]">
							You can invite others members to design and build things with you.
						</p>
					</div>
				</div>

				<div className="flex flex-col gap-5">
					<div className="flex flex-col gap-6">
						<div className="border-soft bg-fill1 flex items-center gap-3 rounded-[10px] border p-3">
							<div className="border-border bg-bg shadow-xs flex size-9 shrink-0 items-center justify-center rounded-lg border">
								<Link2 className="text-fg size-5" />
							</div>
							<div className="flex flex-1 flex-col gap-0.5">
								<p className="text-fg text-sm font-medium tracking-[-0.14px]">
									Anyone with the link can view
								</p>
								<p className="text-fg-tertiary text-xs tracking-[-0.12px]">
									radian.com/workspace/overview
								</p>
							</div>
							<Button variant="outline" size="28">
								Copy
							</Button>
						</div>

						<div className="flex items-center gap-2">
							<Divider className="flex-1" />
							<span className="text-fg-tertiary text-sm font-medium tracking-[-0.14px]">
								Or
							</span>
							<Divider className="flex-1" />
						</div>

						<div className="flex flex-col gap-1.5">
							<Label>Invite by email</Label>
							<Input placeholder="e.g. user1example@gmail.com" type="email" />
						</div>
					</div>

					<div className="flex gap-3">
						<Button variant="outline" onClick={onNext} className="flex-1">
							Skip for now
						</Button>
						<Button onClick={onNext} className="flex-1">
							Invite
						</Button>
					</div>
				</div>
			</div>
		</AuthLayout>
	)
}
