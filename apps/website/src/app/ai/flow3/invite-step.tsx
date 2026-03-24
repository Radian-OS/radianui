"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Copy, Link2 } from "lucide-react"
import Image from "next/image"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/registry/ui/button"
import { Divider } from "@/registry/ui/divider"
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/registry/ui/form"
import { Input } from "@/registry/ui/input"

const inviteSchema = z.object({
	email: z.string().email("Please enter a valid email").or(z.literal("")),
})

type InviteFormValues = z.infer<typeof inviteSchema>

export default function InviteStep({
	onNext,
	onSkip,
}: {
	onNext: () => void
	onSkip: () => void
}) {
	const form = useForm<InviteFormValues>({
		resolver: zodResolver(inviteSchema),
		defaultValues: { email: "" },
	})

	function onSubmit() {
		onNext()
	}

	return (
		<div className="flex w-full max-w-[480px] flex-col gap-8">
			{/* Header */}
			<div className="flex flex-col gap-6">
				<Image
					src="https://radianos.com/favicon.ico"
					alt="Radian Logo"
					width={32}
					height={32}
					className="rounded-lg"
				/>
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
				<div className="border-soft flex items-center gap-3 rounded-[10px] border bg-[#fafafa] p-3">
					<div className="border-alpha shadow-xs flex size-9 shrink-0 items-center justify-center rounded-lg border bg-white">
						<Link2 className="text-fg size-5" />
					</div>
					<div className="flex flex-1 flex-col gap-0.5">
						<p className="text-fg text-sm font-medium">
							Anyone with the link can view
						</p>
						<p className="text-fg-tertiary text-xs">
							radian.com/workspace/overview
						</p>
					</div>
					<Button type="button" variant="outline" color="neutral" size="32">
						<Copy className="size-4" />
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
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="flex flex-col gap-5">
						<FormField
							control={form.control}
							name="email"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Invite by email</FormLabel>
									<FormControl>
										<Input
											type="email"
											placeholder="e.g. user1example@gmail.com"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

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
				</Form>
			</div>
		</div>
	)
}
