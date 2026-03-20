"use client"

import { Plus } from "lucide-react"
import { useFieldArray, useForm } from "react-hook-form"
import { Button } from "@/registry/ui/button"
import { Divider } from "@/registry/ui/divider"
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
} from "@/registry/ui/form"
import { Input } from "@/registry/ui/input"
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/registry/ui/select"

type InviteFormValues = {
	invites: { email: string; role: string }[]
}

export default function InviteStep({ onNext }: { onNext: () => void }) {
	const form = useForm<InviteFormValues>({
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

	function onSubmit(data: InviteFormValues) {
		console.log(data)
		onNext()
	}

	return (
		<div className="flex w-full max-w-[400px] flex-col gap-8">
			<div className="flex flex-col gap-2">
				<h2 className="heading-5">Invite your Team</h2>
				<p className="text-fg-secondary text-sm">
					Add team members you&apos;d like to include in this project.
				</p>
			</div>

			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="flex flex-col gap-6">
					<div className="flex flex-col gap-5">
						<div className="flex flex-col gap-4">
							{fields.map((field, index) => (
								<div key={field.id} className="flex items-end gap-2">
									<FormField
										control={form.control}
										name={`invites.${index}.email`}
										render={({ field }) => (
											<FormItem className="flex-1">
												<FormLabel>Email Address</FormLabel>
												<FormControl>
													<Input
														type="email"
														placeholder="example@email.com"
														size="36"
														{...field}
													/>
												</FormControl>
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name={`invites.${index}.role`}
										render={({ field }) => (
											<FormItem className="w-[120px]">
												<Select
													onValueChange={field.onChange}
													defaultValue={field.value}>
													<FormControl>
														<SelectTrigger size="36">
															<SelectValue placeholder="Role" />
														</SelectTrigger>
													</FormControl>
													<SelectContent>
														<SelectItem value="member">Member</SelectItem>
														<SelectItem value="admin">Admin</SelectItem>
														<SelectItem value="viewer">Viewer</SelectItem>
													</SelectContent>
												</Select>
											</FormItem>
										)}
									/>
								</div>
							))}
						</div>

						<Button
							type="button"
							variant="outline"
							color="neutral"
							className="w-full border-dashed"
							onClick={() => append({ email: "", role: "member" })}>
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
							className="flex-1"
							onClick={onNext}>
							Skip for now
						</Button>
						<Button type="submit" color="primary" className="flex-1">
							Invite
						</Button>
					</div>
				</form>
			</Form>
		</div>
	)
}
