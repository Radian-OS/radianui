"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Plus } from "lucide-react"
import { useFieldArray, useForm } from "react-hook-form"
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
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/registry/ui/select"

const memberRoles = [
	{ value: "owner", label: "Owner" },
	{ value: "admin", label: "Admin" },
	{ value: "editor", label: "Editor" },
	{ value: "viewer", label: "Viewer" },
	{ value: "member", label: "Member" },
]

const inviteSchema = z.object({
	invites: z.array(
		z.object({
			email: z.string().email("Please enter a valid email").or(z.literal("")),
			role: z.string().min(1, "Select a role"),
		})
	),
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
		defaultValues: {
			invites: [
				{ email: "", role: "member" },
				{ email: "", role: "member" },
				{ email: "", role: "member" },
			],
		},
	})

	const { fields, append } = useFieldArray({
		control: form.control,
		name: "invites",
	})

	function onSubmit() {
		onNext()
	}

	return (
		<div className="flex w-full max-w-[400px] flex-col gap-8">
			{/* Header */}
			<div className="flex flex-col gap-2">
				<h1 className="heading-5">Start with your team</h1>
				<p className="text-fg-secondary text-sm">
					You can invite others members to design and build things with you.
				</p>
			</div>

			{/* Form */}
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="flex flex-col gap-6">
					<div className="flex flex-col gap-5">
						{/* Email Inputs */}
						<div className="flex flex-col gap-4">
							{fields.map((field, index) => (
								<div key={field.id} className="flex gap-0">
									<FormField
										control={form.control}
										name={`invites.${index}.email`}
										render={({ field: emailField }) => (
											<FormItem className="flex-1">
												<FormLabel>Email Address</FormLabel>
												<FormControl>
													<Input
														placeholder="example@email.com"
														className="rounded-r-none border-r-0"
														{...emailField}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name={`invites.${index}.role`}
										render={({ field: roleField }) => (
											<FormItem className="w-[120px]">
												<FormLabel className="invisible">Role</FormLabel>
												<Select
													onValueChange={roleField.onChange}
													value={roleField.value}>
													<FormControl>
														<SelectTrigger className="rounded-l-none">
															<SelectValue />
														</SelectTrigger>
													</FormControl>
													<SelectContent>
														{memberRoles.map((role) => (
															<SelectItem key={role.value} value={role.value}>
																{role.label}
															</SelectItem>
														))}
													</SelectContent>
												</Select>
											</FormItem>
										)}
									/>
								</div>
							))}
						</div>

						{/* Add More Button */}
						<Button
							type="button"
							variant="outline"
							color="neutral"
							size="36"
							className="w-full border-dashed"
							onClick={() => append({ email: "", role: "member" })}>
							<Plus className="size-5" />
							Add more
						</Button>
					</div>

					<Divider />

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
	)
}
