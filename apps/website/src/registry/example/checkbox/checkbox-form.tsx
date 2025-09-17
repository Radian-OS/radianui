"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { CheckCircle } from "lucide-react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/registry/ui/button"
import { Checkbox } from "@/registry/ui/checkbox"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/registry/ui/form"
import { showToast } from "@/registry/ui/toast"

export default function CheckboxForm() {
	const FormSchema = z.object({
		acceptTerms: z.boolean().refine((val) => val === true, {
			message: "You must accept the terms and conditions.",
		}),
	})

	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: { acceptTerms: false },
	})

	function onSubmit() {
		showToast({
			icon: <CheckCircle />,
			variant: "strong",
			color: "success",
			title: "Your form has successfully submitted",
			closable: true,
		})
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="w-[300px] space-y-6">
				<FormField
					control={form.control}
					name="acceptTerms"
					render={({ field }) => (
						<FormItem>
							<div className="flex items-center space-x-2">
								<FormControl>
									<Checkbox checked={field.value} onCheckedChange={field.onChange} />
								</FormControl>
								<FormLabel>I accept the terms and conditions</FormLabel>
							</div>
							<FormDescription>You need to agree to proceed.</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<div className="flex items-center justify-end gap-2.5">
					<Button type="reset" variant="outline">
						Reset
					</Button>
					<Button type="submit">Submit</Button>
				</div>
			</form>
		</Form>
	)
}
