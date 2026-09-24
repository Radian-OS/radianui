import { toast } from "sonner"
import {
	AVATAR_BLEND_OPACITY,
	getImageBackgroundTint,
	getToneStyle,
} from "@/constants/avatar-playground-utils"
import { AVATAR_SHADOW_MAP } from "@/constants/avatar-shadow-map"

export interface ShowCopiedToastProps {
	src: string
	index: number
	tone: string
	description: string
	showShadow?: boolean
}

export const showCopiedToast = ({
	src,
	index,
	tone,
	description,
	showShadow = true,
}: ShowCopiedToastProps) => {
	const toneStyle = getToneStyle(tone)
	const isNeutralBackground = tone === "neutral" || tone === "none"
	const imageBackgroundTint = getImageBackgroundTint(tone)
	const shouldApplyShadow =
		!isNeutralBackground && Object.keys(toneStyle).length > 0
	const shadowStyle = imageBackgroundTint
		? { backgroundColor: imageBackgroundTint }
		: toneStyle

	toast.custom(() => (
		<div className="bg-black-inverse text-fg-inverse flex w-full items-center gap-2 rounded-[10px] p-2 sm:w-78.5">
			{/* Avatar Preview mimicking AvatarTile */}
			<div
				className="bg-bg relative isolate aspect-square size-15 shrink-0 overflow-hidden rounded-lg"
				style={toneStyle}>
				<img
					src={src}
					alt=""
					className="absolute inset-0 z-10 size-full origin-bottom translate-y-[3%] scale-[1.03] object-cover object-bottom"
				/>
				{showShadow && AVATAR_SHADOW_MAP[index] && (
					<img
						src={AVATAR_SHADOW_MAP[index]}
						alt=""
						className="pointer-events-none absolute inset-0 z-5 size-full origin-bottom translate-y-[3%] scale-[1.03] object-cover object-bottom mix-blend-hard-light"
					/>
				)}
				{shouldApplyShadow && (
					<div
						aria-hidden="true"
						className="pointer-events-none absolute inset-0 mix-blend-color-burn"
						style={{
							...shadowStyle,
							opacity: AVATAR_BLEND_OPACITY,
						}}
					/>
				)}
				{isNeutralBackground && (
					<div
						aria-hidden="true"
						className="dark:bg-bg/10 pointer-events-none absolute inset-0 hidden dark:block"
					/>
				)}
			</div>

			{/* Text content */}
			<div className="text-fg-inverse space-y-0.5 text-sm">
				<p className="font-medium">Added to Clipboard</p>
				<p className="text-fg-tertiary font-normal">{description}</p>
			</div>
		</div>
	))
}
