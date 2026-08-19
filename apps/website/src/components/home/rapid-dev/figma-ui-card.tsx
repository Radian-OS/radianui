"use client"

import { useEffect, useRef, useState } from "react"
import type { CSSProperties, PointerEvent, ReactNode } from "react"
import {
	BookOpen,
	ChevronDown,
	Component,
	Eye,
	Frame,
	Home,
	Layers,
	Maximize2,
	MessageCircle,
	MoreHorizontal,
	MousePointer2,
	Move,
	PackageCheck,
	PanelLeft,
	PenTool,
	Pipette,
	Play,
	Plus,
	Search,
	ShoppingCart,
	SlidersHorizontal,
	Sparkles,
	Square,
	Star,
	Type,
	Weight,
} from "lucide-react"
import Image from "next/image"
import { cn } from "@/lib/utils"

type PanelId = "figma" | "assets" | "comments" | "product"
type Card5Phase = PanelId | "button-change"

type PanelState = Record<
	PanelId,
	{
		x: number
		y: number
		z: number
	}
>

type DragState = {
	id: PanelId
	offsetX: number
	offsetY: number
} | null

const layers = [
	{ depth: 0, label: "Homepage", icon: Frame, open: true },
	{ depth: 1, label: "Hero section", icon: Frame, active: true },
	{ depth: 2, label: "Navigation", icon: Layers },
	{ depth: 2, label: "Headline", icon: Type },
	{ depth: 2, label: "Action group", icon: Component },
	{ depth: 1, label: "Library cards", icon: Frame, open: true },
	{ depth: 2, label: "Card / Figma Kit", icon: Component },
	{ depth: 2, label: "Card / Library", icon: Component },
	{ depth: 2, label: "Card / Customize", icon: Component },
]

const assetTiles = [
	{ label: "Brand Logos", type: "adobe" },
	{ label: "Country Flags", type: "flag" },
	{ label: "Credit Card", type: "visa" },
	{ label: "Credit Card - ...", type: "creditCard" },
	{ label: "Cursor", type: "cursor" },
	{ label: "File Format Icon", type: "file" },
	{ label: "Logo Icons C...", type: "google" },
	{ label: "Star Rating", type: "star" },
]

function CursorAssetIcon() {
	return (
		<svg
			aria-hidden="true"
			className="figma-asset-cursor-svg"
			fill="none"
			viewBox="0 0 48 48">
			<path
				d="M31.8462 36.0592C32.1969 36.901 31.8598 40.0894 30 40.8284C28.1402 41.5675 25.7639 40.8284 25.7639 40.8284L21.4521 32.2048L14 39.6569V6L36.8284 28.8284H28.323C28.7404 29.6288 31.4005 34.9897 31.8462 36.0592Z"
				fill="var(--color-bg)"
			/>
			<path
				clipRule="evenodd"
				d="M16 10.8281V34.8281L22 28.8281L27 38.8281C27 38.8281 28.3526 39.2597 29 38.8281C29.6474 38.3965 30.2913 37.5273 30 36.8281C28.6247 33.5273 25 26.8281 25 26.8281H32L16 10.8281Z"
				fill="var(--color-fg)"
				fillRule="evenodd"
			/>
		</svg>
	)
}

function FileAssetIcon() {
	return (
		<svg
			aria-hidden="true"
			className="figma-asset-file-svg"
			fill="none"
			viewBox="0 0 48 48">
			<path
				d="M17.2 0H31.2576L46 14.7344V40.8C46 44.7765 42.7764 48 38.8 48H17.2C13.2235 48 10 44.7764 10 40.8V7.2C10 3.22355 13.2236 0 17.2 0Z"
				fill="var(--color-fill2)"
			/>
			<path
				d="M31.2578 0L46.0002 14.7344H35.2578C33.0487 14.7344 31.2578 12.9435 31.2578 10.7344V0Z"
				fill="var(--color-fill3, var(--color-soft))"
			/>
			<rect
				fill="var(--color-error)"
				height="18"
				rx="4"
				width="32"
				y="23.5273"
			/>
			<text
				fill="#fff"
				fontFamily="Arial, sans-serif"
				fontSize="11"
				fontWeight="700"
				x="4.6"
				y="36.8">
				PDF
			</text>
		</svg>
	)
}

function StarAssetIcon() {
	return (
		<svg
			aria-hidden="true"
			className="figma-asset-star-svg"
			fill="none"
			viewBox="0 0 48 48">
			<path
				d="M23.0497 4.58979C23.1373 4.41271 23.2727 4.26365 23.4406 4.15944C23.6085 4.05522 23.8021 4 23.9997 4C24.1973 4 24.3909 4.05522 24.5588 4.15944C24.7267 4.26365 24.862 4.41271 24.9497 4.58979L29.5697 13.9478C29.874 14.5637 30.3233 15.0966 30.8789 15.5007C31.4346 15.9048 32.0799 16.168 32.7597 16.2678L43.0917 17.7798C43.2875 17.8082 43.4714 17.8907 43.6227 18.0182C43.774 18.1456 43.8866 18.3129 43.9477 18.501C44.0089 18.6891 44.0162 18.8906 43.9689 19.0827C43.9215 19.2747 43.8213 19.4497 43.6797 19.5878L36.2077 26.8638C35.7149 27.344 35.3462 27.9368 35.1334 28.591C34.9205 29.2453 34.8698 29.9416 34.9857 30.6198L36.7497 40.8998C36.7843 41.0955 36.7631 41.2969 36.6887 41.4812C36.6143 41.6654 36.4896 41.825 36.3288 41.9418C36.168 42.0586 35.9777 42.1278 35.7794 42.1416C35.5812 42.1554 35.3831 42.1132 35.2077 42.0198L25.9717 37.1638C25.3631 36.8442 24.6861 36.6773 23.9987 36.6773C23.3113 36.6773 22.6343 36.8442 22.0257 37.1638L12.7917 42.0198C12.6164 42.1126 12.4185 42.1544 12.2206 42.1403C12.0227 42.1262 11.8327 42.0569 11.6723 41.9402C11.5118 41.8235 11.3874 41.6642 11.313 41.4802C11.2387 41.2963 11.2174 41.0952 11.2517 40.8998L13.0137 30.6218C13.1301 29.9433 13.0797 29.2466 12.8668 28.5919C12.6539 27.9372 12.2849 27.3441 11.7917 26.8638L4.31969 19.5898C4.17688 19.4519 4.07568 19.2766 4.02762 19.0839C3.97956 18.8913 3.98657 18.689 4.04785 18.5002C4.10913 18.3113 4.22223 18.1435 4.37425 18.0158C4.52627 17.888 4.7111 17.8056 4.90769 17.7778L15.2377 16.2678C15.9182 16.1688 16.5645 15.9059 17.1209 15.5018C17.6773 15.0976 18.1271 14.5643 18.4317 13.9478L23.0497 4.58979Z"
				fill="var(--color-fill2)"
			/>
		</svg>
	)
}

function LogoAssetIcon() {
	return (
		<svg
			aria-hidden="true"
			className="figma-asset-logo-svg"
			fill="none"
			viewBox="0 0 88 24">
			<path
				d="M27.4036 11.5381C27.4036 15.4621 29.9094 18.1981 33.3817 18.1981C36.8539 18.1981 39.3597 15.4621 39.3597 11.5381C39.3597 7.61411 36.8539 4.87811 33.3817 4.87811C29.9094 4.87811 27.4036 7.61411 27.4036 11.5381ZM37.0687 11.5381C37.0687 14.3461 35.5474 16.1641 33.3817 16.1641C31.216 16.1641 29.6946 14.3461 29.6946 11.5381C29.6946 8.73011 31.216 6.91211 33.3817 6.91211C35.5474 6.91211 37.0687 8.73011 37.0687 11.5381ZM45.8113 18.1981C48.4423 18.1981 49.9458 15.9661 49.9458 13.2841C49.9458 10.6021 48.4423 8.37011 45.8113 8.37011C44.5942 8.37011 43.6993 8.85611 43.1086 9.55811V8.55011H40.9608V21.2401H43.1086V17.0101C43.6993 17.7121 44.5942 18.1981 45.8113 18.1981ZM43.0549 13.0141C43.0549 11.2321 44.0573 10.2601 45.3817 10.2601C46.9389 10.2601 47.7801 11.4841 47.7801 13.2841C47.7801 15.0841 46.9389 16.3081 45.3817 16.3081C44.0573 16.3081 43.0549 15.3181 43.0549 13.5721V13.0141ZM55.7583 18.1981C57.6376 18.1981 59.1232 17.2081 59.7854 15.5521L57.9419 14.8501C57.6555 15.8221 56.8143 16.3621 55.7583 16.3621C54.3801 16.3621 53.4136 15.3721 53.2525 13.7521H59.8391V13.0321C59.8391 10.4401 58.3893 8.37011 55.6688 8.37011C52.9482 8.37011 51.1942 10.5121 51.1942 13.2841C51.1942 16.2001 53.0735 18.1981 55.7583 18.1981ZM55.6509 10.1881C57.0112 10.1881 57.6555 11.0881 57.6734 12.1321H53.3599C53.6821 10.8541 54.5412 10.1881 55.6509 10.1881ZM61.4507 18.0001H63.5985V12.4561C63.5985 11.1061 64.5829 10.3861 65.5494 10.3861C66.7307 10.3861 67.196 11.2321 67.196 12.4021V18.0001H69.3438V11.7721C69.3438 9.73811 68.1625 8.37011 66.1937 8.37011C64.9766 8.37011 64.1354 8.92811 63.5985 9.55811V8.55011H61.4507V18.0001ZM75.6343 5.07611L70.766 18.0001H73.0391L74.1309 15.0481H79.6794L80.7891 18.0001H83.0979L78.2296 5.07611H75.6343ZM76.8872 7.63211L78.9276 13.0321H74.8826L76.8872 7.63211ZM86.785 5.11361H84.494V18.0376H86.785V5.11361ZM22.1549 9.82286C22.4225 9.01491 22.5153 8.1588 22.4272 7.31184C22.3391 6.46489 22.0721 5.64663 21.6441 4.91186C20.342 2.63186 17.7244 1.45886 15.1679 2.01086C14.6059 1.37399 13.9151 0.865148 13.1417 0.518384C12.3684 0.171619 11.5303 -0.00507771 10.6836 0.000111051C8.07048 -0.00588895 5.7519 1.68611 4.94797 4.18661C4.11815 4.35746 3.3342 4.70459 2.64856 5.20476C1.96293 5.70493 1.39143 6.34661 0.972307 7.08686C-0.33949 9.36086 -0.0404389 12.2274 1.7121 14.1774C1.44455 14.9853 1.35172 15.8414 1.43982 16.6884C1.52792 17.5353 1.79492 18.3536 2.22295 19.0884C3.52505 21.3684 6.14268 22.5414 8.69915 21.9894C9.26109 22.6263 9.95188 23.1352 10.7253 23.4818C11.4986 23.8285 12.3367 24.0049 13.1834 23.9994C15.7981 24.0061 18.1174 22.3126 18.9213 19.8099C19.7511 19.639 20.5351 19.2919 21.2207 18.7917C21.9064 18.2915 22.4779 17.6499 22.897 16.9096C24.2073 14.6356 23.9075 11.7714 22.1557 9.82136L22.1549 9.82286ZM13.1849 22.4311C12.1387 22.4328 11.1252 22.0643 10.3219 21.3901C10.3585 21.3706 10.4219 21.3354 10.4629 21.3099L15.2149 18.5499C15.3342 18.4816 15.4334 18.3826 15.5021 18.2631C15.5707 18.1435 15.6065 18.0077 15.6057 17.8696V11.1324L17.614 12.2986C17.6356 12.3091 17.6498 12.3301 17.6528 12.3541V17.9334C17.6498 20.4144 15.6519 22.4259 13.1849 22.4311ZM3.57651 18.3039C3.05235 17.3935 2.86357 16.3267 3.04329 15.2904C3.07834 15.3114 3.14024 15.3496 3.18424 15.3751L7.93624 18.1351C8.17712 18.2769 8.47543 18.2769 8.71705 18.1351L14.5183 14.7661V17.0986C14.5198 17.1226 14.5086 17.1459 14.49 17.1609L9.68654 19.9501C7.54695 21.1891 4.81448 20.4526 3.57726 18.3039H3.57651ZM2.32587 7.87211C2.8479 6.96011 3.67197 6.26261 4.65339 5.90036C4.65339 5.94161 4.65115 6.01436 4.65115 6.06536V11.5861C4.64966 11.8666 4.79882 12.1269 5.04119 12.2656L10.8425 15.6339L8.83414 16.8001C8.814 16.8136 8.78865 16.8159 8.76627 16.8061L3.96207 14.0146C1.82695 12.7711 1.09461 10.0239 2.32512 7.87286L2.32587 7.87211ZM18.8266 11.7339L13.0253 8.36486L15.0337 7.19936C15.0538 7.18586 15.0792 7.18361 15.1015 7.19336L19.9057 9.98261C22.0446 11.2254 22.7777 13.9771 21.5419 16.1281C21.0193 17.0385 20.196 17.7359 19.2152 18.0991V12.4134C19.2174 12.1329 19.069 11.8734 18.8274 11.7339H18.8266ZM20.8253 8.70836C20.7902 8.68661 20.7283 8.64911 20.6843 8.62361L15.9323 5.86361C15.8138 5.79399 15.6791 5.75729 15.5419 5.75729C15.4047 5.75729 15.27 5.79399 15.1515 5.86361L9.3502 9.23261V6.90011C9.34871 6.87611 9.3599 6.85286 9.37854 6.83786L14.182 4.05086C16.3216 2.80961 19.0571 3.54836 20.2905 5.70086C20.8119 6.61005 21.0005 7.674 20.8238 8.70836H20.8253ZM8.25841 12.8656L6.24932 11.6994C6.23875 11.6941 6.22966 11.6863 6.22289 11.6766C6.21611 11.6669 6.21187 11.6556 6.21054 11.6439V6.06461C6.21204 3.58061 8.2159 1.56761 10.6859 1.56911C11.7307 1.56911 12.7419 1.93811 13.5451 2.61011C13.5086 2.62961 13.4459 2.66486 13.4042 2.69036L8.65217 5.45036C8.53283 5.51844 8.43371 5.6173 8.36502 5.73674C8.29633 5.85618 8.26056 5.99188 8.26139 6.12986L8.25841 12.8641V12.8656ZM9.34946 10.5001L11.9335 8.99936L14.5176 10.4994V13.5001L11.9335 15.0001L9.34946 13.5001V10.5001Z"
				fill="currentColor"
			/>
		</svg>
	)
}

function AssetPreview({ type }: { type: string }) {
	if (type === "flag") {
		return (
			<Image
				alt=""
				height={48}
				src="/card-5-assets/country-flag.png"
				width={48}
			/>
		)
	}

	if (type === "creditCard") {
		return (
			<Image
				alt=""
				className="is-card"
				height={48}
				src="/card-5-assets/credit-card.png"
				width={88}
			/>
		)
	}

	if (type === "google") {
		return (
			<Image
				alt=""
				height={48}
				src="/card-5-assets/google-logo.png"
				width={48}
			/>
		)
	}

	if (type === "cursor") {
		return <CursorAssetIcon />
	}

	if (type === "file") {
		return <FileAssetIcon />
	}

	if (type === "star") {
		return <StarAssetIcon />
	}

	if (type === "visa") {
		return <span className="figma-asset-visa">VISA</span>
	}

	return <LogoAssetIcon />
}

function WindowDots() {
	return (
		<div aria-hidden="true" className="figma-floating-dots">
			<span />
			<span />
			<span />
		</div>
	)
}

function FloatingPanel({
	children,
	className,
	id,
	onPointerDown,
	position,
}: {
	children: ReactNode
	className: string
	id: PanelId
	onPointerDown: (event: PointerEvent<HTMLDivElement>, id: PanelId) => void
	position: PanelState[PanelId]
}) {
	return (
		<div
			className={`figma-floating-shell ${className}-shell`}
			onPointerDown={(event) => onPointerDown(event, id)}
			style={
				{
					"--floating-x": `${position.x}px`,
					"--floating-y": `${position.y}px`,
					zIndex: position.z,
				} as CSSProperties
			}>
			<div className={`figma-floating-card ${className}`}>{children}</div>
		</div>
	)
}

export function FigmaUiCard() {
	const [panels, setPanels] = useState<PanelState>({
		figma: { x: 142, y: 166, z: 2 },
		assets: { x: 84, y: 58, z: 4 },
		comments: { x: 1184, y: 118, z: 3 },
		product: { x: 592, y: 276, z: 5 },
	})
	const [dragState, setDragState] = useState<DragState>(null)
	const [animationPhase, setAnimationPhase] = useState<Card5Phase>("figma")
	const [introducedPanels, setIntroducedPanels] = useState<
		Record<Exclude<PanelId, "figma">, boolean>
	>({
		assets: false,
		comments: false,
		product: false,
	})
	const [leadIconEnabled, setLeadIconEnabled] = useState(false)
	const [isNeutralButton, setIsNeutralButton] = useState(false)
	const [isColorMenuOpen, setIsColorMenuOpen] = useState(false)
	const [cursorVisible, setCursorVisible] = useState(false)
	const highestZRef = useRef(5)

	useEffect(() => {
		const phases: Card5Phase[] = [
			"figma",
			"assets",
			"product",
			"comments",
			"button-change",
		]
		let phaseIndex = 1
		let propertyState = false
		let introComplete = false
		const timers: number[] = []

		const schedule = (callback: () => void, delay: number) => {
			timers.push(window.setTimeout(callback, delay))
		}

		const activatePhase = (nextPhase: Card5Phase) => {
			setIsColorMenuOpen(false)

			if (
				nextPhase === "assets" ||
				nextPhase === "product" ||
				nextPhase === "comments"
			) {
				setIntroducedPanels((current) => ({
					...current,
					[nextPhase]: true,
				}))
			}

			if (nextPhase === "button-change") {
				const nextPropertyState = !propertyState

				schedule(() => {
					setIsColorMenuOpen(true)
				}, 180)
				schedule(() => {
					setIsNeutralButton(nextPropertyState)
					propertyState = nextPropertyState
				}, 980)
				schedule(() => {
					setIsColorMenuOpen(false)
				}, 1780)
				schedule(() => {
					setLeadIconEnabled(nextPropertyState)
				}, 2460)
			}

			setAnimationPhase(nextPhase)
		}

		schedule(() => {
			setAnimationPhase("figma")
			setIntroducedPanels({
				assets: false,
				comments: false,
				product: false,
			})
			setLeadIconEnabled(false)
			setIsNeutralButton(false)
			setIsColorMenuOpen(false)
		}, 0)

		const advance = () => {
			const nextPhase = phases[phaseIndex]
			const nextDelay =
				nextPhase === "button-change" ? 7460 : introComplete ? 3000 : 1000

			activatePhase(nextPhase)
			phaseIndex = (phaseIndex + 1) % phases.length
			if (nextPhase === "button-change") {
				introComplete = true
			}
			schedule(advance, nextDelay)
		}

		schedule(advance, 1200)

		return () => {
			timers.forEach((timer) => window.clearTimeout(timer))
		}
	}, [])

	const bringToFront = (id: PanelId) => {
		highestZRef.current += 1
		setPanels((current) => ({
			...current,
			[id]: {
				...current[id],
				z: highestZRef.current,
			},
		}))
	}

	const handlePointerDown = (
		event: PointerEvent<HTMLDivElement>,
		id: PanelId
	) => {
		const rect = event.currentTarget
			.closest(".figma-stage")
			?.getBoundingClientRect()

		if (!rect) {
			return
		}

		event.currentTarget.setPointerCapture(event.pointerId)
		bringToFront(id)
		setDragState({
			id,
			offsetX: event.clientX - rect.left - panels[id].x,
			offsetY: event.clientY - rect.top - panels[id].y,
		})
	}

	const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
		const rect = event.currentTarget.getBoundingClientRect()
		const x = event.clientX - rect.left
		const y = event.clientY - rect.top

		setCursorVisible(true)
		event.currentTarget.style.setProperty("--cursor-x", `${x}px`)
		event.currentTarget.style.setProperty("--cursor-y", `${y}px`)

		if (!dragState) {
			return
		}

		setPanels((current) => ({
			...current,
			[dragState.id]: {
				...current[dragState.id],
				x: event.clientX - rect.left - dragState.offsetX,
				y: event.clientY - rect.top - dragState.offsetY,
			},
		}))
	}

	return (
		<div
			className="figma-stage"
			data-card5-button-color={isNeutralButton ? "neutral" : "primary"}
			data-card5-lead-icon={leadIconEnabled ? "on" : "off"}
			data-card5-phase={animationPhase}
			onPointerEnter={() => setCursorVisible(true)}
			onPointerLeave={() => {
				setCursorVisible(false)
				setDragState(null)
			}}
			onPointerMove={handlePointerMove}
			onPointerUp={() => setDragState(null)}>
			<div
				className="figma-window-shell"
				onPointerDown={(event) => handlePointerDown(event, "figma")}
				style={
					{
						"--floating-x": `${panels.figma.x}px`,
						"--floating-y": `${panels.figma.y}px`,
						zIndex: panels.figma.z,
					} as CSSProperties
				}>
				<div className="figma-window">
					<div className="figma-browser-tabs">
						<span className="figma-window-dots">
							<i />
							<i />
							<i />
							<Home size={13} />
						</span>
						<div className="figma-browser-tab muted">Core DS</div>
						<div className="figma-browser-tab active">
							<BookOpen size={13} />
							Radian Design System
							<i aria-hidden="true">×</i>
						</div>
						<div className="figma-browser-tab warm">Homepage</div>
						<div className="figma-browser-tab motion">Motion</div>
						<Plus size={14} />
					</div>
					<aside className="figma-rail">
						<div className="figma-rail-home">
							<Home size={15} />
						</div>
						<button className="is-active" type="button">
							<Frame size={15} />
							<span>File</span>
						</button>
						<button type="button">
							<Plus size={15} />
							<span>Assets</span>
						</button>
						<button type="button">
							<Component size={15} />
							<span>Tools</span>
						</button>
						<button type="button">
							<SlidersHorizontal size={15} />
							<span>Variables</span>
						</button>
					</aside>
					<aside className="figma-left-panel">
						<div className="figma-file-header">
							<span className="figma-file-logo">❖</span>
							<div>
								<strong>
									Radian Design Syst...
									<ChevronDown size={10} strokeWidth={1.8} />
								</strong>
								<span>Radian Design System</span>
							</div>
							<PanelLeft
								className="figma-panel-toggle"
								size={13}
								strokeWidth={1.7}
							/>
						</div>
						<div className="figma-pages">
							<div>
								<span>Pages</span>
								<Search size={12} />
								<Plus size={12} />
							</div>
							{[
								"Select",
								"Skeleton",
								"Slider",
								"Spinner",
								"Stepper",
								"Switch",
								"Table",
								"Tabs",
								"Text Area",
								"Toast",
								"Tooltip",
							].map((item) => (
								<button
									className={item === "Table" ? "is-active" : ""}
									key={item}
									type="button">
									{item}
									{item === "Stepper" && (
										<span className="figma-new-label">{"✨"} NEW</span>
									)}
								</button>
							))}
						</div>
						<div className="figma-pages blocks">
							<div>
								<span>Blocks</span>
							</div>
							{[
								"Sign In",
								"Sign Up",
								"Verification",
								"Password Reset",
								"Onboarding",
								"Sidebar",
							].map((item) => (
								<button key={item} type="button">
									<span className="figma-item-emoji">{"❇️"}</span>
									{item}
									{(item === "Onboarding" || item === "Sidebar") && (
										<span className="figma-new-label">{"✨"} NEW</span>
									)}
								</button>
							))}
						</div>
						<div className="figma-layer-list">
							<span>Layers</span>
							{layers
								.slice(0, 6)
								.map(({ active, depth, icon: Icon, label, open }) => (
									<div
										className={`figma-layer-row ${active ? "is-active" : ""}`}
										key={label}
										style={{ "--depth": depth } as CSSProperties}>
										{open ? <ChevronDown size={11} /> : <span />}
										<Icon size={13} />
										<p>{label}</p>
									</div>
								))}
						</div>
					</aside>

					<main className="figma-canvas">
						<div className="figma-topbar">
							<div>
								<MousePointer2 size={15} />
								<Frame size={15} />
								<Square size={15} />
								<PenTool size={15} />
								<Type size={15} />
								<MessageCircle size={15} />
							</div>
							<span>Homepage / Hero section</span>
							<div>
								<div className="figma-avatar">B</div>
								<button type="button">Share</button>
								<span>100%</span>
							</div>
						</div>
						<div className="figma-canvas-board">
							<section className="figma-frame figma-frame-desktop">
								<nav>
									<span>radianui</span>
									<div />
									<div />
								</nav>
								<h2>Build beautiful React interfaces.</h2>
								<p>Components, tokens, and patterns for product teams.</p>
								<div className="figma-frame-actions">
									<span />
									<span />
								</div>
								<div className="figma-selection-outline">
									<i />
									<i />
									<i />
									<i />
								</div>
							</section>
							<section className="figma-frame figma-frame-mobile">
								<nav />
								<h3>Library</h3>
								<div />
								<div />
								<div />
							</section>
							<div className="figma-measurement horizontal">320</div>
							<div className="figma-measurement vertical">24</div>
						</div>
						<div className="figma-toolbar">
							<Move size={16} />
							<Frame size={16} />
							<Square size={16} />
							<PenTool size={16} />
							<Type size={16} />
							<Component size={16} />
							<Sparkles size={16} />
						</div>
					</main>

					<aside className="figma-right-panel">
						<div className="figma-right-head">
							<div className="figma-avatar">B</div>
							<ChevronDown size={11} />
							<button className="figma-play-button" type="button">
								<Play className="figma-play-icon" size={10} strokeWidth={1.7} />
							</button>
							<button type="button">Share</button>
						</div>
						<div className="figma-right-tabs">
							<button className="is-active" type="button">
								Design
							</button>
							<button type="button">Prototype</button>
							<span>44%</span>
						</div>
						<section>
							<h3>
								Page{" "}
								<Pipette
									className="figma-panel-icon"
									size={13}
									strokeWidth={1.7}
								/>
							</h3>
							<div className="figma-property-grid">
								<label>
									<i /> EEEFF1
								</label>
								<label>100 %</label>
								<em>
									<Eye
										className="figma-panel-icon"
										size={13}
										strokeWidth={1.7}
									/>
								</em>
							</div>
						</section>
						<section>
							<h3>
								Styles{" "}
								<Plus
									className="figma-panel-icon"
									size={13}
									strokeWidth={1.7}
								/>
							</h3>
							<p>Text styles</p>
							{[
								"Heading 1",
								"Heading 2",
								"Heading 3",
								"Heading 4",
								"Heading 5",
								"Heading 6",
								"Body 18",
								"Body 16",
								"Body 14",
								"Body 13",
								"Body 12",
							].map((item) => (
								<div className="figma-style-row" key={item}>
									<span>›</span>
									<b
										className={
											item.startsWith("Heading")
												? "is-heading-style"
												: "is-body-style"
										}
									/>
									{item}
								</div>
							))}
						</section>
						<section>
							<h3>Color styles</h3>
							<div className="figma-style-row">
								<span>›</span>Patterns
							</div>
						</section>
						<section>
							<h3>Layout guide styles</h3>
							{["Desktop Large", "Desktop", "Tablet", "Mobile"].map((item) => (
								<div className="figma-style-row" key={item}>
									<span>Ⅱ</span>
									{item}
								</div>
							))}
						</section>
					</aside>
				</div>
			</div>

			{introducedPanels.assets ? (
				<FloatingPanel
					className="figma-assets-panel"
					id="assets"
					onPointerDown={handlePointerDown}
					position={panels.assets}>
					<div className="figma-floating-title">
						<WindowDots />
						<span>Assets</span>
						<BookOpen size={16} />
					</div>
					<div className="figma-assets-body">
						<div className="figma-assets-search">
							<Search size={13} />
							<span>Search in this library</span>
							<SlidersHorizontal size={14} />
						</div>
						<div className="figma-assets-crumb">
							<ChevronDown size={15} />
							<span>Created in this file /</span>
							<b>Assets</b>
						</div>
						<div className="figma-component-grid">
							{assetTiles.map((tile) => (
								<div key={tile.label}>
									<i>
										<AssetPreview type={tile.type} />
									</i>
									<span>{tile.label}</span>
								</div>
							))}
						</div>
					</div>
				</FloatingPanel>
			) : null}

			{introducedPanels.comments ? (
				<FloatingPanel
					className="figma-props-panel"
					id="comments"
					onPointerDown={handlePointerDown}
					position={panels.comments}>
					<div className="figma-floating-title">
						<WindowDots />
						<span>Button-Primary</span>
						<ChevronDown size={14} />
						<MoreHorizontal size={18} />
					</div>
					<div className="figma-props-body">
						<p>
							From this file <span />
						</p>
						{[
							["🎨", "Color", "Primary ..."],
							["⠿", "Variant", "Strong"],
							["▰", "Size", "36"],
							["📌", "State", "Default"],
							["⭐", "Icon Only B...", "off"],
							["👉", "Lead Icon", "off"],
							["🔀", "Pick Lead", "◇ box"],
							["👉", "Trail Icon", "off"],
							["🔀", "Pick Trail", "◇ box"],
							["✏️", "Label", "Button Label"],
						].map(([icon, label, value]) => {
							const isColorSelect = label === "Color"
							const isBoxSelect =
								label === "Pick Lead" || label === "Pick Trail"
							const shownValue =
								isColorSelect && isNeutralButton ? "Neutral" : value

							return (
								<div
									className={
										isColorSelect
											? "figma-control-row is-color-row"
											: "figma-control-row"
									}
									key={label}>
									<span>
										{icon} {label}
									</span>
									{value === "on" || value === "off" ? (
										<i
											className={
												label === "Lead Icon" && leadIconEnabled ? "is-on" : ""
											}
										/>
									) : isBoxSelect ? (
										<b className="figma-box-select">
											<span className="figma-box-select-icon" />
											<em>box</em>
											<ChevronDown size={9} strokeWidth={1.6} />
										</b>
									) : (
										<b>
											{shownValue}
											{isColorSelect && isColorMenuOpen ? (
												<span className="figma-color-menu" aria-hidden="true">
													<em className={isNeutralButton ? "" : "is-selected"}>
														Primary
													</em>
													<em className={isNeutralButton ? "is-selected" : ""}>
														Neutral
													</em>
													<em>Destructive</em>
												</span>
											) : null}
										</b>
									)}
								</div>
							)
						})}
					</div>
				</FloatingPanel>
			) : null}

			{introducedPanels.product ? (
				<FloatingPanel
					className="figma-product-panel"
					id="product"
					onPointerDown={handlePointerDown}
					position={panels.product}>
					<div className="figma-product-image" aria-hidden="true">
						<Image
							alt=""
							className="figma-product-photo"
							draggable={false}
							height={1080}
							src="/card-5-assets/preview.jpg"
							width={1080}
						/>
					</div>
					<div className="figma-product-body">
						<div className="figma-product-heading">
							<h3>Blue Skies Artwork</h3>
							<span>In stock</span>
						</div>
						<p>Radian Studio</p>
						<div
							className="figma-product-rating"
							aria-label="3.5 out of 5 stars">
							<Star fill="currentColor" size={22} />
							<Star fill="currentColor" size={22} />
							<Star fill="currentColor" size={22} />
							<Star className="is-half" fill="currentColor" size={22} />
							<Star className="is-muted" fill="currentColor" size={22} />
							<span>(120)</span>
						</div>
						<dl className="figma-product-specs">
							<div>
								<Layers size={22} />
								<dt>Materials</dt>
								<dd>Solid Walnut, Steel</dd>
							</div>
							<div>
								<Maximize2 size={22} />
								<dt>Size (inch)</dt>
								<dd>60w x 30d x 48h</dd>
							</div>
							<div>
								<Weight size={22} />
								<dt>Weight</dt>
								<dd>112 lbs</dd>
							</div>
							<div>
								<PackageCheck size={22} />
								<dt>Ships</dt>
								<dd>3-5 business days</dd>
							</div>
						</dl>
						<div className="figma-product-footer">
							<strong>$849.00</strong>
							<button type="button">
								<ShoppingCart aria-hidden="true" size={24} strokeWidth={2.2} />
								<span>Add to cart</span>
							</button>
						</div>
					</div>
				</FloatingPanel>
			) : null}

			<div className={cn("figma-user-cursor", cursorVisible && "is-visible")}>
				<svg
					aria-hidden="true"
					fill="none"
					height="28"
					viewBox="0 0 23 28"
					width="23"
					xmlns="http://www.w3.org/2000/svg">
					<g filter="url(#figma-user-cursor-shadow)">
						<path
							d="M9.07023 20.0632C9.01185 20.0789 8.95009 20.0836 8.88767 20.0752C8.69962 20.0507 8.5452 19.9148 8.49615 19.7318L4.59787 5.18321C4.54883 5.00018 4.6146 4.8053 4.76524 4.69008C4.91619 4.57429 5.12085 4.56163 5.28499 4.65602L17.9227 11.9779C18.0869 12.0727 18.178 12.2568 18.153 12.445C18.1286 12.6331 17.9927 12.7875 17.8097 12.8366L12.564 14.2421L9.35482 19.8448C9.29138 19.9547 9.18785 20.0317 9.07023 20.0632Z"
							fill="#22C55E"
						/>
						<path
							d="M4.26424 4.03618C4.62936 3.75631 5.10684 3.69479 5.52265 3.85772L5.6965 3.94055L5.69889 3.94193L18.335 11.2637L18.4956 11.3723C18.8453 11.6513 19.0291 12.0963 18.97 12.5504L18.9712 12.5511C18.9034 13.072 18.5275 13.4978 18.0236 13.6331L13.11 14.9497L10.0709 20.2549L10.0696 20.2573C9.89441 20.5606 9.60823 20.7731 9.28377 20.8601C9.1257 20.9024 8.95553 20.9153 8.78188 20.8925C8.26088 20.8247 7.83411 20.4493 7.69902 19.9451L3.80081 5.39682C3.66579 4.89292 3.8472 4.35551 4.26424 4.03618Z"
							stroke="white"
							strokeWidth="1.65"
						/>
					</g>
					<defs>
						<filter
							colorInterpolationFilters="sRGB"
							filterUnits="userSpaceOnUse"
							height="24.6557"
							id="figma-user-cursor-shadow"
							width="22.7417"
							x="0.000260115"
							y="2.94141">
							<feFlood floodOpacity="0" result="BackgroundImageFix" />
							<feColorMatrix
								in="SourceAlpha"
								result="hardAlpha"
								type="matrix"
								values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
							/>
							<feOffset dy="2.93333" />
							<feGaussianBlur stdDeviation="1.46667" />
							<feComposite in2="hardAlpha" operator="out" />
							<feColorMatrix
								type="matrix"
								values="0 0 0 0 0.0980392 0 0 0 0 0.0941176 0 0 0 0 0.105882 0 0 0 0.12 0"
							/>
							<feBlend
								in2="BackgroundImageFix"
								mode="normal"
								result="effect1_dropShadow_3337_22261"
							/>
							<feBlend
								in="SourceGraphic"
								in2="effect1_dropShadow_3337_22261"
								mode="normal"
								result="shape"
							/>
						</filter>
					</defs>
				</svg>
				<span>John</span>
			</div>
			<div className="figma-stage-fade" />
		</div>
	)
}
