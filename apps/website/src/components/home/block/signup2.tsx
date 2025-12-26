"use client"

import { useState } from "react"
import { EyeIcon, EyeOffIcon, Lock, Mail, User } from "lucide-react"
import Link from "next/link"
import { usePlayground } from "@/contexts/playground"
import { Button } from "@/registry/ui/button"
import { Divider } from "@/registry/ui/divider"
import { Input, InputAddon, InputGroup } from "@/registry/ui/input"
import { Label } from "@/registry/ui/label"
import PlaygroundLogo from "../playground-logo"
import { ImagePreview } from "../playground/upload"
import { GithubIcon } from "./components/github-icon"
import { GoogleIcon } from "./components/google-icon"
import { buttonStyles, colorMap, radiusBorderMap, radiusMap, sizeMap, spaceMap } from "./signin1"

export default function Signup2() {
	const { radius, spacing, size, label, color, placeholder, icon, button, logoImage } = usePlayground()

	const [showPassword, setShowPassword] = useState(false)

	function togglePasswordVisibility(e: React.MouseEvent) {
		e.preventDefault()
		e.stopPropagation()
		setShowPassword(!showPassword)
	}

	const IconComponent = showPassword ? EyeOffIcon : EyeIcon

	return (
		<div
			style={{
				backgroundImage: "radial-gradient(circle, var(--color-fill4-alpha) 1px, transparent 1px)",
				backgroundSize: "10px 10px",
			}}
			className="bg-elevation-negative flex h-full w-full items-center justify-center px-5 py-4">
			<div className={`w-100 bg-bg border-border flex ${radiusBorderMap[radius]} border px-6 py-8`}>
				<div className={`flex flex-1 flex-col ${spaceMap.gap8[spacing ?? "default"]}`}>
					<div>
						{logoImage ? <ImagePreview file={typeof logoImage === "string" ? { id: "logo", preview: logoImage, file: new File([], "logo") } : logoImage} /> : <PlaygroundLogo />}
					</div>
					<div className={`flex flex-col ${spaceMap.gap2[spacing ?? "default"]}`}>
						<h1 className="text-2xl font-bold leading-8">Sign Up</h1>
						<p className="text-fg-secondary text-sm">
							Already have an account?{" "}
							<Button variant="link" asChild color="primary">
								<Link href="#">Sign in</Link>
							</Button>
						</p>
					</div>

					<form>
						<div className={`flex flex-col ${spaceMap.gap8[spacing ?? "default"]}`}>
							<div className={`flex flex-col ${spaceMap.gap4[spacing ?? "default"]}`}>
								<div data-slot="form-item" className="flex flex-col gap-1.5">
									{label && <Label htmlFor="first-name-input">First Name</Label>}
									<InputGroup>
										{icon && (
											<InputAddon size={sizeMap[size ?? "default"]} className={`${radiusMap[radius]}`}>
												<User />
											</InputAddon>
										)}
										<Input
											id="first-name-input"
											size={sizeMap[size ?? "default"]}
											placeholder={placeholder ? "Enter first name" : ""}
											className={`${radiusMap[radius]} w-full`}
											type="text"
										/>
									</InputGroup>
								</div>
								<div data-slot="form-item" className="flex flex-col gap-1.5">
									{label && <Label htmlFor="email-input">Email Address</Label>}
									<InputGroup>
										{icon && (
											<InputAddon size={sizeMap[size ?? "default"]} className={`${radiusMap[radius]}`}>
												<Mail />
											</InputAddon>
										)}
										<Input
											id="email-input"
											size={sizeMap[size ?? "default"]}
											placeholder={placeholder ? "Enter your email" : ""}
											className={`${radiusMap[radius]} w-full`}
											type="email"
										/>
									</InputGroup>
								</div>
								<div data-slot="form-item" className="flex flex-col gap-1.5">
									{label && <Label htmlFor="password-input">Password</Label>}
									<InputGroup className={`${radiusMap[radius]} w-full`}>
										{icon && (
											<InputAddon size={sizeMap[size ?? "default"]} className={`${radiusMap[radius]}`}>
												<Lock />
											</InputAddon>
										)}
										<Input
											id="password-input"
											size={sizeMap[size ?? "default"]}
											className={`peer ${radiusMap[radius]}`}
											placeholder={placeholder ? "Enter your password" : ""}
											type={showPassword ? "text" : "password"}
										/>
										<InputAddon className={`${radiusMap[radius]}`} size={sizeMap[size ?? "default"]}>
											<IconComponent
												className={`hover:text-fg peer-disabled:text-fg-disabled cursor-pointer peer-disabled:pointer-events-none`}
												onMouseDown={togglePasswordVisibility}
											/>
										</InputAddon>
									</InputGroup>
								</div>
							</div>
							<div className={`flex flex-col ${spaceMap.gap4[spacing ?? "default"]}`}>
								<Button size={sizeMap[size ?? "default"]} className={`${radiusMap[radius]} ${colorMap[color] ?? ""} w-full ${buttonStyles[button ?? "default"]}`}>
									Create account
								</Button>
								<p className="text-fg-secondary text-[13px]">
									By signing up, you agree to Radian&apos;s{" "}
									<Button variant="link" asChild color="primary">
										<Link className="text-[13px]" href="#">
											{" "}
											Terms of Service
										</Link>
									</Button>{" "}
									and{" "}
									<Button variant="link" asChild color="primary">
										<Link className="text-[13px]" href="#">
											{" "}
											Privacy Policy
										</Link>
									</Button>
								</p>
							</div>
						</div>
					</form>
					<div className={`flex flex-1 flex-col ${spaceMap.gap6[spacing ?? "default"]}`}>
						<div className={`flex items-center ${spaceMap.gap2[spacing ?? "default"]}`}>
							<Divider className="flex-1" />
							<span className="text-fg-secondary whitespace-nowrap text-sm font-medium">Or continue with</span>
							<Divider className="flex-1" />
						</div>
						<div className={`flex ${spaceMap.gap3[spacing ?? "default"]}`}>
							<Button size={sizeMap[size ?? "default"]} variant="outline" color="neutral" className={`${radiusMap[radius]} text-fg-secondary w-full`}>
								<GoogleIcon />
								Google
							</Button>
							<Button size={sizeMap[size ?? "default"]} variant="outline" color="neutral" className={`${radiusMap[radius]} text-fg-secondary w-full`}>
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
