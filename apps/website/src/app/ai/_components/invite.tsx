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
import { Input, InputGroup } from "@/registry/ui/input"
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/registry/ui/select"

const memberRoles = [
	{ value: "member", label: "Member" },
	{ value: "admin", label: "Admin" },
	{ value: "viewer", label: "Viewer" },
]

const inviteSchema = z.object({
	invites: z
		.array(
			z.object({
				email: z.string().email("Please enter a valid email").or(z.literal("")),
				role: z.string().min(1, "Select a role"),
			})
		)
		.refine((invites) => invites.some((invite) => invite.email.trim() !== ""), {
			message: "At least one email is required",
		}),
})

type InviteFormValues = z.infer<typeof inviteSchema>

const Invite = ({
	onNext,
	onSkip,
	text,
}: {
	onNext: () => void
	onSkip: () => void
	text: string
}) => {
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
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="flex flex-col gap-6">
				<div className="flex flex-col gap-5">
					{/* Email Inputs */}
					<div className="flex flex-col gap-4">
						{fields.map((field, index) => (
							<InputGroup key={field.id} className="w-full">
								<FormField
									control={form.control}
									name={`invites.${index}.email`}
									render={({ field: emailField }) => (
										<FormItem className="flex-1">
											<FormLabel>Email Address</FormLabel>
											<FormControl>
												<Input
													placeholder="example@email.com"
													className="rounded-r-none border-r-0 focus-within:border-r"
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
										<FormItem>
											<FormLabel className="invisible">Role</FormLabel>
											<Select
												onValueChange={roleField.onChange}
												value={roleField.value}>
												<FormControl>
													<SelectTrigger className="w-fit rounded-l-none">
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
							</InputGroup>
						))}
						{form.formState.errors.invites?.root && (
							<p className="text-error-text text-sm">
								{form.formState.errors.invites.root.message}
							</p>
						)}
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
						{text}
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
	)
}

export default Invite
