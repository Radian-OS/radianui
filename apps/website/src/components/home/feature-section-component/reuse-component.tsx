import { useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { Button } from "@/registry/ui/button"
import { Checkbox } from "@/registry/ui/checkbox"
import { Divider } from "@/registry/ui/divider"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/registry/ui/form"
import { Input } from "@/registry/ui/input"
import { GithubIcon } from "../block/components/github-icon"
import { GoogleIcon } from "../block/components/google-icon"
import PlaygroundLogo from "../playground-logo"

export default function ReuseComponent() {
	const [activePanel, setActivePanel] = useState("middle")

	const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>): void => {
		const { clientX, currentTarget } = e
		const { left, width } = currentTarget.getBoundingClientRect()
		const x: number = clientX - left

		// Divide the screen into regions
		const leftThird: number = width / 3
		const rightThird: number = (width * 2) / 3

		if (x < leftThird) {
			setActivePanel("right")
		} else if (x > rightThird) {
			setActivePanel("left")
		} else {
			setActivePanel("middle")
		}
	}

	return (
		<div className="bg-bg relative z-0 flex w-full items-center justify-center overflow-hidden pt-6" onMouseMove={handleMouseMove} onMouseLeave={() => setActivePanel("middle")}>
			<div className="relative flex h-full w-full max-w-7xl items-center justify-center gap-5">
				{/* Left Panel */}
				<motion.div
					className="flex h-full flex-1"
					animate={
						activePanel === "left"
							? { x: "-100%", y: ["0%", "-50%", "0%"] }
							: activePanel === "right"
								? { x: "100%", y: ["0%", "-50%", "0%"], opacity: 1 }
								: {
										x: 0,
										y: ["0%", "-50%", "0%"],
										opacity: 1,
									}
					}
					transition={{
						x: {
							type: "spring",
							stiffness: 20,
							damping: 30,
							mass: 2,
						},
						y: {
							duration: 8,
							repeat: Infinity,
							ease: "easeInOut",
						},
						opacity: {
							duration: 0.8,
							ease: "easeInOut",
						},
					}}
					style={{ zIndex: 10 }}>
					<AnimatePresence mode="wait">
						<motion.div
							key={activePanel === "right" ? "signin" : "placeholder"}
							initial={{ opacity: 0.5 }}
							animate={{ opacity: 1 }}
							transition={{ duration: 0.4, ease: "easeInOut" }}>
							{activePanel === "right" ? <Signin /> : <div className="w-90 border-soft bg-fill2 mx-5 h-[594px] rounded-2xl border-2 border-dotted px-6 py-8"></div>}
						</motion.div>
					</AnimatePresence>
				</motion.div>

				{/* Middle Panel */}
				<motion.div
					className="flex h-full flex-1"
					animate={
						activePanel === "left"
							? { x: "-100%", y: ["0%", "-50%", "0%"] }
							: activePanel === "right"
								? { x: "100%", y: ["0%", "-50%", "0%"] }
								: {
										x: 0,
										y: ["0%", "-50%", "0%"],
										opacity: 1,
									}
					}
					transition={{
						x: {
							type: "spring",
							stiffness: 20,
							damping: 30,
							mass: 2,
						},
						y: {
							duration: 8,
							repeat: Infinity,
							ease: "easeInOut",
						},
						opacity: {
							duration: 0.8,
							ease: "easeInOut",
						},
					}}
					style={{ zIndex: 15 }}>
					<AnimatePresence mode="wait">
						<motion.div
							key={activePanel === "right" || activePanel === "left" ? "signin1" : "placeholder1"}
							initial={{ opacity: 0.5 }}
							animate={{ opacity: 1 }}
							transition={{ duration: 0.4, ease: "easeInOut" }}>
							{activePanel === "right" || activePanel === "left" ? <div className="w-90 bg-fill2 border-soft mx-5 h-[594px] rounded-2xl border-2 border-dotted"></div> : <Signin />}
						</motion.div>
					</AnimatePresence>
				</motion.div>

				{/* Right Panel */}
				<motion.div
					className="flex h-full flex-1"
					animate={
						activePanel === "left"
							? { x: "-100%", y: ["0%", "-50%", "0%"], opacity: 1 }
							: activePanel === "right"
								? { x: "100%", y: ["0%", "-50%", "0%"] }
								: {
										x: 0,
										y: ["0%", "-50%", "0%"],
										opacity: 1,
									}
					}
					transition={{
						x: {
							type: "spring",
							stiffness: 20,
							damping: 30,
							mass: 2,
						},
						y: {
							duration: 8,
							repeat: Infinity,
							ease: "easeInOut",
						},
						opacity: {
							duration: 0.8,
							ease: "easeInOut",
						},
					}}
					style={{ zIndex: 10 }}>
					<AnimatePresence mode="wait">
						<motion.div
							key={activePanel === "left" ? "signin" : "placeholder"}
							initial={{ opacity: 0.5 }}
							animate={{ opacity: 1 }}
							transition={{ duration: 0.4, ease: "easeInOut" }}>
							{activePanel === "left" ? <Signin /> : <div className="w-90 border-soft bg-fill2 mx-5 h-[594px] rounded-2xl border-2 border-dotted"></div>}
						</motion.div>
					</AnimatePresence>
				</motion.div>
			</div>
		</div>
	)
}
const Signin = () => {
	const form = useForm()

	return (
		<div className="w-90 bg-bg border-soft z-0 flex rounded-2xl border px-6 py-8 shadow-[0_16px_24px_-4px_rgba(25,24,27,0.12)]">
			<div className="flex flex-1 flex-col gap-6">
				<div>
					<PlaygroundLogo />
				</div>
				<div className="flex flex-col gap-2">
					<h1 className="heading-5">Sign In</h1>
					<p className="text-fg-secondary text-sm">Welcome! Sign in to continue</p>
				</div>
				<div className="flex flex-1 flex-col gap-6">
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
					<div className="flex items-center gap-2">
						<Divider className="flex-1" />
						<span className="text-fg-secondary whitespace-nowrap text-sm font-medium">Or continue with</span>
						<Divider className="flex-1" />
					</div>
				</div>
				<Form {...form}>
					<form>
						<div className="flex flex-col gap-5">
							<FormField
								control={form.control}
								name="email"
								render={() => (
									<FormItem>
										<FormLabel>Email Address</FormLabel>
										<FormControl>
											<Input size="36" type="email" />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="password"
								render={() => (
									<FormItem>
										<FormLabel>Password</FormLabel>
										<FormControl>
											<Input size="36" type="password" />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<div className="flex items-center justify-between">
								<FormField
									control={form.control}
									name="rememberMe"
									render={() => (
										<div className="flex items-center gap-2">
											<FormControl>
												<Checkbox id="remember-me" />
											</FormControl>
											<FormLabel htmlFor="remember-me" className="text-fg-secondary font-normal">
												Remember me
											</FormLabel>
										</div>
									)}
								/>
								<Button variant="link" asChild color="primary">
									<Link href="#">Forgot Password?</Link>
								</Button>
							</div>
							<Button className="w-full" type="submit">
								Sign In
							</Button>
						</div>
					</form>
				</Form>
				<p className="text-fg text-center text-sm">
					Don&apos;t have an account?{" "}
					<Button variant="link" asChild color="primary">
						<Link href="#">Create account</Link>
					</Button>
				</p>
			</div>
		</div>
	)
}
