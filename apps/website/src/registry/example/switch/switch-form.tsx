"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"
import { Button } from "@/registry/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/registry/ui/form"
import { Switch } from "@/registry/ui/switch"

const FormSchema = z.object({
	marketing_emails: z.boolean().default(false).optional(),
})

export default function SwitchForm() {
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
			<form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6">
				<div className="space-y-4">
					<FormField
						control={form.control}
						name="marketing_emails"
						render={({ field }) => (
							<FormItem className="flex w-full max-w-sm items-center space-x-2">
								<div className="border-border has-data-[state=checked]:border-primary relative flex w-full items-start gap-2 rounded-xl border p-4">
									<FormControl>
										<Switch checked={field.value} onCheckedChange={field.onChange} className="order-1" />
									</FormControl>
									<div className="grid grow gap-2">
										<FormLabel>Marketing emails</FormLabel>
										<FormDescription className="text-fg-secondary text-xs">Receive emails about new products, features, and more.</FormDescription>
									</div>
								</div>
							</FormItem>
						)}
					/>
				</div>
				<Button type="submit" className="ml-auto">
					Submit
				</Button>
			</form>
		</Form>
	)
}
