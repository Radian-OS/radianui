"use client"

import { KeyboardEvent, useRef, useState } from "react"
import { Check, Link2, X } from "lucide-react"
import { Toaster, toast } from "sonner"
import { Badge } from "@/registry/ui/badge"
import { Button } from "@/registry/ui/button"
import { Divider } from "@/registry/ui/divider"
import { Label } from "@/registry/ui/label"
import { Radian } from "../icon/radian"

function isValidEmail(email: string) {
	return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export default function InviteStep({
	onNext,
	onSkip,
}: {
	onNext: () => void
	onSkip: () => void
}) {
	const [emails, setEmails] = useState<string[]>([])
	const [inputValue, setInputValue] = useState("")
	const [error, setError] = useState("")
	const inputRef = useRef<HTMLInputElement>(null)

	function addEmail(raw: string) {
		const email = raw.trim().toLowerCase()
		if (!email) return
		if (!isValidEmail(email)) {
			setError("Please enter a valid email")
			return
		}
		if (emails.includes(email)) {
			setError("Email already added")
			return
		}
		setEmails((prev) => [...prev, email])
		setInputValue("")
		setError("")
	}

	function removeEmail(email: string) {
		setEmails((prev) => prev.filter((e) => e !== email))
	}

	function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
		if (e.key === "Enter" || e.key === ",") {
			e.preventDefault()
			addEmail(inputValue)
		}
		if (e.key === "Backspace" && !inputValue && emails.length > 0) {
			removeEmail(emails[emails.length - 1])
		}
	}

	function handleSubmit(e: React.FormEvent) {
		e.preventDefault()
		if (inputValue.trim()) {
			addEmail(inputValue)
			return
		}
		if (emails.length === 0) {
			setError("Add at least one email to invite")
			return
		}
		onNext()
	}

	return (
		<div className="flex w-full max-w-[480px] flex-col gap-8">
			<Toaster />
			{/* Header */}
			<div className="flex flex-col gap-6">
				<Radian />
				<div className="flex flex-col gap-2">
					<h1 className="heading-5">Invite your Team</h1>
					<p className="text-fg-secondary text-sm">
						You can invite others members to design and build things with you.
					</p>
				</div>
			</div>

			{/* Content */}
			<div className="flex flex-col gap-5">
				{/* Share Link Card */}
				<div className="border-soft bg-fill1 flex items-center gap-3 rounded-[10px] border p-3">
					<div className="border-border bg-bg shadow-xs flex size-9 shrink-0 items-center justify-center rounded-lg border">
						<Link2 className="text-fg-secondary size-5" />
					</div>
					<div className="flex flex-1 flex-col gap-0.5">
						<p className="text-fg text-sm font-medium">
							Anyone with the link can view
						</p>
						<p className="text-fg-tertiary text-wrap text-xs">
							radian.com/workspace/overview
						</p>
					</div>
					<Button
						type="button"
						variant="outline"
						color="neutral"
						size="32"
						onClick={() =>
							toast.custom(() => (
								<div className="bg-black-inverse text-fg-inverse flex min-w-20 items-center gap-2 rounded-lg px-3 py-2.5">
									<Check size={20} className="text-success" />
									<p className="text-sm font-medium">Link copied</p>
								</div>
							))
						}>
						Copy
					</Button>
				</div>

				{/* Divider */}
				<div className="flex items-center gap-2">
					<Divider className="flex-1" />
					<span className="text-fg-tertiary whitespace-nowrap text-sm font-medium">
						Or
					</span>
					<Divider className="flex-1" />
				</div>

				{/* Email Invite Form */}
				<form onSubmit={handleSubmit} className="flex flex-col gap-6">
					<div className="flex flex-col gap-1.5">
						<Label>Invite by email</Label>
						<div
							className="border-border focus-within:ring-primary focus-within:border-border-active flex min-h-9 flex-wrap items-center gap-1 rounded-lg border px-2 py-1.5 focus-within:ring-1"
							onClick={() => inputRef.current?.focus()}>
							{emails.map((email) => (
								<Badge key={email} variant="outline" color="neutral" size="24">
									{email}
									<X
										className="hover:text-fg-secondary text-fg-tertiary size-3! cursor-pointer"
										onClick={(e) => {
											e.stopPropagation()
											removeEmail(email)
										}}
									/>
								</Badge>
							))}
							<input
								ref={inputRef}
								type="text"
								value={inputValue}
								onChange={(e) => {
									setInputValue(e.target.value)
									setError("")
								}}
								onKeyDown={handleKeyDown}
								onBlur={() => {
									if (inputValue.trim()) addEmail(inputValue)
								}}
								placeholder={
									emails.length === 0 ? "e.g. user1example@gmail.com" : ""
								}
								className="text-fg placeholder:text-fg-tertiary min-w-[120px] flex-1 bg-transparent text-sm outline-none"
							/>
						</div>
						{error && <p className="text-error text-xs">{error}</p>}
					</div>

					{/* Actions */}
					<div className="flex gap-3">
						<Button
							type="button"
							variant="outline"
							color="neutral"
							size="36"
							className="flex-1"
							onClick={onSkip}>
							Skip for now
						</Button>
						<Button
							type="submit"
							variant="strong"
							color="primary"
							size="36"
							className="flex-1">
							Invite
						</Button>
					</div>
				</form>
			</div>
		</div>
	)
}
