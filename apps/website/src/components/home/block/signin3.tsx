import { useId } from "react"
import { Lock, Mail } from "lucide-react"
import Link from "next/link"
import { usePlayground } from "@/contexts/playground"
import { Button } from "@/registry/ui/button"
import { Input, InputAddon, InputGroup } from "@/registry/ui/input"
import { Label } from "@/registry/ui/label"
import PlaygroundLogo from "../playground-logo"
import { ImagePreview } from "../playground/upload"
import { Title } from "./components/title"
import { buttonStyles, colorMap, radiusBorderMap, radiusMap, sizeMap, spaceMap } from "./signin1"

export default function Signin3() {
	const emailId = useId()
	const passwordId = useId()
	const { radius, spacing, color, size, label, placeholder, icon, button, logoImage } = usePlayground()

	return (
		<div
			style={{
				backgroundImage: "radial-gradient(circle, var(--color-fill4-alpha) 1px, transparent 1px)",
				backgroundSize: "10px 10px",
			}}
			className="bg-elevation-negative flex h-full w-full items-center justify-center px-5 py-4">
			<div className={`w-100 bg-bg border-border flex ${radiusBorderMap[radius]} border px-6 py-8`}>
				<div className={`flex flex-1 flex-col ${spaceMap.gap8[spacing ?? "default"]}`}>
					<div className={`text-fg flex items-center ${spaceMap.gap2[spacing ?? "default"]}`}>
						{logoImage ? (
							<ImagePreview file={typeof logoImage === "string" ? { id: "logo", preview: logoImage, file: new File([], "logo") } : logoImage} />
						) : (
							<>
								<PlaygroundLogo /> <Title />
							</>
						)}
					</div>
					<div className={`flex flex-col ${spaceMap.gap2[spacing ?? "default"]}`}>
						<h1 className="text-2xl font-bold leading-8">Sign In</h1>
						<p className="text-fg-secondary text-sm">
							Don&apos;t have an account?{" "}
							<Button variant="link" asChild color="primary">
								<Link href="#"> Sign up</Link>
							</Button>
						</p>
					</div>
					<form>
						<div className={`flex flex-col ${spaceMap.gap8[spacing ?? "default"]}`}>
							<div className={`flex flex-col ${spaceMap.gap5[spacing ?? "default"]}`}>
								<div data-slot="form-item" className="flex flex-col gap-1.5">
									{label && <Label htmlFor={emailId}>Email Address</Label>}
									<InputGroup>
										{icon && (
											<InputAddon size={sizeMap[size ?? "default"]} className={`${radiusMap[radius]}`}>
												{" "}
												{icon && <Mail />}
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
										<Button className="flex w-full justify-end" variant="link" asChild color="primary">
											<Link href="#"> Forgot Password?</Link>
										</Button>
									</div>
									<InputGroup>
										{icon && (
											<InputAddon className={`${radiusMap[radius]}`} size={sizeMap[size ?? "default"]}>
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
							<Button size={sizeMap[size ?? "default"]} className={`${radiusMap[radius]} ${colorMap[color] ?? ""} w-full ${buttonStyles[button ?? "default"]}`}>
								Sign In
							</Button>
						</div>
					</form>
				</div>
			</div>
		</div>
	)
}
