import React, { useEffect, useState } from "react"
import { motion } from "motion/react"

const AnimatedPurpleGrid = () => {
	const [pulseProgress, setPulseProgress] = useState(0)
	const [randomOffsets, setRandomOffsets] = useState<number[][]>([])
	const [cellActiveState, setCellActiveState] = useState<boolean[][]>([])
	const [isAnimating, setIsAnimating] = useState(false)
	const [animationInterval, setAnimationInterval] = useState<NodeJS.Timeout | null>(null)

	// Generate 30x30 grid with distance from center
	const gridData = Array.from({ length: 30 }, (_, row) =>
		Array.from({ length: 30 }, (_, col) => {
			const centerRow = 20
			const centerCol = 20
			const distFromCenter = Math.sqrt(Math.pow(row - centerRow, 2) + Math.pow(col - centerCol, 2))
			const maxDist = Math.sqrt(Math.pow(centerRow, 2) + Math.pow(centerCol, 2))

			// Calculate distance from edge
			const distFromEdge = Math.min(row, col, 29 - row, 29 - col)
			const edgeFade = Math.min(distFromEdge / 6, 1)

			// Calculate corner fade - corners should be completely dark
			const cornerDist = Math.sqrt(Math.pow(Math.min(row, 29 - row) - 0, 2) + Math.pow(Math.min(col, 29 - col) - 0, 2))
			const cornerFade = Math.min(cornerDist / 9, 1)

			return {
				distFromCenter: distFromCenter / maxDist,
				edgeFade: edgeFade * cornerFade,
			}
		})
	)

	// Initialize random offsets for each cell
	useEffect(() => {
		const offsets = Array.from({ length: 30 }, () => Array.from({ length: 30 }, () => (Math.random() - 0.5) * 0.3))
		setRandomOffsets(offsets)

		// Initialize which cells will be active (70% chance each cell glows)
		const activeState = Array.from({ length: 30 }, () => Array.from({ length: 30 }, () => Math.random() > 0.3))
		setCellActiveState(activeState)
	}, [])

	// Trigger pulse animation
	const triggerPulse = () => {
		if (isAnimating) return // Prevent multiple simultaneous pulses

		setIsAnimating(true)
		setPulseProgress(0)

		// Generate new random offsets for each pulse
		const offsets = Array.from({ length: 30 }, () => Array.from({ length: 30 }, () => (Math.random() - 0.5) * 0.3))
		setRandomOffsets(offsets)

		// Generate new random active state (70% chance each cell glows)
		const activeState = Array.from({ length: 30 }, () => Array.from({ length: 30 }, () => Math.random() > 0.3))
		setCellActiveState(activeState)

		const interval = setInterval(() => {
			setPulseProgress((prev) => {
				const next = prev + 0.1
				if (next >= 1) {
					clearInterval(interval)
					setIsAnimating(false)
					return 1
				}
				return next
			})
		}, 20)

		setAnimationInterval(interval)
	}

	// Cleanup on unmount
	useEffect(() => {
		return () => {
			if (animationInterval) {
				clearInterval(animationInterval)
			}
		}
	}, [animationInterval])

	interface OpacityParams {
		distFromCenter: number
		randomOffset: number
		edgeFade: number
		isActive: boolean
	}

	const getOpacity = ({ distFromCenter, randomOffset, edgeFade, isActive }: OpacityParams): number => {
		// If cell is not active, it doesn't glow
		if (!isActive) return 0

		// Apply random offset to the distance
		const adjustedDist = distFromCenter + randomOffset

		// Cell is covered if the pulse has reached it or passed it
		let opacity = 0
		if (adjustedDist <= pulseProgress) {
			opacity = 1
		} else {
			// Fade in effect at the edge of the pulse
			const pulseWidth = 0.1
			const diff = adjustedDist - pulseProgress

			if (diff < pulseWidth) {
				opacity = 1 - diff / pulseWidth
			}
		}

		// Apply edge fade to reduce opacity near borders
		return opacity * edgeFade
	}

	return (
		<div className="relative flex w-full items-center" onClick={triggerPulse} style={{ cursor: "pointer" }}>
			<svg width="500" height="500" viewBox="0 0 375 500" fill="none" xmlns="http://www.w3.org/2000/svg">
				{randomOffsets.length > 0 &&
					cellActiveState.length > 0 &&
					gridData.map((row, rowIndex) =>
						row.map((cellData, colIndex) => {
							const randomOffset = randomOffsets[rowIndex]?.[colIndex] || 0
							const isActive = cellActiveState[rowIndex]?.[colIndex] || false
							const opacity = getOpacity({ distFromCenter: cellData.distFromCenter, randomOffset, edgeFade: cellData.edgeFade, isActive })
							return (
								<motion.rect
									key={`${rowIndex}-${colIndex}`}
									x={colIndex * 12.5}
									y={rowIndex * 12.5}
									width="11.5"
									height="11.5"
									fill="var(--color-primary-border)"
									fillOpacity={opacity}
									animate={{ fillOpacity: opacity }}
									transition={{ duration: 0.6, ease: "easeInOut" }}
								/>
							)
						})
					)}
			</svg>

			<svg className="absolute left-1/2 top-12 -translate-x-1/2" width="320" height="240" viewBox="0 0 320 240" fill="none" xmlns="http://www.w3.org/2000/svg">
				<rect x="0.5" y="0.5" width="319" height="239" rx="11.5" fill="var(--color-bg)" />
				<rect x="0.5" y="0.5" width="319" height="239" rx="11.5" stroke="var(--color-soft)" />
				<path
					d="M142.129 24V17.4545H143.101V18.4773H143.186C143.322 18.1278 143.543 17.8565 143.847 17.6634C144.151 17.4673 144.516 17.3693 144.942 17.3693C145.374 17.3693 145.733 17.4673 146.02 17.6634C146.31 17.8565 146.535 18.1278 146.697 18.4773H146.766C146.933 18.1392 147.185 17.8707 147.52 17.6719C147.855 17.4702 148.257 17.3693 148.726 17.3693C149.311 17.3693 149.79 17.5526 150.162 17.919C150.534 18.2827 150.72 18.8494 150.72 19.6193V24H149.714V19.6193C149.714 19.1364 149.582 18.7912 149.318 18.5838C149.054 18.3764 148.743 18.2727 148.385 18.2727C147.925 18.2727 147.568 18.4119 147.315 18.6903C147.062 18.9659 146.936 19.3153 146.936 19.7386V24H145.913V19.517C145.913 19.1449 145.793 18.8452 145.551 18.6179C145.31 18.3878 144.999 18.2727 144.618 18.2727C144.356 18.2727 144.112 18.3423 143.885 18.4815C143.66 18.6207 143.479 18.8139 143.339 19.0611C143.203 19.3054 143.135 19.5881 143.135 19.9091V24H142.129ZM152.852 26.4545C152.682 26.4545 152.53 26.4403 152.396 26.4119C152.263 26.3864 152.17 26.3608 152.119 26.3352L152.375 25.4489C152.619 25.5114 152.835 25.5341 153.023 25.517C153.21 25.5 153.376 25.4162 153.521 25.2656C153.669 25.1179 153.804 24.8778 153.926 24.5455L154.114 24.0341L151.693 17.4545H152.784L154.591 22.6705H154.659L156.466 17.4545H157.557L154.778 24.9545C154.653 25.2926 154.499 25.5724 154.314 25.794C154.129 26.0185 153.915 26.1847 153.67 26.2926C153.429 26.4006 153.156 26.4545 152.852 26.4545ZM160.491 24.1534C160.076 24.1534 159.7 24.0753 159.362 23.919C159.024 23.7599 158.755 23.5312 158.556 23.233C158.358 22.9318 158.258 22.5682 158.258 22.142C158.258 21.767 158.332 21.4631 158.48 21.2301C158.627 20.9943 158.825 20.8097 159.072 20.6761C159.319 20.5426 159.592 20.4432 159.89 20.3778C160.191 20.3097 160.494 20.2557 160.798 20.2159C161.196 20.1648 161.518 20.1264 161.765 20.1009C162.015 20.0724 162.197 20.0256 162.311 19.9602C162.427 19.8949 162.485 19.7812 162.485 19.6193V19.5852C162.485 19.1648 162.37 18.8381 162.14 18.6051C161.913 18.3722 161.568 18.2557 161.105 18.2557C160.625 18.2557 160.248 18.3608 159.975 18.571C159.703 18.7812 159.511 19.0057 159.4 19.2443L158.446 18.9034C158.616 18.5057 158.843 18.196 159.127 17.9744C159.414 17.75 159.727 17.5937 160.065 17.5057C160.406 17.4148 160.741 17.3693 161.071 17.3693C161.281 17.3693 161.522 17.3949 161.795 17.446C162.071 17.4943 162.336 17.5952 162.592 17.7486C162.85 17.902 163.065 18.1335 163.235 18.4432C163.406 18.7528 163.491 19.1676 163.491 19.6875V24H162.485V23.1136H162.434C162.366 23.2557 162.252 23.4077 162.093 23.5696C161.934 23.7315 161.723 23.8693 161.458 23.983C161.194 24.0966 160.872 24.1534 160.491 24.1534ZM160.645 23.25C161.042 23.25 161.377 23.1719 161.65 23.0156C161.926 22.8594 162.133 22.6577 162.272 22.4105C162.414 22.1634 162.485 21.9034 162.485 21.6307V20.7102C162.443 20.7614 162.349 20.8082 162.204 20.8509C162.062 20.8906 161.897 20.9261 161.71 20.9574C161.525 20.9858 161.345 21.0114 161.169 21.0341C160.995 21.054 160.855 21.071 160.747 21.0852C160.485 21.1193 160.241 21.1747 160.014 21.2514C159.789 21.3253 159.608 21.4375 159.468 21.5881C159.332 21.7358 159.264 21.9375 159.264 22.1932C159.264 22.5426 159.393 22.8068 159.652 22.9858C159.913 23.1619 160.244 23.25 160.645 23.25ZM165.207 26.4545V17.4545H166.178V18.4943H166.298C166.371 18.3807 166.474 18.2358 166.604 18.0597C166.738 17.8807 166.928 17.7216 167.175 17.5824C167.425 17.4403 167.764 17.3693 168.19 17.3693C168.741 17.3693 169.227 17.5071 169.647 17.7827C170.068 18.0582 170.396 18.4489 170.631 18.9545C170.867 19.4602 170.985 20.0568 170.985 20.7443C170.985 21.4375 170.867 22.0384 170.631 22.5469C170.396 23.0526 170.069 23.4446 169.651 23.723C169.234 23.9986 168.752 24.1364 168.207 24.1364C167.786 24.1364 167.45 24.0668 167.197 23.9276C166.944 23.7855 166.749 23.625 166.613 23.446C166.477 23.2642 166.371 23.1136 166.298 22.9943H166.212V26.4545H165.207ZM166.195 20.7273C166.195 21.2216 166.268 21.6577 166.413 22.0355C166.558 22.4105 166.769 22.7045 167.048 22.9176C167.326 23.1278 167.667 23.233 168.07 23.233C168.491 23.233 168.842 23.1222 169.123 22.9006C169.407 22.6761 169.62 22.375 169.762 21.9972C169.907 21.6165 169.979 21.1932 169.979 20.7273C169.979 20.267 169.908 19.8523 169.766 19.483C169.627 19.1108 169.416 18.8168 169.131 18.6009C168.85 18.3821 168.496 18.2727 168.07 18.2727C167.661 18.2727 167.318 18.3764 167.039 18.5838C166.761 18.7884 166.55 19.0753 166.408 19.4446C166.266 19.8111 166.195 20.2386 166.195 20.7273ZM172.399 26.4545V17.4545H173.371V18.4943H173.49C173.564 18.3807 173.666 18.2358 173.797 18.0597C173.93 17.8807 174.121 17.7216 174.368 17.5824C174.618 17.4403 174.956 17.3693 175.382 17.3693C175.933 17.3693 176.419 17.5071 176.84 17.7827C177.26 18.0582 177.588 18.4489 177.824 18.9545C178.06 19.4602 178.178 20.0568 178.178 20.7443C178.178 21.4375 178.06 22.0384 177.824 22.5469C177.588 23.0526 177.261 23.4446 176.844 23.723C176.426 23.9986 175.945 24.1364 175.399 24.1364C174.979 24.1364 174.642 24.0668 174.389 23.9276C174.136 23.7855 173.942 23.625 173.805 23.446C173.669 23.2642 173.564 23.1136 173.49 22.9943H173.405V26.4545H172.399ZM173.388 20.7273C173.388 21.2216 173.46 21.6577 173.605 22.0355C173.75 22.4105 173.962 22.7045 174.24 22.9176C174.519 23.1278 174.859 23.233 175.263 23.233C175.683 23.233 176.034 23.1222 176.315 22.9006C176.599 22.6761 176.813 22.375 176.955 21.9972C177.099 21.6165 177.172 21.1932 177.172 20.7273C177.172 20.267 177.101 19.8523 176.959 19.483C176.82 19.1108 176.608 18.8168 176.324 18.6009C176.043 18.3821 175.689 18.2727 175.263 18.2727C174.854 18.2727 174.51 18.3764 174.232 18.5838C173.953 18.7884 173.743 19.0753 173.601 19.4446C173.459 19.8111 173.388 20.2386 173.388 20.7273Z"
					fill="var(--color-fg-tertiary)"
				/>
				<rect x="20" y="17" width="6" height="6" rx="3" fill="var(--color-fill4)" />
				<rect x="32" y="17" width="6" height="6" rx="3" fill="var(--color-fill4)" />
				<rect x="44" y="17" width="6" height="6" rx="3" fill="var(--color-fill4)" />
				<g filter="url(#filter0_d_30_13137)">
					<rect x="12" y="40" width="296" height="188" rx="8" fill="var(--color-bg)" />
					<rect x="12.5" y="40.5" width="295" height="187" rx="7.5" stroke="var(--color-soft)" />
					<rect x="24" y="56" width="226" height="12" rx="4" fill="var(--color-fill2)" />
					<rect x="24" y="80" width="91" height="12" rx="4" fill="var(--color-fill2)" />
					<rect x="24" y="104" width="172" height="12" rx="4" fill="var(--color-fill2)" />
					<rect x="24" y="128" width="58" height="12" rx="4" fill="var(--color-fill2)" />
					<rect x="24" y="152" width="132" height="12" rx="4" fill="var(--color-fill2)" />
					<rect x="24" y="176" width="194" height="12" rx="4" fill="var(--color-fill2)" />
					<rect x="24" y="200" width="100" height="12" rx="4" fill="var(--color-fill2)" />
				</g>
				<defs>
					<filter id="filter0_d_30_13137" x="4" y="36" width="312" height="204" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
						<feFlood floodOpacity="0" result="BackgroundImageFix" />
						<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
						<feOffset dy="4" />
						<feGaussianBlur stdDeviation="4" />
						<feComposite in2="hardAlpha" operator="out" />
						<feColorMatrix type="matrix" values="0 0 0 0 0.0980392 0 0 0 0 0.0941176 0 0 0 0 0.105882 0 0 0 0.08 0" />
						<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_30_13137" />
						<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_30_13137" result="shape" />
					</filter>
				</defs>
			</svg>
		</div>
	)
}

export default AnimatedPurpleGrid
