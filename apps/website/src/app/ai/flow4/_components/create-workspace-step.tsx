"use client"

import { useState } from "react"
import { Upload } from "lucide-react"
import { useForm } from "react-hook-form"
import { Avatar, AvatarFallback } from "@/registry/ui/avatar"
import { Button } from "@/registry/ui/button"
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
} from "@/registry/ui/form"
import { Input, InputAddon, InputGroup } from "@/registry/ui/input"
import { TextArea } from "@/registry/ui/text-area"
import FlowHeader from "./flow-header"

type WorkspaceFormValues = {
	workspaceName: string
	description: string
	website: string
	location: string
}

export default function CreateWorkspaceStep({
	onNext,
	onBack,
}: {
	onNext: () => void
	onBack: () => void
}) {
	const [avatarInitials] = useState("AB")
	const form = useForm<WorkspaceFormValues>({
		defaultValues: {
			workspaceName: "",
			description: "",
			website: "",
			location: "",
		},
	})

	function onSubmit(data: WorkspaceFormValues) {
		console.log(data)
		onNext()
	}

	return (
		<div className="bg-bg relative flex min-h-screen flex-col items-center justify-center p-4">
			<FlowHeader showSignOut />

			<div className="flex w-full max-w-[400px] flex-col gap-8">
				<div className="flex flex-col gap-2">
					<h2 className="heading-5">Create your new company workspace</h2>
					<p className="text-fg-secondary text-sm">
						Build your workspace to organize your team and streamline your work.
					</p>
				</div>

				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="flex flex-col gap-5">
						<div className="flex flex-col gap-6">
							<div className="flex items-start gap-3">
								<Avatar size="64" rounded="square">
									<AvatarFallback>{avatarInitials}</AvatarFallback>
								</Avatar>
								<div className="flex flex-1 flex-col gap-2">
									<p className="text-fg text-sm font-medium">Company Logo</p>
									<div className="flex gap-3">
										<Button
											type="button"
											variant="outline"
											color="neutral"
											size="28">
											<Upload className="size-4" />
											Upload Image
										</Button>
										<Button
											type="button"
											variant="outline"
											color="neutral"
											size="28"
											className="opacity-50"
											disabled>
											Remove
										</Button>
									</div>
									<p className="text-fg-tertiary text-xs">
										Preferred size 1:1, up to 5MB
									</p>
								</div>
							</div>

							<div className="flex flex-col gap-4">
								<FormField
									control={form.control}
									name="workspaceName"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Workspace Name</FormLabel>
											<FormControl>
												<Input
													placeholder="Enter workspace name"
													size="36"
													{...field}
												/>
											</FormControl>
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="description"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Description</FormLabel>
											<FormControl>
												<TextArea
													placeholder="Briefly describe your company"
													className="min-h-[100px]"
													{...field}
												/>
											</FormControl>
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="website"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Company Website</FormLabel>
											<FormControl>
												<InputGroup>
													<InputAddon size="36">https://</InputAddon>
													<Input
														placeholder="radianos.com"
														size="36"
														{...field}
													/>
												</InputGroup>
											</FormControl>
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="location"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Location</FormLabel>
											<FormControl>
												<Input placeholder="123 street" size="36" {...field} />
											</FormControl>
										</FormItem>
									)}
								/>
							</div>
						</div>

						<div className="flex gap-3">
							<Button
								type="button"
								variant="outline"
								color="neutral"
								onClick={onBack}
								className="flex-1">
								Back
							</Button>
							<Button type="submit" color="primary" className="flex-1">
								Continue
							</Button>
						</div>
					</form>
				</Form>
			</div>
		</div>
	)
}
