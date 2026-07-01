"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { ArrowUpRight } from "lucide-react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { submitDesignRequest } from "@/app/actions/request-design/request-design"
import {
	type RequestDesignInput,
	requestDesignSchema,
} from "@/lib/validations/request-design"
import { Button } from "@/registry/ui/button"
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from "@/registry/ui/form"
import { Input } from "@/registry/ui/input"
import { TextArea } from "@/registry/ui/text-area"

export function RequestDesign() {
	const form = useForm<RequestDesignInput>({
		resolver: zodResolver(requestDesignSchema),
		defaultValues: {
			details: "",
			email: "",
		},
	})

	const { mutate, isPending } = useMutation({
		mutationFn: submitDesignRequest,
		onSuccess: (data) => {
			if (data.success) {
				toast.success(data.message)
				form.reset()
			} else {
				toast.error(data.message)
				if (data.errors) {
					if (data.errors.properties?.email) {
						form.setError("email", {
							message: data.errors.properties.email.errors[0],
						})
					}
					if (data.errors.properties?.details) {
						form.setError("details", {
							message: data.errors.properties.details.errors[0],
						})
					}
				}
			}
		},
		onError: () => {
			toast.error("Something went wrong. Please try again.")
		},
	})

	function onSubmit(data: RequestDesignInput) {
		mutate(data)
	}

	return (
		<div className="bg-fill1 mt-8 flex flex-col gap-6 rounded-2xl p-10">
			<div className="flex flex-col gap-2">
				<span className="text-primary text-xs font-normal">Request design</span>
				<h2 className="text-fg heading-6">
					Can&apos;t find what you&apos;re looking for?
				</h2>
				<p className="text-fg-secondary text-base font-normal">
					Tell us which component, template, or asset you need. We review every
					request and prioritize the most popular ones in future updates.
				</p>
			</div>

			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="mt-4 flex flex-col gap-3">
					<FormField
						control={form.control}
						name="details"
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<TextArea
										{...field}
										placeholder="What would you like us to add?"
										className="h-[96px] w-full resize-none"
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<div className="flex flex-col gap-3 sm:flex-row sm:items-start">
						<FormField
							control={form.control}
							name="email"
							render={({ field }) => (
								<FormItem className="flex-1">
									<FormControl>
										<Input
											{...field}
											placeholder="Enter your email address here"
											type="email"
											className="w-full"
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<Button
							type="submit"
							variant="strong"
							color="primary"
							disabled={isPending}>
							{isPending ? "Submitting..." : "Submit Request"}
							<ArrowUpRight />
						</Button>
					</div>
				</form>
			</Form>
		</div>
	)
}
