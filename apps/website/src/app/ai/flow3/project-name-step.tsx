"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/registry/ui/button"
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/registry/ui/form"
import { Input } from "@/registry/ui/input"
import { TextArea } from "@/registry/ui/text-area"
import { Radian } from "../icon/radian"

const projectNameSchema = z.object({
	projectName: z.string().min(1, "Project name is required"),
	projectDescription: z.string().min(1, "Project description is required"),
})

type ProjectNameFormValues = z.infer<typeof projectNameSchema>

export default function ProjectNameStep({ onNext }: { onNext: () => void }) {
	const form = useForm<ProjectNameFormValues>({
		resolver: zodResolver(projectNameSchema),
		defaultValues: {
			projectName: "",
			projectDescription: "",
		},
	})

	function onSubmit() {
		onNext()
	}

	return (
		<div className="flex w-full max-w-[480px] flex-col gap-8">
			{/* Header */}
			<div className="flex flex-col gap-6">
				<Radian />
				<div className="flex flex-col gap-2">
					<h1 className="heading-5">Set your project name</h1>
					<p className="text-fg-secondary text-sm">
						This name will be used to organize all your data and reports. You
						can change it later.
					</p>
				</div>
			</div>

			{/* Form */}
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="flex flex-col gap-6">
					<div className="flex flex-col gap-4">
						{/* Project Name */}
						<FormField
							control={form.control}
							name="projectName"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Project Name</FormLabel>
									<FormControl>
										<Input placeholder="e.g. Radian Dashboard" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						{/* Project Description */}
						<FormField
							control={form.control}
							name="projectDescription"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Project Description</FormLabel>
									<FormControl>
										<TextArea
											placeholder="e.g. A modern analytics dashboard for design teams"
											className="max-h-[150px] min-h-[118px]"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>

					<Button
						type="submit"
						variant="strong"
						color="primary"
						size="36"
						className="w-full">
						Continue
					</Button>
				</form>
			</Form>
		</div>
	)
}
