"use client"

import React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { CheckCircle, Wrench } from "lucide-react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import z from "zod"
import { Alert, AlertIcon, AlertTitle } from "@/registry/ui/alert"
import { Button, IconButton } from "@/registry/ui/button"
import { Card, CardFooter, CardHeader } from "@/registry/ui/card"
import { Checkbox } from "@/registry/ui/checkbox"
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from "@/registry/ui/form"
import { Label } from "@/registry/ui/label"

const FormSchema = z.object({
	acceptTerms: z.boolean().refine((val) => val === true, {
		message: "You must check the box.",
	}),
})

const CheckboxForm = () => {
	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: { acceptTerms: false },
	})

	function onSubmit() {
		toast.custom(
			(t) => (
				<Alert
					variant="strong"
					color="success"
					onClose={() => toast.dismiss(t)}>
					<AlertIcon>
						<CheckCircle />
					</AlertIcon>
					<AlertTitle>Your form has successfully submitted</AlertTitle>
				</Alert>
			),
			{ duration: 5000 }
		)
	}

	return (
		<Card className="w-130 gap-0 py-0">
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)}>
					<CardHeader className="flex flex-col items-center gap-4 text-center">
						<IconButton color="warning" variant="soft" className="rounded-full">
							<Wrench />
						</IconButton>

						<div className="flex w-full flex-col items-center gap-2">
							<span className="text-fg text-base font-medium">
								Server maintenance
							</span>
							<p className="text-fg-secondary text-center text-sm font-normal">
								We are performing a scheduled system update to improve stability
								and performance. The workspace will be back online shortly.
							</p>
						</div>
					</CardHeader>

					<CardFooter className="border-border flex items-center justify-between gap-4 border-t">
						<FormField
							control={form.control}
							name="acceptTerms"
							render={({ field }) => (
								<FormItem>
									<Label className="flex cursor-pointer select-none items-center gap-2">
										<FormControl>
											<Checkbox
												checked={field.value}
												onCheckedChange={field.onChange}
												size="md"
											/>
										</FormControl>
										<span className="text-fg text-sm font-medium">
											Don&apos;t show it again
										</span>
									</Label>
									<FormMessage />
								</FormItem>
							)}
						/>

						<div className="flex items-center gap-2">
							<Button variant="outline" color="neutral" type="button">
								Cancel
							</Button>
							<Button color="primary" type="submit">
								Continue
							</Button>
						</div>
					</CardFooter>
				</form>
			</Form>
		</Card>
	)
}

export default CheckboxForm
