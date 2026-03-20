"use client"

import Image from "next/image"
import { useForm } from "react-hook-form"
import { Button } from "@/registry/ui/button"
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
} from "@/registry/ui/form"
import { Input } from "@/registry/ui/input"
import { TextArea } from "@/registry/ui/text-area"

type ProjectNameFormValues = {
	projectName: string
	projectDescription: string
}

export default function ProjectNameStep({ onNext }: { onNext: () => void }) {
	const form = useForm<ProjectNameFormValues>({
		defaultValues: { projectName: "", projectDescription: "" },
	})

	function onSubmit(data: ProjectNameFormValues) {
		console.log(data)
		onNext()
	}

	return (
		<div className="flex w-full max-w-[480px] flex-col gap-8">
			<div className="flex flex-col gap-6">
				<Image
					src="https://radianos.com/favicon.ico"
					alt="Radian Logo"
					width={32}
					height={32}
					className="rounded-md"
				/>
				<div className="flex flex-col gap-2">
					<h2 className="heading-5">Set your project name</h2>
					<p className="text-fg-secondary text-sm">
						This name will be used to organize all your data and reports. You
						can change it later.
					</p>
				</div>
			</div>

			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="flex flex-col gap-5">
					<div className="flex flex-col gap-4">
						<FormField
							control={form.control}
							name="projectName"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Project Name</FormLabel>
									<FormControl>
										<Input
											placeholder="e.g. Radian Dashboard"
											size="36"
											{...field}
										/>
									</FormControl>
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="projectDescription"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Project Description</FormLabel>
									<FormControl>
										<TextArea
											placeholder="e.g. A modern analytics dashboard for design teams"
											rows={5}
											{...field}
										/>
									</FormControl>
								</FormItem>
							)}
						/>
					</div>
					<Button type="submit" color="primary" className="w-full">
						Continue
					</Button>
				</form>
			</Form>
		</div>
	)
}
