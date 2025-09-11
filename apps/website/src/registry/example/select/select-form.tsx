"use client"

// import { zodResolver } from "@hookform/resolvers/zod"
import { EyeIcon, SquareTerminal } from "lucide-react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import CodeSnippet from "@/components/code-snippet"
import { Button } from "@/registry/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/registry/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/registry/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/ui/tabs"

const FormSchema = z.object({
	role: z.string().min(1, { message: "Please select a role" }),
})
console.log(FormSchema)

type FormValues = z.infer<typeof FormSchema>

export default function SelectForm() {
	const form = useForm<FormValues>({
		// resolver: zodResolver(FormSchema),
		defaultValues: {
			role: "",
		},
	})

	function onSubmit(values: FormValues) {
		console.log("Form submitted:", values)
	}

	return (
		<Tabs defaultValue="preview" className="mb-10" variant="outline-ghost">
			<div className="flex items-center justify-between">
				<TabsList>
					<TabsTrigger value="preview" icon={<EyeIcon />}>
						Preview
					</TabsTrigger>
					<TabsTrigger value="code" icon={<SquareTerminal />}>
						Code
					</TabsTrigger>
				</TabsList>
			</div>
			<TabsContent value="preview">
				<div className="h-105 flex items-center justify-center overflow-auto rounded-xl border px-10">
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
							<FormField
								control={form.control}
								name="role"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Role</FormLabel>
										<FormControl>
											<Select onValueChange={field.onChange} defaultValue={field.value}>
												<SelectTrigger className="w-60">
													<SelectValue placeholder="Select a role" />
												</SelectTrigger>
												<SelectContent>
													<SelectItem value="admin">Admin</SelectItem>
													<SelectItem value="editor">Editor</SelectItem>
													<SelectItem value="viewer">Viewer</SelectItem>
												</SelectContent>
											</Select>
										</FormControl>
										<FormDescription>Choose your role in the system.</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>
							<Button type="submit">Submit</Button>
						</form>
					</Form>
				</div>
			</TabsContent>
			<TabsContent value="code">
				<CodeSnippet
					title="select-form.tsx"
					showLineNumber
					className="h-[420px]"
					code={`
"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/registry/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/registry/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/registry/ui/select"

const FormSchema = z.object({
	role: z.string().min(1, { message: "Please select a role" }),
})

type FormValues = z.infer<typeof FormSchema>

export default function SelectForm() {
	const form = useForm<FormValues>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			role: "",
		},
	})

	function onSubmit(values: FormValues) {
		console.log("Form submitted:", values)
	}

	return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                    control={form.control}
                    name="role"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Role</FormLabel>
                            <FormControl>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <SelectTrigger className="w-60">
                                        <SelectValue placeholder="Select a role" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="admin">Admin</SelectItem>
                                        <SelectItem value="editor">Editor</SelectItem>
                                        <SelectItem value="viewer">Viewer</SelectItem>
                                    </SelectContent>
                                </Select>
                            </FormControl>
                            <FormDescription>Choose your role in the system.</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">Submit</Button>
            </form>
        </Form>
	)
}
`}
				/>
			</TabsContent>
		</Tabs>
	)
}
