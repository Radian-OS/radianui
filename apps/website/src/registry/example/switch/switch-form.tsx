"use client"

import { useId } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"
import { Button } from "@/registry/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem } from "@/registry/ui/form"
import { Label } from "@/registry/ui/label"
import { Switch } from "@/registry/ui/switch"

const FormSchema = z.object({
	marketing_emails: z.boolean().default(false).optional(),
})

export default function SwitchForm() {
	const id = useId()

	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			marketing_emails: false,
		},
	})

	function onSubmit(data: z.infer<typeof FormSchema>) {
		toast("You submitted the following values", {
			description: JSON.stringify(data, null, 2),
		})
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="flex w-[340px] flex-col gap-5">
				<div className="w-full space-y-4">
					<FormField
						control={form.control}
						name="marketing_emails"
						render={({ field }) => (
							<FormItem className="flex w-full items-center space-x-3">
								<Label htmlFor={id} className="w-full">
									<div className="border-border has-data-[state=checked]:border-primary-border relative flex w-full items-start gap-2 rounded-xl border p-4">
										<FormControl>
											<Switch size={"20"} id={id} checked={field.value} onCheckedChange={field.onChange} className="order-1" />
										</FormControl>
										<div className="grid grow gap-2">
											<Label htmlFor={id}>Marketing emails</Label>
											<FormDescription className="text-fg-tertiary text-xs font-normal">
												Get notified about new features, <br />
												product announcements, and more.
											</FormDescription>
										</div>
									</div>
								</Label>
							</FormItem>
						)}
					/>
				</div>
				<Button type="submit" className="w-full">
					Submit
				</Button>
			</form>
		</Form>
	)
}
