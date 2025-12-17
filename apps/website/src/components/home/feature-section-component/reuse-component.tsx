import { useEffect, useRef, useState } from "react"
import { AnimatePresence, motion, useAnimationControls, useSpring } from "motion/react"
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

export function ReuseComponent() {
	const containerRef = useRef<HTMLDivElement>(null)
	const controls = useAnimationControls()
	const [hasHoveredCard5, setHasHoveredCard5] = useState(false)
	const [, setIsHovering] = useState<"left" | "right" | null>(null)
	const [isAnimating, setIsAnimating] = useState(false)
	const [centerCardIndex, setCenterCardIndex] = useState<number | null>(null)
	const scrollX = useSpring(0, {
		stiffness: 50,
		damping: 30,
		mass: 1,
	})
	const cardWidth = 360 + 20 // w-90 = 360px + gap-5 = 20px

	// Calculate which card is in the center
	const calculateCenterCard = () => {
		const container = containerRef.current
		if (!container) return

		const containerCenter = container.clientWidth / 2
		const scrollLeft = container.scrollLeft
		const absoluteCenter = scrollLeft + containerCenter

		// Calculate which card index is at center
		const cardIndex = Math.round(absoluteCenter / cardWidth)
		setCenterCardIndex(cardIndex)
	}

	// Start continuous up-down animation
	const startFloatingAnimation = () => {
		controls.start({
			y: [0, -350, 0],
			transition: {
				duration: 8,
				repeat: Infinity,
				ease: "easeInOut",
			},
		})
	}

	useEffect(() => {
		const container = containerRef.current
		if (container) {
			// Set initial scroll position to center the signin card
			const initialScroll = 1 * cardWidth
			container.scrollLeft = initialScroll
			scrollX.set(initialScroll)
		}

		startFloatingAnimation()
		calculateCenterCard()
	}, [])

	// Listen to scroll animation completion
	useEffect(() => {
		const unsubscribe = scrollX.on("change", () => {
			const velocity = scrollX.getVelocity()

			// When velocity is near zero, animation is complete
			if (Math.abs(velocity) < 1 && isAnimating) {
				setIsAnimating(false)
				startFloatingAnimation()
			}
		})

		return unsubscribe
	}, [isAnimating])

	const scrollToCard = (direction: "left" | "right") => {
		const container = containerRef.current
		if (!container) return

		const currentScroll = container.scrollLeft
		const maxScroll = container.scrollWidth - container.clientWidth

		let targetScroll
		if (direction === "left") {
			targetScroll = Math.max(0, currentScroll - cardWidth)
		} else {
			targetScroll = Math.min(maxScroll - 2, currentScroll + cardWidth)
		}

		controls.stop()
		controls.set({ y: 0 })
		setIsAnimating(true)
		scrollX.set(targetScroll)
	}

	const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, cardId: number) => {
		const container = containerRef.current
		if (!container) return

		// Only trigger on card id 1 (left) or id 3 (right)
		if (cardId === 3) {
			// Left hover
			setIsHovering("left")
			setIsAnimating(true)
			controls.stop()
			scrollToCard("left")
		} else if (cardId === 5) {
			if (!hasHoveredCard5) {
				// Right hover
				setIsHovering("right")
				setIsAnimating(true)
				controls.stop()
				scrollToCard("right")
				setHasHoveredCard5(true)
			}
		}
		// else if (cardId === 4) {
		// 	handleMouseLeave()
		// }
	}
	const handleMouseLeave = () => {
		setIsHovering(null)
		setHasHoveredCard5(false)

		// Stop any ongoing animation
		controls.stop()

		// Scroll back to the original center position (signin card at index 2)
		const container = containerRef.current
		if (container) {
			const originalScroll = 1 * cardWidth // Center the signin card (index 2, centerCardIndex checks index-1)
			scrollX.set(originalScroll)
			controls.set({ y: 0 })
			// Wait for scroll animation to complete before restarting floating
			setIsAnimating(true)
		}
	}

	// Sync scroll position and calculate center card
	useEffect(() => {
		const unsubscribe = scrollX.on("change", (latest) => {
			if (containerRef.current) {
				containerRef.current.scrollLeft = latest
				calculateCenterCard()
			}
		})

		return unsubscribe
	}, [scrollX])

	// Cards data - you can modify this array as needed
	const cards = [
		{ id: 0, type: "empty" },
		{ id: 1, type: "empty" },
		{ id: 2, type: "signin" },
		{ id: 3, type: "empty" },
		{ id: 4, type: "empty" },
		{ id: 5, type: "empty" },
		{ id: 6, type: "empty" },
	]

	return (
		<div className="flex w-full items-center justify-center overflow-hidden pt-8">
			<motion.div
				ref={containerRef}
				animate={controls}
				className="relative z-0 flex cursor-pointer items-center justify-center gap-5 overflow-x-auto overflow-y-hidden"
				onMouseLeave={handleMouseLeave}
				style={{
					scrollBehavior: "auto",
					scrollbarWidth: "none",
					msOverflowStyle: "none",
				}}>
				{cards.map((card, index) => (
					<div
						onMouseMove={(e) => handleMouseMove(e, card.id)}
						key={card.id}
						className={`w-90 relative flex h-[594px] flex-shrink-0 flex-col items-center justify-center transition-all duration-300`}>
						<AnimatePresence mode="sync">
							{centerCardIndex === index - 2 ? (
								<motion.div
									key={`signin-${index}`}
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									exit={{ opacity: 0 }}
									transition={{
										duration: 0.5,
										ease: "linear",
									}}
									className="absolute inset-0 flex items-center justify-center">
									<Signin />
								</motion.div>
							) : (
								<motion.div
									key={`empty-${index}`}
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									exit={{ opacity: 0 }}
									transition={{
										duration: 0.5,
										ease: "linear",
									}}
									className="w-90 bg-fill1 absolute inset-0 flex flex-col items-center justify-center rounded-2xl border-2 border-dotted px-6 py-8"
								/>
							)}
						</AnimatePresence>
					</div>
				))}
			</motion.div>
		</div>
	)
}

const Signin = () => {
	const form = useForm()

	return (
		<div className="w-90 bg-bg border-soft z-0 flex flex-shrink-0 rounded-2xl border px-6 py-8">
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
