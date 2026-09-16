import { useId } from "react"
import { Lock, Mail } from "lucide-react"
import Link from "next/link"
import { usePlayground } from "@/contexts/playground"
import { Button } from "@/styles/default/ui/button"
import { Divider } from "@/styles/default/ui/divider"
import { Input, InputAddon, InputGroup } from "@/styles/default/ui/input"
import { Label } from "@/styles/default/ui/label"
import PlaygroundLogo from "../playground-logo"
import { ImagePreview } from "../playground/upload"
import { GithubIcon } from "./components/github-icon"
import { GoogleIcon } from "./components/google-icon"
import {
	buttonStyles,
	colorMap,
	radiusBorderMap,
	radiusMap,
	sizeMap,
	spaceMap,
} from "./signin1"

export default function Signin2() {
	const emailId = useId()
	const passwordId = useId()
	const {
		radius,
		spacing,
		color,
		size,
		label,
		placeholder,
		icon,
		button,
		logoImage,
	} = usePlayground()

	return (
		<div
			style={{
				backgroundImage:
					"radial-gradient(circle, var(--color-fill4-alpha) 1px, transparent 1px)",
				backgroundSize: "10px 10px",
			}}
			className="bg-elevation-negative flex h-full w-full items-center justify-center px-5 py-4">
			<div
				className={`bg-bg border-border flex w-100 ${radiusBorderMap[radius]} border px-6 py-8`}>
				<div
					className={`flex flex-1 flex-col ${spaceMap.gap8[spacing ?? "default"]}`}>
					<div>
						{logoImage ? (
							<ImagePreview
								file={
									typeof logoImage === "string"
										? {
												id: "logo",
												preview: logoImage,
												file: new File([], "logo"),
											}
										: logoImage
								}
							/>
						) : (
							<PlaygroundLogo />
						)}
					</div>
					<div
						className={`flex flex-col ${spaceMap.gap2[spacing ?? "default"]}`}>
						<p className="text-2xl leading-8 font-bold">Sign In</p>
						<p className="text-fg-secondary text-sm">
							Don&apos;t have an account?{" "}
							<Button variant="link" asChild color="primary">
								<Link href="#"> Sign up</Link>
							</Button>
						</p>
					</div>
					<form>
						<div
							className={`flex flex-col ${spaceMap.gap8[spacing ?? "default"]}`}>
							<div
								className={`flex flex-col ${spaceMap.gap5[spacing ?? "default"]}`}>
								<div data-slot="form-item" className="flex flex-col gap-1.5">
									{label && <Label htmlFor={emailId}>Email Address</Label>}
									<InputGroup>
										{icon && (
											<InputAddon
												className={`${radiusMap[radius]}`}
												size={sizeMap[size ?? "default"]}>
												<Mail />
											</InputAddon>
										)}
										<Input
											id={emailId}
											size={sizeMap[size ?? "default"]}
											className={`${radiusMap[radius]} w-full`}
											placeholder={placeholder ? "Enter your email" : ""}
											type="email"
										/>
									</InputGroup>
								</div>
								<div data-slot="form-item" className="flex flex-col gap-1.5">
									<div className="flex items-center justify-between">
										{label && <Label htmlFor={passwordId}>Password</Label>}
										<Button
											className="flex w-full justify-end"
											variant="link"
											asChild
											color="primary">
											<Link href="#"> Forgot Password?</Link>
										</Button>
									</div>
									<InputGroup>
										{icon && (
											<InputAddon
												className={`${radiusMap[radius]}`}
												size={sizeMap[size ?? "default"]}>
												<Lock />
											</InputAddon>
										)}
										<Input
											id={passwordId}
											size={sizeMap[size ?? "default"]}
											className={`${radiusMap[radius]} w-full`}
											placeholder={placeholder ? "Enter your password" : ""}
											type="password"
										/>
									</InputGroup>
								</div>
							</div>
							<Button
								size={sizeMap[size ?? "default"]}
								className={`${radiusMap[radius]} ${colorMap[color] ?? ""} w-full ${buttonStyles[button ?? "default"]}`}>
								Sign In
							</Button>
						</div>
					</form>
					<div
						className={`flex flex-1 flex-col ${spaceMap.gap6[spacing ?? "default"]}`}>
						<div
							className={`flex items-center ${spaceMap.gap2[spacing ?? "default"]}`}>
							<Divider className="flex-1" />
							<span className="text-fg-secondary text-sm font-medium whitespace-nowrap">
								Or continue with
							</span>
							<Divider className="flex-1" />
						</div>
						<div className={`flex ${spaceMap.gap3[spacing ?? "default"]}`}>
							<Button
								size={sizeMap[size ?? "default"]}
								variant="outline"
								color="neutral"
								className={`${radiusMap[radius]} text-fg-secondary w-full`}>
								<GoogleIcon />
								Google
							</Button>
							<Button
								size={sizeMap[size ?? "default"]}
								variant="outline"
								color="neutral"
								className={`${radiusMap[radius]} text-fg-secondary w-full`}>
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
