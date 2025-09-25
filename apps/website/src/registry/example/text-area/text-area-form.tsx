import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import z from "zod"
import { Button } from "@/registry/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/registry/ui/form"
import { TextArea } from "@/registry/ui/text-area"

const FormSchema = z.object({
	review: z
		.string()
		.min(12, {
			error: "Review needs to be atleast 12 characters long",
		})
		.max(500, { error: "Review cannot be longer than 500 characters" }),
})

type FormValues = z.infer<typeof FormSchema>

export default function TextAreaForm() {
	const form = useForm<FormValues>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			review: "",
		},
	})

	function onSubmit(data: FormValues) {
		toast("You submitted the following values:", {
			description: JSON.stringify(data, null, 2),
		})
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="w-full max-w-md space-y-6">
				<FormField
					control={form.control}
					name="review"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Leave a review</FormLabel>

							<FormControl>
								<TextArea placeholder="Write your review here." className="w-full max-w-md" {...field} />
							</FormControl>

							<FormDescription>Leave a review between 12 to 500 characters long.</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>

				<Button type="submit">Submit</Button>
			</form>
		</Form>
	)
}
