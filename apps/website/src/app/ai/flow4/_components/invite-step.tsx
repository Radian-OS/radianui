"use client"

import { useState } from "react"
import { Plus } from "lucide-react"
import { Button } from "@/registry/ui/button"
import { Divider } from "@/registry/ui/divider"
import { Input } from "@/registry/ui/input"
import { Label } from "@/registry/ui/label"
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/registry/ui/select"
import FlowHeader from "./flow-header"

type InviteRow = {
	email: string
	role: string
}

export default function InviteStep({
	onNext,
	onSkip,
}: {
	onNext: () => void
	onSkip: () => void
}) {
	const [invites, setInvites] = useState<InviteRow[]>([
		{ email: "", role: "member" },
		{ email: "", role: "member" },
		{ email: "", role: "member" },
	])

	function addRow() {
		setInvites((prev) => [...prev, { email: "", role: "member" }])
	}

	function updateEmail(index: number, email: string) {
		setInvites((prev) =>
			prev.map((row, i) => (i === index ? { ...row, email } : row))
		)
	}

	function updateRole(index: number, role: string) {
		setInvites((prev) =>
			prev.map((row, i) => (i === index ? { ...row, role } : row))
		)
	}

	return (
		<div className="bg-bg relative flex min-h-screen flex-col items-center justify-center p-4">
			<FlowHeader showSignOut />

			<div className="flex w-full max-w-[400px] flex-col gap-8">
				<div className="flex flex-col gap-2">
					<h2 className="heading-5">Start with your team</h2>
					<p className="text-fg-secondary text-sm">
						You can invite others members to design and build things with you.
					</p>
				</div>

				<div className="flex flex-col gap-6">
					<div className="flex flex-col gap-5">
						<div className="flex flex-col gap-4">
							{invites.map((invite, index) => (
								<div key={index} className="flex flex-col gap-1.5">
									<Label>Email Address</Label>
									<div className="border-border shadow-xs flex items-center gap-0 rounded-lg border">
										<Input
											type="email"
											placeholder="example@email.com"
											value={invite.email}
											onChange={(e) => updateEmail(index, e.target.value)}
											className="flex-1 border-0 shadow-none"
										/>
										<div className="border-border border-l">
											<Select
												value={invite.role}
												onValueChange={(value) => updateRole(index, value)}>
												<SelectTrigger className="min-w-[120px] border-0 shadow-none">
													<SelectValue />
												</SelectTrigger>
												<SelectContent>
													<SelectItem value="owner">Owner</SelectItem>
													<SelectItem value="admin">Admin</SelectItem>
													<SelectItem value="editor">Editor</SelectItem>
													<SelectItem value="viewer">Viewer</SelectItem>
													<SelectItem value="member">Member</SelectItem>
												</SelectContent>
											</Select>
										</div>
									</div>
								</div>
							))}
						</div>

						<Button
							type="button"
							variant="outline"
							color="neutral"
							className="w-full border-dashed"
							onClick={addRow}>
							<Plus className="size-5" />
							Add more
						</Button>
					</div>

					<Divider />

					<div className="flex gap-3">
						<Button
							type="button"
							variant="outline"
							color="neutral"
							onClick={onSkip}
							className="flex-1">
							Skip for now
						</Button>
						<Button
							type="button"
							color="primary"
							onClick={onNext}
							className="flex-1">
							Invite
						</Button>
					</div>
				</div>
			</div>
		</div>
	)
}
