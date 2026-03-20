"use client"

import { useState } from "react"
import { ChevronDown, LogOut, Plus } from "lucide-react"
import { Button } from "@/registry/ui/button"
import { Divider } from "@/registry/ui/divider"
import { Input } from "@/registry/ui/input"
import { Label } from "@/registry/ui/label"
import { AuthLayout } from "./auth-layout"
import { RadianLogo } from "./radian-logo"

interface InviteStepProps {
	onNext: () => void
}

interface InviteField {
	id: number
	email: string
	role: string
}

export function InviteStep({ onNext }: InviteStepProps) {
	const [fields, setFields] = useState<InviteField[]>([
		{ id: 1, email: "", role: "Member" },
		{ id: 2, email: "", role: "Member" },
		{ id: 3, email: "", role: "Member" },
	])

	const addField = () => {
		setFields((prev) => [
			...prev,
			{ id: Date.now(), email: "", role: "Member" },
		])
	}

	return (
		<AuthLayout
			showHeader
			header={
				<>
					<RadianLogo />
					<div className="flex items-center gap-1">
						<button className="text-fg-secondary hover:text-fg flex items-center gap-1 text-sm font-medium">
							<LogOut className="size-5" />
							Sign out
						</button>
						<span className="text-fg-tertiary text-sm">
							(design@radian.com)
						</span>
					</div>
				</>
			}>
			<div className="flex w-full max-w-[400px] flex-col gap-8">
				<div className="flex flex-col gap-2">
					<h1 className="heading-5">Invite your Team</h1>
					<p className="text-fg-secondary text-sm">
						Add team members you&apos;d like to include in this project.
					</p>
				</div>

				<div className="flex flex-col gap-6">
					<div className="flex flex-col gap-5">
						<div className="flex flex-col gap-4">
							{fields.map((field) => (
								<div key={field.id} className="flex flex-col gap-1.5">
									<Label>Email Address</Label>
									<div className="border-alpha bg-bg shadow-xs flex items-center overflow-hidden rounded-lg border">
										<Input
											type="email"
											placeholder="example@email.com"
											size="36"
											className="flex-1 border-0 shadow-none focus-visible:ring-0"
										/>
										<div className="border-alpha text-fg flex shrink-0 items-center gap-1.5 border-l px-2.5 py-2 text-sm">
											{field.role}
											<ChevronDown className="text-fg-tertiary size-5" />
										</div>
									</div>
								</div>
							))}
						</div>

						<Button
							variant="outline"
							size="36"
							className="w-full border-dashed"
							onClick={addField}>
							<Plus className="size-5" />
							Add more
						</Button>
					</div>

					<Divider />

					<div className="flex gap-3">
						<Button
							variant="outline"
							size="36"
							className="flex-1"
							onClick={onNext}>
							Skip for now
						</Button>
						<Button
							variant="strong"
							color="primary"
							size="36"
							className="flex-1"
							onClick={onNext}>
							Invite
						</Button>
					</div>
				</div>
			</div>
		</AuthLayout>
	)
}
