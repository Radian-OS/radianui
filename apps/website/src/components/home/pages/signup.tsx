"use client"

import { useRef, useState } from "react"
import { EyeIcon, EyeOffIcon } from "lucide-react"
import Image from "next/image"
import { Button, LinkButton } from "@/registry/ui/button"
import { Divider } from "@/registry/ui/divider"
import { Input, InputWrapper } from "@/registry/ui/input"
import { Spinner } from "@/registry/ui/spinner"
import { GithubIcon } from "../github-icon"
import { GoogleIcon } from "../google-icon"

interface FormData {
	firstName: string
	email: string
	password: string
}

export default function Signup() {
	const [isLoading, setIsLoading] = useState(false)
	const [showPassword, setShowPassword] = useState(false)
	const [formData, setFormData] = useState<FormData>({
		firstName: "",
		email: "",
		password: "",
	})
	const inputRef = useRef<HTMLInputElement>(null)

	function togglePasswordVisibility(e: React.MouseEvent) {
		e.preventDefault()
		e.stopPropagation()
		setShowPassword(!showPassword)
	}

	const IconComponent = showPassword ? EyeOffIcon : EyeIcon

	const handleInputChange = (field: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData((prev) => ({
			...prev,
			[field]: e.target.value,
		}))
	}

	const onSubmit = (e: React.FormEvent) => {
		e.preventDefault()

		console.log(formData)
		setIsLoading(true)

		setTimeout(() => {
			setIsLoading(false)
			setFormData({
				firstName: "",
				email: "",
				password: "",
			})
		}, 2000)
	}

	return (
		<div className="bg-bg flex h-full w-full items-center justify-center px-5">
			<div className="w-100 bg-bg border-border flex rounded-2xl border px-5 py-6 sm:p-6">
				<div className="flex flex-1 flex-col gap-8">
					<div>
						<Image src="/favicon-16x16.png" height={32} width={32} alt="Logo" />
					</div>
					<div className="flex flex-col gap-2">
						<span className="heading-5">Sign Up</span>
						<p className="text-fg-secondary text-sm">
							Already have an account?{" "}
							<LinkButton href="#" color="primary">
								Sign in
							</LinkButton>
						</p>
					</div>

					<form onSubmit={onSubmit}>
						<div className="flex flex-col gap-8">
							<div className="flex flex-col gap-4">
								<div className="flex flex-col gap-1.5">
									<label htmlFor="firstName" className="text-sm font-medium">
										First Name
									</label>
									<Input id="firstName" size="36" type="text" value={formData.firstName} onChange={handleInputChange("firstName")} />
								</div>

								<div className="flex flex-col gap-1.5">
									<label htmlFor="email" className="text-sm font-medium">
										Email Address
									</label>
									<Input id="email" size="36" type="email" value={formData.email} onChange={handleInputChange("email")} />
								</div>

								<div className="flex flex-col gap-1.5">
									<label htmlFor="password" className="text-sm font-medium">
										Password
									</label>
									<InputWrapper>
										<Input
											id="password"
											ref={inputRef}
											className="peer"
											type={showPassword ? "text" : "password"}
											value={formData.password}
											onChange={handleInputChange("password")}
										/>
										<IconComponent
											className="hover:text-fg peer-disabled:text-fg-disabled cursor-pointer peer-disabled:pointer-events-none"
											onMouseDown={togglePasswordVisibility}
										/>
									</InputWrapper>
								</div>
							</div>

							<div className="flex flex-col gap-3">
								<Button className="w-full" type="submit" disabled={isLoading}>
									{isLoading ? <Spinner variant="default" /> : "Create account"}
								</Button>
								<p className="text-fg-secondary text-sm">
									By signing up, you agree to Radian&apos;s{" "}
									<LinkButton href="#" color="info">
										Terms of Service
									</LinkButton>{" "}
									and{" "}
									<LinkButton href="#" color="info">
										Privacy Policy
									</LinkButton>
								</p>
							</div>
						</div>
					</form>

					<div className="flex flex-1 flex-col gap-6">
						<div className="flex items-center gap-2">
							<Divider className="flex-1" />
							<span className="text-fg-tertiary whitespace-nowrap text-sm font-medium">Or continue with</span>
							<Divider className="flex-1" />
						</div>
						<div className="flex gap-3">
							<Button variant="outline" color="neutral" className="text-fg-secondary w-full">
								<GoogleIcon />
								Google
							</Button>
							<Button variant="outline" color="neutral" className="text-fg-secondary w-full">
								<GithubIcon />
								Github
							</Button>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
