"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Upload } from "lucide-react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Avatar, AvatarFallback } from "@/registry/ui/avatar"
import { Button } from "@/registry/ui/button"
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/registry/ui/form"
import { Input, InputAddon, InputGroup } from "@/registry/ui/input"
import { TextArea } from "@/registry/ui/text-area"

const workspaceSchema = z.object({
	workspaceName: z.string().min(1, "Workspace name is required"),
	description: z.string().optional(),
	companyWebsite: z.string().optional(),
	location: z.string().optional(),
})

type WorkspaceFormValues = z.infer<typeof workspaceSchema>

export default function WorkspaceStep({
	onNext,
	onBack,
}: {
	onNext: () => void
	onBack: () => void
}) {
	const form = useForm<WorkspaceFormValues>({
		resolver: zodResolver(workspaceSchema),
		defaultValues: {
			workspaceName: "",
			description: "",
			companyWebsite: "",
			location: "",
		},
	})

	function onSubmit() {
		onNext()
	}

	return (
		<div className="flex w-full max-w-[400px] flex-col gap-8">
			{/* Header */}
			<div className="flex flex-col gap-2">
				<h1 className="heading-5">Create your new company workspace</h1>
				<p className="text-fg-secondary text-sm">
					Build your workspace to organize your team and streamline your work.
				</p>
			</div>

			{/* Form */}
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="flex flex-col gap-5">
					{/* Avatar Upload */}
					<div className="flex items-start gap-3">
						<Avatar size="64" rounded="square">
							<AvatarFallback>AB</AvatarFallback>
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

					{/* Fields */}
					<div className="flex flex-col gap-4">
						<FormField
							control={form.control}
							name="workspaceName"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Workspace Name</FormLabel>
									<FormControl>
										<Input placeholder="Enter workspace name" {...field} />
									</FormControl>
									<FormMessage />
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
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="companyWebsite"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Company Website</FormLabel>
									<FormControl>
										<InputGroup>
											<InputAddon>https://</InputAddon>
											<Input placeholder="radianos.com" {...field} />
										</InputGroup>
									</FormControl>
									<FormMessage />
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
										<Input placeholder="123 street" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>

					{/* Actions */}
					<div className="flex gap-3">
						<Button
							type="button"
							variant="outline"
							color="neutral"
							size="36"
							className="flex-1"
							onClick={onBack}>
							Back
						</Button>
						<Button
							type="submit"
							variant="strong"
							color="primary"
							size="36"
							className="flex-1">
							Continue
						</Button>
					</div>
				</form>
			</Form>
		</div>
	)
}
