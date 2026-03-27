import React, { useRef, useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { EyeIcon, EyeOffIcon } from "lucide-react"
import { useForm } from "react-hook-form"
import z from "zod"
import { Button } from "@/registry/ui/button"
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/registry/ui/form"
import { Input, InputWrapper } from "@/registry/ui/input"

const signupSchema = z.object({
	email: z
		.string()
		.min(1, "Email is required")
		.email("Please enter a valid email address"),
	password: z
		.string()
		.min(1, "Password is required")
		.min(8, "Password must be at least 8 characters"),
})

type SignupFormValues = z.infer<typeof signupSchema>

const Signup = ({ onNext }: { onNext: () => void }) => {
	const inputRef = useRef<HTMLInputElement>(null)
	const [showPassword, setShowPassword] = useState(false)

	const IconComponent = showPassword ? EyeOffIcon : EyeIcon

	const form = useForm<SignupFormValues>({
		resolver: zodResolver(signupSchema),
		defaultValues: { email: "", password: "" },
	})

	function togglePasswordVisibility(e: React.MouseEvent) {
		e.preventDefault()
		e.stopPropagation()
		setShowPassword(!showPassword)
	}

	function onSubmit() {
		onNext()
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="flex flex-col gap-5">
				<div className="flex flex-col gap-4">
					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Email Address</FormLabel>
								<FormControl>
									<Input
										type="email"
										placeholder="Enter your email"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="password"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Password</FormLabel>
								<FormControl>
									<InputWrapper>
										<Input
											{...field}
											id="toggle-visible-password"
											ref={inputRef}
											placeholder="Enter your password"
											className="peer"
											type={showPassword ? "text" : "password"}
										/>
										<IconComponent
											className="hover:text-fg peer-disabled:text-fg-disabled cursor-pointer peer-disabled:pointer-events-none"
											onMouseDown={togglePasswordVisibility}
										/>
									</InputWrapper>
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
					Create an account
				</Button>
			</form>
		</Form>
	)
}

export default Signup
