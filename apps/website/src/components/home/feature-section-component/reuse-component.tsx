import { useEffect, useRef, useState } from "react"
import { AnimatePresence, motion, useAnimationControls, useSpring } from "motion/react"
import Image from "next/image"

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

	useEffect(() => {
		const container = containerRef.current
		if (container) {
			// Set initial scroll position to center the signin card
			const initialScroll = 1 * cardWidth
			container.scrollLeft = initialScroll
			scrollX.set(initialScroll)
		}

		calculateCenterCard()
	}, [])

	// Listen to scroll animation completion
	useEffect(() => {
		const unsubscribe = scrollX.on("change", () => {
			const velocity = scrollX.getVelocity()

			// When velocity is near zero, animation is complete
			if (Math.abs(velocity) < 1 && isAnimating) {
				setIsAnimating(false)
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
		{
			id: 0,
			type: {
				darkmode: "",
				lightmode: "",
			},
		},
		{
			id: 1,
			type: {
				darkmode: "",
				lightmode: "",
			},
		},
		{
			id: 2,
			type: {
				darkmode: "",
				lightmode: "",
			},
		},
		{
			id: 3,
			type: {
				darkmode: "/reuseable-ui/dark-mode3.png",
				lightmode: "/reuseable-ui/light-mode3.png",
			},
		},
		{
			id: 4,
			type: {
				darkmode: "/reuseable-ui/dark-mode2.png",
				lightmode: "/reuseable-ui/light-mode2.png",
			},
		},
		{
			id: 5,
			type: {
				darkmode: "/reuseable-ui/dark-mode1.png",
				lightmode: "/reuseable-ui/light-mode1.png",
			},
		},
		{
			id: 6,
			type: {
				darkmode: "",
				lightmode: "",
			},
		},
	]

	return (
		<div className="flex w-full items-center justify-center overflow-hidden pt-8">
			<motion.div
				ref={containerRef}
				animate={controls}
				className="relative z-0 hidden cursor-pointer items-center justify-center gap-5 overflow-x-auto overflow-y-hidden sm:flex"
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
						className={`w-90 relative flex h-[580px] flex-shrink-0 flex-col items-center justify-center transition-all duration-300`}>
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
									className="absolute inset-0 flex items-start justify-center">
									{card.type.darkmode && <Image unoptimized src={card.type.darkmode} className="not-dark:hidden" alt="Dark Mode" width={360} height={594} />}
									{card.type.lightmode && <Image unoptimized src={card.type.lightmode} className="dark:hidden" alt="Light Mode" width={360} height={594} />}
								</motion.div>
							) : (
								<>
									{!card.type.darkmode || !card.type.lightmode ? (
										<motion.div
											key={`empty1-${index}`}
											initial={{ opacity: 0 }}
											animate={{ opacity: 1 }}
											exit={{ opacity: 0 }}
											transition={{
												duration: 0.5,
												ease: "linear",
											}}
											className="w-90 bg-fill1 absolute inset-0 flex flex-col items-center justify-center rounded-2xl border-2 border-dotted px-6 py-8 opacity-10"
										/>
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
											className="absolute inset-0 flex items-start justify-center">
											{card.type.darkmode && <Image unoptimized src={card.type.darkmode} className="not-dark:hidden opacity-20" alt="Dark Mode" width={360} height={594} />}
											{card.type.lightmode && <Image unoptimized src={card.type.lightmode} className="opacity-20 dark:hidden" alt="Light Mode" width={360} height={594} />}
										</motion.div>
									)}
								</>
							)}
						</AnimatePresence>
					</div>
				))}
			</motion.div>
			{/* mobile responsive */}
			<motion.div
				className="relative z-0 flex items-center justify-center overflow-hidden sm:hidden"
				animate={{
					y: [-50, -150, -50],
				}}
				transition={{
					duration: 4,
					ease: "easeInOut",
					repeat: Infinity,
				}}>
				<div className="w-90 relative flex h-[520px] flex-shrink-0 items-center justify-center">
					<Image src="/reuseable-ui/dark-mode1.png" className="not-dark:hidden" alt="Dark Mode 1" width={360} height={594} />
					<Image src="/reuseable-ui/light-mode1.png" className="dark:hidden" alt="Dark Mode 1" width={360} height={594} />
				</div>
			</motion.div>
		</div>
	)
}
